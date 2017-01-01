import fs from 'fs'

/**
 * @fileoverview Defaults the current env vars to what's in the root .env file.
 */
export default function defaultEnvVars(){
  // Default env vars
  // Load env vars from the .env file if they aren't present
  var envFile = './.env'
  if (process.env.NODE_ENV == 'production')
    envFile = './.env-production'

  if (fs.existsSync(envFile)){
    var contents = fs.readFileSync(envFile, 'utf8')
      , lines = contents.split("\n")
    lines.forEach(function(line){
      var parts = line.split("=")
        , name = parts[0]
        , val = parts[1]

      if (typeof process.env[name] === 'undefined'){
        process.env[name] = val

        console.log('Defaulting env var ', name, ' to ', val)
      }
    })
  }
}
