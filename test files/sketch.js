let img;
let numColors = 10;
let palette = [];
let labels = [];
let raisedClusters = [];

function preload() {
  img = loadImage('/images/posterized obama.jpg'); // adjust path if needed
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  noLoop();

  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;

  if (imgAspect > canvasAspect) {
    img.resize(width, int(width / imgAspect));
  } else {
    img.resize(int(height * imgAspect), height);
  }

  img.loadPixels();
  labels = Array.from({ length: img.width }, () => Array(img.height).fill(0));
  clusterColorsKMeans(numColors);

  // Add event listener to raise all clusters when button is clicked
  const exportBtn = createButton('Export Cluster Data');
  exportBtn.parent('controls');
  exportBtn.mousePressed(exportClusterData);

}

function draw() {
  background(255);
  img.loadPixels();

  // Draw posterized version without blur
  noStroke();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
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

function raiseCluster(clusterId) {
  if (!raisedClusters.includes(clusterId)) {
    raisedClusters.push(clusterId);
    loop();
  }
}

function raiseAllClusters() {
  // Raise all clusters
  for (let i = 0; i < numColors; i++) {
    raiseCluster(i);
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

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        if (labels[x][y] === clusterId) {
          rect(x, y, 1, 1);
        }
      }
    }
    pop();
  }
}

function clusterColorsKMeans(k) {
  let centroids = [];
  for (let i = 0; i < k; i++) {
    let index = int(random(img.pixels.length / 4)) * 4;
    centroids.push([
      img.pixels[index],
      img.pixels[index + 1],
      img.pixels[index + 2],
    ]);
  }

  let changed = true;
  let maxIterations = 2;
  let iteration = 0;

  while (changed && iteration < maxIterations) {
    iteration++;
    changed = false;

    let counts = Array(k).fill(0);
    let sums = Array(k).fill().map(() => [0, 0, 0]);
    let newLabels = Array.from({ length: img.width }, () => Array(img.height).fill(0));

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let i = 4 * (y * img.width + x);
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];

        let closest = 0;
        let minDist = colorDist([r, g, b], centroids[0]);
        for (let j = 1; j < k; j++) {
          let d = colorDist([r, g, b], centroids[j]);
          if (d < minDist) {
            closest = j;
            minDist = d;
          }
        }

        newLabels[x][y] = closest;
        counts[closest]++;
        sums[closest][0] += r;
        sums[closest][1] += g;
        sums[closest][2] += b;
      }
    }

    for (let j = 0; j < k; j++) {
      if (counts[j] > 0) {
        centroids[j] = [
          sums[j][0] / counts[j],
          sums[j][1] / counts[j],
          sums[j][2] / counts[j]
        ];
      }
    }

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        if (labels[x][y] !== newLabels[x][y]) {
          changed = true;
        }
        labels[x][y] = newLabels[x][y];
      }
    }
  }

  palette = centroids.map(c => color(c[0], c[1], c[2]));
}

function colorDist(c1, c2) {
  return dist(c1[0], c1[1], c1[2], c2[0], c2[1], c2[2]);
}

function exportClusterData() {
    const exportData = {
      width: img.width,
      height: img.height,
      palette: palette.map(c => [red(c), green(c), blue(c)]),
      labels: labels
    };
  
    const json = JSON.stringify(exportData);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clusterData.json';
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
