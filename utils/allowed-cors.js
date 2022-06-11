var allowedOrigins = ['https://skeb-explorer.herokuapp.com', 'http://skeb-explorer.herokuapp.com', 'http://localhost:8080']
var corsOptionsDelegate = {
  origin: function(origin, callback){
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = corsOptionsDelegate;
