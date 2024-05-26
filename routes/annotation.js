// routes/annotation.js
const express = require('express');
const router = express.Router();
const Annotation = require('../models/Annotation');

// Get annotations for a song
router.get('/:songId', async (req, res) => {
  try {
    const annotations = await Annotation.find({ songId: req.params.songId });
    res.json(annotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new annotation
router.post('/', async (req, res) => {
  console.log("received post api call ")
  const annotation = new Annotation({
    songId: req.body.songId,
    startIndex: req.body.startIndex,
    endIndex: req.body.endIndex,
    text: req.body.text,
    createdBy: req.body.createdBy,
    createdAt: req.body.createdAt
  });

  try {
    const newAnnotation = await annotation.save();
    res.status(201).json(newAnnotation);
    console.log("added new annotation: " + annotation)
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error("something wrong " + annotation)
  }
});

// Update an annotation
router.put('/:id', async (req, res) => {
  try {
    const annotation = await Annotation.findById(req.params.id);
    if (!annotation) {
      return res.status(404).json({ message: 'Annotation not found' });
    }

    annotation.startIndex = req.body.startIndex || annotation.startIndex;
    annotation.endIndex = req.body.endIndex || annotation.endIndex;
    annotation.text = req.body.text || annotation.text;

    const updatedAnnotation = await annotation.save();
    res.json(updatedAnnotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an annotation
router.delete('/:id', async (req, res) => {
  try {
    const annotation = await Annotation.findById(req.params.id);
    if (!annotation) {
      return res.status(404).json({ message: 'Annotation not found' });
    }

    await annotation.remove();
    res.json({ message: 'Annotation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
