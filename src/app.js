require('dotenv').config()
const express = require('express')
const app = express()
const conexionDB = require("./db/db.conexion")
const routerTrace = require("./routes/trace.routes")
const routerStats = require("./routes/stats.routes")

// connect to MongoDB
conexionDB()

// settings
app.set("name", "rest-api-ml")
app.set("port", process.env.PORT || 3005)

// BodyParser middleware
app.use(express.json())

// routes
app.use("/trace", routerTrace)
app.use("/stats", routerStats)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

module.exports = app