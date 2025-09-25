// https://analytics.google.com/analytics/web/
window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-DBVDLF0RZ6");

let not = 0;
let offset = 100;
const createBtn = document.getElementById("Create");

function Random() {
	const chars = "01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (let i = 0; i < 6; i++) {
		const Index = Math.floor(Math.random() * chars.length);
		result += chars[Index];
	}
	return result;
}

createBtn.addEventListener("click", function () {
	const date = `${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, "0")}/${new Date().getDate().toString().padStart(2, "0")}`;
	const time = `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, "0")}:${new Date().getSeconds().toString().padStart(2, "0")}`;
	const tr = document.querySelector("tbody").insertRow();

	offset += 60;
	createBtn.style.setProperty("--y-offset", `${offset}px`);

	tr.innerHTML = `
                <td>${++not}</td>
                <td class="ID">${Random()}</td>
                <td><input type="text" style="width:40%" placeholder="Input your name:"></td>
                <td>照片</td>
                <td>${date}</td> 
                <td>${time}</td>
                <td>11.4,51.4</td> 
                <td>
                    <button class="Update">Update</button> 
                    <button class="Delete">Delete</button>
                </td>
            `;

	tr.querySelector("input").addEventListener("change", e => {
		e.target.closest("td").innerHTML = e.target.value;
	});

	tr.querySelector(".Delete").addEventListener("click", e => {
		offset -= 60;
		createBtn.style.setProperty("--y-offset", `${offset}px`);
		e.target.closest("tr").remove();
	});

	tr.querySelector(".ID").addEventListener("click", e => {
		const text = e.target.innerText;
		const textarea = document.createElement("textarea");
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);

		const copy = document.getElementById("copy");
		copy.style.display = "block";
		copy.style.opacity = 1;
		setTimeout(() => {
			copy.style.opacity = 0;
			setTimeout(() => {
				copy.style.display = "none";
			}, 850);
		}, 800);
	});
});
