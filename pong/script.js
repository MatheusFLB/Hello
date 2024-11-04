document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const menu = document.getElementById("menu");
    const gameArea = document.getElementById("gameArea");
    const pongCanvas = document.getElementById("pongCanvas");
    const playerScoreElem = document.getElementById("playerScore");
    const computerScoreElem = document.getElementById("computerScore");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const winSound = document.getElementById("winSound");
    const loseSound = document.getElementById("loseSound");

    const canvasContext = pongCanvas.getContext("2d");

    let playerScore = 0;
    let computerScore = 0;
    const winningScore = 5;

    const paddleWidth = 10;
    const paddleHeight = 100;
    let playerPaddleY = pongCanvas.height / 2 - paddleHeight / 2;
    let computerPaddleY = pongCanvas.height / 2 - paddleHeight / 2;

    let ballX = pongCanvas.width / 2;
    let ballY = pongCanvas.height / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 5;
    const ballRadius = 10;

    startButton.addEventListener("click", startGame);
    pongCanvas.addEventListener("mousemove", movePlayerPaddle);
    pongCanvas.addEventListener("touchmove", movePlayerPaddleTouch);

    function startGame() {
        menu.classList.add("hidden");
        gameArea.classList.remove("hidden");
        backgroundMusic.play();
        gameLoop();
    }

    function gameLoop() {
        moveEverything();
        drawEverything();
        if (playerScore < winningScore && computerScore < winningScore) {
            requestAnimationFrame(gameLoop);
        } else {
            backgroundMusic.pause();
            if (playerScore === winningScore) {
                winSound.play();
                alert("Você venceu!");
            } else {
                loseSound.play();
                showLoseMessage();
            }
            resetGame();
        }
    }
    
    function showLoseMessage() {
        const messageElem = document.getElementById("message");
        messageElem.classList.remove("hidden");
        setTimeout(() => {
            messageElem.classList.add("hidden");
        }, 2000); // Esconde a mensagem após 2 segundos
    }
    

    function moveEverything() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY < 0 || ballY > pongCanvas.height) {
            ballSpeedY = -ballSpeedY;
        }

        if (ballX < paddleWidth) {
            if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else {
                computerScore++;
                resetBall();
            }
        }

        if (ballX > pongCanvas.width - paddleWidth) {
            if (ballY > computerPaddleY && ballY < computerPaddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else {
                playerScore++;
                resetBall();
            }
        }

        computerPaddleY = ballY - paddleHeight / 2;
    }

    function drawEverything() {
        canvasContext.clearRect(0, 0, pongCanvas.width, pongCanvas.height);
        drawRect(0, playerPaddleY, paddleWidth, paddleHeight, "white");
        drawRect(pongCanvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight, "white");
        drawBall(ballX, ballY, ballRadius, "white");
        playerScoreElem.textContent = playerScore;
        computerScoreElem.textContent = computerScore;
    }

    function drawRect(leftX, topY, width, height, color) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(leftX, topY, width, height);
    }

    function drawBall(centerX, centerY, radius, color) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    }

    function movePlayerPaddle(evt) {
        const rect = pongCanvas.getBoundingClientRect();
        playerPaddleY = evt.clientY - rect.top - paddleHeight / 2;
    }

    function movePlayerPaddleTouch(evt) {
        const rect = pongCanvas.getBoundingClientRect();
        playerPaddleY = evt.touches[0].clientY - rect.top - paddleHeight / 2;
    }

    function resetBall() {
        ballX = pongCanvas.width / 2;
        ballY = pongCanvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        resetBall();
        menu.classList.remove("hidden");
        gameArea.classList.add("hidden");
    }
});
