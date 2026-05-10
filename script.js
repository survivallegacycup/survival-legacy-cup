// 1. Dán đường link CSV bạn vừa copy ở Bước 2 vào đây
const URL_GOOGLE_SHEET = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?output=csv';

async function capNhatBangDiem() {
    try {
        const response = await fetch(URL_GOOGLE_SHEET);
        const data = await response.text();
        
        // Tách các hàng dữ liệu
        const rows = data.split('\n').slice(1); 
        const matchContainer = document.querySelector('.match-list');
        matchContainer.innerHTML = ''; // Làm trống danh sách trước khi nạp mới

        rows.forEach(row => {
            const cols = row.split(',');
            if (cols.length >= 4) {
                const tenDoi = cols[0].trim();
                const soKill = parseInt(cols[1]) || 0;
                const thuHang = parseInt(cols[2]) || 0;
                const giaiDoan = cols[3].trim();

                let diemKill = 0;
                let diemHang = 0;

                // TÍNH ĐIỂM THEO LUẬT BTC
                if (giaiDoan === "VongBang") {
                    diemKill = soKill * 1;
                    if (thuHang === 1) diemHang = 3;
                    else if (thuHang === 2) diemHang = 2;
                    else if (thuHang === 3) diemHang = 1;
                } 
                else if (giaiDoan === "BanKet") {
                    diemKill = soKill * 2;
                    if (thuHang === 1) diemHang = 8;
                    else if (thuHang === 2) diemHang = 4;
                    else if (thuHang === 3) diemHang = 2;
                } 
                else if (giaiDoan === "ChungKet") {
                    diemKill = soKill * 3;
                    if (thuHang === 1) diemHang = 12;
                    else if (thuHang === 2) diemHang = 6;
                    else if (thuHang === 3) diemHang = 3;
                }

                const tongDiem = diemKill + diemHang;

                // Đổ dữ liệu ra HTML theo mẫu Garena
                const tongDiem = diemKill + diemHang;

                // MÃ HTML MỚI ĐƯỢC CHỈNH LẠI ĐỂ KHỚP VỚI GARENA
                const matchHtml = `
                    <div class="match-item">
                        <div class="col">--:--</div> <div class="col">${giaiDoan}</div> <div class="col" style="color: #888;">ĐÃ DIỄN RA</div> <div class="col team-booyah">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="Logo">
                            ${tenDoi} </div>
                        
                        <div class="col">
                            <button class="btn-stats" onclick="alert('Tổng điểm: ${tongDiem} | Kill: ${soKill} | Hạng: ${thuHang}')">XEM THÔNG SỐ</button>
                        </div>
                    </div>
                `;
                matchContainer.insertAdjacentHTML('beforeend', matchHtml);
            }
        });
    } catch (error) {
        console.error("Lỗi kết nối dữ liệu:", error);
    }
}

// Chạy hàm khi mở web
window.onload = capNhatBangDiem;