# Vehicle Rental Management API

The objective of this project is to build a **backend API for a vehicle rental management platform**.


---

## Project Purpose

The system will allow customers to browse available vehicles, create reservations, and manage their bookings, while administrators manage vehicles, users, and rental operations.

The platform must ensure:

- reliable booking management
- prevention of double bookings
- secure user authentication
- role-based access control
- operational transparency through audit logs
- scalable API architecture for future frontend and mobile integrations

The API will serve as the backend for future client applications including web dashboards and mobile apps.

---

## Project Type

**Backend-only API**

Domain: **Vehicle Rental Management System**

This system supports customers booking vehicles and admins managing users, vehicles, bookings, and audit logs.

---

## Primary Learning Goals

By completing this project properly, you should be able to:

- design a modular Express backend
- separate routes, controllers, services, and repositories correctly
- implement stateless authentication with JWT
- implement role-based authorization
- validate input before controller execution
- design consistent API responses
- handle expected and unexpected errors centrally
- build business workflows that require transactions
- design list endpoints with filtering, search, pagination, and sorting
- add structured request and error logging
- implement a scheduled background job
- use Prisma without letting it replace SQL reasoning

---

## Technology Stack

### Core Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL

### ORM
- Prisma ORM

### Authentication
- JWT
- bcrypt

### Validation
- Zod

### Security Middleware
- Helmet
- CORS
- express-rate-limit

### Logging
- Pino

### Background Jobs
- node-cron

### Development Tooling
- tsx or nodemon
- dotenv
- ESLint
- Prettier

---

## Engineering Rule for This Project

Use **Prisma as the implementation layer**, but use **SQL as the mental model**.

For every major service or repository flow, answer these questions before coding:

1. What SQL operation is actually happening?
2. What constraints can fail?
3. Is a transaction required?
4. What indexes would matter if data grows?

Do not use Prisma as a shortcut to avoid understanding relational behavior.

---

## Roles

The system has exactly **two roles**.

### 1. Customer

A customer can:

- register
- login
- view own profile
- browse vehicles
- search vehicles
- filter vehicles
- sort vehicles
- create bookings
- view own bookings
- cancel own booking if business rules allow

A customer cannot:

- manage vehicles
- manage users
- view all bookings
- access admin endpoints
- process returns
- view audit logs

### 2. Admin

An admin can:

- manage vehicles
- manage users
- view all bookings
- update booking status where needed
- process vehicle returns
- deactivate users
- soft delete vehicles
- view audit logs

---

## Core Domain Entities

This project should center around these entities only:

- users
- vehicles
- bookings
- audit_logs

Do not add unnecessary entities like payments, invoices, coupons, notifications, or maintenance history in this phase. That is scope creep.

---

## Entity Details

### User

Represents both customers and admins.

#### Fields

- `id`
- `name`
- `email`
- `passwordHash`
- `role`
- `status`
- `createdAt`
- `updatedAt`

#### Constraints

- `email` must be unique
- password must be hashed before storage
- inactive users cannot log in
- inactive users cannot create new bookings

---

### Vehicle

Represents a rentable vehicle.

#### Fields

- `id`
- `name`
- `brand`
- `model`
- `year`
- `type`
- `fuelType`
- `transmission`
- `dailyRate`
- `seatingCapacity`
- `registrationNumber`
- `status`
- `isDeleted`
- `createdAt`
- `updatedAt`

#### Constraints

- `registrationNumber` must be unique
- `dailyRate` must be greater than zero
- deleted vehicles cannot be booked
- inactive vehicles cannot be booked
- maintenance vehicles cannot be booked

---

### Booking

Represents a vehicle reservation and rental lifecycle record.

#### Fields

- `id`
- `userId`
- `vehicleId`
- `startDate`
- `endDate`
- `totalCost`
- `status`
- `cancelledAt`
- `completedAt`
- `createdAt`
- `updatedAt`

#### Constraints

- `startDate` must be before `endDate`
- bookings for the same vehicle must not overlap
- cancelled bookings cannot be returned
- completed bookings cannot be cancelled
- only authorized users can view booking details

