let albumList = []

//make a function that when u call it loads the JSON file

class AddAlbum{
    constructor(name, album, coverart){
        this.name=name;
        this.album=album;
        this.coverart=coverart;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const cardContainer = document.querySelector('.card-container');
    const postMethod = ()=> {
        cardContainer.innerHTML = '';
        albumList.map((data)=>{
            
            cardContainer.innerHTML +=`
            <div class="card">
            <img src= ${data.coverart} alt=${data.album}>
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
