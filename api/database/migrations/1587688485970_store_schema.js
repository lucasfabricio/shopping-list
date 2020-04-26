'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', (table) => {
      table.engine('InnoDB')
      table.increments()

      table
        .string('name', 255)
        .notNullable()
        .unique()
        .index()

      table
        .string('address', 255)
        .notNullable()

      table
        .decimal('latitude', 9, 6)
        .notNullable()
      
      table
        .decimal('longitude', 9, 6)
        .notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
