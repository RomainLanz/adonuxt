'use strict'

const { Builder } = require('nuxt-edge')
const { Nuxt } = require('nuxt-edge/dist/nuxt-start')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

class NuxtService {
  constructor (config) {
    this._config = this._computeConfig(config)
  }

  render (app, ctx) {
    let nuxt = null

    if (typeof app === 'string') {
      nuxt = new Nuxt({ ...this._config, ...this._config.app[app] })
    } else {
      nuxt = new Nuxt(this._config)
      ctx = app
    }

    ctx.response.implicitEnd = false
    ctx.request.request.auth = ctx.auth
    ctx.request.request.session = ctx.session

    nuxt.render(ctx.request.request, ctx.response.response)
  }

  build () {
    if (this._config.app === undefined) {
      const nuxt = new Nuxt(this._config)

      return new Builder(nuxt).build()
    }

    Object.keys(this._config.app).forEach((app) => {
      const nuxt = new Nuxt({ ...this._config, ...this._config.app[app] })

      new Builder(nuxt).build()
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
      plugins: [
        new HardSourceWebpackPlugin({ info: { mode: 'none', level: 'error' } }),
      ],
    }

    return { ...defaultConfig, ...config }
  }
}

module.exports = NuxtService
