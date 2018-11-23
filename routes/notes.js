'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
// const data = require('../db/notes');
// const simDB = require('../db/simDB');
// const notes = simDB.initialize(data);

const knex = require('../knex');

// Get All (and search by query)
router.get('/', (req, res, next) => {
  const { searchTerm, folderId } = req.query;

  knex
    .select('notes.id', 'title', 'content', 
      'folders.id as folderId', 'folders.name as folderName')
    .from('notes')
    .leftJoin('folders', 'notes.folder_id', 'folders.id')
    .modify(function (queryBuilder) {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .modify(function (queryBuilder) {
      if (folderId) {
        queryBuilder.where('folder_id', folderId);
      }
    })
    .orderBy('notes.id')
    .then(list => {
      res.json(list);
    })
    .catch(err => {
      next(err);
    });
});


// Get a single item
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  knex
    .select('notes.id', 'title', 'content', 
      'folders.id as folderId', 'folders.name as folderName')
    .from('notes')
    .leftJoin('folders', 'notes.folder_id', 'folders.id')
    .where('notes.id', id)
    .returning('id')
    .then(item => {
      if (item) {
        res.json(item[0]);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// Put update an item
router.put('/:id', (req, res, next) => {
  const { noteId } = req.params;
  const { title, content, folderId } = req.body;

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  const updateItem = {
    title: title,
    content: content,
    folder_id: (folderId) ? folderId : null
  };

  knex('notes')
    .where('id', noteId)
    .update(updateItem)
    .returning(['id'])
    .then(() => {
      return knex.select('notes.id', 'title', 'content', 'folder_id as folderId', 'folders.name as folderName')
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', noteId);
    })
    .then(item => {
      if (item) {
        res.json(item[0]);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content, folderId } = req.body;

  const newItem = { title, content, folder_id: folderId };

  let noteId;
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  knex('notes')
    .returning('id')
    .insert(newItem)
    .then(([id]) => {
      noteId = id;
      return knex.select('notes.id', 'title', 'content', 
        'folder_id as folderId', 'folders.name as folderName')
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', noteId);
    })
    .then(item => {
      if (item) {
        res.location(`${req.originalUrl}/${item.id}`).status(201).json(item);
      }
    })
    .catch(err => {
      next(err);
    });
});


// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('notes')
    .where({id: `${id}`})
    .del()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;
