<?php 
include  'head.php';
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/score.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400&display=swap" rel="stylesheet">
  </head>

  <body>
    <div class="score-board">
      <h3>score</h3>
      <h1 id="score"></h1>
    </div>
    <div class="grid">
    </div>
    
    <div class="rightside">
      <a href="../index.html"> 
        <img src="../assets/image/Primary/BackB.png"></a>
    </div>

    <div id="myModal" class="modal">
      <div class="modal-content">
          <span class="close" onclick="closeModal()">&times;</span>
          <img src="../assets/image/Goal/YOURSCORE.png" alt="Popup Image">
          <h2 id="finalscore"></h2>
          <div class="continue" id="continuestage"></div>
          <div class="exit" id="exit"></div>

      </div>
  </div>

    <script src="../assets/js/app.js"></script>
    <script>
      // Your existing interval function

    document.addEventListener('DOMContentLoaded', function () {
      // Get the start button element
      const continuestage = document.getElementById('continuestage');
      const exit = document.getElementById('exit');


      // Add a click event listener
      continuestage.addEventListener('click', function () {
          // Redirect to the desired page
          window.location.href = '../includes/map.php';
      });
         // Add a click event listener
      exit.addEventListener('click', function () {
          // Redirect to the desired page
          window.location.href = '../includes/map.php';
      });
    });
    </script>
  </body>
</html>