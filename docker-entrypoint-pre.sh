#!/bin/bash

# Perfom all the needed preprocessing here...
cat spec/daily_lesson_spec.js
sed -i "s#https://archive.kbb1.com#$TEST_ADDR#g" spec/testconfig.json

# Invoke the original entrypoint passing the command and arguments
exec  $@ 
