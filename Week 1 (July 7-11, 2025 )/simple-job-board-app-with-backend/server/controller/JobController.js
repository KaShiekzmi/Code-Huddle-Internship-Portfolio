const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const getJobs = async (req, res) => {
    try {
        const response = await fs.readFile('../server/database/JobsDatabase.json', 'utf8');
        const data = JSON.parse(response);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in JobController GET file:', error);
        return res.status(500).json({ error: 'Failed to retrieve jobs' });
    }
};

const addJob = async (req, res) => {
    try {
        const { title, company, type, location, description, expectedSalary, experienceRequired, skillsNeeded } = req.body;

        if (!title || !company || !type || !location || !description || !expectedSalary || !experienceRequired || !skillsNeeded) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const fileData = await fs.readFile('../server/database/JobsDatabase.json', 'utf8');
        const jobs = JSON.parse(fileData);

        const newId = jobs.length + 1;

        const newJob = {
            id: newId,
            title,
            company,
            type,
            location,
            description,
            expectedSalary,
            experienceRequired,
            skillsNeeded
        };

        jobs.push(newJob);

        await fs.writeFile('../server/database/JobsDatabase.json', JSON.stringify(jobs, null, 2));

        return res.status(201).json({ message: "Added Successfully!" });
    } catch (error) {
        console.error('Error in JobController POST file:', error);
        return res.status(500).json({ message: 'Failed to add job' });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params
        const jobId = parseInt(id);
        const fileData = await fs.readFile('../server/database/JobsDatabase.json', 'utf8');
        let jobs = JSON.parse(fileData);
        jobs = jobs.filter(job => job.id !== jobId);
        await fs.writeFile('../server/database/JobsDatabase.json', JSON.stringify(jobs, null, 2));
        return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error in JobController DELETE file:', error);
        return res.status(500).json({ message: 'Failed to add job' });
    }
}

module.exports = {
    getJobs,
    addJob,
    deleteJob
};