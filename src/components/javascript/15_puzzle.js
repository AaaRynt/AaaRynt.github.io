// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

const container = document.querySelector("#container"),
	start = document.querySelector("#start"),
	dom_time = document.querySelector("#time"),
	dom_step = document.querySelector("#step"),
	audio = document.querySelector("audio");

let tiles = [],
	num = [],
	is_start = false,
	is_move = false,
	time = 0,
	step = 0;

setInterval(() => {
	if (is_move) time++;
	dom_time.textContent = `TIME: ${time}s`;
}, 1000);
for (let i = 0; i < 15; i++) {
	const div = document.createElement("div");
	div.className = "tile";
	div.textContent = i + 1;
	if (i % 2 === 0) div.style.backgroundColor = "red";
	else div.style.backgroundColor = "white";
	container.appendChild(div);
	tiles.push(div);
}

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

function solvable(arr) {
	let invCount = 0;
	for (let i = 0; i < 15; i++) {
		for (let j = i + 1; j < 16; j++) {
			if (arr[i] && arr[j] && arr[i] > arr[j]) invCount++;
		}
	}
	const zero = Math.ceil((arr.indexOf(0) + 1) / 4);
	return (invCount + zero) % 2 === 0;
}

function generate() {
	const now = new Date().getTime();
	step = 0;
	time = 0;
	is_move = false;
	num.length = 0;
	dom_time.textContent = "TIME: 0s";
	dom_step.textContent = "STEP: 0";
	for (let i = 1; i <= 15; i++) num.push(i);
	num.push(0);
	do {
		shuffle(num);
	} while (!solvable(num));
	render();
}

function move(index) {
	const empty = num.indexOf(0),
		row = Math.floor(index / 4),
		col = index % 4,
		erow = Math.floor(empty / 4),
		ecol = empty % 4;
	if (Math.abs(row - erow) + Math.abs(col - ecol) !== 1) return;
	[num[index], num[empty]] = [num[empty], num[index]];
	render();
	console.log(num);
	dom_step.textContent = `STEP: ${++step}`;
	is_move = true;
	if (num.join() === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0") {
		audio.currentTime = 0;
		audio.play();
		is_move = false;
		start.textContent = "GOOD😋👍";
		setTimeout(() => {
			alert(`Excellent!\nIt took you ${time} sec and ${step} steps.`);
		}, 300);
	}
}

function render() {
	for (let i = 0; i < 16; i++) {
		const empty = num.indexOf(0),
			row = Math.floor(i / 4),
			col = i % 4,
			erow = Math.floor(empty / 4),
			ecol = empty % 4,
			val = num[i],
			tile = tiles[val - 1];
		if (val === 0) continue;
		if (val === i + 1) {
			tile.style.borderColor = "green";
			tile.style.color = "green";
		} else {
			tile.style.borderColor = "black";
			tile.style.color = "rgb(40,44,52)";
		}
		if (row === erow && Math.abs(col - ecol) === 1) {
			tile.style.cursor = "ew-resize";
		} else if (col === ecol && Math.abs(row - erow) === 1) {
			tile.style.cursor = "ns-resize";
		} else {
			tile.style.cursor = "not-allowed";
		}
		tile.style.transform = `translate3d(${col * 120}px, ${row * 120}px, 0)`;
	}
}
tiles.forEach((tile, i) => {
	tile.addEventListener("click", () => {
		const index = num.indexOf(i + 1);
		move(index);
	});
});
start.addEventListener("mouseenter", () => {
	if (!is_start) start.textContent = "Start!";
});
start.addEventListener("mouseleave", () => {
	if (!is_start) start.textContent = "Ready?";
});
start.addEventListener("click", () => {
	start.textContent = "Restart";
	is_start = true;
	tiles.forEach(tile => {
		tile.style.display = "flex";
	});
	generate();
});
