// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const letterWindow = document.querySelector(".letter-window");
const noBtn = document.querySelector(".no-btn");
const noContainer = document.querySelector(".no-container");
const yesBtn = document.querySelector(".yes-btn");
const yesContainer = document.querySelector(".yes-container");
const yesMessage = document.querySelector(".yes-message");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Messages that appear as user keeps clicking no
const yesMessages = [
    "Please? 🥺",
    "Are you sure? 💔",
    "Really? 😢",
    "Pretty please? 🙏",
    "One more chance? 💕",
    "Final answer? 😭"
];

let noClickCount = 0;
const maxNoClicks = 5;

// Open Letter with smooth animation
envelope.addEventListener("click", () => {
    envelope.style.opacity = "0";
    envelope.style.transform = "scale(0.8)";
    
    setTimeout(() => {
        envelope.style.display = "none";
        letter.style.display = "flex";
        
        // Trigger window animation
        setTimeout(() => {
            letterWindow.classList.add("open");
        }, 50);
    }, 400);
});

// "No" Button Click Logic - Scale buttons and change message
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (noClickCount < maxNoClicks) {
        noClickCount++;
        
        // Calculate scale factors (no gets smaller, yes gets bigger)
        const noScale = 1 - (noClickCount * 0.15); // Shrinks by 15% each click
        const yesScale = 1 + (noClickCount * 0.2);  // Grows by 20% each click
        
        // Apply scaling with smooth animation
        noContainer.style.transform = `scale(${noScale})`;
        yesContainer.style.transform = `scale(${yesScale})`;
        
        // Update message
        if (noClickCount < yesMessages.length) {
            yesMessage.textContent = yesMessages[noClickCount];
            
            // Animate message change
            yesMessage.classList.remove('show');
            setTimeout(() => {
                yesMessage.classList.add('show');
            }, 50);
        }
        
        // Add shake animation to no button
        noBtn.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            noBtn.style.animation = '';
        }, 500);
        
        // Add pulse to yes button
        yesContainer.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            yesContainer.style.animation = '';
        }, 600);
    }
    
    // After max clicks, just make yes button extra appealing
    if (noClickCount >= maxNoClicks) {
        yesContainer.style.animation = 'pulse 0.6s ease-in-out infinite';
        yesMessage.textContent = "You know you want to! 💝";
    }
});

// "Yes" Button Logic with enhanced effects
yesBtn.addEventListener("click", () => {
    title.textContent = "Yay! Love you! ♡";
    catImg.src = "cat_dance.gif";
    buttons.style.display = "none";
    finalText.style.display = "block";
    
    // Create enhanced confetti
    createConfetti();
    
    // Add sparkle effect
    letterWindow.style.animation = "windowOpen 0.5s ease, sparkle 0.6s ease 0.5s";
});

// Enhanced Confetti Function
function createConfetti() {
    const emojis = ['❤️', '💖', '💕', '💗', '🌹', '✨', '💝', '😻', '💘', '💞'];
    const count = 100; // More confetti!
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random starting position across the width
            const startX = Math.random() * 100;
            const endX = startX + (Math.random() - 0.5) * 40; // More drift
            const rotation = Math.random() * 360;
            const endRotation = rotation + (Math.random() * 720 - 360); // Spin more
            const duration = 2.5 + Math.random() * 2; // 2.5-4.5 seconds
            const delay = Math.random() * 0.3; // Stagger the start
            
            confetti.style.cssText = `
                position: fixed;
                left: ${startX}vw;
                top: -10vh;
                font-size: ${15 + Math.random() * 30}px;
                z-index: 1000;
                transition: all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s;
                transform: rotate(${rotation}deg);
                opacity: 1;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            // Animate falling with rotation and drift
            setTimeout(() => {
                confetti.style.top = '110vh';
                confetti.style.left = `${endX}vw`;
                confetti.style.transform = `rotate(${endRotation}deg)`;
                confetti.style.opacity = '0';
            }, 50);
            
            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000 + 100);
        }, i * 25); // Stagger creation
    }
}

// Add sparkle and shake animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0%, 100% { 
            filter: brightness(1) saturate(1);
        }
        50% { 
            filter: brightness(1.4) saturate(1.4);
            transform: scale(1.02);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Create more dynamic background hearts
function createBackgroundHearts() {
    const container = document.querySelector('.background-hearts');
    const heartCount = 8;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.textContent = '♡';
        heart.style.cssText = `
            position: absolute;
            font-size: ${25 + Math.random() * 20}px;
            color: rgba(212, 142, 158, ${0.2 + Math.random() * 0.2});
            left: ${Math.random() * 100}%;
            animation: floatUp ${15 + Math.random() * 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * -20}s;
            pointer-events: none;
        `;
        container.appendChild(heart);
    }
}

// Initialize background hearts
createBackgroundHearts();

// Add slight parallax effect to envelope on mouse move
document.addEventListener('mousemove', (e) => {
    if (envelope.style.display !== 'none') {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        envelope.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
});
