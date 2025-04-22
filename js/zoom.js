
  const resizeBtn = document.getElementById('resize');
  const zoomWrapper = document.getElementById('zoom-wrapper');
  const zoomLevels = [1, 2, 6]; // original, 2x, 4x
  let currentZoomIndex = 0;

  resizeBtn.addEventListener('click', () => {
    currentZoomIndex = (currentZoomIndex + 1) % zoomLevels.length;
    const scale = zoomLevels[currentZoomIndex];
    zoomWrapper.style.transform = `scale(${scale})`;

  });

