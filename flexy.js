// Initial balances
let balances = {
    ooredoo: 0,
    djezzy: 0,
    mobilis: 0
};

// Operation history
let history = {
    ooredoo: [],
    djezzy: [],
    mobilis: []
};

// Add flexy to the selected provider
function addFlexy(provider) {
    const amount = parseFloat(document.getElementById(`${provider}-input`).value);
    if (amount > 0) {
        balances[provider] += amount;
        updateTotalBalance();
        logHistory(provider, `+${amount}`);
    }
}

// Subtract flexy from the selected provider
function subtractFlexy(provider) {
    const amount = parseFloat(document.getElementById(`${provider}-input`).value);
    if (amount > 0 && balances[provider] - amount >= 0) {
        balances[provider] -= amount;
        updateTotalBalance();
        logHistory(provider, `-${amount}`);
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
    history.ooredoo = [];
    history.djezzy = [];
    history.mobilis = [];
    document.getElementById('ooredoo-history').innerHTML = '';
    document.getElementById('djezzy-history').innerHTML = '';
    document.getElementById('mobilis-history').innerHTML = '';
}
