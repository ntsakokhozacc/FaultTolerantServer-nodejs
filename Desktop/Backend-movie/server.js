const express = require("express");
const userRouter= require('./src/users/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("hello world!");
});

app.use("/api/v1/users",userRouter);



app.listen(port, () => {
    console.log("server is listening");
});