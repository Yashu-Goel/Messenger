import express from "express";
import authUser from "../middleWare.js/authUser.js";
import { sendMessage, allMessages } from "../Controllers/messageController.js"

const Router = express.Router();

Router.route('/').post(authUser, sendMessage);
Router.route('/:chatId').get(authUser, allMessages);

export default Router;