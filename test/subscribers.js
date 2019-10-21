/* global describe, it */

'use strict'

var expect = require('expect.js')

var MailerLite = require('..')
var ML = new MailerLite()

const LIST_NAME = 'Mocha Test'

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

describe('v1 - Subscribers', () => {
  it('should add a subscriber to a new list and remove it immediately', (done) => {
    let listId = 0
    const user = TEST_SUBSCRIBERS[0]

    ML.Lists.addList(LIST_NAME)
      .then((data) => {
        listId = data.id
        return ML.Subscribers.addSubscriber(listId, user.email, user.name)
      })
      .then((data) => {
        expect(data.email).to.be.equal(user.email)
        return ML.Subscribers.deleteSubscriber(listId, user.email)
      })
      .then((data) => {
        return ML.Lists.removeList(listId)
      })
      .then(() => {
        done()
      })
  })
})
