const express = require("express");
const app = express();
const cors = require('cors');

require('dotenv').config();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yhxur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const port = 5000;
// console.log(uri)
app.get('/', (req, res) => {
    res.send('running Genius server')
});

async function run() {
    try {
        await client.connect();
        const database = client.db("carmechanic");
        const servicesCollection = database.collection("services");

        // GET API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });

        // GET Single Service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })

        // POST API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result)
        });

        // DELETE API
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            res.json(result);
        })

    } finally {
        // await client.close();
    }
}


client.connect(err => {
    const collection = client.db("test").collection("devices");
    client.close();
});

run().catch(console.dir);
app.listen(port, () => {
    console.log('Running Genius server', port);
})