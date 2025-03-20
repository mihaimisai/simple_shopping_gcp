# Simple Shopping App

This is a full-stack shopping list application built with **React** for the frontend, **FastAPI** for the backend, and **Firestore** as the NoSQL database, all deployed using **Google Cloud** and **Terraform**.

## Features

- **CRUD Operations** for managing shopping list items (Add, Update, Delete, List).
- **Google Authentication** via Firebase for secure login.
- **Real-time data sync** with Firestore.
- **Deployed on Google Cloud** using Cloud Run for the backend and Firebase Hosting for the frontend.
  
## Tech Stack

- **Frontend**: React
- **Backend**: FastAPI
- **Database**: Firestore (Firebase NoSQL Database)
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Deployment**: Google Cloud, Firebase Hosting, Cloud Run, deployed via GitHub Actions
- **Testing**: Pytest (for testing Backend)

## Requirements

Google account, Firebase and Google Cloud
Modules required for Backend and tests are saved in backend/requirements.txt

## Firebase Hosting

With the project already created, use the following commands to configure Hosting and automatically create a GitHub workflow to deploy

firebase init hosting

Followed the pop up questions, selected frontend/public as public for website
Created workflow to Github

This workflow installs dependencies, build the react app and then deploys to Firebase.
It also creates a service account automatically in Google Cloud.

## FastApi checks

The first part of the workflow is configuring a virtual env where requirements are installed, the python code is formatted and tested for security and format, and at last it's functionality is being tested with Pytest

## FastApi with Cloud Run

The next part of the workflow is taking the previous tested FastApi app and deployed to Cloud Run
For this few roles need to be added:

### Cloud run service account:
-Cloud Run developer
-Cloud Run Source Developer
-Service Usage Consumer

### Compute service account:
After the first deploy a new service account will be created that looks like
[PROJECT_NUMBER]-compute@developer.gserviceaccount.com

-Editor (by default)
-Cloud Run Builder
-Add Cloud Run service account as principal with Service Account User role









