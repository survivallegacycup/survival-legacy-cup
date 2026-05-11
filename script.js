const SHEET_LINK = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?output=csv';

async function moThongSo(soTran) {
    document.getElementById('modal-thong-so').style.display = 'block';
    const container = document.getElementById('data-bang-diem');
    
    const headers = container.querySelectorAll('.g-header');
    container.innerHTML = '';
    headers.forEach(h => container.appendChild(h));

    try {
        const response = await fetch(SHEET_LINK);
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Bỏ hàng tiêu đề

        const tranData = rows.map(row => row.split(','));

        for (let i = 0; i < tranData.length; i += 4) {
            const teamInfo = tranData[i]; 

            // Đã cập nhật lại số thứ tự cột do xóa cột TRẬN
            container.innerHTML += `
                <div class="g-cell span-4">${teamInfo[0]}</div>
                <div class="g-cell span-4 text-left team-name-cell">
                    <img src="https://placehold.co/24x24/222/FFF?text=LOGO" alt="logo"> ${teamInfo[1]}
                </div>
                <div class="g-cell span-4">${teamInfo[2]}</div>
                <div class="g-cell span-4">${teamInfo[3]}</div>
                <div class="g-cell span-4 tong-diem-val">${teamInfo[4]}</div>
            `;

            for (let j = 0; j < 4; j++) {
                const p = tranData[i + j];
                if(p && p.length > 5) {
                    const isLast = (j === 3) ? 'p-row-last' : '';
                    container.innerHTML += `
                        <div class="g-cell text-left ${isLast}">${p[5].toUpperCase()}</div>
                        <div class="g-cell ${isLast}">${p[6]}</div>
                        <div class="g-cell ${isLast}">${p[7]}</div>
                    `;
                }
            }
        }
    } catch (error) {
        console.error("Lỗi dữ liệu:", error);
    }
}

function dongThongSo() {
    document.getElementById('modal-thong-so').style.display = 'none';
}
// Chạy hàm khi mở web
window.onload = capNhatBangDiem;