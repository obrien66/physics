#!/bin/bash

function getVars(){
	# otherwise write file
	# prompt users for variables
	printf "file does not exist\nEnter variable data\nPORT: "
	# read vars
	read PORT
	printf "URL: "
	read URL
	printf "TITLE: "
	read TITLE
	# write vars
	printf "Writing file..."
	echo "PORT=$PORT" > .env
	echo "URL=$URL" >> .env
	echo "TITLE=$TITLE" >>.env
	printf "[done]\n"
	return 0
}


# prompt user
printf "Checking for .env file... "
# check for .env's existence and emptiness
if [ -e ".env" ] && [ -s ".env" ]; then
	# finish if exists and not empty
	printf ".env file detected, overwrite? Y/n\n"
	read OVERWRITE
	if [ $OVERWRITE == "Y" ] || [ $OVERWRITE == "y" ]; then
		getVars
	else
		printf "[done]"
	fi
else
	getVars
fi