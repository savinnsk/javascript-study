const { readFile } = require("fs/promises");
const { error } = require("./constants");
const User = require("./user");

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "professional", "age"],
};

class File {
    
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath);
        const validation =  File.isValid(content);
        if (!validation.valid) throw new Error(validation.error);
        const users = File.parseCsvToJson(content)
        return users;
    }

    
    static async getFileContent(filePath) {
        //to await readfile after read with encoded
        return (await readFile(filePath)).toString("utf8");
    }

    static async isValid(csvToString, options = DEFAULT_OPTIONS) {
        const [header, ...fileWithoutHeader] =csvToString.split("\n");
        const isHeadValid = (header === options.fields.join(","));

        
        if (!isHeadValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false,
            };
        }

        const isContentLengthAccepted =(fileWithoutHeader.length > 0 && fileWithoutHeader.length <= options.maxLines);

        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false,
            };
        }
            return { valid: true }

        
    }

    static async parseCsvToJson(csvString){
        const lines = csvString.split("\n")
        //remove first item
        const firstLine = lines.shift()
        const header = firstLine.split(",")
        const users = lines.map(line =>{
            const columns = line.split(',')
            let user = {}
            for(const index in columns){
                user[header[index]] = columns[index]
            }
            return new User(user)
        })
    }
};

module.exports = File