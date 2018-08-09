'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class NuxtProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.singleton('Nuxt', (app) => {
      const Config = app.use('Config')
      const Nuxt = require('../src/Nuxt')

      return new Nuxt(Config.get('nuxt'))
    })
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
  */
  boot () {
    if (process.env.NODE_ENV === 'development') {
      this.app.use('Nuxt').build()
    }
  }
}

module.exports = NuxtProvider
