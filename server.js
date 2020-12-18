const express = require('express')
const { read } = require('fs')
const app = express()
const port = 3000

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const https = require('https');

const options = {
    swaggerDefinition: {
      info: {
        title: "Microsoft LUIS API",
        version: "1.0.0",
        description: "Language Understanding",
      },
      host: "104.236.24.12/:3000",
      basePath: "/",
    },
    apis: ["./server.js"],
  };

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

//LUIS API's
const weatherApi = "https://siproject.cognitiveservices.azure.com/luis/prediction/v3.0/apps/93160191-c6ec-43ce-a2e6-71fb5681787f/slots/production/predict?subscription-key=7d437b07f11544bca6ab594b024550a7&verbose=true&show-all-intents=true&log=true&query=";
const todoApi = "https://siproject.cognitiveservices.azure.com/luis/prediction/v3.0/apps/d14e99b9-e29a-44b6-97b2-f335f0137873/slots/production/predict?subscription-key=7d437b07f11544bca6ab594b024550a7&verbose=true&show-all-intents=true&log=true&query=";
const calanderApi = "https://siproject.cognitiveservices.azure.com/luis/prediction/v3.0/apps/20637749-9c62-473c-9749-b2b9af46f509/slots/production/predict?subscription-key=7d437b07f11544bca6ab594b024550a7&verbose=true&show-all-intents=true&log=true&query=";
/**
 * @swagger
 * /weather/{query}:
 *    get:
 *      description: Get response from LUIS
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Got response form LUIS
 *          500:
 *              description: Error
 *      parameters:
 *          - name: query
 *            in: path
 *            required: true
 *            type: string
 *
 */
app.get('/weather/:query', (req, res) => {
    console.log(req.params.query)
    var param = req.params.query;
    if(param===undefined || param===null || param===""){
        res.status(500).send('The query cannot be null or empty.');
    }
    var luis_request = weatherApi+param
    https.get(luis_request, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        try {
          var fbResponse = JSON.parse(data);
          console.log("Response: "+fbResponse["prediction"]);
          res.send(fbResponse["prediction"]);
        } catch (error) {
          console.error(error);
        }
    });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(500).send(err.message);
    });
})


/**
 * @swagger
 * /calendar/{query}:
 *    get:
 *      description: Get response from LUIS
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Got response form LUIS
 *          500:
 *              description: Error
 *      parameters:
 *          - name: query
 *            in: path
 *            required: true
 *            type: string
 *
 */
app.get('/calendar/:query', (req, res) => {
  console.log(req.params.query)
  var param = req.params.query;
  if(param===undefined || param===null || param===""){
    res.status(500).send('The query cannot be null or empty.');
  }
  var luis_request = calanderApi+param
  https.get(luis_request, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
      data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
      try {
        var fbResponse = JSON.parse(data);
        console.log("Response: "+fbResponse["prediction"]);
        res.send(fbResponse["prediction"]);
      } catch (error) {
        console.error(error);
      }
  });

  }).on("error", (err) => {
      console.log("Error: " + err.message);
      res.status(500).send(err.message);
  });
})


/**
 * @swagger
 * /todo/{query}:
 *    get:
 *      description: Get response from LUIS
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Got response form LUIS
 *          500:
 *              description: Error
 *      parameters:
 *          - name: query
 *            in: path
 *            required: true
 *            type: string
 *
 */
app.get('/todo/:query', (req, res) => {
  console.log(req.params.query)
  var param = req.params.query;
  if(param===undefined || param===null || param===""){
    res.status(500).send('The query cannot be null or empty.');
  }
  var luis_request = todoApi+param
  https.get(luis_request, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
      data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
      try {
        var fbResponse = JSON.parse(data);
        console.log("Response: "+fbResponse["prediction"]);
        res.send(fbResponse);
      } catch (error) {
        console.error(error);
      }
  });

  }).on("error", (err) => {
      console.log("Error: " + err.message);
      res.status(500).send(err.message);
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://104.236.24.12/:${port}`)
})





/*
Weather-> https://siproject.cognitiveservices.azure.com/luis/prediction/v3.0/apps/93160191-c6ec-43ce-a2e6-71fb5681787f/slots/production/predict?subscription-key=7d437b07f11544bca6ab594b024550a7&verbose=true&show-all-intents=true&log=true&query=YOUR_QUERY_HERE
Calendar-> https://siproject.cognitiveservices.azure.com/luis/prediction/v3.0/apps/20637749-9c62-473c-9749-b2b9af46f509/slots/production/predict?subscription-key=7d437b07f11544bca6ab594b024550a7&verbose=true&show-all-intents=true&log=true&query=YOUR_QUERY_HERE
ToDO-> https://siproject.cognitiveservices.azure.com/luis/prediction/v3.0/apps/d14e99b9-e29a-44b6-97b2-f335f0137873/slots/production/predict?subscription-key=7d437b07f11544bca6ab594b024550a7&verbose=true&show-all-intents=true&log=true&query=YOUR_QUERY_HERE
*/