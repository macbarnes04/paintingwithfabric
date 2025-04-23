
    const stitchButton = document.getElementById('stitchButton');

    var clicked = false;

    const mainImage = document.querySelector('.quilt-photo');
    const stitchImage = document.getElementById('stitching-photo');

    const quiltCE = 'images/quilts/colored-entrance-quilt.jpg';
    const quiltHT = 'images/quilts/harriet-tubman.png';

    const stitchCE = '';
    const stitchHT = 'images/stitching/HT-stitching.png';

    if(mainImage.src.includes(quiltCE)){
        stitchImage.src = stitchCE;
    } else if(mainImage.src.includes(quiltHT)){
        stitchImage.src = stitchHT;
    }

    stitchButton.addEventListener('click', function () {

        if(mainImage.src.includes(quiltCE)){
            stitchImage.src = stitchCE;
        } else if(mainImage.src.includes(quiltHT)){
            stitchImage.src = stitchHT;
        }

        clicked = !clicked;

        if(clicked){
            stitchImage.style.zIndex = '1000'; 
        } else{
            stitchImage.style.zIndex = '-1'; 
        }    
    });
