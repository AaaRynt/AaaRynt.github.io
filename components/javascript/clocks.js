// 茫然地学习抽象的 `Vue.js`，难免让我怀念最初写前端的感觉；
// 当我看到别人的创意，旋即便付诸行动，
// 原生的JavaScript让我久违地找回了自信。
// 写下这一行行代码时，已然是子夜、大三上的期中。
// 假以时日，待我技术素养成熟后，
// 不论身处苏州还是上海，负责什么业务，待遇如何。
// 有没有用上期待的MacBook Air&iPhone、有恋人相伴……
// 都希望那份**热爱**，依然存在。

// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

import { clock_small, clock_large } from "../../assets/json/two_clocks.js";
const small = document.querySelector(".small"),
	large = document.querySelector(".large");

//background
(() => {
	const canvas = document.querySelector("canvas"),
		ctx = canvas.getContext("2d", { alpha: false }),
		block = 2,
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

//two_clocks
(() => {
	for (let i = 0; i < 144; i++) {
		const clock_dom = document.createElement("div"),
			long = document.createElement("div"),
			short = document.createElement("div"),
			dot = document.createElement("div");
		clock_dom.className = "clock";
		long.className = "long";
		short.className = "short";
		dot.className = "dot";
		clock_dom.appendChild(long);
		clock_dom.appendChild(short);
		clock_dom.appendChild(dot);
		large.appendChild(clock_dom);
	}
	for (let i = 0; i < 36; i++) {
		const clock_dom = document.createElement("div"),
			long = document.createElement("div"),
			short = document.createElement("div"),
			dot = document.createElement("div");
		clock_dom.className = "clock";
		long.className = "long";
		short.className = "short";
		dot.className = "dot";
		clock_dom.appendChild(long);
		clock_dom.appendChild(short);
		clock_dom.appendChild(dot);
		small.appendChild(clock_dom);
	}
})();

document.querySelector("button").addEventListener("click", () => {
	if (getComputedStyle(large).display === "none") {
		small.style.display = "none";
		large.style.display = "grid";
	} else {
		large.style.display = "none";
		small.style.display = "grid";
	}
});

const longs = document.querySelectorAll(".long");
const shorts = document.querySelectorAll(".short");
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

		const digits = [h1, h2, m1, m2, s1, s2];
		//clock_small
		for (let i = 0; i < digits.length; i++) {
			for (let row = 0; row < 6; row++) {
				for (let col = 0; col < 4; col++) {
					const base = row * 4 * digits.length + i * 4 + col;
					longs[base].style.transform = `translateY(-50%) rotate(${clock_small[digits[i]][row][col][0]}deg)`;
					shorts[base].style.transform = `translateY(-50%) rotate(${clock_small[digits[i]][row][col][1]}deg)`;
				}
			}
			//clock_large
			for (let row = 0; row < 3; row++) {
				for (let col = 0; col < 2; col++) {
					const base = row * 2 * digits.length + i * 2 + col + 144;
					longs[base].style.transform = `translateY(-50%) rotate(${clock_large[digits[i]][row][col][0]}deg)`;
					shorts[base].style.transform = `translateY(-50%) rotate(${clock_large[digits[i]][row][col][1]}deg)`;
				}
			}
		}
	}, 1000);
}
document.addEventListener("DOMContentLoaded", change());
