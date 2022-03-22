# Overview

This is a bare bones version of our interview repo, so you can test that you can successfully download and run the 
backend and frontend on your machine. You should be able to start the backend, then start the frontend, and have the
frontend display the text "Hello Interviewee", which only happens after talking to the backend.

Note: This is very much simplified from our typical development environment. We didn't feel it necessary to complicate
it with Typescript, yarn, our open source libraries, etc that make development smoother.

## Backend

The backend has 2 main components: server.js, which handles routing requests and acts as a controller, and db.js, which
mimics a database (normally this would be mongoose talking to MongoDB, but we'll keep it simpler.)
There's also a server.test.js which has some simple tests for the endpoints.

To install dependencies:

    npm install

To start the backend (will run at http://localhost:4000):

    npm run start

To run tests:

    npm run test

To run a specific test:

    npm run test -t "creates schedule"

To run the lint test:

    npm run lint

To run the automatic fixes for the linter:

    npm run lintfix


## Web

We use a class based App component for simplicity. Some engineers aren't familiar with hooks yet, and a decent amount of
our codebase still uses class components because some components predate hooks.

To install dependencies:

    npm install

To start the frontend (will open in the browser at http://localhost:3000):

    npm run start

To run the lint test:

    npm run lint

To run the automatic fixes for the linter:

    npm run lintfix
