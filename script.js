// ==========================================
// DANH SÁCH LINK QUẢNG CÁO
// ==========================================
var tiktokLinks = [
    "https://vt.tiktok.com/ZS9eQnVNkWqrH-NDwQg/", 
    "https://vt.tiktok.com/ZS9eQnpk1jcTU-0sAGn/", 
    "https://vt.tiktok.com/ZS9eQntSfgCAA-VUA7g/", 
    "https://vt.tiktok.com/ZS9RdMkvcsYJR-5XXqs/",
    "https://vt.tiktok.com/ZS9Lf3hHQM7Wk-pVp8N/",
    "https://vt.tiktok.com/ZS9Lf3BScyb5c-Kq1s0/",
    "https://vt.tiktok.com/ZS9Lf3U8snh4J-21EXd/",
    "https://vt.tiktok.com/ZS9Lf3uFQ7w6M-U4Ard/",
    "https://vt.tiktok.com/ZS9Lf3xpTh8EV-Lxl0X/",
    " https://vt.tiktok.com/ZS9Lf3tAmHaJw-EK57x/",
    " https://vt.tiktok.com/ZS9Lf3WadfB9K-QRTgm/",
    " https://vt.tiktok.com/ZS9Lf3Eu6RDef-MIqI0/",
];

// ==========================================
// BẢO MẬT & CHỐNG F12/XEM MÃ NGUỒN CỰC MẠNH
// ==========================================
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if(e.keyCode == 123) { return false; } 
    if(e.ctrlKey && e.shiftKey && e.keyCode == 73) { return false; } 
    if(e.ctrlKey && e.shiftKey && e.keyCode == 74) { return false; } 
    if(e.ctrlKey && e.keyCode == 85) { return false; } 
    if(e.ctrlKey && e.keyCode == 83) { return false; } 
};

document.addEventListener('copy', function(e) { 
    e.preventDefault(); 
    alert('Không thể sao chép văn bản trên trang web này!');
});

setInterval(function() {
    (function() { return false; }['constructor']('debugger')['call']());
}, 100);

// ==========================================
// 1. GLOBAL LOADING SCRIPT
// ==========================================
function showLoader(durationInMs, callback) {
    let loader = document.getElementById('global-loader-overlay');
    loader.style.display = 'flex';
    setTimeout(function() {
        loader.style.display = 'none';
        if(callback) callback();
    }, durationInMs);
}

// ==========================================
// 2. WELCOME POPUP & INIT SCRIPT
// ==========================================
window.onload = function() {
    document.getElementById('hub-welcome-modal').style.display = 'flex';
    checkWalletState(); 
    loadFavorites(); 
};

function closeHubWelcome() {
    document.getElementById('hub-welcome-modal').style.display = 'none';
    showLoader(1200, null);
}

function showComingSoonModal() {
    showLoader(1000, function() {
        document.getElementById('coming-soon-modal').style.display = 'flex';
    });
}
function closeComingSoonModal() {
    document.getElementById('coming-soon-modal').style.display = 'none';
}

function showDpiUpdateModal() {
    showLoader(600, function() {
        document.getElementById('dpi-update-modal').style.display = 'flex';
    });
}
function proceedToDpiApp() {
    document.getElementById('dpi-update-modal').style.display = 'none';
    openDpiAppWithDelay();
}

// ==========================================
// 3. TÍNH NĂNG TÌM KIẾM HUB
// ==========================================
function toggleSearchBox() {
    let box = document.getElementById('hub-search-container');
    box.style.display = (box.style.display === 'block') ? 'none' : 'block';
    document.getElementById('search-msg').style.display = 'none';
    if(box.style.display === 'block') document.getElementById('hub-search-input').focus();
}

function executeSearch() {
    let val = document.getElementById('hub-search-input').value.toLowerCase().trim();
    let msg = document.getElementById('search-msg');
    
    if(val.includes('chu') || val.includes('nhat') || val.includes('pham')) {
        msg.style.display = 'none';
        openAppDetailWithDelay();
        document.getElementById('hub-search-container').style.display = 'none';
    } else if (val.includes('dpi') || val.includes('kéo') || val.includes('tam')) {
        msg.style.display = 'none';
        showDpiUpdateModal(); 
        document.getElementById('hub-search-container').style.display = 'none';
    } else if (val.includes('file') || val.includes('ff')) {
        msg.style.display = 'none';
        openFileFfAppWithDelay();
        document.getElementById('hub-search-container').style.display = 'none';
    } else if (val.includes('hack') || val.includes('menu')) {
        msg.style.display = 'none';
        openMenuHackAppWithDelay(); 
        document.getElementById('hub-search-container').style.display = 'none';
    } else if (val !== "") {
        msg.style.display = 'block';
    }
}

