// DÁN LINK CSV MỚI CỦA CÁI BẢNG 8 CỘT VÀO ĐÂY NHÉ:
const SHEET_LINK = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1286104940&single=true&output=csv';

async function moThongSo(soTran) {
    document.getElementById('modal-thong-so').style.display = 'block';
    const container = document.getElementById('data-bang-diem');
    
    // Giữ lại 8 ô Tiêu đề, xóa ruột cũ
    const headers = container.querySelectorAll('.g-header');
    container.innerHTML = '';
    headers.forEach(h => container.appendChild(h));

    try {
        const response = await fetch(SHEET_LINK);
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Bỏ hàng tiêu đề

        for (let i = 0; i < rows.length; i += 4) {
            if (!rows[i] || rows[i].trim() === '') continue; 
            
            const teamInfo = rows[i].split(',');
            if (teamInfo.length < 5) continue; // Chống lỗi thiếu cột

            // In 5 cột thông tin Đội gộp dòng
            container.innerHTML += `
                <div class="g-cell span-4">${teamInfo[0] || ''}</div>
                <div class="g-cell span-4 text-left team-name-cell">
                    <img src="https://placehold.co/24x24/222/FFF?text=LOGO" alt="logo"> ${teamInfo[1] || ''}
                </div>
                <div class="g-cell span-4">${teamInfo[2] || ''}</div>
                <div class="g-cell span-4">${teamInfo[3] || ''}</div>
                <div class="g-cell span-4 tong-diem-val">${teamInfo[4] || ''}</div>
            `;

            // In 4 dòng người chơi
            for (let j = 0; j < 4; j++) {
                const pRow = rows[i + j];
                if (!pRow) continue;
                const p = pRow.split(',');
                const isLast = (j === 3) ? 'p-row-last' : '';
                
                // Chống lỗi undefined nếu sheet trống
                let ten = p[5] ? p[5].toUpperCase() : '';
                let kill = p[6] ? p[6].trim() : '0';
                let dmg = p[7] ? p[7].trim() : '0';

                container.innerHTML += `
                    <div class="g-cell text-left ${isLast}">${ten}</div>
                    <div class="g-cell ${isLast}">${kill}</div>
                    <div class="g-cell ${isLast}">${dmg}</div>
                `;
            }
        }
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
    }
}

