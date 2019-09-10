const defaults = {
  ping_path: '/v1/ping',
  ping_status_code: 200,
  ping_response_body: {ping: true}
}

module.exports = (config = {}) => {
  let options = Object.assign({}, defaults, config)

  return (req, res, next) => {
    if (req.path === options.ping_path) {
      res.status(options.ping_status_code)

      if (options.ping_response_body === undefined) {
        return res.end()
      }

      return res.json(options.ping_response_body)
    }

    return next()
  }
}

