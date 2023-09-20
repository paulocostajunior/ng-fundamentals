const jsonServer = require('json-server')
const middleware = jsonServer.defaults()
const server = jsonServer.create()
const path = require('path');

server.use(middleware)
server.use(jsonServer.bodyParser)

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

server.listen(3000, () => {
    console.log('JSON server listening on port 3000')
})