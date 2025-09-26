const items = [
    { name: "Advanced Machinery Parts", category: "craft", icon: "/res/icons/adv_mach_parts.png"},
    { name: "Advanced Smelter", category: "building", icon: "/res/icons/adv_smelter.png"},
    { name: "Advanced Xenoferrite Ignium Ore Blend", category: "ore", icon: "/res/icons/advanced_xenoferrite_ignium_ore_blend.png"},
    { name: "Air", category: "ore", icon: "/res/icons/air.png"},
    { name: "Air Intake Base", category: "building", icon: "/res/icons/air_intake_base.png"},
    { name: "Assembler I", category: "building", icon: "/res/icons/assembler_i.png"},
    { name: "Assembler II", category: "building", icon: "/res/icons/assembler_ii.png"},
    { name: "Assembler III", category: "building", icon: "/res/icons/assembler_iii.png"},
    { name: "Assembly Line Merger", category: "building", icon: "/res/icons/assembly_line_merger.png"},
    { name: "Assembly Line Painter", category: "building", icon: "/res/icons/assembly_line_painter.png"},
    { name: "Assembly Line Producer", category: "building", icon: "/res/icons/assembly_line_producer.png"},
    { name: "Assembly Line Rail", category: "building", icon: "/res/icons/assembly_line_rail.png"},
    { name: "Assembly Line Splitter", category: "building", icon: "/res/icons/assembly_line_splitter.png"},
    { name: "Assembly Line Start", category: "building", icon: "/res/icons/assembly_line_start.png"},
    { name: "Battery (Large)", category: "building", icon: "/res/icons/battery_large.png"},
    { name: "Battery (Small)", category: "building", icon: "/res/icons/battery_small.png"},
    { name: "Biomass", category: "craft", icon: "/res/icons/biomass.png"},
    { name: "Biomass Burner", category: "building", icon: "/res/icons/biomass_burner.png"},
    { name: "Blast Furnace Base", category: "building", icon: "/res/icons/blast_furnace_base.png"},
    { name: "Blast Furnace Slag", category: "ore", icon: "/res/icons/blast_furnace_slag.png"},
    { name: "Boiler", category: "building", icon: "/res/icons/boiler.png"},
    { name: "Building Block", category: "building", icon: "/res/icons/building_block.png"},
    { name: "Burner Generator", category: "building", icon: "/res/icons/burner_generator.png"},
    { name: "Cargo Ship Start Pad", category: "building", icon: "/res/icons/cargo_ship_start_pad.png"},
    { name: "Cargo Ship Start Pad (Liquids)", category: "building", icon: "/res/icons/cargo_ship_start_pad_liquids.png"},
    { name: "Cargo Ship Target Pad", category: "building", icon: "/res/icons/cargo_ship_target_pad.png"},
    { name: "Cargo Ship Target Pad (Liquids)", category: "building", icon: "/res/icons/cargo_ship_target_pad_liquids.png"},
    { name: "Casting Machine", category: "building", icon: "/res/icons/casting_machine.png"},
    { name: "Ceiling Light I", category: "building", icon: "/res/icons/ceiling_light_i.png"},
    { name: "Ceiling Light II", category: "building", icon: "/res/icons/ceiling_light_ii.png"},
    { name: "Cement", category: "craft", icon: "/res/icons/cement.png"},
    { name: "Chemical Processor", category: "building", icon: "/res/icons/chemical_processor.png"},
    { name: "Circuit Board", category: "craft", icon: "/res/icons/circuit_board.png"},
    { name: "Coked Ignium", category: "ore", icon: "/res/icons/coked_ignium.png"},
    { name: "Combat Robot", category: "robot", icon: "/res/icons/combat_robot.png"},
    { name: "Combat Robot Arm", category: "robot", icon: "/res/icons/combat_robot_arm.png"},
    { name: "Combat Robot Head", category: "robot", icon: "/res/icons/combat_robot_head.png"},
    { name: "Combat Robot Leg", category: "robot", icon: "/res/icons/combat_robot_leg.png"},
    { name: "Combat Robot Torso", category: "robot", icon: "/res/icons/combat_robot_torso.png"},
    { name: "Concrete", category: "craft", icon: "/res/icons/concrete.png"},
    { name: "Construction Material", category: "craft", icon: "/res/icons/construction_material.png"},
    { name: "Construction Ship Port", category: "building", icon: "/res/icons/construction_ship_port.png"},
    { name: "Construction Warehouse", category: "building", icon: "/res/icons/construction_warehouse.png"},
    { name: "Container", category: "building", icon: "/res/icons/container.png"},
    { name: "Conveyor Balancer I", category: "building", icon: "/res/icons/conveyor_balancer_i.png"},
    { name: "Conveyor Balancer II", category: "building", icon: "/res/icons/conveyor_balancer_ii.png"},
    { name: "Conveyor Balancer III", category: "building", icon: "/res/icons/conveyor_balancer_iii.png"},
    { name: "Conveyor I", category: "building", icon: "/res/icons/conveyor_i.png"},
    { name: "Conveyor II", category: "building", icon: "/res/icons/conveyor_ii.png"},
    { name: "Conveyor III", category: "building", icon: "/res/icons/conveyor_iii.png"},
    { name: "Conveyor IV", category: "building", icon: "/res/icons/conveyor_iv.png"},
    { name: "Conveyor Slope I", category: "building", icon: "/res/icons/conveyor_slope_i.png"},
    { name: "Conveyor Slope II", category: "building", icon: "/res/icons/conveyor_slope_ii.png"},
    { name: "Conveyor Slope III", category: "building", icon: "/res/icons/conveyor_slope_iii.png"},
    { name: "CPU", category: "craft", icon: "/res/icons/cpu.png"},
    { name: "Crate", category: "building", icon: "/res/icons/crate.png"},
    { name: "Crude Olumite", category: "ore", icon: "/res/icons/crude_olumite.png"},
    { name: "Crusher I", category: "building", icon: "/res/icons/crusher_i.png"},
    { name: "Crusher II", category: "building", icon: "/res/icons/crusher_ii.png"},
    { name: "Data Cable", category: "building", icon: "/res/icons/data_cable.png"},
    { name: "Data Evaluator", category: "building", icon: "/res/icons/data_evaluator.png"},
    { name: "Data Memory Cell", category: "building", icon: "/res/icons/data_memory_cell.png"},
    { name: "Data Processor", category: "building", icon: "/res/icons/data_processor.png"},
    { name: "Data Source", category: "building", icon: "/res/icons/data_source.png"},
    { name: "Data Source (Button)", category: "building", icon: "/res/icons/data_source_button.png"},
    { name: "Data Source (Lever)", category: "building", icon: "/res/icons/data_source_lever.png"},
    { name: "Distillation Column", category: "building", icon: "/res/icons/distillation_column.png"},
    { name: "Drone Miner I", category: "building", icon: "/res/icons/drone_miner_i.png"},
    { name: "Drone Miner II", category: "building", icon: "/res/icons/drone_miner_ii.png"},
    { name: "Ignium Ore Rubble", category: "ore", icon: "/res/icons/ignium_ore_rubble.png"},
    { name: "Machinery Parts", category: "craft", icon: "/res/icons/mach_parts.png"},
    { name: "Steel Beams", category: "craft", icon: "/res/icons/steel_beams.png"},
    { name: "Xenoferrite Ignium Ore Blend", category: "ore", icon: "/res/icons/xeno_ignium_blend.png"},
    { name: "Xenoferrite Ore Rubble", category: "ore", icon: "/res/icons/xeno_ore_rubble.png"},
    { name: "Xenoferrite Ore", category: "ore", icon: "/res/icons/xeno_ore.png"},
    { name: "Xenoferrite Plate", category: "craft", icon: "/res/icons/xeno_plate.png"}    
];

const grid = document.getElementById("itemGrid");
const search = document.getElementById("search");
const categoryButtons = document.querySelectorAll(".categories li");

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