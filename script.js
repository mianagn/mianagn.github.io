/**
 * Mouse trail animation using OGL WebGL library
 * This script creates interactive cursor trails with physics-based animation
 */

// Import required OGL modules for WebGL graphics rendering
import {
    Polyline,
    Renderer,
    Transform,
    Geometry,
    Program,
    Mesh,
    Vec3,
    Vec2,
    Color
} from 'https://cdn.jsdelivr.net/npm/ogl@0.0.25/dist/ogl.mjs';

/**
 * WebGL Cursor Trail Effect
 * Creates interactive lines that follow the cursor with physics simulation
 */
const vertex = `
    // Vertex shader for curve effect
    attribute vec3 position;
    attribute vec3 next;
    attribute vec3 prev;
    attribute vec2 uv;
    attribute float side;

    uniform vec2 uResolution;
    uniform float uDPR;
    uniform float uThickness;

    vec4 getPosition() {
        // Calculate aspect ratio and normalized screen coordinates
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;

        // Calculate tangent and normal vectors
        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;
        normal *= 1.0 - pow(abs(uv.y - 0.5) * 1.9, 2.0);

        // Apply thickness with pixel precision
        float pixelWidth = 1.0 / (uResolution.y / uDPR);
        normal *= pixelWidth * uThickness;

        // Add distance-based tapering
        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);

        // Calculate final position
        vec4 current = vec4(position, 1);
        current.xy -= normal * side;
        return current;
    }

    void main() {
        gl_Position = getPosition();
    }
`;

// Initialize WebGL renderer with high DPI support and transparency
const renderer = new Renderer({ dpr: 2, alpha: true });
const gl = renderer.gl;
document.body.appendChild(gl.canvas);

// Create scene and array to store line objects
const scene = new Transform();
const lines = [];

/**
 * Handle window resize events
 * Adjusts canvas size and updates all polylines
 */
function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    lines.forEach(line => line.polyline.resize());
}
window.addEventListener('resize', resize, false);

/**
 * Generate random value between min and max
 * Used for variation in line properties
 * @param {number} a - Minimum value
 * @param {number} b - Maximum value
 * @return {number} Random value between a and b
 */
function random(a, b) {
    const alpha = Math.random();
    return a * (1.0 - alpha) + b * alpha;
}

// Create two cursor trail lines with different colors
['#ffffff', '#4fb6c9'].forEach((color, i) => {
    // Line object with physics simulation properties
    const line = {
        spring: random(0.01, 0.05),      // Spring constant for movement
        friction: random(0.7, 0.95),     // Friction to slow movement
        mouseVelocity: new Vec3(),       // Current velocity
        mouseOffset: new Vec3(random(-1, 1) * 0.02) // Offset from cursor
    };

    // Create array of points for the line
    const count = 20;
    const points = (line.points = []);
    for (let i = 0; i < count; i++) points.push(new Vec3());

    // Create polyline mesh with custom shader and properties
    line.polyline = new Polyline(gl, {
        points,
        vertex,
        uniforms: {
            uColor: { value: new Color(color) },
            uThickness: { value: random(3, 3) }
        }
    });

    // Add to scene and store in array
    line.polyline.mesh.setParent(scene);
    lines.push(line);
});

// Initialize canvas size
resize();

// Track mouse position as 3D vector
const mouse = new Vec3();

// Detect device type and add appropriate event listeners
if ('ontouchstart' in window) {
    window.addEventListener('touchstart', updateMouse, false);
    window.addEventListener('touchmove', updateMouse, false);
} else {
    window.addEventListener('mousemove', updateMouse, false);
}

/**
 * Update mouse/touch position in normalized device coordinates
 * @param {Event} e - Mouse or touch event
 */
