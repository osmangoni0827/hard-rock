const SearchResult=()=>{
    const SearchValue=GetId('SearchField').value;
    const url=`https://api.lyrics.ovh/suggest/${SearchValue}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>DisplaySong(data.data))
    .catch(error=>console.log(error));
}
GetId=id=>{
    return document.getElementById(id);
}

const DisplaySong=(songs)=>{
    const SongMainDiv=GetId('DisplaySong');
    SongMainDiv.innerHTML=''
    songs.forEach(song => {
        
        const SongDiv=document.createElement('div');
        SongDiv.className=`single-result row align-items-center my-3 p-3`;
        SongDiv.innerHTML=` <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
        <source src="${song.preview}"type="audio/ogg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="GetLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>`
    SongMainDiv.appendChild(SongDiv);
    });
}

const GetLyrics= async(artist,title)=>{

    try {
        const  url= await `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const res=await fetch(url);
        const data=await res.json();
        DisplayLyrics(data.lyrics);
    } catch (error) {
        DisplayLyrics(error);
    }
}

const DisplayLyrics=(lyrics)=>
{
    document.getElementById('Display').innerText=lyrics;
    console.log(lyrics)
}