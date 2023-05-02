const Conversation = require("../models/Conversation");
const router = require("express").Router();

router.post("/",async (req,res,next)=>{
    const newConversation = new Conversation({
        members:[req.body.senderId, req.body.receiverId],
    });
    try {
        const {senderId,receiverId} = req.body;
        const con = await Conversation.find({members:{$all:[senderId,receiverId]}}).count();
        if(con>0){
            return res.json({msg:"Already added",status:false});
        }
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (e) {
        next(e);
    }
});

router.get("/:userId", async (req,res,next)=>{
    const conversation = await Conversation.find({
        members:{ $in:[req.params.userId] }
    });
    res.status(200).json(conversation);
})

module.exports = router;