/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('contact_info').insert([
    {id: 1, email: 'curtis.bonham@galvanize.com', address: '123 Street Road Colorado Springs, CO 80927', phone_number: '555-555-1111', employee_id: '1'},
    {id: 2, email: 'marques.johnson@galvanize.com', address: '565 Beet Street Scranton, PA 80936', phone_number: '555-555-2222', employee_id: '2'},
    {id: 3, email: 'lorena.longoria@galvanize.com', address: '235 Scottstots Lane Pearson, WY 96547', phone_number: '555-555-3333', employee_id: '3'},
  ]);
};
