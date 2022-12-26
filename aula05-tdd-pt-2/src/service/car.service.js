const BaseRepository = require("../repository/base/base.repository")

module.exports = class CarService {

  constructor({cars}){
    this.carRepository = new BaseRepository({ file : cars})
  }


  chooseRandomCar(carCategory){
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carsIds)
    const carId = carCategory.carsIds[randomCarIndex]

    return carId
      
  } 

  getRandomPositionFromArray(array){
    const length = array.length

    return Math.floor(
      Math.random() * (length)
    )

  }

  findById(id){
    return this.carRepository.find(id)
  }

  async getAvailableCar(carCategory){

    const carId = this.chooseRandomCar(carCategory)
    const car = await this.findById(carId)
    return car

  }
}
