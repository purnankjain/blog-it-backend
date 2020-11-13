Blog-It-Backend
===============

This is the backend of Blog It.

This is built on Nodejs. The backend used is MySQL.

Pre-requisites
--------------

- NodeJs
- npm
- MySql Server


Steps To Set up the Project
---------------------------

- Edit the .env file with correct config values for the db connection
- Go to the root of the project in any terminal and run `npm install`. This will install all the dependencies of the project
- When install is complete, run `npm run setup:db`. This will run all the db scripts for the project


Steps to start the project
--------------------------

- Run the command `npm start`. The project is defaulted to start on port `8080`.
- To check whether the project is running or not, you can go to the browser and hit the url `localhost:8080/alive`. This should return you `I'm Alive`, if the project is running correctly


APIS
----

- `/posts` - _GET_ - Used to get all Posts
- `/posts/{:postId}` - _GET_ - Used to get specific Post
- `/posts` - _POST_ - Used to create a Post
  **Requeset**
  - imageId
  - title
  - content
- `/images` - _POST_ - Used to upload an image
  **Request**
  - image
- `/images/{:imageId}` - _GET_ - Used to get a specific image
