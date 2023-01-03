const Base = require("./base");

module.exports = class Category extends Base{
    constructor({id , name, carsIds , price}){ 
        super({id , name})

      this.carsIds = carsIds;
      this.price = price
       
    }
}