function handleSearch(e) { if(e.key === 'Enter') executeSearch(); }

// ==========================================
// 4. MENU HUB SIDES BAR
// ==========================================
function toggleHubMenu() {
    var e = document.getElementById("hub-sidebar-menu"), t = document.getElementById("hub-sidebar-overlay");
    if(e.classList.contains("active")) { e.classList.remove("active"); t.classList.remove("active"); } 
    else { e.classList.add("active"); t.classList.add("active"); }
}

function switchHubPage(pageId, btn) {
    showLoader(600, function() {
        document.querySelectorAll(".hub-page-section").forEach(function(e){ e.classList.remove("active") });
        document.getElementById(pageId).classList.add("active");
        document.querySelectorAll(".hub-menu-link").forEach(function(e){ e.classList.remove("active") });
        btn.classList.add("active");
        toggleHubMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if(pageId === 'hub-vi-section') checkWalletState();
    });
    return false;
}

// ==========================================
// 5. LOGIC VÍ ĐIỆN TỬ (WALLET)
// ==========================================
let walletTimerInterval;

function checkWalletState() {
    let currentBalance = parseInt(localStorage.getItem('userWalletBalance')) || 0;
    document.getElementById('wallet-balance-display').innerText = currentBalance.toLocaleString('vi-VN') + ' VNĐ';

    let depositEndTime = localStorage.getItem('depositEndTime');
    if (depositEndTime && parseInt(depositEndTime) > Date.now()) {
        let amount = localStorage.getItem('depositAmount');
        let transId = localStorage.getItem('depositTransId');
        
        document.getElementById('val-amount').innerText = parseInt(amount).toLocaleString('vi-VN') + ' VNĐ';
        document.getElementById('val-transid').innerText = transId;
        
        document.getElementById('copy-amt-btn').setAttribute('onclick', `copyWalletText('${amount}', this)`);
        document.getElementById('copy-trans-btn').setAttribute('onclick', `copyWalletText('${transId}', this)`);

        document.getElementById('deposit-init-area').style.display = 'none';
        document.getElementById('deposit-active-area').style.display = 'block';
        
        startWalletTimer();
    } else {
        cancelDeposit(); 
    }
}

function createDepositCode() {
    let amountInput = document.getElementById('deposit-amount-input').value;
    if (!amountInput || amountInput < 10000) {
        alert("Vui lòng nhập số tiền hợp lệ (Tối thiểu 10.000 VNĐ)");
        return;
    }
    showLoader(1000, function() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let transId = '';
        for (let i = 0; i < 5; i++) transId += chars.charAt(Math.floor(Math.random() * chars.length));

        let endTime = Date.now() + 10 * 60 * 1000;
        localStorage.setItem('depositAmount', amountInput);
        localStorage.setItem('depositTransId', transId);
        localStorage.setItem('depositEndTime', endTime.toString());
        checkWalletState();
    });
}

function startWalletTimer() {
    clearInterval(walletTimerInterval);
    function updateTimer() {
        let endTime = parseInt(localStorage.getItem('depositEndTime'));
        if(!endTime) return;
        let remaining = endTime - Date.now();
        if (remaining <= 0) {
            clearInterval(walletTimerInterval);
            alert("Mã nạp tiền đã hết hạn!");
            cancelDeposit();
            return;
        }
        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        document.getElementById('wallet-timer-display').innerText = minutes + ":" + seconds;
    }
    updateTimer();
    walletTimerInterval = setInterval(updateTimer, 1000);
}

function cancelDeposit() {
    clearInterval(walletTimerInterval);
    localStorage.removeItem('depositAmount');
    localStorage.removeItem('depositTransId');
    localStorage.removeItem('depositEndTime');
    document.getElementById('deposit-amount-input').value = '';
    document.getElementById('deposit-active-area').style.display = 'none';
    document.getElementById('deposit-init-area').style.display = 'block';
}

function confirmPaymentAction() {
    showLoader(2000, function() {
        document.getElementById('fail-payment-modal').style.display = 'flex';
    });
}
function closeFailPaymentModal() { document.getElementById('fail-payment-modal').style.display = 'none'; }

function copyWalletText(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        let originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check" style="color:#2ecc71;"></i>';
        setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
    });
}

// ==========================================
// 6. LOGIC FORM LIÊN HỆ 
// ==========================================
function previewHubFile() {
    var fileInput = document.getElementById('hub-contact-file');
    var uploadText = document.getElementById('hub-upload-text');
    if (fileInput.files && fileInput.files[0]) {
        uploadText.innerText = fileInput.files[0].name;
    } else {
        uploadText.innerText = "Tải lên ảnh minh họa";
    }
}

