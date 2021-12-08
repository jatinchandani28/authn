var express = require('express');
var app = express();
var apiRouter = require('./src/router/index');
var port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.get('/test', (req, res) => {
    let moment = require('moment')
    let test = moment(new Date()).add(5, "hour").add(29, "m").toDate();
    res.json({ "message": "Api running start", "Y": test, "Value": "Test" })
})

//Router Way
app.use('/api/v1/', apiRouter);

// index page 
app.post('/', function (req, res) {
    res.send("Api started")
});

app.listen(port, () => {
    console.log("server start port =>" + port)
})