# Simple React Starter Kit
This is a barebones repository for writing static client side react applications. 
Should be enough to get started without adding to much.

 - `npm start` Run the code in development mode
 - `npm run build` Compile the assets, ready to run in production. Generates the
 	 static code in the docs folder.


## Technology

 - Webpack (for client bundle)
 - Babel (ES6 to ES5)
 - react-router (single page app navigation)
 - redux & redux-async-props (managing application state)
 - jss for css handling
 - hot reloading for better development

Doesn't use any special build tools, just npm and node scripts. Uses 
webpack for generating the client bundle. Uses redux for managing application 
state, and redux-async-props as
a way to efficiently load needed data before pushing to the client.

## Routes and static pages
Webpack bundles a template renderer function, this 
uses all the same application code but takes the route as an input and outputs 
the html for each static page. If you update the routes you'll need to update
the routes in the buildStaticPages.js code also.


