#!/bin/bash

# change browser flags
cat __tests__/testconfig.json | \
jq ".browser = `cat docker_browser_flags.json`" > \
tmp.json && mv tmp.json __tests__/testconfig.json

# change host to perform tests against
sed -i "s#https://kabbalahmedia.info#$TEST_ADDR#g" __tests__/testconfig.json

# Invoke the original entrypoint passing the command and arguments
exec  $@ 
