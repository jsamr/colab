#!/bin/bash
cd "${BASH_SOURCE%/*}" || (echo "FAILURE: impossible de trouver le répertoire courant" ; exit 1)
cd ../
export MONGO_URL=${MONGO_URL:-"mongodb://localhost:27017/colab2"}
echo "mongo url set to $MONGO_URL"
settings=${1:-"conf/colab.conf"}
echo "Using settings from ${settings}"
meteor run --raw-logs --settings ${settings}