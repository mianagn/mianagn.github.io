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

const vertex = `
    attribute vec3 position;
    attribute vec3 next;
    attribute vec3 prev;
    attribute vec2 uv;
    attribute float side;

    uniform vec2 uResolution;
    uniform float uDPR;
    uniform float uThickness;

    vec4 getPosition() {
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1);
        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;

        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x);
        normal /= aspect;
        normal *= 1.0 - pow(abs(uv.y - 0.5) * 1.9, 2.0);

        float pixelWidth = 1.0 / (uResolution.y / uDPR);
        normal *= pixelWidth * uThickness;

        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);

        vec4 current = vec4(position, 1);
        current.xy -= normal * side;
        return current;
    }

    void main() {
        gl_Position = getPosition();
    }
`;

const renderer = new Renderer({ dpr: 2, alpha: true });
const gl = renderer.gl;
document.body.appendChild(gl.canvas);

const scene = new Transform();
const lines = [];

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight); // Resize canvas to full viewport
    lines.forEach(line => line.polyline.resize()); // Update polyline resolution
}
window.addEventListener('resize', resize, false);

function random(a, b) {
    const alpha = Math.random();
    return a * (1.0 - alpha) + b * alpha;
}

['#ffffff', '#00c1f1'].forEach((color, i) => {
    const line = {
        spring: random(0.01, 0.05),
        friction: random(0.7, 0.95),
        mouseVelocity: new Vec3(),
        mouseOffset: new Vec3(random(-1, 1) * 0.02)
    };

    const count = 20;
    const points = (line.points = []);
    for (let i = 0; i < count; i++) points.push(new Vec3());

    line.polyline = new Polyline(gl, {
        points,
        vertex,
        uniforms: {
            uColor: { value: new Color(color) },
            uThickness: { value: random(3, 3) }
        }
    });

    line.polyline.mesh.setParent(scene);
    lines.push(line);
});

resize();

const mouse = new Vec3();
if ('ontouchstart' in window) {
    window.addEventListener('touchstart', updateMouse, false);
    window.addEventListener('touchmove', updateMouse, false);
} else {
    window.addEventListener('mousemove', updateMouse, false); // Listen globally for mouse movements
}

function updateMouse(e) {
    if (e.changedTouches && e.changedTouches.length) {
        e.x = e.changedTouches[0].pageX;
        e.y = e.changedTouches[0].pageY;
    }
    if (e.x === undefined) {
        e.x = e.pageX;
        e.y = e.pageY;
    }

    mouse.set((e.x / gl.renderer.width) * 2 - 1, (e.y / gl.renderer.height) * -2 + 1, 0);
}

const tmp = new Vec3();

requestAnimationFrame(update);
function update(t) {
    requestAnimationFrame(update);

    lines.forEach(line => {
        for (let i = line.points.length - 1; i >= 0; i--) {
            if (!i) {
                tmp.copy(mouse)
                    .add(line.mouseOffset)
                    .sub(line.points[i])
                    .multiply(line.spring);
                line.mouseVelocity.add(tmp).multiply(line.friction);
                line.points[i].add(line.mouseVelocity);
            } else {
                line.points[i].lerp(line.points[i - 1], 0.5);
            }
        }
        line.polyline.updateGeometry();
    });

    renderer.render({ scene });
}

const sections = document.querySelectorAll(".section"); // Select all sections

let currentSection = 0; // Tracks the current section
const navButtons = document.querySelectorAll(".button-link");
let isScrolling = false; // Cooldown flag

// Scroll to a specific section
function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth" });

    // Highlight the active button
    updateActiveButton(index);

    // Update the current section
    currentSection = index;

    // Cooldown to prevent multiple scrolls
    setTimeout(() => {
        isScrolling = false;
    }, 100); // Adjust cooldown time as needed
}

// Update the active button based on the current section
function updateActiveButton(index) {
    navButtons.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });
}

// Handle scroll events
window.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        scrollToSection(currentSection + 1); // Scroll down
    } else {
        scrollToSection(currentSection - 1); // Scroll up
    }
});

// Handle navigation button clicks
navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => scrollToSection(index));
});

// Detect the current section in view on scroll
window.addEventListener("scroll", () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            updateActiveButton(index);
            currentSection = index;
        }
    });
});

// Initialize the active button on page load
document.addEventListener("DOMContentLoaded", () => {
    updateActiveButton(currentSection); // Highlight the "Home" button
});



document.addEventListener('DOMContentLoaded', () => {
  const emailBtn = document.getElementById('emailBtn');
  const email = 'mixalisanagnostou2003@gmail.com';
  // Add click event to copy email
  emailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        const tooltip = tippy.getInstance(emailBtn);
      })
      .catch(err => {
        console.error('Failed to copy email: ', err);
      });
  });
});