const express = require("express")
const app = express()
const jobRoutes = require("./routes/JobRoute")
const cors = require('cors')

const PORT = 4000
app.use(cors({ origin: "https://frontend-job-board-app.vercel.app/" }));

app.use(express.json())

app.use("/job", jobRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})