function updateMouse(e) {
    // Handle touch events
    if (e.changedTouches && e.changedTouches.length) {
        e.x = e.changedTouches[0].pageX;
        e.y = e.changedTouches[0].pageY;
    }
    if (e.x === undefined) {
        e.x = e.pageX;
        e.y = e.pageY;
    }

    // Convert to normalized coordinates (-1 to 1)
    mouse.set(
        (e.x / gl.renderer.width) * 2 - 1, 
        (e.y / gl.renderer.height) * -2 + 1, 
        0
    );
}

// Temporary vector for calculations
const tmp = new Vec3();

/**
 * Animation loop
 * Updates line positions with spring physics and renders the scene
 * @param {number} t - Timestamp
 */
requestAnimationFrame(update);
function update(t) {
    requestAnimationFrame(update);

    // Update each line's points
    lines.forEach(line => {
        for (let i = line.points.length - 1; i >= 0; i--) {
            if (!i) {
                // First point follows mouse with spring physics
                tmp.copy(mouse)
                    .add(line.mouseOffset)
                    .sub(line.points[i])
                    .multiply(line.spring);
                line.mouseVelocity.add(tmp).multiply(line.friction);
                line.points[i].add(line.mouseVelocity);
            } else {
                // Other points follow the previous point
                line.points[i].lerp(line.points[i - 1], 0.5);
            }
        }
        line.polyline.updateGeometry();
    });

    // Render the scene
    renderer.render({ scene });
}

// ----- Section Navigation System -----

// Get all sections and navigation buttons
const sections = document.querySelectorAll(".section");
let currentSection = 0;
const navButtons = document.querySelectorAll(".nav-link");
let isScrolling = false;

/**
 * Smooth Section Navigation
 * Enables wheel and button navigation between sections
 */
function scrollToSection(index) {
    // Validate index and check if already scrolling
    if (index < 0 || index >= sections.length || isScrolling) return;

    // Set scrolling flag to prevent multiple triggers
    isScrolling = true;
    
    // Scroll to section and update UI
    sections[index].scrollIntoView({ behavior: "smooth" });
    updateActiveButton(index);
    currentSection = index;

    // Reset scrolling flag after brief timeout
    setTimeout(() => {
        isScrolling = false;
    }, 100);
}

/**
 * Update active state of navigation buttons
 * @param {number} index - Index of active section
 */
function updateActiveButton(index) {
    navButtons.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });
}

// Mouse wheel navigation between sections
window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        scrollToSection(currentSection + 1); // Scroll down
    } else {
        scrollToSection(currentSection - 1); // Scroll up
    }
});

// Navigation button click handlers
navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => scrollToSection(index));
});

// Update active section on scroll
window.addEventListener("scroll", () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            updateActiveButton(index);
            currentSection = index;
        }
    });
});

// Initialize active button on page load
document.addEventListener("DOMContentLoaded", () => {
    updateActiveButton(currentSection);
});

// ----- Email Copy Functionality -----

/**
 * Copy email address to clipboard when button is clicked
 */
document.addEventListener('DOMContentLoaded', () => {
    const emailBtn = document.getElementById('emailBtn');
    const email = 'mixalisanagnostou2003@gmail.com';
    
    emailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                const tooltip = tippy.getInstance(emailBtn);
                // Tooltip handling is managed by Tippy.js
            })
            .catch(err => {
                console.error('Failed to copy email: ', err);
            });
    });
});

// ----- CTA Button Functionality -----

document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        
        // Update active navigation state
        const projectsNavLink = document.querySelectorAll('.nav-link')[1]; // Projects is second nav item
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        projectsNavLink.classList.add('active');
        currentSection = 1; // Update current section variable
    });
});