function submitHubContactForm() {
    var name = document.getElementById('hub-contact-name').value.trim();
    var email = document.getElementById('hub-contact-email').value.trim();
    if(!name || !email) {
        showLoader(500, function(){ document.getElementById('contact-error-modal').style.display = 'flex'; });
        return;
    }
    showLoader(1500, function(){
        document.getElementById('contact-success-modal').style.display = 'flex';
        document.getElementById('hub-contact-name').value = '';
        document.getElementById('hub-contact-email').value = '';
        document.getElementById('hub-contact-desc').value = '';
        document.getElementById('hub-contact-file').value = '';
        document.getElementById('hub-upload-text').innerText = "Tải lên ảnh minh họa";
    });
}

function previewAppFile() {
    var fileInput = document.getElementById('app-contact-file');
    var uploadText = document.getElementById('app-upload-text');
    if (fileInput.files && fileInput.files[0]) {
        uploadText.innerText = fileInput.files[0].name;
    } else {
        uploadText.innerText = "Tải lên ảnh minh họa";
    }
}

function submitAppContactForm() {
    var name = document.getElementById('app-contact-name').value.trim();
    var email = document.getElementById('app-contact-email').value.trim();
    if(!name || !email) {
        showLoader(500, function(){ document.getElementById('contact-error-modal').style.display = 'flex'; });
        return;
    }
    showLoader(1500, function(){
        document.getElementById('contact-success-modal').style.display = 'flex';
        document.getElementById('app-contact-name').value = '';
        document.getElementById('app-contact-email').value = '';
        document.getElementById('app-contact-desc').value = '';
        document.getElementById('app-contact-file').value = '';
        document.getElementById('app-upload-text').innerText = "Tải lên ảnh minh họa";
    });
}

function closeContactModal(id) { document.getElementById(id).style.display = 'none'; }

// ==========================================
// 7. ĐIỀU HƯỚNG CÁC TRANG CHUNG
// ==========================================
function openAppDetailWithDelay() {
    showLoader(1000, function() {
        document.getElementById('hub-view').style.display = 'none';
        document.getElementById('dpi-app-page').style.display = 'none';
        document.getElementById('fileff-app-page').style.display = 'none';
        document.getElementById('menu-hack-app-page').style.display = 'none';
        document.getElementById('app-detail-page').style.display = 'block';
        window.scrollTo(0, 0);
    });
}

function goBackToHomeWithDelay() {
    showLoader(800, function() {
        document.getElementById('app-detail-page').style.display = 'none';
        document.getElementById('hub-view').style.display = 'block';
        window.scrollTo(0, 0);
    });
}

function openDpiAppWithDelay() {
    showLoader(1000, function() {
        document.getElementById('hub-view').style.display = 'none';
        document.getElementById('app-detail-page').style.display = 'none';
        document.getElementById('fileff-app-page').style.display = 'none';
        document.getElementById('menu-hack-app-page').style.display = 'none';
        document.getElementById('dpi-app-page').style.display = 'block';
        window.scrollTo(0, 0);
    });
}

function goBackToHomeFromDpiWithDelay() {
    showLoader(800, function() {
        document.getElementById('dpi-app-page').style.display = 'none';
        document.getElementById('hub-view').style.display = 'block';
        window.scrollTo(0, 0);
        document.getElementById('dpi-device-input').value = '';
        document.getElementById('dpi-terminal-content').innerHTML = `> Hệ thống đang chờ lệnh...<br>> Chọn OS và nhập tên máy để bắt đầu.<br><span class="cursor-blink">_</span>`;
    });
}

function openFileFfAppWithDelay() {
    showLoader(1000, function() {
        document.getElementById('hub-view').style.display = 'none';
        document.getElementById('app-detail-page').style.display = 'none';
        document.getElementById('dpi-app-page').style.display = 'none';
        document.getElementById('menu-hack-app-page').style.display = 'none';
        document.getElementById('fileff-app-page').style.display = 'block';
        window.scrollTo(0, 0);
    });
}

function goBackToHomeFromFileFfWithDelay() {
    showLoader(800, function() {
        document.getElementById('fileff-app-page').style.display = 'none';
        document.getElementById('hub-view').style.display = 'block';
        window.scrollTo(0, 0);
    });
}

// ==========================================
// 8. LOGIC APP LẤY DPI CHUYÊN NGHIỆP 
// ==========================================
let selectedOS = 'ios';
function selectOS(os) {
    selectedOS = os;
    document.getElementById('btn-os-ios').classList.remove('active');
    document.getElementById('btn-os-adr').classList.remove('active');
    document.getElementById('btn-os-' + os).classList.add('active');
}

