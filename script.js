//Game Constants & Variables
let inputDir = {x: 0, y: 0};
let foodSound = new Audio('music/food.wav');
let overSound = new Audio('music/over.wav');
let musicSound = new Audio('music/music.mp3');
let moveSound = new Audio('music/turn.wav');
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y:7};

//Game Functions
function main(currenttime){
    window.requestAnimationFrame(main);
    // console.log(currenttime)
    if((currenttime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currenttime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into youself
    for(let index = 1; index <snakeArr.length; index++){
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    //If you bumb into the wall
    if(snake[0].x >=20 || snake[0].x <=0 || snake[0].y >=20 || snake[0].y <=0){
        return true;
    }
}

function gameEngine(){
    musicSound.play();
    // part 1: Updating the snake array & food
    if(isCollide(snakeArr)){
        overSound.play();
        musicSound.pause();
        inputDir={x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score +=1;
        
        scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }

    //move the snake
    for(let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2: Display the snake and food 

    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);

    })
    
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);



}


//Main logic starts here
// musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log('ArrowUp')
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log('ArrowUDown')
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        
        case "ArrowLeft":
            console.log('ArrowLeft')
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log('ArrowRight')
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
}
});
