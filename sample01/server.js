const express = require('express');
const app = express();
const PORT = 7000;
const router = express.Router()
const path = require("path")

const users = [
    {username:"tom", password:"124"}, 
    {username:"jerry", password:"125"}

]
// const consoleMiddleware = ( req,res,next) =>{
//     console.log("console middleware");
//     next()


// }
// app.use(consoleMiddleware)

// app.get('/about', consoleMiddleware, (req,res,next)=>{
//     next();
// })
// app.get('/about', (req,res) =>{

//     res.send("it's about page");

// } )
// router.get('/about', (req,res) =>{

//     res.send("it's about page");

// } )
app.get('/home', (req,res) =>{

    res.send("it's home page");

} )
router.get('/home', (req,res) =>{

    res.status(200).send("it's home page");

} )
// router.get('/contact', (req,res) =>{

// throw new Error("error 404")
// } )

// app.post('/register', (req,res)=>{

//     res.status(201).send("user registered successfully")
// })
//mount
// app.use((err,req,res,next)=>{
//     console.log("error handling midware");
//     res.status(404).send(err.message);
// })
app.use('/public', express.static("images"))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static("html"))
//application level middleware - app.use, app.httpmethods//
// router level middleware
//error handling middleware

//builtin middlewares
app.use(express.urlencoded({extended:true}))
router.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

router.get('/login', (req,res) =>{

    // res.status(200).send("it's login page");
    res.sendFile(__dirname + "/login.html")

} )
router.post('/',(req,res)=>{
    console.log(req.body);
    res.status(300).redirect('/login')
    // res.status(201).send("signup completed!")
    // res.sendFile(__dirname + '/index.html')
})
router.post('/login', (req,res) =>{
    // res.status(300).redirect('/login')
    // res.status(200).send("it's login page");
    // res.sendFile(___dirname + "/login.html")
    const {username,password} = req.body;
    // console.log(req.body);
    const user = users.find((user) => user.username === username && user.password === password)
    // console.log(user);
    if(!user) {
        res.redirect("/login")
    }else
    {res.redirect("/home")
    console.log("username", username);
    // console.log("password",password);
    res.send("login success")

} })


console.log(__dirname);
app.use('/',router) //mount

app.listen(PORT, ()=> {

    console.log(`Server is running on port ${PORT}`);

})