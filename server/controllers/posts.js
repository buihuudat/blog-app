const express = require('express');
const mongoose = require('mongoose');

const PostMessage = require('../models/postMessage');

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      const postMessages = await PostMessage.find();
      res.status(200).json(postMessages);
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  },

  getPost: async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = PostMessage.findById(id);

      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  },

  createPost: async (req, res, next) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags });
    try {
      await newPostMessage.save();

      res.status(200).json(newPostMessage);
    } catch (error) {
      res.status(409).json({ message: error.message })
    }
  },

  updatePost: async (req, res, next) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatePost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatePost, {new: true});

    res.status(200).json(updatePost);
  },

  deletePost: async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
  },

  likePost: async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);
    const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, {new: true});

    res.json(updatePost);
  }

} 