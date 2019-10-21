'use strict'

/* Load RESTful client wrapper. */
/* v1 API */
var Client = require('./lib/client')
var Campaigns = require('./api/campaigns')
var Lists = require('./api/lists')
var SubscribersV1 = require('./api/subscribers')

/* v2 API */
var Groups = require('./api/v2/groups')
var SubscribersV2 = require('./api/v2/subscribers')

/**
 * Initialises a new MailerLite client instance.
 * @constructor
 * @param {string | number} apiKey - Your MailerLite API key.
 * @param {number} apiVersion - The API version to use.
 */
function MailerLite (apiKey, apiVersion) {
  this.client = new Client(apiKey, apiVersion)

  /* Register submodules. */
  this.Campaigns = new Campaigns(this.client)
  if (this.client.IsApiVersion2()) {
    this.Groups = new Groups(this.client)
    this.Subscribers = new SubscribersV2(this.client)
  } else {
    this.Lists = new Lists(this.client)
    this.Subscribers = new SubscribersV1(this.client)
  }
}

/* Export the library. */
module.exports = MailerLite
