// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

const container = document.querySelector("#container");
const step = document.querySelector("#step");
const play = document.querySelector("#play");
const audio = document.querySelector("#eat");
let plays = 0,
	steps = 0,
	eatens = 0,
	num = null,
	eatx = null,
	eaty = null,
	xy = [],
	arr = [],
	eat = null;
for (let i = 10; i < 600; i += 30) {
	for (let j = 10; j < 600; j += 30) {
		xy.push([i, j]);
	}
}
function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
//页面
for (let i = 0; i < 400; i++) {
	const div = document.createElement("div");
	div.className = "cell";
	if (i % 20 === 19) div.style.borderRight = "none";
	if (i >= 380) div.style.borderBottom = "none";
	container.appendChild(div);
}
updateTime();
setInterval(updateTime, 1000);
function updateTime() {
	const now = new Date();
	const seconds = now.getSeconds();
	const minutes = now.getMinutes();
	const hours = now.getHours();
	document.querySelector("#time").innerHTML = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
function light() {
	document.querySelector(".change").classList.toggle("changelight");
	document.querySelector(".move").classList.toggle("movelight");
	document.body.classList.toggle("light");
}
//游戏
const input = document.querySelector("input");
input.addEventListener("input", () => {
	if (input.value > 399) input.value = 399;
	if (input.value < 1) input.value = 1;
});

document.querySelector(".start").addEventListener("click", fn_start);
function fn_start() {
	if (!input.value) {
		alert("Input the numbers of beans!");
	}
	plays++;
	steps = 0;
	step.textContent = `Current steps: ${steps}`;
	play.textContent = `Number of played: ${plays}`;
	num = document.querySelector("input").value;
	container.querySelectorAll(".coin, .eat").forEach(el => el.remove());
	arr = shuffle(xy).slice(0, num + 1);
	for (let i = 0; i < num; i++) {
		let c = document.createElement("div");
		c.classList.add("coin");
		c.style.left = `${arr[i][0]}px`;
		c.style.top = `${arr[i][1]}px`;
		container.appendChild(c);
	}

	[eatx, eaty] = arr[num];
	eat = document.createElement("div");
	eat.classList.add("eat");
	eat.style.left = `${eatx}px`;
	eat.style.top = `${eaty}px`;
	container.appendChild(eat);
}
document.addEventListener("keydown", e => {
	switch (e.key) {
		case "ArrowUp":
			if (eaty >= 40) {
				eaty -= 30;
				steps++;
			}
			break;
		case "ArrowDown":
			if (eaty <= 550) {
				eaty += 30;
				steps++;
			}
			break;
		case "ArrowLeft":
			if (eatx >= 40) {
				eatx -= 30;
				steps++;
			}
			break;
		case "ArrowRight":
			if (eatx <= 550) {
				eatx += 30;
				steps++;
			}
			break;
	}
	eat.style.left = `${eatx}px`;
	eat.style.top = `${eaty}px`;
	const coins = document.querySelectorAll(".coin");
	coins.forEach(coin => {
		if (parseInt(coin.style.left) === eatx && parseInt(coin.style.top) === eaty) {
			coin.remove();
			audio.currentTime = 0;
			audio.play();
			document.querySelector("#eaten").innerHTML = `Num of eaten:  <span style="color: wheat;">${++eatens}</span>`;
		}
	});

	step.textContent = `Current steps: ${steps}`;
});
