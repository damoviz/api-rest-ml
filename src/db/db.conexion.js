const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

// connect to MongoDB
const conexionDB = async () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
    .then(() => console.log("conectado a mongo"))
    .catch(err => console.log(err))
}

module.exports = conexionDB