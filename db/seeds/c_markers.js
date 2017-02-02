exports.seed = function(knex, Promise) {
return knex('markers').del()
    .then(function (){
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
};
