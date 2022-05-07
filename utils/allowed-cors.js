var allowedOrigins = ['https://8080-cs-1060709277325-default.cs-asia-east1-jnrc.cloudshell.dev', 'https://fiddle.jshell.net', 'https://skeb-explorer.herokuapp.com', 'http://skeb-explorer.herokuapp.com']
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
