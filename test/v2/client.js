/* global describe, it */

'use strict'

var expect = require('expect.js')

var MailerLite = require('../..')
var ML = new MailerLite(2)

describe('v2 - Client', () => {
  it('should return an API error', (done) => {
    ML.Groups.getDetails()
      .then((data) => {
        expect().fail()
      }, (err) => {
        expect(err).to.have.property('code')
        expect(err).to.have.property('message')
      })
      .then(() => {
        done()
      })
  })
})
