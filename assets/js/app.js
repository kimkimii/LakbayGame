document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const finalscoreDisplay = document.getElementById('finalscore');

  const width = 8;
  const squares = [];
  let score = 0;

  const candyColors = [
    'url(../assets/image/icons/Empanada3.png)',
    'url(../assets/image/icons/Bangus2.png)',
    'url(../assets/image/icons/Longganisa3.png)',
    'url(../assets/image/icons/Vigan.png)',
    'url(../assets/image/icons/Laoagsand.png)',
    'url(../assets/image/icons/Windmill3.png)'
  ];

function hasImmediateMatches() {
  // Check for matches in rows and columns
  return (
    squares.some((_, i) => i % width < width - 2 && squares[i].style.backgroundImage === squares[i + 1].style.backgroundImage && squares[i].style.backgroundImage === squares[i + 2].style.backgroundImage && Math.floor(i / width) === Math.floor((i + 2) / width)) ||
    squares.some((_, i) => i < width * (width - 2) && squares[i].style.backgroundImage === squares[i + width].style.backgroundImage && squares[i].style.backgroundImage === squares[i + width * 2].style.backgroundImage)
  );
}


  // Create the board without immediate matches
  function createBoardWithoutMatches() {
    do {
      // Clear the existing board
      grid.innerHTML = '';
      squares.length = 0;

      // Shuffle the candy colors
      candyColors.sort(() => Math.random() - 0.5);

      // Create the board
      for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomColor = Math.floor(Math.random() * candyColors.length);
        square.style.backgroundImage = candyColors[randomColor];
        grid.appendChild(square);
        squares.push(square);
      }
    } while (hasImmediateMatches());
  }

  // Call the new function to create the board
  createBoardWithoutMatches();

  // create your board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('draggable', true);
      square.setAttribute('id', i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }

  // Dragging the Candy
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('dragenter', dragEnter));
  squares.forEach(square => square.addEventListener('drageleave', dragLeave));
  squares.forEach(square => square.addEventListener('drop', dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    this.classList.add('candy-animation'); // Add animation class
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.backgroundImage = '';
  }
  
  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
  
    // Check if it's a valid move
    if (isValidMove()) {
      // If it's a valid move, switch the candies with animation
      switchCandiesWithAnimation();
    } else {
      // If it's not a valid move, move the candy back to its original position with animation
      animateInvalidMove();
    }
  }
  
  function isValidMove() {
    let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width];
    return squareIdBeingReplaced && validMoves.includes(squareIdBeingReplaced);
  }
  
  function switchCandiesWithAnimation() {
    // Switch candies with animation
    const tempColor = squares[squareIdBeingReplaced].style.backgroundImage;
    squares[squareIdBeingReplaced].style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = tempColor;
  
    // Remove animation classes after the animation completes
    setTimeout(() => {
      squares[squareIdBeingReplaced].classList.remove('candy-animation');
      squares[squareIdBeingDragged].classList.remove('candy-animation');
    }, 500); // Adjust the timeout based on your animation duration
  }
  
  function animateInvalidMove() {
    // Animate candies back to their original positions
    squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  
    // Add dropping animation class
    squares[squareIdBeingDragged].classList.add('candy-drop-animation');
  
    // Remove the animation class after the animation completes
    setTimeout(() => {
      squares[squareIdBeingDragged].classList.remove('candy-drop-animation');
    }, 500); // Adjust the timeout based on your animation duration
  
    squareIdBeingReplaced = null;
  }
  
  function dragEnd() {
    // Remove the animation class from the dragged candy
    this.classList.remove('candy-animation');
  
    // Check for matches after the candies have settled
    setTimeout(() => {
      const matchFound = checkForMatches();
  
      if (!matchFound) {
        // If there are no matches, move the candies into squares below
        moveIntoSquareBelow();
  
        // Check for matches after moving candies
        setTimeout(() => {
          if (checkForMatches()) {
            // If there are new matches, refill the board
            refillBoard();
          }
        }, 500); // Adjust the timeout based on your animation duration
      }
  
      squareIdBeingReplaced = null;
    }, 500); // Adjust the timeout based on your animation duration
  }
  
  

  function checkForMatches() {
    // Add your logic to check for matches here
    // Return true if there is a match, false otherwise
    // You can use the existing match-checking functions like checkRowForFour, checkColumnForFour, etc.
    // For simplicity, I'm assuming a function named checkForMatches that checks all types of matches
    return (
      checkRowForFour() ||
      checkColumnForFour() ||
      checkRowForThree() ||
      checkColumnForThree()
    );
  }
  

  function switchCandiesWithAnimation() {
    // Switch candies with animation
    const tempColor = squares[squareIdBeingReplaced].style.backgroundImage;
    squares[squareIdBeingReplaced].style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = tempColor;
  
    // Add animation classes after the animation completes
    squares[squareIdBeingReplaced].classList.add('candy-animation');
    squares[squareIdBeingDragged].classList.add('candy-animation');
  
    // Remove animation classes after the animation completes
    setTimeout(() => {
      squares[squareIdBeingReplaced].classList.remove('candy-animation');
      squares[squareIdBeingDragged].classList.remove('candy-animation');
  
      // Check for matches after the candies have settled
      setTimeout(() => {
        if (!checkForMatches()) {
          // If there are no matches, move candies into squares below
          moveIntoSquareBelow();
        }
      }, 100); // Adjust the timeout based on your animation duration
    }, 500); // Adjust the timeout based on your animation duration
  }
  
  
  
  function animateInvalidMove() {
    // Calculate the direction of the drag
    const directionX = squareIdBeingReplaced % width - squareIdBeingDragged % width;
    const directionY = Math.floor(squareIdBeingReplaced / width) - Math.floor(squareIdBeingDragged / width);
  
    // Animate candies back to their original positions based on the direction
    if (directionX !== 0 || directionY !== 0) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  
      // Add dropping animation class
      const animationClass = getAnimationClass(directionX, directionY);
      squares[squareIdBeingDragged].classList.add(animationClass);
  
      // Remove the animation class after the animation completes
      setTimeout(() => {
        squares[squareIdBeingDragged].classList.remove(animationClass);
      }, 500); // Adjust the timeout based on your animation duration
  
      // Add a delay before resetting squareIdBeingReplaced
      setTimeout(() => {
        squareIdBeingReplaced = null;
      }, 1000); // Adjust the timeout based on your desired delay duration
    }
  }
  
  function getAnimationClass(directionX, directionY) {
    return directionX > 0 ? 'candy-move-left-animation' :
           directionX < 0 ? 'candy-move-right-animation' :
           directionY > 0 ? 'candy-move-up-animation' :
           'candy-move-down-animation';
  }
  
  
  // drop candies once some have been cleared
  function moveIntoSquareBelow() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === '') {
        squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = '';
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && (squares[i].style.backgroundImage === '')) {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  // Checking for Matches
 
  function checkRowForFour() {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';
  
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
      if (notValid.includes(i)) continue;
  
      if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach(index => {
          squares[index].style.backgroundImage = '';
        });
        refillBoard();
      }
    }
  }
  
  function checkColumnForFour() {
    for (i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';
  
      if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach(index => {
          squares[index].style.backgroundImage = '';
        });
        refillBoard();
      }
    }
  }
  
  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';
  
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;
  
      if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach(index => {
          squares[index].style.backgroundImage = '';
        });
        refillBoard();
      }
    }
  }
  
  function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';
  
      if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach(index => {
          squares[index].style.backgroundImage = '';
        });
        refillBoard();
      }
    }
  }
  
  function refillBoard() {
    // Iterate from the bottom to the top
    for (let i = width * (width - 1); i >= 0; i--) {
      // If the square is empty, find the first non-empty square above it
      if (squares[i].style.backgroundImage === '') {
        let j = i - width;
        while (j >= 0 && squares[j].style.backgroundImage === '') {
          j -= width;
        }
  
        // If a non-empty square is found, move its candy to the empty square with dropping and moving animations
        if (j >= 0) {
          squares[i].style.backgroundImage = squares[j].style.backgroundImage;
          squares[j].style.backgroundImage = '';
          squares[i].classList.add('candy-drop-animation', 'candy-animation'); // Add both animation classes
        }
      }
    }
  
    // Fill the top row with new candies
    for (let i = 0; i < width; i++) {
      if (squares[i].style.backgroundImage === '') {
        let randomColor = Math.floor(Math.random() * candyColors.length);
        squares[i].style.backgroundImage = candyColors[randomColor];
        squares[i].classList.add('candy-drop-animation', 'candy-animation'); // Add both animation classes
      }
    }
  
    // Remove animation classes after the animation completes
    setTimeout(() => {
      squares.forEach(square => square.classList.remove('candy-drop-animation', 'candy-animation'));
    }, 500); // Adjust the timeout based on your animation duration
  }
  

  
  // Checks carried out indefinitely - Add Button to clear interval for best practice, or clear on game over/game won.
  // If you have this indefinite check you can get rid of calling the check functions above.
  const intervalId = window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();

    // Check if the score has reached 10
    if (score >= 10) {
        // Trigger the appearance of something (you can replace this with your logic)
        handleScoreReachedTen();
        
        // Optionally, you can clear the interval to stop further checks
        clearInterval(intervalId);
        finalscoreDisplay.innerHTML = score;

    }
}, 100);

function handleScoreReachedTen() {
  // Display the modal
  openModal();
}

function openModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}



});

