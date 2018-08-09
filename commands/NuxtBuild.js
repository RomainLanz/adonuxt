'use strict'

const Nuxt = use('Nuxt')
const { Command } = require('@adonisjs/ace')

class NuxtBuild extends Command {
  /**
   * Command signature required by ace.
   *
   * @return {string}
   */
  static get signature () {
    return 'nuxt:build'
  }

  /**
   * Command description.
   *
   * @return {string}
   */
  static get description () {
    return 'Build your Nuxt app(s)'
}
  /**
   * Method called when command is executed. This method will
   * require all files from the migrations directory
   * and execute all pending schema files.
   *
   * @param  {object}   args
   *
   * @return {void}
   */
  handle () {
    Nuxt.build()
  }

}

module.exports = NuxtBuild
