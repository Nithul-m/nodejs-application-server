
const app = require("./app")
const databaseConnection = require('./config/databaseConnection')
const dotenv = require("dotenv")
dotenv.config({path:'./config/config.env'})
databaseConnection()

app.listen(process.env.PORT, ()=> {

    console.log(`Server is running on port ${process.env.PORT}`);

})