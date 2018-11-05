const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Specifically for heroky, the portnumber must be an environment variable named 'port'.
//If the environment variable does not exist, then we use 3550.
var port = process.env.PORT || 3550;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: method: ${req.method} url: ${req.url} hostname: ${req.hostname} ip: ${req.ip} `;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Unable to append to server.log.');
    })
    next();
})

/* app.use((req, res, next) => {
    res.render('maintenance.hbs');

}) */

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();

})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

var helpPage = "help.html";
var usefullLinks = "linksMain.html";
var reqHost;

app.get('/', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('home.hbs', {
            pageTitle: 'Home.hbs',
            newText: 'home home home',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/about', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('about.hbs', {
            pageTitle: 'About.hbs',
            newText: 'about about about',
            helpPage: `http://${reqHost}//${helpPage}`
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/projects', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('projects.hbs', {
            pageTitle: 'Projects.hbs',
            newText: 'The full projects portfolio comes here.',
            helpPage: `http://${reqHost}//${helpPage}`
        });
    } catch (error) {
        console.log(error);
    }
})


app.get('/home', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('home.hbs', {
            pageTitle: 'Home.hbs Page',
            newText: 'Home sweet home ...',
            helpPage: `http://${reqHost}//${helpPage}`
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/bad', (req, res) => {
    reqHost = req.headers.host;
    res.send({
        errorMessage: 'Bad request.',
        helpPage: `http://${reqHost}//${helpPage}`
    });
})


//Specifically for heroky, the portnumber must be an environment variable named 'port'.
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);

});