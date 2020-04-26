'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.engine('InnoDB')
      table.increments()

      table
        .bigint('bar-code', 13)
        .index()
        .notNullable()
        .unique()

      table
        .string('description', 255)
        .notNullable()
        .index()

      table
        .string('brand', 100)
        .nullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
