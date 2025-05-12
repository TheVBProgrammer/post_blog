Overview
You are tasked with creating a simple web application that allows users to view, create, update, and delete posts. This application will consist of a backend built with Node.js and a frontend developed with Vue.js. 

For this test, you will use JSONPlaceholder (https://jsonplaceholder.typicode.com/) as your backend service to mock authentication and perform CRUD operations on posts.


Objectives
Backend (Node.js)
Implement a simple server using Node.js that proxies requests to JSONPlaceholder.
Include routes that handle authentication and CRUD operations for posts.
Use MongoDB /MySQL to store some form of session or user-specific data if needed for the bonus challenges.
Please use AdonisJS if you can. https://adonisjs.com/
Frontend (Vue.js)
Create a Vue.js application that communicates with your Node.js backend.
Implement a simple login page that uses JSONPlaceholder for authentication. (Hint: You can mock the authentication by using a static user object or JSONPlaceholder’s users endpoint.)
After login in, users should be able to see a list of posts, create new posts, edit existing posts, and delete posts.
Authentication
Implement simple authentication by using JSONPlaceholder to validate a user. You can simulate the authentication since JSONPlaceholder doesn’t support real authentication mechanisms.
Ensure that the user is redirected to the login page if they are not authenticated.
CRUD Operations
Implement the functionality to create, read, update, and delete posts using the JSONPlaceholder API from your Vue.js frontend through your Node.js backend.
Requirements
Your Node.js backend must proxy the requests and handle simple authentication checks.
Your Vue.js application should be neatly organized and should include at least:
A login component.
A list component to display posts.
A form component to create and edit posts.
Use Axios or Fetch API for HTTP requests from Vue.js to your Node.js backend.
Apply basic styling to make the UI presentable. Feel free to use a CSS framework like Tailwind CSS or, preferably, Bootstrap.
Submission Guidelines
Your code should be submitted as a link to a GitHub repository.
Evaluation Criteria
Functionality: The application meets the described functionalities.
Code Quality: Code is well-organized, commented, and follows best practices.
Error Handling: The application gracefully handles and displays errors.
UI/UX: The application is user-friendly and visually appealing.
