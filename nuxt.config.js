module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Proyecto Lab Web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Proyecto Lab Web Enero Mayo 2017 usando three.js y cosas de contaminación'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {},

  server: {
    port: process.env.PORT, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
};
