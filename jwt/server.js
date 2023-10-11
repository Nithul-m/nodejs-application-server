const express = require("express")
const app = express()
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


dotenv.config({path:'./config/config.env'})

app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const users = [
    {username:"tom", password:"123"}
]
app.get('/',(req,res) => {
    const {token} =req.cookies
    if(token){
        res.redirect('/profile')


}else{
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,result)=>{
        if(result){
            console.log(result.message);

            res.redirect('/profile')

        }else{

            res.sendFile(__dirname + "/login.html")

        }
    })
}})

app.post('/',(req,res) => {
const {username,password} = req.body
const user = users.find((user) =>user.username === username && user.password === password)

if(!user){
    res.redirect('/')

}else{
    const data = {
        username,
        time:Date()
    }
    const token =jwt.sign(data, process.env.JWT_SECRET_KEY,{expiresIn:'10min'})
    res.cookie('token', token).redirect('/profile')

}
})

app.get('/profile',async(req,res)=>{

        res.sendFile(__dirname + "/profile.html")
})
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})