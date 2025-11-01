// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

import { clock1, clock2 } from "../../assets/json/two_clocks.js";

//background
(() => {
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d", { alpha: false });
	const block = 2,
		w = canvas.clientWidth,
		h = canvas.clientHeight;
	canvas.width = w;
	canvas.height = h;
	function drawMosaic() {
		for (let y = 0; y < h / block; y++) {
			for (let x = 0; x < w / block; x++) {
				ctx.fillStyle = `hsl(${Math.floor(Math.random() * 360)},10%,85%)`;
				ctx.fillRect(x * block, y * block, block, block);
			}
		}
	}
	drawMosaic();
})();

//clocks
(() => {
	const container = document.querySelector("#container");
	for (let i = 0; i < 36; i++) {
		const clock = document.createElement("div"),
			long = document.createElement("div"),
			short = document.createElement("div"),
			dot = document.createElement("div");
		clock.className = "clock";
		long.className = "long";
		short.className = "short";
		dot.className = "dot";
		clock.appendChild(long);
		clock.appendChild(short);
		clock.appendChild(dot);
		container.appendChild(clock);
	}
})();

const longs = document.querySelectorAll(".long");
const shorts = document.querySelectorAll(".short");
let nums = clock2;

document.querySelector("button").addEventListener("click", () => {
	nums = nums === clock1 ? clock2 : clock1;
	change();
});
function change() {
	setInterval(() => {
		const now = new Date(),
			h1 = Math.floor(now.getHours() / 10),
			h2 = now.getHours() % 10,
			m1 = Math.floor(now.getMinutes() / 10),
			m2 = now.getMinutes() % 10,
			s1 = Math.floor(now.getSeconds() / 10),
			s2 = now.getSeconds() % 10;

		console.log(`${h1}${h2}:${m1}${m2}:${s1}${s2}`);
		
		// const digits = [h1, h2, m1, m2, s1, s2];
		// for (let i = 0; i < digits.length; i++) {
		// 	for (let j = 0; j < 3; j++) {
		// 		for (let k = 0; k < 2; k++) {
		// 			const base = j * 12 + i * 2 + k;
		// 			const angleLong = nums[digits[i]][j][k][0];
		// 			const angleShort = nums[digits[i]][j][k][1];
		// 			longs[base].style.transform = `translateY(-50%) rotate(${angleLong}deg)`;
		// 			shorts[base].style.transform = `translateY(-50%) rotate(${angleShort}deg)`;
		// 		}
		// 	}
		// }

		// Okay...I absolutely know that loops should be used,but I was really frustrated at that moment,so I decided to submit the dog_shit_mountain_codes as the recording of my stupid.:-P
		longs[0].style.transform = `translateY(-50%) rotate(${nums[h1][0][0][0]}deg)`;
		longs[1].style.transform = `translateY(-50%) rotate(${nums[h1][0][1][0]}deg)`;
		longs[12].style.transform = `translateY(-50%) rotate(${nums[h1][1][0][0]}deg)`;
		longs[13].style.transform = `translateY(-50%) rotate(${nums[h1][1][1][0]}deg)`;
		longs[24].style.transform = `translateY(-50%) rotate(${nums[h1][2][0][0]}deg)`;
		longs[25].style.transform = `translateY(-50%) rotate(${nums[h1][2][1][0]}deg)`;
		shorts[0].style.transform = `translateY(-50%) rotate(${nums[h1][0][0][1]}deg)`;
		shorts[1].style.transform = `translateY(-50%) rotate(${nums[h1][0][1][1]}deg)`;
		shorts[12].style.transform = `translateY(-50%) rotate(${nums[h1][1][0][1]}deg)`;
		shorts[13].style.transform = `translateY(-50%) rotate(${nums[h1][1][1][1]}deg)`;
		shorts[24].style.transform = `translateY(-50%) rotate(${nums[h1][2][0][1]}deg)`;
		shorts[25].style.transform = `translateY(-50%) rotate(${nums[h1][2][1][1]}deg)`;

		longs[2].style.transform = `translateY(-50%) rotate(${nums[h2][0][0][0]}deg)`;
		longs[3].style.transform = `translateY(-50%) rotate(${nums[h2][0][1][0]}deg)`;
		longs[14].style.transform = `translateY(-50%) rotate(${nums[h2][1][0][0]}deg)`;
		longs[15].style.transform = `translateY(-50%) rotate(${nums[h2][1][1][0]}deg)`;
		longs[26].style.transform = `translateY(-50%) rotate(${nums[h2][2][0][0]}deg)`;
		longs[27].style.transform = `translateY(-50%) rotate(${nums[h2][2][1][0]}deg)`;
		shorts[2].style.transform = `translateY(-50%) rotate(${nums[h2][0][0][1]}deg)`;
		shorts[3].style.transform = `translateY(-50%) rotate(${nums[h2][0][1][1]}deg)`;
		shorts[14].style.transform = `translateY(-50%) rotate(${nums[h2][1][0][1]}deg)`;
		shorts[15].style.transform = `translateY(-50%) rotate(${nums[h2][1][1][1]}deg)`;
		shorts[26].style.transform = `translateY(-50%) rotate(${nums[h2][2][0][1]}deg)`;
		shorts[27].style.transform = `translateY(-50%) rotate(${nums[h2][2][1][1]}deg)`;

		longs[4].style.transform = `translateY(-50%) rotate(${nums[m1][0][0][0]}deg)`;
		longs[5].style.transform = `translateY(-50%) rotate(${nums[m1][0][1][0]}deg)`;
		longs[16].style.transform = `translateY(-50%) rotate(${nums[m1][1][0][0]}deg)`;
		longs[17].style.transform = `translateY(-50%) rotate(${nums[m1][1][1][0]}deg)`;
		longs[28].style.transform = `translateY(-50%) rotate(${nums[m1][2][0][0]}deg)`;
		longs[29].style.transform = `translateY(-50%) rotate(${nums[m1][2][1][0]}deg)`;
		shorts[4].style.transform = `translateY(-50%) rotate(${nums[m1][0][0][1]}deg)`;
		shorts[5].style.transform = `translateY(-50%) rotate(${nums[m1][0][1][1]}deg)`;
		shorts[16].style.transform = `translateY(-50%) rotate(${nums[m1][1][0][1]}deg)`;
		shorts[17].style.transform = `translateY(-50%) rotate(${nums[m1][1][1][1]}deg)`;
		shorts[28].style.transform = `translateY(-50%) rotate(${nums[m1][2][0][1]}deg)`;
		shorts[29].style.transform = `translateY(-50%) rotate(${nums[m1][2][1][1]}deg)`;

		longs[6].style.transform = `translateY(-50%) rotate(${nums[m2][0][0][0]}deg)`;
		longs[7].style.transform = `translateY(-50%) rotate(${nums[m2][0][1][0]}deg)`;
		longs[18].style.transform = `translateY(-50%) rotate(${nums[m2][1][0][0]}deg)`;
		longs[19].style.transform = `translateY(-50%) rotate(${nums[m2][1][1][0]}deg)`;
		longs[30].style.transform = `translateY(-50%) rotate(${nums[m2][2][0][0]}deg)`;
		longs[31].style.transform = `translateY(-50%) rotate(${nums[m2][2][1][0]}deg)`;
		shorts[6].style.transform = `translateY(-50%) rotate(${nums[m2][0][0][1]}deg)`;
		shorts[7].style.transform = `translateY(-50%) rotate(${nums[m2][0][1][1]}deg)`;
		shorts[18].style.transform = `translateY(-50%) rotate(${nums[m2][1][0][1]}deg)`;
		shorts[19].style.transform = `translateY(-50%) rotate(${nums[m2][1][1][1]}deg)`;
		shorts[30].style.transform = `translateY(-50%) rotate(${nums[m2][2][0][1]}deg)`;
		shorts[31].style.transform = `translateY(-50%) rotate(${nums[m2][2][1][1]}deg)`;

		longs[8].style.transform = `translateY(-50%) rotate(${nums[s1][0][0][0]}deg)`;
		longs[9].style.transform = `translateY(-50%) rotate(${nums[s1][0][1][0]}deg)`;
		longs[20].style.transform = `translateY(-50%) rotate(${nums[s1][1][0][0]}deg)`;
		longs[21].style.transform = `translateY(-50%) rotate(${nums[s1][1][1][0]}deg)`;
		longs[32].style.transform = `translateY(-50%) rotate(${nums[s1][2][0][0]}deg)`;
		longs[33].style.transform = `translateY(-50%) rotate(${nums[s1][2][1][0]}deg)`;
		shorts[8].style.transform = `translateY(-50%) rotate(${nums[s1][0][0][1]}deg)`;
		shorts[9].style.transform = `translateY(-50%) rotate(${nums[s1][0][1][1]}deg)`;
		shorts[20].style.transform = `translateY(-50%) rotate(${nums[s1][1][0][1]}deg)`;
		shorts[21].style.transform = `translateY(-50%) rotate(${nums[s1][1][1][1]}deg)`;
		shorts[32].style.transform = `translateY(-50%) rotate(${nums[s1][2][0][1]}deg)`;
		shorts[33].style.transform = `translateY(-50%) rotate(${nums[s1][2][1][1]}deg)`;

		longs[10].style.transform = `translateY(-50%) rotate(${nums[s2][0][0][0]}deg)`;
		longs[11].style.transform = `translateY(-50%) rotate(${nums[s2][0][1][0]}deg)`;
		longs[22].style.transform = `translateY(-50%) rotate(${nums[s2][1][0][0]}deg)`;
		longs[23].style.transform = `translateY(-50%) rotate(${nums[s2][1][1][0]}deg)`;
		longs[34].style.transform = `translateY(-50%) rotate(${nums[s2][2][0][0]}deg)`;
		longs[35].style.transform = `translateY(-50%) rotate(${nums[s2][2][1][0]}deg)`;
		shorts[10].style.transform = `translateY(-50%) rotate(${nums[s2][0][0][1]}deg)`;
		shorts[11].style.transform = `translateY(-50%) rotate(${nums[s2][0][1][1]}deg)`;
		shorts[22].style.transform = `translateY(-50%) rotate(${nums[s2][1][0][1]}deg)`;
		shorts[23].style.transform = `translateY(-50%) rotate(${nums[s2][1][1][1]}deg)`;
		shorts[34].style.transform = `translateY(-50%) rotate(${nums[s2][2][0][1]}deg)`;
		shorts[35].style.transform = `translateY(-50%) rotate(${nums[s2][2][1][1]}deg)`;
	}, 1000);
}
document.addEventListener("DOMContentLoaded", change);
