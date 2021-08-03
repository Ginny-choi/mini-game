'use strict';

const playBtn = document.querySelector('.play-btn');
const playicon = document.querySelector('.play-btn i');
const timer = document.querySelector('.timer-btn');
const count = document.querySelector('.count-btn');
const gameField = document.querySelector('.game-field');
const popUp = document.querySelector('.popUp');
const replay = document.querySelector('.replay');

const bgsound = new Audio('./sound/bg.mp3');
const alert = new Audio('./sound/alert.wav');
const bugpull = new Audio('./sound/bug_pull.mp3');
const carrotpull = new Audio('./sound/carrot_pull.mp3');
const winsound = new Audio('./sound/game_win.mp3');

const Fieldrect = gameField.getBoundingClientRect();
const carrotSize = 80;
let carrotLength = 10;
const bugLength = 10;
let second = 10;

let started = false;
let timerset = undefined;
let countset = 0;

playBtn.addEventListener('click', () => {
    if(started){
        stopGame();       
        alert.play();
    }
    else {
        startGame();
    }
    started = !started;
});
replay.addEventListener('click', () => {
    // 당근 벌레 리셋, 타이머 리셋    
    started = true;
    playBtn.style.opacity = 1;
    carrotLength = 10;
    second = 10;
    startGame();    
});

function startGame(){
    //버튼 누르면 게임 시작. 1. 버튼 아이콘 변경 2. 당근 버그 셋팅 3. 카운트 타이머 생성 후 시작
    playicon.setAttribute('class','fas fa-stop');
    timer.style.opacity = '1';
    count.style.opacity = '1';
    initFn();
    bgsound.play();   
    countDownFn();
    popUp.classList.add('popup-hide');
    carrotClick();
    bugClick();
   
}
function stopGame(){
    //게임 중지. 1. 중지 아이콘 2. 타이머 중지 
    playicon.setAttribute('class','fas fa-play');
    clearInterval(setId);
    popUpFn('replay ?');
    bgsound. load();
  
}

function popUpFn(text){
    playBtn.style.opacity = 0;
    popUp.classList.remove('popup-hide');
    document.querySelector('.popup-msg').innerHTML = text;
}

function carrotClick(){
    const carrot = document.querySelectorAll('.carrot');  
    for(let i=0;i<carrotLength;i++){
        carrot[i].addEventListener('click', () => {
            carrotpull.play();
            carrot[i].remove();
            carrotLength--;
            count.innerHTML = carrotLength;
            if(carrotLength<=0){
                popUpFn('You win !');
                clearInterval(setId);
                 winsound.play();
                 bgsound.load();
            }   
        })
    }  
}
function bugClick(){
    const bug = document.querySelectorAll('.bug');
   for(let i=0;i<bugLength;i++){
       bug[i].addEventListener('click', () => {
        bugpull.play();
        bgsound. load();
        popUpFn('You Lost !');
        clearInterval(setId);
       })
   }
}

function countDownFn(){
   setId =  setInterval(timerFn,1000);
   timer.innerHTML = `0:${second}`;
}

function timerFn(){   
    second--;
    if(second <0){
        clearInterval(setId); 
        timer.innerHTML = `0:0`;     
        popUpFn('You Lost !');
        bgsound. load();
        return;
    }
    else{
        timer.innerHTML = `0:${second}`;        
    }
}

function initFn(){    
    gameField.innerHTML='';
    count.innerHTML = carrotLength;
    addItem('carrot',carrotLength,'./img/carrot.png');
    addItem('bug',bugLength,'./img/bug.png');   
   
}


function addItem(className,count,imgPath){
 const x1 = 0;
 const y1 = 0;
 const x2 = Fieldrect.width -carrotSize;
 const y2 = Fieldrect.height -carrotSize;

  for(let i=0;i<count;i++){
     const item = document.createElement('img');
     item.setAttribute('class',className);
     item.setAttribute('src',imgPath);
     const x = randomNum(x1,x2);
     const y = randomNum(y1,y2);
     item.style.transform = `translate(${x}px,${y}px)`;
     gameField.appendChild(item);
 } 
}

function randomNum(min, max){
    return Math.random() * (max - min) + min; 
}
