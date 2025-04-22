// switchImage.js

document.addEventListener('DOMContentLoaded', function () {
    const switchButton = document.getElementById('switch-button');
    const quiltPhoto = document.querySelector('.quilt-photo');
  
    switchButton.addEventListener('click', function () {
      const quiltSrc = 'images/quilts/colored-entrance-quilt.jpg';
      const referenceSrc = 'images/references/colored_entrance-reference.png';
  
      if (quiltPhoto.src.includes(quiltSrc)) {
        quiltPhoto.src = referenceSrc;
      } else {
        quiltPhoto.src = quiltSrc;
      }
    });
  });
  