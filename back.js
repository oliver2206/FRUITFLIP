<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tile Flip Challenge</title>
    <style>
        /* General Styles */
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            height: 100vh;
            background-image: url('https://i.pinimg.com/736x/e3/a4/48/e3a4482bff09d997f675af868e43ff2b.jpg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        /* Header Styles */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            background: #000;
            color: white;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }

        .logo {
            width: 90px;
            height: 90px;
            margin-right: 10px;
            cursor: pointer;
        }

        /* Game Container */
        .game-container {
            display: grid;
            grid-template-columns: repeat(6, 90px); /* 6 columns */
            grid-template-rows: repeat(6, 90px); /* 6 rows */
            gap: 10px;
            justify-content: center;
            margin: 50px auto;
        }

        .tile {
            width: 90px;
            height: 90px;
            background-image: url('./PNGFILE/TILE 9090.png');
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 45px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s ease, opacity 0.3s ease;
            text-align: center;
        }

        .tile.revealed {
            background: #188d0666;
            cursor: default;
        }

        .tile.matched {
            background: transparent; /* Tile disappears visually */
            color: transparent; /* Hides the symbol */
            cursor: default;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title-logo">
            <img src="./PNGFILE/TILE.png" alt="Logo" class="logo" id="logo">
            <h1 id="gameTitle">Tile Flip Challenge</h1>
        </div>
    </div>

    <div class="game-container" id="gameContainer"></div>

    <script>
        const symbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝', '🍑', '🥭', '🍊', '🍋', '🍈', '🍏', '🥥', '🥦', '🍄', '🥬'];
        let tiles = [];
        let firstTile = null;
        let secondTile = null;
        let matches = 0;
        const totalPairs = symbols.length;

        function initializeGame() {
            matches = 0;
            tiles = [...symbols.slice(0, 18), ...symbols.slice(0, 18)].sort(() => 0.5 - Math.random());
            renderTiles();
            revealTilesBeforeStart();
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
                        firstTile.classList.add('matched');
                        secondTile.classList.add('matched');
                        removeMatchedTiles(firstTile, secondTile);
                        matches++;
                        checkWin();
                        resetSelection();
                    }, 500);
                } else {
                    setTimeout(() => {
                        firstTile.classList.remove('revealed');
                        secondTile.classList.remove('revealed');
                        firstTile.textContent = '';
                        secondTile.textContent = '';
                        resetSelection();
                    }, 1000);
                }
            }
        }

        function removeMatchedTiles(firstTile, secondTile) {
            firstTile.textContent = ''; // Clear the tile symbol
            secondTile.textContent = ''; // Clear the tile symbol
            firstTile.style.backgroundImage = 'none'; // Remove the background image
            secondTile.style.backgroundImage = 'none'; // Remove the background image
        }

        function resetSelection() {
            firstTile = null;
            secondTile = null;
        }

        function checkWin() {
            if (matches === totalPairs) {
                setTimeout(() => {
                    alert('You win!');
                    initializeGame();
                }, 500);
            }
        }

        // Function to reveal all tiles for 10 seconds before the game starts
        function revealTilesBeforeStart() {
            const gameContainer = document.getElementById('gameContainer');
            const allTiles = gameContainer.querySelectorAll('.tile');

            // Show all tiles (reveal them) for 10 seconds
            allTiles.forEach(tile => {
                tile.classList.add('revealed');
                tile.textContent = tile.dataset.symbol;
            });

            // After 10 seconds, hide the symbols and prepare the game
            setTimeout(() => {
                allTiles.forEach(tile => {
                    tile.classList.remove('revealed');
                    tile.textContent = ''; // Hide symbols
                });
            }, 10000); // 10 seconds
        }

        initializeGame();
    </script>
</body>
</html>
