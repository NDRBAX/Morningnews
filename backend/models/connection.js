var mongoose = require('mongoose');

const admin = 'admin';
const pass = 'admin';
const projectName = 'morningnews';
const uri = `mongodb+srv://${admin}:${pass}@${projectName}.8y8c8.mongodb.net/${projectName}?retryWrites=true&w=majority`;


var options = {
    connectTimeoutMS: 5000,
      useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, options, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database !");
    }
});

module.exports = mongoose;