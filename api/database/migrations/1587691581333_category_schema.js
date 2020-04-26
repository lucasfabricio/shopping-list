'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.engine('InnoDB')
      table.increments()

      table
        .string('name', 255)
        .notNullable()

      table
        .integer('list_id')
        .unsigned()
        .references('id')
        .inTable('lists')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.unique('name', 'list_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
