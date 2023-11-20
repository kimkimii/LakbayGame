<?php 
include  'head.php';
?>
<!DOCTYPE html>
<html>

<head>

</head>

<body class="body">

  <div class="d1">
        <div class="slot1" id="slot1"></div>
        <div class="slot2" id="slot2"></div>
        <div class="slot3" id="slot3"></div>
        <img class="saveslot" src="../assets/image/Primary/SAVESLOTBUTTONS.png">
  </div>

<script>
    
    document.addEventListener('DOMContentLoaded', function () {
            // Get the start button element
            const slot1 = document.getElementById('slot1');
            const slot2 = document.getElementById('slot2');
            const slot3 = document.getElementById('slot3');

            // Add a click event listener
            slot1.addEventListener('click', function () {
                // Redirect to the desired page
                window.location.href = '../includes/Start.php';
            });
            slot2.addEventListener('click', function () {
                // Redirect to the desired page
                window.location.href = 'includes/Start.php';
            });
            slot3.addEventListener('click', function () {
                // Redirect to the desired page
                window.location.href = 'includes/Start.php';
            });
        });
</script>
</body>

</html>
