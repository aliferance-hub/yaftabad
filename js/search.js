// Search Functions

function switchMode(mode) {
    const chatMode = document.getElementById('chatMode');
    const searchMode = document.getElementById('searchMode');
    const chatContainer = document.getElementById('chatContainer');
    const searchContainer = document.getElementById('searchContainer');

    if (mode === 'chat') {
        chatMode.classList.add('active');
        searchMode.classList.remove('active');
        chatContainer.classList.remove('hidden');
        searchContainer.classList.add('hidden');
    } else {
        searchMode.classList.add('active');
        chatMode.classList.remove('active');
        searchContainer.classList.remove('hidden');
        chatContainer.classList.add('hidden');
    }
}

function setExample(text) {
    document.getElementById('searchInput').value = text;
    hideSuggestions();
}

function addToSearch(text) {
    const input = document.getElementById('searchInput');
    const currentValue = input.value.trim();
    
    if (currentValue) {
        input.value = currentValue + ' ' + text;
    } else {
        input.value = text;
    }
    
    hideSuggestions();
    input.focus();
}

function generateSmartSuggestions(query) {
    const suggestions = { keywords: [], brands: [], filters: [] };
    const queryLower = query.toLowerCase();

    // Find related keywords
    Object.keys(smartSuggestions.keywords).forEach(key => {
        if (queryLower.includes(key) || smartSuggestions.keywords[key].some(synonym => queryLower.includes(synonym))) {
            suggestions.keywords = [...suggestions.keywords, ...smartSuggestions.keywords[key]];
        }
    });

    // Find related brands
    Object.keys(smartSuggestions.brands).forEach(category => {
        if (queryLower.includes(category)) {
            suggestions.brands = [...suggestions.brands, ...smartSuggestions.brands[category]];
        }
    });

    // Add filters
    Object.keys(smartSuggestions.filters).forEach(filterType => {
        suggestions.filters = [...suggestions.filters, ...smartSuggestions.filters[filterType]];
    });

    // Remove duplicates
    suggestions.keywords = [...new Set(suggestions.keywords)];
    suggestions.brands = [...new Set(suggestions.brands)];
    suggestions.filters = [...new Set(suggestions.filters)];

    return suggestions;
}

function showSuggestions(suggestions) {
    const dropdown = document.getElementById('suggestionsDropdown');
    dropdown.innerHTML = '';
    let hasContent = false;

    if (suggestions.keywords.length > 0) {
        hasContent = true;
        const keywordSection = document.createElement('div');
        keywordSection.className = 'suggestion-section';
        keywordSection.innerHTML = `
            <div class="suggestion-title">کلمات مرتبط</div>
            <div class="suggestion-items">
                ${suggestions.keywords.slice(0, 6).map(keyword => 
                    `<span class="suggestion-item" onclick="addToSearch('${keyword}')">${keyword}</span>`
                ).join('')}
            </div>
        `;
        dropdown.appendChild(keywordSection);
    }

    if (suggestions.brands.length > 0) {
        hasContent = true;
        const brandSection = document.createElement('div');
        brandSection.className = 'suggestion-section';
        brandSection.innerHTML = `
            <div class="suggestion-title">برندهای پیشنهادی</div>
            <div class="suggestion-items">
                ${suggestions.brands.slice(0, 6).map(brand => 
                    `<span class="suggestion-item brand-item" onclick="addToSearch('${brand}')">${brand}</span>`
                ).join('')}
            </div>
        `;
        dropdown.appendChild(brandSection);
    }

    if (suggestions.filters.length > 0) {
        hasContent = true;
        const filterSection = document.createElement('div');
        filterSection.className = 'suggestion-section';
        filterSection.innerHTML = `
            <div class="suggestion-title">فیلترهای مفید</div>
            <div class="suggestion-items">
                ${suggestions.filters.slice(0, 6).map(filter => 
                    `<span class="suggestion-item filter-item" onclick="addToSearch('${filter}')">${filter}</span>`
                ).join('')}
            </div>
        `;
        dropdown.appendChild(filterSection);
    }

    dropdown.style.display = hasContent ? 'block' : 'none';
}

function hideSuggestions() {
    document.getElementById('suggestionsDropdown').style.display = 'none';
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        alert('لطفاً محصول مورد نظرتان را بنویسید');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';

    setTimeout(() => {
        // فیلتر کردن محصولات بر اساس جستجو
        const filteredProducts = filterProductsByQuery(query);
        displayResults(filteredProducts);
        
        // ذخیره جستجو در تاریخچه کاربر
        if (currentUser) {
            saveSearchToHistory(query, filteredProducts);
        }
    }, 2000);
}

function filterProductsByQuery(query) {
    const queryLower = query.toLowerCase();
    
    // اگر جستجو شامل کلمات خاصی باشد، محصولات مرتبط رو نشون بده
    if (queryLower.includes('گوشی') || queryLower.includes('موبایل')) {
        return sampleProducts.filter(p => p.image === '📱');
    }
    else if (queryLower.includes('لپ تاپ') || queryLower.includes('نوت بوک')) {
        return sampleProducts.filter(p => p.image === '💻');
    }
    else if (queryLower.includes('هدفون') || queryLower.includes('ایرپاد')) {
        return sampleProducts.filter(p => p.image === '🎧');
    }
    else if (queryLower.includes('تبر') || queryLower.includes('برش چوب')) {
        return sampleProducts.filter(p => p.image === '🪓');
    }
    else {
        // اگر جستجوی عمومی باشد، همه محصولات رو نشون بده
        return sampleProducts;
    }
}

function displayResults(products) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = '';

    if (products.length === 0) {
        resultsGrid.innerHTML = '<p style="text-align: center; color: white; padding: 40px;">محصولی یافت نشد. لطفاً جستجوی دیگری امتحان کنید.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-title">${product.title}</div>
            <div class="product-price">${product.price}</div>
            <div class="product-source">منبع: ${product.source}</div>
            <a href="${product.link}" class="product-link" target="_blank">مشاهده محصول</a>
        `;
        resultsGrid.appendChild(productCard);
    });
}