#!/bin/bash

build() {
	npm install
	npm build .
	npm-do magnet build .
}

clean() {
	rm -rf ./node_modules
}

start() {
	npm run dev | ./node_modules/.bin/bunyan
}

main() {
	local arg1="$1"

	if [[ "${arg1}" == "build" ]]
	then
		build
	elif [[ "${arg1}" == "clean" ]]
	then
		clean
	elif [[ "${arg1}" == "start" ]]
	then
		start
	fi
}

main "$@"

