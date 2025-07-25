// Main Application Logic

document.addEventListener('DOMContentLoaded', function() {
    // بررسی ورود قبلی کاربر
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
        loadUserHistory();
    }

    // Search input events
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();
            
            if (query.length > 2) {
                const suggestions = generateSmartSuggestions(query);
                showSuggestions(suggestions);
            } else {
                hideSuggestions();
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });

        searchInput.addEventListener('focus', function(e) {
            const query = e.target.value.trim();
            if (query.length > 2) {
                const suggestions = generateSmartSuggestions(query);
                showSuggestions(suggestions);
            }
        });
    }

    // Chat input events
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.suggestions-container')) {
            hideSuggestions();
        }
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('authModal');
        if (e.target === modal) {
            hideAuthModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideAuthModal();
        }
    });

    // Initialize with chat mode
    switchMode('chat');
});