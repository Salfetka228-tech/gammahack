document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('grid');
    const gridSizeSelector = document.getElementById('sizeSelector');
    const predictButton = document.getElementById('predictButton');

    // Function to create the grid with gray cells
    function createGrid(size) {
        grid.innerHTML = ''; // Clear the grid
        grid.style.gridTemplateColumns = `repeat(${size}, 80px)`; // Set columns

        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('button');
            cell.classList.add('grid-cell');
            grid.appendChild(cell);
        }
    }

    // Function to activate cells (predict crystals)
    function predictCrystals() {
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach(cell => cell.classList.remove('active')); // Remove previous active state

        const crystalCount = gridSizeSelector.value == '3' ? 4 : gridSizeSelector.value == '5' ? 12 : gridSizeSelector.value == '7' ? 23 : 0;
        const randomIndices = [];
        while (randomIndices.length < crystalCount) {
            const randomIndex = Math.floor(Math.random() * cells.length);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }

        // Apply 'active' class with delay
        randomIndices.forEach((index, i) => {
            setTimeout(() => {
                cells[index].classList.add('active'); // Activate cells one by one
            }, i * 500);
        });
    }

    // Event listener for changing grid size
    gridSizeSelector.addEventListener('change', function () {
        const size = parseInt(this.value);
        createGrid(size); // Regenerate grid when size changes
    });

    // Event listener for the "Predict Crystals" button
    predictButton.addEventListener('click', predictCrystals);

    // Create initial grid on page load
    createGrid(parseInt(gridSizeSelector.value));
});
