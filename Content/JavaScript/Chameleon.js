document.addEventListener("DOMContentLoaded", () => {
	alert("这个网页间隔一段时间会改变背景颜色，请自定义间隔时间");
	const container = document.querySelector(".container"),
		h1 = document.querySelector("h1"),
		start = document.querySelector("#start"),
		stop = document.querySelector("#stop");
	let num = 1,
		i1 = (i2 = null),
		r = Math.floor(Math.random() * 256),
		g = Math.floor(Math.random() * 256),
		b = Math.floor(Math.random() * 256);
	stop.disabled = true;
	document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
	console.log(document.body.style.backgroundColor);
	h1.textContent = `rgb(${r},${g},${b})`;
	const close = confirm("你喜欢变色龙吗？");
	if (!close) {
		window.close();
	} else {
		start.addEventListener("click", () => {
			const oldNow = document.querySelector(".now");
			if (oldNow) oldNow.remove();

			let interval = document.querySelector("input").value;
			if (!interval || isNaN(interval) || interval <= 0) {
				alert("你是傻屁吗？");
				console.log("输入间隔啊，弱智东西！");
			} else {
				document.documentElement.style.setProperty("--time", `${interval * 0.5}ms`);
				stop.disabled = false;
				if (!i1) {
					i1 = setInterval(() => {
						r = Math.floor(Math.random() * 256);
						g = Math.floor(Math.random() * 256);
						b = Math.floor(Math.random() * 256);
						document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
						console.log(`${num}:${document.body.style.backgroundColor}`);
						h1.textContent = `rgb(${r},${g},${b})`;
					}, interval);
					if (!i2) {
						i2 = setInterval(() => {
							const next = document.createElement("div");
							next.classList.add("num");
							next.classList.add("bottom");
							next.textContent = num++;
							container.appendChild(next);
							next.offsetHeight;
							next.classList.remove("bottom");
							next.classList.add("in");
							setTimeout(() => {
								next.classList.remove("in");
								next.classList.add("top");
							}, interval);
							next.offsetHeight;
							setTimeout(() => {
								next.remove();
							}, interval * 2);
						}, interval);
					}
				}
			}
		});
		stop.addEventListener("click", () => {
			clearInterval(i1);
			clearInterval(i2);
			i1 = i2 = null;
			const now = document.createElement("div");
			now.classList.add("now");
			now.textContent = `${num - 1}`;
			container.appendChild(now);
		});
	}
});
