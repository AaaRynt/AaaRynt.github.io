// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

const container = document.querySelector("#container"),
	input1 = document.querySelector("#size"),
	input2 = document.querySelector("#interval"),
	num1 = document.querySelector("#num1"),
	num2 = document.querySelector("#num2"),
	score = document.querySelector("#score"),
	btns = document.querySelectorAll("button"),
	up = document.querySelector("#up"),
	right = document.querySelector("#right"),
	down = document.querySelector("#down"),
	left = document.querySelector("#left"),
	audio = document.querySelector("#audio"),
	pause = document.querySelector("#pause"),
	restart = document.querySelector("#restart"),
	click = document.querySelector("#click"),
	eat = document.querySelector("#eat"),
	game_over = document.querySelector("#game_over");
let boxes,
	size,
	snake,
	direction,
	food,
	timer,
	muted = false,
	is_paused = false,
	is_click = false;

function updateLength() {
	let size;
	if (window.innerWidth >= window.innerHeight) {
		size = window.innerHeight * 0.7;
	} else {
		size = window.innerWidth * 0.7;
	}
	document.documentElement.style.setProperty("--ratio", `${size}px`);
	const children = document.getElementById("control1").children;
	for (let child of children) {
		child.style.width = `${size * 0.15}px`;
		child.style.height = `${size * 0.15}px`;
		child.style.fontSize = `${size * 0.08}px`;
	}
}
function updateTime() {
	const now = new Date();
	const s = now.getSeconds().toString().padStart(2, "0");
	const m = now.getMinutes().toString().padStart(2, "0");
	const h = now.getHours().toString().padStart(2, "0");
	document.querySelector("#h").textContent = h;
	document.querySelector("#m").textContent = m;
	document.querySelector("#s").textContent = s;
	document.querySelectorAll(".colon").forEach(span => {
		span.classList.toggle("off");
	});
}
document.addEventListener("DOMContentLoaded", () => {
	updateTime();
	setInterval(updateTime, 1000);
	updateLength();
	createBox();
	alert("Press 'W','A','S','D','↑','→','↓','←' to move!");
	console.log("Press 'W','A','S','D','↑','→','↓','←' to move!");
});
window.addEventListener("resize", updateLength);
input1.addEventListener("change", () => {
	document.documentElement.style.setProperty("--length", input1.value);
	createBox();
});
input2.addEventListener("change", () => {
	clearInterval(timer);
	timer = setInterval(move, input2.value);
	num2.textContent = input2.value;
	num2.style.color = `hsl(${(input2.value * 12) / 95 - 1200 / 95},100%,50%)`;
});
function createBox() {
	container.innerHTML = "";
	size = getComputedStyle(document.documentElement).getPropertyValue("--length");
	num1.style.color = `hsl(${6000 / 47 - (size * 120) / 47},100%,50%)`;
	num1.textContent = size;
	num2.textContent = input2.value;
	num2.style.color = `hsl(${(input2.value * 12) / 95 - 1200 / 95},100%,50%)`;
	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			const div = document.createElement("div");
			div.classList.add("box");
			if ((x + y) % 2 === 0) {
				div.style.backgroundColor = "rgba(171,181,191,0.1)";
			} else {
				div.style.backgroundColor = "";
			}
			container.appendChild(div);
			if (x === size - 1) {
				div.style.borderRight = "none";
			}
			if (y === size - 1) {
				div.style.borderBottom = "none";
			}
		}
	}
	boxes = document.querySelectorAll(".box");
}
function index(x, y) {
	return y * size + x;
}
function start() {
	clearInterval(timer);
	boxes.forEach(box => (box.style.background = ""));
	snake = [{ x: Math.floor(size / 2), y: Math.floor(size / 2) }];
	direction = [
		{ x: 0, y: 1 },
		{ x: 1, y: 0 },
		{ x: 0, y: -1 },
		{ x: -1, y: 0 },
	][Math.floor(Math.random() * 4)];
	spawnFood();
	draw();
	timer = setInterval(move, input2.value);
}
function spawnFood() {
	let x, y;
	do {
		x = Math.floor(Math.random() * size);
		y = Math.floor(Math.random() * size);
	} while (snake.some(seg => seg.x === x && seg.y === y));
	food = { x, y };
}

