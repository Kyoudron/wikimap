exports.seed = function(knex, Promise) {
  return knex('users_maps').del()
    .then(function (){
      return Promise.all ([
        knex('users_maps').insert({map_id: 1, user_id: 2, favourites: true}),
        knex('users_maps').insert({map_id: 4, user_id: 3, favourites: false}),
        knex('users_maps').insert({map_id: 2, user_id: 1, favourites: false}),
        knex('users_maps').insert({map_id: 2, user_id: 3, favourites: true}),
      ])
    })
};
