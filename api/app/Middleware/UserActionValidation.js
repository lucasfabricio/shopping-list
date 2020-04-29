'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Logger = use('Logger')

class UserActionValidation {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, request, response }, next) {

    const { id } = auth.user
    const data = request.only(['user_id'])

    Logger.info(id)
    Logger.info(data.user_id)

    if (id === data.user_id) {
      // call next to advance the request
      await next()
    }
    else {
      return response.status(401).send()
    }
  }
}

module.exports = UserActionValidation
