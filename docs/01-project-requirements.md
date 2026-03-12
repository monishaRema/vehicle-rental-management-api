## Project Overview

The Vehicle Rental Management API is a backend service designed to support a vehicle rental platform. The system provides a centralized API for managing vehicles, customer bookings, and administrative operations.

The platform enables customers to browse available vehicles, check vehicle details, and create reservations for specific rental periods. At the same time, administrative users are able to manage vehicle inventory, oversee booking activity, and maintain operational control of the platform.

This backend system is intended to serve as the core data and business logic layer for future client applications such as:

- web dashboards
- mobile applications
- internal administration tools

The API will expose RESTful endpoints that allow external applications to interact with the system in a secure and scalable manner.

The system must handle common operational challenges in rental platforms, including:

- preventing double bookings
- enforcing role-based permissions
- maintaining accurate booking records
- providing operational visibility through audit logs

The architecture must support future growth and integration with additional services without requiring significant redesign.
------------------------------------------------------------------------

# 2. Technical Requirements

## Backend Stack

-   Node.js
-   Express.js
-   TypeScript
-   PostgreSQL
-   Prisma ORM

## Security & Middleware

-   JWT Authentication
-   Role-Based Access Control (RBAC)
-   Helmet
-   CORS
-   Rate Limiting

## Validation

-   Zod or similar validation library

## Logging

-   Pino structured logging

## Background Jobs

-   node-cron

------------------------------------------------------------------------

# 3. Core System Roles

The platform will support **two user roles**.

## Customer

Customers are standard users of the platform.

They can:

-   register an account
-   log into the system
-   browse available vehicles
-   search and filter vehicles
-   create bookings
-   view their own bookings
-   cancel their bookings (if allowed)

Customers cannot:

-   manage vehicles
-   manage users
-   view other users' bookings
-   access admin-only endpoints

------------------------------------------------------------------------

## Admin

Admins manage the platform.

They can:

-   manage vehicles
-   manage users
-   view all bookings
-   process vehicle returns
-   deactivate users
-   view audit logs

Admins cannot bypass core business rules such as booking conflicts.

------------------------------------------------------------------------

# 4. Core Domain Entities

The system must include the following entities.

## Users

Fields:

-   id
-   name
-   email
-   passwordHash
-   role
-   status
-   createdAt
-   updatedAt

Constraints:

-   email must be unique
-   passwords must be hashed
-   inactive users cannot log in

------------------------------------------------------------------------

## Vehicles

Fields:

-   id
-   name
-   brand
-   model
-   year
-   type
-   fuelType
-   transmission
-   dailyRate
-   seatingCapacity
-   registrationNumber
-   status
-   isDeleted
-   createdAt
-   updatedAt

Constraints:

-   registration number must be unique
-   vehicle must be available to allow booking

------------------------------------------------------------------------

## Bookings

Fields:

-   id
-   userId
-   vehicleId
-   startDate
-   endDate
-   totalCost
-   status
-   cancelledAt
-   completedAt
-   createdAt
-   updatedAt

Constraints:

-   startDate must be before endDate
-   bookings cannot overlap for the same vehicle
-   completed bookings cannot be cancelled

------------------------------------------------------------------------

## Audit Logs

Fields:

-   id
-   actorUserId
-   action
-   entityType
-   entityId
-   metadata
-   createdAt

Audit logs record critical system actions.

------------------------------------------------------------------------

# 5. Core Features

The system must support the following features.

## Authentication

Endpoints:

POST /api/v1/auth/register\
POST /api/v1/auth/login\
GET /api/v1/auth/me

Requirements:

-   password hashing
-   JWT token generation
-   authentication middleware

------------------------------------------------------------------------

## Authorization

Role-based access control must be implemented.

Example rules:

-   only admins can manage vehicles
-   only admins can manage users
-   customers can only access their own bookings

------------------------------------------------------------------------

## Vehicle Management

Admins must be able to:

-   create vehicles
-   update vehicles
-   soft delete vehicles

Public users must be able to:

-   view vehicles
-   search vehicles
-   filter vehicles
-   paginate vehicle results

------------------------------------------------------------------------

## Booking Management

Customers must be able to:

-   create bookings
-   view their bookings
-   cancel bookings

Admins must be able to:

-   view all bookings
-   process vehicle returns

Booking creation must prevent:

-   vehicle double booking
-   invalid date ranges

------------------------------------------------------------------------

# 6. Transactions

The system must protect critical operations with **database
transactions**.

### Booking Creation Transaction

Steps:

1.  verify vehicle exists
2.  check vehicle availability
3.  verify no booking conflict
4.  calculate rental cost
5.  create booking
6.  create audit log

If any step fails, the transaction must roll back.

------------------------------------------------------------------------

### Booking Cancellation Transaction

Steps:

1.  verify booking exists
2.  update booking status
3.  update vehicle availability if needed
4.  create audit log

------------------------------------------------------------------------

### Vehicle Return Transaction

Steps:

1.  verify booking exists
2.  mark booking completed
3.  mark vehicle available
4.  create audit log

------------------------------------------------------------------------

# 7. Validation

All request payloads must be validated before reaching controllers.

Examples:

-   registration input
-   login input
-   create vehicle input
-   create booking input
-   pagination query parameters

Invalid requests must return structured validation errors.

------------------------------------------------------------------------

# 8. Logging

The application must implement structured logging using **Pino**.

Logs should include:

-   request method
-   request path
-   response status code
-   response time
-   user ID if authenticated
-   error messages

------------------------------------------------------------------------

# 9. Background Job

Implement a scheduled job that runs periodically.

## Overdue Booking Checker

The job should:

-   find bookings whose endDate has passed
-   mark them as OVERDUE
-   optionally log the event

------------------------------------------------------------------------

# 10. Architecture Rules

The project must follow a **modular monolith architecture**.

Layering:

Route → Controller → Service → Repository

Responsibilities:

Route - defines endpoint path - attaches middleware - calls controller

Controller - extracts request input - calls service - returns formatted
response

Service - implements business logic - manages transactions - enforces
domain rules

Repository - performs database operations - uses Prisma queries only

------------------------------------------------------------------------

# 11. Folder Structure

src ├── app.ts ├── server.ts ├── config ├── common ├── errors ├──
middleware ├── modules └── prisma

------------------------------------------------------------------------

# 12. Deliverables

The final project must include:

-   fully working REST API
-   PostgreSQL database schema
-   Prisma schema
-   modular architecture
-   authentication and RBAC
-   transactions for booking workflows
-   background job
-   structured logging
-   comprehensive README

------------------------------------------------------------------------

# 13. Success Criteria

The project will be considered complete when:

-   all API endpoints function correctly
-   authentication and RBAC work properly
-   validation is enforced
-   booking conflicts are prevented
-   transactions protect multi-step writes
-   logging is implemented
-   background job runs successfully
