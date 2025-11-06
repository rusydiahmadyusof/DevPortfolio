// Main navigation and game loading system

const games = {
    'snake': SnakeGame,
    'pong': PongGame,
    'breakout': BreakoutGame,
    'tetris': TetrisGame,
    'memory': MemoryGame,
    'space-invaders': SpaceInvadersGame
};

let currentGame = null;

// Initialize menu
document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
    setupGameContainer();
});

function setupMenu() {
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameName = card.getAttribute('data-game');
            loadGame(gameName);
        });
    });
}

function setupGameContainer() {
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
        returnToMenu();
    });
    
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        if (currentGame && currentGame.restart) {
            currentGame.restart();
            hideOverlay();
        }
    });
}

function loadGame(gameName) {
    // Hide menu, show game container
    document.getElementById('menu-container').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    
    // Initialize game engine
    if (!gameEngine) {
        gameEngine = new GameEngine('game-canvas');
    }
    
    // Stop any existing game
    if (currentGame && currentGame.cleanup) {
        currentGame.cleanup();
    }
    gameEngine.stop();
    
    // Create and start new game
    const GameClass = games[gameName];
    if (GameClass) {
        currentGame = new GameClass(gameEngine);
        gameEngine.start(currentGame);
        updateScore(0);
    }
}

function returnToMenu() {
    // Stop current game
    if (currentGame && currentGame.cleanup) {
        currentGame.cleanup();
    }
    if (gameEngine) {
        gameEngine.stop();
    }
    currentGame = null;
    
    // Hide game container, show menu
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('menu-container').classList.remove('hidden');
    hideOverlay();
}

function updateScore(score) {
    document.getElementById('score-display').textContent = `Score: ${formatNumber(score)}`;
}

function showOverlay(title, message) {
    document.getElementById('overlay-title').textContent = title;
    document.getElementById('overlay-message').textContent = message;
    document.getElementById('game-overlay').classList.remove('hidden');
}

function hideOverlay() {
    document.getElementById('game-overlay').classList.add('hidden');
}

// Export functions for games to use
window.gameUI = {
    updateScore,
    showOverlay,
    hideOverlay
};

