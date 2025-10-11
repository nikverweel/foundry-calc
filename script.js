const grid = document.getElementById("itemGrid");
const search = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".categories li");

let items = [];
let recipes = [];
let selectedItems = [];

// Load page
document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch("./items.json").then(res => res.json()),
        // fetch("./recipes.json").then(res => res.json())
    ])
    .then(([itemsData, recipesData]) => {
        items = itemsData;
        recipes = recipesData;

        renderItems();
        updateCounters();
    })
    .catch(err => console.error("Error loading JSON:", err));

    // Crusher toggle logic (in here because otherwise it doesn't work for some reason)
    const crusherToggle = document.getElementById("crusherToggle");
    const crusherButton = document.querySelector('.tool-btn[data-menu="crusherMenu"]');

    if (crusherToggle && crusherButton) {
        crusherToggle.addEventListener("change", () => {
            crusherButton.classList.toggle("toggle-on", crusherToggle.checked);
            crusherButton.classList.toggle("toggle-off", !crusherToggle.checked);
        });

        crusherButton.classList.toggle("toggle-on", crusherToggle.checked);
        crusherButton.classList.toggle("toggle-off", !crusherToggle.checked);
    }
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

// Check constraints and select item(s)
function selectItem(item) {
    if (selectedItems.length >= 7) {
        alert('Maximum 7 items allowed')
        return
    };
    if (selectedItems.some(i => i.id === item.id)) return;
    
    selectedItems.push(item);
    renderHeader();
}

// Removes items from the array
function removeItem(itemId) {
    selectedItems = selectedItems.filter(i => i.id !== itemId);
    renderHeader();
}

// Renders the header based on the items in the array
function renderHeader() {
    const content = document.querySelector(".content");
    const creditsHTML = `
    <div class="credits-header">
        <p>Icons by FOUNDRY - not my creations | Recipe information from <a href="https://wiki.foundry-game.com/index.php?title=Foundry_Wiki" target="_blank">FOUNDRY Wiki</a> | Calculator by UnknownUluguru - <a href="https://github.com/nikverweel/foundry-calc/issues" target="_blank">Report issues</a></p>
    </div>`
    
    if (selectedItems.length === 0) {
        content.innerHTML = `
        ${creditsHTML}
        <div class="calc-header">
            <h1>Select an item on the left to begin.</h1>
        </div>
        `;
        return;
    }
    
    const itemsHTML = selectedItems.map(item => `
        <div class="calc-input">    
            <label for="targetAmount-${item.id}">${item.name}</label>    
            <img src="${item.icon}" alt="${item.name}" class="header-icon" data-item-id="${item.id}">
            <input type="number" id="targetAmount-${item.id}" min="0" value="0" step="1">
        </div>
    `).join('');
    
    content.innerHTML = `
    ${creditsHTML}
    <div class="calc-header">
        ${itemsHTML}
    </div>
    <div id="calcResults"></div>
    `;
    
    document.querySelectorAll(".header-icon").forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            const itemId = e.target.getAttribute("data-item-id");
            removeItem(itemId);
        });
    });
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

// Update counters
function updateCounters() {
  document.getElementById("item-count").textContent = items.length;
  document.getElementById("recipe-count").textContent = recipes.length;
}

// Handle menu toggling
document.querySelectorAll(".tool-btn").forEach(button => {
    const menuId = button.dataset.menu;
    if (!menuId) return; // skip buttons without menus

    const menu = document.getElementById(menuId);
    const icon = button.querySelector("img");

    // Toggle menu when clicking the button
    button.addEventListener("click", (e) => {
        e.stopPropagation();
        
        // Close all other menus first
        document.querySelectorAll(".menu").forEach(m => {
            if (m !== menu) m.classList.add("hidden");
        });

        menu.classList.toggle("hidden");
    });

    // Handle option clicks inside this menu
    menu.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", (e) => {
            e.stopPropagation();

            // Remove selection from all in this menu
            menu.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));

            // Highlight this one
            option.classList.add("selected");

            // Update sidebar icon
            icon.src = option.dataset.icon;

            // Close menu
            menu.classList.add("hidden");
        });
    });

});