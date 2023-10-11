const express = require("express")
const app = express()

app.use(express.urlencoded({extended:true}))



// const postSchema = new mongoose.Schema({
//     title:String,
//     content:String
// })

// const Post = mongoose.model('Post',postSchema)



app.get("/",(req,res) =>  {
    res.sendFile(__dirname + '/index.html')
})

app.post("/", (req,res)=>{
    console.log(req.body);

    const newPost = new Post({
        title:req.body.title,
        content:req.body.content
    })


    newPost.save()
    res.send("Form submitted")
})

module.exports = app