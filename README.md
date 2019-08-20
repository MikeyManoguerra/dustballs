Shakespeare Scraps generator
(dustballs)



## Where are we so far
- text of Shakespeare's collected works from guttenberg project
- minimal manual seperation (titles and intro/ps)
- collection parser seperates the plays/poems into individual json files
- sonnets parser builds sonnets objects for mongodb
- sonnets in local database seed file
- beta version of build_play_parser runs, need to check  individual plays for errors


## Whats next?
- get MVP of live app for sonnets working now
- FLask endpoints.
- init React App

- make scripts more universal for all plays 
- add plays to mongodb


## Grand Plan
- dump json files into mongodb
- Flask app that can access this mongodb
- front end that dice rolls at first, increase search later



## TODO
- add postscript to intro txt file
- save raw play data to txt file?
- handle choruses and prologues
- update end of sonnet parser