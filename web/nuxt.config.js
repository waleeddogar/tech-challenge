const BASE_URL = process.env.BASE_URL || 'https://jsonplaceholder.typicode.com'
const env = {
  BASE_URL: BASE_URL
}

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Mavennet-Gallery',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Mavennet Gallery' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    ['@nuxtjs/pwa'],
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }]
  ],
  vuetify: {
    materialIcons: true,
    css: true
  },
  workbox: {
    dev: false
  },
  env,
  axios: {
    // proxy: true,
    baseURL: env.BASE_URL,
    // proxyHeaders: true,
    progress: true,
    init (axios, ctx) {
      axios.defaults.headers.post['Content-Type'] = 'application/json;'
    }
  },
  css: [
    '~/assets/style/app.styl'
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#1a9cb3' },
  loadingIndicator: {
    name: 'wandering-cubes',
    color: '#1a9cb3',
    background: '#16252B'
  },
  /*
   ** Build configuration
   */
  generate: {
    minify: {
      collapseWhitespace: false
    }
  },
  build: {
    vendor: [
      // 'vuetify',
      'babel-polyfill',
      // 'axios',
    ],
    extractCSS: true,
    babel: {
      sourceMaps: 'inline'
    },
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        // config.target = 'node'
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
   ** Add server middleware
   ** Nuxt.js uses `connect` module as server
   ** So most of express middleware works with nuxt.js server middleware
   */
  serverMiddleware: []
}
