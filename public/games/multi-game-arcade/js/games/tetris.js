// Tetris Game

class TetrisGame {
    constructor(engine) {
        this.engine = engine;
        this.gridSize = 30;
        this.cols = 10;
        this.rows = 20;
        this.gridWidth = this.cols * this.gridSize;
        this.gridHeight = this.rows * this.gridSize;
        this.gridX = (engine.width - this.gridWidth) / 2;
        this.gridY = 50;
        
        this.reset();
    }
    
    reset() {
        this.grid = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        this.currentPiece = null;
        this.nextPiece = null;
        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.gameOver = false;
        this.fallTime = 0;
        this.fallDelay = 1000; // milliseconds
        
        this.pieces = [
            // I piece
            [[1,1,1,1]],
            // O piece
            [[1,1],[1,1]],
            // T piece
            [[0,1,0],[1,1,1]],
            // S piece
            [[0,1,1],[1,1,0]],
            // Z piece
            [[1,1,0],[0,1,1]],
            // J piece
            [[1,0,0],[1,1,1]],
            // L piece
            [[0,0,1],[1,1,1]]
        ];
        
        this.colors = ['#000000', '#4ecdc4', '#ffe66d', '#ff6b6b', '#a8e6cf', '#ff8b94', '#95e1d3', '#f38181'];
        
        this.spawnPiece();
    }
    
    spawnPiece() {
        if (!this.nextPiece) {
            this.nextPiece = {
                shape: this.pieces[Math.floor(Math.random() * this.pieces.length)],
                x: Math.floor(this.cols / 2) - 1,
                y: 0,
                color: Math.floor(Math.random() * (this.colors.length - 1)) + 1
            };
        }
        this.currentPiece = this.nextPiece;
        this.nextPiece = {
            shape: this.pieces[Math.floor(Math.random() * this.pieces.length)],
            x: Math.floor(this.cols / 2) - 1,
            y: 0,
            color: Math.floor(Math.random() * (this.colors.length - 1)) + 1
        };
        
        // Check game over
        if (this.collision(this.currentPiece)) {
            this.gameOver = true;
            window.gameUI.showOverlay('Game Over!', `Final Score: ${this.score}`);
        }
    }
    
    collision(piece) {
        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                if (piece.shape[row][col]) {
                    const newX = piece.x + col;
                    const newY = piece.y + row;
                    
                    if (newX < 0 || newX >= this.cols || newY >= this.rows) {
                        return true;
                    }
                    if (newY >= 0 && this.grid[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    lockPiece() {
        for (let row = 0; row < this.currentPiece.shape.length; row++) {
            for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
                if (this.currentPiece.shape[row][col]) {
                    const y = this.currentPiece.y + row;
                    const x = this.currentPiece.x + col;
                    if (y >= 0) {
                        this.grid[y][x] = this.currentPiece.color;
                    }
                }
            }
        }
        this.clearLines();
        this.spawnPiece();
    }
    
    clearLines() {
        let linesCleared = 0;
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.grid[row].every(cell => cell !== 0)) {
                this.grid.splice(row, 1);
                this.grid.unshift(Array(this.cols).fill(0));
                linesCleared++;
                row++; // Check same row again
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += linesCleared * 100 * this.level;
            this.level = Math.floor(this.lines / 10) + 1;
            this.fallDelay = Math.max(200, 1000 - (this.level - 1) * 50);
            window.gameUI.updateScore(this.score);
        }
    }
    
    rotatePiece() {
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        const originalShape = this.currentPiece.shape;
        this.currentPiece.shape = rotated;
        if (this.collision(this.currentPiece)) {
            this.currentPiece.shape = originalShape;
        }
    }
    
    update(deltaTime) {
        if (this.gameOver) return;
        
        // Handle input
        if (this.engine.isKeyPressed('arrowleft') || this.engine.isKeyPressed('a')) {
            this.currentPiece.x--;
            if (this.collision(this.currentPiece)) {
                this.currentPiece.x++;
            }
        }
        if (this.engine.isKeyPressed('arrowright') || this.engine.isKeyPressed('d')) {
            this.currentPiece.x++;
            if (this.collision(this.currentPiece)) {
                this.currentPiece.x--;
            }
        }
        if (this.engine.isKeyPressed('arrowdown') || this.engine.isKeyPressed('s')) {
            this.currentPiece.y++;
            if (this.collision(this.currentPiece)) {
                this.currentPiece.y--;
                this.lockPiece();
            }
        }
        if (this.engine.isKeyPressed(' ') || this.engine.isKeyPressed('w') || this.engine.isKeyPressed('arrowup')) {
            this.rotatePiece();
        }
        
        // Auto fall
        this.fallTime += deltaTime;
        if (this.fallTime >= this.fallDelay) {
            this.fallTime = 0;
            this.currentPiece.y++;
            if (this.collision(this.currentPiece)) {
                this.currentPiece.y--;
                this.lockPiece();
            }
        }
    }
    
    render(engine) {
        // Draw background
        engine.fillRect(0, 0, engine.width, engine.height, '#0a0a1a');
        
        // Draw grid background
        engine.fillRect(this.gridX, this.gridY, this.gridWidth, this.gridHeight, '#1a1a2a');
        
        // Draw grid lines
        engine.ctx.strokeStyle = '#2a2a3a';
        engine.ctx.lineWidth = 1;
        for (let i = 0; i <= this.cols; i++) {
            engine.drawLine(
                this.gridX + i * this.gridSize,
                this.gridY,
                this.gridX + i * this.gridSize,
                this.gridY + this.gridHeight,
                '#2a2a3a'
            );
        }
        for (let i = 0; i <= this.rows; i++) {
            engine.drawLine(
                this.gridX,
                this.gridY + i * this.gridSize,
                this.gridX + this.gridWidth,
                this.gridY + i * this.gridSize,
                '#2a2a3a'
            );
        }
        
        // Draw locked pieces
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.grid[row][col]) {
                    engine.fillRect(
                        this.gridX + col * this.gridSize + 1,
                        this.gridY + row * this.gridSize + 1,
                        this.gridSize - 2,
                        this.gridSize - 2,
                        this.colors[this.grid[row][col]]
                    );
                }
            }
        }
        
        // Draw current piece
        if (this.currentPiece) {
            for (let row = 0; row < this.currentPiece.shape.length; row++) {
                for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
                    if (this.currentPiece.shape[row][col]) {
                        const x = this.gridX + (this.currentPiece.x + col) * this.gridSize + 1;
                        const y = this.gridY + (this.currentPiece.y + row) * this.gridSize + 1;
                        engine.fillRect(x, y, this.gridSize - 2, this.gridSize - 2, this.colors[this.currentPiece.color]);
                    }
                }
            }
        }
        
        // Draw info
        engine.fillText(
            `Level: ${this.level}`,
            this.gridX + this.gridWidth + 20,
            this.gridY + 30,
            '#ffffff',
            '20px Arial'
        );
        engine.fillText(
            `Lines: ${this.lines}`,
            this.gridX + this.gridWidth + 20,
            this.gridY + 60,
            '#ffffff',
            '20px Arial'
        );
        
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
    
    restart() {
        this.reset();
        window.gameUI.hideOverlay();
    }
    
    cleanup() {
        // Cleanup if needed
    }
}

