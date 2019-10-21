/* global describe, it */

'use strict'

var expect = require('expect.js')

var MailerLite = require('../..')
var ML = new MailerLite(2)

const GROUP_NAME = 'Mocha Test'

const TEST_SUBSCRIBERS = [
  {
    email: 'foo@bar.com',
    name: 'Foo Bar'
  },
  {
    email: 'john@doe.net',
    name: 'John Doe'
  }
]

describe('v2 - Subscribers', () => {
  it('should add a subscriber to a new group and remove it immediately', (done) => {
    let groupId = 0
    const user = TEST_SUBSCRIBERS[0]

    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => {
        groupId = data.id
        return ML.Groups.addSubscriber(groupId, user.email, user.name)
      })
      .then((data) => {
        expect(data.email).to.be.equal(user.email)
        return ML.Subscribers.getDetails(data.email)
      })
      .then((data) => {
        expect(data.email).to.be.equal(user.email)
        return ML.Groups.deleteSubscriber(groupId, user.email)
      })
      .then((data) => {
        return ML.Groups.removeGroup(groupId)
      })
      .then(() => {
        done()
      })
      .catch((err) => {
        console.log('err:', err)
      })
  })
})
