# Reserve My Table (rmt.app)

    rmt.app is a SPA built with React + Vite + TypeScript

## Packages
Main packages include: react 19+, react-router 7+, react-hook-form 7+, @tanstack/react-query, TypeScript, radix-ui / shadcn, TailwindCSS.

## Goal
rmt.app is the frontend for rmt.api, a RESTful API server for table reservations.

## Services

As a client application, it interacts with several services exposed by the server:

- registration, login, logout, refresh token, forgot password and reset, change password an more
- CRUD on entities (facilities, tables and reservations)

## Users and roles

Users are basically operators bound to a specific facility. They can have the role of "admin" or "user":

- admin: can CRUD facilities
- user: can CRUD tables and reservations

The admininistrator is unique and predefined by server.

> NOTE: if the organization domain is @my-restaurant.it, server will create a user _admin@@my-restaurant.it_,with password _admin_
