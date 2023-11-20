<?php 
include  'includes/head.php';
?>
<!DOCTYPE html>
<html>

<head>
<link rel="stylesheet" href="assets/css/start.css">

</head>

<body class="body">

  <div class="d1">
        <div class="startbutton" id="start"></div>
        <img src="assets/image/Primary/PlayB.png">
  </div>


<!-- 
  <div class="audio-holder">
  <audio id="backgroundMusic" autoplay muted>
    <source src="assets/sound/CookingMusic.mp3" type="audio/mp3">
    Your browser does not support the audio tag.
  </audio>

  <button onclick="startAudio()">Start Audio</button>
  </div> -->
  <script>
    function startAudio() {
      const backgroundMusic = document.getElementById('backgroundMusic');
      backgroundMusic.muted = false;
      backgroundMusic.play().then(() => {
        // Autoplay started successfully
      }).catch(error => {
        // Autoplay failed
        console.error('Autoplay failed:', error);
      });
    }

    document.addEventListener('DOMContentLoaded', function () {
            // Get the start button element
            const startButton = document.getElementById('start');

            // Add a click event listener
            startButton.addEventListener('click', function () {
                // Redirect to the desired page
                window.location.href = 'includes/CharSelection.php';
            });
        });
  </script>

</body>

</html>
