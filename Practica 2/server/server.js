const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://mongo/Practica2Redes"
var table = "Reports";

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 4500

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.get('/', (req, res) => {
    res.send({ message: 'servidor activo server: ' + process.env.ATENDIO })
})

app.post("/Report/Add", async (req, res) => {
    var client;
    try {
        var dataI = JSON.parse(JSON.stringify(req.body))
        dataI.procesado = process.env.ATENDIO;
        dataI.fecha = new Date(Date.now()).toLocaleDateString()
        client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        await client.db().collection(table).insertOne(dataI)
        client.close();
        var data = {
            mensaje: `Solicitud atendida exitosamente por: ${process.env.ATENDIO}`
        }
        console.log(data)
        return res.status(200).json(data);
    } catch (error) {
        client.close();
        console.error(error);
    }
    client.close();
    res.send([]);
});

app.get("/Report/GetAll", async (req, res) => {
    var client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const consulta = await client.db().collection(table).find({}).toArray();
      client.close();
      for (let index = 0; index < consulta.length; index++) {
        consulta[index].solicitud=process.env.ATENDIO;
      }
      return res.status(200).json(consulta);
    } catch (error) {
      console.error(error);
    }
    client.close();
    res.send([]);
});

app.listen(PORT, () => {
    console.log(`Server corriendo:${PORT}`)
})
