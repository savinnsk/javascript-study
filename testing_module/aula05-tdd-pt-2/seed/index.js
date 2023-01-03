const faker = require('faker');
const CarCategory = require("../src/entities/carCategory");
const Car = require("../src/entities/car");
const Customer = require("../src/entities/customer");
const {join} = require('path');
const { writeFile } = require('fs/promises');

const seederBaseFolder = join(__dirname,"../", "database")
const ITEMS_AMOUNT = 2

const cars = [];
const customers = [];


const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carsIds: new Array(),
    price : faker.finance.amount(20, 100)
})



for (let index = 0; index <= ITEMS_AMOUNT ; index++) {

  const car = new Car({
    id : faker.random.uuid(),
    name : faker.vehicle.model(),
    available : true,
    gasAvailable : true,
    releaseYear: faker.date.past().getFullYear()
   });
  
   const customer = new Customer({
    id : faker.random.uuid(),
    name : faker.name.findName(),
    age : faker.random.number()
   })

  carCategory.carsIds.push(car.id);
  cars.push(car);
  customers.push(customer)
}


const write = (filename, data) => writeFile(join(seederBaseFolder, filename) , JSON.stringify(( data)))

;(async ()=>{
  
  await write('cars.json', cars);
  await write('carCategory.json' , [carCategory])
  await write('customer.json' , [customers])
  
  console.debug(cars);
  console.debug(carCategory)

})()