const dpiDatabaseIOS = [
    { keys: ['iphone 6', 'iphone 6 plus'], stats: [200, 200, 190, 180, 90, 200], name: "iPhone 6 / 6 Plus" },
    { keys: ['iphone 6s', 'iphone 6s plus'], stats: [200, 195, 185, 175, 85, 200], name: "iPhone 6s / 6s Plus" },
    { keys: ['iphone 7', 'iphone 7 plus'], stats: [200, 195, 185, 175, 85, 200], name: "iPhone 7 / 7 Plus" },
    { keys: ['iphone 8', 'iphone 8 plus'], stats: [195, 190, 180, 170, 80, 195], name: "iPhone 8 / 8 Plus" },
    { keys: ['iphone x', 'iphone xr'], stats: [190, 185, 175, 165, 75, 190], name: "iPhone X / XR" },
    { keys: ['iphone xs', 'iphone xs max'], stats: [185, 180, 170, 160, 70, 185], name: "iPhone XS / XS Max" },
    { keys: ['iphone 11 pro', 'iphone 11 pro max', '11 pro max'], stats: [175, 170, 160, 150, 65, 175], name: "iPhone 11 Pro / 11 Pro Max" },
    { keys: ['iphone 11', 'ip 11'], stats: [180, 175, 165, 155, 70, 180], name: "iPhone 11" },
    { keys: ['se 2020', 'se 2022', 'iphone se'], stats: [195, 190, 180, 170, 80, 195], name: "iPhone SE 2020 / SE 2022" },
    { keys: ['iphone 12 pro', 'iphone 12 pro max', '12 pro max'], stats: [170, 165, 155, 145, 60, 170], name: "iPhone 12 Pro / 12 Pro Max" },
    { keys: ['iphone 12', 'iphone 12 mini', 'ip 12'], stats: [175, 170, 160, 150, 65, 175], name: "iPhone 12 / 12 Mini" },
    { keys: ['iphone 13 pro', 'iphone 13 pro max', '13 pro max'], stats: [160, 155, 145, 135, 55, 165], name: "iPhone 13 Pro / 13 Pro Max" },
    { keys: ['iphone 13', 'iphone 13 mini', 'ip 13'], stats: [170, 165, 155, 145, 60, 170], name: "iPhone 13 / 13 Mini" },
    { keys: ['iphone 14 pro', 'iphone 14 pro max', '14 pro max'], stats: [155, 150, 140, 130, 50, 160], name: "iPhone 14 Pro / 14 Pro Max" },
    { keys: ['iphone 14', 'iphone 14 plus', 'ip 14'], stats: [165, 160, 150, 140, 60, 165], name: "iPhone 14 / 14 Plus" },
    { keys: ['iphone 15 pro', 'iphone 15 pro max', '15 pro max'], stats: [150, 145, 135, 125, 50, 155], name: "iPhone 15 Pro / 15 Pro Max" },
    { keys: ['iphone 15', 'iphone 15 plus', 'ip 15'], stats: [165, 160, 150, 140, 60, 165], name: "iPhone 15 / 15 Plus" },
    { keys: ['iphone 16 pro', 'iphone 16 pro max', '16 pro max'], stats: [145, 140, 130, 120, 45, 150], name: "iPhone 16 Pro / 16 Pro Max" },
    { keys: ['iphone 16', 'iphone 16 plus', 'ip 16'], stats: [160, 155, 145, 135, 55, 160], name: "iPhone 16 / 16 Plus" },
    { keys: ['ipad gen 5', 'ipad 2017'], stats: [155, 145, 135, 125, 65, 155], name: "iPad Gen 5 (2017)" }
];

const dpiDatabaseAndroid = [
    { keys: ['samsung j', 'j2', 'j3', 'j5', 'j7'], stats: [200, 200, 190, 180, 90, 200], name: "Samsung Galaxy J Series" },
    { keys: ['samsung a10', 'a20', 'a30', 'a50'], stats: [195, 190, 180, 170, 80, 195], name: "Samsung Galaxy A (Đời cũ)" },
    { keys: ['samsung a52', 'a53', 'a73'], stats: [185, 180, 170, 160, 70, 185], name: "Samsung Galaxy A (Đời mới)" },
    { keys: ['s20'], stats: [165, 160, 150, 140, 55, 170], name: "Samsung Galaxy S20 Series" },
    { keys: ['s21'], stats: [160, 155, 145, 135, 50, 165], name: "Samsung Galaxy S21 Series" },
    { keys: ['s22'], stats: [155, 150, 140, 130, 50, 160], name: "Samsung Galaxy S22 Series" },
    { keys: ['s23'], stats: [150, 145, 135, 125, 45, 155], name: "Samsung Galaxy S23 Series" },
    { keys: ['s24'], stats: [145, 140, 130, 120, 45, 150], name: "Samsung Galaxy S24 Series" },
    { keys: ['note 20'], stats: [165, 160, 150, 140, 55, 170], name: "Samsung Galaxy Note 20 / Ultra" },
    { keys: ['oppo a9', 'a31', 'a52', 'a53'], stats: [190, 185, 175, 165, 75, 190], name: "OPPO A (Tầm trung)" },
    { keys: ['reno 7', 'reno 8'], stats: [175, 170, 160, 150, 65, 175], name: "OPPO Reno Series" },
    { keys: ['redmi 9a', '10a'], stats: [195, 190, 180, 170, 85, 195], name: "Redmi Phổ Thông" },
    { keys: ['poco x3', 'poco x4', 'poco f4', 'poco f5'], stats: [160, 155, 145, 135, 55, 160], name: "POCO Series" },
    { keys: ['vivo y21', 'y22', 'y33'], stats: [190, 185, 175, 165, 75, 190], name: "Vivo Y Series" },
    { keys: ['realme 10', 'realme 11'], stats: [185, 180, 170, 160, 70, 185], name: "Realme Series" }
];

