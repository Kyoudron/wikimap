exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'alice@gmail.com', password: '1234'}),
        knex('users').insert({id: 2, name: 'Bob', email: 'bob@gmail.com', password: 'abcde'}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'charlie@gmail.com', password: '1234'})
      ]);
    });
  return knex('maps').del()
    .then (function () {
      return Promise.all ([
        knex('maps').insert({id: 1, creator_id: 2, title: 'Veggie Restaurants'}),
        knex('maps').insert({id: 2, creator_id: 1, title: 'Movie Theatres'}),
        knex('maps').insert({id: 3, creator_id: 1, title: 'Sells Retro Clothes'}),
        knex('maps').insert({id: 4, creator_id: 3, title: 'Banks'}),
      ]);
    });
  return knex('markers').del()
    .then (function (){
      return Promise.all ([
        knex('markers').insert({id: 1, title: 'Freshii', description: 'cool place', img: 'cat pic',
                                latitude: 43.78, longitude: 79.87, map_id: 1, user_id: 2}),
        knex('markers').insert({id: 2, title: 'scotia bank', description: 'cool place', img: 'dog pic',
                                latitude: 42.78, longitude: 79.87, map_id: 4, user_id: 3}),
        knex('markers').insert({id: 3, title: 'some random theatre', description: 'cool place', img: 'mouse pic',
                                latitude: 44.78, longitude: 79.87, map_id: 2, user_id: 1}),
        knex('markers').insert({id: 4, title: 'other theatre', description: 'cool place', img: 'bird pic',
                                latitude: 45.78, longitude: 79.87, map_id: 2, user_id: 3}),
      ]);
    });
  return knex('users_maps').del()
    .then (function (){
      return Promise.all ([
        knex('users_maps').insert({map_id: 1, user_id: 2, favourite: true})
        knex('users_maps').insert({map_id: 4, user_id: 3, favourite: false})
        knex('users_maps').insert({map_id: 2, user_id: 1, favourite: false})
        knex('users_maps').insert({map_id: 2, user_id: 3, favourite: true})
      ])
    })
};
