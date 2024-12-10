const {Schema , model}=require("mongoose")

const contentTypeSchema=new Schema({
    title:{
        type: String,
        require : true
    },
    description:{
        type: String,
        require : true
    },
    status:{
        type: Boolean,
        require : true
    }
},
{timestamps:true})

const ContentType=new model("ContentType",contentTypeSchema);
module.exports=ContentType;