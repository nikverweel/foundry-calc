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
        Promise.resolve([])
    ])
        .then(([itemsData, recipesData]) => {
        items = itemsData;
        recipes = recipesData;
        renderItems();
        updateCounters();
        loadState();
        loadFromURL();
        attachSaveLoadShareListeners();
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
    saveState();
}

// Removes items from the array
function removeItem(itemId) {
    selectedItems = selectedItems.filter(i => i.id !== itemId);
    renderHeader();
    saveState();
}

// Renders the header based on the items in the array
function renderHeader() {
    const calcHeader = document.querySelector(".calc-header");
    
    if (selectedItems.length === 0) {
        calcHeader.innerHTML = '<h1>Select an item on the left to begin.</h1>';
        return;
    }
    
    const itemsHTML = selectedItems.map(item => {
        const currentValue = document.getElementById(`targetAmount-${item.id}`)?.value || 0;
        return `<div class="calc-input">    
                    <label for="targetAmount-${item.id}">${item.name}</label>    
                    <img src="${item.icon}" alt="${item.name}" class="header-icon" data-item-id="${item.id}">
                    <div class="input-with-unit">
                        <input type="number" id="targetAmount-${item.id}" min="0" value="${currentValue}" step="1">
                        <span class="unit-label">p/m</span>
                    </div>
                </div>`;
    }).join('');

    
    calcHeader.innerHTML = itemsHTML;
    
    // Re-attach event listeners only for calc-header elements
    document.querySelectorAll(".header-icon").forEach(icon => {
        icon.addEventListener("click", (e) => {
            e.stopPropagation();
            const itemId = e.target.getAttribute("data-item-id");
            removeItem(itemId);
        });
    });

    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', saveState);
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

// Saving settings
function getCurrentState() {
    return {
        selectedItems: selectedItems.map(item => ({
            id: item.id,
            amount: document.getElementById(`targetAmount-${item.id}`)?.value || 0
        })),
        crusherEnabled: document.getElementById("crusherToggle")?.checked || false,
        timestamp: Date.now()
    };
}

function saveState() {
    const state = getCurrentState();
    localStorage.setItem('foundryCalcState', JSON.stringify(state));
}

// Saving from save menu
function saveCalculation(name) {
    let savedCalculations = JSON.parse(localStorage.getItem('savedCalcs')) || {};
    savedCalculations[name] = getCurrentState();
    localStorage.setItem('savedCalcs', JSON.stringify(savedCalculations));
}

// Loading data from localStorage
function loadState() {
    console.log('loadState called');
    const saved = localStorage.getItem('foundryCalcState');
    console.log('Saved data:', saved);
    
    if (!saved) return;
    
    const state = JSON.parse(saved);
    
    // Restore crusher toggle
    const crusherToggle = document.getElementById("crusherToggle");
    if (crusherToggle && state.crusherEnabled !== undefined) {
        crusherToggle.checked = state.crusherEnabled;
        crusherToggle.dispatchEvent(new Event('change'));
    }
    
    // Restore selected items
    if (state.selectedItems && state.selectedItems.length > 0) {
        state.selectedItems.forEach(savedItem => {
            const item = items.find(i => i.id === savedItem.id);
            if (item) {
                selectedItems.push(item);
            }
        });
        renderHeader();
        
        // Restore amounts after render
        setTimeout(() => {
            state.selectedItems.forEach(savedItem => {
                const input = document.getElementById(`targetAmount-${savedItem.id}`);
                if (input) {
                    input.value = savedItem.amount;
                    console.log(`Restored ${savedItem.id}: ${savedItem.amount}`);
                }
            });
        }, 50);
    }
}

// Load from load menu
function loadCalculation(name) {
    const savedCalculations = JSON.parse(localStorage.getItem('savedCalcs')) || {};
    const state = savedCalculations[name];
    
    if (!state) return;
    
    selectedItems = [];
    state.selectedItems.forEach(savedItem => {
        const item = items.find(i => i.id === savedItem.id);
        if (item) selectedItems.push(item);
    });
    
    renderHeader();
    
    setTimeout(() => {
        state.selectedItems.forEach(savedItem => {
            const input = document.getElementById(`targetAmount-${savedItem.id}`);
            if (input) input.value = savedItem.amount;
        });
        
        const crusherToggle = document.getElementById("crusherToggle");
        if (crusherToggle) {
            crusherToggle.checked = state.crusherEnabled;
            crusherToggle.dispatchEvent(new Event('change'));
        }
    }, 50);
}

// Save, load and share dialog handlers
function attachSaveLoadShareListeners() {
    // Save Dialog
    const saveBtn = document.getElementById('saveBtn');
    const saveCancelBtn = document.getElementById('saveCancelBtn');
    const saveConfirmBtn = document.getElementById('saveConfirmBtn');
    const saveNameInput = document.getElementById('saveNameInput');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            document.getElementById('saveDialog').classList.remove('hidden');
            saveNameInput.value = '';
            saveNameInput.focus();
        });
    }
    
    if (saveCancelBtn) {
        saveCancelBtn.addEventListener('click', () => {
            document.getElementById('saveDialog').classList.add('hidden');
        });
    }
    
    if (saveConfirmBtn) {
        saveConfirmBtn.addEventListener('click', () => {
            const name = saveNameInput.value.trim();
            if (!name) {
                alert('Please enter a save name');
                return;
            }
            saveCalculation(name);
            document.getElementById('saveDialog').classList.add('hidden');
            alert(`Saved as "${name}"`);
        });
    }
    
    if (saveNameInput) {
        saveNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveConfirmBtn.click();
            }
        });
    }
    
    // Load Dialog
    const loadBtn = document.getElementById('loadBtn');
    const loadCancelBtn = document.getElementById('loadCancelBtn');
    
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            populateSavesList();
            document.getElementById('loadDialog').classList.remove('hidden');
        });
    }
    
    if (loadCancelBtn) {
        loadCancelBtn.addEventListener('click', () => {
            document.getElementById('loadDialog').classList.add('hidden');
        });
    }
    
    // Share Dialog
    const shareBtn = document.getElementById('shareBtn');
    const shareCancelBtn = document.getElementById('shareCancelBtn');
    const copyUrlBtn = document.getElementById('copyUrlBtn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const shareUrl = generateShareURL(); // TO DO - Add functionality
            document.getElementById('shareUrlInput').value = shareUrl;
            document.getElementById('shareDialog').classList.remove('hidden');
        });
    }
    
    if (shareCancelBtn) {
        shareCancelBtn.addEventListener('click', () => {
            document.getElementById('shareDialog').classList.add('hidden');
        });
    }
    
    if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', () => {
            const input = document.getElementById('shareUrlInput');
            input.select();
            document.execCommand('copy');
            
            copyUrlBtn.textContent = 'Copied!';
            copyUrlBtn.classList.add('copied');
            
            setTimeout(() => {
                copyUrlBtn.textContent = 'Copy';
                copyUrlBtn.classList.remove('copied');
            }, 2000);
        });
    }
}

