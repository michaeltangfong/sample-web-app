/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del().then(
      () => {
        return knex('users').insert([
          {id: 1, name: 'Hettie Marshall', email: 'lantunde@acbo.va'},
          {id: 2, name: 'Hester Owens', email: 'zo@girih.lv'},
          {id: 3, name: 'Henry Jackson', email: 'bekamohi@owo.mt'}
        ]);
      }
  )
};
