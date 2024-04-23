const cors = require('cors'); // helps stops any conflicts when having a server
const express = require('express'); // gets the dependencies to the server
const bodyParser = require('body-parser');
const fs = require('fs'); // imports the file system module to interact with the file system 
const path = require('path');// allows us to use the path moduel to help us work with files in our repo
const app = express();
const PORT = process.env.PORT || 3000; // either we use port 3000 OR we use a the enviornments port in that enviornment
app.use(express.static('public')); //displays the static files so that the user can see them

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // basically telling express we want to serve up everything in our public files

let albums = []; //we will be getting the JSON files info an putting it into here

//gets the JSON files data 
function loadAlbums() {
    //locates the JSON file then gets it
    fs.readFile(path.join(__dirname, 'data', 'albums.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading albums.json:', err);
            return;
        }
        //whatever comes out of the JSON file will be put into the albums array
        albums = JSON.parse(data);
    });
}
//  ??  app.get why app ???
// allow us to work with the album array from the JSON file // below I think we will use it to add new info to this array
app.get('/albums', (req, res) => {
    console.log("Hello")
    res.json(albums);
});

//so first user just put input (aka the new album from website) and this is in the req body
// post makes it possbile to take this data in req.body and pushes it into the album array which will be put into the JSON file
app.post('/albums', (req, res) => {
    const newAlbum = req.body;
    albums.push(newAlbum);
    fs.writeFile(path.join(__dirname, 'data', 'albums.json'), JSON.stringify(albums, null, 2), 'utf8', (err) => {
        if (err) {
            res.status(500).json({ error: 'Error saving the album' });
            return;
        }
        res.status(201).json({ message: 'Album added' });
    });
});
//once port is listening on the port it will run loadAlbums() which this gets the JSON 
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
    loadAlbums();
});