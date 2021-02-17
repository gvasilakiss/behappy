var express = require("express");
var ml = require('ml-sentiment')();
var app = express();

app.get('/:text', (req, res) => {
    let text = req.params.text
    let ml_res = ml.classify(text);
    console.log(ml_res);
    if (ml_res > 1) {
        res.send("You have a good mood")
    }
    else if (ml_res < 0 ) {
        res.send("You have a bad mood")
    } else {
        res.send("You have a neutral mood")
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
// Allow CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
