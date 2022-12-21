const http = require("http");
const DEFAULT_USER = {username:"savio" , password:"123"}
 
const routes = {

    "/contact:get":(req , res)=>{
        res.write("contact page")
        return res.end()
    },

    "/login:post":async (req , res)=>{
        // res is a iterator
        for await(const data of req){
            const user = JSON.parse(data)
            if(
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ){
                res.writeHead(401)
                res.write("login failed")
                return res.end()
            }

            res.write("logging has success")
            return res.end()
        }
    },


    default:(req , res)=>{
        res.write("hello")
        return res.end()
    }
}

const handler = (req, res) => {
    const { url , method} = req;
    const routeKey = `${url}:${method.toLowerCase()}`;
    const chosen = routes[routeKey] || routes.default;
    res.writeHead(200, {
        "Content-Type":"text/html"
    });

    return chosen(req , res)
} 

module.exports = app = http.createServer(handler);

app.listen(3000, ()=>{console.log("app running at port:3000")})