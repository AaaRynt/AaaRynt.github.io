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
			length: 11,
			Lower: true,
			Upper: true,
			Num: true,
			Special: false,
			result: "",
			timer: null,
			audioCtx: null,
			clickSound: null,
			done: false,
		};
	},
	mounted() {
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	},
	methods: {
		playClick() {
			const ctx = this.audioCtx;

			// 闪点持续时间：30ms
			const duration = 0.03;
			const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
			const data = buffer.getChannelData(0);

			// 噪声：更强烈一点（0.4 → 0.8）
			for (let i = 0; i < data.length; i++) {
				data[i] = (Math.random() - 0.5) * 0.8;
			}

			const noise = ctx.createBufferSource();
			noise.buffer = buffer;

			// 带通滤波（集中能量）
			const filter = ctx.createBiquadFilter();
			filter.type = "bandpass";
			filter.frequency.value = 3500; // 更亮
			filter.Q.value = 10; // 能量更集中，更尖锐

			// 声音更大但不失真：提升到 0.45，然后快速衰减
			const gain = ctx.createGain();
			gain.gain.setValueAtTime(0.45, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

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
			this.done = false;
			let index = 0;

			this.timer = setInterval(() => {
				this.result += chars[Math.floor(Math.random() * chars.length)];
				this.playClick();
				if (++index >= this.length) {
					clearInterval(this.timer);
					this.timer = null;
					setTimeout(() => {
						this.done = true;
					}, 300);
					console.log(`Password: %c${this.result}`, "color:lime");
				}
			}, 50);
		},
		copy() {
			navigator.clipboard.writeText(this.result);
			if (this.done && this.result) alert(`You copied the password: \n ${this.result}`);
		},
	},
	computed: {
		strength() {
			let score = Math.min(32, this.length / 2);

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
