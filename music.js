const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseButtonControls = document.getElementById('play-pause-button');
const disk = document.querySelector('.disk');
const backwardButton = document.getElementById('backward');
const forwardButton = document.getElementById('forward');
// const slider = document.getElementById('slider');
const cTime = document.querySelector('.cTime');
const dTime = document.querySelector('.dTime');

let currentButton = null; // Track the current play button in playlist
let currentSong = null; // Track the current song file
let currentIndex = -1; // Index of the current song in the playlist
let isPlaying = false; // Track if the disk is currently playing

// Map song files to image URLs
const songImages = {
    'audio/Karan Aujla – ANTIDOTE.mp3': 'image/images (1).jpeg',
    'audio/Karan Aujla – IDK HOW.mp3': 'image/antidote.jpg',
    'audio/Chehra Hai Ya Chand Khila Hai _ Unplugged Cover _ Shahbaz Ali _ Kishore Kumar(MP3_160K).mp3': 'image/chehra.jpg',
    'audio/Kunal Bojewar – Likhe Jo Khat Tujhe.mp3': 'image/likhe.jpg',
    'audio/Saagar Jaisi Aankhon Wali (Reprise) - JalRaj _ New Cover 2022 Hindi(MP3_160K).mp3': 'image/sagar.jpg',
    'audio/Chingari Koi Bhadke _ Raj Barman - Unplugged _ Cover _ RD Burman(M4A_128K).m4a': 'image/chingari.jpg',
    'audio/Farasat Anees - Sanson Ki Mala (feat. TOSHI) _ Lo-Fi(M4A_128K).m4a': 'image/sanson.jpg',
    'audio/Hai Kahan Ka Irada(M4A_128K).m4a': 'image/irada.jpg',
    'audio/Tumhein Dillagi Bhool Jani Paray Gi _ Nusrat Fateh Ali Khan _ Lyrical Qawwali _ Shemaroo Punjabi(M4A_128K).m4a': 'image/dillagi.jpg',
    'audio/Talha Anjum, Savage - KATTAR KARACHI _ Prod. by Umair (Official Audio).m4a':'image/kattar.jpg',
    'audio/Brodha V - Aathma Raama [Music Video].m4a':'image/rama.jpg'
};

function updateDiskBackground(songFile) {
    const imageUrl = songImages[songFile];
    console.log('Selected Song:', songFile); // Debug log
    console.log('Image URL:', imageUrl); // Debug log
    
    if (imageUrl) {
        disk.style.backgroundImage = `url('${imageUrl}')`; // Ensure correct URL format
    } else {
        disk.style.backgroundImage = 'url(images/default.jpg)'; // Default image if no match found
    }
}




function startRotation() {
    // Remove any existing transform to avoid conflicts
    disk.style.transform = ''; 
    disk.style.animation = 'spin 10s linear infinite'; // Apply keyframe animation
}

function stopRotation() {
    // Disable CSS animation
    disk.style.animation = 'none'; 

    // Get the current rotation angle from the computed style
    const computedStyle = getComputedStyle(disk);
    const transform = computedStyle.transform;

    let currentAngle = 0;
    if (transform !== 'none') {
        // Use DOMMatrix to get the current rotation angle
        const matrix = new DOMMatrix(transform);
        currentAngle = Math.round(Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI));
    }

    // Apply the current rotation angle and stop the animation
    disk.style.transform = `rotate(${currentAngle}deg)`;
    
    // Trigger reflow to ensure the transform is applied
    disk.offsetHeight; // Trigger reflow to apply the transform
}



// Function to update button state (play/pause) in the playlist and controls section
function updateButtonState(button) {
    if (currentButton && currentButton !== button) {
        currentButton.innerHTML = '<i class="fas fa-play"></i>'; // Change icon to play
    }
    if (audioPlayer.paused) {
        button.innerHTML = '<i class="fas fa-play"></i>'; // Change icon to play
        playPauseButtonControls.innerHTML = '<i class="fas fa-play"></i>'; // Change controls icon to play
        stopRotation(); // Stop disk rotation
    } else {
        button.innerHTML = '<i class="fas fa-pause"></i>'; // Change icon to pause
        playPauseButtonControls.innerHTML = '<i class="fas fa-pause"></i>'; // Change controls icon to pause
        startRotation(); // Start disk rotation
    }
    currentButton = button;
}

// Function to update the main player section
function updateMainPlayer(songName, artistName) {
    document.getElementById('currentSongName').textContent = songName;
    document.getElementById('currentArtistName').textContent = artistName;

    // Update the disk background image based on the current song
    updateDiskBackground(currentSong);
}

