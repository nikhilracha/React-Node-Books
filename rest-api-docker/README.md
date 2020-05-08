## This is a Node-Express Server which has routes to fetch books data from the database.

 It fetches data from a database, but here in this project we are mimicking the database with a external JSON file.

### Routes that are accessible to this server 

1. This route allows you to retrieve complete list of books from database.
```
http://localhost:9000/books
```
2. This route allows you to retrieve list of books associated with that book name.
```
http://localhost:9000/books/name/:name
```
3. This route allows you to retrieve list of books associated with that genre.
```
http://localhost:9000/books/genre/:genre
```
4. This route allows you to retrieve list of books associated with that book author.
```
http://localhost:9000/books/author/:author
```
5. This route allows you to retrieve list of books associated with that book author and genre.
```
http://localhost:9000/books/author/:author/genre/:genre
```

## Make sure you have node and docker installed on your machine.

### In the project directory : 

1) First install all the dependencies by running command within this directory.
 ```bash
 npm install
 ```

2) To run with docker use : 
```bash
docker run -it -p 9000:5000 -v $(pwd):/app node-rest-api
```

Runs the app in the port 9000.<br />
Server base link :[http://localhost:9000](http://localhost:9000) 

The server will restart if you make changes because nodemon handles the changes.<br />
You will also see any lint errors in the console.