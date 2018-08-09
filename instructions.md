## Registering provider

The provider is registered inside `start/app.js` file under `providers` array.

```js
const providers = [
  'adonuxt/providers/NuxtProvider',
]
```

That's all you need!

## Define Nuxt Route

In your route file, you should defined as the latest route the Nuxt route.

```js
const Nuxt = use('Nuxt')

Route.any('*', (ctx) => Nuxt.render(ctx))
```
