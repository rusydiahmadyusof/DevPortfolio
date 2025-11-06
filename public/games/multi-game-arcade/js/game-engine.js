// Shared game engine utilities

class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = 800;
        this.height = 600;
        this.setupCanvas();
        
        this.keys = {};
        this.mouse = { x: 0, y: 0, clicked: false };
        this.setupInput();
        
        this.animationId = null;
        this.lastTime = 0;
    }
    
    setupCanvas() {
        // Set canvas size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        this.handleResize();
    }
    
    handleResize() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth - 20;
        const containerHeight = container.clientHeight - 60; // Account for header
        
        const scale = Math.min(
            containerWidth / this.width,
            containerHeight / this.height,
            1
        );
        
        this.canvas.style.width = (this.width * scale) + 'px';
        this.canvas.style.height = (this.height * scale) + 'px';
    }
    
    setupInput() {
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.keys[e.code.toLowerCase()] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            this.keys[e.code.toLowerCase()] = false;
        });
        
        // Mouse input
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            this.mouse.x = (e.clientX - rect.left) * scaleX;
            this.mouse.y = (e.clientY - rect.top) * scaleY;
        });
        
        this.canvas.addEventListener('mousedown', () => {
            this.mouse.clicked = true;
        });
        
        this.canvas.addEventListener('mouseup', () => {
            this.mouse.clicked = false;
        });
        
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.canvas.width / rect.width;
            const scaleY = this.canvas.height / rect.height;
            this.mouse.x = (e.clientX - rect.left) * scaleX;
            this.mouse.y = (e.clientY - rect.top) * scaleY;
        });
    }
    
    // Drawing helper functions (abstraction layer for future asset support)
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    
    fillRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }
    
    strokeRect(x, y, width, height, color, lineWidth = 1) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(x, y, width, height);
    }
    
    fillCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    strokeCircle(x, y, radius, color, lineWidth = 1) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    fillText(text, x, y, color, font = '20px Arial', align = 'left') {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }
    
    strokeText(text, x, y, color, font = '20px Arial', align = 'left') {
        this.ctx.strokeStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = align;
        this.ctx.strokeText(text, x, y);
    }
    
    drawLine(x1, y1, x2, y2, color, lineWidth = 1) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
    
    // Game loop
    start(game) {
        this.game = game;
        this.lastTime = performance.now();
        this.gameLoop();
    }
    
    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // Update game (deltaTime in milliseconds)
        if (this.game && this.game.update) {
            this.game.update(deltaTime);
        }
        
        // Render game
        if (this.game && this.game.render) {
            this.clear();
            this.game.render(this);
        }
        
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] || false;
    }
    
    isKeyJustPressed(key) {
        // This would need state tracking for "just pressed" - simplified for now
        return this.keys[key.toLowerCase()] || false;
    }
}

// Global game engine instance
let gameEngine = null;

