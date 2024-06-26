 //make a function that when u call it loads the JSON file

 let albumList = [
    { name: "SZA",  album:"S.O.S",  coverart:"https://upload.wikimedia.org/wikipedia/en/2/2c/SZA_-_S.O.S.png"},
    
    { name: "Lana Del Rey",  album:"Did you know that there’s a tunnel under Ocean Blvd",  coverart:"https://upload.wikimedia.org/wikipedia/en/4/4f/Lana_Del_Rey_-_Did_You_Know_That_There%27s_a_Tunnel_Under_Ocean_Blvd.png"},
    
    { name: "Olivia Rodrigo",  album:"GUTS",  coverart:"https://upload.wikimedia.org/wikipedia/en/0/03/Olivia_Rodrigo_-_Guts.png"},
    
    { name: "Yaeji",  album:"With a Hammer",  coverart:"https://upload.wikimedia.org/wikipedia/en/0/0e/Yaeji_-_With_a_Hammer.jpg"},
    
    { name: "boygenius",  album:"the record",  coverart:"https://upload.wikimedia.org/wikipedia/en/2/21/Boygenius_-_the_record.jpg"},
    
    { name: "Kara Jackson",  album:"Why Does the Earth Give Us People to Love?",  coverart:"https://upload.wikimedia.org/wikipedia/en/5/5b/Why_Does_the_Earth_Give_Us_People_to_Love.jpg"}
    ]
class AddAlbum{
    constructor(name, album, coverart){
        this.name=name;
        this.album=album;
        this.coverart=coverart;
    }
}

// changes based on user clicking on card
let playingAlbum = [];

function showPlayingAlbum(name, album, coverart){
    // console.log(coverart);

    // show album
    let displayAlbum = document.getElementById('show-playing-album'); 
    displayAlbum.innerHTML = '';
    const showAlbum = document.createElement('p');
    showAlbum.textContent = `${album}`;
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
}


document.addEventListener('DOMContentLoaded', () => {

    const cardContainer = document.querySelector('.card-container');
    const postMethod = ()=> {
        cardContainer.innerHTML = '';
        albumList.map((data)=>{
            
            cardContainer.innerHTML +=`
            <div class="card" onclick="showPlayingAlbum('${data.name}', '${data.album}', '${data.coverart}')">
            <img src= ${data.coverart} alt=${data.album} >
            <div class="card-content">
                <h3>${data.album}</h3>
                <p>${data.name}</p>
            </div>
        </div>
            `
        })
    }
    postMethod();



    document.getElementById('add_album_btn').onclick = () => {
        const artistName = document.getElementById('add_artist_name').value;
        const albumName = document.getElementById('add_album_name').value;
        const coverart = document.getElementById('add_coverart_url').value;

        const newAlbum = new AddAlbum(artistName, albumName, coverart);
        albumList.push(newAlbum);

        postMethod();
    }
   
});
