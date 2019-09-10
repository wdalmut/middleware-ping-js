Express ping middleware

```js
npm install --save @wdalmut/ping
```

A simple ping middleware (routing), when you go to `/v1/ping` the middleware
reply with a fixed status code (like: "200 OK") and a fixed body (like: `{ping: true}`).

## How to use it

Just attach as a middlware

```js
const express = require('express')
const ping = require('@wdalmut/ping')

const app = express()
app.use(ping()) // here the ping

// your normal routing
app.get('/test', (req, res) => {
  return res.json("OK")
})
```

## Override options

You can override few options

```js
app.use(ping({
  ping_path: '/ping',
  ping_response_body: 'OK',
  ping_status_code: 200,
})) // here the ping
```

 * Ping path - `ping_path` a new ping path
 * Ping response body - `ping_response_body` a new response body (will be
   converted in json
 * Ping response status code - `ping_status_code` a new status code

For example you can set the 204 no content

```js
app.use(ping({
  ping_status_code: 204,
  ping_response_body: undefined, // the undefined force the empty response
})
```