function dongThongSo() {
    document.getElementById('modal-thong-so').style.display = 'none';
}
/* ================= HỆ THỐNG DỮ LIỆU ĐỘI TUYỂN ================= */
const duLieuDoi = {
    "uzi": {
        ten: "UZI",
        mota: "UZI LEGENDS – Tên đầy đủ là UZI LEGENDS. Đội tuyển Free Fire chuyên nghiệp đến từ Việt Nam, tranh tài tại Survival Legacy Cup SS1.",
        logo: "https://placehold.co/120x120/222/FFF?text=UZI+LOGO",
        quocGia: "[VIETNAM]",
        tuyenThu: [
            { ten: "UZI.CAMNHUNG", avatar: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { ten: "UZI.DONTCRY", avatar: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { ten: "UZI.LAOHO", avatar: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { ten: "UZI.NKHANG", avatar: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { ten: "UZI.TV5", avatar: "https://placehold.co/200x250/111/555?text=AVATAR+FF" }
        ]
    },
    "t2": {
        ten: "TEAM 2",
        mota: "TEAM 2 - Đội tuyển bí ẩn đang chờ được hé lộ đội hình chính thức.",
        logo: "https://placehold.co/120x120/222/FFF?text=T2+LOGO",
        quocGia: "[THAILAND]",
        tuyenThu: [
            { ten: "T2.PLAYER1", avatar: "https://placehold.co/200x250/333/888?text=PLAYER+1" },
            { ten: "T2.PLAYER2", avatar: "https://placehold.co/200x250/333/888?text=PLAYER+2" },
            { ten: "T2.PLAYER3", avatar: "https://placehold.co/200x250/333/888?text=PLAYER+3" },
            { ten: "T2.PLAYER4", avatar: "https://placehold.co/200x250/333/888?text=PLAYER+4" }
        ]
    }
    // Bạn có thể copy cụm "t2" ra làm t3, t4... để nhập liệu tiếp cho các đội khác
};

// Hàm xử lý khi click vào Logo Đội
function doiTeam(maDoi, elementClick) {
    // 1. Cập nhật viền vàng cho logo được bấm
    let cacLogo = document.querySelectorAll('.t-icon');
    cacLogo.forEach(el => el.classList.remove('active')); // Xóa sáng các logo cũ
    elementClick.classList.add('active'); // Thắp sáng logo mới

    // 2. Lấy dữ liệu của đội tương ứng
    let thongTin = duLieuDoi[maDoi];
    
    // Nếu đội chưa có dữ liệu thì thoát ra không làm gì cả
    if (!thongTin) return; 

    // 3. Thay đổi Banner
    document.getElementById('logo-chi-tiet').src = thongTin.logo;
    document.getElementById('ten-chi-tiet').innerText = thongTin.ten;
    document.getElementById('mota-chi-tiet').innerText = thongTin.mota;
    <div class="players-grid" id="player-cards-container">
        </div>

    // 4. Vẽ lại danh sách Tuyển thủ
    let khungTuyenThu = document.getElementById('khung-tuyen-thu');
    khungTuyenThu.innerHTML = ''; // Xóa sạch cầu thủ cũ

    thongTin.tuyenThu.forEach(tt => {
        khungTuyenThu.innerHTML += `
            <div class="player-card">
                <div class="p-info-top">
                    <span class="p-name">${tt.ten}</span>
                    <span class="p-tag">${thongTin.quocGia}</span>
                </div>
                <img class="p-avatar" src="${tt.avatar}" alt="Player">
                <div class="btn-xem-them">XEM THÊM <span class="arrow">▶</span></div>
            </div>
        `;
    });
}

// Khi vừa vào web, tự động gọi hiển thị đội UZI đầu tiên
document.addEventListener('DOMContentLoaded', () => {
    let logoUzi = document.querySelector('.t-icon'); // Lấy logo đầu tiên
    if (document.getElementById('khung-tuyen-thu')) {
        doiTeam('uzi', logoUzi);
    }
});
/* ================= HỆ THỐNG XỬ LÝ ĐỔI ĐỘI TUYỂN ================= */

// 1. Kho dữ liệu mẫu cho cả 12 đội (Sẽ thay bằng ảnh/text thật sau)
const teamsDatabase = {
    "uzi": {
        name: "UZI LEGENDS",
        desc: "Đội tuyển Free Fire chuyên nghiệp đến từ Việt Nam, tranh tài tại Survival Legacy Cup SS1. Mục tiêu: Vô địch!",
        logo: "https://placehold.co/120x120/222/FFF?text=UZI+LOGO",
        country: "[VIETNAM]",
        players: [
            { n: "UZI.CAMNHUNG", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UZI.DONTCRY", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UZI.LAOHO", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UZI.NKHANG", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UZI.THVIEN5", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" }
        ]
    },
    "t2": {
        name: "TEAM 2 (THAILAND)",
        desc: "A powerful team representing Thailand in the SLC SS1.",
        logo: "https://placehold.co/120x120/222/FFF?text=T2+LOGO",
        country: "[THAILAND]",
        players: [
            { n: "T2.PLAYER 1", a: "https://placehold.co/200x250/333/777?text=T2+P1" },
            { n: "T2.PLAYER 2", a: "https://placehold.co/200x250/333/777?text=T2+P2" },
            { n: "T2.PLAYER 3", a: "https://placehold.co/200x250/333/777?text=T2+P3" },
            { n: "T2.PLAYER 4", a: "https://placehold.co/200x250/333/777?text=T2+P4" },
            { n: "T2.PLAYER 5", a: "https://placehold.co/200x250/333/777?text=T2+P5" }
        ]
    }
    // Bạn có thể nhân bản cụm "t2" ra làm t3, t4... t12 để nhập liệu tiếp cho các đội khác.
};

// Hàm chính xử lý khi click vào Logo
function switchTeam(teamId) {
    // A. Lấy dữ liệu của đội từ "Kho"
    const data = teamsDatabase[teamId];
    
    // Nếu chưa nhập dữ liệu cho đội này thì thoát ra
    if (!data) {
        console.error("Chưa có dữ liệu cho đội:", teamId);
        return;
    }

    // B. Thay thế nội dung Banner Thông tin
    document.getElementById('info-team-logo').src = data.logo;
    document.getElementById('info-team-name').innerText = data.name;
    document.getElementById('info-team-desc').innerText = data.desc;

    // C. Vẽ lại danh sách Tuyển thủ
    const container = document.getElementById('player-cards-container');
    container.innerHTML = ''; // Xóa sạch 5 cầu thủ của đội cũ

    // Duyệt qua mảng cầu thủ và tạo HTML động đắp vào
    data.players.forEach(player => {
        container.innerHTML += `
            <div class="player-card">
                <div class="p-info-top">
                    <span class="p-name">${player.n}</span>
                    <span class="p-tag">${data.country}</span>
                </div>
                <img class="p-avatar" src="${player.a}" alt="Player Avatar">
                <div class="btn-xem-them">XEM THÊM <span class="arrow">▶</span></div>
            </div>
        `;
    });

    // D. Cập nhật viền vàng cho logo được bấm
    // Xóa active cũ
    const currentActiveLogo = document.querySelector('.t-icon.active');
    if (currentActiveLogo) currentActiveLogo.classList.remove('active');

    // Thêm active vào cái mới (Sử dụng parentNode để tìm đúng div chứa logo)
    // Cách này hơi phức tạp, tốt nhất là sửa onclick trong HTML truyền thêm 'this' vào.
    // Mình sẽ hướng dẫn sửa onclick trong HTML ở Bước 1.
    // Tạm thời bỏ qua bước D này nếu onclick trong HTML chưa sửa.
}
// Tự động tải thông tin đội UZI khi vừa mở trang web Đội Tuyển
window.onload = function() {
    if (document.getElementById('player-cards-container')) {
        switchTeam('uzi');
    }
};

// Mai mốt, để đội UZI tự hiện ra khi vừa load web, bạn thêm dòng này vào script.js:
// switchTeam('uzi');