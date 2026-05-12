/* ================= PHẦN 1: BẢNG THÔNG SỐ (TRANG LỊCH THI ĐẤU) ================= */
// Nhớ dán link Google Sheets của bạn vào đây nha:
const SHEET_LINK = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1286104940&single=true&output=csv';

async function moThongSo(soTran) {
    let modal = document.getElementById('modal-thong-so');
    let container = document.getElementById('data-bang-diem');
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


/* ================= PHẦN 2: HỆ THỐNG ĐỘI TUYỂN ================= */
const teamsDatabase = {
    // ĐỘI 1: UNICORN (Đã ẩn chữ Việt Nam và thay đổi thành viên)
    "unc": {
        name: "UNC",
        desc: "UNC – Tên đầy đủ là UNICORN. Đội tuyển Free Fire mang phong cách đột phá và khó lường, nổi bật với lối chơi linh hoạt, sáng tạo cùng khả năng bùng nổ trong những thời khắc quyết định tại Survival Legacy Cup SS1!",
        logo: "logo-unc.jpg",
        country: "", 
        players: [
            { n: "UNC.LEVI", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UNC.QTOAN", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UNC.FOR", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UNC.NHIM", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    // ĐỘI 2 trở đi... (Lát nữa mình thay sau)
    "ks": {
        name: "KINGS FF",
        desc: "KS – Tên đầy đủ là KINGS FF. Đội tuyển Free Fire sở hữu lối chơi bản lĩnh và kỷ luật, luôn giữ thế trận ổn định và sẵn sàng áp đảo đối thủ để khẳng định vị thế “nhà vua” tại Survival Legacy Cup SS1",
        logo: "logo-ks.jpg",
        country: "", // Để trống để ẩn cái khung chữ [VIETNAM] đi
        players: [
            { n: "KS.GREAT", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "KS.VPHAT", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "KS.CTHANG", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "KS.HLOC", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "mao": {
        name: "MAO",
        desc: "MAO – Tên đầy đủ là MAO. Đội tuyển Free Fire nổi bật với lối chơi nhanh, táo bạo và không ngại giao tranh, luôn tạo áp lực mạnh mẽ và sẵn sàng bùng nổ tại Survival Legacy Cup SS1!",
        logo: "logo-mao.jpg",
        country: "", 
        players: [
            { n: "MAO.ĐBIN", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "MAO.BAUUJU?", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "MAO.QVINH", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "MAO.NTRI", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "MAO.TLUAN", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" }
        ]
    },
    "t4": { name: "TEAM 4", desc: "Thông tin đội 4...", logo: "https://placehold.co/120x120/222/FFF?text=T4", country: "[VIETNAM]", players: Array(5).fill({ n: "T4.MEMBER", a: "https://placehold.co/200x250/333/777?text=T4" }) },
    "t5": { name: "TEAM 5", desc: "Thông tin đội 5...", logo: "https://placehold.co/120x120/222/FFF?text=T5", country: "[VIETNAM]", players: Array(5).fill({ n: "T5.MEMBER", a: "https://placehold.co/200x250/333/777?text=T5" }) },
    "t6": { name: "TEAM 6", desc: "Thông tin đội 6...", logo: "https://placehold.co/120x120/222/FFF?text=T6", country: "[VIETNAM]", players: Array(5).fill({ n: "T6.MEMBER", a: "https://placehold.co/200x250/333/777?text=T6" }) },
    "t7": { name: "TEAM 7", desc: "Thông tin đội 7...", logo: "https://placehold.co/120x120/222/FFF?text=T7", country: "[VIETNAM]", players: Array(5).fill({ n: "T7.MEMBER", a: "https://placehold.co/200x250/333/777?text=T7" }) },
    "t8": { name: "TEAM 8", desc: "Thông tin đội 8...", logo: "https://placehold.co/120x120/222/FFF?text=T8", country: "[VIETNAM]", players: Array(5).fill({ n: "T8.MEMBER", a: "https://placehold.co/200x250/333/777?text=T8" }) },
    "t9": { name: "TEAM 9", desc: "Thông tin đội 9...", logo: "https://placehold.co/120x120/222/FFF?text=T9", country: "[VIETNAM]", players: Array(5).fill({ n: "T9.MEMBER", a: "https://placehold.co/200x250/333/777?text=T9" }) },
    "t10": { name: "TEAM 10", desc: "Thông tin đội 10...", logo: "https://placehold.co/120x120/222/FFF?text=T10", country: "[VIETNAM]", players: Array(5).fill({ n: "T10.MEMBER", a: "https://placehold.co/200x250/333/777?text=T10" }) },
    "t11": { name: "TEAM 11", desc: "Thông tin đội 11...", logo: "https://placehold.co/120x120/222/FFF?text=T11", country: "[VIETNAM]", players: Array(5).fill({ n: "T11.MEMBER", a: "https://placehold.co/200x250/333/777?text=T11" }) },
    "t12": { name: "TEAM 12", desc: "Thông tin đội 12...", logo: "https://placehold.co/120x120/222/FFF?text=T12", country: "[VIETNAM]", players: Array(5).fill({ n: "T12.MEMBER", a: "https://placehold.co/200x250/333/777?text=T12" }) }
};

function switchTeam(teamId) {
    const data = teamsDatabase[teamId];
    if (!data) return; 

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
            // Lệnh giấu cái khung Quốc gia nếu để trống
            let tagQuocGia = data.country !== "" ? `<span class="p-tag">${data.country}</span>` : "";
            
            container.innerHTML += `
                <div class="player-card">
                    <div class="p-info-top">
                        <span class="p-name">${player.n}</span>
                        ${tagQuocGia}
                    </div>
                    <img class="p-avatar" src="${player.a}" alt="Avatar">
                    <div class="btn-xem-them">XEM THÊM <span class="arrow">▶</span></div>
                </div>
            `;
        });
    }

    // Lệnh đổi viền vàng cho nút đang được chọn
    document.querySelectorAll('.t-icon').forEach(icon => {
        icon.classList.remove('active'); 
        if (icon.getAttribute('onclick') && icon.getAttribute('onclick').includes(`switchTeam('${teamId}')`)) {
            icon.classList.add('active');
        }
    });
}

// Bắt đầu vào web là bật ngay đội UNICORN (Mã là 'unc')
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('player-cards-container')) {
        switchTeam('unc'); 
    }
});