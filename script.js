/* ================= PHẦN 1: BẢNG THÔNG SỐ TRẬN ĐẤU (TRANG LỊCH THI ĐẤU) ================= */
// NHỚ DÁN LẠI LINK CSV GOOGLE SHEETS VÀO ĐÂY NHÉ:
const SHEET_LINK = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1286104940&single=true&output=csv';

async function moThongSo(soTran) {
    let modal = document.getElementById('modal-thong-so');
    let container = document.getElementById('data-bang-diem');
    
    // Nếu đang ở trang Đội Tuyển (không có bảng điểm) thì bỏ qua lệnh này để không bị lỗi
    if(!modal || !container) return; 

    modal.style.display = 'block';
    const headers = container.querySelectorAll('.g-header');
    container.innerHTML = '';
    headers.forEach(h => container.appendChild(h));

    try {
        const response = await fetch(SHEET_LINK);
        const data = await response.text();
        const rows = data.split('\n').slice(1);

        for (let i = 0; i < rows.length; i += 4) {
            if (!rows[i] || rows[i].trim() === '') continue; 
            const teamInfo = rows[i].split(',');
            if (teamInfo.length < 5) continue; 

            container.innerHTML += `
                <div class="g-cell span-4">${teamInfo[0] || ''}</div>
                <div class="g-cell span-4 text-left team-name-cell">
                    <img src="https://placehold.co/24x24/222/FFF?text=LOGO" alt="logo"> ${teamInfo[1] || ''}
                </div>
                <div class="g-cell span-4">${teamInfo[2] || ''}</div>
                <div class="g-cell span-4">${teamInfo[3] || ''}</div>
                <div class="g-cell span-4 tong-diem-val">${teamInfo[4] || ''}</div>
            `;

            for (let j = 0; j < 4; j++) {
                const pRow = rows[i + j];
                if (!pRow) continue;
                const p = pRow.split(',');
                const isLast = (j === 3) ? 'p-row-last' : '';
                
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
    let modal = document.getElementById('modal-thong-so');
    if(modal) modal.style.display = 'none';
}


/* ================= PHẦN 2: HỆ THỐNG ĐỘI TUYỂN (TRANG ĐỘI TUYỂN) ================= */
const teamsDatabase = {
    "uzi": {
        name: "UZI LEGENDS",
        desc: "UZI LEGENDS – Tên đầy đủ là UZI LEGENDS. Đội tuyển Free Fire chuyên nghiệp đến từ Việt Nam, tranh tài tại Survival Legacy Cup SS1.",
        logo: "https://placehold.co/120x120/222/FFF?text=UZI",
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
        name: "TEAM FLASH VN",
        desc: "TEAM FLASH - Đội tuyển cựu vương với lối bắn càn quét, đại diện đến từ Việt Nam.",
        logo: "https://placehold.co/120x120/222/FFF?text=FL",
        country: "[VIETNAM]",
        players: [
            { n: "FL.PLAYER1", a: "https://placehold.co/200x250/333/777?text=FL+1" },
            { n: "FL.PLAYER2", a: "https://placehold.co/200x250/333/777?text=FL+2" },
            { n: "FL.PLAYER3", a: "https://placehold.co/200x250/333/777?text=FL+3" },
            { n: "FL.PLAYER4", a: "https://placehold.co/200x250/333/777?text=FL+4" },
            { n: "FL.PLAYER5", a: "https://placehold.co/200x250/333/777?text=FL+5" }
        ]
    },
    "t3": { name: "HEAVY VN", desc: "HEAVY - 'Now or Never'. Một thế lực đáng gờm tại đấu trường Free Fire.", logo: "https://placehold.co/120x120/222/FFF?text=HEV", country: "[VIETNAM]", players: Array(5).fill({ n: "HEV.MEMBER", a: "https://placehold.co/200x250/333/777?text=HEV" }) },
    "t4": { name: "WAG VN", desc: "WAG - Kẻ thách thức mọi giới hạn, đội tuyển có kỹ năng sinh tồn tuyệt đỉnh.", logo: "https://placehold.co/120x120/222/FFF?text=WAG", country: "[VIETNAM]", players: Array(5).fill({ n: "WAG.MEMBER", a: "https://placehold.co/200x250/333/777?text=WAG" }) },
    "t5": { name: "GOW VN", desc: "GOW - Cơn lốc của giải đấu, luôn mang đến những bất ngờ vào phút chót.", logo: "https://placehold.co/120x120/222/FFF?text=GOW", country: "[VIETNAM]", players: Array(5).fill({ n: "GOW.MEMBER", a: "https://placehold.co/200x250/333/777?text=GOW" }) },
    "t6": { name: "AG GLOBAL", desc: "ALL GAMERS GLOBAL - Đội tuyển hạt giống số 1 đến từ Thái Lan.", logo: "https://placehold.co/120x120/222/FFF?text=AG", country: "[THAILAND]", players: Array(5).fill({ n: "AG.MEMBER", a: "https://placehold.co/200x250/333/777?text=AG" }) },
    "t7": { name: "EVOS ID", desc: "EVOS ESPORTS - Mãnh hổ trắng đến từ Indonesia.", logo: "https://placehold.co/120x120/222/FFF?text=EVOS", country: "[INDONESIA]", players: Array(5).fill({ n: "EVOS.MEMBER", a: "https://placehold.co/200x250/333/777?text=EVOS" }) },
    "t8": { name: "BTR ID", desc: "BIGETRON - Đội quân robot với khả năng tính toán vòng bo hoàn hảo.", logo: "https://placehold.co/120x120/222/FFF?text=BTR", country: "[INDONESIA]", players: Array(5).fill({ n: "BTR.MEMBER", a: "https://placehold.co/200x250/333/777?text=BTR" }) },
    "t9": { name: "ONIC ID", desc: "ONIC OLYMPUS - Sẵn sàng bùng nổ sức mạnh tại SLC SS1.", logo: "https://placehold.co/120x120/222/FFF?text=ONIC", country: "[INDONESIA]", players: Array(5).fill({ n: "ONIC.MEMBER", a: "https://placehold.co/200x250/333/777?text=ONIC" }) },
    "t10": { name: "RRQ ID", desc: "RRQ KAZO - Huyền thoại xứ vạn đảo chưa bao giờ làm fan thất vọng.", logo: "https://placehold.co/120x120/222/FFF?text=RRQ", country: "[INDONESIA]", players: Array(5).fill({ n: "RRQ.MEMBER", a: "https://placehold.co/200x250/333/777?text=RRQ" }) },
    "t11": { name: "TDK MY", desc: "TODAK - Chiến binh sát thủ đại diện cho Malaysia.", logo: "https://placehold.co/120x120/222/FFF?text=TDK", country: "[MALAYSIA]", players: Array(5).fill({ n: "TDK.MEMBER", a: "https://placehold.co/200x250/333/777?text=TDK" }) },
    "t12": { name: "VESJ ID", desc: "VESA ESPORTS - Đội tuyển trẻ mang luồng gió mới đến giải đấu.", logo: "https://placehold.co/120x120/222/FFF?text=VESJ", country: "[INDONESIA]", players: Array(5).fill({ n: "VESJ.MEMBER", a: "https://placehold.co/200x250/333/777?text=VESJ" }) }
};

function switchTeam(teamId) {
    const data = teamsDatabase[teamId];
    if (!data) return; 

    // Kiểm tra xem các phần tử có tồn tại trên trang hiện tại không
    let logoEl = document.getElementById('info-team-logo');
    let nameEl = document.getElementById('info-team-name');
    let descEl = document.getElementById('info-team-desc');
    let container = document.getElementById('player-cards-container');

    if(logoEl) logoEl.src = data.logo;
    if(nameEl) nameEl.innerText = data.name;
    if(descEl) descEl.innerText = data.desc;

    if(container) {
        container.innerHTML = ''; 
        data.players.forEach(player => {
            // LƯU Ý: Phải có dấu ngoặc ngược (`) ở ngay sau dấu +=
            container.innerHTML += `
                <div class="player-card">
                    <div class="p-info-top">
                        <span class="p-name">${player.n}</span>
                        <span class="p-tag">${data.country}</span>
                    </div>
                    <img class="p-avatar" src="${player.a}" alt="Avatar">
                    <div class="btn-xem-them">XEM THÊM <span class="arrow">▶</span></div>
                </div>
            `; // Và một dấu ngoặc ngược (`) đóng lại ở đây
        });
    }

    // Đổi viền vàng cho logo được chọn
    document.querySelectorAll('.t-icon').forEach(icon => {
        icon.classList.remove('active'); 
        if (icon.getAttribute('onclick') && icon.getAttribute('onclick').includes(`switchTeam('${teamId}')`)) {
            icon.classList.add('active');
        }
    });
}

// Phép thuật tự động bật UZI khi vừa vào trang Đội Tuyển
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('player-cards-container')) {
        switchTeam('uzi'); 
    }
});