import express from 'express';
import router from './router/auth.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);

app.get('/', (req,res) => {
res.send("Hello World")
})

app.listen(PORT,() => {
console.log(`Listening to port ${PORT}`);
})