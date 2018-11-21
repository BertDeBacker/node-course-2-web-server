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

hbs.registerHelper('customList', (list) => {

    var out = '';

    list.forEach(element => {
        out = out + '<a href=\"' + element.link + '\">' + element.text + '</a><br>' + element.description + '<br><br>' + '\n';
        //console.log(out);
    });

    return new hbs.SafeString(out);
});


var helpPage = "help.html";
var usefullLinks = "linksMain.html";
var reqHost;

app.get('/', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('main.hbs', {
            pageTitle: 'Home',
            newText: 'Text to come right here.',
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
        res.render('main.hbs', {
            pageTitle: 'About',
            newText: 'Text to come right here.',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`
        });
    } catch (error) {
        console.log(error);
    }
})


app.get('/projects', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('linksProgramming.hbs', {
            pageTitle: 'Bert\'s development learning projects',
            newText: 'Here you find links to the deployed heroku applications.',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`,
            pageLinks: [{
                link: 'https://enigmatic-springs-21183.herokuapp.com/',
                text: 'Chat app',
                description: 'Ongoing project - chat and location app'
            }, {
                link: 'https://obscure-coast-37769.herokuapp.com/',
                text: 'Todo App',
                description: 'Project with secure login and todos'
            }]
        });
    } catch (error) {
        console.log(error);
    }
})


app.get('/home', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('main.hbs', {
            pageTitle: 'Home',
            newText: 'Txt to come right here.',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`
        });
    } catch (error) {
        console.log(error);
    }
})


app.get('/links', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('main.hbs', {
            pageTitle: 'Links',
            newText: 'Txt to come right here.',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/DGB', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('linksProgramming.hbs', {
            pageTitle: 'DGB Acts met vuur',
            newText: 'Misschien iets voor volgend jaar?',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`,
            pageLinks: [{
                link: 'https://www.entertainmentartiesten.com/vuurspuwer-vuuranimatie-vuurvreten/',
                text: 'Vuurspuwer en Annimatie',
                description: ''
            }, {
                link: 'https://www.gusta.be/vuurspuwer/',
                text: 'Gusta vuurspectakel',
                description: ''
            }, {
                link: 'https://bedrijfs-animatie.be/vuurspuwer/',
                text: 'Vuurspuwer',
                description: ''
            }]
        });
    } catch (error) {
        console.log(error);
    }
})


