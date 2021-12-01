// -------- Shapes -------- //

const Tshape = 
    [[sp, sp-1+row, sp+row, sp+1+row],
     [sp, sp-1+row, sp+row, sp+2*row],
     [sp-1+row, sp +row, sp+1+row, sp+2*row],
     [sp, sp+row, sp+1+row, sp+2*row]
    ];

const Oshape = 
    [[sp, sp+1, sp+row, sp+1+row],
    [sp, sp+1, sp+row, sp+1+row],
    [sp, sp+1, sp+row, sp+1+row],
    [sp, sp+1, sp+row, sp+1+row]
    ];

const Lshape = 
    [[sp+1, sp+1+row, sp+row, sp-1+row],
    [sp-1, sp, sp+row, sp+2*row],
    [sp-1+row, sp+row, sp+1+row, sp-1+2*row],
    [sp, sp+row, sp+2*row, sp+1+2*row]
    ];

const Ishape = 
    [[sp-1+row, sp+row, sp+1+row, sp+2+row],
    [sp, sp+row, sp+2*row, sp+3*row],
    [sp-1+row, sp+row, sp+1+row, sp+2+row],
    [sp, sp+row, sp+2*row, sp+3*row]
    ];

const Jshape = 
    [[sp, sp+row, sp+1+row, sp+2+row],
    [sp+1, sp+2, sp+1+row, sp+1+2*row],
    [sp+row, sp+1+row, sp+2+row, sp+2+2*row],
    [sp+1, sp+1+row, sp+2*row, sp+1+2*row]
    ];

const Sshape = 
    [[sp, sp+1, sp-1+row, sp+row],
    [sp, sp+row, sp+1+row, sp+1+2*row],
    [sp, sp+1, sp-1+row, sp+row],
    [sp, sp+row, sp+1+row, sp+1+2*row]
    ];

const Zshape = 
    [[sp-1, sp, sp+row, sp+1+row],
    [sp+1, sp+row, sp+1+row, sp+2*row],
    [sp-1, sp, sp+row, sp+1+row],
    [sp+1, sp+row, sp+1+row, sp+2*row]
    ];

const shapes = 
    [Tshape, Oshape, Lshape, Ishape, Jshape, Sshape, Zshape];


// -------- FONCTIONS -------- //

function start(){
    startScreen.style.display = 'none';
    swapPossible = true; 
    gameStarted = true;

    generateShapes();
    drawShape();
    placeOnTop();
    displayNextShapes();
    timer = setInterval(run, 1000/level);

    (music) ? song.play() : null;
}

function run(){

    // The piece goes down
    if(checkIfPossible('down'))
    {
        undrawShape();
        currentShape = currentShape.map(element => element.map(x => x + row));
        drawShape();
    }
    //The piece stops
    else{
        clearInterval(timer);

        // The piece fits : new round
        if (checkIfPossible('draw')){  
            currentShape[currentRotation].forEach(el => {
                squares[el].classList.add('busy');
            })
            searchCompletedLine();
            nextShapes.shift();
            start();
        }
        // The piece doesn't fit : game over
        else  {
            gameOver();
        }
    }
}

function generateShapes(){

    // Generates 5 shapes each round but keeps the shapes that haven't been played yet
    for (let i = nextShapes.length ; i < 5; i++){
        let rand = Math.floor(Math.random()*shapes.length);
        let randRotation = Math.floor(Math.random()*4)
        nextShapes.push(
            {
            'shape' : shapes[rand], 'rotation' : randRotation,
            'color' : colors[rand]
            });
    }

    //CurrentShape is always the first one in the list
    currentShape = nextShapes[0].shape;
    currentRotation = nextShapes[0].rotation;
}

function drawShape(){
    currentShape[currentRotation].forEach(el => {
        squares[el].classList.add(nextShapes[0].color)
    }); 
}

function undrawShape(){
    currentShape[currentRotation].forEach(el => {
        squares[el].classList.remove(nextShapes[0].color);
    });
}

