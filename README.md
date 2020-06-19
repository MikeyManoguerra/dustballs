Shakespeare Scraps generator
(dustballs)

### how to start the server

`export FLASK_APP=server;
export FLASK_ENV=development;
flask run`


## Where are we so far
- text of Shakespeare's collected works from guttenberg project
- minimal manual seperation (titles and intro/ps)
- MongoDB database with collections for Sonnets and Scenes


## Whats next?
- better search. utilize mongodb's search functionailty first
- more css accents. 
- improve grid layout.
- carousel for scraps of paper . (post it boards)
- more endpoints for plays to account for more search options and pagination
- icons for buttons
- deploy project on digital ocean


## TODO
- add postscript to intro txt file
- handle choruses and prologues
- update end of sonnet parser
- fetch and error handling overhaul
- organize style/base
- stage roof. 
- stage floor (the boards!)


```
python3.8 -m venv .dustenv 
source .dustenv/bin/activate
```

https://docs.python.org/3/tutorial/venv.html
so i need flask cors?

```
sudo systemctl restart nginx
sudo nginx -t
sudo systemctl start dustballs
sudo systemctl enable dustballs
sudo certbot --nginx -d api.dustballs.app


sudo less /var/log/nginx/error.log: checks the Nginx error logs.
sudo less /var/log/nginx/access.log: checks the Nginx access logs.
sudo journalctl -u nginx: checks the Nginx process logs.
sudo journalctl -u myproject: checks your Flask app’s uWSGI logs.


<!-- error nginx -->
sudo systemctl stop nginx
sudo mkdir /etc/systemd/system/nginx.service.d
# build the file in root where no sudo is needed
printf "[Service]\nExecStartPost=/bin/sleep 0.1\n" > override.conf
sudo cp override.conf /etc/systemd/system/nginx.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl start nginx

```


 <!-- pymongo.errors.ServerSelectionTimeoutError: -->
