// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

const exit = confirm("⚠⚠Photosensitivity Epilepsy Warning⚠⚠");
if (!exit) window.close();
console.log("%c⚠⚠Photosensitivity Epilepsy Warning⚠⚠", "color:red; font-weight:bold;");
const canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
	let size = Number(prompt("Input size(px):")),
		interval = Number(prompt("Input interval(ms):")),
		num = 0;
	function resize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resize();
	window.addEventListener("resize", resize);
	setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const colors = ["#ff0000", "#00ff00", "#0000ff"];
		let rows = Math.ceil(canvas.height / size),
			cols = Math.ceil(canvas.width / size);
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				ctx.fillStyle = colors[(x + y + num) % colors.length];
				ctx.fillRect(x * size, y * size, size, size);
			}
		}
		num++;
	}, interval);
});
