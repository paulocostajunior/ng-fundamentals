const jsonServer = require('json-server')
const middleware = jsonServer.defaults()
const server = jsonServer.create()

server.use(middleware)
server.use(jsonServer.bodyParser)

const data = require('../server/data/events')

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

server.listen(3000, () => {
    console.log('JSON server listening on port 3000')
})