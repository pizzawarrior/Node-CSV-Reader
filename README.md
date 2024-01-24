# CSV Reader for Usage Based Billing Platform

## Problem Statement
- As a startup we recieve a high volume of customer usage data sent to us as .csv files
- We need to be able to take .csv files, parse them, upload them to a database, and query the data
- Ability to view the data in a clean UI
- Once parsed and stored, the data could then be aggregated by a specified metric (eg. hourly buckets) allowing for the generation of invoices based on customer usage.

### MVP
1. A Node project that uses Docker to persist a relational database
2. Ability to upload .csv files, parse them, and add them to the db
3. A UI that will call the db and display the data

### This project is made with:
* Express: for providing a REST API
* Cors: for providing secure data transfers between the browser and server
* Multer: the middleware of choice for handling mulitpart/ form-data when uploading files
* Pg: as a non-blocking PostgreSQL client for Node
* Sequelize: ORM things and database interactions
* Fast-csv: library for parsing and formatting CSV files
* Json2csv: library for converting JSON into CSV with headers and proper line endings
* Jest: Integration testing

## Project Architecture


### Running This Project Locally
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

### Future Enhancements:
* Fully containerized into 3 microservices
* Add in the aggregate process that would take the data, meter it by usage (total num of events by customer_id divided into hourly buckets) and turn this into a detailed invoice with line items and sub-line items
* Auth/ protected routes, so that only authorized users can view their invoices
* Use PM2 for production
* Unit tests
* CI/CD
* Add more features.. TBD...

### Troubleshooting:
* Is there data in the database?
- With the server and Docker running, click on the postgres container inside Docker, and inside the Exec terminal run: `psql -U postgres -d csvdb -c "SELECT * FROM records;"`
