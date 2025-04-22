document.addEventListener("DOMContentLoaded", () => {
    const nextIcon = document.getElementById("next-icon");
    const photoImg = document.querySelector("#photo .quilt-photo");
    const pocketImage = document.getElementById("pocket-image");

    // List of image sources
    const photoSources = [
        "images/quilts/colored-entrance-quilt.jpg",
        // "images/quilts/dear-mama.jpg",
        // "images/quilts/mobile-madonna.jpg",
        "images/quilts/broom-jumpers.jpg"
    ];

    let currentIndex = 0;

    nextIcon.addEventListener("click", () => {
        // Increment the index and loop back to the start if needed
        currentIndex = (currentIndex + 1) % photoSources.length;

        const nextSrc = photoSources[currentIndex];

        // Update both images
        photoImg.src = nextSrc;
        pocketImage.src = nextSrc;
    });
});
