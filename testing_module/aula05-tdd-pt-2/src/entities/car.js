const Base = require("./base");

module.exports = class Cars extends Base{
    constructor({id , name , releaseYear , available , gasAvailable}){ 
        super({id , name});

        this.releaseYear = releaseYear;
        this.available = available;
        this.gasAvailable = gasAvailable
    }
}