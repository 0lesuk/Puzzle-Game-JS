let pictures = document.querySelectorAll('.gallery img');
let picturesContainer = document.querySelector('.picture')
let difficultySelect = document.getElementById('difficulty__select');
let difficultyContainer = document.querySelector('.difficulty')
let buttonStart = document.getElementById('start');
let buttonHint = document.getElementById('hint')
let rows = 3;
let cols = 3;
let selectedImageSrc;
let difficultyLevel = difficultySelect.value;
let currentX;
let currentY;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

buttonHint.addEventListener('mousedown', function() {
  const img = new Image();
  img.src = selectedImageSrc;
  const hintImage = document.createElement('img');
  hintImage.src = selectedImageSrc;
  hintImage.style.position = 'fixed';
  hintImage.style.top = '50%';
  hintImage.style.left = '50%';
  hintImage.style.transform = 'translate(-50%, -50%)';
  hintImage.style.zIndex = '9999';
  hintImage.addEventListener('mousedown', function() {
    hintImage.remove();
  });
  hintImage.style.cursor = 'pointer'
  document.body.appendChild(hintImage);
});

buttonStart.addEventListener('click', function() {
  const container = document.getElementById('board')
  container.style.border = '2px solid black'
  picturesContainer.style.display = 'none'
  difficultyContainer.style.display = 'none'
  buttonHint.style.display = 'block' 
  shufflePuzzlePieces()    
});


difficultySelect.addEventListener('change', (event) => {
  difficultyLevel = event.target.value;
  if (difficultyLevel === 'easy') {
    rows = 3
    cols = 3
  }
  if (difficultyLevel === 'medium') {
    rows = 4
    cols = 4
  }
  if (difficultyLevel === 'hard') {
    rows = 5
    cols = 5
  }
});

pictures.forEach((image) => {
  image.addEventListener('click', function(event) {
    selectedImageSrc = event.target.src;
    const img = new Image();
    img.src = selectedImageSrc;
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const partWidth = img.width / cols;
      const partHeight = img.height / rows;
      const containerWidth = partWidth * cols;
      const containerHeight = partHeight * rows;
      const container = document.getElementById('board');
      container.style.width = `${containerWidth}px`;
      container.style.height = `${containerHeight}px`;
      container.innerHTML = "";
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * partWidth;
          const y = i * partHeight;
          const imageData = ctx.getImageData(x, y, partWidth, partHeight);
          const partCanvas = document.createElement('canvas');
          const partCtx = partCanvas.getContext('2d');
          partCanvas.width = partWidth;
          partCanvas.height = partHeight;
          partCanvas.classList.add('puzzle-piece')
          partCtx.putImageData(imageData, 0, 0);
          container.appendChild(partCanvas);
          const pieces = document.querySelectorAll('.puzzle-piece');
          pieces.forEach((piece) => {
            const currentX = piece.getBoundingClientRect();
            const currentY = piece.getBoundingClientRect();
            piece.setAttribute('data-correct-left', `${currentX.left}px` )
            piece.setAttribute('data-correct-top', `${currentY.top}px` )
          })
        }
      }
    };
  });
});

function shufflePuzzlePieces() {
  const pieces = document.querySelectorAll('.puzzle-piece');
  const container = document.getElementById('board');
  pieces.forEach((piece) => {
    const randomX = Math.floor(Math.random() * (container.offsetWidth - piece.offsetWidth));
    const randomY = Math.floor(Math.random() * (container.offsetHeight - piece.offsetHeight));
    piece.style.position = 'absolute';
    piece.style.left = `${randomX}px`;
    piece.style.top = `${randomY}px`;
    piece.addEventListener('mousedown', mouseDown);
    piece.addEventListener('mousemove', mouseMove);
    piece.addEventListener('mouseup', mouseUp);
    piece.addEventListener('dblclick', (event) => {
      let currentRotation = parseInt(piece.style.transform.replace('rotate(', '').replace('deg)', ''));
      currentRotation += 90;
      piece.style.transform = `rotate(${currentRotation}deg)`;
    });
  });
}




function mouseDown(event) {
  isDragging = true;
  selectedPiece = event.target;
  const boundingRect = selectedPiece.getBoundingClientRect();
  offsetX = event.clientX - boundingRect.left;
  offsetY = event.clientY - boundingRect.top;
  selectedPiece.style.zIndex = '1';
}

function mouseMove(event) {
  if (isDragging) {
    currentX = event.clientX - offsetX;
    currentY = event.clientY - offsetY;
    selectedPiece.style.left = `${currentX}px`;
    selectedPiece.style.top = `${currentY}px`;
  }
}

function mouseUp(event) {
  isDragging = false;
  selectedPiece.style.zIndex = '0';
  checkPosition(selectedPiece);
}

function checkPosition(piece) {
  const correctLeft = piece.getAttribute('data-correct-left');
  const correctTop = piece.getAttribute('data-correct-top');
  const boundingRect = piece.getBoundingClientRect();
  const currentLeft = boundingRect.left;
  const currentTop = boundingRect.top;
  const currentRotation = parseInt(piece.style.transform.replace('rotate(', '').replace('deg)', ''));
  const tolerance = 10;
  
  if (Math.abs(currentLeft - parseInt(correctLeft)) <= tolerance &&
      Math.abs(currentTop - parseInt(correctTop)) <= tolerance) {
    piece.style.left = correctLeft;
    piece.style.top = correctTop;
    piece.style.zIndex = '0';
    piece.removeEventListener('mousedown', mouseDown);
    piece.removeEventListener('mousemove', mouseMove);
    piece.removeEventListener('mouseup', mouseUp);
  }
}









  