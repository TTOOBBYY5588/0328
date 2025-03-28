let seaweed = [];
const seaweedThickness = 30; // 增加水草的粗細

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);

  // Initialize seaweed positions
  for (let i = 0; i < 200; i++) { // 增加水草數量到 200
    seaweed.push({
      x: random(width), // 隨機水平位置
      height: random(100, 300), // 隨機高度
      offset: random(1000), // Perlin noise 偏移量
      color: color(random(50, 255), random(50, 255), random(50, 255)), // 隨機繽紛顏色
    });
  }

  // Create an iframe in the center of the window
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw');
  iframe.style('border', 'none');
  iframe.size(windowWidth * 0.8, windowHeight * 0.8);
  iframe.position(windowWidth * 0.1, windowHeight * 0.1); // Center the iframe
}

function draw() {
  // Create a colorful gradient background
  for (let y = 0; y < height; y++) {
    let r = map(y, 0, height, 100, 255); // 漸層紅色分量
    let g = map(y, 0, height, 150, 50); // 漸層綠色分量
    let b = map(y, 0, height, 255, 100); // 漸層藍色分量
    stroke(r, g, b);
    line(0, y, width, y);
  }

  // Draw seaweed
  noStroke();
  for (let i = 0; i < seaweed.length; i++) {
    let sw = seaweed[i];
    fill(sw.color); // 使用每個水草的隨機顏色
    beginShape();
    for (let y = 0; y < sw.height; y += 10) {
      let xOffset = map(noise(sw.offset + y * 0.01, frameCount * 0.01), 0, 1, -seaweedThickness, seaweedThickness);
      vertex(sw.x + xOffset, height - y);
    }
    vertex(sw.x, height); // Bottom anchor point
    endShape(CLOSE);
  }

  // Update Perlin noise offset for animation
  for (let i = 0; i < seaweed.length; i++) {
    seaweed[i].offset += 0.01;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

