 
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
server.use(helment())           --> Third party
server.use(express.json())      ---> Built-in
## Local middleware determined by specified Routes (URI) 
server.use('/api/hubs', hubsRouter)


## Importing helment
const helment = require('helment')
const server = express()
server.use(helment())
*** If we put gatekeeper before helmet, it won't stop someone from putting in the wrong password and being able to see we're using express!






## GUIDED PROJECT
function dateLogger(req,res,next){
     console.log(new Date().toISOString())
     next();
}

server.use(helment())                   <-- global middleware / third party 
server.use(express.json())              <-- global middleware / built-in
server.use(dateLogger)                  * notice that the custom middleware function ISN'T BEING INVOKED (global middleware)

server.use('/api/hubs', hubsRouter)     <-- middleware restricted/activated only through the URI route






## Write a middleware function that logs the  HTTP method and the URL visited by the client
* should log to the console something that looks like this: GET / or GET /api/hubs
* Or you can just download ----> Morgan via `npm i morgan`

function practiceLogging (req, res, next){
     console.log(
          `The Logger: [${new Date().toISOString()}]
          ${req.method} ${req.url}`
     )
     next();
}
server.use(practiceLogging)


## Ways of receiving data? 
1. key-value store that looks like a JS object (req.query)
     If you pass some headers into the JS client - you'll get a JS object and read the values off of there 
2. body (only available if you have a POST or PUT - GET requests do not have a BODY!!!!)
3. dynamic routes (URL parameters)
4. headers







## Middleware gateKeeper 
function gateKeeper(req, res, next){
     const password = req.headers.password || ''        <-- takes password header (or if its not there, an empty string)

     if(password.toLowerCase() === 'mellon'){
          next();
     } else{
          res.status(400).json({you: "cannot pass!!"})
     }
}
* Why can't you read the password from the body?
- Remember that the WEB is a layered system - those URL codes can be caught in someone's database in between
- Passwords should not be a URL parameter or URL query string => Headers are a little more secure


## Exercise: Change the gatekeeper to return a 400 if no password is provided + message that says please provide a password
* if a password is provided (and it is mellon) call next -> otherwise return a 401 + you shall not pass message
function gateKeeper(req, res, next){
     if (req.headers.password){
          if(req.headers.password === 'mellon'){
               next();
          } else{
               res.status(401).json({message: 'you shall not pass'})
          }
     } else{
          res.status(400).json({message: 'please provide a password'})
     }
}



## Creating a separate file for (exporting) Logger middleware functions 
* File: dateLogger-middleware.js 

function dateLogger(req,res,next){
     console.log(new Date(). toISOString())
     next();
}


## Creating a Middleware that adds something to a request 
* Whatever value you give it - it will double that and so the next handler you give it will have access to this doubled number
function doubler(req, res, next){
     const number = req.query.number       <-- everything coming from the URL is a string!!! (even though it is a number, it will return as '1' a string) => therefore, we must parse its
     const number = Number(req.query.number || 0);      <-- read number on query string via Number() -- (if not then it will be zero)>

     req.doubled = number * 2;        <-- we >

     next(); 
}

server.use(doubler)       <-- it is placed under the hubsRouter, therefore not global 

** What if I just wanted it to run on a certain endpoint? (LOCALLY)
- im going to use the doubler first - and then the endpoint Middleware
server.get('/', doubler, (req, res) => {
     res.status(200).json({number: req.doubled })                   <-- it will only apply LOCALLY to '/' endpoint and can be accessed via req.doubled (a key we created)
})
module.exports = server



## testing
localhost:4000/?number=8
- should 




## Middleware 
* middleware accepts a parameter (normally aren't invoked)
* to invoke it and make it functional..... bring in the prefix (parameter) and return using (req,res,next)
****** therefore allowing you to read it from the outter scope - wrapping it in a function that returns a middleware

a