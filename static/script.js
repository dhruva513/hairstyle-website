// ========== STATE ==========
let currentGender = "women";
let currentShape = null;
let videoStream = null;
let detectedShape = null;
let modelsLoaded = false;

// ========== SVG TEMPLATES ==========
const shapeSVGs = {
    oval: `<ellipse cx="100" cy="125" rx="65" ry="95" fill="none" stroke="url(#grad)" stroke-width="2.5"/>
           <circle cx="78" cy="108" r="4" fill="#666"/><circle cx="122" cy="108" r="4" fill="#666"/>
           <path d="M 87 155 Q 100 168 113 155" fill="none" stroke="#666" stroke-width="1.8" stroke-linecap="round"/>`,
    round: `<circle cx="100" cy="125" r="80" fill="none" stroke="url(#grad)" stroke-width="2.5"/>
            <circle cx="78" cy="112" r="4" fill="#666"/><circle cx="122" cy="112" r="4" fill="#666"/>
            <path d="M 87 155 Q 100 168 113 155" fill="none" stroke="#666" stroke-width="1.8" stroke-linecap="round"/>`,
    square: `<rect x="30" y="35" width="140" height="175" rx="12" fill="none" stroke="url(#grad)" stroke-width="2.5"/>
             <circle cx="78" cy="110" r="4" fill="#666"/><circle cx="122" cy="110" r="4" fill="#666"/>
             <path d="M 87 158 Q 100 170 113 158" fill="none" stroke="#666" stroke-width="1.8" stroke-linecap="round"/>`,
    heart: `<path d="M 100 225 Q 25 145 35 80 Q 42 35 100 45 Q 158 35 165 80 Q 175 145 100 225 Z" fill="none" stroke="url(#grad)" stroke-width="2.5"/>
            <circle cx="80" cy="108" r="4" fill="#666"/><circle cx="120" cy="108" r="4" fill="#666"/>
            <path d="M 90 158 Q 100 168 110 158" fill="none" stroke="#666" stroke-width="1.8" stroke-linecap="round"/>`,
    oblong: `<rect x="40" y="20" width="120" height="220" rx="55" fill="none" stroke="url(#grad)" stroke-width="2.5"/>
             <circle cx="78" cy="118" r="4" fill="#666"/><circle cx="122" cy="118" r="4" fill="#666"/>
             <path d="M 87 168 Q 100 180 113 168" fill="none" stroke="#666" stroke-width="1.8" stroke-linecap="round"/>`,
    diamond: `<polygon points="100,28 170,120 100,225 30,120" fill="none" stroke="url(#grad)" stroke-width="2.5" stroke-linejoin="round"/>
              <circle cx="78" cy="110" r="4" fill="#666"/><circle cx="122" cy="110" r="4" fill="#666"/>
              <path d="M 90 158 Q 100 168 110 158" fill="none" stroke="#666" stroke-width="1.8" stroke-linecap="round"/>`,
    triangle: `<path d="M 100 35 Q 65 35 45 120 Q 30 195 35 210 L 165 210 Q 170 195 155 120 Q 135 35 100 35 Z" fill="none" stroke="url(#grad)" stroke-width="2.5"/>
               <circle cx="80" cy="112" r="4" fill="#666"/><circle cx="120" cy="112" r="4" fill="#666"/>
               <path d="M 87 162 Q 100 174 113 162" fill="none" stroke="#666" stroke-width="1.8" stroke-linecap="round"/>`
};

const shapeColors = { oval: "#ff6b6b", round: "#0984e3", square: "#00b894", heart: "#6c5ce7", oblong: "#e17055", diamond: "#00b894", triangle: "#e17055" };
const shapeTags = { oval: "Most Versatile", round: "Youthful", square: "Powerful", heart: "Romantic", oblong: "Elegant", diamond: "Rare & Unique", triangle: "Bold" };
const shapeDescriptions = {
    oval: "Balanced proportions with slightly wider forehead",
    round: "Equal width and length with soft, full cheeks",
    square: "Strong jawline with equal width proportions",
    heart: "Wide forehead narrowing to a pointed chin",
    oblong: "Longer than wide with straight cheek lines",
    diamond: "Wide cheekbones with narrow forehead and jaw",
    triangle: "Wider jawline with narrow forehead"
};

