const express = require('express');
const router = express.Router();

const Student = require('../models/student');

// RESTFUL ENDPOINTS
// GET, POST, PATCH, DELETE

const getStudents = async (req, res) => {
    let students
    try {
        students = await Student.find(req.params.id);
        if (students == null) {
            return res.status(404).json({ message: 'Cannot find student' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.student = students
    next()
}




// GET ALL
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET ONE
router.get('/:id', getStudents, async (req, res) => {
    res.json(res.student);
});

// POST
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        class: req.body.class
    });
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// PATCH
router.patch('/:id', getStudents, async (req, res) => {
    if (req.body.name != null) {
        res.student.name = req.body.name
    }
    if (req.body.class != null) {
        res.student.class = req.body.class
    }
    try {
        const updatedStudent = await res.student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE

router.delete('/:id', getStudents, async (req, res) => {
    try {
        await res.student.remove();
        res.json({ message: 'Deleted Student' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = router;