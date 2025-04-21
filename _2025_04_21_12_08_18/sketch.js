let wingColor;
let faceColor = '#FFE4C4'; // צבע פנים קבוע כמו בתמונה
let wingColors = ['#ADD8E6', '#E6E6FA', '#98FB98', '#FFDAB9', '#FFB6C1', '#87CEEB'];
let colorIndex = 0;
let sparkles = []; // מערך לשמירת הנצנצים
let lastSparkleTime = 0; // מתי נוצרו נצנצים אחרונים

function setup() {
  createCanvas(500, 500);
  wingColor = wingColors[colorIndex];
  
  // אתחול אקראי של מיקום הנצנצים
  for (let i = 0; i < 5; i++) {
    sparkles.push({
      x: random(width),
      y: random(height),
      size: random(3, 8),
      alpha: random(100, 255),
      speedX: random(-1, 1),
      speedY: random(-2, -1),
      color: color(random(200, 255), random(200, 255), random(100, 255), 255)
    });
  }
}

function draw() {
  background(240);
  
  // מיקום הראש של הפייה
  let headX = width/2;
  let headY = height/2 - 30;
  let headSize = 100;
  
  // כנפיים
  drawWings(headX, headY, wingColor);
  
  // ציור הגוף
  drawFairy(headX, headY, headSize);
  
  // הגדרת המיקום של העיניים
  let leftEyeX = headX - 20;
  let rightEyeX = headX + 20;
  let eyeY = headY - 5;
  let eyeSize = 25;
  
  // ציור העיניים החיצוניות (הלבנות)
  fill(255);
  stroke(0);
  strokeWeight(1);
  ellipse(leftEyeX, eyeY, eyeSize, eyeSize);
  ellipse(rightEyeX, eyeY, eyeSize, eyeSize);
  
  // נקודת "מבט" משותפת
  let focusX = mouseX;
  let focusY = mouseY;
  
  let maxDistance = eyeSize / 4;
  
  // חישוב המיקום של האישונים
  let leftPupilX = calculatePupilPosition(leftEyeX, eyeY, focusX, focusY, maxDistance).x;
  let leftPupilY = calculatePupilPosition(leftEyeX, eyeY, focusX, focusY, maxDistance).y;
  
  let rightPupilX = calculatePupilPosition(rightEyeX, eyeY, focusX, focusY, maxDistance).x;
  let rightPupilY = calculatePupilPosition(rightEyeX, eyeY, focusX, focusY, maxDistance).y;
  
  // ציור האישונים (כחולים בהירים כמו בתמונה)
  fill('#3388CC');
  noStroke();
  let pupilSize = eyeSize / 1.8;
  ellipse(leftPupilX, leftPupilY, pupilSize, pupilSize);
  ellipse(rightPupilX, rightPupilY, pupilSize, pupilSize);
  
  // ריסים
  stroke(0);
  strokeWeight(1);
  // עין שמאל
  line(leftEyeX - 10, eyeY - 8, leftEyeX - 5, eyeY - 12);
  line(leftEyeX, eyeY - 12, leftEyeX, eyeY - 16);
  line(leftEyeX + 10, eyeY - 8, leftEyeX + 5, eyeY - 12);
  // עין ימין
  line(rightEyeX - 10, eyeY - 8, rightEyeX - 5, eyeY - 12);
  line(rightEyeX, eyeY - 12, rightEyeX, eyeY - 16);
  line(rightEyeX + 10, eyeY - 8, rightEyeX + 5, eyeY - 12);
  
  // עדכון והצגת הנצנצים
  updateAndDrawSparkles();
  
  // שרביט
  drawWand(headX + 80, headY + 20);
}

// ציור הפייה
function drawFairy(x, y, size) {
  // ציור הראש
  fill(faceColor);
  stroke(0);
  strokeWeight(1);
  ellipse(x, y, size, size);
  
  // שיער בלונדיני
  fill('#F0E68C'); // צהוב בהיר
  noStroke();
  
  // שיער - חלק עליון
  beginShape();
  vertex(x, y - size/2);
  bezierVertex(x - size/2, y - size/1.2, x - size/2, y, x - size/3, y + size/2);
  bezierVertex(x - size/4, y + size/1.5, x + size/4, y + size/1.5, x + size/3, y + size/2);
  bezierVertex(x + size/2, y, x + size/2, y - size/1.2, x, y - size/2);
  endShape(CLOSE);
  
  // אוזניים מחודדות (פיות)
  fill(faceColor);
  stroke(0);
  strokeWeight(1);
  // אוזן שמאל
  push();
  translate(x - size/2 + 5, y);
  rotate(-PI/12);
  ellipse(0, 0, 15, 30);
  pop();
  // אוזן ימין
  push();
  translate(x + size/2 - 5, y);
  rotate(PI/12);
  ellipse(0, 0, 15, 30);
  pop();
  
  // גוף - שמלה כחולה
  fill('#87CEFA'); // כחול בהיר
  stroke(0);
  strokeWeight(1);
  
  // גוף עליון
  beginShape();
  vertex(x - 30, y + size/2);
  vertex(x + 30, y + size/2);
  vertex(x + 40, y + 90);
  vertex(x - 40, y + 90);
  endShape(CLOSE);
  
  // חצאית
  beginShape();
  vertex(x - 40, y + 90);
  vertex(x + 40, y + 90);
  vertex(x + 60, y + 150);
  vertex(x - 60, y + 150);
  endShape(CLOSE);
  
  // חגורה לבנה
  fill(255);
  rect(x - 40, y + 85, 80, 10);
  
  // ידיים
  stroke(faceColor);
  strokeWeight(10);
  // יד שמאל
  line(x - 30, y + 60, x - 70, y + 30);
  // יד ימין - מחזיקה את השרביט
  line(x + 30, y + 60, x + 70, y + 30);
  
  // רגליים
  // רגל שמאל
  line(x - 20, y + 150, x - 40, y + 190);
  // רגל ימין
  line(x + 20, y + 150, x + 20, y + 190);
  
  // פה - חיוך
  stroke('#FF3333');
  strokeWeight(2);
  noFill();
  arc(x, y + 25, 30, 15, 0, PI);
}