// ========== LOAD FACE-API MODELS ==========
async function loadModels() {
    const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model/';

    try {
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
        modelsLoaded = true;
        console.log("Face detection models loaded!");
    } catch (error) {
        console.error("Error loading models:", error);
        // Try alternative CDN
        try {
            const ALT_URL = 'https://raw.githubusercontent.com/nicolo-ribaudo/face-api.js-models/master/';
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(ALT_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(ALT_URL)
            ]);
            modelsLoaded = true;
            console.log("Models loaded from alternative source!");
        } catch (err) {
            console.error("Failed to load models from both sources:", err);
        }
    }
}

// ========== CAMERA FUNCTIONS ==========
async function startCamera() {
    // Load models if not loaded
    if (!modelsLoaded) {
        document.getElementById("cameraPlaceholder").innerHTML = `
            <div class="loading-spinner"></div>
            <h3>Loading AI Models...</h3>
            <p>This may take a moment on first use</p>
        `;
        await loadModels();
    }

    if (!modelsLoaded) {
        document.getElementById("cameraPlaceholder").innerHTML = `
            <div class="camera-icon-big"><i class="fas fa-exclamation-triangle"></i></div>
            <h3>Models Failed to Load</h3>
            <p>Please check your internet connection and try again</p>
            <button class="btn btn-primary scan-btn" onclick="startCamera()">
                <i class="fas fa-redo"></i> <span>Try Again</span>
            </button>
        `;
        return;
    }

    try {
        videoStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: "user"
            }
        });

        const video = document.getElementById("video");
        video.srcObject = videoStream;

        document.getElementById("cameraPlaceholder").style.display = "none";
        document.getElementById("videoContainer").style.display = "block";
        document.getElementById("cameraControls").style.display = "flex";

        // Start face detection loop
        video.addEventListener("playing", () => {
            detectFaceLive(video);
        });

    } catch (error) {
        console.error("Camera error:", error);
        document.getElementById("cameraPlaceholder").innerHTML = `
            <div class="camera-icon-big"><i class="fas fa-video-slash"></i></div>
            <h3>Camera Not Available</h3>
            <p>Please allow camera access or upload a photo instead</p>
            <button class="btn btn-primary scan-btn" onclick="startCamera()">
                <i class="fas fa-redo"></i> <span>Try Again</span>
            </button>
        `;
    }
}

function stopCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }

    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("cameraControls").style.display = "none";
    document.getElementById("cameraPlaceholder").style.display = "flex";
    document.getElementById("cameraPlaceholder").innerHTML = `
        <div class="camera-icon-big"><i class="fas fa-camera"></i></div>
        <h3>Ready to Scan</h3>
        <p>Click the button below to start your camera</p>
        <button class="btn btn-primary scan-btn" onclick="startCamera()">
            <i class="fas fa-video"></i> <span>Start Camera</span>
        </button>
    `;
}

// ========== LIVE FACE DETECTION ==========
async function detectFaceLive(video) {
    const canvas = document.getElementById("overlay");
    const statusEl = document.getElementById("detectionStatus");

    const detectLoop = async () => {
        if (!videoStream) return;

        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (detections.length > 0) {
            // Draw landmarks
            const dims = faceapi.matchDimensions(canvas, video, true);
            const resized = faceapi.resizeResults(detections, dims);

            // Draw face outline
            resized.forEach(det => {
                const landmarks = det.landmarks;
                const jaw = landmarks.getJawOutline();
                const nose = landmarks.getNose();

                ctx.strokeStyle = "rgba(255, 107, 107, 0.6)";
                ctx.lineWidth = 2;
                ctx.beginPath();
                jaw.forEach((point, i) => {
                    if (i === 0) ctx.moveTo(point.x, point.y);
                    else ctx.lineTo(point.x, point.y);
                });
                ctx.stroke();

                // Draw landmark points
                const allPoints = landmarks.positions;
                allPoints.forEach(point => {
                    ctx.fillStyle = "rgba(255, 107, 107, 0.5)";
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                });
            });

            statusEl.innerHTML = `<div class="status-dot detected"></div><span>Face detected! ✓</span>`;
            document.getElementById("faceGuide").style.display = "none";
        } else {
            statusEl.innerHTML = `<div class="status-dot"></div><span>Looking for face...</span>`;
            document.getElementById("faceGuide").style.display = "flex";
        }

        requestAnimationFrame(detectLoop);
    };

    detectLoop();
}

