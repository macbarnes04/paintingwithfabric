window.onload = function () {
    const pageContent = document.getElementById('page-content');
    const loadingScreen = document.getElementById('loading-screen');
    const swatches = document.querySelectorAll('.swatch');
    const textSlide = document.querySelector('.text-slide'); // The bottom text

    // Initial setup
    pageContent.style.display = 'none';
    pageContent.style.opacity = '0';

    let finishedCount = 0;

    const transitionToPage = () => {
        console.log("Fading in bottom text");

        // Ensure the text appears with animation
        textSlide.style.opacity = '1';
        textSlide.style.transform = 'translateX(-50%) translateY(0)'; // After the animation

        // Wait for the text animation to complete before starting the loading screen fade
        setTimeout(() => {
            console.log("Waiting before fading out loading screen...");
            setTimeout(() => {
                console.log("Fading out loading screen");
                loadingScreen.classList.add('loaded');

                setTimeout(() => {
                    console.log("Hiding loading screen, showing page content");
                    loadingScreen.style.display = 'none';
                    pageContent.style.display = 'block';
                    pageContent.classList.add('fade-in');
                    pageContent.style.transition = 'opacity 2s ease-in-out';
                    pageContent.style.opacity = '1';
                    console.log("Added fade-in class to page content");
                }, 3000); // This matches the CSS fade duration of the loading screen
            }, 1000); // Add a delay before the fade-out starts after text animation

        }, 1000); // This gives a 1-second delay after the text finishes appearing
    };

    // Wait for all swatches to finish
    swatches.forEach(swatch => {
        swatch.addEventListener('animationend', () => {
            finishedCount++;
            console.log(`Swatch finished (${finishedCount}/${swatches.length})`);
            if (finishedCount === swatches.length) {
                transitionToPage();
            }
        });
    });

    // Fallback in case animations don’t fire
    setTimeout(() => {
        if (finishedCount < swatches.length) {
            console.log("Fallback triggered");
            transitionToPage();
        }
    }, 10000);
};
