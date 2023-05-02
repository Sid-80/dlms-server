const mongoose = require('mongoose');

const DB = "mongodb+srv://DLMS123:Siddharth123@cluster0.xzylx6t.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}).then(() => {
    console.log("connected !!");
}).catch((err) => { console.log(err)});