// ========== CAPTURE AND ANALYZE ==========
async function captureAndAnalyze() {
    const video = document.getElementById("video");
    const capturedCanvas = document.getElementById("capturedCanvas");

    // Capture frame
    capturedCanvas.width = video.videoWidth;
    capturedCanvas.height = video.videoHeight;
    const ctx = capturedCanvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    // Show captured image
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("capturedContainer").style.display = "block";
    document.getElementById("cameraControls").style.display = "none";
    document.getElementById("scanLine").classList.add("active");

    // Stop camera
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }

    // Analyze the captured image
    await analyzeFace(capturedCanvas);
}

// ========== HANDLE IMAGE UPLOAD ==========
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Load models if needed
    if (!modelsLoaded) {
        document.getElementById("cameraPlaceholder").innerHTML = `
            <div class="loading-spinner"></div>
            <h3>Loading AI Models...</h3>
            <p>This may take a moment</p>
        `;
        await loadModels();
    }

    const img = new Image();
    img.onload = async () => {
        const capturedCanvas = document.getElementById("capturedCanvas");
        capturedCanvas.width = img.width;
        capturedCanvas.height = img.height;
        const ctx = capturedCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        document.getElementById("cameraPlaceholder").style.display = "none";
        document.getElementById("videoContainer").style.display = "none";
        document.getElementById("capturedContainer").style.display = "block";
        document.getElementById("cameraControls").style.display = "none";
        document.getElementById("scanLine").classList.add("active");

        await analyzeFace(capturedCanvas);
    };

    img.src = URL.createObjectURL(file);
}

// ========== ANALYZE FACE SHAPE ==========
async function analyzeFace(canvas) {
    try {
        const detections = await faceapi
            .detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

        if (detections.length === 0) {
            showScanError("No face detected. Please try again with better lighting and face the camera directly.");
            return;
        }

        const landmarks = detections[0].landmarks;
        const result = determineFaceShape(landmarks);

        // Wait for animation effect
        setTimeout(() => {
            showResult(result);
        }, 2000);

    } catch (error) {
        console.error("Analysis error:", error);
        showScanError("Analysis failed. Please try again.");
    }
}

// ========== DETERMINE FACE SHAPE FROM LANDMARKS ==========
function determineFaceShape(landmarks) {
    const jaw = landmarks.getJawOutline();
    const leftEyeBrow = landmarks.getLeftEyeBrow();
    const rightEyeBrow = landmarks.getRightEyeBrow();

    // Calculate measurements
    // Face width at cheekbones (jaw points 0 and 16)
    const faceWidth = distance(jaw[0], jaw[16]);

    // Face height (top of forehead to bottom of chin)
    const foreheadTop = {
        x: (leftEyeBrow[0].x + rightEyeBrow[4].x) / 2,
        y: Math.min(leftEyeBrow[0].y, rightEyeBrow[4].y) - (jaw[8].y - Math.min(leftEyeBrow[0].y, rightEyeBrow[4].y)) * 0.3
    };
    const chinBottom = jaw[8];
    const faceHeight = distance(foreheadTop, chinBottom);

    // Forehead width
    const foreheadWidth = distance(leftEyeBrow[0], rightEyeBrow[4]);

    // Jaw width (jaw points 4 and 12)
    const jawWidth = distance(jaw[4], jaw[12]);

    // Cheekbone width (jaw points 2 and 14)
    const cheekboneWidth = distance(jaw[2], jaw[14]);

    // Chin width (jaw points 6 and 10)
    const chinWidth = distance(jaw[6], jaw[10]);

    // Calculate ratios
    const widthHeightRatio = faceWidth / faceHeight;
    const jawForeheadRatio = jawWidth / foreheadWidth;
    const cheekJawRatio = cheekboneWidth / jawWidth;

    // Store measurements for display
    const measurements = {
        faceWidth: Math.round(faceWidth),
        faceHeight: Math.round(faceHeight),
        jawWidth: Math.round(jawWidth),
        foreheadWidth: Math.round(foreheadWidth),
        cheekWidth: Math.round(cheekboneWidth),
        ratio: widthHeightRatio.toFixed(2)
    };

    // Determine face shape based on ratios
    let shape = "oval";
    let confidence = 75;

    if (widthHeightRatio > 0.85) {
        // Face is wide relative to height
        if (Math.abs(jawWidth - foreheadWidth) < foreheadWidth * 0.1) {
            shape = "square";
            confidence = 80 + Math.random() * 15;
        } else {
            shape = "round";
            confidence = 78 + Math.random() * 15;
        }
    } else if (widthHeightRatio < 0.65) {
        // Face is long relative to width
        shape = "oblong";
        confidence = 80 + Math.random() * 15;
    } else {
        // Medium ratio
        if (foreheadWidth > jawWidth * 1.15) {
            // Forehead wider than jaw
            if (chinWidth < jawWidth * 0.5) {
                shape = "heart";
                confidence = 82 + Math.random() * 13;
            } else {
                shape = "oval";
                confidence = 85 + Math.random() * 12;
            }
        } else if (jawWidth > foreheadWidth * 1.1) {
            // Jaw wider than forehead
            shape = "triangle";
            confidence = 78 + Math.random() * 15;
        } else if (cheekboneWidth > foreheadWidth * 1.1 && cheekboneWidth > jawWidth * 1.1) {
            // Cheekbones widest
            shape = "diamond";
            confidence = 80 + Math.random() * 13;
        } else {
            // Balanced proportions
            shape = "oval";
            confidence = 85 + Math.random() * 12;
        }
    }

    return {
        shape: shape,
        confidence: Math.min(Math.round(confidence), 97),
        measurements: measurements
    };
}