function populateSavesList() {
    const savesList = document.getElementById('savesList');
    const savedCalculations = JSON.parse(localStorage.getItem('savedCalcs')) || {};
    
    if (Object.keys(savedCalculations).length === 0) {
        savesList.innerHTML = '<div class="empty-saves">No saved calculations yet.</div>';
        return;
    }
    
    savesList.innerHTML = Object.entries(savedCalculations).map(([name, save]) => {
        const date = new Date(save.timestamp).toLocaleString();
        return `
            <div class="save-item" data-save-name="${name}">
                <div class="save-item-info">
                    <div class="save-item-name">${name}</div>
                    <div class="save-item-date">${date}</div>
                </div>
                <button class="delete-btn" data-save-name="${name}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.save-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.delete-btn')) return;
            loadCalculation(item.dataset.saveName);
            document.getElementById('loadDialog').classList.add('hidden');
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const saveName = btn.dataset.saveName;
            if (confirm(`Delete save "${saveName}"?`)) {
                let savedCalculations = JSON.parse(localStorage.getItem('savedCalcs')) || {};
                delete savedCalculations[saveName];
                localStorage.setItem('savedCalcs', JSON.stringify(savedCalculations));
                populateSavesList();
            }
        });
    });
}

document.querySelectorAll('.dialog-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
        }
    });
});

// URL Sharing logic
function generateShareURL() {
    const state = {
        items: selectedItems.map(item => ({
            id: item.id,
            amt: document.getElementById(`targetAmount-${item.id}`)?.value || 0
        })),
        crusher: document.getElementById("crusherToggle")?.checked ? 1 : 0
    };
    
    // Encode to base64 and make URL-safe
    const json = JSON.stringify(state);
    const base64 = btoa(json);
    const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    
    return `${window.location.origin}${window.location.pathname}?state=${urlSafe}`;
}

function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get('state');
    
    if (!stateParam) return;
    
    try {
        // Convert URL-safe base64 back to standard base64
        let base64 = stateParam.replace(/-/g, '+').replace(/_/g, '/');
        
        // Add padding if needed
        while (base64.length % 4) {
            base64 += '=';
        }
        
        const json = atob(base64);
        const state = JSON.parse(json);
        
        // Clear existing items
        selectedItems = [];
        
        // Load items from state
        state.items.forEach(savedItem => {
            const item = items.find(i => i.id === savedItem.id);
            if (item) selectedItems.push(item);
        });
        
        renderHeader();
        
        // Restore amounts and crusher state
        setTimeout(() => {
            state.items.forEach(savedItem => {
                const input = document.getElementById(`targetAmount-${savedItem.id}`);
                if (input) input.value = savedItem.amt;
            });
            
            const crusherToggle = document.getElementById("crusherToggle");
            if (crusherToggle) {
                crusherToggle.checked = state.crusher === 1;
                crusherToggle.dispatchEvent(new Event('change'));
            }
        }, 50);

        // Clean URL after loading
        window.history.replaceState({}, document.title, window.location.pathname);
        
    } catch (e) {
        console.error('Invalid share URL:', e);
    }
}