/**
 * Theme System
 * Handles theme switching with persistence and smooth transitions
 */
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use device preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme - FIXED LOGIC
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = false; // Unchecked = sun/light mode
    } else if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true; // Checked = moon/dark mode
    } else if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        document.body.classList.add('light-theme');
        themeToggle.checked = false;
    }
    
    // Toggle theme when switch is clicked - FIXED LOGIC
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        }
        
        // Update project images based on theme
        const lightThemeImages = document.querySelectorAll('.light-theme-img');
        const darkThemeImages = document.querySelectorAll('.dark-theme-img');
        
        if (this.checked) {
            // Dark theme - fade in dark images, fade out light images
            lightThemeImages.forEach(img => {
                img.style.opacity = 0;
                setTimeout(() => { img.style.display = 'none'; }, 300);
            });
            
            darkThemeImages.forEach(img => {
                img.style.display = 'block';
                setTimeout(() => { img.style.opacity = 1; }, 50);
            });
        } else {
            // Light theme - fade in light images, fade out dark images
            darkThemeImages.forEach(img => {
                img.style.opacity = 0;
                setTimeout(() => { img.style.display = 'none'; }, 300);
            });
            
            lightThemeImages.forEach(img => {
                img.style.display = 'block';
                setTimeout(() => { img.style.opacity = 1; }, 50);
            });
        }
    });
});

// ----- Update WebGL Cursor Trails on Theme Change -----

document.addEventListener('DOMContentLoaded', () => {
    // Reference to the canvas element
    const canvas = document.querySelector('canvas');
    
    // Function to update cursor trail colors based on theme
    function updateCursorTrailColors() {
        if (document.body.classList.contains('light-theme')) {
            // Light theme - adjust cursor trail to match site purple
            if (canvas) {
                canvas.style.filter = 'hue-rotate(-160deg) saturate(1.5)';
            }
        } else {
            // Dark theme - reset to original colors
            if (canvas) {
                canvas.style.filter = 'none';
            }
        }
    }
    
    // Initial update
    updateCursorTrailColors();
    
    // Listen for theme toggle changes
    document.getElementById('theme-toggle').addEventListener('change', updateCursorTrailColors);
});

// Combined DOM-loaded event listener for animations
document.addEventListener('DOMContentLoaded', () => {
    const skillsBox = document.querySelector('.skills-box');
    const profileImage = document.querySelector('.profile-image');
    const nameTitle = document.querySelector('.name-title');
    const introText = document.querySelector('.intro-text');
    const ctaButton = document.querySelector('.cta-button');

    // Trigger animations
    skillsBox.classList.add('animate-slide-in-left');
    profileImage.classList.add('animate-slide-in-left');
    nameTitle.classList.add('animate-slide-in-right');
    introText.classList.add('animate-slide-in-right');
    ctaButton.classList.add('animate-slide-in-right');

    // Profile border animation
    if (document.body.classList.contains('dark-theme')) {
        profileImage.offsetHeight; // Trigger reflow
        profileImage.classList.add('animate-border');
    }

    // Initial animation on page load (after 300ms)
    setTimeout(() => {
        profileImage.classList.add('animate-border');
    }, 300);

    // Listen for theme toggle changes
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', function() {
        // Profile image border animation (already working)
        profileImage.classList.remove('animate-border');
        
        // Remove all animations first
        skillsBox.classList.remove('animate-slide-in-left');
        profileImage.classList.remove('animate-slide-in-left');
        nameTitle.classList.remove('animate-slide-in-right');
        introText.classList.remove('animate-slide-in-right');
        ctaButton.classList.remove('animate-slide-in-right');
        
        // Force reflow to ensure animations can be re-triggered
        void profileImage.offsetWidth;
        void skillsBox.offsetWidth;
        void nameTitle.offsetWidth;
        void introText.offsetWidth;
        void ctaButton.offsetWidth;
        
        // Re-add all animations with a slight delay
        setTimeout(() => {
            // Re-apply all animations
            skillsBox.classList.add('animate-slide-in-left');
            profileImage.classList.add('animate-slide-in-left');
            nameTitle.classList.add('animate-slide-in-right');
            introText.classList.add('animate-slide-in-right');
            ctaButton.classList.add('animate-slide-in-right');
            profileImage.classList.add('animate-border');
        }, 50);
    });
});
