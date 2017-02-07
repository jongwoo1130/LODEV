#!/bin/sh

git pull . master
at now -f /usr/local/bin/node server
