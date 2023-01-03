const Base = require("./base");

module.exports = class CarCategory extends Base{
    constructor({id , name, carsIds , price}){ 
        super({id , name})

      this.carsIds = carsIds;
      this.price = price
       
    }
}
