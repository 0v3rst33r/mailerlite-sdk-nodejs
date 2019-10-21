'use strict'

module.exports = Subscribers

/**
 * Subscribers.
 * @constructor
 * @param {Client} client - Instance of an API client.
 */
function Subscribers (client) {
  /**
   * Retrieves a subscriber's details including their email address, name, active/inactive state and any custom field data.
   * @param {string} email - The email address of the subscriber whose details should be retrieved.
   * @param {boolean} history - Sets to true if you want to get historical records of campaigns and autoresponder emails received by a subscriber (default: false).
   */
  this.getDetails = (email, history) => {
    return client.Get(`/subscribers/${email}`)
  }

  /**
   * Marks subscriber as unsubscribed. He will no longer receive any campaigns.
   * @param {string} email - The email of the subscriber.
   */
  this.unsubscribeSubscriber = (email) => {
    return client.Post('/subscribers/unsubscribe/', {
      email: email
    })
  }
}
