const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const app = express();

const port = 3001;

const adapter = new FileAsync("db.json");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

low(adapter)
  .then(db => {
    app.get("/sensors", (req, res) => {
      const sensorData = db.get("sensors").value();
      res.send(sensorData);
    });

    app.post("/sensors", (req, res) => {
      console.log(req.body)
      const sensorData = db.get("sensors").value();
      if (sensorData.length > 3) {
        // sensor occasionally reports temperatures +-2
        let diff =
          sensorData[sensorData.length - 1].temperature - req.body.temperature;
        if (diff >= 2.0 || diff <= -2.0) {
          req.body.temperature = (
            (req.body.temperature +
              sensorData[sensorData.length - 1].temperature +
              sensorData[sensorData.length - 2].temperature +
              sensorData[sensorData.length - 3].temperature) /
            4
          )
        }
      }
      obj = {
        temperature: parseFloat(req.body.temperature.toFixed(1)),
        humidity: req.body.humidity,
        date: new Date().toLocaleString()
      };
      db.get("sensors")
        .push(obj)
        .write();
    });

    return db
      .defaults({
        sensors: [
          {
            temperature: 0,
            humidity: 0,
            date: new Date().toJSON()
          }
        ]
      })
      .write();
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`App listening on port ${port}!`)
    );
  });