---

### AuditLog

Represents important system events.

#### Fields

- `id`
- `actorUserId`
- `action`
- `entityType`
- `entityId`
- `metadata`
- `createdAt`

#### Example Audit Events

- vehicle created
- vehicle updated
- vehicle soft deleted
- booking created
- booking cancelled
- booking returned
- user deactivated
- user role changed

---

## Status Design

Do not use messy boolean combinations for lifecycle state. Use explicit status values.

### Vehicle Status

Allowed values:

- `AVAILABLE`
- `BOOKED`
- `MAINTENANCE`
- `INACTIVE`

### Booking Status

Allowed values:

- `CONFIRMED`
- `CANCELLED`
- `ACTIVE`
- `COMPLETED`
- `OVERDUE`

You may introduce `PENDING` only if you have a clear workflow reason. Do not add it by habit.

---

## Core Business Rules

These rules must be enforced in the service layer.

### Vehicle Rules

- vehicle must exist before it can be booked
- vehicle must be `AVAILABLE` to be booked
- vehicle with status `MAINTENANCE` cannot be booked
- vehicle with status `INACTIVE` cannot be booked
- soft-deleted vehicle cannot be booked

### Booking Rules

- booking dates must be valid
- `startDate` must be earlier than `endDate`
- overlapping bookings for the same vehicle must be rejected
- total cost must be calculated from booking duration and daily rental rate
- cancelled bookings cannot be returned
- completed bookings cannot be cancelled
- only booking owner or admin can access a booking detail endpoint
- customer can only see their own bookings

### User Rules

- email must be unique
- inactive users cannot log in
- inactive users cannot create bookings
- only admins can manage users or vehicles

---

## Required Features

This project must include all of the following.

### 1. Authentication

Implement JWT-based authentication.

#### Requirements

- register endpoint
- login endpoint
- password hashing with bcrypt
- JWT generation
- auth middleware
- authenticated user attached to `req.user`

#### Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

---

### 2. Authorization

Implement role-based access control using middleware.

#### Examples

- `POST /api/v1/vehicles` -> admin only
- `GET /api/v1/users` -> admin only
- `POST /api/v1/bookings` -> customer only
- `GET /api/v1/bookings` -> admin only
- `GET /api/v1/bookings/me` -> customer only

Authorization must be explicit and consistent.

---

### 3. Protected Routes

Any non-public endpoint must require authentication.

Public routes should be minimal:

- register
- login
- list vehicles
- get vehicle details
- health check

Everything else should be protected.

---

### 4. Input Validation

Every request that receives input must be validated before it reaches controller business flow.

Use **Zod**.

#### Validation Required For

- register payload
- login payload
- create vehicle payload
- update vehicle payload
- create booking payload
- cancel booking input if needed
- update user role/status payload
- pagination query params
- filter query params
- search query params
- sort query params

Validation middleware must reject malformed input with a structured error response.

---

### 5. CRUD Functionality

This project must support CRUD-style operations where appropriate.

#### Users
- admin can list users
- admin can get user details
- admin can update user role
- admin can update user status

#### Vehicles
- admin can create vehicle
- admin can update vehicle
- public can list vehicles
- public can get vehicle details
- admin can soft delete vehicle

#### Bookings
- customer can create booking
- customer can view own bookings
- admin can view all bookings
- both admin and owner can access booking detail with rule checks
- customer can cancel own booking if allowed
- admin can process return

---

### 6. Pagination, Filtering, Search, Sorting

List endpoints must be realistic. That means they cannot just dump all rows.

#### Vehicle List Must Support

- `page`
- `limit`
- `search`
- `type`
- `status`
- `fuelType`
- `transmission`
- `minPrice`
- `maxPrice`
- `sortBy`
- `sortOrder`

#### Example

```http
GET /api/v1/vehicles?search=toyota&type=suv&page=1&limit=10&sortBy=dailyRate&sortOrder=asc

```

### Booking List Must Support

