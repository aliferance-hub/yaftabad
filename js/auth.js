// Authentication Functions

function showAuthModal(mode) {
    document.getElementById('authModal').classList.add('show');
    switchAuthMode(mode);
}

function hideAuthModal() {
    document.getElementById('authModal').classList.remove('show');
}

function switchAuthMode(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // شبیه‌سازی ورود (در پروژه واقعی باید به سرور ارسال شود)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUserInterface();
        loadUserHistory();
        hideAuthModal();
        alert('با موفقیت وارد شدید!');
    } else {
        alert('ایمیل یا رمز عبور اشتباه است');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // بررسی وجود کاربر
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        alert('این ایمیل قبلاً ثبت شده است');
        return;
    }
    
    // ثبت کاربر جدید
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        joinDate: new Date().toISOString(),
        searchHistory: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    updateUserInterface();
    hideAuthModal();
    alert('ثبت‌نام با موفقیت انجام شد!');
}

function logout() {
    currentUser = null;
    userSearchHistory = [];
    localStorage.removeItem('currentUser');
    updateUserInterface();
    alert('با موفقیت خارج شدید');
}

function updateUserInterface() {
    const userPanel = document.getElementById('userPanel');
    const userInfo = document.getElementById('userInfo');
    const historySection = document.getElementById('historySection');
    
    if (currentUser) {
        userPanel.classList.add('hidden');
        userInfo.classList.remove('hidden');
        document.getElementById('userName').textContent = currentUser.name;
        historySection.classList.add('show');
    } else {
        userPanel.classList.remove('hidden');
        userInfo.classList.add('hidden');
        historySection.classList.remove('show');
    }
}

function saveSearchToHistory(query, results) {
    if (!currentUser) return;
    
    const searchRecord = {
        id: Date.now(),
        query: query,
        results: results,
        date: new Date().toISOString(),
        timestamp: new Date().toLocaleString('fa-IR')
    };
    
    userSearchHistory.unshift(searchRecord);
    
    // حفظ فقط 50 جستجوی اخیر
    if (userSearchHistory.length > 50) {
        userSearchHistory = userSearchHistory.slice(0, 50);
    }
    
    // ذخیره در localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].searchHistory = userSearchHistory;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    displayUserHistory();
}

function loadUserHistory() {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === currentUser.id);
    
    if (user && user.searchHistory) {
        userSearchHistory = user.searchHistory;
        displayUserHistory();
    }
}

function displayUserHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    if (userSearchHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">هنوز جستجویی انجام نداده‌اید</p>';
        return;
    }
    
    userSearchHistory.forEach(record => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-query">"${record.query}"</div>
            <div class="history-date">${record.timestamp}</div>
            <div class="history-actions">
                <button class="history-action-btn" onclick="repeatSearch('${record.query}')">جستجوی مجدد</button>
                <button class="history-action-btn delete-history-btn" onclick="deleteHistoryItem(${record.id})">حذف</button>
            </div>
        `;
        historyList.appendChild(historyItem);
    });
}

function repeatSearch(query) {
    // تعویض به حالت جستجو
    switchMode('search');
    document.getElementById('searchInput').value = query;
    searchProducts();
}

function deleteHistoryItem(id) {
    if (confirm('آیا مطمئن هستید که می‌خواهید این جستجو را حذف کنید؟')) {
        userSearchHistory = userSearchHistory.filter(item => item.id !== id);
        
        // به‌روزرسانی در localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].searchHistory = userSearchHistory;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        displayUserHistory();
    }
}

function clearUserHistory() {
    if (confirm('آیا مطمئن هستید که می‌خواهید تمام تاریخچه را پاک کنید؟')) {
        userSearchHistory = [];
        
        // به‌روزرسانی در localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].searchHistory = [];
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        displayUserHistory();
    }
}