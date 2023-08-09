let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven - My Heart [NCS]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "In Love With A Ghost - AXEL", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Thought It Was U - JJL", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Getting Down - JOXION", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Fall Too Deep - Andrew A", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "On Replay - NIVIRO", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

let audioElement = new Audio('songs/1.mp3');

// selectors
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let progressBar = document.getElementById('progress-bar');
let sPlay = document.querySelectorAll('.play-icon');
let songItems = Array.from(document.querySelectorAll('.song'));
let songPlay = Array.from(document.querySelectorAll(".play-icon"));
let masterSongName = document.getElementById("masterSongName");

// master play event
masterPlay.addEventListener('click', () => {
    if (masterPlay.classList.contains('fa-play')) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// update progess bar
audioElement.addEventListener('timeupdate', (e) => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

// song list
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
});

// song list play
const makeAllPlay = () => {
    songPlay.forEach((element) => {
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
    })
}

songPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        if(e.target.classList.contains("fa-circle-play")){
        songIndex = parseInt(e.target.id);
        makeAllPlay();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex+1}.mp3`
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        e.target.classList.add("fa-circle-play");
        e.target.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
    })
})

// next previous
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex= 0;
    }else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex= 0;
    }else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})