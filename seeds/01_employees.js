/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('employees').insert([
    {id: 1, first_name: 'Curtis', last_name: 'Bonham'},
    {id: 2, first_name: 'Marques', last_name: 'Johnson'},
    {id: 3, first_name: 'Lorena', last_name: 'Longoria'}
  ]);
};
