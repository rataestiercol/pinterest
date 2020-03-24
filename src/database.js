const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pinterest', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(db => console.log('DB is CONECTED'))
    .catch(err => console.log(err));