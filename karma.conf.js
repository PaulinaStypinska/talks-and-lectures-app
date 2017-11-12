module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/lodash/lodash.js',
      './node_modules/angular/angular.js',   
      './node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
      './node_modules/angular-mocks/angular-mocks.js', 
      './node_modules/angular-google-maps/dist/angular-google-maps.js',            
      './node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min.js', 
      './node_modules/angular-simple-logger/dist/angular-simple-logger.js',
      './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',      
      './node_modules/angular-aria/angular-aria.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-material/angular-material.js',
      './app/app.js',
      {pattern: './app/controllers/*.js', watched: true},
      {pattern: './app/directives/*.js', watched: true},
      {pattern: './app/services/*.js', watched: true},
      {pattern: './app/filters/*.js', watched: true}
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}