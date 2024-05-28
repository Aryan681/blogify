const{Schema ,model}= require("mongoose");
const ContactSchema = new Schema({
    name: String,
    Email: String,
    message : String,

});

const Contact = model('Contact', ContactSchema);
module.exports = Contact;