app.get('/Programming', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('linksProgramming.hbs', {
            pageTitle: 'linksProgramming.hbs',
            newText: 'Interesting Programming Links',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`,
            pageLinks: [{
                    link: 'https://www.udemy.com/the-complete-nodejs-developer-course-2/',
                    text: 'Udemy, NodeJS developer course',
                    description: 'odeJS interactive training with teachter. <br> This training was purchased in October 2018.'
                }, {
                    link: 'https://www.npmjs.com/',
                    text: 'npm',
                    description: 'Library containing thousents of open source building blocks. <br> These blocks are free to use in your application.'
                }, {
                    link: 'http://expressjs.com/',
                    text: 'express',
                    description: 'Library facilitating webserver framework. <br> Extensive learning, help and documentation can be found on http://expressjs.com/'
                }, {
                    link: 'http://handlebarsjs.com/',
                    text: 'Handlebars',
                    description: 'Library for dynamic html (npm install hbs)'
                }, {
                    link: 'https://medium.freecodecamp.org/the-complete-javascript-handbook-f26b2c71719c',
                    text: 'Complete JavaScript handbook',
                    description: 'Free online book about JavaScript.'
                }, {
                    link: 'https://help.github.com/',
                    text: 'GitHub Help website',
                    description: 'Free online book about JavaScript.'
                }, {
                    link: 'https://mongodb.github.io/node-mongodb-native/',
                    text: 'MongoDB',
                    description: 'MongoDB and native MongoDB driver for NodeJS'
                }, {
                    link: 'https://mongoosejs.com/',
                    text: 'Mongoose',
                    description: 'Library for mongodb data manipulation for NodeJS'
                }, {
                    link: 'https://dashboard.heroku.com',
                    text: 'Heroku',
                    description: 'To publish NodeJs websites'
                }, {
                    link: 'https://github.com/',
                    text: 'Github',
                    description: 'To publish NodeJs websites'
                }, {
                    link: 'https://www.w3schools.com/howto/howto_js_full_page_tabs.asp',
                    text: 'w3school',
                    description: 'Website with all kid of web design reference materials'
                }, {
                    link: 'https://www.getpostman.com/',
                    text: 'postman',
                    description: 'Postman is a toolbox for testing and monitoring API\'s.'
                }, {
                    link: "https://httpstatuses.com/",
                    text: 'https statuses',
                    description: 'All https statuses that exist'
                }, {
                    link: 'http://blog.getpostman.com/2018/04/11/first-5-things-to-try-if-youre-new-to-postman/?mkt_tok=eyJpIjoiTnpZeE4ySTRObVV6WWpNdyIsInQiOiJZUEtrQnFtVjRCcTdsWllTVXN2ZmhnMFc2cWhGNjZqdmtQRlduRGZmeEpYTTRGTGxxa0N6T3IraEVGSUF3d3g0RW5cL1FYbUNuUUh5Sm5OaFJyWjNoSG9vOHFVT2xYalR4SjY4MmdrS0pQMG5JUmpKMlplSDBBSDQxdXRjUFg0ZzAifQ%3D%3D',
                    text: 'Try Postmans, 5 things to try out.',
                    description: 'Postman introduction'
                }, {
                    link: 'https://javascript.info/strict-mode',
                    text: 'JavaScript Info',
                    description: 'Javascrip programming info'
                }, {
                    link: 'https://developer.mozilla.org/nl/docs/Web/JavaScript',
                    text: 'Mozilla foundation - Javascript documentation',
                    description: 'documentation about the fantastic mozilla libraries to be used in your websites.'
                },
                {
                    link: 'https://www.knime.com/',
                    text: 'KNIME',
                    description: 'Open source ETL and much more'
                }, {
                    link: 'https://hackernoon.com/beginning-your-web-development-journey-start-here-7084346f5762',
                    text: 'hackernoon.com - Beginning your web development journey',
                    description: 'Article referring to fundamental webdevelopment training. <br> The following links refer to courses referred to in this article. <br> Principal message <b>Learn HTML, CSS, and Javascript exclusively.</b>'
                }, {
                    link: 'https://medium.freecodecamp.org/',
                    text: 'Programmer articles',
                    description: 'Read this to get into the Community'
                }, {
                    link: 'https://hackernoon.com/',
                    text: 'Programmer articles',
                    description: 'Read this to get into the Community'
                }, {
                    link: 'https://twitter.com',
                    text: 'Follow these guys on twitter for more specialised info.',
                    description: 'Caldera (shameless plug), Dan Abramov, Kyle Mathews, Christian Nwamba, Wes Bos, Jason Miller 🦊 ⚛, Scott Tolinski, Ryan Florence'
                }, {
                    link: 'https://www.google.com/search?q=html+training+online&ie=utf-8&oe=utf-8&client=firefox-b',
                    text: 'HTML and CSS',
                    description: 'Do not start learning libraries like Bootstrap start with plain HTML and CSS <br> https://www.codecademy.com/ <br> https://teamtreehouse.com/tracks/front-end-web-development'
                }, {
                    link: 'https://teamtreehouse.com/library/git-basics',
                    text: 'Git basics',
                    description: 'Things about GIT you must know.'
                }, {
                    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API',
                    text: 'Geolocation module embedded in all browsers',
                    description: 'This geolocation is support by alomost all browser. It is developped by developer.mozilla.org'
                }, {
                    link: 'http://momentjs.com/docs/',
                    text: 'momentjs date/time library',
                    description: 'Mostly used library for date/time handling in JavaScript'
                }

            ]
        });
    } catch (error) {
        console.log(error);
    }
})


app.get('/bad', (req, res) => {
    reqHost = req.headers.host;
    res.send({
        errorMessage: 'Bad request.',
        helpPage: `http://${reqHost}//${helpPage}`,
        usefullLinks: `http://${reqHost}//${usefullLinks}`
    });
})





//Specifically for heroky, the portnumber must be an environment variable named 'port'.
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);

});