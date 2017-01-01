/**
 * Builds folders that match pages and adds index.html files.
 */


import fs from 'fs'
import path from 'path'

console.log('build static pages called.')


/**
 * Builds the static pages
 * @param {boolean} shellContent If true does not render the initial html and
 * styles, skipping this speeds up the build time but it means the page will 
 * only render with client side rendering, good for development not good for
 * production.
 */
var buildStaticPages = async(shellContent = false) => {

  if (shellContent)
    var templateRender = (html, url) => html
  else
    var templateRender = require('./templateRender/server.bundle.js').default

  const getTemplate = async (pathToRoot = '', url) => {
    try {
      var html = await templateRender(`<!doctype html>
        <html>
          <head>
            <title>Luna IT Solutions</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <link rel="manifest" href="/manifest.json">
            <link rel="shortcut icon" href="/favicon.png">
            <!-- Chrome, Firefox OS and Opera -->
            <meta name="theme-color" content="black">
            <!-- Windows Phone -->
            <meta name="msapplication-navbutton-color" content="black">
            <!-- iOS Safari -->
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            <style id="_jss"><!-- {{css}} --></style>
          </head>
          <body>
            <div id='root'><!--__APP_HTML__--></div>
            <script>
              window.__INITIAL_STATE__ = {/*__INITIAL_STATE__*/}
            </script>
            <script src="${pathToRoot}js/bundle.js"></script>
          </body>
        </html>`, url
      )
      return html
    } catch (e) {
      console.error(e)
    }
  }


  let docsFolder = path.resolve(__dirname, '../docs')
  // Create the root index file
  if (!fs.existsSync(docsFolder))
    fs.mkdirSync(docsFolder)

  var promises = [(async () => {
    try {
      var html = await getTemplate('', '/')
      fs.writeFileSync(docsFolder + '/index.html', html)
    } catch (e){
      console.error(e)
    }
  })()]

  var results = ['/cats', '/dogs'].map(async route => {
  	try {
      let folderPath = docsFolder + route
    	fs.mkdirSync(folderPath)
      var html = await getTemplate('../', route)
    	fs.writeFileSync(folderPath + '/index.html', html)
    } catch (e){
      console.error(e)
    }
  })

  results.forEach(r => promises.push(r))

  return Promise.all(promises)

}


var isShell = process.argv.indexOf('--shell') != -1


var EXITCONDITION = false

Promise.resolve(buildStaticPages(isShell))
.then(() => EXITCONDITION = true)
.catch(err => console.error(err))

function wait () {
  if (!EXITCONDITION)
    setTimeout(wait, 200)
};
wait()


