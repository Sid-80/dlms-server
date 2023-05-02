const router = require("express").Router();
const Message = require("../models/Message");

router.post("/", async (req,res,next)=>{
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (e) {
        next(e);
    }
});

router.get("/:conversationId", async(req,res,next)=>{
    try {
        const messages = await Message.find({
            conversationId:req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (e) {
        next(e);
    }
});

module.exports = router;