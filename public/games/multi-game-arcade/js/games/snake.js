// Snake Game

class SnakeGame {
    constructor(engine) {
        this.engine = engine;
        this.gridSize = 20;
        this.tileCount = engine.width / this.gridSize;
        
        this.reset();
    }
    
    reset() {
        this.snake = [
            { x: 10, y: 10 }
        ];
        this.dx = 0;
        this.dy = 0;
        this.food = this.generateFood();
        this.score = 0;
        this.gameOver = false;
        this.lastMoveTime = 0;
        this.moveDelay = 150; // milliseconds
    }
    
    generateFood() {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
        return food;
    }
    
    update(deltaTime) {
        if (this.gameOver) return;
        
        // Handle input
        if (this.engine.isKeyPressed('arrowup') && this.dy === 0) {
            this.dx = 0;
            this.dy = -1;
        } else if (this.engine.isKeyPressed('arrowdown') && this.dy === 0) {
            this.dx = 0;
            this.dy = 1;
        } else if (this.engine.isKeyPressed('arrowleft') && this.dx === 0) {
            this.dx = -1;
            this.dy = 0;
        } else if (this.engine.isKeyPressed('arrowright') && this.dx === 0) {
            this.dx = 1;
            this.dy = 0;
        }
        
        // Move snake at intervals
        this.lastMoveTime += deltaTime;
        if (this.lastMoveTime >= this.moveDelay) {
            this.lastMoveTime = 0;
            
            if (this.dx !== 0 || this.dy !== 0) {
                const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
                
                // Check wall collision
                if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
                    this.endGame();
                    return;
                }
                
                // Check self collision
                if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    this.endGame();
                    return;
                }
                
                this.snake.unshift(head);
                
                // Check food collision
                if (head.x === this.food.x && head.y === this.food.y) {
                    this.score += 10;
                    window.gameUI.updateScore(this.score);
                    this.food = this.generateFood();
                    // Increase speed slightly
                    this.moveDelay = Math.max(100, this.moveDelay - 2);
                } else {
                    this.snake.pop();
                }
            }
        }
    }
    
    render(engine) {
        // Draw background grid
        engine.ctx.fillStyle = '#0a0a1a';
        engine.ctx.fillRect(0, 0, engine.width, engine.height);
        
        // Draw grid lines
        engine.ctx.strokeStyle = '#1a1a2a';
        engine.ctx.lineWidth = 1;
        for (let i = 0; i <= this.tileCount; i++) {
            engine.drawLine(i * this.gridSize, 0, i * this.gridSize, engine.height, '#1a1a2a');
            engine.drawLine(0, i * this.gridSize, engine.width, i * this.gridSize, '#1a1a2a');
        }
        
        // Draw food
        engine.fillRect(
            this.food.x * this.gridSize + 1,
            this.food.y * this.gridSize + 1,
            this.gridSize - 2,
            this.gridSize - 2,
            '#ff6b6b'
        );
        
        // Draw snake
        this.snake.forEach((segment, index) => {
            const color = index === 0 ? '#4ecdc4' : '#45b7b8';
            engine.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2,
                color
            );
        });
        
        // Draw game over message
        if (this.gameOver) {
            engine.fillText(
                'Game Over! Press R to restart',
                engine.width / 2,
                engine.height / 2,
                '#ffffff',
                '30px Arial',
                'center'
            );
        } else if (this.dx === 0 && this.dy === 0) {
            engine.fillText(
                'Use Arrow Keys to Start',
                engine.width / 2,
                engine.height / 2,
                '#888888',
                '24px Arial',
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