function searchDPI() {
    const input = document.getElementById('dpi-device-input').value.toLowerCase().trim();
    const content = document.getElementById('dpi-terminal-content');
    
    if(!input) {
        content.innerHTML = `<span style="color:#ef4444">> Lỗi: Vui lòng nhập tên thiết bị để tìm kiếm!</span><br><br><span class="cursor-blink">_</span>`;
        return;
    }

    var adLink = tiktokLinks[Math.floor(Math.random() * tiktokLinks.length)];
    window.open(adLink, "_blank");

    content.innerHTML = `> Đang chuyển hướng đến nhà tài trợ...<br>> Cảm ơn bạn đã xem quảng cáo ủng hộ Server!<br>> Đang trích xuất dữ liệu độ nhạy... <i class="fas fa-spinner fa-spin" style="color:#10b981;"></i>`;

    setTimeout(() => {
        let matchedDevice = null;
        let targetDB = selectedOS === 'ios' ? dpiDatabaseIOS : dpiDatabaseAndroid;
        
        let sortedDB = [...targetDB].sort((a,b) => b.keys[0].length - a.keys[0].length);
        
        for(let device of sortedDB) {
            for(let key of device.keys) {
                if(input.includes(key)) {
                    matchedDevice = device;
                    break;
                }
            }
            if(matchedDevice) break;
        }

        if(matchedDevice) {
            const s = matchedDevice.stats;
            content.innerHTML = `
                <div class="dpi-hud-title">THÔNG SỐ ĐỘ NHẠY TỐI ƯU</div>
                <div style="text-align:center; color:#cbd5e1; margin-bottom:15px;">Thiết bị nhận diện: <strong style="color:#fff;">${matchedDevice.name}</strong></div>
                <div class="stat-item" style="animation-delay: 0.1s;"><div class="stat-label"><i class="fas fa-eye"></i> Nhìn xung quanh</div><div class="stat-value">${s[0]}</div></div>
                <div class="stat-item" style="animation-delay: 0.3s;"><div class="stat-label"><i class="fas fa-crosshairs"></i> Ống ngắm hồng tâm</div><div class="stat-value">${s[1]}</div></div>
                <div class="stat-item" style="animation-delay: 0.5s;"><div class="stat-label"><i class="fas fa-search-plus"></i> Ống ngắm 2x</div><div class="stat-value">${s[2]}</div></div>
                <div class="stat-item" style="animation-delay: 0.7s;"><div class="stat-label"><i class="fas fa-search-plus"></i> Ống ngắm 4x</div><div class="stat-value">${s[3]}</div></div>
                <div class="stat-item" style="animation-delay: 0.9s;"><div class="stat-label"><i class="fas fa-sniper"></i> Ống ngắm súng ngắm (AWM)</div><div class="stat-value">${s[4]}</div></div>
                <div class="stat-item" style="animation-delay: 1.1s;"><div class="stat-label"><i class="fas fa-camera"></i> Nút camera tự do</div><div class="stat-value">${s[5]}</div></div>
                <div class="dpi-advisory" style="display:block;"><i class="fas fa-exclamation-triangle"></i> Chúng tôi khuyên bạn nên sử dụng độ nhạy cao để có trải nghiệm tốt hơn nhá!</div>
            `;
        } else {
            content.innerHTML = `
                > Cấu hình máy: <span style="color:#fff; font-weight:bold;">${input.toUpperCase()}</span><br>
                <span style="color:#ef4444;">> Lỗi: Không tìm thấy dữ liệu chuẩn xác cho tên máy này trong hệ thống. Vui lòng nhập rõ hơn (VD: iPhone 14 Pro Max, S23 Ultra...).</span><br><br>
                >_ <span class="cursor-blink">_</span>
            `;
        }
    }, 2500); 
}

