const sinon = require("sinon");
const Service = require("./service")
const {deepStrictEqual} = require("assert")

const BASE_URL_1="https://swapi.dev/api/planets/1";
const BASE_URL_2="https://swapi.dev/api/planets/2";
const mocks = {
    tatto : require("./mocks/tatto.json"),
    alderaan : require("./mocks/al.json")
}

;(async ()=> {
    const service =  new Service();

    const serviceStub = sinon.stub(service, service.makeRequest.name);
    serviceStub.withArgs(BASE_URL_1).resolves(mocks.tatto);
    serviceStub.withArgs(BASE_URL_2).resolves(mocks.alderaan);  

    {
        const expected = {
            "name" : "Tatooine",
            "surfaceWater": "1",
            "appearedIn": 5
        }
        const response = await service.getPlanets(BASE_URL_1);
        deepStrictEqual(response , expected)
    }
    {
        const expected = {
            "name" : "Alderaan",
            "surfaceWater": "40",
            "appearedIn": 2
        }
        const response = await service.getPlanets(BASE_URL_2);
        deepStrictEqual(response , expected)
    }


})()