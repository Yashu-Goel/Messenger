import express from 'express';
import dotenv from 'dotenv';
import auth from './router/auth.js';
import chatRoutes from './router/chatRoutes.js';
const app = express();

dotenv.config();
app.use(express.json());

app.use(auth);
app.use(chatRoutes);

app.get('/', (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})