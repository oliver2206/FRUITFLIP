const gameTitle = document.getElementById('gameTitle');
const logo = document.getElementById('logo');
const dropdownMenu = document.getElementById('dropdownMenu');
const timerDisplay = document.getElementById('timerDisplay');

// Toggle dropdown visibility
gameTitle.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});

logo.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Optional: Close the dropdown when clicking anywhere else
document.addEventListener('click', (event) => {
    if (!event.target.closest('.header') && dropdownMenu.style.display === 'flex') {
        dropdownMenu.style.display = 'none';
    }
});

const symbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝', '🍑', '🥭', '🍊', '🍋', '🍈', '🍏', '🥥', '🥦', '🍄', '🥬']; 
let tiles = [];
let firstTile = null;
let secondTile = null;
let matches = 0;
let totalPairs = symbols.length;

function initializeGame() {
    matches = 0;
    tiles = [...symbols.slice(0, 18), ...symbols.slice(0, 18)].sort(() => 0.5 - Math.random()); // Duplicate and shuffle symbols
    renderTiles();
    showAllTilesTemporarily();
}

function renderTiles() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';
    tiles.forEach((symbol, index) => {
        const tile = createTile(symbol, index);
        gameContainer.appendChild(tile);
    });
}

function createTile(symbol, index) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.symbol = symbol;
    tile.dataset.index = index;
    tile.addEventListener('click', () => handleTileClick(tile));
    return tile;
}

function handleTileClick(tile) {
    if (tile.classList.contains('revealed') || tile.classList.contains('matched') || secondTile) return;

    tile.classList.add('revealed');
    tile.textContent = tile.dataset.symbol;

    if (!firstTile) {
        firstTile = tile;
    } else {
        secondTile = tile;
        if (firstTile.dataset.symbol === secondTile.dataset.symbol) {
            setTimeout(() => {
                // Match found: hide the tiles
                firstTile.classList.add('matched');
                secondTile.classList.add('matched');
                firstTile.classList.add('hidden');
                secondTile.classList.add('hidden');
                matches++;
                firstTile = null;
                secondTile = null;
                if (matches === totalPairs) {
                    alert('Congratulations, you found all the matches!');
                }
            }, 300);
        } else {
            setTimeout(() => {
                firstTile.classList.remove('revealed');
                secondTile.classList.remove('revealed');
                firstTile.textContent = '';
                secondTile.textContent = '';
                firstTile = null;
                secondTile = null;
            }, 1000);
        }
    }
}

function showAllTilesTemporarily() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.add('revealed');
        tile.textContent = tile.dataset.symbol;
    });

    setTimeout(() => {
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('revealed');
            tile.textContent = '';
        });
    }, 2000);
}

initializeGame();
