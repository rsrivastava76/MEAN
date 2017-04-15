db.books.insert({
    title: 'Refactoring the DOM',
    author: 'Joe Blow',
    category: 'Technology'
})

db.books.insert({
    title: 'Learn Colloquial Speech',
    author: 'Susie Q',
    category: 'Humanities'
})

db.books.insert({
    title: 'Study of the Brain',
    author: 'Matt G',
    category: 'Health'
})

db.students.insert({
    _id : "S:001",
    name: 'Joe',
    undergrad: true,
    units: 9,
    classes: ['geography', 'math', 'journalism']
})

db.students.insert({
    _id : "S:002",
    name: 'Jane',
    undergrad: false,
    units: 12,
    classes: ['geography', 'science', 'journalism', 'history']
})

db.students.insert({
    _id : "S:003",
    name: 'Kevin',
    undergrad: true,
    units: 3,
    classes: ['geography']
})

db.students.insert({
    _id : "S:004",
    name: 'Rachel',
    undergrad: false,
    units: 6,
    classes: ['geography', 'history']
})

Install NodeJs & Mongodb
Run npm init inside the folder where you want to setup your CRUD web app, this will generate default Package by keep pressing Enter
Run npm install --save express mongoose body-parser
This will install Express, Mongoose and Body Parser
copy the app.js and Book.Model.js  in the folder
on command prompt inside this folder Run - node app
this will launch your server and on browser we can access the our CRUD API's

for Supported Queries on Mongoose - http://mongoosejs.com/docs/queries.html

Mongo and Mongoose Compatibility

>> MongoDB Server 2.4.x: mongoose ~3.8, 4.x
>> MongoDB Server 2.6.x: mongoose ~3.8.8, 4.x
>> MongoDB Server 3.0.x: mongoose ~3.8.22, 4.x
>> MongoDB Server 3.2.x: mongoose >=4.3.0
>> MongoDB Server 3.4.x: mongoose >=4.7.3
********************************
https://medium.com/@matteocontrini/how-to-setup-auth-in-mongodb-3-0-properly-86b60aeef7e8

Setup MongoAuthentication
Open Mongo Shell

1. use admin
2 db.createUser({ user: "ritesh", pwd: "Pass@123", roles: [{ role: "userAdminAnyDatabase", db: "admin" }] })
3. if mongodb.conf not exist then create this file
************************************************************
# mongodb.conf

# Where to store the data.

# Note: if you run mongodb as a non-root user (recommended) you may
# need to create and set permissions for this directory manually,
# e.g., if the parent directory isn't mutable by the mongodb user.

dbpath=/Users/rsrivastava/mongoDb/data/db

#where to log
logpath=/Users/rsrivastava/mongoDb/log/mongodb.log

logappend=true

#port = 27017

# Disables write-ahead journaling
# nojournal = true

# Enables periodic logging of CPU utilization and I/O wait
#cpu = true

# Turn on/off security.  Off is currently the default
#noauth = true
#auth = true

# Verbose logging output.
#verbose = true

# Inspect all client data for validity on receipt (useful for
# developing drivers)
#objcheck = true

# Enable db quota management
#quota = true

# Set oplogging level where n is
#   0=off (default)
#   1=W
#   2=R
#   3=both
#   7=W+some reads
#diaglog = 0

# Ignore query hints
#nohints = true

# Disable the HTTP interface (Defaults to localhost:28017).
#nohttpinterface = true

# Turns off server-side scripting.  This will result in greatly limited
# functionality
#noscripting = true

# Turns off table scans.  Any query that would do a table scan fails.
#notablescan = true

# Disable data file preallocation.
#noprealloc = true

# Specify .ns file size for new databases.
# nssize = <size>

# Accout token for Mongo monitoring server.
#mms-token = <token>

# Server name for Mongo monitoring server.
#mms-name = <server-name>

# Ping interval for Mongo monitoring server.
#mms-interval = <seconds>

# Replication Options

# in master/slave replicated mongo databases, specify here whether
# this is a slave or master
#slave = true
#source = master.example.com
# Slave only: specify a single database to replicate
#only = master.example.com
# or
#master = true
#source = slave.example.com

# in replica set configuration, specify the name of the replica set
# replSet = setname

************************************************************

4. Run following command to check Mongo
  mongod --config /Users/rsrivastava/mongoDb/config/mongod.conf
5. Go to mongo Shell, go to admin db and then login as user created at step 2
6. now use individual db and create Owners for them.
  use yourdatabase
  db.createUser({ user: "youruser", pwd: "yourpassword", roles: [{ role: "dbOwner", db: "yourdatabase" }] })
7. Now check that everything went fine with the auth function.
  db.auth("youruser", "yourpassword")
  show collections
