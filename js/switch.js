// switchImage.js

document.addEventListener('DOMContentLoaded', function () {
    const switchButton = document.getElementById('switch-button');
    const quiltPhoto = document.querySelector('.quilt-photo');
  
    switchButton.addEventListener('click', function () {
      const quiltCE = 'images/quilts/colored-entrance-quilt.jpg';
      const quiltHT = 'images/quilts/harriet-tubman.png';
      const refCE = 'images/references/colored_entrance-reference.png';
      const refHT = 'images/references/Harriet-Tubman-Reference.png';
  
      if (quiltPhoto.src.includes(quiltCE)) {
        quiltPhoto.src = refCE;
      } else if (quiltPhoto.src.includes(quiltHT)){
        quiltPhoto.src = refHT;
      }
      else if(quiltPhoto.src.includes(refCE)){
        quiltPhoto.src = quiltCE
      }
      else if(quiltPhoto.src.includes(refHT)){
        quiltPhoto.src = quiltHT
      }
      else {
        quiltPhoto.src = refHT;
      }
    });
  });
  