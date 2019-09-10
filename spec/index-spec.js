const request    = require('supertest');
const express    = require('express');

const middleware = require('../src');

describe("Ping", () => {
  describe("with default options", () => {
    let app = null;
    beforeEach(() => {
      app = express()
      app.use(middleware())
    })

    it("should not be the ping action", (done) => {
      app.get(
        "/test",
        (req, res) => res.status(200).json({id: 1})
      )

      request(app)
        .get('/test')
        .expect(200, {id: 1}, done);
    });

    it("should be the ping action", (done) => {
      app.get(
        "/test",
        (req, res) => res.status(200).json({id: 1})
      )

      request(app)
        .get('/v1/ping')
        .expect(200, {ping: true}, done);
    })
  })

  describe("with custom options", () => {
    let app = null;
    beforeEach(() => {
      app = express()
      app.use(middleware({
        ping_path: '/ping',
        ping_response_body: "OK"
      }))
    })

    it("should not be the ping action", (done) => {
      app.get(
        "/v1/ping",
        (req, res) => res.status(200).json({id: 1})
      )

      request(app)
        .get('/v1/ping')
        .expect(200, {id: 1}, done);
    });

    it("should be the ping action", (done) => {
      app.get(
        "/test",
        (req, res) => res.status(200).json({id: 1})
      )

      request(app)
        .get('/ping')
        .expect(200, '"OK"', done);
    })
  })

  describe("with 204 no content options", () => {
    let app = null;
    beforeEach(() => {
      app = express()
      app.use(middleware({
        ping_status_code: 204,
        ping_response_body: undefined,
      }))
    })

    it("should not be the ping action", (done) => {
      app.get(
        "/test",
        (req, res) => res.status(200).json({id: 1})
      )

      request(app)
        .get('/test')
        .expect(200, {id: 1}, done);
    });

    it("should be the ping action", (done) => {
      app.get(
        "/test",
        (req, res) => res.status(200).json({id: 1})
      )

      request(app)
        .get('/v1/ping')
        .expect(204)
        .end((err, res) => {
          expect(res.text).toBe('')
          done()
        })
    })
  })
})
