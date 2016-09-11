# Simple React Starter Kit

This is a barebones repository for writing isomorphic react applications. 
Should be enough to get started without adding to much.

 - Webpack (for client bundle)
 - Babel (ES6 goodness)
 - react-router (single page app navigation)
 - redux & redux-async-props (managing application state)
 - jss for css handling

Doesn't use any special build tools, just npm and node scripts. Only uses 
webpack for generating the client bundle, babel is enough for running the server
side code. Uses redux for managing application state, and redux-async-props as
a way to efficiently load needed data before pushing to the client.
