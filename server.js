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

app.get('/projects', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('listings.hbs', {
            pageTitle: 'Bert\'s development learning projects',
            newText: 'Here you find links to the deployed heroku applications.',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`,
            pageLinks: getDataFromJSON('./public/data/projects.json')
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/DGB', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('listings.hbs', {
            pageTitle: 'DGB Acts met vuur',
            newText: 'Misschien iets voor volgend jaar?',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`,
            pageLinks: getDataFromJSON('./public/data/dgb.json')
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/Programming', (req, res) => {
    reqHost = req.headers.host;
    try {
        res.render('listings.hbs', {
            pageTitle: 'Programming links',
            newText: 'Interesting Programming Links',
            usefullLinks: `http://${reqHost}//${usefullLinks}`,
            helpPage: `http://${reqHost}//${helpPage}`,
            pageLinks: getDataFromJSON('./public/data/programming.json')
        });
    } catch (error) {
        console.log(error);
    }
})

app.get('/bad', (req, res) => {
    reqHost = req.headers.host
    res.send({
        errorMessage: 'Bad request.',
        helpPage: `http://${reqHost}//${helpPage}`,
        usefullLinks: `http://${reqHost}//${usefullLinks}`
    });
})

//Specifically for heroky, the portnumber must be an environment variable named 'port'.
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});


/**************************************** */
//    UTIL FUNCTIONS
/**************************************** */

//Function to read data from file 
function getDataFromJSON(fileName) {
    //var config = require('./config.json')
    var data = require(fileName)
    return data
}

/**************************************** */
//    HBS HELPER FUNCTIONS
/**************************************** */
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()

})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

hbs.registerHelper('customList', (book) => {
    //The json content file has a structure of "key : [{linkItem}, {linkItem}]"
    //linkItem has a structure of "{link, text, description}"
    //This function generates a <DIV> per "key + linkItems"
    //Only the first "key + linkItems" are visible
    var out = ''



    //*****************   TODO   */
    //I want that not all article show up at once but that we have an additional menu to select them from.
    //i want the DIVS to set to visible when a menu item is selected but can't get it to work.

    //****************** */
    var counter = 0

    //out = customListSelector(book)

    out = '<DIV id="all">'
    if (book) {
        for (list in book) {
            var display = (counter > 0) ? 'hidden' : ''

            out = out + '<div id="' + list + '" ' + display + '>'

            out = out + '<h1>' + list + '</h1>' + '\n'
            book[list].forEach(element => {
                out = out + '<a href=\"' + element.link + '\">' + element.text + '</a><br>' + element.description + '<br><br>' + '\n'
            });
            out = out + '</div>'

            //counter++
        }
    }
    out = out + '</DIV>'
    return new hbs.SafeString(out)
})

hbs.registerHelper('customListSelector', (book) => {
    var out = ''

    if (book) {
        for (list in book) {
            out = out + `<button onclick="myFunction(\'${list}\')">${list}</button>\n`
        }
    }
    return new hbs.SafeString(out)
})