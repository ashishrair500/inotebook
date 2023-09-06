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
   let success=false;
        //if there are errors , return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //check whether the user with this email exits already
        try {
            let user = await User.findOne({ email: req.body.email });              //ye layega email model se verify karne ke liye
                                                  //req.body.email is coming from frontend

            if (user) {
                return res.status(400).json({error: "Sorry a user with this email already exits" })
            }


            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);   //password is coming from frontend and adding salt and converting it into hash 


            user = await User.create({              //this funtion is to take json object from request body bad me yahi input area se lenge 
                           //The await keyword is used because creating a new user in the database might take some time, and 
                //  we want to wait for it to finish before moving on.
                         // User.create({...}): This line is using the Mongoose create method to insert a new user document into the "user" collection. The method takes an object as an argument, where each key corresponds to a field in your schema, and each value corresponds to the data you want to store in those fields.

                name: req.body.name,          //coming from frontend to store in database
                email: req.body.email,        //coming from frontend 
                password: secPass,
            })

//when the above user is created in the database then there is unique id of every user in the model;
//below we are using that id to create token 

//noteadda bali baat :-- yaaha pr apn subject ki id denge token banale ke liye. or subject ki backend pr bhi rakhsakte hai ya phir alag se model bana denge subject ka 
            console.log(user.id);
            const data = {
                user: {
                    id: user.id     //ye uhi collection bala user hai uhi se id utha rahe hai  //yaha pr id ka use karenge token banane ke liye or sath me  JWT_secret bhej denge;
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRET);      //jwt.sign: This is a function provided by the "jsonwebtoken" library, and it's used to generate a JWT token

            console.log(authtoken);
            // res.json(user);   
            //database to data gya or user ko mil jayegi ek token jo ki webbrower me ho jaygi store
            success=true;
            res.json({success,authtoken});                //res.json(user) is a method used to send a JSON response to a client (usually a web browser or another application making an HTTP request). 

//after user successfully stored in database "user" model backend will return response through res.json and it is sending success and auth token to frontend

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
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;        //this is coming from frontend and verify user after verifying it will return success and authtoken
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(404).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(404).json({ error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id                          //yaha pr id ka use karenge token banane ke liye or sath me  JWT_secret bhej denge;
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        success=true;
        // res.json(user);   
        //database to data gya or user ko mil jayegi ek token jo ki webbrower ho jaygi store
        res.json({success,authtoken});       

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");

    }

})

//-------------------------------------------------------------------------end----------------------------------------------------------------------------------

//faltu ka router in the point of view of frontend because it is not sending and response to frontend but vey neccessary for middleware
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

//ek essi bhi to key honi chahiye jo dono me common ho auth/User and note/notes.So we added user in the Notes Schema as a foreign key