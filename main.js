// ==================Global scop variable===============

const apiURL = "https://api.lyrics.ovh";
const search = document.getElementById('search-song');
const songsList = document.getElementById('song-list');

//"https://api.lyrics.ovh/suggest/summer"

//=============== function  of  Search-btn search-Box  result=song-list-show  =========


search.addEventListener('click', function() {
    const inputSong = document.getElementById('input-song').value;
    //console.log(inputSong)

    let output = ''
    fetch(`${apiURL}/suggest/${inputSong}`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < 10; i++) {
                const songs = data.data[i];
                //console.log(songs)
                const titleName = songs.title;
                const singer = songs.artist.name;

                //console.log(albumName)

                output +=
                    `<div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                      <h3 class="lyrics-name">${titleName}  <p class="author lead">Album by <span>${singer}</span></p></h3>
                      
                    </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success"  onclick="getLyrics('${singer}','${titleName}')" >Get Lyrics</button>
                </div>
                
                </div>`
                songsList.innerHTML = output;

            }
        })
})

//================== END====================


//  ===================function of lyrics-list-show==============

function getLyrics(artist, title) {
    // console.log(artist, title)
    // let result = '';
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(function showLyrics(data) {
            console.log(data)
                //const currantSong = data.htmlTemplate;
            let htmlTemplate = '';
            let displayLyrics = document.getElementById('lyrics-show');
            htmlTemplate += ` <h2 class="text-success mb-4">  ${title} </h2>
              <h4 class="text-success mb-4">  ${artist}</h4>
          <pre  class="lyric text-white"> '${data.lyrics}' </pre> `;
            displayLyrics.innerHTML = htmlTemplate;




        })
}
//====================END==============================