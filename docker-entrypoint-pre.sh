#!/bin/bash

# Perfom all the needed preprocessing here...

cat __tests__/testconfig.json | \
jq ".browser = `cat __tests__/docker_browser_flags.json`" > \
tmp.json && mv tmp.json testconfig1.json


sed -i "s#https://archive.kbb1.com#$TEST_ADDR#g" __tests__/testconfig.json
sed -i "s#\"headless\": false#$BROWSER_FLAGS#g" __tests__/testconfig.json

# Invoke the original entrypoint passing the command and arguments
exec  $@ 
