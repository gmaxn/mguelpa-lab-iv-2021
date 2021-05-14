const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/angularapp'));
app.use(bodyParser.json());
app.use(cors())

app.listen(process.env.PORT || 8080);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/angularapp/index.html'));
});

app.post('/mailer', (req, res) => {});

console.log('Build successful!!');
