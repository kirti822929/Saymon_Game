//keypress then game starts
//btnflash+level 1
//game seq and user seq   game[yellow,blue] and user seq[]
//btn pressed by user is align the game sequence user<->game
//if sequence is same the levelup else gameover
//to track each and every button we track it by eventlistener
let gameSeq=[];//jo bhi random color generate hoga uskko game sequence m dalenge
let userSeq=[];
let btns=["yellow","red","purple","green"];//we can use random btns by
let started=false;
let level=0;
let highscore=1;
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game started");
        started=true;
        levelUp();
    }
});//first step completed
//randombutton flash and level update btn app.js se bhi flash hoga or jab user press krega button ko tab bhi flash hoga
function btnFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
},500);
}
function levelUp(){
    userSeq=[];
    level++;
    if(level>=highscore){
        highscore=level;
    }
    h2.innerText=`Level ${level}`;
//random button choosen by user
//0 se 3 tak ke index m random number nikalna h fir choose karna hai kisi color ko
let randomIdx=Math.floor(Math.random()*3);
let randomColor=btns[randomIdx];
let randomBtn=document.querySelector(`.${randomColor}`);
//console.log(randomIdx);
//console.log(randomColor);
//console.log(randomBtn);
gameSeq.push(randomColor);
console.log(gameSeq);
    btnFlash(randomBtn);
}

//now game waits that user will press same btn that was flash by game 

function checkAns(idx){
    //idx=level-1;
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML=`Game Over! your score was <b>${level}</b> <br> Press any key to start.`;
       h3.innerHTML=`highest Score=${highscore}`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        }, 1000);
        reset();
    }
}
function btnPress(){
    //console.log(this);
   let btn=this;
   btnFlash(btn);
   userColor=btn.getAttribute("id");
   userSeq.push(userColor);
  // console.log( userSeq);//now we need to check that seq entered by user is same as the game seq 
checkAns(userSeq.length-1);
}


let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}