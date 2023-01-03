const { describe , it, before, beforeEach , afterEach } = require("mocha")
const { join } = require("path")
const { deepStrictEqual } = require("assert")
const { expect } = require("chai")
const { sandbox } = require("sinon")
const sinon = require("sinon")

const CarService = require("../../src/service/car.service")

const mocks = {
  validCar : require("../mocks/valid.car.json"),
  validCategory : require("../mocks/valid.category.json"),
  validCustomer : require("../mocks/valid.customer.json")
}

const carsDataBase = join(__dirname , "./../../database" , "cars.json")

describe(" CarsService suite test", ()=>{

  let carService = {} 
  let sandbox = {}


  afterEach(()=>{
    sandbox.restore()
  })

  before(()=>{
    carService = new CarService({
      cars : carsDataBase
    }) 
  })


  beforeEach(()=>{
    sandbox = sinon.createSandbox()

  })


  it("should retrieve a random position fron an array" , async ()=>{

    const array = [1, 2, 3, 4, 5]
    const result = carService.getRandomPositionFromArray(array)

    expect(result).to.be.lte(array.length).and.be.gte(0)
  })


  it("should choose the first id from carIds in carCategory" , ()=>{
    const carCategory = mocks.validCategory

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(0)


    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carsIds[0]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)

  })


  it("given a carCategory it should return an available car" , async ()=>{

    const car = mocks.validCar;
    const carCategory = mocks.validCategory;
    carCategory.carsIds = [car.id]

    
    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name, 
      ).resolves(car)
      
      sandbox.spy(
        carService,
        carService.chooseRandomCar.name, 
        )
        
        const expected = car 
        const result = await carService.getAvailableCar(carCategory)
    
    
        expect(carService.chooseRandomCar.calledOnce).to.be.ok  
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)
  })



})
