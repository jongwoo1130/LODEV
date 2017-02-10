#!/bin/sh

fuser -k -n tcp 3000

sleep 5
nohup /usr/local/bin/node server >/dev/null 2>&1 &

echo DEPLOYMENT SCRIPT DONE!
