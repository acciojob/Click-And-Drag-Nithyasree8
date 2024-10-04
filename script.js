
let isDragging = false;
let initialMouseX, initialCubeX;
let activeCube;

// Add event listeners to each cube
const cubes = document.querySelectorAll('.cube');
cubes.forEach((cube) => {
    cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialMouseX = e.clientX;
        initialCubeX = cube.offsetLeft;
        activeCube = cube;
    });
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dx = e.clientX - initialMouseX;
        const newX = initialCubeX + dx;

        // Ensure cube stays within container bounds
        const containerRect = document.querySelector('.cube-container').getBoundingClientRect();
        if (newX >= containerRect.left && newX + activeCube.offsetWidth <= containerRect.right) {
            activeCube.style.left = `${newX}px`;
        }
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Snap active cube to nearest cube on drag end
document.addEventListener('mouseup', () => {
    if (activeCube) {
        const cubeRect = activeCube.getBoundingClientRect();
        const center = cubeRect.left + cubeRect.width / 2;

        // Find nearest cube
        let nearestCube = null;
        let minDistance = Infinity;
        cubes.forEach((cube) => {
            const cubeCenter = cube.getBoundingClientRect().left + cube.getBoundingClientRect().width / 2;
            const distance = Math.abs(center - cubeCenter);
            if (distance < minDistance) {
                minDistance = distance;
                nearestCube = cube;
            }
        });

        // Snap active cube to nearest cube
        activeCube.style.left = `${nearestCube.offsetLeft}px`;
        activeCube = null;
    }
});