#!/bin/bash

# Check for password argument
if [[ $# -eq 0 ]] ; then
    echo 'You must provide one argument for the password of the "bring-it" user to be created'
    echo '  Usage:  init_db.sh MyPa55wd123'
    echo
    exit 1
fi

# Initiate MongoDB Replica Set configuration
echo "Configuring the MongoDB Replica Set"
kubectl exec mongo-0 -c mongod-container -- mongo --eval 'rs.initiate({_id: "MainRepSet", version: 1, members: [ {_id: 0, host: "mongo-0.mongo.bring-it.svc.cluster.local:27017"}, {_id: 1, host: "mongo-1.mongo.bring-it.svc.cluster.local:27017"}, {_id: 2, host: "mongo-2.mongo.bring-it.svc.cluster.local:27017"} ]});'
echo

# Wait for the MongoDB Replica Set to have a primary ready
echo "Waiting for the MongoDB Replica Set to initialise..."
kubectl exec mongo-0 -c mongod-container -- mongo --eval 'while (rs.status().hasOwnProperty("myState") && rs.status().myState != 1) { print("."); sleep(1000); };'

# Sleep to ensure everything is ready!
sleep 20

echo "...initialisation of MongoDB Replica Set completed"
echo

# Create the admin user (this will automatically disable the localhost exception)
echo "Creating user: 'bring-it'"
kubectl exec mongo-0 -c mongod-container -- mongo --eval 'db.getSiblingDB("admin").createUser({user:"bring-it",pwd:"'"${1}"'",roles:[{role:"root",db:"admin"}]});'
echo 
