document.addEventListener('DOMContentLoaded', function() { // once the page loaded, then the function should execute

    // const albumList = document.querySelector('#card-container card');  //shows where the list will be (same as getElementById)
    const cardContainer = document.querySelector('.card-container');

    // const currentAlbum = document.getElementById('currentAlbum'); // represents the current album that is being played
    const form = document.getElementById('albumForm');



function fetchAlbums() {        // ment to display the albums array to the website
    fetch('/albums')
    .then(response => response.json())      
    .then(theAlbum => {     // theAlbum is the whole alubms Array
        cardContainer.innerHTML = '';
        let index = 0;
        theAlbum.map((data)=>{      // takes the albums array by taking each album adn mapping to the website
            cardContainer.innerHTML +=`
            <div class="card" onclick="updateNowPlaying('${index}')">   
            <img src= ${data.coverart} alt=${data.album} >
            <div class="card-content">
                <h3>${data.album}</h3>
                <p>${data.name}</p>
            </div>
        </div>
            `
        index++; // this should give each card an index so it can be used in the updateNowPlaying
        })  
})
.catch(error => console.error('Error fetching albums:', error));
}

function updateNowPlaying(index) {  // ISSUE with getting the specific datas info from fetchAlbum
    fetch('/albums')
        .then(response => response.json()) 
        .then(albums => { //this gets the albums array

            const album = albums[index];    // get a specific album from array

            // gets the specific album info and use it below to display currently playing
            let name = album.name;
            let albumName = album.album;
            let coverart = album.coverart;

            // show album
            let displayAlbum = document.getElementById('show-playing-album'); 
            displayAlbum.innerHTML = '';
            const showAlbum = document.createElement('p');
            showAlbum.textContent = `${albumName}`;
            displayAlbum.appendChild( showAlbum);

            //show name
            let displayName = document.getElementById('show-playing-artist'); 
            displayName.innerHTML = '';
            const showName = document.createElement('p');
            showName.textContent = `${name}`;
            displayName.appendChild( showName);

            //show image
            let img = document.getElementById('currently-playing-album-CA'); 
            img.innerHTML = '';
            // Create image element
            let dynamicImage = document.createElement('img');
            // Initialize the image source
            dynamicImage.src  = coverart;
            // Add image to DOM
            img.appendChild(dynamicImage);
        })
        .catch(error => console.error('Error updating now playing:', error));
}


form.addEventListener('add_album_btn', function(event) { 
    event.preventDefault();

    //creates a new object to be sent to album array object
    const newAlbum = {
        artist: document.getElementById('add_artist_name').value,
        title: document.getElementById('add_album_name').value,
        coverArtUrl: document.getElementById('add_coverart_url').value
    }

    fetch('/albums', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAlbum) // posts the new object to be sent to the JSON file
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add album');
        }
        return response.json();
    })
    .then(() => {
        fetchAlbums();
        form.reset();
    })
    .catch(error => console.error('Error posting new album:', error));
    

    });
    
    fetchAlbums();
})

