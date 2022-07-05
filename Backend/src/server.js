const app = require("./index.js");
const connect = require("./config/db");
require("dotenv").config();

app.listen(process.env.PORT || 5000, async()=>{
    try {
        await connect();
    } catch (error) {
        console.log("error");
    }
    console.log("listening on port 5000");
})