1.  page
2. limit
3. status
4. vehicleId
5. userId (admin use)
6. startDate
7. endDate
8. sortBy
9. sortOrder

### User List Must Support

1. page
2. limit
3. search
4. role
5. status

This is mandatory. List endpoint design is part of backend competence.

# 7. Rate Limiting

Implement rate limiting to protect the API.

Requirements

  - a general global rate limiter
  - a stricter rate limiter for login endpoint

Purpose

  - reduce brute force login attempts
  - demonstrate middleware ordering discipline

understand basic abuse prevention

# 8. Global Error Handling

Implement centralized error handling.

Required Components

1. custom AppError class
2. global error middleware
3. not-found middleware
4. validation error formatting
5. fallback 500 handler
6. consistent error response shape

Example Error Response

```json
{
  "success": false,
  "message": "Vehicle not available for selected dates",
  "errorCode": "BOOKING_CONFLICT",
  "statusCode": 409,
  "details": null
}
```
Do not leak raw internal errors to API clients.


## 9. Custom Error Types

You may implement specific error classes or use a central `AppError` class with error codes.

### Example Error Codes

- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `BOOKING_CONFLICT`
- `UNIQUE_CONSTRAINT_ERROR`

The important point is **not the number of classes**, but ensuring **predictable domain error behavior** across the API.

---

## 10. Logging

Use **Pino** for structured logging.

### Log These Things

- request method
- request path
- status code
- response time
- authenticated user id (if available)
- major errors
- stack trace in development

### Logging Goals

- understand request tracing
- understand failure visibility
- make the application feel production-ready

---

## 11. Transactions

This project must include **real transaction use cases**.

Do **not claim transaction knowledge** unless you actually protect multi-step writes.

---

### Transaction Case 1: Booking Creation

Atomic steps:

1. verify vehicle exists
2. verify vehicle is rentable
3. verify requested date range does not conflict
4. calculate total cost
5. create booking
6. update vehicle status (if your design requires it)
7. create audit log

All steps must **succeed or fail together**.

---

### Transaction Case 2: Booking Cancellation

Atomic steps:

1. verify booking exists
2. verify booking is cancellable
3. update booking status
4. restore vehicle state if necessary
5. create audit log

---

### Transaction Case 3: Vehicle Return

Atomic steps:

1. verify booking exists
2. verify booking status allows return
3. mark booking completed
4. mark vehicle available
5. create audit log

All transaction flows must be implemented in the **service layer** using **Prisma transactions**.

---

## 12. Audit Logs

Audit logs are required.

### Minimum Events To Log

- vehicle created
- vehicle updated
- vehicle soft deleted
- booking created
- booking cancelled
- booking returned
- user role changed
- user deactivated

This is not decorative.  
It teaches **side-effect discipline and traceability**.

---

## 13. Background Job

After the core API works, implement **one background job**.

### Overdue Booking Checker

Use **node-cron** to run a scheduled task that:

- finds bookings where `endDate` has passed and status is still active
- marks those bookings as `OVERDUE`
- optionally creates an audit log

This teaches **scheduled processing** without introducing Redis or job queues too early.

---

# API Surface

Use **API versioning from the beginning**.

All endpoints are prefixed with:
/api/v1


---

## Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

---

## Users

- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `PATCH /api/v1/users/:id/status`
- `PATCH /api/v1/users/:id/role`

---

## Vehicles

- `POST /api/v1/vehicles`
- `GET /api/v1/vehicles`
- `GET /api/v1/vehicles/:id`
- `PATCH /api/v1/vehicles/:id`
- `DELETE /api/v1/vehicles/:id`


---

## Bookings

- `POST /api/v1/bookings`
- `GET /api/v1/bookings/me`
- `GET /api/v1/bookings`
- `GET /api/v1/bookings/:id`
- `PATCH /api/v1/bookings/:id/cancel`
- `PATCH /api/v1/bookings/:id/return`

---

## Audit Logs

`GET /api/v1/audit-logs`

---

## Health Check

`GET /health`


## Access Control Matrix

This table defines which roles are allowed to access each API endpoint.

