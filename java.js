let currentAudio = null;
let currentTrackIndex = -1;
const tracks = Array.from(document.querySelectorAll(".playlist-grid .card audio"));
const playPauseBtn = document.querySelector(".play-pause");
const trackImage = document.querySelector(".track-info img");
const trackTitle = document.querySelector(".track-info h4");
const trackArtist = document.querySelector(".track-info p");
const progressBar = document.querySelector(".progress");
const progressStart = document.querySelectorAll(".progress-container span")[0];
const progressEnd = document.querySelectorAll(".progress-container span")[1];
const prevBtn = document.querySelector(".controls button:first-child");
const nextBtn = document.querySelector(".controls button:last-child");

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    body.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
}

tracks.forEach((audio, index) => {
    const card = audio.parentElement;
    card.addEventListener("click", () => playTrack(index));
});

function playTrack(index) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentTrackIndex = index;
    currentAudio = tracks[index];
    currentAudio.play();

    updatePlaybarUI();
    updateProgressBar();
}

function updatePlaybarUI() {
    const card = tracks[currentTrackIndex].parentElement;
    const title = card.querySelector("h3").innerText;
    const imgSrc = card.querySelector("img").src;

    trackTitle.textContent = title;
    trackArtist.textContent = "Unknown Artist";
    trackImage.src = imgSrc;

    playPauseBtn.textContent = "⏸";
}

function togglePlayPause() {
    if (!currentAudio) return;

    if (currentAudio.paused) {
        currentAudio.play();
        playPauseBtn.textContent = "⏸";
    } else {
        currentAudio.pause();
        playPauseBtn.textContent = "▶";
    }
}

function playNext() {
    if (currentTrackIndex < tracks.length - 1) {
        playTrack(currentTrackIndex + 1);
    }
}

function playPrevious() {
    if (currentTrackIndex > 0) {
        playTrack(currentTrackIndex - 1);
    }
}

function updateProgressBar() {
    if (!currentAudio) return;

    currentAudio.addEventListener("timeupdate", () => {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        progressBar.style.width = `${progress}%`;

        progressStart.textContent = formatTime(currentAudio.currentTime);
        progressEnd.textContent = formatTime(currentAudio.duration);
    });

    currentAudio.addEventListener("ended", playNext);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", playPrevious);
nextBtn.addEventListener("click", playNext);
