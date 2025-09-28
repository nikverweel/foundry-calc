const grid = document.getElementById("itemGrid");
const search = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".categories li");
const furnaceBtn = document.getElementById("furnaceBtn");

let items = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("items.json")
    .then(res => res.json())
    .then(data => {
      items = data;
      renderItems();
    });
});

// Render items
function renderItems(filter = "all", query = "") {
    grid.innerHTML = "";
    items
        .filter(item => (filter === "all" || item.category === filter))
        .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        .forEach(item => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <img src="${item.icon}" alt="${item.name}">
                <p>${item.name}</p>
            `;
            div.addEventListener("click", () => selectItem(item));
            grid.appendChild(div)
        });
}

function selectItem(item) {
    document.querySelector(".content").innerHTML = `
        <h1>${item.name}</h1>
        <p>Calculator for ${item.name} will go here...</p>
    `
}

// Category switching
categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderItems(btn.dataset.category, search.value);
    });
});

// Search
search.addEventListener("input", () => {
    const activeCategory = document.querySelector(".categories li.active").dataset.category;
    renderItems(activeCategory, search.value)
})

// Initial load
renderItems();

// Tools Menu Logic
furnaceBtn.addEventListener("click", () => {
  furnaceMenu.classList.toggle("open");
});