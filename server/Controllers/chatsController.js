import Chat from "../models/chatSchema.js"
import User from "../models/userSchema.js";

const accessChat = async (req, res) => {
    const { userId } = req.body;

    try {
        if (!userId) {
            console.log("UserId param not sent with request");
            return res.status(400);
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ],
        })
            .populate("users", "-password")
            .populate("latestMessage")

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name pic email",
        })

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            var newChat = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };

            try {
                const createdChat = await Chat.create(newChat);
                const fullChat = await Chat.findOne({ _id: createdChat._id })
                    .populate("users", "-password")

                res.status(200).send(fullChat);
            }
            catch (error) {
                res.send(404);
            }
        }
    }
    catch (error) {
        res.send(404);
    }
}

const fetchChats = async (req, res) => {
    try {
        const chats = Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                res.status(200).send(results);
            })

    } catch (error) {
        res.status(400)
    }
}

const createGroup = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send("More than 2 users are required to create a group chat");
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({
            _id: groupChat._id
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json(fullGroupChat);
    }
    catch (error) {
        res.status(400)
        throw new Error(error.message);
    }
}

const renameGroup = async (req, res) => {

    const { chatId, chatName } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                chatName: chatName
            },
            {
                new: true
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!updatedChat) {
            res.status(404);
            throw new Error("Chat not found");
        } else {
            res.json(updatedChat);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const groupAdd = async (req, res) => {

    const { groupId, userId } = req.body;

    try {
        const newGroupChat = await Chat.findByIdAndUpdate(
            groupId,
            {
                $push: { users: userId },
            },
            {
                new: true
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!newGroupChat) {
            return res.status(404).send("Group chat not found")
        }

        res.status(200).json(newGroupChat);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const groupRemove = async (req, res) => {

    const { groupId, userId } = req.body;

    const currGroup = await Chat.findById(groupId);

    if (currGroup.groupAdmin._id == userId) {
        return res.status(404).send("Admin cannot be removed")
    }

    try {
        const newGroupChat = await Chat.findByIdAndUpdate(
            groupId,
            {
                $pull: { users: userId }
            },
            {
                new: true
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!newGroupChat) {
            return res.status(404).send("Group chat not found")
        }

        res.status(200).json(newGroupChat);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}


export { accessChat, fetchChats, createGroup, renameGroup, groupAdd, groupRemove };
