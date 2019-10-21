/* global describe, it */

'use strict'

var expect = require('expect.js')

var MailerLite = require('../..')
var ML = new MailerLite(2)

describe('v2 - Campaigns', () => {
  it('should return an array', (done) => {
    ML.Campaigns.getAll()
      .then((data) => {
        expect(data).to.be.an('array')
        done()
      })
      .catch((error) => {
        expect().fail(error.message)
        done()
      })
  })
})
