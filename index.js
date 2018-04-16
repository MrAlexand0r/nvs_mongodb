// Official MongoDB Driver
var mongodb = require("mongodb");

//Express für die REST-Anbindung und Website
var express = require("express");
var app = express();

var bodyParser = require("body-parser");

app.use(bodyParser.json());

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'example';
const collection = 'students';

var client;

//Stellt den public Ordner zur Verfügung
app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/dashboard/index.html");
});
app.get('/edit', (req, res) => {
    res.sendFile(__dirname + "/public/edit/index.html");
});

//Schüler Hinzufügen
app.post('/api/create', (req, res) => {
    //Überprüft ob alle Felder vorhanden sind
    if (!req.body.matnr || !req.body.katnr || !req.body.class || !req.body.firstname || !req.body.lastname) {
        res.status(400).send("Bad request");
        return;
    }
    client.collection(collection).insertOne(req.body, (err, result) => {
        if (err) {
            res.status(500).send("Something went wrong, please try again later.");
            return;
        }
        res.send("success");
    });
});

//Schüler Abfragen
app.get('/api/getAll', (req, res) => {
    client.collection(collection).find({}).toArray((err, result) => {
        if (err) {
            req.status(500).send("Something went wrong");
            return;
        }
        res.send(result);
    });
});

//Schüler Löschen
app.delete('/api/delete', (req, res) => {
    console.log(req.body.id);
    client.collection(collection).deleteOne({
        _id: new mongodb.ObjectID(req.body.id)
    }, (err, result) => {
        if (err) {
            res.status(500).send("Something went wrong");
            console.log(err);
            return;
        }
        res.send("success");
    });
});

mongodb.connect(url, function (err, dbo) {
    if (err) {
        console.error("Error connecting to MongoDB! Error: " + err);
        return;
    }
    console.log("Connected successfully to MongoDB!");
    //Startet den REST Server sobald eine Verbindung zu MongoDB besteht
    client = dbo.db(dbName);
    app.listen(8080, () => console.log("Started Express Server under Port 8080!"));
});