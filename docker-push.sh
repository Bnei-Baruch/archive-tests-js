#!/bin/bash
#login to dockerhub
docker login --username $DOCKER_USER --password $DOCKER_PASS

#push the image
docker push $HUB_REPO