// ==========================================
// 9. LOGIC CHUYÊN TRANG FILE FF (TABS, DOWNLOAD, VIP & FAVORITES)
// ==========================================
function toggleFavorite(btn) {
    let fileId = btn.getAttribute('data-id');
    let favorites = JSON.parse(localStorage.getItem('ff_favorites')) || [];
    
    if (favorites.includes(fileId)) {
        favorites = favorites.filter(id => id !== fileId);
        btn.classList.remove('active');
        btn.innerHTML = '<i class="far fa-heart"></i>'; 
    } else {
        favorites.push(fileId);
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-heart"></i>'; 
    }
    
    localStorage.setItem('ff_favorites', JSON.stringify(favorites));
}

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('ff_favorites')) || [];
    let favBtns = document.querySelectorAll('.ff-btn-fav');
    
    favBtns.forEach(btn => {
        let fileId = btn.getAttribute('data-id');
        if (favorites.includes(fileId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        }
    });
}

function switchFfMainTab(tabId, btn) {
    document.querySelectorAll('#fileff-app-page > .ff-content-section').forEach(el => { 
        el.style.display = 'none'; 
        el.classList.remove('active'); 
    });
    document.querySelectorAll('.ff-main-tab-btn').forEach(el => {
        el.classList.remove('active');
        el.style.background = '#f0f4f8';
        el.style.color = '#555';
    });
    
    document.getElementById(tabId).style.display = 'block';
    setTimeout(() => document.getElementById(tabId).classList.add('active'), 10);
    
    btn.classList.add('active');
    btn.style.background = '#2a5298';
    btn.style.color = '#fff';
}

function switchFfSubTab(tabId, btn) {
    document.querySelectorAll('.ff-file-list-section').forEach(el => { 
        el.style.display = 'none'; 
        el.classList.remove('active'); 
    });
    document.querySelectorAll('.ff-sub-tab-btn').forEach(el => {
        el.classList.remove('active');
        el.style.background = 'transparent';
        el.style.borderColor = '#ddd';
        el.style.color = '#666';
    });
    
    document.getElementById(tabId).style.display = 'block';
    setTimeout(() => document.getElementById(tabId).classList.add('active'), 10);
    
    btn.classList.add('active');
    btn.style.borderColor = '#2ecc71';
    btn.style.color = '#2ecc71';
    btn.style.background = 'rgba(46, 204, 113, 0.1)';
}

function switchFfVipSubTab(tabId, btn) {
    document.querySelectorAll('.ff-vip-list-section').forEach(el => { 
        el.style.display = 'none'; 
        el.classList.remove('active'); 
    });
    document.querySelectorAll('.ff-vip-sub-tab-btn').forEach(el => {
        el.classList.remove('active');
        el.style.background = 'transparent';
        el.style.borderColor = '#ddd';
        el.style.color = '#666';
    });
    
    document.getElementById(tabId).style.display = 'block';
    setTimeout(() => document.getElementById(tabId).classList.add('active'), 10);
    
    btn.classList.add('active');
    btn.style.borderColor = '#2980b9';
    btn.style.color = '#2980b9';
    btn.style.background = 'rgba(41, 128, 185, 0.1)';
}

let ffDownloadTimer;

function startFileFfDownload() {
    var adLink = tiktokLinks[Math.floor(Math.random() * tiktokLinks.length)];
    window.open(adLink, "_blank");

    const loadingModal = document.getElementById('ff-loading-modal');
    const resultModal = document.getElementById('ff-result-modal');
    
    const loadingDesc = document.querySelector('.ff-loading-desc');
    if(loadingDesc) {
        loadingDesc.innerHTML = "Hệ thống đang xác thực quảng cáo tài trợ và trích xuất tệp.<br><strong style='color:#e74c3c;'>Cảm ơn sự chờ đợi của bạn!</strong>";
    }
    
    let waitTime = Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000; 
    
    loadingModal.style.display = 'flex';
    
    clearTimeout(ffDownloadTimer);
    ffDownloadTimer = setTimeout(() => {
        loadingModal.style.display = 'none';
        resultModal.style.display = 'flex';
        if(loadingDesc) loadingDesc.innerHTML = "Hệ thống đang trích xuất tệp trên nền tảng, vui lòng không thoát trang.";
    }, waitTime);
}

function triggerErrorEffect(e) {
    if(e) e.preventDefault();
    const btn = document.getElementById('ff-fake-download-btn');
    
    btn.classList.remove('btn-error-shake');
    void btn.offsetWidth; 
    btn.classList.add('btn-error-shake');
    
    btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Lỗi: Không thể lấy file!';
    
    setTimeout(() => {
        btn.innerHTML = 'BẤM VÀO ĐÂY ĐỂ LẤY';
        btn.classList.remove('btn-error-shake');
    }, 2500); 
}

