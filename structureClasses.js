class Article  {

    //NOTE
 
    
    constructor(title, link, description,  linkIcon){
        this._link = link
        this._description = description
        this._title = title
        this._linkIcon = linkIcon
    }
    
    get title (){return this._title}
    set title (val) {this._title = val}

    get link () {return this._link}
    set link (val) {this._link=val}

    get description() {return this._description}
    set description (val) {this._description = val}    

    get linkIcon(){ return this._linkIcon}
    set linkIcon(val) {this._linkIcon = val}
}

class Section {

    constructor(name){
        this._name = name
        this._articles = []
    }

    get name (){return this._name}
    set name (val) {this._name = val}

    get articles() {return this._articles}
    set article (val) {this._articles = val}

    addArticle (art) {
        if (this._articles.find(item => item.title === art.title )) throw new Error(`Cannot add article, article.title = ${art.title} already exist.`)
        this._articles.push(art)
    }

    removeArticle (art) {
        let result = this._articles.map(item=> { if(item.title != art.title) { return item} })
        this._articles = result       
    }
}

class Page {
    //Constructor    
    constructor(name){
        this._name = name
        this._sections = []
        if (name) {this.load()}
    }
    
    //Getter and Setters
    get name () {return this._name}
    set name (val) {this._name = val}

    get sections () {return this._sections}
    set sections (val) {this._sections = val}

    //addSection - removeSection
    addSection  (sec) {
        let retVal = false

        //Check if the section already exists
        if (!this.getSectionByName(sec.name)) {
            //The section does not exist, add it to the array
            this._sections.push(sec)
            //The operation was success
            retVal = true
        }
   
        return retVal
    }

    removeSection  (sec) {

        let retVal = false
        //Create a new array, without the selected value
        let result = this._sections.map(item =>  item.title != sec.title)

        //If the original array is longer than the new array then the remove operation was successfull
        if (this._sections.length > result.length) retVal = true

        //Replace the original arrya with the new array
        this._sections = result       

        //Return the result of the operation
        return retval
    }

    
    //getSectionByName
    getSectionByName (name) {
        let section = this._sections.find (element => element.name === name)
        return section
    }

    //Save the page object to disk
    save() {
        var fs = require('fs')
        
        if (!this._name) throw new Error('Could not save the page, page.name is not set.')

        //Check if the filename has .json extension
        var filename = ''
        if(this._name.includes('.json')) {filename = this._name} else {filename = `${this._name}.json`}

        //Write this object to a file
        fs.writeFile(filename, JSON.stringify(this, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log(`File ${filename} has been saved.`);
        });
    }  

    //Load the file from disk
    load () {    
        var fs = require('fs');

        if (!this._name) return

        //Check if the filename has .json extension
        var filename = ''
        if(this._name.includes('.json')) {filename = this._name} else {filename = `${this._name}.json`}

        if (!fs.existsSync(filename)){
            //File does not exist, nothing to load
            return
        }

        //Read from disk and parse to Object
        let rawdata = fs.readFileSync(filename); 
        let o  = JSON.parse(rawdata)

        //Recreate a Page/Section/Article structure using objects
        o._sections.forEach(element => {
                let sec = new Section(element._name)          
                
                element._articles.forEach(art => {

                    let item = new Article(art._title,art._link,art._description,art._linkIcon)
                    sec.addArticle(item)
                })
                
                this.addSection(sec)
        });
        }
}

//Method to generate a unique object ID, we currently do not use this
var ObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

module.exports = {Page, Section, Article}