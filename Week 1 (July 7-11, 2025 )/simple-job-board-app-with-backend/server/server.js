const express = require("express")
const app = express()
const jobRoutes = require("./routes/JobRoute")
const cors = require('cors')

const PORT = 4000
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json())

app.use("/job", jobRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})