✔ = Allowed  
❌ = Not allowed

---

### Authentication

| Endpoint | Customer | Admin | Public | Notes |
|----------|----------|-------|--------|------|
| POST /api/v1/auth/register | ❌ | ❌ | ✔ | Register new user |
| POST /api/v1/auth/login | ❌ | ❌ | ✔ | Login and receive JWT |
| GET /api/v1/auth/me | ✔ | ✔ | ❌ | Requires valid JWT |

---

### Vehicles

| Endpoint | Customer | Admin | Public | Notes |
|----------|----------|-------|--------|------|
| GET /api/v1/vehicles | ❌ | ❌ | ✔ | Public vehicle listing |
| GET /api/v1/vehicles/:id | ❌ | ❌ | ✔ | Public vehicle details |
| POST /api/v1/vehicles | ❌ | ✔ | ❌ | Admin creates vehicle |
| PATCH /api/v1/vehicles/:id | ❌ | ✔ | ❌ | Admin updates vehicle |
| DELETE /api/v1/vehicles/:id | ❌ | ✔ | ❌ | Admin soft delete |

---

### Bookings

| Endpoint | Customer | Admin | Public | Notes |
|----------|----------|-------|--------|------|
| POST /api/v1/bookings | ✔ | ❌ | ❌ | Create booking |
| GET /api/v1/bookings/me | ✔ | ❌ | ❌ | Customer's own bookings |
| GET /api/v1/bookings | ❌ | ✔ | ❌ | Admin views all bookings |
| GET /api/v1/bookings/:id | ✔ | ✔ | ❌ | Customer only if owner |
| PATCH /api/v1/bookings/:id/cancel | ✔ | ✔ | ❌ | Customer only if owner |
| PATCH /api/v1/bookings/:id/return | ❌ | ✔ | ❌ | Admin processes return |

---

### Users

| Endpoint | Customer | Admin | Public | Notes |
|----------|----------|-------|--------|------|
| GET /api/v1/users | ❌ | ✔ | ❌ | Admin list users |
| GET /api/v1/users/:id | ❌ | ✔ | ❌ | Admin user details |
| PATCH /api/v1/users/:id/status | ❌ | ✔ | ❌ | Activate / deactivate user |
| PATCH /api/v1/users/:id/role | ❌ | ✔ | ❌ | Change role |

---

### Audit Logs

| Endpoint | Customer | Admin | Public | Notes |
|----------|----------|-------|--------|------|
| GET /api/v1/audit-logs | ❌ | ✔ | ❌ | System audit history |

---

### Health Check

| Endpoint | Customer | Admin | Public | Notes |
|----------|----------|-------|--------|------|
| GET /health | ❌ | ❌ | ✔ | Service health endpoint |

Response Contract

Use one consistent response structure.