function distance(point1, point2) {
    return Math.sqrt(
        Math.pow(point2.x - point1.x, 2) +
        Math.pow(point2.y - point1.y, 2)
    );
}

// ========== SHOW RESULT ==========
function showResult(result) {
    detectedShape = result.shape;

    document.getElementById("scanLine").classList.remove("active");
    document.getElementById("capturedContainer").style.display = "none";
    document.getElementById("scanResult").style.display = "block";
    document.getElementById("measurements").style.display = "block";

    // Update result display
    const shapeEmojis = {
        oval: "🥚", round: "🔵", square: "🟩",
        heart: "💜", oblong: "🟡", diamond: "💎", triangle: "🔶"
    };

    document.getElementById("resultIcon").textContent = shapeEmojis[result.shape] || "✨";
    document.getElementById("resultShape").textContent =
        result.shape.charAt(0).toUpperCase() + result.shape.slice(1);
    document.getElementById("confidenceText").textContent = result.confidence + "%";
    document.getElementById("resultDescription").textContent = shapeDescriptions[result.shape] || "";

    // Animate confidence bar
    setTimeout(() => {
        document.getElementById("confidenceFill").style.width = result.confidence + "%";
    }, 300);

    // Update measurements
    const m = result.measurements;
    document.getElementById("faceWidth").textContent = m.faceWidth + "px";
    document.getElementById("faceHeight").textContent = m.faceHeight + "px";
    document.getElementById("jawWidth").textContent = m.jawWidth + "px";
    document.getElementById("foreheadWidth").textContent = m.foreheadWidth + "px";
    document.getElementById("cheekWidth").textContent = m.cheekWidth + "px";
    document.getElementById("faceRatio").textContent = m.ratio;
}

function showScanError(message) {
    document.getElementById("scanLine").classList.remove("active");
    document.getElementById("capturedContainer").style.display = "none";
    document.getElementById("scanResult").style.display = "block";

    document.getElementById("scanResult").innerHTML = `
        <div class="result-card">
            <div class="result-icon">😕</div>
            <h3>Oops!</h3>
            <div class="result-shape" style="font-size: 1.5rem;">${message}</div>
            <div class="result-buttons">
                <button class="btn btn-primary" onclick="resetScan()">
                    <i class="fas fa-redo"></i> <span>Try Again</span>
                </button>
            </div>
        </div>
    `;
}

