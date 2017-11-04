#!/bin/bash
# prompt user
printf "Checking for .env file... "
# check for .env's existence and emptiness
if [ -e ".env"] && [-s ".env"]; then
	# finish if exists and not empty
	printf "[done]"
else
	# otherwise write file
	# prompt users for variables
	printf "file does not exist\nEnter variable data\nPORT: "
	# read vars
	read PORT
	printf "URL: "
	read URL
	# write vars
	printf "Writing file..."
	echo "PORT=$PORT" > .env
	echo "URL=$URL" >> .env
	printf "[done]"
fi