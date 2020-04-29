'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class List extends Model {

    static scopeByUser(query, list_id, user_id){
        return query
            .where('id', list_id)
            .where('user_id', user_id)
    }

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
