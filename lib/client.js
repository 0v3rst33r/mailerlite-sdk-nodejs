'use strict'

const DEBUG_LOG_ENABLED = false

/* Load Request module. */
var request = require('request')

/* Load static config. */
var config = require('../config')

/**
 * Initialises an API client.
 *
 * <p>
 * When only one argument of type 'number' specified it is assumed to be the API version to use.
 * @constructor
 * @param {string | number} apiKey - Your MailerLite API key.
 * @param {number} apiVersion - The API version to use.
 */
function Client (apiKey, apiVersion) {
  if ((typeof arguments[0]) === 'number') {
    this.ApiKey = process.env.MAILERLITE_API_KEY
    this.ApiVersion = apiKey
  } else {
    this.ApiKey = apiKey || process.env.MAILERLITE_API_KEY
    this.ApiVersion = apiVersion || process.env.MAILERLITE_API_KEY || 1
  }

  /* Generates the call URL. */
  var makeUrl = (method) => {
    let urlWithoutAuth = `${config.urlApiV1}${method}`
    if (this.ApiVersion === 2) {
      urlWithoutAuth = `${config.urlApiV2}${method}`
    }
    const fullUrl = (urlWithoutAuth.includes('?')) ? `${urlWithoutAuth}&apiKey=${this.ApiKey}`
      : `${urlWithoutAuth}?apiKey=${this.ApiKey}`
    if (DEBUG_LOG_ENABLED) {
      console.log(fullUrl)
    }
    return fullUrl
  }

  /* Generic request method. */
  var makeRequest = (verb, method, parameters) => {
    const uri = makeUrl(method)

    const promise = new Promise((resolve, reject) => {
      /* Prepare callback for request. */
      const cb = (err, res, body) => {
        /* Caught a protocol error. */
        if (err) {
          reject(err)
        } else {
          if (DEBUG_LOG_ENABLED) {
            console.log('===============')
            console.log(body)
            console.log('===============')
          }
          try {
            const data = JSON.parse(body)

            /* Caught a data error. */
            if (data && data.error) {
              reject(data.error)
            } else {
              /* Resolved successfully. */
              resolve(data)
            }
          } catch (err) {
            console.log('catching temp err and resolving "temp_ok":', err)
            resolve(JSON.parse('{"status":"temp_ok"}'))
          }
        }
      }

      /* Send callback to request. */
      request[verb](uri, parameters, cb)
    })

    /* Returns a promise. */
    return promise
  }

  /* GET method. */
  this.Get = (method, parameters) => {
    return makeRequest('get', method, parameters)
  }

  /* PUT method. */
  this.Put = (method, parameters) => {
    return makeRequest('put', method, {
      form: parameters
    })
  }

  /* POST method. */
  this.Post = (method, parameters) => {
    return makeRequest('post', method, {
      form: parameters
    })
  }

  /* DELETE method. */
  this.Delete = (method) => {
    return makeRequest('del', method)
  }

  this.IsApiVersion2 = () => {
    return this.ApiVersion === 2
  }
}

/* Export the submodule. */
module.exports = Client