// ציור כנפיים
function drawWings(x, y, wingColor) {
  // נצנצים בתוך הכנפיים
  let sparkleCount = 25;
  
  // כנף שמאלית
  push();
  translate(x - 60, y + 20);
  rotate(-PI/6);
  
  fill(wingColor);
  stroke(255);
  strokeWeight(2);
  
  // צורת הכנף - יותר דומה לתמונה
  beginShape();
  vertex(0, 0);
  bezierVertex(-30, -50, -80, -40, -70, 40);
  bezierVertex(-20, 30, 20, 20, 0, 0);
  endShape(CLOSE);
  
  // הוספת נצנצים לכנף שמאלית
  fill(255);
  noStroke();
  for (let i = 0; i < sparkleCount; i++) {
    let sparkleX = random(-60, 0);
    let sparkleY = random(-40, 30);
    // בדיקה אם הנצנץ בתוך הכנף
    ellipse(sparkleX, sparkleY, random(1, 3), random(1, 3));
  }
  pop();
  
  // כנף ימנית
  push();
  translate(x + 60, y + 20);
  rotate(PI/6);
  
  fill(wingColor);
  stroke(255);
  strokeWeight(2);
  
  // צורת הכנף - יותר דומה לתמונה
  beginShape();
  vertex(0, 0);
  bezierVertex(30, -50, 80, -40, 70, 40);
  bezierVertex(20, 30, -20, 20, 0, 0);
  endShape(CLOSE);
  
  // הוספת נצנצים לכנף ימנית
  fill(255);
  noStroke();
  for (let i = 0; i < sparkleCount; i++) {
    let sparkleX = random(0, 60);
    let sparkleY = random(-40, 30);
    // בדיקה אם הנצנץ בתוך הכנף
    ellipse(sparkleX, sparkleY, random(1, 3), random(1, 3));
  }
  pop();
}

// פונקציה לציור שרביט
function drawWand(x, y) {
  // מקל השרביט
  stroke('#8B4513'); // חום
  strokeWeight(3);
  line(x - 30, y, x, y - 10);
  
  // כוכב בקצה השרביט
  fill('#5BCFFA'); // כחול בהיר כמו בתמונה
  stroke('#4AA6F7'); // קצת יותר כהה למתאר
  strokeWeight(1);
  push();
  translate(x - 30, y);
  rotate(frameCount / 100);
  star(0, 0, 8, 15, 5); 
  pop();
}

// פונקציה לחישוב מיקום האישון
function calculatePupilPosition(eyeX, eyeY, targetX, targetY, maxDistance) {
  let directionX = targetX - eyeX;
  let directionY = targetY - eyeY;
  
  let distance = sqrt(directionX * directionX + directionY * directionY);
  
  let moveFactor = min(maxDistance, distance) / distance;
  
  if (distance === 0) {
    moveFactor = 0;
  }
  
  let pupilX = eyeX + directionX * moveFactor;
  let pupilY = eyeY + directionY * moveFactor;
  
  return {x: pupilX, y: pupilY};
}

// פונקציה לציור כוכב
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// עדכון והצגת הנצנצים
function updateAndDrawSparkles() {
  for (let i = sparkles.length - 1; i >= 0; i--) {
    let s = sparkles[i];
    
    // הזזת הנצנצים
    s.x += s.speedX;
    s.y += s.speedY;
    s.alpha -= 2; // דעיכה הדרגתית
    
    // הצגת הנצנצים
    if (s.alpha > 0) {
      fill(red(s.color), green(s.color), blue(s.color), s.alpha);
      noStroke();
      star(s.x, s.y, s.size/2, s.size, 5);
    } else {
      // מחיקת נצנצים שדעכו לחלוטין
      sparkles.splice(i, 1);
    }
  }
}

// אירוע לחיצה - בדיקה אם הלחיצה על השרביט
function mousePressed() {
  let wandTipX = width/2 + 50;
  let wandTipY = height/2 - 10;
  
  // בדיקה אם הלחיצה קרובה לכוכב בקצה השרביט
  let d = dist(mouseX, mouseY, wandTipX, wandTipY);
  
  if (d < 30) {
    // יצירת נצנצים חדשים
    createSparkles(wandTipX, wandTipY, 30);
  } else {
    // אם לא לחצו על השרביט, רק משנים את צבע הכנפיים
    colorIndex = (colorIndex + 1) % wingColors.length;
    wingColor = wingColors[colorIndex];
  }
}

// יצירת נצנצים חדשים
function createSparkles(x, y, count) {
  for (let i = 0; i < count; i++) {
    let angle = random(TWO_PI);
    let speed = random(1, 5);
    
    sparkles.push({
      x: x,
      y: y,
      size: random(3, 10),
      alpha: 255,
      speedX: cos(angle) * speed,
      speedY: sin(angle) * speed,
      color: color(
        random(150, 255), // אדום
        random(150, 255), // ירוק
        random(200, 255), // כחול - קצת יותר כדי שהנצנצים יהיו נוטים לכחול
        255
      )
    });
  }
}