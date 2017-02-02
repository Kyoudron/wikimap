exports.seed = function(knex, Promise) {
  return knex('maps').del()
    .then (function () {
      return Promise.all ([
        knex('maps').insert({id: 1, creator_id: 2, title: 'Veggie Restaurants'}),
        knex('maps').insert({id: 2, creator_id: 1, title: 'Movie Theatres'}),
        knex('maps').insert({id: 3, creator_id: 1, title: 'Sells Retro Clothes'}),
        knex('maps').insert({id: 4, creator_id: 3, title: 'Banks'}),
      ]);
    });
};
