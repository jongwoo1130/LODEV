# PROJECT TITLE: LODEV 
# AUTHOR: JONG W. LEE

Intro: A web application to implement RESTful API and allows input username, data, location.
Based on the user location, it will return its latitude, longitude and current temperature in real time.

Technologies: 
Source version control: Github
Build tool: Node Package Manager (npm)
Unit Testing framework: MochaJS, npm Loadtest module
Continuous Integration tools: Jenkins
F/E Development: AngularJS
B/E Development: NodeJS
Database: MongoDB (Requires DBName: LODEV, Collection name: LODEV)


Command running server: 
    node server
Command MochaJS unit-testing: 
    npm test
Command Loadtest:
    loadtest -c 10 --rps 200 http://localhost:3000
    loadtest [-n requests] [-c concurrency] [-k] URL
    --rps requests per second
Command MongoDB: 
    show dbs
    use LODEV
    show collections
    db.LODEV.find({})
    db.LODEV.remove({}) (example removing specific: db.LODEV.remove({_id:ObjectId("589a3729c5edf31b5192fda0")}))
    
AWS EC2: 
    ssh lodev (Requires /Users/jongmac/.ssh/config)
Checking Process on port: 
    sudo netstat -nlp | grep :3000
    lsof -i tcp:3000


