import Message from '../models/messageSchema.js'
import User from '../models/userSchema.js'
import Chat from '../models/chatSchema.js'

const sendMessage = async (req, res) => {

    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log("invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage);
        //here we create instance of Message schema

        message = await message.populate('sender', 'name pic');
        //here we combine the name and pic of the user from Message sceme

        message = await message.populate('chat')

        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name email pic'
        });
        //the below not able to understand
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);

    } catch (error) {
        res.send(404);
    }
}

const allMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate('sender', 'name pic email')
            .populate('chat')
        res.json(messages);

    } catch (error) {
        res.status(404);
    }
}
export { sendMessage, allMessages };