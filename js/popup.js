// Get the elements
const infoButton = document.getElementById('infobutton'); // assuming you have this button to open the popup
const popupOverlay = document.getElementById('info-overlay');
const questionButton = document.getElementById('qbutton'); // assuming you have this button to open the popup
const questionOverlay = document.getElementById('question-overlay');
// const closeButton = document.getElementById('close-button'); // Add an ID to the close button in HTML
const closeButton = document.querySelector(".close-button");
const qcloseButton = document.querySelector(".qclose-button");

// Show the popup when infoButton is clicked
infoButton.addEventListener('click', () => {
  popupOverlay.classList.remove('hidden');
});

// Close the popup when closeButton is clicked
closeButton.addEventListener('click', () => {
  popupOverlay.classList.add('hidden');
});

qcloseButton.addEventListener('click', () => {
    questionOverlay.classList.add('hidden');
  });

// Optional: Close the popup if the overlay itself is clicked
popupOverlay.addEventListener('click', (event) => {
  if (event.target === popupOverlay) {
    popupOverlay.classList.add('hidden');
  }
});

// question overlay 

questionButton.addEventListener('click', () => {
    questionOverlay.classList.remove('hidden');
    console.log(questionOverlay.classList);
  });

questionOverlay.addEventListener('click', (event) => {
    if (event.target === questionOverlay) {
        questionOverlay.classList.add('hidden');
    }
  });
