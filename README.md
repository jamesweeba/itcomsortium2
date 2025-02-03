# itcomsortium2

Task Management API

A RESTful API that allows users to manage their tasks. Users can register, log in, and create, update, delete, or view their tasks.

Table of Contents

    Overview
    Features
    Installation
    Usage
    API END POINTS DOCUMENTATION
    API BASEURL
    
    
    Overview

The Task Management API provides a simple and secure way to manage tasks. It supports user authentication and task management functionalities such as creating, retrieving, updating, and deleting tasks. This API is ideal for building productivity tools and integrating task management into other applications.
Features

    User Management:
        User registration and login
        Secure authentication (e.g., JWT tokens)

    Task Management:
        Create new tasks
        Retrieve a list of tasks
        Update existing tasks
        Delete tasks

    RESTful Endpoints:
        Clearly defined and documented endpoints for easy integration

    Validation and Error Handling:
        Input validation and proper error responses

Installation

    Clone the Repository:
    
    git clone https://github.com/jamesweeba/itcomsortium2.git
    cd task-management-api
    
    Install Dependencies: Depending on your package manager (e.g., npm for Node.js projects):
     npm install
     
     Run the Application:
     
     npm start
     
     API END POINTS DOCUMENTATION
     https://itcomsortium2.onrender.com/api-docs/
     
     API BASEURL
     https://itcomsortium2.onrender.com

   NB:To creat create status and priority data you should have an admin role
      A user with admin role  has been created to aid in this.
      username:admin@text.com
      password:123456

      As part of the response is a token
       which is passed in the header as x-access-token 
      


