'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const List = use('App/Models/List')

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
    const list = await List.findOrFail(params.id)

    if (list.user_id === id) {

      const data = request.only(['store_id'])

      list.merge(data)

      await list.save()

      return list
    }
  }

  /**
   * Delete a list with id.
   * DELETE lists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

    const list = await List.findOrFail(params.id)

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
    const list = List.query()
      .where('id', params.id)
      .where('user_id', id)
      .with('categories')
      .fetch()

      return list
  }
}

module.exports = ListController
