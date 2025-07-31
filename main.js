// Typing effect
const texts = [
  "ไปซื้อคอมมาพ่อค้าถามว่าเอาสเปคแบบไหนหนูตอบไปว่าแบบพี่"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

const typingElement = document.querySelector('.typing-text');

function typeText() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeText, pauseTime);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeText, typingSpeed);
    return;
  }

  setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

// Create sparkle effect
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  
  // Random position and size
  const size = Math.random() * 4 + 2;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  
  // Random color in blue-purple range
  const hue = Math.random() * 60 + 240;
  sparkle.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;
  
  // Random position
  sparkle.style.left = Math.random() * window.innerWidth + 'px';
  sparkle.style.top = Math.random() * window.innerHeight + 'px';
  
  document.body.appendChild(sparkle);
  
  // Remove sparkle after animation
  setTimeout(() => {
    sparkle.remove();
  }, 1500);
}

// Create sparkles periodically
setInterval(createSparkle, 300);

// Start typing effect
typeText();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add scroll reveal effect for sections
const sections = document.querySelectorAll('section');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.6s ease-out';
  sectionObserver.observe(section);
});