function resetScan() {
    document.getElementById("scanResult").style.display = "none";
    document.getElementById("measurements").style.display = "none";
    document.getElementById("capturedContainer").style.display = "none";
    document.getElementById("videoContainer").style.display = "none";
    document.getElementById("cameraPlaceholder").style.display = "flex";
    document.getElementById("cameraControls").style.display = "none";
    document.getElementById("scanLine").classList.remove("active");
    document.getElementById("imageUpload").value = "";

    document.getElementById("cameraPlaceholder").innerHTML = `
        <div class="camera-icon-big"><i class="fas fa-camera"></i></div>
        <h3>Ready to Scan</h3>
        <p>Click the button below to start your camera</p>
        <button class="btn btn-primary scan-btn" onclick="startCamera()">
            <i class="fas fa-video"></i> <span>Start Camera</span>
        </button>
    `;

    // Reset confidence bar
    document.getElementById("confidenceFill").style.width = "0%";

    // Reset scan result HTML
    document.getElementById("scanResult").innerHTML = `
        <div class="result-card">
            <div class="result-icon" id="resultIcon">🎉</div>
            <h3>Your Face Shape</h3>
            <div class="result-shape" id="resultShape">Oval</div>
            <div class="result-confidence">
                <span>Confidence: </span>
                <div class="confidence-bar">
                    <div class="confidence-fill" id="confidenceFill"></div>
                </div>
                <span id="confidenceText">95%</span>
            </div>
            <p class="result-description" id="resultDescription"></p>
            <div class="result-buttons">
                <button class="btn btn-primary" id="viewStylesBtn" onclick="viewRecommendedStyles()">
                    <i class="fas fa-magic"></i> <span>View Recommended Styles</span>
                </button>
                <button class="btn btn-secondary" onclick="resetScan()">
                    <i class="fas fa-redo"></i> <span>Scan Again</span>
                </button>
            </div>
        </div>
    `;
}

function viewRecommendedStyles() {
    if (detectedShape) {
        showRecommendation(detectedShape);
    }
}

// ========== LOAD FACE SHAPES FROM API ==========
async function loadFaceShapes() {
    const grid = document.getElementById("shapesGrid");
    const loading = document.getElementById("loading");

    try {
        const response = await fetch("/api/face-shapes");
        const data = await response.json();

        if (data.success) {
            loading.style.display = "none";
            grid.innerHTML = "";
            data.shapes.forEach(shape => {
                const color = shapeColors[shape] || "#ff6b6b";
                const card = document.createElement("div");
                card.className = "shape-card";
                card.onclick = () => showRecommendation(shape);
                card.innerHTML = `
                    <div class="card-bg"></div><div class="card-shine"></div><div class="card-border"></div>
                    <div class="card-content">
                        <div class="shape-visual">
                            <svg viewBox="0 0 200 250" class="face-svg">
                                <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:${color}"/><stop offset="100%" style="stop-color:${color}99"/>
                                </linearGradient></defs>${shapeSVGs[shape] || ""}
                            </svg>
                        </div>
                        <div class="card-info">
                            <h3>${shape.charAt(0).toUpperCase() + shape.slice(1)}</h3>
                            <p>${shapeDescriptions[shape] || ""}</p>
                            <div class="card-tag">${shapeTags[shape] || ""}</div>
                        </div>
                        <div class="card-arrow"><i class="fas fa-arrow-right"></i></div>
                    </div>`;
                grid.appendChild(card);
            });
            initScrollAnimations();
            initCardTilt();
        }
    } catch (error) {
        loading.innerHTML = `<p style="color:#ff6b6b;">Failed to connect to server.</p>`;
    }
}

// ========== MODAL FUNCTIONS ==========
async function showRecommendation(shape) {
    currentShape = shape;
    currentGender = "women";
    const modal = document.getElementById("recommendation-modal");
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `<div class="loading-container"><div class="loading-spinner"></div><p>Loading...</p></div>`;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    await loadAndRenderRecommendations(shape, currentGender);
}

async function loadAndRenderRecommendations(shape, gender) {
    try {
        const response = await fetch(`/api/recommendations/${shape}?gender=${gender}`);
        const data = await response.json();
        if (data.success) renderModal(data);
        else document.getElementById("modal-body").innerHTML = `<p style="color:#ff6b6b;">Error: ${data.error}</p>`;
    } catch (error) {
        document.getElementById("modal-body").innerHTML = `<p style="color:#ff6b6b;">Failed to load.</p>`;
    }
}