Success Response
```json
{
  "success": true,
  "message": "Vehicles fetched successfully",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```
Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errorCode": "VALIDATION_ERROR",
  "statusCode": 400,
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```
Do not return random shapes across endpoints.

## Architecture Rules

Use a **modular monolith** structure.

### Layering
Route → Controller → Service → Repository

Layering
Route -> Controller -> Service -> Repository

---

### Route Responsibilities

- define endpoint path and HTTP method  
- compose middleware  
- call controller  

---

### Controller Responsibilities

- extract validated request input  
- call service  
- send formatted response  
- stay thin  
- **no business logic**

---

### Service Responsibilities

- implement business rules  
- orchestrate workflows  
- perform conflict checks  
- define transaction boundaries  
- make domain-level decisions  

---

### Repository Responsibilities

- Prisma queries only  
- database interaction only  
- no request/response logic  
- no business rules  

---

If the **controller or repository starts owning business policy**, the architecture is already degrading.

# Suggested Folder Structure
<pre>
src
│
├── app.ts
├── server.ts
│
├── config
│ ├── env.ts
│ └── logger.ts
│
├── common
│ ├── constants
│ ├── types
│ └── utils
│
├── errors
│ ├── AppError.ts
│ ├── handleZodError.ts
│ └── handlePrismaError.ts
│
├── middleware
│ ├── authenticate.ts
│ ├── authorize.ts
│ ├── validateRequest.ts
│ ├── notFound.ts
│ ├── globalErrorHandler.ts
│ ├── rateLimiter.ts
│ └── requestLogger.ts
│
├── modules
│ │
│ ├── auth
│ │ ├── auth.routes.ts
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ └── auth.validation.ts
│ │
│ ├── users
│ │ ├── user.routes.ts
│ │ ├── user.controller.ts
│ │ ├── user.service.ts
│ │ ├── user.repository.ts
│ │ └── user.validation.ts
│ │
│ ├── vehicles
│ │ ├── vehicle.routes.ts
│ │ ├── vehicle.controller.ts
│ │ ├── vehicle.service.ts
│ │ ├── vehicle.repository.ts
│ │ └── vehicle.validation.ts
│ │
│ ├── bookings
│ │ ├── booking.routes.ts
│ │ ├── booking.controller.ts
│ │ ├── booking.service.ts
│ │ ├── booking.repository.ts
│ │ └── booking.validation.ts
│ │
│ └── auditLogs
│ ├── auditLog.service.ts
│ └── auditLog.repository.ts
│
└── prisma
├── schema.prisma
└── migrations
</pre>
## Implementation Order

Follow this sequence. **Do not jump around randomly.**

---

### Phase 1 — Project Setup

Build the backend foundation:

- initialize project
- configure TypeScript
- set up Express app
- set up environment variables
- set up logger
- set up base middleware
- set up global error handling
- set up health endpoint

---

### Phase 2 — Authentication and Authorization

Build:

- register
- login
- JWT generation
- authentication middleware
- authorization middleware
- current user endpoint

Do **not move on** until the authentication flow is clean.

---

### Phase 3 — Vehicle Module

Build:

- create vehicle
- update vehicle
- get vehicle details
- list vehicles
- filtering
- search
- sorting
- pagination
- soft delete

Do **not treat the vehicle module as simple CRUD**. Query handling matters here.

---

### Phase 4 — Booking Module

Build:

- create booking
- get my bookings
- get all bookings for admin
- booking detail access control
- cancel booking
- process return
- transaction logic
- overlap detection
- total cost calculation

This is the **core backend learning phase**.

---

### Phase 5 — User Management

Build:

- list users
- get user details
- update user role
- update user status

Keep **admin-only protections strict**.

---

### Phase 6 — Audit Logging

Add audit log creation to important service flows.

Do **not postpone audit logs forever**. This is part of the system design.

---

### Phase 7 — Background Job

Implement the **overdue booking scheduler**.

---

### Phase 8 — Hardening and Cleanup

Improve:

- response consistency
- validation error quality
- edge-case handling
- logging clarity
- status transition safety
- module cleanup

---

## Definition of Done

This project is complete only when **all of the following are true**:

- authentication works correctly
- RBAC rules are enforced consistently
- validation happens before controller logic
- list endpoints support real query features
- error handling is centralized
- transaction cases are implemented properly
- audit logs are created for key actions
- overdue booking cron job works
- folder structure is modular and clean
- controllers remain thin
- Prisma is used without abandoning SQL reasoning

If these conditions are not satisfied, **the project is not done**.

---

## Common Failure Modes to Avoid

Do **not**:

- put business logic inside controllers
- apply authorization checks inconsistently
- skip validation on query parameters
- use Prisma blindly without understanding relational constraints
- claim transaction knowledge without protecting multi-step writes
- return inconsistent response formats
- add unnecessary features before core flows are stable
- turn this into a frontend project halfway through

---

## Final Expected Outcome

After completing this project properly, you should have:

- a serious backend learning project
- stronger Express architecture understanding
- working knowledge of authentication and RBAC
- practical experience with validation and error handling
- experience designing list endpoints
- experience implementing transactional business workflows
- better readiness for a real portfolio backend

This project exists to ensure your **next backend project is cleaner, faster, and far less dependent on AI guesswork**.