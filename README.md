
# Dustballs dot App

## See it Live here: [dustballs.app](https://dustballs.app) 

Work in progress, look at the sonnets! 

Shakespeare Scraps generator
(dustballs)

This application is a querying tool for Shakespeare's Folio (discography). 


## Project History

The project started as a regex exercise, Where a series of scripts parsed  a monolithic text file of the entirety Shakepeare's works, and seperated them into JSON  files in preperation to load them into a MongoDB databse. you can see the Scripts and raw documents in the `/Source_Material` dirtectory


## Current Status

The application has a server side Flask REST api in a DigitalOcean droplet. When handling a request, the server uses a database deployed in a MongoDB Atlas instance.

The client side application is a Typescript React SPA deployed to netlify. Besides the base functionality, the app is intended to showcase the potential of CSS Art, and eventually, animation. Currently, the dustballs are noteably absent, but they will become the players of the dustball stage.



## TODO ( from here down its unfiltered notes at the moment, thanks for stopping by!)

- better search. utilize mongodb's search functionailty first
- more css accents. 
- improve grid layout.
- carousel for scraps of paper . (post it boards)
- more endpoints for plays to account for more search options and pagination
- icons for buttons
- add postscript to intro txt file
- handle choruses and prologues
- update end of sonnet parser
- error handling overhaul
- organize style/base
- stage roof. 
- stage floor (the boards!)
- cors

### how to start the server

`export FLASK_APP=server;
export FLASK_ENV=development;
flask run`

```
python3.8 -m venv .dustenv 
source .dustenv/bin/activate
```


