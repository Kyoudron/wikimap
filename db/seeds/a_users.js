exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'alice@gmail.com', password: '1234'}),
        knex('users').insert({id: 2, name: 'Bob', email: 'bob@gmail.com', password: 'abcde'}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'charlie@gmail.com', password: '1234'}),
        knex('users').insert({id: 4, name: 'Jacob', email: 'jacob@gmail.com', password: 'million'})
      ]);
    });
};
