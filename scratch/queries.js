'use strict';

// const knex = require('../knex');

// let searchTerm = 'gaga';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// let getId = 1005;
// knex
//   .select()
//   .from('notes')
//   .where('id', `${getId}`)
//   .returning('id')
//   .then(results => {
//     console.log(JSON.stringify(results[0]));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// update note by ID

// const updateId = 1003;

// knex('notes')
//   .where('id', `${updateId}`)
//   .update({title: 'new title', content: 'something new'})
//   .returning(['title', 'content'])
//   .then(results => {
//     console.log(JSON.stringify(results[0]));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// knex('notes')
//   .returning(['id', 'title', 'content'])
//   .insert({title: 'test note', content: 'did it pass?'})
//   .then(results => {
//     console.log(JSON.stringify(results[0]));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const deleteId = 1012;
// knex('notes')
//   .where({id: `${deleteId}`})
//   .del()
//   .then(results => {
//     console.log(JSON.stringify(results[0]));
//   })
//   .catch(err => {
//     console.error(err);
//   });


