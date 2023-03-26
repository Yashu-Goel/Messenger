const express = require('express')
const app= express()
const router = require('./router/auth')
app.use(express.json());
app.use(router)
const dotenv=require('dotenv');
dotenv.config();
const PORT= process.env.PORT;

app.get('/', (req,res)=>
{
    res.send("Hello World")
})


app.listen(PORT,()=>
{
    console.log(`Listening to port ${PORT}`);
})
