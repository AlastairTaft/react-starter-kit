require("babel-polyfill")
Error.stackTraceLimit = 25
import express from 'express'
import path from 'path'
import { fetchNeeds, AsyncRouterContext } from 'redux-async-props'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index.js'
import routes from './modules/routes.js'
import fs from 'fs'
import { Presets, StyleSheet, LookRoot } from 'react-look'

const templateHtml = fs.readFileSync(path.resolve(__dirname, 'public', 'index.html'), 'utf8')
const serverConfig = Presets['react-dom']
const PORT = process.env.PORT || 5000

var server = express()

server.get('*', function(req, res, next) {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search)
    } else if (!props) {
      return next()
    }
    
    serverConfig.userAgent = req.headers['user-agent']
    serverConfig.styleElementId = '_look'

    const store = createStore(reducer)
    fetchNeeds(props, store)
    .then((asyncProps) => {
      const appHtml = renderToString(
        <Provider store={store}>
          <LookRoot config={serverConfig}>
            <AsyncRouterContext {...props} asyncProps={asyncProps} />
          </LookRoot>
        </Provider>
      )
      var html = templateHtml
      html = html.replace('<!--__APP_HTML__-->', appHtml)
      var appCSS = ''
      if (process.env.NODE_ENV == 'production')
        appCSS = StyleSheet.renderToString(serverConfig.prefixer)
      html = html.replace('<!-- {{css}} -->', appCSS)
      const initialState = {asyncProps, store: store.getState()}
      html = html.replace('{/*__INITIAL_STATE__*/}', JSON.stringify(initialState))
      res.send(html)
    })
    .catch(next)
  })
})
server.use(express.static(path.resolve(__dirname, 'public')))

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
