const faker = require('faker');
const Category = require("../src/entities/category");
const Car = require("../src/entities/car");
const Customer = require("../src/entities/customer");
const {join} = require('path');
const { writeFile } = require('fs/promises');

const seederBaseFolder = join(__dirname,"../", "database")
const ITEMS_AMOUNT = 2




const carCategory = new Category({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    carsIds: new Array(),
    price : faker.finance.amount(20, 100)
})


let cars = [];

for (let index = 0; index <= ITEMS_AMOUNT ; index++) {
  const car = new Car({
    id : 1,
    name : faker.vehicle.model(),
    available : true,
    gasAvailable : true,
    releaseYear: faker.date.past().getFullYear()
   });
  
 

  console.log(carCategory)
  carCategory.carsIds.push(car.id);
  cars.push(car);

}


const write = (filename, data) => writeFile(join(seederBaseFolder, filename) , JSON.stringify((data)))

;(async ()=>{
  
  await write('cars.json', cars);
  await write('carCategory.json' , [carCategory])
  
  console.log(cars);
  console.log(carCategory)

})()




