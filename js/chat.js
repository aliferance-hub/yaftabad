// Chat Functions

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;

    addUserMessage(message);
    input.value = '';
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        const aiResponse = processUserMessage(message);
        addAIMessage(aiResponse);
    }, 1500);
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">${message}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAIMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">${message}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function processUserMessage(message) {
    conversationHistory.push({type: 'user', message: message});
    const messageLower = message.toLowerCase();
    
    // تشخیص نیاز کاربر
    if (messageLower.includes('برش چوب') || messageLower.includes('چوب بر') || messageLower.includes('درخت بر')) {
        return `فهمیدم! شما برای برش چوب ابزار نیاز دارید. چند سوال دارم تا بهترین گزینه رو پیدا کنیم:

📏 **اندازه چوب:** چوب‌های کوچک، متوسط یا درختان بزرگ؟
💰 **بودجه:** تقریباً چقدر می‌خواید خرج کنید؟
🏠 **محل استفاده:** خانه، باغ یا کارگاه؟

بر اساس نیاز شما، این ابزارها مناسب هستند:
• **تبر** - برای چوب‌های متوسط و کوچک
• **اره دستی** - برای برش‌های دقیق
• **اره برقی** - برای کارهای سنگین
• **اره زنجیری** - برای درختان بزرگ`;
    }
    
    else if (messageLower.includes('گوشی') || messageLower.includes('موبایل')) {
        return `گوشی می‌خواید! عالیه 📱

چند سوال برای پیدا کردن بهترین گزینه:
💰 **بودجه:** چقدر می‌خواید خرج کنید؟
📸 **استفاده:** عکاسی، بازی، کار اداری یا استفاده عمومی؟
🏷️ **برند:** ترجیح خاصی دارید؟ (سامسونگ، اپل، شیائومی...)

بگید تا بهترین گزینه‌ها رو پیدا کنم!`;
    }
    
    else if (messageLower.includes('لپ تاپ') || messageLower.includes('نوت بوک')) {
        return `لپ تاپ نیاز دارید! 💻

بفرمایید این موارد رو مشخص کنید:
💰 **بودجه:** چه محدوده قیمتی؟
🎯 **کاربری:** گیمینگ، کار اداری، طراحی یا تحصیل؟
📏 **اندازه:** کوچک و قابل حمل یا بزرگ و قدرتمند؟
⚡ **مشخصات:** پردازنده قوی، رم زیاد، کارت گرافیک نیاز دارید؟`;
    }
    
    else if (messageLower.includes('ارزان') || messageLower.includes('کم قیمت')) {
        return `حتماً! گزینه‌های اقتصادی پیدا می‌کنم 💰

محصول مورد نظرتون چیه؟ تا بهترین گزینه‌های ارزان رو معرفی کنم.
همچنین بگید:
• حداکثر بودجه چقدره؟
• کیفیت مهمه یا فقط قیمت؟
• برند خاصی مد نظرتونه؟`;
    }
    
    else if (messageLower.includes('بهترین') || messageLower.includes('باکیفیت')) {
        return `دنبال بهترین کیفیت هستید! عالیه 👌

چه محصولی رو می‌خواید؟ تا بهترین برندها و مدل‌های باکیفیت رو معرفی کنم.
• بودجه‌تون چقدره؟
• چه ویژگی‌هایی براتون مهمه؟
• گارانتی و خدمات پس از فروش مهمه؟`;
    }
    
    else if (messageLower.includes('هدفون') || messageLower.includes('ایرپاد')) {
        return `هدفون می‌خواید! 🎧

چند سوال:
💰 **بودجه:** چقدر می‌خواید خرج کنید؟
🎵 **نوع:** بی‌سیم، سیمی یا گیمینگ؟
🔇 **ویژگی:** نویز کنسلینگ مهمه؟
🏷️ **برند:** سونی، بوز، JBL یا اپل؟`;
    }
    
    else if (messageLower.includes('ساعت') || messageLower.includes('اسمارت واچ')) {
        return `ساعت هوشمند! ⌚

بگید:
💰 **بودجه:** چه محدوده قیمتی؟
📱 **سازگاری:** با اندروید یا آیفون؟
🏃 **کاربری:** ورزشی، سلامتی یا عمومی؟
🏷️ **برند:** اپل واچ، سامسونگ یا شیائومی؟`;
    }
    
    else {
        return `سلام! متوجه نشدم دقیقاً چی نیاز دارید 🤔

می‌تونید واضح‌تر بگید؟ مثلاً:
• "یه چیزی برای برش چوب میخوام"
• "گوشی ارزان نیاز دارم"
• "لپ تاپ گیمینگ می‌خوام"
• "هدفون بی‌سیم میخوام"

یا هر چیز دیگه‌ای که نیاز دارید رو بگید تا کمکتون کنم! 😊`;
    }
}