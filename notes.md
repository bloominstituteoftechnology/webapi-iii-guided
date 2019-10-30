 
# Middleware Notes 
Everything (ish) is middleware!
- Express Router is a piece of middleware 
- Request Handler inside a Router is Middleware 


# JARGON
* Separation of Concerns
     - Code is a communication device => We do not write code for the computer, but rather it is a way to reveal our intentions to the next developer
     - Therefore, we must optiminize for readability 


# Types of Middleware
- Built-in : included with express (needs to be turned on)
     ex. server.use(express.json()) - json reader!
- Third party - must be installed from `npm`
- Custom - we code these 


## Types of middleware (based on how it's being used)
- global: runs on every request that comes into our server (API)


#### Remember that Middleware runs top to bottom (explicitly state function -> global middleware ->  )
## Global Middlewares
server.use(helment())           -->     third party
server.use(express.json())      ---> Built-in

## Local middleware determined by specified Routes (URI) 
server.use('/api/hubs', hubsRouter)


## Importing helment
const helment = require('helment')
const server = express()
server.use(helment())







## GUIDED PROJECT
function dateLogger(req,res,next){
     console.log(new Date().toISOString())
     next();
}

server.use(helment())                   <-- global middleware / third party 
server.use(express.json())              <-- global middleware / built-in
server.use(dateLogger)                  * notice that the custom middleware function ISN'T BEING INVOKED (global middleware)

server.use('/api/hubs', hubsRouter)     <-- 






## Write global middleware 
write a middleware function that logs the  HTTP method and the URL visited by the client
should log to the console something that looks like this: GET / or GET /api/hubs





