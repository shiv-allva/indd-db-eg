# InDesign Data-Driven Automation (JSX + Node.js + MySQL)

## Overview

This project is a lightweight, open-source foundation for **data-driven publishing in Adobe InDesign**.

It connects a MySQL database to InDesign using a Node.js API and a reusable JSX HTTP client, enabling automated layout generation directly inside InDesign.

Flow:
MySQL → Node.js API → JSX HTTP Client → InDesign Document

---

## Why This Exists

Adobe InDesign ExtendScript does not support:

* Direct database connections
* Native HTTP/HTTPS requests
* JSON parsing (without polyfill)

This project solves those limitations by introducing:

* A Node.js middleware layer
* A reusable HTTP client (`http.jsx`)
* JSON parsing support (`json2.js`)

---

## Features

* Fetch live data from MySQL into InDesign
* Reusable HTTP client for ExtendScript (`http.jsx`)
* Clean separation between API and layout logic
* Automatic text frame generation
* JSON parsing support for ExtendScript
* Minimal, extensible architecture

---

## Architecture

JSX (InDesign)
↓
http.jsx (Socket-based HTTP client)
↓
Node.js API (Express)
↓
MySQL Database

---

## Project Structure

indd-db-eg/

* server/

  * server.js
  * db.js
  * package.json

* jsx/

  * fetch_data.jsx
  * http.jsx
  * json2.js

* data/

  * sample.sql

---

## Requirements

* Adobe InDesign (ExtendScript enabled)
* Node.js (v14+)
* MySQL Server

---

## Setup Instructions

### 1. Setup Database

Import:

data/sample.sql

This creates:

* Database: indesign_db
* Table: users

---

### 2. Configure DB Connection

Edit:

server/db.js

Update:

* host
* user
* password

---

### 3. Install Dependencies

cd server
npm install

---

### 4. Start API

node server.js

Expected:
Server running: http://127.0.0.1:3000

---

### 5. Test API

http://127.0.0.1:3000/users
http://127.0.0.1:3000/users-clean

---

### 6. Setup InDesign Script

Ensure:

* http.jsx
* json2.js
* fetch_data.jsx

<<<<<<< HEAD
Include at top of script:

#include "json2.js"
#include "http.jsx"

=======
>>>>>>> 147cf7c394abd15a2adce3c46e011b1ad91a8bd1
---

### 7. Run in InDesign

* Open InDesign
* Open Scripts panel
* Run fetch_data.jsx

Result:

* Data from MySQL is inserted into the document
* Text frames are created automatically

---

## http.jsx (Core Module)

This project introduces a reusable HTTP client for ExtendScript.

Example:

var data = http.get("127.0.0.1", 3000, "/users");

Features:

* Socket-based HTTP requests
* Automatic response parsing
* JSON extraction and cleanup
* Null character handling
* Error handling via exceptions

---

## How It Works

1. JSX sends HTTP request via Socket
2. Node.js API queries MySQL
3. API returns JSON response
4. http.jsx extracts and cleans response
5. json2.js parses JSON
6. JSX writes content into InDesign

---

## Limitations

* ExtendScript is ES3-based (no modern JS features)
* No native HTTPS support
* Socket communication is synchronous
* JSON parsing uses eval (via json2.js)

---

## Troubleshooting

### HTTP 400 Error

* Ensure correct request format in http.jsx
* Verify endpoint path

---

### JSON Parse Error

* Response may contain hidden null characters
* http.jsx already handles cleanup

---

### JSON Undefined

* Ensure json2.js is included

---

### No Data in InDesign

* Verify API response
* Check MySQL data
* Confirm script execution

---

## Roadmap

Planned improvements:

* POST support in http.jsx
* Config-based API setup
* JSON → InDesign style mapping
* Table generation from data
* Image placement via URLs
* Pagination automation
* Logging system (replace alerts)
* Template-driven layout engine

---

## Use Cases

* Catalog automation
* Newsletter production
* Report generation
* Data-driven publishing workflows
* Internal dashboards exported via InDesign

---

## Recommended Architecture (Production)

JSX → Node.js → Database / APIs / AI services

Avoid calling external APIs directly from JSX.

---

## Contributing

Contributions are welcome:

* Improve HTTP module
* Add layout mapping features
* Extend API capabilities
* Improve documentation

---

## License

Open-source (add your license here)

---

## Author

Created by Shivaram Allva

---

## Final Note

This project is a foundation — not just a demo.

With extensions, it can evolve into:

* A lightweight EasyCatalog alternative
* A full data-driven publishing engine
* A scalable InDesign automation platform
