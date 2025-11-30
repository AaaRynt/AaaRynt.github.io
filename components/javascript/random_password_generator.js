// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

Vue.createApp({
	data() {
		return {
			length: 6,
			Lower: true,
			Upper: true,
			Num: true,
			Special: false,
			result: "",
			timer: null,
			audioCtx: null,
			clickSound: null,
		};
	},
	mounted() {
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	},
	methods: {
		playClick() {
			const ctx = this.audioCtx;
			// 生成一小段“颗粒噪声”
			const duration = 0.05; // 50ms，短但有颗粒感
			const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
			const data = buffer.getChannelData(0);

			for (let i = 0; i < data.length; i++) {
				// 更细、更尖锐的颗粒噪声
				data[i] =
					(Math.random() * 2 - 1) *
					(0.2 + Math.random() * 0.2) * // 轻微随机振幅
					Math.pow(1 - i / data.length, 2); // 柔和衰减
			}

			const noise = ctx.createBufferSource();
			noise.buffer = buffer;

			// 高通过滤，让声音更“细”，更接近 Matrix 字符闪动
			const filter = ctx.createBiquadFilter();
			filter.type = "highpass";
			filter.frequency.value = 1200; // 去掉低频闷声
			filter.Q.value = 1.2;

			const gain = ctx.createGain();
			gain.gain.value = 0.3;

			noise.connect(filter).connect(gain).connect(ctx.destination);
			noise.start();
		},
		generateCharset() {
			let chars = "";

			if (this.Lower) chars += [...Array(26)].map((_, i) => String.fromCharCode(i + 97)).join("");
			if (this.Upper) chars += [...Array(26)].map((_, i) => String.fromCharCode(i + 65)).join("");
			if (this.Num) chars += [...Array(10)].map((_, i) => String.fromCharCode(i + 48)).join("");
			if (this.Special) chars += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

			console.log(`Chars: ${chars}`);
			return chars;
		},
		display() {
			if (!this.Lower && !this.Upper && !this.Num && !this.Special) {
				alert("Please select at least one character type!");
				return;
			}
			if (this.timer) clearInterval(this.timer);
			const chars = this.generateCharset();
			this.result = "";
			let index = 0;

			this.timer = setInterval(() => {
				this.result += chars[Math.floor(Math.random() * chars.length)];
				this.playClick();
				if (++index >= this.length) {
					clearInterval(this.timer);
					this.timer = null;
					console.log(`Password: %c${this.result}`, "color:lime");
				}
			}, 80);
		},
		copy() {
			navigator.clipboard.writeText(this.result);
		},
	},
	computed: {
		strength() {
			let score = Math.min(32, this.length);

			if (this.Lower) score += 26;
			if (this.Upper) score += 26;
			if (this.Num) score += 10;
			if (this.Special) score += 32;

			console.log(`Score: ${score}`);
			if (score <= 50) return ["WEAK", "#f00"];
			else if (score <= 70) return ["MILD", "#ff0"];
			else return ["SAFE", "#0f0"];
		},
	},
}).mount("#app");
