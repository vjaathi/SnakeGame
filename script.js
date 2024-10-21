
const playBord = document.querySelector('.play-bord');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.high-score');

let foodX , foodY ;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let valacityX = 0, valacityY = 0;
let gameOver = false;
let setIntervalId;
let score = 0;

// geting high-score to local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreEl.innerText = `high-Score : ${highScore}`;


let foodPosition = () => {
    // passing a random 0-30 value of food positions
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

}


const  handleGameOver = () => {
    // clear tha timer and reoad the page on game over
    clearInterval(setIntervalId)
    alert('Game Over');
    location.reload()
}

const cheangeDirection = (e) => {
    // cheange velacity value based on key press
    if(e.key === 'ArrowUp' && valacityY != 1){
        valacityX = 0; 
        valacityY = -1;
    } else if(e.key === 'ArrowDown' && valacityY != -1){
        valacityX = 0;
        valacityY = 1;
    } else if(e.key === 'ArrowLeft' && valacityX != 1){
        valacityX = -1;
        valacityY = 0;
    } else if(e.key === 'ArrowRight' && valacityX != -1){
        valacityX = 1;
        valacityY = 0;
    }

    initGame()
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let foodMark = `<div class = 'food' style="grid-area: ${foodY} / ${foodX}"></div>` ;

// cheaking the snake hit the food 
    if(snakeX === foodX && snakeY === foodY){
        foodPosition();
        snakeBody.push(foodX,foodY);
        console.log(snakeBody);
        score+=5; //increse the score 5

        highScore = score >= highScore ? score : highScore ;
        localStorage.setItem("high-score", highScore);
        scoreEl.innerText = `score : ${score}`;
        
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        //shifting forward the elements of snake body by one
        snakeBody[i] = snakeBody[i-1];
        
    }

    snakeBody[0] = [snakeX,snakeY]  //setting first element of snake body to current snake position

// Updating the snake head possition current velcity
     snakeX += valacityX;
     snakeY += valacityY;

    //  Cheaking the snake's head is out of wall setting gameover 
     if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
     }

     for (let i = 0;i < snakeBody.length; i++) {
        // Adding div each part of snake body
     foodMark += `<div class = 'head' style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>` ;

    //  cheak snake hit the body game over true
     if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true;
     }
     }

    playBord.innerHTML = foodMark;
} 

;
foodPosition();
setIntervalId = setInterval(initGame, 150)

document.addEventListener('keydown', cheangeDirection)