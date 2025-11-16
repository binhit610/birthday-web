// === Nhập pass để mở quà ===
const openGiftBtn = document.getElementById("open-gift-btn");
const passPopup = document.getElementById("pass-popup");
const passInput = document.getElementById("pass-input");
const submitPass = document.getElementById("submit-pass");
const wrongPassPopup = document.getElementById("wrong-pass-popup");
const retryPass = document.getElementById("retry-pass");
const correctPass = "18112008";

// === Popup nhắc nhập pass khi để trống ===
const remindPopup = document.createElement("div");
remindPopup.classList.add("remind-popup");
remindPopup.innerHTML = `
  <h2>Nhập pass đi á 😆</h2>
  <button class="btn" id="remind-ok-btn">OK</button>
`;
document.body.appendChild(remindPopup);
document.getElementById("remind-ok-btn").addEventListener("click", () => {
  remindPopup.classList.remove("show");
  passPopup.classList.add("show");
});

// Bấm mở quà => hiện popup nhập pass
openGiftBtn.addEventListener("click", () => {
  passPopup.classList.add("show");
});

// Kiểm tra pass
submitPass.addEventListener("click", () => {
  const pass = passInput.value.trim();
  if(pass === ""){
    passPopup.classList.remove("show");
    remindPopup.classList.add("show");
  } else if(pass === correctPass){
    passPopup.classList.remove("show");
    showAgePopup();
  } else {
    passPopup.classList.remove("show");
    wrongPassPopup.classList.add("show");
    passInput.value = "";
  }
});

// Nhập lại pass
retryPass.addEventListener("click", () => {
  wrongPassPopup.classList.remove("show");
  passPopup.classList.add("show");
});

// === Popup tuổi thật ===
const agePopup = document.getElementById("guess-age-popup");
const correctAge = "17";

function showAgePopup(){
  agePopup.classList.add("show");
  agePopup.innerHTML = `
    <center><img src="https://i.pinimg.com/736x/aa/3a/dd/aa3add4a9fcb132c14ac9c6ede3baf7e.jpg" alt="Guess age" style="width: 120px;"/></center>
    <h2>Khai tuổi thật đi 🤨</h2>
    <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
      <button class="btn age-btn" data-age="16">16 tuổi</button>
      <button class="btn age-btn" data-age="17">17 tuổi</button>
      <button class="btn age-btn" data-age="18">18 tuổi</button>
    </div>
  `;

  const ageBtns = agePopup.querySelectorAll(".age-btn");
  ageBtns.forEach(btn => {
    btn.addEventListener("click", () => handleAgeSelection(btn.dataset.age));
  });
}

function handleAgeSelection(selected){
  if(selected === correctAge){
    agePopup.innerHTML = `
      <center><img src="https://i.pinimg.com/736x/47/c2/49/47c2493fecd4a231eddc88b69991cc27.jpg" alt="Congrats" style="width:140px;"/></center>
      <h2>Giỏi! Trung thực 😎</h2>
      <p>Bấm nút bên dưới để xem bất ngờ 🎉</p>
      <button class="btn" id="show-birthday">Zui zẻ không quạo</button>
    `;
    document.getElementById("show-birthday").addEventListener("click", () => {
      agePopup.classList.remove("show");
      startBirthdayPopup();
    });
  } else {
    agePopup.innerHTML = `
      <center><img src="https://i.pinimg.com/736x/81/f1/74/81f17472464b344c13286ef3ef2ab794.jpg" alt="Wrong" style="width:120px;"/></center>
      <h2>Ủa là sao dị bà? 😤</h2>
      <p>Chọn lại đi á nhenn 🫣</p>
      <button class="btn" id="retry-age">Đoán lại</button>
    `;
    document.getElementById("retry-age").addEventListener("click", showAgePopup);
  }
}

// === Popup quà sinh nhật & Fireworks ===
const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("close-popup-btn");
const typingTextElem = document.getElementById("typing-text");
const messages = [
  "Sinh nhật dui dẻ nha bà, yêu thươngg lắm mới chúc á hahaha! 💝🎂.",
  "Mong sao tuổi mới Minh Thư sẽ mang đến thật nhiều hạnh phúc và sức khỏe dồi dào! 🎉✨.",
  "Chúc sao cho emm luôn thành công trong học tập nữa nè, làm gì cũng thuận lợi thii điểm caoo nhaa 🥰🍀.",
  "Thêm một tuổi mới, chúc sao cho em luôn dui dẻ bên bạn bè, gia đình và người mà luôn yêu thương 🤗💞.",
  "Đâyy là món quà nhỏ anh dành cho emm mong em thích nó,với lại đừng có bơ anhh nữa nhenn  hiha..",
  "Hãy tận hưởng ngày đặc biệt này với thật nhiều niềm vui và tiếng cười nhé! ❤️🎈"
];
let msgIndex = 0, charIndex = 0, typingTimeout;

