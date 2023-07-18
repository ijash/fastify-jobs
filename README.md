# Job API

This is a simple job API that allows users to perform various operations related to jobs. It provides endpoints for user authentication, job retrieval, and job details.

## Prerequisites

Before running the application, ensure that you have the following prerequisites installed:

- Docker (optional for database setup)

  - Modify the database configuration in `src/helpers/database.ts`, `knexfile.ts`, or `.env.example` according to your preferred PostgreSQL database.

- Node.js

## Usage

To run the application, follow these steps:

1. Install the dependencies by running the following command:

   ```shell
   npm install
   ```

   This will also install the development dependencies.

2. Start the database using Docker (optional) by running the following command:

   ```shell
   npm run startDb
   ```

3. Run database migrations using Knex by running the following command:

   ```shell
   npx knex migrate:latest
   ```

   This will create the necessary database tables.

4. Start the application by running the following command:

   ```shell
   npm run start
   ```

   The application will start running on the specified port.

## API References

### Login

- **Endpoint**: `POST {baseurl}/api/v1/login`

- **Schema**:

  ```json
  {
    "id": "string",
    "password": "string"
  }
  ```

### Register

- **Endpoint**: `POST {baseurl}/api/v1/register`

- **Schema**:

  ```json
  {
    "id": "string",
    "password": "string"
  }
  ```

### Get Jobs

- **Endpoint**: `GET {baseurl}/api/v1/job`

- **Authentication**: Bearer token

- **Query Schema**:

  ```json
  {
    "description": "string",
    "location": "string",
    "full_time": "boolean",
    "page": "number",
    "limit": "number"
  }
  ```

### Get Job by ID

- **Endpoint**: `GET {baseurl}/api/v1/job/:id`

- **Authentication**: Bearer token

- **Param Schema**:

  ```json
  {
    "id": "string"
  }
  ```

## Notes

- This API is intended as a simplified version and may not cover all aspects of a complete job API implementation.

By Jastria Rahmat
