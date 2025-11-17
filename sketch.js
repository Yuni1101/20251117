let objs = [];

let colors = ['#52489c', '#4062bb', '#59c3c3', '#ebebeb', '#f45b69', '#454545'];

// ===== 載入動畫相關變數 =====
let loadingComplete = false;
let welcomeStarted = false;
let canvasReady = false;

// 初始化載入動畫
function initLoadingAnimation() {
  executeLoadingSequence();
}

// 執行載入序列
async function executeLoadingSequence() {
  const terminalContent = document.querySelector('.terminal-content');
  const terminalText = document.getElementById('terminal-text');
  
  // 第一步：顯示 "Loading profile..."
  await typeText('Loading profile...', 80);
  await new Promise(resolve => setTimeout(resolve, 2000)); // 等待 2 秒
  
  // Loading profile 消失
  terminalText.textContent = '';
  
  // 第二步：顯示 "School：淡江大學"，然後淡出
  const schoolDiv = document.createElement('div');
  schoolDiv.className = 'fade-line';
  schoolDiv.textContent = 'School：淡江大學';
  schoolDiv.style.textAlign = 'center';
  terminalContent.appendChild(schoolDiv);
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // 顯示 2 秒
  
  // 淡出 School 行
  schoolDiv.style.opacity = '0';
  schoolDiv.style.transition = 'opacity 1.2s ease-out';
  await new Promise(resolve => setTimeout(resolve, 1200)); // 等待淡出完成
  schoolDiv.remove(); // 移除元素
  
  // 第三步：顯示 "Department：教育科技學系"，然後淡出
  const deptDiv = document.createElement('div');
  deptDiv.className = 'fade-line';
  deptDiv.textContent = 'Department：教育科技學系';
  deptDiv.style.textAlign = 'center';
  terminalContent.appendChild(deptDiv);
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // 顯示 2 秒
  
  // 淡出 Department 行
  deptDiv.style.opacity = '0';
  deptDiv.style.transition = 'opacity 1.2s ease-out';
  await new Promise(resolve => setTimeout(resolve, 1200)); // 等待淡出完成
  deptDiv.remove(); // 移除元素
  
  // 第四步：顯示 "Name：414730225 陳怜安"，然後淡出
  const nameDiv = document.createElement('div');
  nameDiv.className = 'fade-line';
  nameDiv.textContent = 'Name：414730225 陳怜安';
  nameDiv.style.textAlign = 'center';
  nameDiv.style.fontSize = '38px';
  terminalContent.appendChild(nameDiv);
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // 顯示 2 秒
  
  // 淡出 Name 行
  nameDiv.style.opacity = '0';
  nameDiv.style.transition = 'opacity 1.2s ease-out';
  await new Promise(resolve => setTimeout(resolve, 1200)); // 等待淡出完成
  nameDiv.remove(); // 移除元素
  
  // 第五步：顯示 "System ready..."，然後淡出
  const systemDiv = document.createElement('div');
  systemDiv.className = 'fade-line';
  systemDiv.textContent = 'System ready...';
  systemDiv.style.textAlign = 'center';
  terminalContent.appendChild(systemDiv);
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // 顯示 2 秒
  
  // 淡出 System 行
  systemDiv.style.opacity = '0';
  systemDiv.style.transition = 'opacity 1.2s ease-out';
  await new Promise(resolve => setTimeout(resolve, 1200)); // 等待淡出完成
  systemDiv.remove(); // 移除元素
  
  // 第六步：淡出黑色背景
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('fade-out');
  
  // 第七步：顯示歡迎畫面
  await new Promise(resolve => setTimeout(resolve, 1500));
  const welcomeScreen = document.getElementById('welcome-screen');
  welcomeScreen.classList.remove('hidden');
  
  loadingComplete = true;
}

// 逐字顯示文字的輔助函式
async function typeText(text, speed) {
  const terminalText = document.getElementById('terminal-text');
  for (let char of text) {
    terminalText.textContent += char;
    await new Promise(resolve => setTimeout(resolve, speed));
  }
  
  // 新增換行
  const newLine = document.createElement('div');
  terminalText.parentElement.appendChild(newLine);
}

// ===== 選單相關變數 =====

let menuX = -300; // 選單初始位置（隱藏在左側）

let targetMenuX = -300; // 選單目標位置

let menuItems = ['第一單元作品', '第一單元講義', '期中考報告作品', '測驗系統', '淡江大學', '回到首頁'];

let menuItemsUrls = {

        '第一單元作品': 'https://yuni1101.github.io/20251020/',

        '第一單元講義': 'https://hackmd.io/@-OiUZIdpTwSic0xa3D86SA/r1ObwX0jgg',

        '期中考報告作品': 'https://hackmd.io/@-OiUZIdpTwSic0xa3D86SA/HJq-n6RJbl',

        '測驗系統': 'https://yuni1101.github.io/20251103--/',

        '淡江大學': 'https://www.tku.edu.tw/',

        '回到首頁': '',
        

};

let iframe;



function setup() {

    createCanvas(windowWidth, windowHeight);

    rectMode(CENTER);

    // 初始化載入動畫
    initLoadingAnimation();

    INIT();

}



// 全域 mouseClicked 回呼（放在外面，p5 能正確偵測）

