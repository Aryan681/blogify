const{Schema ,model}= require("mongoose");
const{randomBytes,createHmac}=require("crypto");

const { createTokenForUser } = require("../SERVICES/authentication");

// database schema
const userSchema =new Schema ({

    fullname: {
        type: String,
        required: true,
    },
   email: {
        type: String,
        required : true,
        unique :true ,
    },
    role:{
        type:String,
        enum: ["USER","ADMIN"],
        default :"USER",

    },
    salt:{
        type: String,
       
    },
   password: {
        type: String,
        required: true,
       
},
    profileImageURL:{
        type : String,
        default:"/images/man.png",

    },
},
{ timestamps: true });

// converting the user original password tho more secure password of 16 character
userSchema.pre("save",function(next){ // before saving the password
    const user = this; 
    if (!user.isModified("password"))return; // if password not set 
    const salt = randomBytes(16).toString();// generating the random 16 character
    const hashPassword= createHmac("sha256",salt) // using the sha256 algo and map it to the salt
    .update(user.password) // update the user password with new encrypted password
    .digest("hex");
    user.salt = salt;
    this.password = hashPassword;
    next();
})

userSchema.static("matchPasswordAndGenerateToken", async function(email,password){ // match  the  password at the time of the login
    const user = await this.findOne({email}); 
    if (!user) throw new Error ("User not found") ; // if no user  set 

    const salt = user.salt;
    const hashPassword= user.password; // fetching the password the use set 
    const userProvidedHash =createHmac("sha256",salt) 
    .update(password) // update the user password with new encrypted password
    .digest("hex");

    if(hashPassword !== userProvidedHash) throw new Error ("password is incorrect") ;

    //return the token if password is matched
     const token = createTokenForUser(user);
     return token ;
 
})




const User = model('User', userSchema);
module.exports = User;
