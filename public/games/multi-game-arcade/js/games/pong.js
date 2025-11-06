// Pong Game

class PongGame {
    constructor(engine) {
        this.engine = engine;
        this.reset();
    }
    
    reset() {
        this.paddleWidth = 10;
        this.paddleHeight = 80;
        this.paddleSpeed = 0.4;
        
        this.playerY = (this.engine.height - this.paddleHeight) / 2;
        this.aiY = (this.engine.height - this.paddleHeight) / 2;
        this.playerX = 20;
        this.aiX = this.engine.width - 30;
        
        this.ballSize = 10;
        this.ballX = this.engine.width / 2;
        this.ballY = this.engine.height / 2;
        this.ballSpeedX = 0.3;
        this.ballSpeedY = 0.2;
        
        this.playerScore = 0;
        this.aiScore = 0;
        this.gameOver = false;
    }
    
    update(deltaTime) {
        if (this.gameOver) return;
        
        // Player paddle movement
        if (this.engine.isKeyPressed('w') || this.engine.isKeyPressed('arrowup')) {
            this.playerY -= this.paddleSpeed * deltaTime;
        }
        if (this.engine.isKeyPressed('s') || this.engine.isKeyPressed('arrowdown')) {
            this.playerY += this.paddleSpeed * deltaTime;
        }
        
        // Keep paddles in bounds
        this.playerY = clamp(this.playerY, 0, this.engine.height - this.paddleHeight);
        this.aiY = clamp(this.aiY, 0, this.engine.height - this.paddleHeight);
        
        // AI paddle (simple follow ball)
        const aiCenter = this.aiY + this.paddleHeight / 2;
        const ballCenter = this.ballY;
        if (aiCenter < ballCenter - 5) {
            this.aiY += this.paddleSpeed * deltaTime * 0.8;
        } else if (aiCenter > ballCenter + 5) {
            this.aiY -= this.paddleSpeed * deltaTime * 0.8;
        }
        
        // Move ball
        this.ballX += this.ballSpeedX * deltaTime;
        this.ballY += this.ballSpeedY * deltaTime;
        
        // Ball collision with top/bottom walls
        if (this.ballY <= 0 || this.ballY >= this.engine.height - this.ballSize) {
            this.ballSpeedY = -this.ballSpeedY;
            this.ballY = clamp(this.ballY, 0, this.engine.height - this.ballSize);
        }
        
        // Ball collision with player paddle
        if (this.ballX <= this.playerX + this.paddleWidth &&
            this.ballX >= this.playerX &&
            this.ballY + this.ballSize >= this.playerY &&
            this.ballY <= this.playerY + this.paddleHeight) {
            this.ballSpeedX = Math.abs(this.ballSpeedX);
            // Add some angle based on where ball hits paddle
            const hitPos = (this.ballY - this.playerY) / this.paddleHeight;
            this.ballSpeedY = (hitPos - 0.5) * 0.4;
        }
        
        // Ball collision with AI paddle
        if (this.ballX + this.ballSize >= this.aiX &&
            this.ballX <= this.aiX + this.paddleWidth &&
            this.ballY + this.ballSize >= this.aiY &&
            this.ballY <= this.aiY + this.paddleHeight) {
            this.ballSpeedX = -Math.abs(this.ballSpeedX);
            const hitPos = (this.ballY - this.aiY) / this.paddleHeight;
            this.ballSpeedY = (hitPos - 0.5) * 0.4;
        }
        
        // Score points
        if (this.ballX < 0) {
            this.aiScore++;
            this.resetBall();
        } else if (this.ballX > this.engine.width) {
            this.playerScore++;
            this.resetBall();
        }
        
        // Check win condition
        if (this.playerScore >= 5 || this.aiScore >= 5) {
            this.endGame();
        }
        
        // Update score display
        window.gameUI.updateScore(`${this.playerScore} - ${this.aiScore}`);
    }
    
    resetBall() {
        this.ballX = this.engine.width / 2;
        this.ballY = this.engine.height / 2;
        this.ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 0.3;
        this.ballSpeedY = (Math.random() - 0.5) * 0.2;
    }
    
    render(engine) {
        // Draw background
        engine.fillRect(0, 0, engine.width, engine.height, '#0a0a1a');
        
        // Draw center line
        engine.ctx.setLineDash([5, 5]);
        engine.drawLine(engine.width / 2, 0, engine.width / 2, engine.height, '#333', 2);
        engine.ctx.setLineDash([]);
        
        // Draw paddles
        engine.fillRect(this.playerX, this.playerY, this.paddleWidth, this.paddleHeight, '#4ecdc4');
        engine.fillRect(this.aiX, this.aiY, this.paddleWidth, this.paddleHeight, '#ff6b6b');
        
        // Draw ball
        engine.fillCircle(this.ballX + this.ballSize / 2, this.ballY + this.ballSize / 2, this.ballSize / 2, '#ffffff');
        
        // Draw scores
        engine.fillText(
            this.playerScore.toString(),
            engine.width / 4,
            50,
            '#ffffff',
            '48px Arial',
            'center'
        );
        engine.fillText(
            this.aiScore.toString(),
            engine.width * 3 / 4,
            50,
            '#ffffff',
            '48px Arial',
            'center'
        );
        
        if (this.gameOver) {
            const winner = this.playerScore > this.aiScore ? 'You Win!' : 'AI Wins!';
            engine.fillText(
                winner,
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
        const winner = this.playerScore > this.aiScore ? 'You' : 'AI';
        window.gameUI.showOverlay('Game Over!', `${winner} won! Final Score: ${this.playerScore} - ${this.aiScore}`);
    }
    
    restart() {
        this.reset();
        window.gameUI.hideOverlay();
    }
    
    cleanup() {
        // Cleanup if needed
    }
}

