let score = 0;
let gameDuration = 30; // seconds
let timerInterval;
let spawnInterval;
let bgMusic = document.getElementById('bg-music');
const faces = ["😄", "😎", "😍", "🤩", "😋", "😜", "🥰"];
let activeFaces = [];

function createFlower() {
    const flower = document.createElement("div");
    flower.innerText = "🎈"; 
    flower.classList.add("flower");
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = Math.random() * 3 + 2 + "s"; 
    document.body.appendChild(flower);

    setTimeout(() => { flower.remove(); }, 5000);
}

setInterval(createFlower, 500);

function startGame() {
    document.getElementById('start-game-btn').style.display = 'none';
    document.getElementById('game-section').style.display = 'block';
    bgMusic.play();
    spawnFace();
    startTimer();
}

function spawnFace() {
    const face = document.createElement('div');
    face.className = 'face';
    face.innerText = faces[Math.floor(Math.random() * faces.length)];

    let leftPosition;
    let tries = 0;
    do {
        leftPosition = Math.random() * 90;
        tries++;
        if (tries > 10) break;
    } while (isTooClose(leftPosition));

    face.style.left = leftPosition + '%';
    document.getElementById('balloon-container').appendChild(face);
    activeFaces.push(leftPosition);

    face.onclick = function() {
        score++;
        document.getElementById('score').innerText = score;
        face.remove();
        activeFaces = activeFaces.filter(pos => pos !== leftPosition);
    };

    spawnInterval = setTimeout(spawnFace, 800);
}

function isTooClose(newLeft) {
    return activeFaces.some(existingLeft => Math.abs(existingLeft - newLeft) < 10);
}

function startTimer() {
    let timeLeft = gameDuration;
    document.getElementById('timer').innerText = `Thời gian còn lại: ${timeLeft} giây`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Thời gian còn lại: ${timeLeft} giây`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearTimeout(spawnInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('game-section').style.display = 'none';
    document.getElementById('video-section').style.display = 'block';
    document.getElementById('birthday-video').src = 'Unknown-2.mp4'; 

    bgMusic.pause();   
    bgMusic.currentTime = 0; 
}