function purchaseVipFile(price) {
    showLoader(800, function() {
        let currentBalance = parseInt(localStorage.getItem('userWalletBalance')) || 0;
        
        if (currentBalance >= price) {
            currentBalance -= price;
            localStorage.setItem('userWalletBalance', currentBalance.toString());
            document.getElementById('wallet-balance-display').innerText = currentBalance.toLocaleString('vi-VN') + ' VNĐ';
            
            document.getElementById('vip-buy-success-modal').style.display = 'flex';
        } else {
            document.getElementById('vip-buy-error-modal').style.display = 'flex';
        }
    });
}

function goToWalletFromVip() {
    closeFfModal('vip-buy-error-modal');
    showLoader(800, function() {
        document.getElementById('fileff-app-page').style.display = 'none';
        document.getElementById('hub-view').style.display = 'block';
        window.scrollTo(0, 0);
        
        let walletBtn = document.querySelector('.hub-menu-link[onclick*="hub-vi-section"]');
        switchHubPage('hub-vi-section', walletBtn);
    });
}

function closeFfModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    if(modalId === 'ff-loading-modal') {
        clearTimeout(ffDownloadTimer); 
    }
    let fakeBtn = document.getElementById('ff-fake-download-btn');
    if(fakeBtn) {
        fakeBtn.classList.remove('btn-error-shake');
        fakeBtn.innerHTML = 'BẤM VÀO ĐÂY ĐỂ LẤY';
    }
}

// ==========================================
// 10. CHỨC NĂNG APP CŨ (chunhatphamff)
// ==========================================
function handleOldAppDownloadClick(e) {
    if(e) e.preventDefault();
    window.open(tiktokLinks[Math.floor(Math.random() * tiktokLinks.length)], "_blank");
    var t = document.getElementById("download-modal"), n = document.getElementById("loading-spinner"), o = document.getElementById("download-error-msg"), l = document.getElementById("download-file-error-msg");
    if(l) l.style.display = "none";
    t.style.display = "flex"; n.style.display = "block"; o.style.display = "none";
    var d = Math.floor(22e3 * Math.random()) + 53e3; 
    setTimeout(function(){ n.style.display = "none"; o.style.display = "block" }, d);
}

function handleOldFileDownloadClick(e) {
    if(e) e.preventDefault();
    window.open(tiktokLinks[Math.floor(Math.random() * tiktokLinks.length)], "_blank");
    var t = document.getElementById("download-modal"), n = document.getElementById("loading-spinner"), o = document.getElementById("download-error-msg"), l = document.getElementById("download-file-error-msg");
    if(o) o.style.display = "none";
    t.style.display = "flex"; n.style.display = "block"; l.style.display = "none";
    var d = Math.floor(5e3 * Math.random()) + 5e3; 
    setTimeout(function(){ n.style.display = "none"; l.style.display = "block" }, d);
}

function closeDownloadModal() { document.getElementById("download-modal").style.display = "none" }
function closeWelcomeAppModal() { document.getElementById("welcome-modal").style.display = "none" }
function closePopup() { document.getElementById("popup-ad").classList.remove("show"); document.getElementById("popup-ad").style.display = "none"; }

function toggleMenu() {
    var e = document.getElementById("sidebar-menu"), t = document.getElementById("sidebar-overlay");
    e.classList.contains("active") ? (e.classList.remove("active"), t.classList.remove("active")) : (e.classList.add("active"), t.classList.add("active"));
}

