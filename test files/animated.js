let clusterData;
let palette = [];
let labels = [];
let canvasW = 800;
let canvasH = 800;
let loaded = false;
let numClusters = 0;
let raisedClusters = [];

function setup() {
  createCanvas(canvasW, canvasH);
  pixelDensity(1);
  noLoop();

  document.getElementById('jsonFileInput').addEventListener('change', handleFileUpload);
}

function draw() {
  if (!loaded) return;

  background(255);
  noStroke();

  // Draw flat base layer
  for (let y = 0; y < clusterData.height; y++) {
    for (let x = 0; x < clusterData.width; x++) {
      let k = labels[x][y];
      fill(palette[k]);
      rect(x, y, 1, 1);
    }
  }

  // Draw raised clusters
  for (let clusterId of raisedClusters) {
    drawRaisedCluster(clusterId);
  }

  if (raisedClusters.length > 0) {
    requestAnimationFrame(() => {
      redraw();
    });
  }
}

function drawRaisedCluster(clusterId) {
  let floatX = sin(frameCount * 0.05) * 2;
  let floatY = cos(frameCount * 0.05) * 2;

  for (let s = 10; s <= 30; s += 5) {
    push();
    drawingContext.shadowOffsetX = floatX + s / 4;
    drawingContext.shadowOffsetY = floatY + s / 4;
    drawingContext.shadowBlur = s * 0.5;
    drawingContext.shadowColor = `rgba(0, 0, 0, ${0.03 + s * 0.01})`;
    noStroke();
    fill(palette[clusterId]);

    for (let y = 0; y < clusterData.height; y++) {
      for (let x = 0; x < clusterData.width; x++) {
        if (labels[x][y] === clusterId) {
          rect(x, y, 1, 1);
        }
      }
    }
    pop();
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    clusterData = JSON.parse(e.target.result);
    palette = clusterData.palette.map(rgb => color(...rgb));
    labels = clusterData.labels;
    numClusters = palette.length;
    loaded = true;

    // Resize canvas based on data dimensions
    resizeCanvas(clusterData.width, clusterData.height);

    // Start animation
    raiseAllClusters();
    loop();
  };

  if (file) {
    reader.readAsText(file);
  }
}

function raiseCluster(clusterId) {
  if (!raisedClusters.includes(clusterId)) {
    raisedClusters.push(clusterId);
  }
}

function raiseAllClusters() {
  for (let i = 0; i < numClusters; i++) {
    raiseCluster(i);
  }
}
    