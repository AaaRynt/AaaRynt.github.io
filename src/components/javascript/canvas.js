// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

const history = [],
	redoStack = [],
	xy = document.querySelector("#xy"),
	main = document.querySelector("#main"),
	preview = document.querySelector("#preview"),
	ctx = main.getContext("2d"),
	pctx = preview.getContext("2d"),
	bcg = document.querySelector("#bcg"),
	pen = document.querySelector("#pen"),
	width = document.querySelector("#width"),
	btns = document.querySelectorAll("button"),
	free = document.querySelector("#free"),
	line = document.querySelector("#line"),
	rect = document.querySelector("#rect"),
	fillrect = document.querySelector("#fillrect"),
	undo = document.querySelector("#undo"),
	redo = document.querySelector("#redo"),
	save = document.querySelector("#save"),
	clear = document.querySelector("#clear");

let drawing = false,
	lastX = 0,
	lastY = 0,
	mode = "free";

main.width = preview.width = window.innerWidth * 0.98;
main.height = preview.height = window.innerHeight * 0.9;
main.style.background = bcg.value;
preview.style.pointerEvents = "none";
function nochicked() {
	btns.forEach(i => i.classList.remove("clicked"));
}
function filename() {
	const date = new Date();
	const name = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}_${date.getHours().toString().padStart(2, "0")}-${date.getMinutes().toString().padStart(2, "0")}-${date.getSeconds().toString().padStart(2, "0")}.png`;
	return name;
}

bcg.addEventListener("change", () => {
	main.style.background = bcg.value;
});
free.addEventListener("click", () => {
	mode = "free";
	nochicked();
	free.classList.add("clicked");
});
line.addEventListener("click", () => {
	mode = "line";
	nochicked();
	line.classList.add("clicked");
});
rect.addEventListener("click", () => {
	mode = "rect";
	nochicked();
	rect.classList.add("clicked");
});
fillrect.addEventListener("click", () => {
	mode = "fillrect";
	nochicked();
	fillrect.classList.add("clicked");
});

main.addEventListener("mousedown", e => {
	drawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
	if (history.length > 50) history.shift();
	history.push(main.toDataURL());
	redoStack.length = 0;
});
main.addEventListener("mousemove", e => {
	pctx.clearRect(0, 0, preview.width, preview.height);
	xy.textContent = `(${e.offsetX},${e.offsetY})`;
	if (!drawing && width.value >= 4) {
		main.style.cursor = "none";
		preview.style.cursor = "none";
		pctx.strokeStyle = pen.value;
		pctx.lineWidth = 1;
		pctx.beginPath();
		pctx.arc(e.offsetX, e.offsetY, width.value / 2, 0, Math.PI * 2);
		pctx.stroke();
		return;
	} else {
		main.style.cursor = "crosshair";
		preview.style.cursor = "crosshair";
	}
	if (!drawing) return;
	ctx.strokeStyle = pctx.strokeStyle = pctx.fillStyle = pen.value;
	ctx.lineWidth = pctx.lineWidth = width.value;
	pctx.lineCap = "round";
	pctx.beginPath();
	switch (mode) {
		case "free":
			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(e.offsetX, e.offsetY);
			ctx.stroke();
			[lastX, lastY] = [e.offsetX, e.offsetY];
			break;
		case "line":
			pctx.moveTo(lastX, lastY);
			pctx.lineTo(e.offsetX, e.offsetY);
			break;
		case "rect":
			pctx.strokeRect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
			break;
		case "fillrect":
			pctx.fillRect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
			break;
	}
	pctx.stroke();
});
main.addEventListener("mouseup", e => {
	drawing = false;
	pctx.clearRect(0, 0, preview.width, preview.height);

	ctx.strokeStyle = ctx.fillStyle = pen.value;
	ctx.lineWidth = width.value;
	ctx.lineCap = "round";
	ctx.beginPath();
	switch (mode) {
		case "line":
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(e.offsetX, e.offsetY);
			break;
		case "rect":
			ctx.strokeRect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
			break;
		case "fillrect":
			ctx.fillRect(lastX, lastY, e.offsetX - lastX, e.offsetY - lastY);
			break;
	}
	ctx.stroke();
});
main.addEventListener("mouseleave", () => {
	drawing = false;
	pctx.clearRect(0, 0, preview.width, preview.height);
});

undo.addEventListener("click", () => {
	if (history.length > 0) {
		redoStack.push(main.toDataURL());
		const img = new Image();
		img.src = history.pop();
		img.onload = () => {
			ctx.clearRect(0, 0, main.width, main.height);
			ctx.drawImage(img, 0, 0);
		};
	}
});
redo.addEventListener("click", () => {
	if (redoStack.length > 0) {
		history.push(main.toDataURL());
		const img = new Image();
		img.src = redoStack.pop();
		img.onload = () => {
			ctx.clearRect(0, 0, main.width, main.height);
			ctx.drawImage(img, 0, 0);
		};
	}
});
save.addEventListener("click", () => {
	const link = document.createElement("a");
	link.download = filename();
	link.href = main.toDataURL("image/png");
	link.click();
});
clear.addEventListener("click", () => {
	ctx.clearRect(0, 0, main.width, main.height);
});
window.addEventListener("keydown", e => {
	if (e.ctrlKey && e.key === "z") undo.click();
	if (e.ctrlKey && e.key === "y") redo.click();
	if (e.ctrlKey && e.key === "s") save.click();
});
