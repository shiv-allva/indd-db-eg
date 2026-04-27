# InDesign JSX ↔ Node.js ↔ MySQL Starter Pack

## Overview

This project demonstrates a working pipeline to fetch database data into Adobe InDesign using ExtendScript (JSX).

Since InDesign does not support direct database connections, this solution uses a Node.js API as a bridge.

Flow:
MySQL → Node.js API → InDesign JSX → Document Layout

---

## Features

* Fetch data from MySQL into InDesign
* Lightweight Node.js REST API
* ExtendScript (JSX) HTTP client using Socket
* JSON parsing support for ExtendScript
* Auto-create text frames in InDesign

---

## Project Structure

indesign-db-bridge/

* server/

  * server.js
  * db.js
  * package.json
* jsx/

  * fetch_data.jsx
  * json2.js
* data/

  * sample.sql

---

## Requirements

* Adobe InDesign (with ExtendScript support)
* Node.js (v14+ recommended)
* MySQL Server
* Basic knowledge of JSX scripting

---

## Setup Instructions

### 1. Setup MySQL Database

Import the sample SQL file:

* Open MySQL client
* Run data/sample.sql

This creates:

* Database: indesign_db
* Table: users

---

### 2. Configure Database Connection

Edit:

server/db.js

Update credentials:

* host
* user
* password

---

### 3. Install Node Dependencies

cd server
npm install

---

### 4. Start API Server

node server.js

You should see:

Server running: http://127.0.0.1:3000

---

### 5. Test API

Open in browser:

http://127.0.0.1:3000/users
or
http://127.0.0.1:3000/users-clean

You should get JSON data.

---

### 6. Setup InDesign Script

Ensure these files exist:

* jsx/fetch_data.jsx
* jsx/json2.js

Inside fetch_data.jsx, include:

#include "json2.js"

---

### 7. Run Script in InDesign

* Open Adobe InDesign
* Open Scripts Panel
* Run fetch_data.jsx

Result:

* Text frames will be created
* Each record from DB is placed into the document

---

## How It Works

1. JSX opens a socket connection to Node.js
2. Sends HTTP GET request
3. Receives raw HTTP response
4. Extracts JSON from response
5. Cleans invalid characters
6. Parses JSON using json2.js
7. Writes data into InDesign document

---

## Key Limitations

* ExtendScript does not support:

  * Native HTTP/HTTPS
  * JSON.parse (without polyfill)
  * Modern JavaScript features
* Socket communication is:

  * Synchronous
  * Sensitive to formatting
  * Requires manual parsing

---

## Recommended Improvements

* Add reusable HTTP client module for JSX
* Implement POST support (for API integrations)
* Add logging instead of alert()
* Build template-based layout system
* Add image placement support from URLs
* Introduce config file for endpoints

---

## Production Architecture

Recommended approach for scalability:

JSX → Node.js → Database / APIs / AI services

Avoid calling external APIs directly from JSX.

---

## Future Enhancements

* JSON → InDesign style mapping
* Table generation from data
* Image auto-placement
* Pagination automation
* Integration with PDF workflows
* ChatGPT-based content generation

---

## Notes

* JSON parsing uses eval (via json2.js)
* Safe for controlled/local APIs
* Not recommended for untrusted external data

---

## Author

Shivaram Allva
shiv.allva@yahoo.com

InDesign Automation workflows.
