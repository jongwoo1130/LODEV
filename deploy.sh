#!/bin/sh

fuser -k -n tcp 3000
nohup /usr/local/bin/node server >/dev/null 2>&1 &

echo SCRIPT DONE!
