module.exports = {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/events/me',
      handler: 'event.me',
    }
  ]
}
