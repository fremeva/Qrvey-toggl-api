# Qrvey Toggl API

API that allows time tracking (similar to Toggl.com). Assuming you are building the backend for a time tracking application, Design and build an API that can serve all use-cases mentioned below.

## Features

- There would be multiple users using the application. Each user would have a way to see all their tasks sorted by most recent to the oldest
- User must be able to start a task even if it has no name. Also users should be able to pause or restart it.
- An user must also be able to enter a task manually by providing the name and duration of the task in hours, minutes and seconds.
- The application should let users create projects and associate time records with tasks, and should allow them to see their times per project.
- Finally, each task must have a way to "continue" to rehabilitate that task (start to record time of a task taking the name of the one to be continued).
- There should be a way to see the list of all Projects for all users with the total time spent (per project as well as per user).

## Requirements

- Nodejs v 16.13.1
- npm v8.1.2
- Mongo (>4)

## Run local Enviroment

You must define enviroments variables, executing following command and modified each variables:

    cp .env-example .env

If you installed nvm, you can executing this command to active the node project version

    nvm use

Install all dependencies dependency:

    npm i

start developer mode:
npm run dev

start production mode:
npm start

# API Documentation and Scripts

You can check api documentation generated with Postman here: [Documentation API](https://documenter.getpostman.com/view/500426/UVR4PVzx 'API Documentation').

Also, you can import json file into postman desktop application to test each endpoint avaliable

### Helps

Contact with: fredymv03@gmail.com
