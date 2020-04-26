'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
    
    list () {
        return this.belongsTo('App/Models/List')
    }

    items() {
        return this.hasMany('App/Models/Item')
    }
}

module.exports = Category