function switchPage(e, t) {
    document.querySelectorAll(".page-section").forEach(function(e){ e.classList.remove("active") });
    document.getElementById(e).classList.add("active");
    document.querySelectorAll(".menu-link").forEach(function(e){ e.classList.remove("active") });
    t.classList.add("active");
    toggleMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchPageWithDelay(pageId, btn) {
    showLoader(500, function() { switchPage(pageId, btn); });
}

function openTab(e, t) {
    document.querySelectorAll(".tab-content").forEach(function(e){ e.classList.remove("active") });
    document.querySelectorAll(".tab-btn").forEach(function(e){ e.classList.remove("active") });
    document.getElementById(e).classList.add("active");
    t.target.classList.add("active");
    window.scrollTo({ top: 150, behavior: "smooth" });
}

function openTabWithDelay(tabId, event) {
    showLoader(400, function() { openTab(tabId, event); });
}

function openReserveModal(e) {
    if(e) e.preventDefault();
    var t = document.getElementById("fullscreen-reserve-modal"), n = document.getElementById("reserve-loading"), o = document.getElementById("reserve-content");
    t.style.display = "block"; n.style.display = "flex"; o.style.display = "none";
    var l = Math.floor(5e3 * Math.random()) + 5e3;
    setTimeout(function(){
        n.style.display = "none"; o.style.display = "block";
        if(localStorage.getItem("deviceReserved") === "true"){
            document.getElementById("btn-reserve").style.display = "none";
            document.getElementById("reserve-status").style.display = "block";
        }
    }, l);
}

function closeReserveModal() { document.getElementById("fullscreen-reserve-modal").style.display = "none" }

function reserveDeviceWithDelay() {
    showLoader(1000, function() {
        localStorage.setItem("deviceReserved", "true");
        document.getElementById("btn-reserve").style.display = "none";
        document.getElementById("reserve-status").style.display = "block";
    });
}

// ==========================================
// 11. LOGIC TRANG MENU HACK FF (CÓ POPUP BETA & DOWNLOAD MODAL MỚI)
// ==========================================

// 1. Khi bấm vào App trên Hub -> Hiện Loading -> Bật Popup Beta
function openMenuHackAppWithDelay() {
    showLoader(1000, function() {
        document.getElementById('hack-beta-modal').style.display = 'flex';
    });
}

// 2. Khi bấm "Đã hiểu" ở Popup Beta -> Vào trang Menu Hack
function proceedToMenuHackApp() {
    document.getElementById('hack-beta-modal').style.display = 'none';
    showLoader(800, function() {
        // Tắt các trang hiện tại
        document.getElementById('hub-view').style.display = 'none';
        document.getElementById('app-detail-page').style.display = 'none';
        document.getElementById('dpi-app-page').style.display = 'none';
        document.getElementById('fileff-app-page').style.display = 'none';
        
        // Bật trang Menu Hack
        document.getElementById('menu-hack-app-page').style.display = 'block';
        window.scrollTo(0, 0);
    });
}

// 3. Quay lại trang chủ Hub từ Menu Hack
function goBackToHomeFromMenuHackWithDelay() {
    showLoader(800, function() {
        document.getElementById('menu-hack-app-page').style.display = 'none';
        document.getElementById('hub-view').style.display = 'block';
        window.scrollTo(0, 0);
    });
}

// 4. Logic chuyển Tab mượt mà trong Menu Hack
function openHackTab(tabId, event) {
    let page = document.getElementById('menu-hack-app-page');
    page.querySelectorAll(".tab-content").forEach(function(el) { el.classList.remove("active"); });
    page.querySelectorAll(".tab-btn").forEach(function(el) { el.classList.remove("active"); });
    
    document.getElementById(tabId).classList.add("active");
    event.target.classList.add("active");
    window.scrollTo({ top: 150, behavior: "smooth" });
}

function openHackTabWithDelay(tabId, event) {
    showLoader(400, function() { openHackTab(tabId, event); });
}

// ==========================================
// 12. LOGIC MODAL TẢI RIÊNG CHO MENU HACK FF
// ==========================================

function handleHackAppDownloadClick(e) {
    if(e) e.preventDefault();
    // Bật ngầm link quảng cáo
    window.open(tiktokLinks[Math.floor(Math.random() * tiktokLinks.length)], "_blank");
    
    var modal = document.getElementById("hack-download-modal");
    var spinner = document.getElementById("hack-loading-spinner");
    var successMsg = document.getElementById("hack-download-error-msg");
    
    modal.style.display = "flex"; 
    spinner.style.display = "block"; 
    successMsg.style.display = "none";
    
    // Random thời gian chờ 53 - 75s
    var delay = Math.floor(22e3 * Math.random()) + 53e3; 
    setTimeout(function(){ 
        spinner.style.display = "none"; 
        successMsg.style.display = "block"; 
    }, delay);
}

function closeHackDownloadModal() { 
    document.getElementById("hack-download-modal").style.display = "none"; 
}

function openHackReserveModal(e) {
    if(e) e.preventDefault();
    var overlay = document.getElementById("hack-reserve-modal");
    var loading = document.getElementById("hack-reserve-loading");
    var content = document.getElementById("hack-reserve-content");
    
    overlay.style.display = "block"; 
    loading.style.display = "flex"; 
    content.style.display = "none";
    
    // Chờ 5 - 10s tải ảo
    var delay = Math.floor(5e3 * Math.random()) + 5e3;
    setTimeout(function(){
        loading.style.display = "none"; 
        content.style.display = "block";
        
        // Kiểm tra xem đã đặt chỗ chưa
        if(localStorage.getItem("hackDeviceReserved") === "true"){
            document.getElementById("btn-hack-reserve").style.display = "none";
            document.getElementById("hack-reserve-status").style.display = "block";
        }
    }, delay);
}

function closeHackReserveModal() { 
    document.getElementById("hack-reserve-modal").style.display = "none"; 
}

function reserveHackDeviceWithDelay() {
    showLoader(1000, function() {
        localStorage.setItem("hackDeviceReserved", "true");
        document.getElementById("btn-hack-reserve").style.display = "none";
        document.getElementById("hack-reserve-status").style.display = "block";
    });
}
