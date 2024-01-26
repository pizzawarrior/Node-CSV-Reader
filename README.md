# CSV Reader for Usage Based Billing Platform

## Problem Statement
- As a startup we recieve a high volume of customer usage data sent to us as .csv files
- We need to be able to: <br>
&nbsp;&nbsp;&nbsp;&nbsp; - take .csv files, parse them, upload them to a database, and query the data <br>
&nbsp;&nbsp;&nbsp;&nbsp; - view the data in a clean UI <br>
&nbsp;&nbsp;&nbsp;&nbsp; - aggregate the data by key metrics (eg. into hourly buckets for individual customers) <br>
&nbsp;&nbsp;&nbsp;&nbsp; - generate invoices based on customer usage

## User Stories:
### Customer: Outrider.ai - Autonomous yard truck company deployed to thousands of sites globally
- As a customer I want the ability to: <br>
&nbsp;&nbsp;&nbsp;&nbsp; - create an account, login, and signout <br>
&nbsp;&nbsp;&nbsp;&nbsp; - view all of my customers' usage data <br>
&nbsp;&nbsp;&nbsp;&nbsp; - view all of my customers' current invoices <br>
&nbsp;&nbsp;&nbsp;&nbsp; - view all of my customers' past invoices <br>
&nbsp;&nbsp;&nbsp;&nbsp; - ask questions about/ resolve any issues my customers have with invoicing

### Usage Based Billing Company:
- As a company, we want to be able to: <br>
&nbsp;&nbsp;&nbsp;&nbsp; -  have admin accounts that can view all usage data by all customers <br>
&nbsp;&nbsp;&nbsp;&nbsp; - view all invoices, current or past <br>
&nbsp;&nbsp;&nbsp;&nbsp; - query the data based on specified inputs, such as: <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * aggregate by customer_id <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * ability to add a start_date and end_date to aggregate data into hourly buckets

## Minimum Viable Product:
1. A Node project that uses Docker to persist a relational database, and containerize all services independently into microservices
2. Ability to upload .csv files, parse them, and add them to the db
3. A UI that will call the db and display the data

## This project is made with:
### Backend:
* Node.js: for the ability to build a server side app using Javascript
* Express: for providing a REST API
* Cors: for providing secure data transfers between the browser and server
* Multer: the middleware of choice for handling mulitpart/ form-data when uploading files
* Pg: as a non-blocking PostgreSQL client for Node
* Sequelize: all things ORM; handling database interactions
* Fast-csv: library for parsing and formatting CSV files
* Json2csv: library for converting JSON into CSV with headers and proper line endings
* Jest: Integration testing

### Frontend:
* React: for dynamically handling the UI, and providing a great foundation to scale from
* react-table: for facilitting the quick build of a table that cleanly integrates sorting

## Project Architecture
![Appliction Architecture](https://github.com/pizzawarrior/CSV-Reader/assets/94874182/9f17f21e-0f8b-41d5-bc0a-1baa98589e85)

## Models
### Records Model
- customer_id: string; used to track a customer's usage
- event_type: string; describes what kind of usage event was recorded
- event_id: string; this is a unique id given to each individual recorded event, and is used as the Primary Key in the database
- event_date: string; this is a timestamp of when the usage event occurred, which can be used for metering usage and generating invoices

## Endpoints
<img src="https://github.com/pizzawarrior/CSV-Reader/assets/94874182/5fd008c7-3c10-453e-9a10-ea247d1a4fe6" width="850">

## Running This Project Locally
* Make sure Docker desktop is open: `docker compose up`
* To run the integration test: <br>
&nbsp;&nbsp;&nbsp;&nbsp; --> cd to api, make sure Docker Desktop is open, and run: `docker compose run api npm test` <br>
&nbsp;&nbsp;&nbsp;&nbsp; --> 3 tests should pass, confirming proper database configuration

## Future Enhancements:
1. Add in the aggregate process that would take the data, meter it by usage (total num of events by customer_id divided into hourly buckets) and turn this into a detailed invoice with line items and sub-line items
2. Add more models and build endpoints (inc. users, token, invoices)
3. Auth/ protected routes, so that only authorized users can view their invoices
4. Use PM2 for monitoring production
5. Unit tests
6. CI/CD

### Troubleshooting:
* Is there data in the database? <br>
&nbsp;&nbsp;&nbsp;&nbsp; - With the server and Docker running, click on the postgres container inside Docker, and inside the Exec terminal run: `psql -U postgres -d csvdb -c "SELECT * FROM records;"`
