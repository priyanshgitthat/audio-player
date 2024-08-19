// const playPauseButton = document.getElementById('play-pause-button');
// const icon = playPauseButton.querySelector('i');
// const disk = document.querySelector('.disk');

// let isPlaying = false; // Track if the disk is currently playing
// let currentRotation = 0; // Track the current rotation angle
// let lastTime = 0; // Track the last time for animation updates
// let animationFrameId; // Store the animation frame ID for stopping it

// const rotationSpeed = 10; // Adjust this value to change the rotation speed (smaller value = faster)

// function updateRotation(time) {
//     if (isPlaying) {
//         const deltaTime = time - lastTime;
//         lastTime = time;
//         currentRotation += (deltaTime / 1000) * 360 / rotationSpeed; // Adjust speed
//         disk.style.transform = `rotate(${currentRotation}deg)`;
//         animationFrameId = requestAnimationFrame(updateRotation);
//     }
// }

// function startRotation() {
//     disk.style.animation = 'none'; // Disable CSS animation
//     disk.style.transform = `rotate(${currentRotation}deg)`; // Set current rotation
//     lastTime = performance.now(); // Record start time
//     animationFrameId = requestAnimationFrame(updateRotation); // Start rotation updates
// }

// function stopRotation() {
//     cancelAnimationFrame(animationFrameId); // Stop rotation updates
//     disk.style.animation = 'none'; // Ensure CSS animation is off
//     disk.style.transform = `rotate(${currentRotation}deg)`; // Preserve current rotation
// }

// function togglePlayPause() {
//     if (isPlaying) {
//         icon.classList.replace('fa-pause', 'fa-play');
//         stopRotation(); // Stop the disk rotation
//     } else {
//         icon.classList.replace('fa-play', 'fa-pause');
//         startRotation(); // Start the disk rotation
//     }
//     isPlaying = !isPlaying; // Toggle play/pause state
// }

// playPauseButton.addEventListener('click', togglePlayPause);


// playlist


document.addEventListener('DOMContentLoaded', () => {
    const playPauseButtons = document.querySelectorAll('.btn');

    playPauseButtons.forEach(button => {
        const icon = button.querySelector('i');

        button.addEventListener('click', () => {
            if (icon.classList.contains('fa-play')) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    });

    const toggleButton = document.getElementById('toggle-button');
    const playlistSection = document.querySelector('section');

    toggleButton.addEventListener('click', () => {
        if (playlistSection.classList.contains('visible')) {
            playlistSection.classList.remove('visible');
            playlistSection.classList.add('hidden');
        } else {
            playlistSection.classList.remove('hidden');
            playlistSection.classList.add('visible');
        }
    });

    // Initial state
    playlistSection.classList.add('hidden');
});
