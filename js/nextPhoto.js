document.addEventListener("DOMContentLoaded", () => {
    const nextIcon = document.getElementById("next-icon");
    const photoImg = document.querySelector("#photo .quilt-photo");
    const pocketImage = document.getElementById("pocket-image");
    const underlay = document.getElementById("reference-photo");

    // List of image sources
    const photoSources = [
        "images/quilts/colored-entrance-quilt.jpg",
        // "images/quilts/dear-mama.jpg",
        // "images/quilts/mobile-madonna.jpg",
        // "images/quilts/broom-jumpers.jpg",
        "images/quilts/harriet-tubman.png"
    ];

    const refSources = [
        "images/references/colored_entrance-reference.png",
        "images/references/Harriet-Tubman-Reference.png"
    ]

    let currentIndex = 0;

    nextIcon.addEventListener("click", () => {
        // Increment the index and loop back to the start if needed
        currentIndex = (currentIndex + 1) % photoSources.length;

        const nextSrc = photoSources[currentIndex];
        const nextref = refSources[currentIndex]

        // Update both images
        photoImg.src = nextSrc;
        pocketImage.src = nextSrc;
        underlay.src = nextref;

    });
});
