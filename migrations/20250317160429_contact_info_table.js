/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('contact_info', table => {
    table.increments('id');
    table.string('email');
    table.string('address');
    table.string('phone_number');
    table.integer('employee_id');
    table.foreign('employee_id').references('employees.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('contact_info', table => {
    table.dropForeign('employee_id');
  }).then(() => {
    return knex.schema.dropTable('contact_info');
  });
};