function mouseClicked() {

    // 檢查是否點擊選單項目

    if (menuX > -290) {  // 當選單可見時

        for (let i = 0; i < menuItems.length; i++) {

            let menuItemY = 50 + i * 60;

            if (mouseX > menuX && mouseX < menuX + 280 &&

                mouseY > menuItemY && mouseY < menuItemY + 40) {



                // 取得點擊的項目
                let clickedItem = menuItems[i];
                let url = menuItemsUrls[clickedItem];

                // 顯示 iframe 並隱藏歡迎畫面
                const iframe = document.getElementById('content-frame');
                const welcomeScreen = document.getElementById('welcome-screen');
                if (clickedItem === '回到首頁') {
                    iframe.style.display = 'none';
                    iframe.src = '';
                } else {
                    iframe.style.display = 'block';
                    iframe.src = url;
                    iframe.style.zIndex = '99999';
                    if (welcomeScreen) welcomeScreen.style.display = 'none';
                }

                // 如果有對應的 URL 就在 iframe 顯示它

                if (url) {

                    iframe = document.getElementById('content-frame');

                    iframe.src = url;

                    iframe.style.display = 'block';

                } else if (clickedItem === '回到首頁') {

                    // 隱藏 iframe

                    iframe = document.getElementById('content-frame');

                    iframe.style.display = 'none';

                    iframe.src = '';

                }

            }

        }

    }

}



function windowResized() {

    resizeCanvas(windowWidth, windowHeight);

    INIT();

}



function draw() {

    background('#F5C969');

   

    // 繪製背景動畫

    for (let i of objs) {

        i.show();

        i.move();

    }



    if (frameCount % 95 == 0) {

        INIT();

    }

   

    // 檢查滑鼠位置並更新選單目標位置

    if (mouseX < 100) {

        targetMenuX = 0;

    } else {

        targetMenuX = -300;

    }

   

    // 平滑移動選單

    menuX = lerp(menuX, targetMenuX, 0.1);

   

    // 繪製選單背景

    push();

    rectMode(CORNER);

    fill(0, 0, 0, 200);

    noStroke();

    rect(menuX, 0, 300, height);

    pop();

   

    // 繪製選單項目

    push();

    textSize(32);

    textAlign(LEFT, TOP);

    fill(255);

    for (let i = 0; i < menuItems.length; i++) {

        text(menuItems[i], menuX + 20, 50 + i * 60);

    }

    pop();

}



function INIT() {

    objs = [];

    let num1 = int(random(3, 7));

    let num2 = int(random(40, 80));

    for (let i = 0; i < num1; i++) {

        objs.push(new OMP());

    }



    for (let i = 0; i < num2; i++) {

        objs.push(new SBM(i / 8));

    }

}



function easeOutQuart(x) {

    return 1 - Math.pow(1 - x, 4);

}



function easeInQuart(x) {

    return x * x * x * x;

}



class SBM {

    constructor(t) {

        this.x0 = 0;

        this.y0 = 0;

        this.r = random(0.4) * width;

        let a = random(10);

        this.x1 = this.r * cos(a);

        this.y1 = this.r * sin(a);

        this.x = this.x0;

        this.y = this.y0;

        this.d0 = 0;

        this.d1 = random(5, 40);

        this.d = 0;

        this.t = -int(t);

        this.t1 = 40;

        this.t2 = this.t1 + 0;

        this.t3 = this.t2 + 40;

        this.rot1 = PI * random(0.5);

        this.rot = random(10);

        this.col = random(colors);

        this.rnd = int(random(3));

    }



    show() {

        push();

        translate(width / 2, height / 2);

        rotate(this.rot);

        if (this.rnd == 0) {

            fill(this.col);

            strokeWeight(0);

            circle(this.x, this.y, this.d);

        } else if (this.rnd == 1) {

            fill(this.col);

            strokeWeight(0);

            rect(this.x, this.y, this.d, this.d);

        }

        else if (this.rnd == 2) {

            noFill();

            stroke(this.col);

            strokeWeight(this.d * 0.3);

            line(this.x - this.d *0.45, this.y - this.d *0.45, this.x + this.d *0.45, this.y + this.d *0.45);

            line(this.x - this.d *0.45, this.y + this.d *0.45, this.x + this.d *0.45, this.y - this.d *0.45);

        }

        pop();

    }



    move() {

        if (0 < this.t && this.t < this.t1) {

            let n = norm(this.t, 0, this.t1 - 1);

            this.x = lerp(this.x0, this.x1, easeOutQuart(n));

            this.y = lerp(this.y0, this.y1, easeOutQuart(n));

            this.d = lerp(this.d0, this.d1, easeOutQuart(n));



        } else if (this.t2 < this.t && this.t < this.t3) {

            let n = norm(this.t, this.t2, this.t3 - 1);

            this.x = lerp(this.x1, this.x0, easeInQuart(n));

            this.y = lerp(this.y1, this.y0, easeInQuart(n));

            this.d = lerp(this.d1, this.d0, easeInQuart(n));

        }

        this.t++;

        this.rot += 0.005;

    }

}



class OMP {

    constructor() {

        this.x = width / 2;

        this.y = height / 2;

        this.d = 0;

        this.d1 = width * random(0.1, 0.9) * random();



        this.t = -int(random(20));

        this.t1 = 40;

        this.t2 = this.t1 + 40;

        this.sw = 0;

        this.sw1 = this.d1 * random(0.05);

        this.col = random(colors);

    }



    show() {

        noFill();

        stroke(this.col);

        strokeWeight(this.sw);

        circle(this.x, this.y, this.d);

    }



    move() {

        if (0 < this.t && this.t < this.t1) {

            let n = norm(this.t, 0, this.t1 - 1);

            this.d = lerp(0, this.d1, easeOutQuart(n));

            this.sw = lerp(0, this.sw1, easeOutQuart(n));

        } else if (this.t1 < this.t && this.t < this.t2) {

            let n = norm(this.t, this.t1, this.t2 - 1);

            this.d = lerp(this.d1, 0, easeInQuart(n));

            this.sw = lerp(this.sw1, 0, easeInQuart(n));

        }

        this.t++;

    }

}