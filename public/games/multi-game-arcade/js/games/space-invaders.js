// Space Invaders Game

class SpaceInvadersGame {
    constructor(engine) {
        this.engine = engine;
        this.reset();
    }
    
    reset() {
        // Player
        this.playerWidth = 50;
        this.playerHeight = 30;
        this.playerX = (this.engine.width - this.playerWidth) / 2;
        this.playerY = this.engine.height - 50;
        this.playerSpeed = 0.4;
        
        // Bullets
        this.bullets = [];
        this.bulletSpeed = 0.5;
        this.lastBulletTime = 0;
        this.bulletDelay = 300;
        
        // Enemies
        this.enemyRows = 5;
        this.enemyCols = 8;
        this.enemyWidth = 40;
        this.enemyHeight = 30;
        this.enemyPadding = 10;
        this.enemyOffsetX = 50;
        this.enemyOffsetY = 50;
        this.enemySpeed = 0.05;
        this.enemyDirection = 1;
        this.enemies = [];
        this.initEnemies();
        
        // Enemy bullets
        this.enemyBullets = [];
        this.enemyBulletSpeed = 0.3;
        this.lastEnemyBulletTime = 0;
        this.enemyBulletDelay = 2000;
        
        this.score = 0;
        this.gameOver = false;
        this.wave = 1;
    }
    
    initEnemies() {
        this.enemies = [];
        for (let row = 0; row < this.enemyRows; row++) {
            for (let col = 0; col < this.enemyCols; col++) {
                this.enemies.push({
                    x: this.enemyOffsetX + col * (this.enemyWidth + this.enemyPadding),
                    y: this.enemyOffsetY + row * (this.enemyHeight + this.enemyPadding),
                    width: this.enemyWidth,
                    height: this.enemyHeight,
                    alive: true
                });
            }
        }
    }
    
    update(deltaTime) {
        if (this.gameOver) return;
        
        // Player movement
        if (this.engine.isKeyPressed('arrowleft') || this.engine.isKeyPressed('a')) {
            this.playerX -= this.playerSpeed * deltaTime;
        }
        if (this.engine.isKeyPressed('arrowright') || this.engine.isKeyPressed('d')) {
            this.playerX += this.playerSpeed * deltaTime;
        }
        this.playerX = clamp(this.playerX, 0, this.engine.width - this.playerWidth);
        
        // Player shooting
        this.lastBulletTime += deltaTime;
        if ((this.engine.isKeyPressed(' ') || this.engine.isKeyPressed('arrowup')) && 
            this.lastBulletTime >= this.bulletDelay) {
            this.bullets.push({
                x: this.playerX + this.playerWidth / 2,
                y: this.playerY,
                width: 4,
                height: 10
            });
            this.lastBulletTime = 0;
        }
        
        // Move player bullets
        this.bullets = this.bullets.filter(bullet => {
            bullet.y -= this.bulletSpeed * deltaTime;
            return bullet.y > 0;
        });
        
        // Move enemies
        let shouldMoveDown = false;
        this.enemies.forEach(enemy => {
            if (enemy.alive) {
                enemy.x += this.enemySpeed * this.enemyDirection * deltaTime;
                if (enemy.x <= 0 || enemy.x + enemy.width >= this.engine.width) {
                    shouldMoveDown = true;
                }
            }
        });
        
        if (shouldMoveDown) {
            this.enemyDirection *= -1;
            this.enemies.forEach(enemy => {
                if (enemy.alive) {
                    enemy.y += 20;
                    // Check if enemies reached player
                    if (enemy.y + enemy.height >= this.playerY) {
                        this.endGame();
                    }
                }
            });
        }
        
        // Enemy shooting
        this.lastEnemyBulletTime += deltaTime;
        if (this.lastEnemyBulletTime >= this.enemyBulletDelay) {
            const aliveEnemies = this.enemies.filter(e => e.alive);
            if (aliveEnemies.length > 0) {
                const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
                this.enemyBullets.push({
                    x: shooter.x + shooter.width / 2,
                    y: shooter.y + shooter.height,
                    width: 4,
                    height: 10
                });
            }
            this.lastEnemyBulletTime = 0;
            this.enemyBulletDelay = Math.max(500, 2000 - this.wave * 200);
        }
        
        // Move enemy bullets
        this.enemyBullets = this.enemyBullets.filter(bullet => {
            bullet.y += this.enemyBulletSpeed * deltaTime;
            return bullet.y < this.engine.height;
        });
        
        // Check bullet-enemy collisions
        this.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (enemy.alive &&
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y) {
                    enemy.alive = false;
                    this.bullets.splice(bulletIndex, 1);
                    this.score += 10;
                    window.gameUI.updateScore(this.score);
                }
            });
        });
        
        // Check enemy bullet-player collision
        this.enemyBullets.forEach((bullet, index) => {
            if (bullet.x < this.playerX + this.playerWidth &&
                bullet.x + bullet.width > this.playerX &&
                bullet.y < this.playerY + this.playerHeight &&
                bullet.y + bullet.height > this.playerY) {
                this.endGame();
            }
        });
        
        // Check win condition
        if (this.enemies.every(e => !e.alive)) {
            this.wave++;
            this.enemySpeed += 0.01;
            this.initEnemies();
        }
    }
    
    render(engine) {
        // Draw background
        engine.fillRect(0, 0, engine.width, engine.height, '#0a0a1a');
        
        // Draw stars (simple effect)
        for (let i = 0; i < 50; i++) {
            const x = (i * 37) % engine.width;
            const y = (i * 73) % engine.height;
            engine.fillCircle(x, y, 1, '#ffffff');
        }
        
        // Draw player
        engine.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight, '#4ecdc4');
        engine.fillRect(this.playerX + 10, this.playerY - 5, 30, 5, '#4ecdc4');
        
        // Draw bullets
        this.bullets.forEach(bullet => {
            engine.fillRect(bullet.x - bullet.width / 2, bullet.y, bullet.width, bullet.height, '#ffff00');
        });
        
        // Draw enemies
        this.enemies.forEach(enemy => {
            if (enemy.alive) {
                engine.fillRect(enemy.x, enemy.y, enemy.width, enemy.height, '#ff6b6b');
                engine.fillRect(enemy.x + 5, enemy.y + 5, 10, 10, '#ffffff');
                engine.fillRect(enemy.x + 25, enemy.y + 5, 10, 10, '#ffffff');
            }
        });
        
        // Draw enemy bullets
        this.enemyBullets.forEach(bullet => {
            engine.fillRect(bullet.x - bullet.width / 2, bullet.y, bullet.width, bullet.height, '#ff0000');
        });
        
        // Draw info
        engine.fillText(
            `Wave: ${this.wave}`,
            20,
            30,
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
    
    endGame() {
        this.gameOver = true;
        window.gameUI.showOverlay('Game Over!', `Final Score: ${this.score} | Wave: ${this.wave}`);
    }
    
    restart() {
        this.reset();
        window.gameUI.hideOverlay();
    }
    
    cleanup() {
        // Cleanup if needed
    }
}

