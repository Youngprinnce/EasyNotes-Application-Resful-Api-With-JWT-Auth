const Note = require('../models/note.model');
const jwt = require('jsonwebtoken');

//Welcome Speech
exports.welcome = (req, res) => {
  res.status(200).json({
    message:
      'Welcome to my Easy Note Application!!! Use the token below to get authorization to access the Application',
    token: jwt.sign({ hello: 'world' }, 'SECUREAPPLICATION'),
  });
};

//Create and insert new notes
exports.create = (req, res) => {
  if (!req.body.content) {
    res.status(400).json({ message: 'Note content cannot be empty' });
  } else {
    note = new Note({
      title: req.body.title || 'Untitled Note',
      content: req.body.content,
    });

    note
      .save()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error occured, couldnt save' });
      });
  }
};

//Retrieve all notes
exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(500).json({ message: "Try again, couldn't get notes" });
    });
};

//REtrieve a note with ID
exports.findOne = (req, res) => {
  Note.findById(req.params.noteID)
    .then((note) => {
      if (!note) {
        res.status(404).json({ message: 'Sorry Note with that ID not found' });
      } else {
        res.status(200).json(note);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error in retrieving the note' });
      console.error(err);
    });
};

//Uodate a note with Id
exports.update = (req, res) => {
  if (!req.body.content) {
    res.status(400).json({ message: 'Note content cannot be empty' });
  }
  Note.findByIdAndUpdate(
    req.params.noteID,
    {
      title: req.body.title || 'Untitled Note',
      content: req.body.content,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        res.status(404).json({ message: 'Sorry Note with that ID not found' });
      } else {
        res.status(200).json(note);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error updating note' });
    });
};

//Delete a note with Id
exports.delete = (req, res) => {
  Note.findByIdAndDelete(req.params.noteID)
    .then((note) => {
      if (!note) {
        res.status(404).json({ message: 'Sorry Note with that ID not found' });
      } else {
        res.status(200).json({ message: 'Note deleted successfully' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error deleting note' });
    });
};
