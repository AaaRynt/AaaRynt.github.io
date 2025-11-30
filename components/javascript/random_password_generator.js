Vue.createApp({
	data() {
		return { length: 6, Lower: true, Upper: true, Num: true, Special: false, result: "", timer: null };
	},
	methods: {
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
			else if (score <= 70 && score > 50) return ["MILD", "#ff0"];
			else return ["SAFE", "#0f0"];
		},
	},
}).mount("#app");