// Khi typing thư xong mới show ảnh góc phải
function typeMessage(){
  if(msgIndex >= messages.length) {
    document.getElementById("corner-surprise").classList.add("show");
    return;
  }

  const currentMsg = messages[msgIndex];
  if(charIndex < currentMsg.length){
    typingTextElem.textContent += currentMsg.charAt(charIndex);
    charIndex++;
    typingTimeout = setTimeout(typeMessage, 50);
  } else {
    typingTimeout = setTimeout(()=> {
      typingTextElem.textContent += "\n\n";
      msgIndex++;
      charIndex = 0;
      typeMessage();
    }, 1000);
  }
}


function startTyping(){
  clearTimeout(typingTimeout);
  typingTextElem.textContent = "";
  msgIndex=0; charIndex=0;
  typeMessage();
}

// === Fireworks ===
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let fireworks=[], particles=[], animationFrameId;

class Firework{
  constructor(sx,sy,tx,ty){
    this.x=sx; this.y=sy; this.sx=sx; this.sy=sy; this.tx=tx; this.ty=ty;
    this.distanceToTarget=distance(sx,sy,tx,ty);
    this.distanceTraveled=0; this.coordinates=[]; this.coordinateCount=3;
    while(this.coordinateCount--) this.coordinates.push([this.x,this.y]);
    this.angle=Math.atan2(ty-sy,tx-sx); this.speed=5; this.acceleration=1.05;
    this.brightness=random(50,70); this.targetRadius=8;
  }
  update(index){
    this.coordinates.pop(); this.coordinates.unshift([this.x,this.y]);
    if(this.targetRadius<8) this.targetRadius+=0.3;
    this.speed*=this.acceleration;
    let vx=Math.cos(this.angle)*this.speed;
    let vy=Math.sin(this.angle)*this.speed;
    this.distanceTraveled=distance(this.sx,this.sy,this.x+vx,this.y+vy);
    if(this.distanceTraveled>=this.distanceToTarget){
      createParticles(this.tx,this.ty);
      fireworks.splice(index,1);
    } else { this.x+=vx; this.y+=vy; }
  }
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length-1][0],this.coordinates[this.coordinates.length-1][1]);
    ctx.lineTo(this.x,this.y);
    ctx.strokeStyle=`hsl(${random(0,360)},100%,${this.brightness}%)`;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.tx,this.ty,this.targetRadius,0,Math.PI*2);
    ctx.stroke();
  }
}

class Particle{
  constructor(x,y){
    this.x=x; this.y=y; this.coordinates=[]; this.coordinateCount=5;
    while(this.coordinateCount--) this.coordinates.push([this.x,this.y]);
    this.angle=random(0,Math.PI*2); this.speed=random(1,10); this.friction=0.95;
    this.gravity=0.7; this.hue=random(0,360); this.brightness=random(50,80);
    this.alpha=1; this.decay=random(0.015,0.03);
  }
  update(index){
    this.coordinates.pop(); this.coordinates.unshift([this.x,this.y]);
    this.speed*=this.friction; this.x+=Math.cos(this.angle)*this.speed;
    this.y+=Math.sin(this.angle)*this.speed+this.gravity;
    this.alpha-=this.decay;
    if(this.alpha<=0) particles.splice(index,1);
  }
  draw(){
    ctx.beginPath();
    ctx.moveTo(this.coordinates[this.coordinates.length-1][0],this.coordinates[this.coordinates.length-1][1]);
    ctx.lineTo(this.x,this.y);
    ctx.strokeStyle=`hsla(${this.hue},100%,${this.brightness}%,${this.alpha})`;
    ctx.stroke();
  }
}

function createParticles(x,y){
  let particleCount=30;
  while(particleCount--) particles.push(new Particle(x,y));
}

function distance(aX,aY,bX,bY){return Math.sqrt((bX-aX)**2+(bY-aY)**2);}
function random(min,max){return Math.random()*(max-min)+min;}

