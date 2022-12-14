const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects , deepEqual } = require("assert");
// auto executable
(async () => {

    {
    const filePath = "./mocks/empty-file-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result =  File.csvToJson(filePath);
    await rejects(result, rejection);
    }
    {
    const filePath = "./mocks/four-items-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
    }
    {
    const filePath = "./mocks/three-items-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
  {
    "id": 123,
    "name": "Savio",
    "professional": "Nodejs",
    "birthDay": 2000
  },
  {
    "id": 321,
    "name": "Lara",
    "professional": "React",
    "birthDay": 2000
  },
  {
    "id": 231,
    "name": "Vinicius",
    "professional": "Next",
    "birthDay": 2000
  }
]
    deepEqual(JSON.stringify(result) , JSON.stringify(expected))
    }

    //const filePath = "./../mocks/three-items-valid.csv";
})();
