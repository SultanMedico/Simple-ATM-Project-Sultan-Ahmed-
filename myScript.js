document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-menu-screen');
    const depositScreen = document.getElementById('deposit-screen');
    const withdrawScreen = document.getElementById('withdraw-screen');
    const balanceScreen = document.getElementById('balance-screen');

    const pinInput = document.getElementById('pin-input');
    const pinSubmitBtn = document.getElementById('pin-submit-btn');
    const loginMessage = document.getElementById('login-message');

    const balanceDisplay = document.getElementById('balance-display');
    const depositBtn = document.getElementById('deposit-btn');
    const withdrawBtn = document.getElementById('withdraw-btn');
    const checkBalanceBtn = document.getElementById('check-balance-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const transactionMessage = document.getElementById('transaction-message');

    const depositAmountInput = document.getElementById('deposit-amount-input');
    const depositSubmitBtn = document.getElementById('deposit-submit-btn');
    const depositBackBtn = document.getElementById('deposit-back-btn');
    const depositMessage = document.getElementById('deposit-message');

    const withdrawAmountInput = document.getElementById('withdraw-amount-input');
    const withdrawSubmitBtn = document.getElementById('withdraw-submit-btn');
    const withdrawBackBtn = document.getElementById('withdraw-back-btn');
    const withdrawMessage = document.getElementById('withdraw-message');

    const currentBalanceCheck = document.getElementById('current-balance-check');
    const balanceBackBtn = document.getElementById('balance-back-btn');

    // --- ATM Variables ---
    let balance = 1000.00; // Initial balance
    const correctPIN = "1234"; // Hardcoded PIN for this example

    // --- Helper Functions ---
    function showScreen(screenToShow) {
        // Hide all screens
        const allScreens = document.querySelectorAll('.screen');
        allScreens.forEach(screen => screen.classList.remove('active'));
        // Show the desired screen
        screenToShow.classList.add('active');
    }

    function updateBalanceDisplay() {
        balanceDisplay.textContent = balance.toFixed(2); // Format to 2 decimal places
        currentBalanceCheck.textContent = balance.toFixed(2);
    }

    function showMessage(element, msg, type) {
        element.textContent = msg;
        element.className = `message ${type}`; // Add dynamic class for styling
    }

    function clearMessages() {
        loginMessage.textContent = ''; loginMessage.className = 'message';
        transactionMessage.textContent = ''; transactionMessage.className = 'message';
        depositMessage.textContent = ''; depositMessage.className = 'message';
        withdrawMessage.textContent = ''; withdrawMessage.className = 'message';
    }

    // --- Event Listeners ---

    // Login Screen
    pinSubmitBtn.addEventListener('click', () => {
        clearMessages();
        const enteredPIN = pinInput.value;
        if (enteredPIN === correctPIN) {
            updateBalanceDisplay();
            showScreen(mainScreen);
            pinInput.value = ''; // Clear PIN input
            showMessage(loginMessage, 'Login successful!', 'success'); // Optional: brief success message
        } else {
            showMessage(loginMessage, 'Invalid PIN. Please try again.', 'error');
        }
    });

    pinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            pinSubmitBtn.click();
        }
    });

    // Main Menu Buttons
    depositBtn.addEventListener('click', () => {
        clearMessages();
        depositAmountInput.value = ''; // Clear previous input
        showScreen(depositScreen);
    });

    withdrawBtn.addEventListener('click', () => {
        clearMessages();
        withdrawAmountInput.value = ''; // Clear previous input
        showScreen(withdrawScreen);
    });

    checkBalanceBtn.addEventListener('click', () => {
        clearMessages();
        updateBalanceDisplay(); // Ensure balance is updated before showing
        showScreen(balanceScreen);
    });

    logoutBtn.addEventListener('click', () => {
        clearMessages();
        showScreen(loginScreen);
        showMessage(loginMessage, 'You have been logged out.', 'info');
    });

    // Deposit Screen
    depositSubmitBtn.addEventListener('click', () => {
        clearMessages();
        const amount = parseFloat(depositAmountInput.value);

        if (isNaN(amount) || amount <= 0) {
            showMessage(depositMessage, 'Please enter a valid positive amount.', 'error');
            return;
        }

        balance += amount;
        updateBalanceDisplay();
        showMessage(depositMessage, `Successfully deposited $${amount.toFixed(2)}. New balance: $${balance.toFixed(2)}`, 'success');
        depositAmountInput.value = ''; // Clear input after transaction
    });

    depositBackBtn.addEventListener('click', () => {
        clearMessages();
        showScreen(mainScreen);
    });

    // Withdraw Screen
    withdrawSubmitBtn.addEventListener('click', () => {
        clearMessages();
        const amount = parseFloat(withdrawAmountInput.value);

        if (isNaN(amount) || amount <= 0) {
            showMessage(withdrawMessage, 'Please enter a valid positive amount.', 'error');
            return;
        }

        if (amount > balance) {
            showMessage(withdrawMessage, `Insufficient funds. Your balance is $${balance.toFixed(2)}.`, 'error');
            return;
        }

        balance -= amount;
        updateBalanceDisplay();
        showMessage(withdrawMessage, `Successfully withdrew $${amount.toFixed(2)}. New balance: $${balance.toFixed(2)}`, 'success');
        withdrawAmountInput.value = ''; // Clear input after transaction
    });

    withdrawBackBtn.addEventListener('click', () => {
        clearMessages();
        showScreen(mainScreen);
    });

    // Balance Screen
    balanceBackBtn.addEventListener('click', () => {
        clearMessages();
        showScreen(mainScreen);
    });

    // Initial state: show login screen
    showScreen(loginScreen);
});