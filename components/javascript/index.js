// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");
const text = "Time passes,code remains.Each commit is a stroke on the canvas of my youth.Stay sober while striving for better answers.",
	introduce = document.querySelector("#introduce"),
	over = document.querySelector("#over"),
	click = document.querySelector("#click"),
	audio1 = document.querySelector("#audio1"),
	audio2 = document.querySelector("#audio2");
let index = 0;

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("h1").style.opacity = 1;
	setInterval(() => {
		if (index < text.length) {
			introduce.textContent += text[index++];
		} else {
			introduce.style.setProperty("--content", '""');
		}
	}, 80);
});
document.addEventListener("click", () => {
	audio1.play();
});
audio1.addEventListener("ended", () => {
	audio2.play();
});
audio2.addEventListener("ended", () => {
	audio1.play();
});
document.querySelectorAll(".link").forEach(i => {
	i.addEventListener("click", () => {
		const aTag = i.querySelector("a");
		if (aTag) {
			window.open(aTag.href, "_blank");
		}
	});
	i.addEventListener("mouseover", () => {
		over.currentTime = 0;
		over.play();
	});
	i.addEventListener("click", () => {
		click.currentTime = 0;
		click.play();
	});
});
