#!/bin/bash
set -e

echo "Initialising database '${APP_DB_NAME}' with user '${APP_DB_USER}' ..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER ${APP_DB_USER} WITH PASSWORD '$APP_DB_PASS';
    CREATE DATABASE "${APP_DB_NAME}"
      OWNER=${APP_DB_USER}
      LC_COLLATE='en_AU.utf8'
      LC_CTYPE='en_AU.utf8'
      ENCODING='UTF8'
      TEMPLATE=template0;
    \c "${APP_DB_NAME}"

EOSQL
