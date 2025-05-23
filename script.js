import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const mainQuestion = document.getElementById('main-question');
    const proposalContent = document.getElementById('proposal-content');
    const thankYouContainer = document.getElementById('thank-you-container');
    const buttonsContainer = document.querySelector('.buttons-container');

    noButton.addEventListener('click', () => {
        // On first click, set up for movement
        if (noButton.style.position !== 'fixed') {
            const rect = noButton.getBoundingClientRect();
            noButton.style.width = `${rect.width}px`;
            noButton.style.height = `${rect.height}px`;
            noButton.style.position = 'fixed';
            // Set its initial fixed position to where it was, to avoid a jump
            // This ensures it starts moving from its current visual location
            noButton.style.left = `${rect.left}px`;
            noButton.style.top = `${rect.top}px`;
            noButton.style.zIndex = '100'; // Ensure it's above other elements in button container
        }

        moveNoButtonRandomly();
        
        // Enhance the "Yes" button to make it more appealing
        const currentYesFontSize = parseFloat(window.getComputedStyle(yesButton, null).getPropertyValue('font-size'));
        if (currentYesFontSize < 28) { // Cap max font size (adjust for neon if needed)
             yesButton.style.fontSize = (currentYesFontSize + 1.5) + 'px'; // Smaller increment
        }
       
        const yesButtonMaxWidth = buttonsContainer.offsetWidth * 0.85; // Allow slightly wider
        if (yesButton.offsetWidth < yesButtonMaxWidth || buttonsContainer.classList.contains('column-layout')) { // consider column layout
            const currentPadding = parseFloat(window.getComputedStyle(yesButton).paddingLeft);
            if (currentPadding < 40) { // Cap padding
                yesButton.style.paddingLeft = (currentPadding + 2) + 'px';
                yesButton.style.paddingRight = (parseFloat(window.getComputedStyle(yesButton).paddingRight) + 2) + 'px';
            }
        }


        // Add more enticing text/emojis to Yes button, but don't make it too long
        const yesMessages = ["¡Di que sí!", "¡Por favooor!", "¡Será increíble!", "¡Acepta ya! 😍", "¡Te espera una sorpresa! ✨"];
        if (yesButton.textContent.length < 25) { // Keep messages concise
             yesButton.textContent = yesMessages[Math.floor(Math.random() * yesMessages.length)];
        } else {
            const emojis = ["💖", "🎉", "✨", "🌟", "🙏"];
            if (!emojis.some(emoji => yesButton.textContent.endsWith(emoji))) {
                yesButton.textContent += " " + emojis[Math.floor(Math.random() * emojis.length)];
            }
            if (yesButton.textContent.length > 35) {
                 yesButton.textContent = yesButton.textContent.substring(0, 32) + "...";
            }
        }
    });

    function moveNoButtonRandomly() {
        const maxX = window.innerWidth - noButton.offsetWidth - 10; 
        const maxY = window.innerHeight - noButton.offsetHeight - 10; 

        let randomX = Math.random() * maxX;
        let randomY = Math.random() * maxY;
        
        randomX = Math.max(5, randomX); 
        randomY = Math.max(5, randomY); 
        
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    }

    yesButton.addEventListener('click', () => {
        if (mainQuestion) mainQuestion.style.display = 'none';
        if (proposalContent) proposalContent.style.display = 'none'; 
        
        thankYouContainer.classList.remove('hidden');
        thankYouContainer.style.display = 'block'; // Ensure it's visible

        fireConfetti();
    });

    function fireConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { 
            startVelocity: 30, 
            spread: 360, 
            ticks: 60, 
            zIndex: 9999,
            colors: ['#FF69B4', '#00FFFF', '#39FF14', '#FF00FF', '#FFD700', '#FFFFFF'] // Neon Pink, Cyan, Green, Magenta, Gold, White
        };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            }));
        }, 250);
    }

    // Helper to check if buttons container is in column layout for JS logic
    function checkButtonLayout() {
        if (window.innerWidth <= 600) {
            buttonsContainer.classList.add('column-layout');
        } else {
            buttonsContainer.classList.remove('column-layout');
        }
    }
    window.addEventListener('resize', checkButtonLayout);
    checkButtonLayout(); // Initial check

});