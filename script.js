const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");
const prevBt = document.getElementById("prev");
const playBt = document.getElementById("play");
const nextBt = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

//music
const songs = [{
        name: "jacinto-1",
        displayName: "electronic chill machine",
        artist: "Jacinto design",
    },

    {
        name: "jacinto-2",
        displayName: "sevetn nation army",
        artist: "Jacinto design 2",
    },

    {
        name: "jacinto-3",
        displayName: "Jassic dufo songs",
        artist: "Husien Adel",
    },

    {
        name: "metric-1",
        displayName: "metric-1",
        artist: "Husien Adel",
    },
];

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBt.classList.replace("fa-play", "fa-pause");
    playBt.setAttribute("title", "pause");
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBt.classList.replace("fa-pause", "fa-play");
    playBt.setAttribute("title", "play");
    music.pause();
}

// play or pause
playBt.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

//update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong() {
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
    songIndex++;
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgessBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);

        //update progress bar
        const progressPerecnt = (currentTime / duration) * 100;
        progress.style.width = `${progressPerecnt}%`;

        const durationMinute = Math.floor(duration / 60);

        let durationsec = Math.floor(duration % 60);
        if (durationsec < 10) {
            durationsec = `0${durationsec}`;
        }

        if (durationsec) {
            durationEl.textContent = `${durationMinute}:${durationsec}`;
        }

        const currentMinute = Math.floor(currentTime / 60);

        let currentsec = Math.floor(currentTime % 60);
        if (currentsec < 10) {
            currentsec = `0${currentsec}`;
        }
        currentTimeEl.textContent = `${currentMinute}:${currentsec} `;
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

nextBt.addEventListener("click", nextSong);
prevBt.addEventListener("click", prevSong);

music.addEventListener("timeupdate", updateProgessBar);

progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
