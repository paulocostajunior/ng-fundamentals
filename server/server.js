const jsonServer = require('json-server')
const middleware = jsonServer.defaults()
const server = jsonServer.create()
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');

server.use(middleware)
server.use(jsonServer.bodyParser)

const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your Angular app's URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
};
server.use(cors(corsOptions));

const JWT_SECRET_KEY = "gfg_jwt_secret_key";
const TOKEN_HEADER_KEY = "gfg_token_header_key";


const authenticateToken = (req, res, next) => {
  let tokenHeaderKey = TOKEN_HEADER_KEY;
  let jwtSecretKey = JWT_SECRET_KEY;

  try {
    const authorizationHeader = req.headers.authorization;

    const [bearer, token] = authorizationHeader.split(' ');

    const verified = jwt.verify(token, jwtSecretKey);

    if(verified){
      next();
    } else {
        // Access Denied
        return res.status(401).send(error);
    }
  } catch (error) {
      // Access Denied
      return res.status(401).send(error);
  }
};

const data = require('../server/data/events')
const dataFilePath = path.join(__dirname, 'data', 'events', 'json','getEvents.json'); 
const loginsDataFilePath = path.join(__dirname, 'data', 'events', 'json','getLogins.json'); 

server.get('/api/events', (req, res, next) => {
    res.status(200).send(data.getEvents)
})

server.get('/api/events/:id', (req, res, next) => {
    const eventId = parseInt(req.params.id);

    const event = data.getEvents.events.find((e) => e.id === eventId);

    if (!event) {
        res.status(404).json({ error: 'event not found' });
    } else {
        res.status(200).json(event);
    }
})

server.post('/api/events', (req, res) => {
    const newEvent = req.body;
  
    const maxId = Math.max(...data.getEvents.events.map((event) => event.id));
    newEvent.id = maxId + 1;
  
    data.getEvents.events.push(newEvent);
  
    fs.writeFileSync(dataFilePath, JSON.stringify(data.getEvents, null, 2));
  
    res.status(201).json(newEvent);
});

server.post('/api/login', (req, res) => {
    const { userName, password } = req.body;

    // Check if a user with the given credentials exists
    const user = data.getLogins.logins.find((l) => l.userName === userName && l.password === password);
  
    if (user) {

      const accessToken = jwt.sign({ userName: user.firstName, userId: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });

      res.json({ message: 'Login successful', accessToken, user });
    } else {
      res.status(401).json({ message: 'Login failed' });
    }
});

server.put('/api/login/update', authenticateToken, (req, res) => {
  const { firstName, lastName } = req.body;
  console.log(req.body)
  const [bearer, token] = req.headers.authorization.split(' ');
  const userId = jwt.verify(token, JWT_SECRET_KEY).userId;

  const user = data.getLogins.logins.find((u) => u.id === userId);
  
  if (user === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.firstName = firstName;
  user.lastName = lastName;

  fs.writeFileSync(loginsDataFilePath, JSON.stringify(data.getLogins, null, 2));

  res.json({ message: 'User information updated successfully' });
});

// Logout route
server.post('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('accessToken');
    res.json({ message: 'Logout successful' });
});

server.listen(3000, () => {
    console.log('JSON server listening on port 3000')
})