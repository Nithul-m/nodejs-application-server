const express = require("express");
const app = express();
const bcrypt = require('bcrypt')
const saltround = 10

const users = [
    {username: 'tom', password: "$2b$10$UVLg9onsZibFWv1H3GyeD.2pUxeeI0fk1PF7xaJUhQ6zNAdjxHSA."}
]
app.use(express.urlencoded({extended:true}))

app.get('/register', (req,res) => {
    res.sendFile(__dirname + "/register.html")
})


app.post('/register', (req,res) => {

    const {username, password} = req.body;
    console.log(password, username);

    bcrypt.hash(password,saltround,(err,hash)=>{
        if(err){
            res.send(err.message);

        }else{
            console.log(hash);
            res.redirect('/')
        }

});
})
app.get('/',async(req,res)=>{
    res.sendFile(__dirname + "/login.html")

})

app.post('/',async(req,res)=>{
const {username,password} = req.body
const user = users.find((user)=> user.username === username)
if(!user){
    res.send("Invalid Credentials")
}  
           
    bcrypt.compare(password, user.password, (err, isPassword)=>{
        if(err){
            res.send("invalid credentials")
        }else if(!isPassword){

            res.send("invalid credentials")

        }

        else{
            res.redirect("/profile")
        }
    })

}
)

app.get('/profile',(req,res)=>{
    res.sendFile(__dirname + '/profile.html')

})

app.listen(4000, ()=>{
    console.log('Server is running on port 4000');
})