## Project Goals
* Create a .csv importer using Node and Docker that will allow users to upload a .csv file and persist it to a database. It will also allow users to query the data via a frontend courtesy of React.

### This project is made with:
* Express: for providing a REST API
* Cors: for providing secure data transfers between the browser and server
* Multer: the middleware of choice for handling mulitpart/ form-data when uploading files
* Pg: as a non-blocking PostgreSQL client for Node
* Sequelize: ORM things and database interactions
* Fast-csv: library for parsing and formatting CSV files
* Json2csv: library for converting JSON into CSV with headers and proper line endings

### Running this project locally:
* Make sure Docker desktop is open: `docker compose up`
* To run the Express server: `npm run start`
* To run the integration test:
- `docker compose up`
- cd to api, then: `npm test`
-> 3 tests should pass, confirming proper database configuration
* To run this project in the browser:
- run the database: Make sure Docker desktop is open: `docker compose up`
- run the Express server: `npm start`
- run the frontend: cd client, then run: `npm run dev`

<!-- * To run the frontend: `npm run dev` -->

### Current status:
* Postgres db is functional inside Docker, and the API can connect to it from the outside
* We can successfully upload and parse csv files to disk
* The data does not appear to be adding to the database

### Troubleshooting:
* Is there data in the database?
- With the server and Docker running, click on the postgres container inside Docker, and inside the Exec terminal run: `psql -U postgres -d csvdb -c "SELECT * FROM records;"`

### MVP:
1. Rebuild schema to include our 'Customer' info found in the 'events.csv' file
2. Drop current db and rebuild it, vfy successful connection to db inside Docker
3. Containerize the API
4. Containerize React
5. Build out React frontend
6. Test the csv import function
7. Test that data gets added to the db
8. Render the data in the browser
9. Make frontend 'nice-enough' visually, inline with the aesthetics of a certain company

### Nice to haves:
* Use PM2 for production
* Add an integration test (either with Mocha/ Chai or Jest)
* CI/CD it
* Add more features.. to be determined...
