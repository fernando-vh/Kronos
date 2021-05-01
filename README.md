# Welcome to Kronos from the MMC (My Music Creator)

You are in the Kronos documentation. Kronos is our backend server, it was created in node with express framework. Backend development is love, is live.

## Project dependencies 
Apart from the package.json this was implemented on:
  * Node: 12.19.0

No planned maintenance for future updates.

## Installation process

1. First you need to set up and run a RDBMS (Relational Database Management System), we use MYSQL Workbench, there is a `model.mwb` in the _DB_CONF_FILES folder that contains all the DB specifications.
2. Next you need to run the `kronos query.sql` (in the same _DB_CONF_FILES folder) which contains the default values for some tables.
3. Then run the `npm install` for all the node dependencies.
4. Now you need to configure your `.env` files (There is an `sample.env` in the project where you can see what variables you need to set).
5. Finally run the server with `npm start`.

If you want to test the API, there is a file inside the INSOMNIA folder with an exported file from insomnia REST API.
