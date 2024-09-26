// Initial balances and history
let balances = {
    ooredoo: 0,
    djezzy: 0,
    mobilis: 0
};

let history = {
    ooredoo: [],
    djezzy: [],
    mobilis: []
};

// Load balances and history from localStorage
function loadFromLocalStorage() {
    const savedBalances = JSON.parse(localStorage.getItem('balances'));
    const savedHistory = JSON.parse(localStorage.getItem('history'));

    if (savedBalances) {
        balances = savedBalances;
    }
    
    if (savedHistory) {
        history = savedHistory;
    }

    updateTotalBalance(); // Update display with loaded balances
    // Load history display
    Object.keys(history).forEach(provider => {
        const historyElement = document.getElementById(`${provider}-history`);
        historyElement.innerHTML = history[provider].map(entry => `<p>${entry}</p>`).join('');
    });
}

// Add flexy to the selected provider
function addFlexy(provider) {
    const input = document.getElementById(`${provider}-input`);
    const amount = parseFloat(input.value);
    if (amount > 0) {
        balances[provider] += amount;
        updateTotalBalance();
        logHistory(provider, `+${amount}`);
        input.value = ''; // Clear input after operation
        saveToLocalStorage(); // Save to localStorage
    }
}

// Subtract flexy from the selected provider
function subtractFlexy(provider) {
    const input = document.getElementById(`${provider}-input`);
    const amount = parseFloat(input.value);
    if (amount > 0 && balances[provider] - amount >= 0) {
        balances[provider] -= amount;
        updateTotalBalance();
        logHistory(provider, `-${amount}`);
        input.value = ''; // Clear input after operation
        saveToLocalStorage(); // Save to localStorage
    }
}

// Update the total balance displayed at the top of the page
function updateTotalBalance() {
    const total = balances.ooredoo + balances.djezzy + balances.mobilis;
    document.getElementById('total-balance').textContent = total;
}

// Log history of operations
function logHistory(provider, operation) {
    const time = new Date().toLocaleString();
    history[provider].push(`${operation} DA at ${time}`);
}

// Display the history of a selected provider
function showHistory(provider) {
    const historyElement = document.getElementById(`${provider}-history`);
    // Toggle visibility
    if (historyElement.style.display === 'none' || historyElement.style.display === '') {
        historyElement.innerHTML = history[provider].map(entry => `<p>${entry}</p>`).join('');
        historyElement.style.display = 'block';
    } else {
        historyElement.style.display = 'none';
    }
}

// Reset all balances to zero
function resetAll() {
    balances.ooredoo = 0;
    balances.djezzy = 0;
    balances.mobilis = 0;
    updateTotalBalance();
    // Note: Do not clear history as per your requirement
    saveToLocalStorage(); // Save reset state to localStorage
}

// Save balances and history to localStorage
function saveToLocalStorage() {
    localStorage.setItem('balances', JSON.stringify(balances));
    localStorage.setItem('history', JSON.stringify(history));
}

// Load balances and history when the window loads
window.onload = loadFromLocalStorage;