// Function to toggle play/pause
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updateButtonState(currentButton); // Update playlist button
    updateButtonState(playPauseButtonControls); // Update controls button
}

// Function to play a song
function playSong(index) {
    if (index >= 0 && index < songFiles.length) {
        const songFile = songFiles[index];
        audioPlayer.src = songFile;
        audioPlayer.play();
        updateMainPlayer(songFile.split('/').pop(), 'Unknown Artist'); // Update this with real metadata if available
        updateButtonState(document.querySelector(`.play-pause-button[data-file="${songFile}"]`));
        currentSong = songFile;
        currentIndex = index;
    }
}

// Function to play the next song
function playNextSong() {
    if (currentIndex < songFiles.length - 1) {
        playSong(currentIndex + 1);
    }
}

// Function to play the previous song
function playPreviousSong() {
    if (currentIndex > 0) {
        playSong(currentIndex - 1);
    }
}

// Add event listener to the play/pause button in controls section
playPauseButtonControls.addEventListener('click', () => {
    togglePlayPause();
});

// Add event listeners for backward and forward buttons
backwardButton.addEventListener('click', () => {
    playPreviousSong();
});

forwardButton.addEventListener('click', () => {
    playNextSong();
});

// Function to handle playlist button click
function handlePlaylistButtonClick(event) {
    const button = event.currentTarget;
    const songFile = button.getAttribute('data-file');
    const songName = button.getAttribute('data-song');
    const artistName = button.getAttribute('data-artist');

    if (currentSong !== songFile) {
        // New song is selected
        playSong(songFiles.indexOf(songFile));
        updateMainPlayer(songName, artistName);
    } else if (audioPlayer.paused) {
        // Same song is clicked and currently paused
        audioPlayer.play();
        updateButtonState(button);
    } else {
        // Same song is clicked and currently playing
        audioPlayer.pause();
        updateButtonState(button);
    }
}

// Add event listeners to playlist buttons
function addSong(file) {
    const songName = file.split('/').pop();
    const artistName = 'Unknown Artist'; // Replace with actual metadata if available

    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
        <div class="div">
            <div class="detail">
                <h2>${songName}</h2>
                <p>${artistName}</p>
            </div>
            <button class="btn play-pause-button" data-file="${file}" data-song="${songName}" data-artist="${artistName}">
                <i class="fas fa-play"></i>
            </button>
        </div>
    `;
    playlist.appendChild(item);

    item.querySelector('.play-pause-button').addEventListener('click', handlePlaylistButtonClick);
}

const songFiles = [
    'audio/Karan Aujla – ANTIDOTE.mp3', 
    'audio/Karan Aujla – IDK HOW.mp3',
    'audio/Chehra Hai Ya Chand Khila Hai _ Unplugged Cover _ Shahbaz Ali _ Kishore Kumar(MP3_160K).mp3',
    'audio/Kunal Bojewar – Likhe Jo Khat Tujhe.mp3',
    'audio/Saagar Jaisi Aankhon Wali (Reprise) - JalRaj _ New Cover 2022 Hindi(MP3_160K).mp3',
    'audio/Chingari Koi Bhadke _ Raj Barman - Unplugged _ Cover _ RD Burman(M4A_128K).m4a',
    'audio/Farasat Anees - Sanson Ki Mala (feat. TOSHI) _ Lo-Fi(M4A_128K).m4a',
    'audio/Hai Kahan Ka Irada(M4A_128K).m4a',
    'audio/Tumhein Dillagi Bhool Jani Paray Gi _ Nusrat Fateh Ali Khan _ Lyrical Qawwali _ Shemaroo Punjabi(M4A_128K).m4a',
    'audio/Talha Anjum, Savage - KATTAR KARACHI _ Prod. by Umair (Official Audio).m4a',
    'audio/Brodha V - Aathma Raama [Music Video].m4a'
];

songFiles.forEach(addSong);



// Select the audio element and slider/timer elements
const audio = document.querySelector('audio'); // Assuming you have an <audio> element in your HTML
const slider = document.getElementById('slider');
const currentTimeDisplay = document.querySelector('.cTime');
const durationTimeDisplay = document.querySelector('.dTime');

// Update the slider and time display
audio.addEventListener('loadedmetadata', () => {
    // Set the slider max value to the duration of the audio
    slider.max = audio.duration;

    // Format and display the duration
    durationTimeDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    // Update the slider value as the audio plays
    slider.value = audio.currentTime;

    // Format and display the current time
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Function to format time in hh:mm:ss format
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Update the audio's current time when the slider is moved
slider.addEventListener('input', () => {
    audio.currentTime = slider.value;
    currentTimeDisplay.textContent = formatTime(slider.value);
});