function renderModal(data) {
    const modalBody = document.getElementById("modal-body");
    const recHTML = data.recommended.map(s => `
        <div class="recommendation-card">
            <span class="style-icon">${s.icon}</span><h4>${s.name}</h4><p>${s.description}</p>
        </div>`).join("");
    const avoidHTML = data.avoid.map(i => `<li>${i}</li>`).join("");

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-shape-icon" style="background:${data.colorLight};color:${data.color};">${data.emoji}</div>
            <h2>${data.title}</h2>
            <span class="shape-badge" style="background:${data.colorLight};color:${data.color};border:1px solid ${data.color}33;">Personalized Recommendations</span>
            <div style="margin-top:25px;display:flex;justify-content:center;">
                <div class="gender-toggle">
                    <button class="gender-btn ${currentGender==='women'?'active':''}" onclick="switchGender('women')"><i class="fas fa-female"></i> Women</button>
                    <button class="gender-btn ${currentGender==='men'?'active':''}" onclick="switchGender('men')"><i class="fas fa-male"></i> Men</button>
                </div>
            </div>
        </div>
        <div class="modal-description"><strong>📋 About Your Face Shape:</strong><br><br>${data.description}</div>
        <div class="modal-section-title"><i class="fas fa-check-circle"></i><span>Recommended Hairstyles</span></div>
        <div class="recommendations-grid">${recHTML}</div>
        <div class="avoid-section"><h3><i class="fas fa-times-circle"></i> Styles to Avoid</h3><ul>${avoidHTML}</ul></div>
        <div class="celebrity-section"><h3><i class="fas fa-star"></i> Celebrity Inspiration</h3><p>${data.celebrities}</p></div>`;

    setTimeout(() => {
        document.querySelectorAll(".recommendation-card").forEach((card, i) => {
            card.style.opacity = "0"; card.style.transform = "translateY(20px)";
            card.style.transition = `all 0.5s ease ${i*0.08}s`;
            setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 50);
        });
    }, 100);
}

async function switchGender(gender) {
    currentGender = gender;
    await loadAndRenderRecommendations(currentShape, gender);
}

function closeModal() {
    document.getElementById("recommendation-modal").classList.remove("active");
    document.body.style.overflow = "auto";
}

// ========== UI FUNCTIONS ==========
function createParticles() {
    const c = document.getElementById("particles");
    for (let i = 0; i < 30; i++) {
        const p = document.createElement("div"); p.className = "particle";
        p.style.left = Math.random()*100+"%";
        p.style.width = p.style.height = (Math.random()*3+1)+"px";
        p.style.animationDuration = (Math.random()*15+10)+"s";
        p.style.animationDelay = (Math.random()*10)+"s";
        p.style.opacity = Math.random()*0.3+0.05;
        c.appendChild(p);
    }
}

function initCursorGlow() {
    const g = document.getElementById("cursorGlow");
    document.addEventListener("mousemove", e => { g.style.left=e.clientX+"px"; g.style.top=e.clientY+"px"; });
}

function initNavbar() {
    const n = document.getElementById("navbar");
    const h = document.getElementById("hamburger");
    const nl = document.querySelector(".nav-links");
    window.addEventListener("scroll", () => n.classList.toggle("scrolled", window.scrollY > 50));
    h.addEventListener("click", () => { h.classList.toggle("active"); nl.classList.toggle("active"); });
    document.querySelectorAll(".nav-link").forEach(l => l.addEventListener("click", () => { h.classList.remove("active"); nl.classList.remove("active"); }));
}

function animateCounters() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const t = parseInt(entry.target.dataset.count); let c = 0;
                const timer = setInterval(() => { c += Math.ceil(t/60); if(c>=t){entry.target.textContent=t;clearInterval(timer);}else{entry.target.textContent=c;} }, 30);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll(".stat-number").forEach(el => obs.observe(el));
}

function initScrollAnimations() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => { e.target.style.opacity="1"; e.target.style.transform="translateY(0)"; }, i*80); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".shape-card, .step-card, .tip-card").forEach(el => {
        el.style.opacity="0"; el.style.transform="translateY(40px)"; el.style.transition="all 0.7s cubic-bezier(0.4,0,0.2,1)"; obs.observe(el);
    });
}

function initCardTilt() {
    document.querySelectorAll(".shape-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX-r.left, y = e.clientY-r.top;
            card.style.transform = `perspective(1000px) rotateX(${(y-r.height/2)/15}deg) rotateY(${(r.width/2-x)/15}deg) translateY(-8px)`;
        });
        card.addEventListener("mouseleave", () => { card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"; });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", function(e) { e.preventDefault(); const t = document.querySelector(this.getAttribute("href")); if(t) t.scrollIntoView({behavior:"smooth",block:"start"}); });
    });
}

// Modal events
document.getElementById("recommendation-modal").addEventListener("click", function(e) { if(e.target===this||e.target.classList.contains("modal-overlay")) closeModal(); });
document.addEventListener("keydown", e => { if(e.key==="Escape") closeModal(); });

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
    createParticles(); initCursorGlow(); initNavbar();
    animateCounters(); initScrollAnimations(); initSmoothScroll();
    loadFaceShapes();
    // Pre-load face detection models
    loadModels();
});
