const mongoose = require('mongoose');

const {DB_HOST,DB_NAME} = process.env;

MONGODB_URI = `mongodb://${DB_HOST}/${DB_NAME}`

mongoose.connect(MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
})

    .then(db=>console.log('DB is connected'))
    .catch(err=>console.log(err))