function placeOnTop(){
    while(checkIfPossible('up')){
        undrawShape();
        currentShape = currentShape.map(element => element.map(x => x - row));
        drawShape();
    };
}

function displayNextShapes(){

    //Cleans the grid
    for (let square of previewGrid){
        square.removeAttribute('class');
    }

    //Displays the shapes
    for(let i=1 ; i<nextShapes.length ; i++)
    {
        //To simplify display, all shapes are previewed in their first rotation
        let shape = nextShapes[i].shape[0];
        let color = nextShapes[i].color;

        for (let el of shape){
            // Translates from base 10 to base 4 
            // (preview grid and play grid don't have the same dimensions)
            if (el<10){
                previewGrid[el-3 +(i-1)*12].classList.add(color);
            }
            if (el >= 10){
                previewGrid[el-9+(i-1)*12].classList.add(color);
            }
        }
    }
}

function displayShapeOnHold(){

    //Cleans
    for (let square of holdGrid){
        square.removeAttribute('class');
    }

    //Display
    shapeOnHold.shape[0].forEach(el => {
        if (el<10){
            holdGrid[el-3].classList.add(shapeOnHold.color);
        }
        if (el >= 10){
            holdGrid[el-9].classList.add(shapeOnHold.color);
        }
    }); 
}

function moveShape(e){

    e.preventDefault();

    if (paused == false){

        //Left
        if (e.keyCode == 37) {
    
            if(checkIfPossible('left')){
                undrawShape();
                currentShape = currentShape.map(element => element.map(x => x - 1));
                drawShape();
            }

            (soundEffect)? moveSFX.play() : null;
        }
    
        //Right
        if (e.keyCode == 39) {
    
            if (checkIfPossible('right')){
                undrawShape();
                currentShape = currentShape.map(element => element.map(x => x + 1));
                drawShape();
            }

            (soundEffect) ? moveSFX.play() : null;
        }
    
        //Down
        if (e.keyCode == 40) {
    
            if (checkIfPossible('down')){
                undrawShape();
                currentShape = currentShape.map(element => element.map(x => x + row));
                drawShape();
            }

            (soundEffect) ? moveSFX.play() : null;
        }
    
        //Up : rotate
        if (e.keyCode == 38) {
    
            if (checkIfPossible('rotate')){
                undrawShape();
                currentRotation = (currentRotation+1)%4;
                drawShape(); 
            }

            (soundEffect) ? moveSFX.play() : null;
        }
    
        // Spacebar : all down
        if(e.keyCode == 32){
            while (checkIfPossible('down'))
            {
                undrawShape();
                currentShape = currentShape.map(element => element.map(x => x + row));
                drawShape();
            }

            (soundEffect) ? dropSFX.play() : null;
        }
    }
}

function swapShape(e){

    if (e.keyCode == 83){
        
        if (swapPossible){
            undrawShape();
            if(shapeOnHold){
                let pieceToSwap = {
                    'shape' : nextShapes[0].shape,
                    'rotation' : nextShapes[0].rotation,
                    'color' : nextShapes[0].color
                }
    
                nextShapes.shift();
                nextShapes.unshift(shapeOnHold);
                shapeOnHold = pieceToSwap;
            }
            else {
                shapeOnHold = 
                    {
                        'shape' : nextShapes[0].shape,
                        'rotation' : nextShapes[0].rotation,
                        'color' : nextShapes[0].color
                    };
                
                nextShapes.shift();
            }
    
            generateShapes();
            drawShape();   
            displayNextShapes();
            displayShapeOnHold();
            swapPossible = false;

            (soundEffect) ? holdSFX.play() : null;
        }
    }
}

