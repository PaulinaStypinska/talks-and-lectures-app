#!/bin/bash

set -e
set -u

psql -d talks --file=./app/lib/cleanDbAfterTest.sql
 
echo "sql script was successful"
exit