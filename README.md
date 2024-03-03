To run the blog app locally,

1. Download all the project files in your device and cd into the project folder.
2. Now, run the ```npm i``` command to install all the node modules.
3. After this, create a new database called ```blog``` in Postgre SQL and then execute the queries given in queries.sql file.
4. Update the SQL password in your index.js and server.js files.
5. Run the ```npx nodemon index.js``` to ensure the working of API and then open a new terminal to simultaneously run ```npx nodemon server.js``` to ensure the working of the blog app.
6. Now visit ```localhost:3000``` and register with your credentials to create, read, update and delete blog posts.
