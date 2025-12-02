// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

import { emojis } from "../../assets/json/face_emojis.js";

function randomArr(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function randomNum() {
	return Math.random() * 2 + 0.5;
}
function move(div) {
	div.textContent = randomArr(emojis);
	const maxLeft = window.innerWidth - div.offsetWidth;
	const maxTop = window.innerHeight - div.offsetHeight;
	div.style.transition = `left ${randomNum()}s, top ${randomNum()}s, transform ${randomNum()}s`;
	div.style.left = Math.random() * maxLeft + "px";
	div.style.top = Math.random() * maxTop + "px";
	div.style.transform = `scale(${Math.random() + 0.5})`;
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("Keydown '-','Backspace','Delete' or '+' to change the numbers of the emojis! ");

	document.querySelectorAll(".emoji").forEach(div => move(div));
	setInterval(() => {
		document.querySelectorAll(".emoji").forEach(div => move(div));
	}, 1500);
	document.body.addEventListener("keydown", e => {
		if (e.key === "+") {
			const div = document.createElement("div");
			div.classList.add("emoji");
			document.body.appendChild(div);
			move(div);
		}
		if (e.key === "-" || e.key === "Backspace" || e.key === "Delete") {
			const divs = document.querySelectorAll(".emoji");
			if (divs.length > 0) {
				divs[divs.length - 1].remove();
			}
		}
	});
});
