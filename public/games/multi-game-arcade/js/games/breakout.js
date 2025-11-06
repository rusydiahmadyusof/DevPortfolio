// Breakout Game

class BreakoutGame {
    constructor(engine) {
        this.engine = engine;
        this.reset();
    }
    
    reset() {
        this.paddleWidth = 100;
        this.paddleHeight = 10;
        this.paddleSpeed = 0.5;
        this.paddleX = (this.engine.width - this.paddleWidth) / 2;
        this.paddleY = this.engine.height - 30;
        
        this.ballSize = 8;
        this.ballX = this.engine.width / 2;
        this.ballY = this.engine.height - 50;
        this.ballSpeedX = 0.25;
        this.ballSpeedY = -0.25;
        
        this.brickRows = 5;
        this.brickCols = 8;
        this.brickWidth = 80;
        this.brickHeight = 20;
        this.brickPadding = 5;
        this.brickOffsetTop = 50;
        this.brickOffsetLeft = (this.engine.width - (this.brickCols * (this.brickWidth + this.brickPadding) - this.brickPadding)) / 2;
        
        this.bricks = [];
        this.initBricks();
        
        this.score = 0;
        this.gameOver = false;
        this.gameWon = false;
    }
    
    initBricks() {
        this.bricks = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94'];
        for (let row = 0; row < this.brickRows; row++) {
            for (let col = 0; col < this.brickCols; col++) {
                this.bricks.push({
                    x: this.brickOffsetLeft + col * (this.brickWidth + this.brickPadding),
                    y: this.brickOffsetTop + row * (this.brickHeight + this.brickPadding),
                    width: this.brickWidth,
                    height: this.brickHeight,
                    color: colors[row % colors.length],
                    destroyed: false
                });
            }
        }
    }
    
    update(deltaTime) {
        if (this.gameOver || this.gameWon) return;
        
        // Paddle movement
        if (this.engine.isKeyPressed('arrowleft') || this.engine.isKeyPressed('a')) {
            this.paddleX -= this.paddleSpeed * deltaTime;
        }
        if (this.engine.isKeyPressed('arrowright') || this.engine.isKeyPressed('d')) {
            this.paddleX += this.paddleSpeed * deltaTime;
        }
        
        // Keep paddle in bounds
        this.paddleX = clamp(this.paddleX, 0, this.engine.width - this.paddleWidth);
        
        // Move ball
        this.ballX += this.ballSpeedX * deltaTime;
        this.ballY += this.ballSpeedY * deltaTime;
        
        // Ball collision with walls
        if (this.ballX <= 0 || this.ballX >= this.engine.width - this.ballSize) {
            this.ballSpeedX = -this.ballSpeedX;
            this.ballX = clamp(this.ballX, 0, this.engine.width - this.ballSize);
        }
        if (this.ballY <= 0) {
            this.ballSpeedY = -this.ballSpeedY;
            this.ballY = 0;
        }
        
        // Ball collision with paddle
        if (this.ballY + this.ballSize >= this.paddleY &&
            this.ballY <= this.paddleY + this.paddleHeight &&
            this.ballX + this.ballSize >= this.paddleX &&
            this.ballX <= this.paddleX + this.paddleWidth) {
            this.ballSpeedY = -Math.abs(this.ballSpeedY);
            // Add angle based on where ball hits paddle
            const hitPos = (this.ballX - this.paddleX) / this.paddleWidth;
            this.ballSpeedX = (hitPos - 0.5) * 0.5;
        }
        
        // Ball collision with bricks
        this.bricks.forEach(brick => {
            if (!brick.destroyed &&
                this.ballX + this.ballSize >= brick.x &&
                this.ballX <= brick.x + brick.width &&
                this.ballY + this.ballSize >= brick.y &&
                this.ballY <= brick.y + brick.height) {
                brick.destroyed = true;
                this.score += 10;
                window.gameUI.updateScore(this.score);
                
                // Determine bounce direction
                const ballCenterX = this.ballX + this.ballSize / 2;
                const ballCenterY = this.ballY + this.ballSize / 2;
                const brickCenterX = brick.x + brick.width / 2;
                const brickCenterY = brick.y + brick.height / 2;
                
                const dx = ballCenterX - brickCenterX;
                const dy = ballCenterY - brickCenterY;
                
                if (Math.abs(dx) > Math.abs(dy)) {
                    this.ballSpeedX = dx > 0 ? Math.abs(this.ballSpeedX) : -Math.abs(this.ballSpeedX);
                } else {
                    this.ballSpeedY = dy > 0 ? Math.abs(this.ballSpeedY) : -Math.abs(this.ballSpeedY);
                }
            }
        });
        
        // Check if ball fell off screen
        if (this.ballY > this.engine.height) {
            this.endGame();
        }
        
        // Check if all bricks destroyed
        if (this.bricks.every(brick => brick.destroyed)) {
            this.gameWon = true;
            window.gameUI.showOverlay('You Win!', `Congratulations! Final Score: ${this.score}`);
        }
    }
    
    render(engine) {
        // Draw background
        engine.fillRect(0, 0, engine.width, engine.height, '#0a0a1a');
        
        // Draw bricks
        this.bricks.forEach(brick => {
            if (!brick.destroyed) {
                engine.fillRect(brick.x, brick.y, brick.width, brick.height, brick.color);
                engine.strokeRect(brick.x, brick.y, brick.width, brick.height, '#ffffff', 1);
            }
        });
        
        // Draw paddle
        engine.fillRect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight, '#4ecdc4');
        
        // Draw ball
        engine.fillCircle(this.ballX + this.ballSize / 2, this.ballY + this.ballSize / 2, this.ballSize / 2, '#ffffff');
        
        if (this.gameOver) {
            engine.fillText(
                'Game Over!',
                engine.width / 2,
                engine.height / 2,
                '#ffffff',
                '40px Arial',
                'center'
            );
        }
    }
    
    endGame() {
        this.gameOver = true;
        window.gameUI.showOverlay('Game Over!', `Final Score: ${this.score}`);
    }
    
    restart() {
        this.reset();
        window.gameUI.hideOverlay();
    }
    
    cleanup() {
        // Cleanup if needed
    }
}

