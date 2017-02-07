#!/bin/sh

nohup /usr/local/bin/node server >some.log 2>&1 </dev/null &
echo SCRIPT DONE!
