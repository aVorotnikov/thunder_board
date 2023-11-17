#!/bin/bash

PROJECT_ROOT=$1
DATA_BASE_FILE=$2

sqlite3 $DATA_BASE_FILE < ${PROJECT_ROOT}/sql/create_db.sql
sqlite3 $DATA_BASE_FILE < ${PROJECT_ROOT}/sql/test_data/insert.sql
