import express from "express";
import authUser from "../middleWare.js/authUser.js";
import { accessChat, fetchChats, createGroup, renameGroup, groupRemove, groupAdd } from "../Controllers/chatsController.js"

const Router = express.Router();

Router.route('/chat').post(authUser, accessChat);
Router.route('/chat').get(authUser, fetchChats);
Router.route('/group').post(authUser, createGroup);
Router.route('/rename').put(authUser, renameGroup);
Router.route('/groupRemove').put(authUser, groupRemove);
Router.route('/groupAdd').put(authUser, groupAdd);

export default Router;