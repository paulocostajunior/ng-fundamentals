const jsonServer = require('json-server')
const middleware = jsonServer.defaults()
const server = jsonServer.create()
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

server.use(middleware)
server.use(jsonServer.bodyParser)
server.use(cookieParser());
server.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const secretKey = 'your-jwt-secret-key';

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user || req.cookies.accessToken) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
}
  

const data = require('../server/data/events')
const dataFilePath = path.join(__dirname, 'data', 'events', 'json','getEvents.json'); 

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
  
    const fs = require('fs');
    fs.writeFileSync(dataFilePath, JSON.stringify(data.getEvents, null, 2));
  
    res.status(201).json(newEvent);
});

server.post('/api/login', (req, res) => {
    const { userName, password } = req.body;
  
    // Check if a user with the given credentials exists
    const user = data.getLogins.logins.find((l) => l.userName === userName && l.password === password);
  
    if (user) {
        // Create a JWT token and set it as a cookie
        const accessToken = jwt.sign({ userName: user.userName }, secretKey, {
          expiresIn: '1h', // Adjust the expiration time as needed
        });
    
        // Store user data in the session
        req.session.user = user;
    
        // Set the JWT token as a cookie
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });
        res.json({ message: 'Login successful', accessToken, user });
      } else {
        res.status(401).json({ message: 'Login failed' });
      }
});

// Logout route
server.post('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('accessToken');
    res.json({ message: 'Logout successful' });
});

// Protected route
server.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.session.user });
});


server.listen(3000, () => {
    console.log('JSON server listening on port 3000')
})