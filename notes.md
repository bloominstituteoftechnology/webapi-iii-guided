MIDDLEWARE NOTES 

## Quote 
"Whenever I have to **think** to understand what the code is doing, I ask myself if I can **refactor** the code to make that understanding more immediately apparent" - Martin Fowler 

##Jargon 
_"Refactoring"_

## Middleware 

There are two types 
- normal 
- error handling 

Can come from different sources: 
- built-in: included with express
- third party: need to be installed separately 
- custom: we write it!

We can use it: 
- globally: it runs on every request to any endpoint
- locally: only applies to specified endpoints 

Middleware can: 
- inspect the `request` and `response` objects
- make changes to the  `request` and response `objects`
- move the `request` or `repsonse` object to the _next- middleware in the queue 
- stop the request and send back a response to the client

**order matters!**