function loop(){
  animationFrameId=requestAnimationFrame(loop);
  ctx.globalCompositeOperation='destination-out';
  ctx.fillStyle='rgba(0,0,0,0.2)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation='lighter';
  let i=fireworks.length;
  while(i--){fireworks[i].draw(); fireworks[i].update(i);}
  i=particles.length;
  while(i--){particles[i].draw(); particles[i].update(i);}
  if(fireworks.length<5){
    fireworks.push(new Firework(canvas.width/2,canvas.height,random(100,canvas.width-100),random(50,canvas.height/2)));
  }
}

function startFireworks(){
  animationFrameId=null;
  loop();
}
function stopFireworks(){ cancelAnimationFrame(animationFrameId); animationFrameId=null; fireworks=[]; particles=[]; ctx.clearRect(0,0,canvas.width,canvas.height);}
window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });

// === Music & Mode ===
const modeToggleBtn = document.getElementById("mode-toggle");
const musicBtn = document.getElementById("music-btn");
const music = document.getElementById("bg-music");
let isPlaying=false;

window.addEventListener("load", ()=>{
  music.volume=0.2;
  const tryPlay=()=>{ music.play().then(()=>{ musicBtn.textContent="🔊"; isPlaying=true; }).catch(()=>{ musicBtn.textContent="🔇"; isPlaying=false; });};
  tryPlay();
  document.body.addEventListener("click", function once(){ if(!isPlaying) tryPlay(); document.body.removeEventListener("click",once); });
});

musicBtn.addEventListener("click", ()=>{
  if(isPlaying){ music.pause(); musicBtn.textContent="🔇"; } 
  else { music.play(); musicBtn.textContent="🔊"; }
  isPlaying=!isPlaying;
});

function updateModeIcon(){ modeToggleBtn.textContent=document.body.classList.contains("dark")?"☀️":"🌙"; }
modeToggleBtn.addEventListener("click",()=>{ document.body.classList.toggle("dark"); updateModeIcon(); });
updateModeIcon();

function createFallingEmoji(){
  const emojiList = ["🌸","🎉","🍰","💖","🥰","🎂","🍀"];
  
  const wrapper = document.createElement("div"); // wrapper để rơi
  wrapper.style.position = "fixed";
  wrapper.style.top = "-50px";
  wrapper.style.left = Math.random() * 100 + "vw";
  wrapper.style.pointerEvents = "none";
  wrapper.style.zIndex = "9999";
  wrapper.style.fontSize = (Math.random()*24 + 24) + "px";
  wrapper.style.opacity = (Math.random()*0.6 + 0.4);

  const emoji = document.createElement("div"); // emoji riêng để xoay
  emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
  emoji.style.display = "inline-block";
  emoji.style.animation = `rotateEmoji ${Math.random()*2+2}s linear infinite`;

  wrapper.appendChild(emoji);
  document.body.appendChild(wrapper);

  // Rơi bằng JS (tự động update top)
  let top = -50;
  const fallDuration = Math.random()*4000+4000; // 4→8s
  const interval = 16; // ~60fps
  const step = (window.innerHeight + 100) / (fallDuration/interval); 
  const fallInterval = setInterval(()=>{
    top += step;
    wrapper.style.top = top + "px";
    if(top > window.innerHeight + 50){
      clearInterval(fallInterval);
      wrapper.remove();
    }
  }, interval);
}

// Tạo emoji mỗi 300ms
setInterval(createFallingEmoji, 300);



// === Exit button ===
const exitBtn = document.getElementById("exit-btn");
const exitPopup = document.getElementById("exit-popup");
const closeExitBtn = document.getElementById("close-exit-btn");
let moveCount = 0, maxMoves=2;

exitBtn.addEventListener("click", ()=>{ exitPopup.classList.add("show"); });
closeExitBtn.addEventListener("click", ()=>{ exitPopup.classList.remove("show"); });

exitBtn.addEventListener("mouseover", ()=>{
  if(moveCount<maxMoves){
    const x=Math.floor(Math.random()*(window.innerWidth-150));
    const y=Math.floor(Math.random()*(window.innerHeight-100));
    exitBtn.style.position="absolute";
    exitBtn.style.left=`${x}px`; exitBtn.style.top=`${y}px`;
    moveCount++;
  }
});

closePopupBtn.addEventListener("click", ()=>{ popup.classList.remove("show"); stopFireworks(); moveCount=0; });

// === Start popup quà sinh nhật ===
function startBirthdayPopup(){
  popup.classList.add("show");
  startTyping();
  startFireworks();
}


