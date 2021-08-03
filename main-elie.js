const playBtn = document.querySelector('.play-btn');
const playicon = document.querySelector('.play-btn i');
const timer = document.querySelector('.timer-btn');
const count = document.querySelector('.count-btn');
const gameField = document.querySelector('.game-field');
const popUp = document.querySelector('.popUp');
const replay = document.querySelector('.replay');


const Fieldrect = gameField.getBoundingClientRect();
const carrotSize = 80;
const carrotLength = 5;
const bugLength = 5;

const carrotSound = new Audio('./sound/carrot_pull.mp3')
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let timerset = undefined;
let score = 0;

const game_duration_sec = 5;

gameField.addEventListener('click', onFieldClick);

playBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    }
    else {
        startGame();
    }
   
});
replay.addEventListener('click', () => {
    // 당근 벌레 리셋, 타이머 리셋          
    playBtn.style.visibility = 'visible';
    startGame();    

});
function startGame(){
    started = true;
    //버튼 누르면 게임 시작. 1. 버튼 아이콘 변경 2. 당근 버그 셋팅 3. 카운트 타이머 생성 후 시작
    playicon.setAttribute('class','fas fa-stop');
    viewOptionButton();
    initFn();       
    startGameTimer();
    popUp.classList.add('popup-hide');    
    playSound(bgSound);

}
function stopGame(){ 
    started = false;
    stopGameTimer();
    hideGameButton();
    popUpFn('replay ?');
    playSound(alertSound);
    stopSound(bgSound);
}


function finishGame(win){
    started = false;
    hideGameButton();
    stopGameTimer();
    if(win){
        playSound(winSound);
    }
    else{
        playSound(bugSound);
    }
    stopSound(bgSound);
    popUpFn(win? 'You Won' : 'You Lost');
}

function viewOptionButton(){
    timer.style.opacity = '1';
    count.style.opacity = '1';
}
function stopGameTimer(){
    clearInterval(timerset);
}
function startGameTimer(){
    let remainingTimeSec = game_duration_sec;
    undateTimerText(remainingTimeSec);
    timerset = setInterval( () => {
        if(remainingTimeSec <= 0) {
            clearInterval(timerset);
            finishGame(score === carrotLength);
           return;
        }
        else {
            undateTimerText(--remainingTimeSec);            
        }
    },1000);
}
function stopSound(sound){
    sound.pause();
}
function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}
function undateTimerText(time){
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    timer.innerText = `${minutes}:${seconds}`;    
}
function hideGameButton(){
    playBtn.style.visibility = 'hidden';
}

function popUpFn(text){  
    popUp.classList.remove('popup-hide');
    document.querySelector('.popup-msg').innerHTML = text;
}

function onFieldClick(event) {
    if(!started){
        return;
    }
    const target = event.target;    
    if(target.matches('.carrot')){
        target.remove();
        score++;
        updataScoreBoard();
        playSound(carrotSound);
        if(score === carrotLength){
            finishGame(true);
        }
    }
    else if(target.matches('.bug')){        
        finishGame(false);
    }
}


function updataScoreBoard(){
    count.innerText = carrotLength - score;
}

function initFn(){   
    score=0; 
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
