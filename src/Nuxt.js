'use strict'

const { Builder } = require('nuxt-edge')
const { Nuxt } = require('nuxt-edge/dist/nuxt-start')

class NuxtService {
  constructor (config) {
    this._config = this._computeConfig(config)
    this._apps = {}

    // If there's only one app defined it as default
    if (this._config.app !== undefined) {
      Object.keys(this._config.app).forEach((app) => {
        this._apps[app] = new Nuxt({ ...this._config, ...this._config.app[app] })
      })
    } else {
      this._apps.default = new Nuxt(this._config)
    }
  }

  render (app, ctx) {
    if (typeof app !== 'string') {
      ctx = app
      app = 'default'
    }

    ctx.response.implicitEnd = false
    ctx.request.request.auth = ctx.auth
    ctx.request.request.session = ctx.session

    this._apps[app].render(ctx.request.request, ctx.response.response)
  }

  build () {
    Object.keys(this._apps).forEach((app) => {
      new Builder(this._apps[app]).build()
    })
  }

  _computeConfig (config) {
    const defaultConfig = {
      build: {
        analyze: {
          analyzerMode: 'static',
          generateStatsFile: true,
          statsFilename: 'webpack-stats.json',
        },
      },
      splitChunks: {
        pages: false,
      },
    }

    return { ...defaultConfig, ...config }
  }
}

module.exports = NuxtService