function draw() {
	boxes.forEach((box, i) => {
		box.style.background = (Math.floor(i / size) + (i % size)) % 2 === 0 ? "rgba(171,181,191,0.1)" : "";
	});

	snake.forEach((seg, i, arr) => {
		if (i === 0) boxes[index(seg.x, seg.y)].style.background = "lime";
		else {
			const ratio = i / arr.length;
			boxes[index(seg.x, seg.y)].style.background = `hsl(120,${100 - ratio * 100}%,50%)`;
		}
	});
	boxes[index(food.x, food.y)].style.background = "linear-gradient(20deg,red,orangered,orange,yellow)";
	score.textContent = snake.length - 1;
	score.style.color = `hsl(${156 - snake.length * 6},100%,50%)`;
}
function move() {
	if (is_paused) return;
	const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
	if (head.x < 0 || head.y < 0 || head.x >= size || head.y >= size) {
		gameOver();
		return;
	}
	if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
		gameOver();
		return;
	}
	if (head.x === food.x && head.y === food.y) {
		eat.currentTime = 0;
		eat.play();
		spawnFood();
	} else {
		snake.pop();
	}
	snake.unshift(head);
	draw();
}
function gameOver() {
	clearInterval(timer);
	game_over.play();
}

document.addEventListener("keydown", e => {
	switch (e.key) {
		case "ArrowUp":
		case "w":
		case "W":
			up.click();
			break;
		case "ArrowRight":
		case "d":
		case "D":
			right.click();
			break;
		case "ArrowDown":
		case "s":
		case "S":
			down.click();
			break;
		case "ArrowLeft":
		case "a":
		case "A":
			left.click();
			break;
		case "m":
		case "M":
			audio.click();
			break;
		case "p":
		case "P":
		case " ":
			pause.click();
			pause.classList.add("active");
			break;
		case "r":
		case "R":
		case "Enter":
			restart.click();
			break;
	}
});
document.addEventListener("keyup", () => {
	btns.forEach(btn => {
		btn.classList.remove("active");
	});
});
function clicked(btn) {
	btns.forEach(btn => {
		btn.classList.remove("active");
	});
	btn.classList.add("active");
	setTimeout(() => {
		btn.classList.remove("active");
	}, 100);
	click.currentTime = 0;
	click.play();
}
up.addEventListener("click", () => {
	if (direction.y === 0) {
		clicked(up);
		direction = { x: 0, y: -1 };
	}
});
right.addEventListener("click", () => {
	if (direction.x === 0) {
		clicked(right);
		direction = { x: 1, y: 0 };
	}
});
down.addEventListener("click", () => {
	if (direction.y === 0) {
		clicked(down);
		direction = { x: 0, y: 1 };
	}
});
left.addEventListener("click", () => {
	if (direction.x === 0) {
		clicked(left);
		direction = { x: -1, y: 0 };
	}
});
audio.addEventListener("click", () => {
	clicked(audio);
	btns.forEach(btn => {
		btn.classList.remove("active");
	});
	audio.classList.add("active");
	muted = !muted;
	document.querySelectorAll("audio").forEach(a => {
		a.muted = muted;
	});
	audio.textContent = muted ? "🔇" : "🔊";
});
restart.addEventListener("click", () => {
	start();
	clicked(restart);
});
pause.addEventListener("click", () => {
	is_paused = !is_paused;
	clicked(pause);
	if (is_paused) {
		setTimeout(() => {
			pause.classList.add("active");
		}, 100);
	}
});
