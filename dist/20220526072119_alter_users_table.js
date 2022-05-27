"use strict";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.table('users').alterTable();
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.down = function (knex) {};
//# sourceMappingURL=20220526072119_alter_users_table.js.map