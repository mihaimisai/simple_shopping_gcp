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
- **Deployment**: Google Cloud, Firebase Hosting, Cloud Run
- **Infrastructure**: Terraform (for infrastructure as code)
- **Testing**: Pytest (for testing Backend)

## Requirements

For starters I created 2 projects in Google Cloud Console, Prod and Dev. Then created 2 service accounts individually.
The purpose of this is to have control and be able to test new functionalities on Dev before these are uploaded to Prod which is also the final version.

