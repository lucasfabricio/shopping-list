'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const List = use('App/Models/List')
const Logger = use('Logger')

/**
 * Resourceful controller for interacting with lists
 */
class ListController {
  /**
   * Show a list of all lists.
   * GET lists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request, response, view }) {

    const { id } = auth.user
    const lists = List.findByOrFail('user_id', id)

    return lists

  }

  /**
   * Create/save a new list.
   * POST lists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {

    const { id } = auth.user
    const list = await List.create({ user_id: id })

    return list
  }

  /**
  * Display a single list.
  * GET lists/:id
  *
  * @param {object} ctx
  * @param {Request} ctx.request
  * @param {Response} ctx.response
  * @param {View} ctx.view
  */
  async show({ params, request, response, view }) {
  }

  /**
   * Update list details.
   * PUT or PATCH lists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const { id } = auth.user
    const data = request.only(['store_id'])

    const list = await List.query().byUser(params.id, id).first()

    if (list) {
      list.merge(data)
      await list.save()
    }

    return list
  }

  /**
   * Delete a list with id.
   * DELETE lists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, request, response }) {

    const { id } = auth.user
    const list = await List.query().byUser(params.id, id).first()

    await list.delete()

    return list
  }

  /**
  * Display all list details.
  * GET lists/details/:id
  *
  * @param {object} ctx
  * @param {Request} ctx.request
  * @param {Response} ctx.response
  * @param {View} ctx.view
  */
  async details({ auth, params, request, response }) {

    const { id } = auth.user
    
    const list = List.query().byUser(params.id, id)
      .with('categories', (builder) => { 
        builder.setHidden(['list_id', 'created_at', 'updated_at'])
        .with('items', (builder) => {
          builder.with('products')
        })
      })
      .first()

    return list
  }
}

module.exports = ListController
