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