function checkIfPossible(move){

    let isPossible = true;

    switch (move) {
        case 'draw' : 
            currentShape[currentRotation].forEach(el => {
                if (squares[el].classList.contains('busy')){
                    isPossible = false;
                }
            });
            break;
        case 'up': 
            currentShape[currentRotation].forEach(el => {
                if (el<=9){
                    isPossible = false;
                }
            });
            break;
        case 'left':
            currentShape[currentRotation].forEach(el => {
                if (el%10 == 0 || squares[el-1].classList.contains('busy')){
                    isPossible = false;
                }
            });
            break;
    
        case 'right': 
            currentShape[currentRotation].forEach(el => {
                if (el%10 == 9 || squares[el+1].classList.contains('busy')){
                    isPossible = false;
                } 
            });
            break;
        
        case 'down' :
            currentShape[currentRotation].forEach(el => {
                if (!squares[el+row] || squares[el+row].classList.contains('busy')){
                   isPossible = false;
                   
               } 
            });
            break;
        
        case 'rotate': 
            currentShape[(currentRotation+1)%4].forEach(el => {
                if (el > 200 || el<0 || (el%10 == 9) || squares[el].classList.contains('busy'))
                {
                    isPossible = false;
                }                
            });
            break;
    }

    return isPossible;
}

function searchCompletedLine(){

    let isCompleted = true;
    let completedLines = [];

    //Scan each row 
    for (let rowStart = 0; rowStart <=190; rowStart += 10){
        for (let j = rowStart; j <= rowStart + 9; j++)
        {
            if(!squares[j].classList.contains('busy')){
                isCompleted = false;
            }
        }
        if (isCompleted){
            completedLines.push(rowStart/10);
        }
        isCompleted = true;
    }
      
    //Reset Animation
    for (let el of squares){
        el.classList.remove('linebreak');
    }

    if (completedLines.length > 0){
        for (let line of completedLines)
        {
            //Suppress completed lines
            for (let a = line*row; a < line*row+row; a++){
                squares[a].removeAttribute('class');
                //add animation
                squares[a].classList.add('linebreak');
            }

            //Move down all lines above
            for (let b = line*row; b >=0; b--){
                if(squares[b].classList.contains('busy')){
                    for (let className of squares[b].classList)
                    {
                        squares[b+row].classList.add(className);
                    }
                    squares[b].removeAttribute('class');
                }
            }

            //Sound effect 
            (soundEffect) ? lineBreakSFX.play() : null;

            //Updates score
            nbrOfLinesCompleted ++; 
            level = Math.floor(nbrOfLinesCompleted/10) +1;
            updateScore();
        }
    }

    //Reset
    completedLines = [];
}

function togglePlayPause(){

    if (paused == false) {
        clearInterval(timer);
        pauseBtn.innerHTML = 
        `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
        </svg>`
        pauseBtn.nextElementSibling.textContent = 'resume';
        pauseScreen.style.display = 'flex';

        (music) ? song.pause() : null;

        paused = true;
    }
    else {
        timer = setInterval(run, 1000/level);
        pauseBtn.innerHTML = 
        `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
        </svg>`;
        pauseBtn.nextElementSibling.textContent = 'pause';
        pauseScreen.style.display = 'none';

        (music ) ? song.play() : null;

        paused = false;
    }
}

function updateScore(){
    linesDisplay.textContent = nbrOfLinesCompleted;
    levelDisplay.textContent = level;
}

function gameOver(){
    gameOverDisplay.style.display = 'flex';
    gameStarted = false;
    (music) ? song.pause() : null;
    (soundEffect) ? gameOverSFX.play() : null;
}

function playAgain(){

    //Resets variables
    level               = 1;
    nextShapes          = [];
    nbrOfLinesCompleted = 0;
    paused              = false;
    swapPossible        = true;
    shapeOnHold         = '';
    song.currentTime    = 0;

    //Cleans score 
    updateScore()

    //Cleans all the grids
    for(let square of squares){
        square.removeAttribute('class');
    }

    for (let square of previewGrid){
        square.removeAttribute('class');
    }

    for (let square of holdGrid){
        square.removeAttribute('class');
    }

    //Removes GameOver Modal
    gameOverDisplay.style.display = 'none';
    
    start();
}

// ----- EVENTS
window.addEventListener('keydown', moveShape);
window.addEventListener('keydown', swapShape);
pauseBtn.addEventListener('click', togglePlayPause);
playAgainBtn.addEventListener('click', playAgain);
startBtn.addEventListener('click', start);
