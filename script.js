const AUTH_KEY = "quickcartIsLoggedIn";

function setMessage(elementId, message, type = "") {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = message;
    el.className = type;
}

// Tab Switching
function switchTab(tab) {
    setMessage("msg", "");

    if (tab === 'signin') {
        document.getElementById("signInTab").classList.add("active");
        document.getElementById("signUpTab").classList.remove("active");
        document.getElementById("signInForm").classList.add("active");
        document.getElementById("signUpForm").classList.remove("active");
    } else {
        document.getElementById("signUpTab").classList.add("active");
        document.getElementById("signInTab").classList.remove("active");
        document.getElementById("signUpForm").classList.add("active");
        document.getElementById("signInForm").classList.remove("active");
    }
}

// Get accounts from localStorage
function getUsers() {
    let users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
}

// Save accounts to localStorage
function saveUsers(users) {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
}

// Registration (Sign Up)
function signUp() {
    let username = document.getElementById("regUsername").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value;
    let confirmPassword = document.getElementById("regConfirmPassword").value;
    if (!username || !email || !password || !confirmPassword) {
        setMessage("msg", "All fields are required!", "error");
        return;
    }

    if (username.length < 3) {
        setMessage("msg", "Username must be at least 3 characters.", "error");
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setMessage("msg", "Please enter a valid email address.", "error");
        return;
    }

    if (password.length < 6) {
        setMessage("msg", "Password must be at least 6 characters.", "error");
        return;
    }

    if (password !== confirmPassword) {
        setMessage("msg", "Passwords do not match!", "error");
        return;
    }

    let users = getUsers();
    
    // Check if username is already taken
    let userExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (userExists || username.toLowerCase() === "tester") {
        setMessage("msg", "Username is already taken!", "error");
        return;
    }

    // Store new credentials
    users.push({ username, email, password });
    saveUsers(users);

    setMessage("msg", "Registration successful! Switching to Sign In...", "success");

    // Clear register form
    clearFields('signup');
    
    // Transition to Sign In after registration success
    setTimeout(() => {
        switchTab('signin');
        document.getElementById("username").value = username;
        document.getElementById("password").focus();
    }, 1500);
}

// Log In (Sign In)
function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    if (!username || !password) {
        setMessage("msg", "Please enter username and password.", "error");
        return;
    }

    // 1. Check hardcoded tester credentials first
    if (username === "tester" && password === "Test@123") {
        sessionStorage.setItem(AUTH_KEY, "true");
        setMessage("msg", "Login successful! Redirecting...", "success");
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
        return;
    }

    // 2. Check localStorage credentials
    let users = getUsers();
    let user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

    if (user) {
        sessionStorage.setItem(AUTH_KEY, "true");
        setMessage("msg", "Login successful! Redirecting...", "success");
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        setMessage("msg", "Invalid Username or Password", "error");
    }
}

// Clear fields based on active form
function clearFields(formType) {
    if (formType === 'signin') {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else if (formType === 'signup') {
        document.getElementById("regUsername").value = "";
        document.getElementById("regEmail").value = "";
        document.getElementById("regPassword").value = "";
        document.getElementById("regConfirmPassword").value = "";
    } else {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        setMessage("msg", "");
    }
}

function requireAuthForDashboard() {
    if (!window.location.pathname.endsWith("dashboard.html")) return;
    if (sessionStorage.getItem(AUTH_KEY) !== "true") {
        window.location.href = "index.html";
    }
}

function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = "index.html";
}

function calculate() {

    let price = parseInt(document.getElementById("product").value, 10);
    let qty = parseInt(document.getElementById("qty").value, 10);
    let delivery = parseInt(document.getElementById("delivery").value, 10);

    if (!Number.isInteger(qty) || qty <= 0) {
        setMessage("checkoutMsg", "Enter a valid quantity greater than 0.", "error");
        document.getElementById("total").textContent = "Grand Total : ₹0";
        return;
    }

    let total = price * qty;

    if (document.getElementById("gift").checked) {
        total = total + 100;
    }

    if (document.getElementById("coupon").value.trim().toUpperCase() === "SAVE10") {
        total = total - 100;
    }

    total = total + delivery;

    document.getElementById("total").textContent = "Grand Total : ₹" + total;
    setMessage("checkoutMsg", "", "");

}

function resetForm() {

    document.getElementById("product").selectedIndex = 0;
    document.getElementById("qty").value = "";
    document.getElementById("coupon").value = "";
    document.getElementById("delivery").selectedIndex = 0;
    document.getElementById("gift").checked = false;
    document.getElementById("total").textContent = "Grand Total : ₹0";
    setMessage("checkoutMsg", "", "");

}

requireAuthForDashboard();