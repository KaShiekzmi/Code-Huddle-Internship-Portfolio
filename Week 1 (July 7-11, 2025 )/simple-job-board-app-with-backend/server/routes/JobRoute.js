const { getJobs, addJob, deleteJob } = require("../controller/JobController")
const express = require("express")

const router = express.Router()

router.get('/', getJobs);
router.post('/', addJob)
router.delete('/:id', deleteJob)

module.exports = router