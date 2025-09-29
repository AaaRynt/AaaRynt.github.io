// 	<time>
// 		<span id="h">00</span>
// 		<span class="colon">:</span>
// 		<span id="m">00</span>
// 		<span class="colon">:</span>
// 		<span id="s">00</span>
//	</time>

let off = true;
const colons = document.querySelectorAll(".colon");
document.addEventListener("DOMContentLoaded", () => {
	updateTime();
});
let clock_Interval = setInterval(updateTime, 1000);
function updateTime() {
	const now = new Date();
	const seconds = now.getSeconds().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const hours = now.getHours().toString().padStart(2, "0");

	document.querySelector("#h").textContent = hours;
	document.querySelector("#m").textContent = minutes;
	document.querySelector("#s").textContent = seconds;

	colons.forEach(span => {
		span.style.opacity = off ? "0.1" : "1";
	});
	off = !off;
}
