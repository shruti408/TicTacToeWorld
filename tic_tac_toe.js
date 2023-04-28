// declaring variables
const audioTurn = new Audio('audioForTurn.mp3');
const win_music = new Audio('success.mp3'); 

let btn0 = document.getElementById('0');
let btn1 = document.getElementById('1');
let btn2 = document.getElementById('2');
let btn3 = document.getElementById('3');
let btn4 = document.getElementById('4');
let btn5 = document.getElementById('5');
let btn6 = document.getElementById('6');
let btn7 = document.getElementById('7');
let btn8 = document.getElementById('8');

const arrayOfBtns = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8];

const arrayOfWins = [[btn0,btn1,btn2], [btn3,btn4,btn5], [btn6,btn7,btn8], [btn0,btn3,btn6], [btn1,btn4,btn7],[btn2,btn5,btn8], [btn0,btn4,btn8], [btn2,btn4,btn6]];

const arrayOfPos = [[btn0,btn1,btn2], [btn0,btn3,btn6], [btn1,btn4,btn7], [btn1,btn0,btn2],[btn2,btn0,btn1], [btn2,btn4,btn6], [btn2,btn5,btn8], [btn3,btn4,btn5], [btn3,btn0,btn6], [btn4,btn1,btn7], [btn4,btn3,btn5], [btn4,btn0,btn8], [btn4,btn2,btn6], [btn5,btn3,btn4], [btn5,btn2,btn8], [btn6,btn0,btn3], [btn6,btn2,btn4], [btn6,btn7,btn8], [btn7,btn1,btn4], [btn7,btn6,btn8], [btn8,btn2,btn5], [btn8,btn6,btn7], [btn8,btn0,btn4]];

// disable all btns 
function disable_btns(){
    arrayOfBtns.forEach((element) =>  {
        element.disabled = true;
    });
}
// enable all btns
function enable_btns(){
    arrayOfBtns.forEach((element) =>  {
        element.disabled = false;
    });
}
// to restart the game
function restart_game(){
    arrayOfBtns.forEach((element) => {
        element.innerText = ' ';
        element.style.backgroundColor = '#6c757d';
    })
    enable_btns();
}
// checking if "X" or "O" win the game 
function check_win(check){
    arrayOfWins.forEach( (element) => {
        if (element[0].innerHTML === check && element[1].innerHTML === check && element[2].innerHTML === check){
            // element.forEach((value) => {
                element[0].style.backgroundColor = 'rgb(14, 139, 87)';
                element[1].style.backgroundColor = 'rgb(14, 139, 87)';
                element[2].style.backgroundColor = 'rgb(14, 139, 87)';
            // })
            win_music.play();
            disable_btns();
            return;
        }
    });
}
// Playing cross and zero 
function play_game(btn){   
    // X's turn 
    let box = document.getElementById(btn);
    box.style.backgroundColor = 'rgb(222, 222, 22)';
    box.innerHTML ='X';
    audioTurn.currentTime = 0;
    audioTurn.play();
    box.disabled = true;
    check_win('X');
    // O's turn 
    if(box.style.backgroundColor != 'rgb(14, 139, 87)'){
        turnOfO();
    }  
}
// O's turn 
function turnOfO(){
    let turn = false;
    let boxForO;
    // checking if O is going to win 
    arrayOfPos.forEach((element) => {
        if(element[1].innerHTML === 'O' && element[2].innerHTML === 'O' && turn === false && element[0].innerHTML === ' '){
            boxForO = element[0];
            turn = true;
            return;
        }
    })
    if(turn === false){
        // checking if X is going to win 
        arrayOfPos.forEach((element) => {
            if(element[1].innerHTML === 'X' && element[2].innerHTML === 'X' && turn === false && element[0].innerHTML === ' '){
                boxForO = element[0];
                turn = true;
                return;
            }
        })
    }
    if(turn === false){
        // choosing any random spot
        let box_no = Math.floor(Math.random()*10);
        boxForO = document.getElementById(box_no);
        
        while( boxForO.innerHTML !== ' '){
            box_no = Math.floor(Math.random()*10);
            boxForO = document.getElementById(box_no);
        }  
    }
    boxForO.style.backgroundColor = 'rgba(241, 42, 42, 0.959)';
    boxForO.innerHTML ='O';
    boxForO.disabled = true;
    check_win('O');    
}