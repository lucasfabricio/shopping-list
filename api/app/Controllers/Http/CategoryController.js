'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Category = use('App/Models/Category')
const Logger = use('Logger')

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, request, response, view }) {

    const { id } = auth.user
    const data = request.only([
      'user_id',
      'list_id',
      'name'
    ])

    if (id === data.user_id) {
      const categories = await Category
        .query()
        .where('list_id', data.list_id)
        .where('user_id', data.user_id)

      return categories
    }
    else {
      return response.status(401).send(data)
    }
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {

    const { id } = auth.user

    const data = request.only([
      'user_id',
      'list_id',
      'name'
    ])

    if (id === data.user_id) {
      const category = await Category.create({
        list_id: data.list_id,
        name: data.name
      })

      return category
    }
    else {
      return response.status(401).send(data)
    }
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {

    const { id } = auth.user

    const data = request.only([
      'user_id',
      'name'
    ])

    if (id === data.user_id) {
      const category = await Category.findOrFail(params.id)
      category.merge(data)

      await category.save()

      return category
    }
    else {
      return response.status(401).send(data)
    }
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, request, response }) {

    const { id } = auth.user

    const data = request.only([
      'user_id'
    ])

    if (id === data.user_id) {
      const category = await Category.findOrFail(params.id)
      await category.delete()

      return category
    }
    else {
      return response.status(401).send(data)
    }
  }
}

module.exports = CategoryController
