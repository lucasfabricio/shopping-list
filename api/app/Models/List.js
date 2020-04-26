'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class List extends Model {

    user () {
        return this.belongsTo('App/Models/User')
    }

    store () {
        return this.hasOne('App/Models/Store')
    }

    categories() {
        return this.hasMany('App/Models/Category')
    }

}

module.exports = List