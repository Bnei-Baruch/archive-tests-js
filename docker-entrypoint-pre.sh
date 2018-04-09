#!/bin/bash

# Perfom all the needed preprocessing here...
cat spec/spec.js
sed -i "s#https://archive.kbb1.com#$TEST_ADDR#g" spec/spec.js
sed -i "s#headless: false#$BROWSER_FLAGS#g" spec/spec.js

# Invoke the original entrypoint passing the command and arguments
exec  $@ 
