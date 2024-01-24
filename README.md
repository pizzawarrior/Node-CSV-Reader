# CSV Reader for Usage Based Billing Platform

## Problem Statement
- As a startup we recieve a high volume of customer usage data sent to us as .csv files
- We need to be able to take .csv files, parse them, upload them to a database, and query the data
- Ability to view the data in a clean UI
- Once parsed and stored, the data could then be aggregated by a specified metric (eg. hourly buckets) allowing for the generation of invoices based on customer usage.

## User Stories:
### Customer: Outrider.ai - Autonomous yard truck company deployed to thousands of sites globally
- As a customer I want the ability to create an account, login, and signout
- I want to be able to view all of my customers' usage data
- I want to be able to view all of my customers' current invoices
- I want to be able to view all of my customers' past invoices
- I want to be able to ask questions about/ resolve any issues my customers have with invoicing

### Usage Based Billing Company:
- As a company, we want to be able to have admin accounts that can view all usage data by all customers
- We want to be able to view all invoices, current or past
- We want to be able to query the data based on specified inputs: <br>
&nbsp;&nbsp;&nbsp;&nbsp; * aggregate by customer_id <br>
&nbsp;&nbsp;&nbsp;&nbsp; * ability to add a start_date and end_date to aggregate data into hourly buckets

### Minimum Viable Product:
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
![Appliction Architecture](https://github.com/pizzawarrior/node-docker-csv-importer/assets/94874182/53b83f2a-6f84-4b1c-a640-99cc1e438566)

## Endpoints
<img src="https://github.com/pizzawarrior/CSV-Reader/assets/94874182/5fd008c7-3c10-453e-9a10-ea247d1a4fe6" width="850">

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
