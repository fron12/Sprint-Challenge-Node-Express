const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

const actionsRoutes = require('./data/actionsRoutes');
const projectsRoutes = require('./data/projectsRoutes');

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/actions', actionsRoutes);
server.use('/projects', projectsRoutes);

server.get('/', (req, res) => {
    res.send('Hello');
})

server.listen(9000, () => console.log('\n== API on port 9k=='))