window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");


const input = document.querySelector("input");
const btn = document.querySelector("button");
const rects = document.querySelectorAll(".rect");
const time = document.querySelector("#time");
const speeds = ["linear", "ease", "ease-in", "ease-out", "ease-in-out"];
let Interval;
let sec = 0;
let ms = 0;
let is_left = true;

rects.forEach((rect, i) => {
	rect.textContent = speeds[i];
	rect.style.top = 110 * i + 10 + "px";
	rect.style.left = "4px";
	rect.classList.add("left");
	let a = i;
	rect.addEventListener("click", () => {
		rect.textContent = speeds[a < 4 ? ++a : (a = 0)];
	});
});
input.addEventListener("change", () => {
	sec = Math.floor(input.value);
	ms = Math.round((input.value - sec) * 100)
		.toString()
		.padEnd(2, "0");
	time.textContent = `${sec} : ${ms}`;
});
btn.addEventListener("click", () => {
	if (input.value) {
		clearInterval(Interval);
		let temp = input.value;
		btn.classList.add("disable");
		btn.disabled = true;
		btn.textContent = "WAIT...";
		rects.forEach(rect => {
			rect.style.cursor = "not-allowed";
			rect.style.pointerEvents = "none";
		});
		Interval = setInterval(() => {
			temp -= 0.01;
			if (temp <= 0) {
				btn.classList.remove("disable");
				clearInterval(Interval);
				temp = 0;
				btn.disabled = false;
				btn.textContent = "MOVE";
				rects.forEach(rect => {
					rect.style.cursor = "n-resize";
					rect.style.pointerEvents = "all";
				});
			}
			sec = Math.floor(temp);
			ms = Math.round((temp - sec) * 100)
				.toString()
				.padStart(2, "0");
			time.textContent = `${sec} : ${ms}`;
		}, 10);
		rects.forEach(rect => {
			rect.style.transition = `${input.value}s ${rect.textContent} `;

			if (is_left) {
				rect.classList.remove("left");
				rect.classList.add("right");
				rect.style.left = window.innerWidth - rect.offsetWidth - 4 + "px";
			} else {
				rect.classList.remove("right");
				rect.classList.add("left");
				rect.style.left = "4px";
			}
		});
		is_left = !is_left;
	} else alert("Input the duration of the rects!");
});
