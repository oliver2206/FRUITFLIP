
    const fruits = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🥝', '🍑', 
                    '🥭', '🍋', '🍏', '🍐', '🥥', '🥕', '🌽', '🍅', '🍆'];

    // Add bouncing fruits to the background
    function addFruits() {
        const body = document.body;
        for (let i = 0; i < 20; i++) {
            const fruitDiv = document.createElement('div');
            fruitDiv.classList.add('fruit');
            fruitDiv.textContent = fruits[Math.floor(Math.random() * fruits.length)];
            fruitDiv.style.left = `${Math.random() * window.innerWidth}px`;
            fruitDiv.style.top = `${Math.random() * window.innerHeight}px`;
            fruitDiv.style.animationDuration = `${Math.random() * 5 + 5}s`;
            body.appendChild(fruitDiv);
        }
    }

    // Initialize when the page loads
    window.onload = () => {
        addFruits(); // Add bouncing fruits to the background
    };

