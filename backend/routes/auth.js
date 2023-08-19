//this is router for authentication of the User Model sahi user hai ki nhi  

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');                      //to validate correct email,name etc 
const User = require('../models/User');                                             //importing User model for rounting
const { useState } = require('react');
const JWT_SECRET = 'Harryisagoodboy';
const fetchuser = require('../middleware/fetchuser');

//Route 1:- create a user using POST "/api/auth/". does't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),                         //create a array and add all validation 
    body('email', 'Enter a valid email').isEmail(),                                  //validation we cal also create custom validator
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),  //validation 
],

    //Promises: Inside an async function, you can use await with a promise. Promises are a way to handle asynchronous operations in JavaScript. The await keyword waits for the promise to be resolved, and then the function continues executing. If the promise is rejected, you can handle the error using a try...catch block.
    async (req, res) => {

        //if there are errors , return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check whether the user with this email exits already
        try {
            let user = await User.findOne({ email: req.body.email });              //ye layega email model se verify karne ke liye


            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exits" })
            }


            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);


            user = await User.create({              //this funtion is to take json object from request body bad me yahi input area se lenge 
                name: req.body.name,             //The await keyword is used because creating a new user in the database might take some time, and 
                                                 //  we want to wait for it to finish before moving on.
                email: req.body.email,          // User.create({...}): This line is using the Mongoose create method to insert a new user document into the "user" collection. The method takes an object as an argument, where each key corresponds to a field in your schema, and each value corresponds to the data you want to store in those fields.
                password: secPass,
            })

console.log(user.id);
            const data = {
                user: {
                    id: user.id     //ye uhi collection bala user hai  uhi se id utha rahe hai  //yaha pr id ka use karenge token banane ke liye or sath me  JWT_secret bhej denge;
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log(authtoken);
            // res.json(user);   
            //database to data gya or user ko mil jayegi ek token jo ki webbrower me ho jaygi store
            res.json(authtoken);                //res.json(user) is a method used to send a JSON response to a client (usually a web browser or another application making an HTTP request). 


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }                                                          //sending to mongocompass
    })



//-------------------------------------------------------------------------end----------------------------------------------------------------------------------


//Route 2:- Authenticate a User using :POST "/api/auth/login".No login required
router.post('/login', [
    //create a array and add all validation 
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(404).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id                          //yaha pr id ka use karenge token banane ke liye or sath me  JWT_secret bhej denge;
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        // res.json(user);   
        //database to data gya or user ko mil jayegi ek token jo ki webbrower ho jaygi store
        res.json(authtoken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");

    }

})

//-------------------------------------------------------------------------end----------------------------------------------------------------------------------


//Route 3:- jo user login hai uski detail pane ke liye (jaise email,name,id) password ko chhodhkr. lekin ham yaha pr uski id nikaal rahe hai kyuki ek user id se uniquely identified ho jayega using:POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        console.log(req.user.id)
        const userId = req.user.id;   //user.id is coming from Notes.js from database
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");

    }
});
module.exports = router

//ek essi bhi to key honi chahiye jo dono me common ho auth/User and note/notes.      So we added user in the Notes Schema as a foreign key