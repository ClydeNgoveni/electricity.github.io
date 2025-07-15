function dailyKwhUsage() {
    const appliances = {
        "fan": 0.075,
        "light": 0.015,
        "refrigerator": 0.15,
        "ac": 1.0,
        "tv": 0.1,
        "washing machine": 0.5,
        "kettle": 2.0,
        "microwave": 1.2,
        "computer": 0.2,
        "heater": 1.5,
        "oven": 2.0,
        "toaster": 0.8,
        "iron": 1.2,
    };
    let totalKwh = 0;
    // Example: Current price per unit in Rand (ZAR)
    let pricePerUnitRand = 2.72; // You can update this value as needed

    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
    <img src="icons/idea_7136540.png" width="50" height="50">    
    <h1>Electricity Usage App</h1>
    <div class="owner" style="text-align: center;">
    <p>Powered By 
    <img src="icons/eskom-seeklogo.png" width="62.5" height="- 14.5625"></p>
    </div>
        <form id="usageForm">
            <label>Appliance:
                <select id="appliance">
                    ${Object.keys(appliances).map(a => `<option value="${a}">${a.charAt(0).toUpperCase() + a.slice(1)}</option>`).join("")}
                </select>
            </label>
            <label>Hours used:
                <input type="number" id="hours" min="0" max="24" step="0.01" required>
            </label>
            <label>Number of appliances:
                <input type="number" id="count" min="1" step="1" required>
            </label>
            <label>Current price per unit (Rand):
                <input type="number" id="priceRand" min="0" step="0.01" value="${pricePerUnitRand}" required>
            </label>
            <button type="submit">Add On Cart</button>
        </form>
        <div class="button-group">
            <button id="finishBtn">Print</button>
            <button id="goBackBtn" type="button">Clear</button>
        </div>
        <div id="usageResults"></div>
    `;
    let usageResults = document.getElementById("usageResults");
    document.getElementById("usageForm").onsubmit = function(e) {
        e.preventDefault();
        let appliance = document.getElementById("appliance").value;
        let hours = parseFloat(document.getElementById("hours").value);
        let count = parseInt(document.getElementById("count").value, 10);
        let priceRand = parseFloat(document.getElementById("priceRand").value);
        if (isNaN(hours) || hours < 0 || hours > 24 || isNaN(count) || count < 1 || isNaN(priceRand) || priceRand < 0) {
            usageResults.innerHTML += `<p style="color:red;">Invalid input.</p>`;
            return;
        }
        let kwh = appliances[appliance] * hours * count;
        totalKwh += kwh;
        let cost = kwh * priceRand;
        usageResults.innerHTML += `<p>${count} ${appliance.charAt(0).toUpperCase() + appliance.slice(1)}(s) used for ${hours} hour(s): ${kwh.toFixed(2)} kWh, Cost: R${cost.toFixed(2)}</p>`;
        document.getElementById("usageForm").reset();
    };
    document.getElementById("finishBtn").onclick = function() {
        let priceRand = parseFloat(document.getElementById("priceRand").value);
        if (isNaN(priceRand) || priceRand < 0) priceRand = 0;
        let totalCost = totalKwh * priceRand;
        usageResults.innerHTML += `<p><strong>Total electricity used today: ${totalKwh.toFixed(2)} kWh</strong></p>`;
        usageResults.innerHTML += `<p><strong>Total cost: R${totalCost.toFixed(2)}</strong></p>`;
        document.getElementById("usageForm").style.display = "none";
        this.style.display = "none";
    };
    document.getElementById("goBackBtn").onclick = function() {
        dailyKwhUsage(); // Reset everything by re-calling the function
    };
}

// To run in browser, call dailyKwhUsage();