'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {

    category() {
        return this.belongsTo('App/Models/Category')
    }

    product() {
        return this.hasOne('App/Models/Product')
    }

}

module.exports = Item
