/* global describe, it */

'use strict'

var expect = require('expect.js')

var MailerLite = require('../..')
var ML = new MailerLite(2)

const GROUP_NAME = 'Mocha Test'
const GROUP_RENAME = 'Mocha Test After Rename'

describe('v2 - Groups', () => {
  it('should return an array', (done) => {
    ML.Groups.getAll()
      .then((data) => {
        expect(data).to.be.an('array')
        done()
      })
  })

  it('should create a group and immediately remove it', (done) => {
    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => {
        expect(data.id).to.be.above(0)
        expect(data.name).to.be.equal(GROUP_NAME)
        return ML.Groups.removeGroup(data.id)
      })
      .then(() => {
        done()
      })
  })

  it('should create a group and immediately remove it 22222', (done) => {
    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => {
        expect(data.id).to.be.above(0)
        expect(data.name).to.be.equal(GROUP_NAME)
        return ML.Groups.removeGroup(data.id)
      })
      .then(() => {
        done()
      })
  })

  it('should create a group, get its details and remove it', (done) => {
    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => ML.Groups.getDetails(data.id))
      .then((data) => {
        expect(data.id).to.be.above(0)
        expect(data.name).to.be.equal(GROUP_NAME)
        return ML.Groups.removeGroup(data.id)
      })
      .then(() => {
        done()
      })
  })

  it('should check if all expected group details were retrieved', (done) => {
    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => ML.Groups.getDetails(data.id))
      .then((data) => {
        expect(data.id).to.be.above(0)
        expect(data).to.have.property('name')
        expect(data).to.have.property('total')
        expect(data).to.have.property('active')
        expect(data).to.have.property('unsubscribed')
        expect(data).to.have.property('bounced')
        expect(data).to.have.property('unconfirmed')
        expect(data).to.have.property('junk')
        expect(data).to.have.property('sent')
        expect(data).to.have.property('opened')
        expect(data).to.have.property('clicked')
        expect(data).to.have.property('date_created')
        expect(data).to.have.property('date_updated')
        return ML.Groups.removeGroup(data.id)
      })
      .then((data) => {
        done()
      })
  })

  it('should create a group, rename it, check if renamed, and remove it', (done) => {
    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => ML.Groups.updateGroup(data.id, GROUP_RENAME))
      .then((data) => {
        expect(data.id).to.be.above(0)
        expect(data.name).to.be.equal(GROUP_RENAME)
        return ML.Groups.removeGroup(data.id)
      })
      .then(() => {
        done()
      })
  })

  it('should return no active subscribers for a new group', (done) => {
    let groupId = 0

    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => {
        groupId = data.id
        return ML.Groups.getActiveSubscribers(groupId)
      })
      .then((data) => {
        expect(data).to.be.an('array')
        expect(data).to.be.empty()
        return ML.Groups.removeGroup(groupId)
      })
      .then(() => {
        done()
      })
  })

  it('should return no unsubscribed subscribers for a new group', (done) => {
    let groupId = 0

    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => {
        groupId = data.id
        return ML.Groups.getUnsubscribedSubscribers(groupId)
      })
      .then((data) => {
        expect(data).to.be.an('array')
        expect(data).to.be.empty()
        return ML.Groups.removeGroup(groupId)
      })
      .then(() => {
        done()
      })
  })

  it('should return no bounced subscribers for a new group', (done) => {
    let groupId = 0

    ML.Groups.addGroup(GROUP_NAME)
      .then((data) => {
        groupId = data.id
        return ML.Groups.getBouncedSubscribers(groupId)
      })
      .then((data) => {
        expect(data).to.be.an('array')
        expect(data).to.be.empty()
        return ML.Groups.removeGroup(groupId)
      })
      .then(() => {
        done()
      })
  })
})
