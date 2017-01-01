//require("babel-polyfill")
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
import routes from './routes.js'
import fs from 'fs'
import jss from 'jss'
import url from 'url'
import gzipStatic from 'connect-gzip-static'

export default function(html, url){
  return new Promise((resolve, reject) => {
    match({ routes, location: url }, (err, redirect, props) => {
      if (err) {
        return reject(err)
      } else if (redirect) {
        return reject(new Error('Redirect not supported'))
      } else if (!props) {
        return reject(new Error('props not found'))
      }
      const store = createStore(reducer)
      fetchNeeds(props, store)
      .then((asyncProps) => {
        var appHtml = renderToString(
          <Provider store={store}>
            <AsyncRouterContext {...props} asyncProps={asyncProps} />
          </Provider>
        )
        html = html.replace('<!--__APP_HTML__-->', appHtml)
        const jssCSS = jss.sheets.toString()
        html = html.replace('<!-- {{css}} -->', jssCSS)
        const initialState = {asyncProps, store: store.getState()}
        html = html.replace('{/*__INITIAL_STATE__*/}', JSON.stringify(initialState))
        resolve(html)
      })
      .catch(reject)
    })
  })
}
// TODO
//server.get('/login-redirect', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'login-redirect.html')))