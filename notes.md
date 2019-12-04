## Middleware

Think about Tesla (the company) = an assembly line -> pipeline, cue, things come in one end and they move through a series of steps. The car represents the (req, res) the workers/machines putting the car together are the middleware.

**what can I do with middleware**
    - inspect the 'request' and 'response' objects
    - makes changes to the 'request' and the 'response' objects
    - move the 'request' or 'response' to the next middleware
    - stop the request and send back a response to the client

**These two types we are going to learn**
    *normal*
    *error handling*

**Used**
    *Globally*: it runs on every request to all endpoints
    *Locally*: local middleware is only applied to a specific endpoint or group of endpoints

***Order Matter***

    -Middleware will run from top to botton
    -local middleware left to




