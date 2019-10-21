'use strict'

module.exports = Groups

/**
 * Groups.
 * @constructor
 * @param {Client} client - Instance of an API client.
 */
function Groups (client) {
  /**
   * Returns all groups you have in your account. Also basic summary for each group including the ID.
   * @param {number} [limit] - Sets the limit of results in one page (default 1000).
   * @param {number} [page] - You can navigate through records by increasing page number.
   */
  this.getAll = (limit, page) => {
    return client.Get('/groups', {
      limit: limit,
      page: page
    })
  }

  /**
   * Retrieve stats about sent messages.
   * @param {number} id - The ID of the group you want the stats for.
   */
  this.getDetails = (id) => {
    return client.Get(`/groups/${id}`)
  }

  /**
   * Create new group.
   * @param {string} name - The name of the new group you want to create.
   * @returns {object} - ID and name of the created group.
   */
  this.addGroup = (name) => {
    return client.Post('/groups', {
      name: name
    })
  }

  /**
   * Update existing group.
   * @param {number} id - The ID of the group you want to change.
   * @param {string} name - The new name of the group you want to change.
   */
  this.updateGroup = (id, name) => {
    return client.Put(`/groups/${id}`, {
      name: name
    })
  }

  /**
   * Delete the group
   * @param {number} id - The ID of the group you want to remove.
   */
  this.removeGroup = (id) => {
    return client.Delete(`/groups/${id}`)
  }

  /**
   * Returns all active subscribers in a given group.
   * @param {number} id - The ID of the group you want stats for.
   * @param {number} [limit] - Sets the limit of results in one page (default 1000).
   * @param {number} [page] - You can navigate through records by increasing page number.
   */
  this.getActiveSubscribers = (id, limit, page) => {
    return client.Get(`/groups/${id}/subscribers/active`, {
      limit: limit,
      page: page
    })
  }

  /**
   * Returns all unsubscribed subscribers in a given group.
   * @param {number} id - The ID of the group you want stats for.
   * @param {number} [limit] - Sets the limit of results in one page (default 1000).
   * @param {number} [page] - You can navigate through records by increasing page number.
   */
  this.getUnsubscribedSubscribers = (id, limit, page) => {
    return client.Get(`/groups/${id}/subscribers/unsubscribed`, {
      limit: limit,
      page: page
    })
  }

  /**
   * Returns all bounced subscribers in a given group.
   * @param {number} id - The ID of the group you want stats for.
   * @param {number} [limit] - Sets the limit of results in one page (default 1000).
   * @param {number} [page] - You can navigate through records by increasing page number.
   */
  this.getBouncedSubscribers = (id, limit, page) => {
    return client.Get(`/groups/${id}/subscribers/bounced`, {
      limit: limit,
      page: page
    })
  }

  /**
   * Adds a subscriber to an existing group, including custom field data if supplied.
   * If the email address is already subscribed, their name and any custom field values are updated with whatever is passed in.
   * @param {number} groupId - The ID of the group to which the subscriber should be added.
   * @param {string} email - The email of the subscriber.
   * @param {string} name - Name of the subscriber.
   * @param {object[]} fields - Array of custom fields of the subscriber.
   * @param {boolean} resubscribe - Sets to true if you want to reactive subscriber.
   */
  this.addSubscriber = (groupId, email, name, fields, resubscribe) => {
    return client.Post(`/groups/${groupId}/subscribers`, {
      email: email,
      name: name,
      fields: fields,
      resubscribe: resubscribe ? 1 : 0
    })
  }

  /**
   * Removes subscriber from a group. He will no longer receive campaigns sent to this group.
   * @param {number} groupId - The ID of the group from which the subscribed should be removed.
   * @param {string} email - The email of the subscriber.
   */
  this.deleteSubscriber = (groupId, email) => {
    return client.Delete(`/groups/${groupId}/subscribers/${email}`)
  }
}
