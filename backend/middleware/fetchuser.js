//iska frontend se koi sambandh nhi hai
//the main work of the middleware is to establish coordination between user and note model of mongo
//for noteadda we can use this middleware between our subject model and note model
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';


const fetchuser=(req,res,next)=>{
//get the user from the jwt token and add to req object
const token=req.header('auth-token');                          
/*
see here whenever we signup or signIn client get a token as reponse which is consist of id+JWT_SECRET  here for testing purpose. we are sending token through header as variable auth-token. 
since that token is consist of id and JWT_SECRET;
*/
if(!token){
res.status(401).send({error:"Please authenticate using a valid token"})

}

try{
    const data=jwt.verify(token, JWT_SECRET);    
/*

there are two types of ids 
1.id 64de43366a2781e4cbd1af8b           this is related to particular data (means as in table each row has its unique id);
2.user  64dcff53d26fcefd41f59b47         and this is related to a particular user . same for all the data coloumn of a user;

    This will return a object example: { user: { id: '64dcff53d26fcefd41f59b47' }, iat: 1692248715 }
    token ko verify karega with the help of JWT_SECRET. 
    And return a object which contains user ID.
    
    now if we want to fetch ,add ,alter,delete through Notes.js Schema we will use this middleware. 

*/
   // console.log(data);
    req.user=data.user;    // ab jo object return hua tha jwt se uske user ko (by data.user)  req.user ko assing kr denge  
    //  The line req.user = data.user; simply assigns the value of the user property from the data object to the req.user property. It seems like this is part of a middleware or route handler in an Express.js application where the goal is to make the authenticated user's information available for further processing.   
    //the first middleware assigns the user data to req.user, and then the /profile route handler can access that user data from req.user to send a JSON response containing the user information.
    next();
}catch(error){
    res.status(401).send({error:"Please authenticate using a valid token"})
}

}
module.exports = fetchuser; 
