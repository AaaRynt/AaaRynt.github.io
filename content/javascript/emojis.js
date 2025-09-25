const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "🫠", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🫢", "🫣", "🤫", "🤔", "🫡", "🤐", "🤨", "😐", "😑", "😶", "🫥", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "🫨", "🙂‍↔️", "🙂‍↕️", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐", "😕", "🫤", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "🥹", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🙈", "🙉", "🙊", "🐵", "🐶", "🐺", "🦊", "🦝", "🦁", "🐯", "🐴", "🫎", "🦄", "🐮", "🐷", "🐗", "🐭", "🐹", "🐰", "🐻", "🐻‍❄️", "🐨", "🐼", "🐔", "🐸", "🐲", "🌚", "🌛", "🌜", "🌝", "🌞","🎃","🌬️",];

console.log("Keydown '-','Backspace','Delete' or '+' to change the numbers of the emojis! ");
function randomarr(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function randomnum() {
	return Math.random() * 2 + 0.5;
}
function move(div) {
	div.textContent = randomarr(emojis);
	const maxLeft = window.innerWidth - div.offsetWidth;
	const maxTop = window.innerHeight - div.offsetHeight;
	div.style.transition = `left ${randomnum()}s, top ${randomnum()}s, transform ${randomnum()}s`;
	div.style.left = Math.random() * maxLeft + "px";
	div.style.top = Math.random() * maxTop + "px";
	div.style.transform = `scale(${Math.random() + 0.5})`;
}
setInterval(() => {
	document.querySelectorAll(".emoji").forEach(div => move(div));
}, 1500);
document.querySelectorAll(".emoji").forEach(div => move(div));
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
