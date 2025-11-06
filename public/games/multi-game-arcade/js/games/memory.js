// Memory Card Game

class MemoryGame {
    constructor(engine) {
        this.engine = engine;
        this.gridCols = 4;
        this.gridRows = 4;
        this.cardWidth = 120;
        this.cardHeight = 120;
        this.cardPadding = 10;
        this.gridWidth = this.gridCols * (this.cardWidth + this.cardPadding) - this.cardPadding;
        this.gridHeight = this.gridRows * (this.cardHeight + this.cardPadding) - this.cardPadding;
        this.gridX = (engine.width - this.gridWidth) / 2;
        this.gridY = (engine.height - this.gridHeight) / 2;
        
        this.reset();
    }
    
    reset() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameWon = false;
        this.startTime = Date.now();
        
        // Create pairs
        const symbols = ['🎮', '🎯', '🎲', '🎨', '🎪', '🎭', '🎸', '🎺'];
        const pairs = [...symbols, ...symbols];
        
        // Shuffle
        for (let i = pairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }
        
        // Create card objects
        for (let row = 0; row < this.gridRows; row++) {
            for (let col = 0; col < this.gridCols; col++) {
                const index = row * this.gridCols + col;
                this.cards.push({
                    symbol: pairs[index],
                    x: this.gridX + col * (this.cardWidth + this.cardPadding),
                    y: this.gridY + row * (this.cardHeight + this.cardPadding),
                    flipped: false,
                    matched: false
                });
            }
        }
    }
    
    getCardAt(x, y) {
        return this.cards.find(card =>
            x >= card.x && x <= card.x + this.cardWidth &&
            y >= card.y && y <= card.y + this.cardHeight &&
            !card.flipped && !card.matched
        );
    }
    
    update(deltaTime) {
        if (this.gameWon) return;
        
        // Handle mouse click
        if (this.engine.mouse.clicked) {
            const card = this.getCardAt(this.engine.mouse.x, this.engine.mouse.y);
            if (card && this.flippedCards.length < 2) {
                card.flipped = true;
                this.flippedCards.push(card);
                
                if (this.flippedCards.length === 2) {
                    this.moves++;
                    setTimeout(() => {
                        this.checkMatch();
                    }, 1000);
                }
            }
        }
        
        // Check win condition
        if (this.matchedPairs === this.cards.length / 2) {
            this.gameWon = true;
            const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
            window.gameUI.showOverlay(
                'You Win!',
                `Congratulations! Completed in ${timeElapsed}s with ${this.moves} moves!`
            );
        }
    }
    
    checkMatch() {
        if (this.flippedCards.length === 2) {
            const [card1, card2] = this.flippedCards;
            if (card1.symbol === card2.symbol) {
                card1.matched = true;
                card2.matched = true;
                this.matchedPairs++;
            } else {
                card1.flipped = false;
                card2.flipped = false;
            }
            this.flippedCards = [];
        }
    }
    
    render(engine) {
        // Draw background
        engine.fillRect(0, 0, engine.width, engine.height, '#0a0a1a');
        
        // Draw cards
        this.cards.forEach(card => {
            if (card.matched) {
                engine.fillRect(card.x, card.y, this.cardWidth, this.cardHeight, '#4ecdc4');
            } else if (card.flipped) {
                engine.fillRect(card.x, card.y, this.cardWidth, this.cardHeight, '#ffffff');
            } else {
                engine.fillRect(card.x, card.y, this.cardWidth, this.cardHeight, '#667eea');
            }
            
            engine.strokeRect(card.x, card.y, this.cardWidth, this.cardHeight, '#ffffff', 2);
            
            if (card.flipped || card.matched) {
                engine.fillText(
                    card.symbol,
                    card.x + this.cardWidth / 2,
                    card.y + this.cardHeight / 2 + 10,
                    '#000000',
                    '48px Arial',
                    'center'
                );
            } else {
                engine.fillText(
                    '?',
                    card.x + this.cardWidth / 2,
                    card.y + this.cardHeight / 2 + 10,
                    '#ffffff',
                    '48px Arial',
                    'center'
                );
            }
        });
        
        // Draw info
        const timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
        engine.fillText(
            `Moves: ${this.moves} | Time: ${timeElapsed}s`,
            engine.width / 2,
            30,
            '#ffffff',
            '20px Arial',
            'center'
        );
        
        window.gameUI.updateScore(this.matchedPairs * 2);
        
        if (this.gameWon) {
            engine.fillText(
                'You Win!',
                engine.width / 2,
                engine.height - 50,
                '#4ecdc4',
                '30px Arial',
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

