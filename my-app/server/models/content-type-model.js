const {Schema , model}=require("mongoose")

const contentTypeSchema=new Schema({
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    status:{
        type: Boolean,
        required : true
    },
    imagefile:{
        type: String,
        // uploadDate: { type: Date, default: Date.now },
        required : true
    },
    uploadDate: { 
      type: Date, 
      default: Date.now 
    },
},
{timestamps:true})

const ContentType=new model("ContentType",contentTypeSchema);
module.exports=ContentType;