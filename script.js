/* ================= PHẦN 1: BẢNG THÔNG SỐ (TRANG LỊCH THI ĐẤU) ================= */
// Nhớ dán link Google Sheets của bạn vào đây nha:
const SHEET_LINK = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1286104940&single=true&output=csv';

/* ================= BẢN SAO GARENA 1:1 ================= */
async function moThongSo(soTran) {
    // --- CHÈN 4 DÒNG NÀY VÀO ĐẦU HÀM ---
    tranHienTai = soTran; // Cập nhật lại số trận hiện tại
    let tenTranEl = document.getElementById('ten-tran-dau');
    if (tenTranEl) tenTranEl.innerText = "TRẬN " + soTran; // Đổi chữ cứng thành số động
    // -----------------------------------
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
            
            let tenDoi = teamInfo[1] ? teamInfo[1].trim() : '';
            let logoThichHop = "https://placehold.co/24x24/222/FFF?text=LOGO";
            
            let timDoi = Object.values(teamsDatabase).find(t => t.name.toUpperCase() === tenDoi.toUpperCase());
            if(timDoi && timDoi.logo) {
                logoThichHop = timDoi.logo;
            }

            // --- 1. IN 5 CỘT BÊN TRÁI (Gộp thành 1 khối bự duy nhất) ---
            container.innerHTML += `
                <div class="g-cell span-4-row">${teamInfo[0] || ''}</div>
                <div class="g-cell span-4-row team-name-cell">
                    <img src="${logoThichHop}" alt="logo" class="small-logo"> 
                    <span class="short-name">${tenDoi}</span>
                </div>
                <div class="g-cell span-4-row">${teamInfo[2] || ''}</div>
                <div class="g-cell span-4-row">${teamInfo[3] || ''}</div>
                <div class="g-cell span-4-row cot-xam-garena">${teamInfo[4] || ''}</div>
            `;

            // --- 2. LẶP 4 LẦN CHO 3 CỘT NGƯỜI CHƠI BÊN PHẢI ---
            for (let j = 0; j < 4; j++) {
                const pRow = rows[i + j];
                const p = pRow ? pRow.split(',') : []; 
                const isLast = (j === 3) ? 'p-row-last' : '';
                
                let ten = (p[5] && p[5].trim() !== '') ? p[5].toUpperCase() : '';
                let kill = '';
                let dmg = '';
                
                if (ten !== '') {
                    kill = (p[6] && p[6].trim() !== '') ? p[6].trim() : '0';
                    dmg = (p[7] && p[7].trim() !== '') ? p[7].trim() : '0';
                }

                container.innerHTML += `
                    <div class="g-cell player-cell text-left ${isLast}">${ten}</div>
                    <div class="g-cell player-cell ${isLast}">${kill}</div>
                    <div class="g-cell player-cell ${isLast}">${dmg}</div>
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
            { n: "UNC.VTHIEN", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UNC.NHIM", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "UNC.FOR", a: "https://placehold.co/200x250/111/555?text=TRONG" }
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
            { n: "MAO.SUN", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" }
        ]
    },
    "ft": {
        name: "FT",
        desc: "FT - Tên đầy đủ là Fearless Team. Đội tuyển Free Fire luôn thi đấu với lòng quyết tâm, chiến thuật linh hoạt và tinh thần đồng đội mạnh mẽ. Chúng tôi hướng tới mục tiêu không chỉ là chiến thắng, mà còn là truyền cảm hứng cho cộng đồng tại Survival Legacy Cup SS1!",
        logo: "logo-ft.jpg",
        country: "", 
        players: [
            { n: "FT.MILLOW", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "FT.THANHDAI", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "FT.MEOMEO", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "FT.W4U", a: "https://placehold.co/200x250/111/555?text=AVATAR+FF" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "t5": { name: "TEAM 5", desc: "Thông tin đội 5...", logo: "https://placehold.co/120x120/222/FFF?text=T5", country: "[VIETNAM]", players: Array(5).fill({ n: "T5.MEMBER", a: "https://placehold.co/200x250/333/777?text=T5" }) },
    "t6": { name: "TEAM 6", desc: "Thông tin đội 6...", logo: "https://placehold.co/120x120/222/FFF?text=T6", country: "[VIETNAM]", players: Array(5).fill({ n: "T6.MEMBER", a: "https://placehold.co/200x250/333/777?text=T6" }) },
    "t7": { name: "TEAM 7", desc: "Thông tin đội 7...", logo: "https://placehold.co/120x120/222/FFF?text=T7", country: "[VIETNAM]", players: Array(5).fill({ n: "T7.MEMBER", a: "https://placehold.co/200x250/333/777?text=T7" }) },
    "t8": { name: "TEAM 8", desc: "Thông tin đội 8...", logo: "https://placehold.co/120x120/222/FFF?text=T8", country: "[VIETNAM]", players: Array(5).fill({ n: "T8.MEMBER", a: "https://placehold.co/200x250/333/777?text=T8" }) },
    "t9": { name: "TEAM 9", desc: "Thông tin đội 9...", logo: "https://placehold.co/120x120/222/FFF?text=T9", country: "[VIETNAM]", players: Array(5).fill({ n: "T9.MEMBER", a: "https://placehold.co/200x250/333/777?text=T9" }) },
    "t10": { name: "TEAM 10", desc: "Thông tin đội 10...", logo: "https://placehold.co/120x120/222/FFF?text=T10", country: "[VIETNAM]", players: Array(5).fill({ n: "T10.MEMBER", a: "https://placehold.co/200x250/333/777?text=T10" }) },
    "t11": { name: "TEAM 11", desc: "Thông tin đội 11...", logo: "https://placehold.co/120x120/222/FFF?text=T11", country: "[VIETNAM]", players: Array(5).fill({ n: "T11.MEMBER", a: "https://placehold.co/200x250/333/777?text=T11" }) },
    "t12": { name: "TEAM 12", desc: "Thông tin đội 12...", logo: "https://placehold.co/120x120/222/FFF?text=T12", country: "[VIETNAM]", players: Array(5).fill({ n: "T12.MEMBER", a: "https://placehold.co/200x250/333/777?text=T12" }) },
    "t13": { name: "TEAM 13", desc: "Thông tin đội 13...", logo: "https://placehold.co/120x120/222/FFF?text=T13", country: "[VIETNAM]", players: Array(5).fill({ n: "T13.MEMBER", a: "https://placehold.co/200x250/333/777?text=T13" }) },
    "t14": { name: "TEAM 14", desc: "Thông tin đội 14...", logo: "https://placehold.co/120x120/222/FFF?text=T14", country: "[VIETNAM]", players: Array(5).fill({ n: "T14.MEMBER", a: "https://placehold.co/200x250/333/777?text=T14" }) },
    "t15": { name: "TEAM 15", desc: "Thông tin đội 15...", logo: "https://placehold.co/120x120/222/FFF?text=T15", country: "[VIETNAM]", players: Array(5).fill({ n: "T15.MEMBER", a: "https://placehold.co/200x250/333/777?text=T15" }) },
    "t16": { name: "TEAM 16", desc: "Thông tin đội 16...", logo: "https://placehold.co/120x120/222/FFF?text=T16", country: "[VIETNAM]", players: Array(5).fill({ n: "T16.MEMBER", a: "https://placehold.co/200x250/333/777?text=T16" }) },
    "t17": { name: "TEAM 17", desc: "Thông tin đội 17...", logo: "https://placehold.co/120x120/222/FFF?text=T17", country: "[VIETNAM]", players: Array(5).fill({ n: "T17.MEMBER", a: "https://placehold.co/200x250/333/777?text=T17" }) },
    "t18": { name: "TEAM 18", desc: "Thông tin đội 18...", logo: "https://placehold.co/120x120/222/FFF?text=T18", country: "[VIETNAM]", players: Array(5).fill({ n: "T18.MEMBER", a: "https://placehold.co/200x250/333/777?text=T18" }) },
    "t19": { name: "TEAM 19", desc: "Thông tin đội 19...", logo: "https://placehold.co/120x120/222/FFF?text=T19", country: "[VIETNAM]", players: Array(5).fill({ n: "T19.MEMBER", a: "https://placehold.co/200x250/333/777?text=T19" }) },
    "t20": { name: "TEAM 20", desc: "Thông tin đội 20...", logo: "https://placehold.co/120x120/222/FFF?text=T20", country: "[VIETNAM]", players: Array(5).fill({ n: "T20.MEMBER", a: "https://placehold.co/200x250/333/777?text=T20" }) },
    "t21": { name: "TEAM 21", desc: "Thông tin đội 21...", logo: "https://placehold.co/120x120/222/FFF?text=T21", country: "[VIETNAM]", players: Array(5).fill({ n: "T21.MEMBER", a: "https://placehold.co/200x250/333/777?text=T21" }) },
    "t22": { name: "TEAM 22", desc: "Thông tin đội 22...", logo: "https://placehold.co/120x120/222/FFF?text=T22", country: "[VIETNAM]", players: Array(5).fill({ n: "T22.MEMBER", a: "https://placehold.co/200x250/333/777?text=T22" }) },
    "t23": { name: "TEAM 23", desc: "Thông tin đội 23...", logo: "https://placehold.co/120x120/222/FFF?text=T23", country: "[VIETNAM]", players: Array(5).fill({ n: "T23.MEMBER", a: "https://placehold.co/200x250/333/777?text=T23" }) },
    "t24": { name: "TEAM 24", desc: "Thông tin đội 24...", logo: "https://placehold.co/120x120/222/FFF?text=T24", country: "[VIETNAM]", players: Array(5).fill({ n: "T24.MEMBER", a: "https://placehold.co/200x250/333/777?text=T24" }) },
    "t25": { name: "TEAM 25", desc: "Thông tin đội 25...", logo: "https://placehold.co/120x120/222/FFF?text=T25", country: "[VIETNAM]", players: Array(5).fill({ n: "T25.MEMBER", a: "https://placehold.co/200x250/333/777?text=T25" }) },
    "t26": { name: "TEAM 26", desc: "Thông tin đội 26...", logo: "https://placehold.co/120x120/222/FFF?text=T26", country: "[VIETNAM]", players: Array(5).fill({ n: "T26.MEMBER", a: "https://placehold.co/200x250/333/777?text=T26" }) },
    "t27": { name: "TEAM 27", desc: "Thông tin đội 27...", logo: "https://placehold.co/120x120/222/FFF?text=T27", country: "[VIETNAM]", players: Array(5).fill({ n: "T27.MEMBER", a: "https://placehold.co/200x250/333/777?text=T27" }) },
    "t28": { name: "TEAM 28", desc: "Thông tin đội 28...", logo: "https://placehold.co/120x120/222/FFF?text=T28", country: "[VIETNAM]", players: Array(5).fill({ n: "T28.MEMBER", a: "https://placehold.co/200x250/333/777?text=T28" }) },
    "t29": { name: "TEAM 29", desc: "Thông tin đội 29...", logo: "https://placehold.co/120x120/222/FFF?text=T29", country: "[VIETNAM]", players: Array(5).fill({ n: "T29.MEMBER", a: "https://placehold.co/200x250/333/777?text=T29" }) },
    "t30": { name: "TEAM 30", desc: "Thông tin đội 30...", logo: "https://placehold.co/120x120/222/FFF?text=T30", country: "[VIETNAM]", players: Array(5).fill({ n: "T30.MEMBER", a: "https://placehold.co/200x250/333/777?text=T30" }) },
    "t31": { name: "TEAM 31", desc: "Thông tin đội 31...", logo: "https://placehold.co/120x120/222/FFF?text=T31", country: "[VIETNAM]", players: Array(5).fill({ n: "T31.MEMBER", a: "https://placehold.co/200x250/333/777?text=T31" }) },
    "t32": { name: "TEAM 32", desc: "Thông tin đội 32...", logo: "https://placehold.co/120x120/222/FFF?text=T32", country: "[VIETNAM]", players: Array(5).fill({ n: "T32.MEMBER", a: "https://placehold.co/200x250/333/777?text=T32" }) },
    "t33": { name: "TEAM 33", desc: "Thông tin đội 33...", logo: "https://placehold.co/120x120/222/FFF?text=T33", country: "[VIETNAM]", players: Array(5).fill({ n: "T33.MEMBER", a: "https://placehold.co/200x250/333/777?text=T33" }) },
    "t34": { name: "TEAM 34", desc: "Thông tin đội 34...", logo: "https://placehold.co/120x120/222/FFF?text=T34", country: "[VIETNAM]", players: Array(5).fill({ n: "T34.MEMBER", a: "https://placehold.co/200x250/333/777?text=T34" }) },
    "t35": { name: "TEAM 35", desc: "Thông tin đội 35...", logo: "https://placehold.co/120x120/222/FFF?text=T35", country: "[VIETNAM]", players: Array(5).fill({ n: "T35.MEMBER", a: "https://placehold.co/200x250/333/777?text=T35" }) },
    "t36": { name: "TEAM 36", desc: "Thông tin đội 36...", logo: "https://placehold.co/120x120/222/FFF?text=T36", country: "[VIETNAM]", players: Array(5).fill({ n: "T36.MEMBER", a: "https://placehold.co/200x250/333/777?text=T36" }) },
    "t37": { name: "TEAM 37", desc: "Thông tin đội 37...", logo: "https://placehold.co/120x120/222/FFF?text=T37", country: "[VIETNAM]", players: Array(5).fill({ n: "T37.MEMBER", a: "https://placehold.co/200x250/333/777?text=T37" }) },
    "t38": { name: "TEAM 38", desc: "Thông tin đội 38...", logo: "https://placehold.co/120x120/222/FFF?text=T38", country: "[VIETNAM]", players: Array(5).fill({ n: "T38.MEMBER", a: "https://placehold.co/200x250/333/777?text=T38" }) },
    "t39": { name: "TEAM 39", desc: "Thông tin đội 39...", logo: "https://placehold.co/120x120/222/FFF?text=T39", country: "[VIETNAM]", players: Array(5).fill({ n: "T39.MEMBER", a: "https://placehold.co/200x250/333/777?text=T39" }) },
    "t40": { name: "TEAM 40", desc: "Thông tin đội 40...", logo: "https://placehold.co/120x120/222/FFF?text=T40", country: "[VIETNAM]", players: Array(5).fill({ n: "T40.MEMBER", a: "https://placehold.co/200x250/333/777?text=T40" }) },
    "t41": { name: "TEAM 41", desc: "Thông tin đội 41...", logo: "https://placehold.co/120x120/222/FFF?text=T41", country: "[VIETNAM]", players: Array(5).fill({ n: "T41.MEMBER", a: "https://placehold.co/200x250/333/777?text=T41" }) },
    "t42": { name: "TEAM 42", desc: "Thông tin đội 42...", logo: "https://placehold.co/120x120/222/FFF?text=T42", country: "[VIETNAM]", players: Array(5).fill({ n: "T42.MEMBER", a: "https://placehold.co/200x250/333/777?text=T42" }) },
    "t43": { name: "TEAM 43", desc: "Thông tin đội 43...", logo: "https://placehold.co/120x120/222/FFF?text=T43", country: "[VIETNAM]", players: Array(5).fill({ n: "T43.MEMBER", a: "https://placehold.co/200x250/333/777?text=T43" }) },
    "t44": { name: "TEAM 44", desc: "Thông tin đội 44...", logo: "https://placehold.co/120x120/222/FFF?text=T44", country: "[VIETNAM]", players: Array(5).fill({ n: "T44.MEMBER", a: "https://placehold.co/200x250/333/777?text=T44" }) },
    "t45": { name: "TEAM 45", desc: "Thông tin đội 45...", logo: "https://placehold.co/120x120/222/FFF?text=T45", country: "[VIETNAM]", players: Array(5).fill({ n: "T45.MEMBER", a: "https://placehold.co/200x250/333/777?text=T45" }) },
    "t46": { name: "TEAM 46", desc: "Thông tin đội 46...", logo: "https://placehold.co/120x120/222/FFF?text=T46", country: "[VIETNAM]", players: Array(5).fill({ n: "T46.MEMBER", a: "https://placehold.co/200x250/333/777?text=T46" }) },
    "t47": { name: "TEAM 47", desc: "Thông tin đội 47...", logo: "https://placehold.co/120x120/222/FFF?text=T47", country: "[VIETNAM]", players: Array(5).fill({ n: "T47.MEMBER", a: "https://placehold.co/200x250/333/777?text=T47" }) },
    "t48": { name: "TEAM 48", desc: "Thông tin đội 48...", logo: "https://placehold.co/120x120/222/FFF?text=T48", country: "[VIETNAM]", players: Array(5).fill({ n: "T48.MEMBER", a: "https://placehold.co/200x250/333/777?text=T48" }) }
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
// ================= HỆ THỐNG MŨI TÊN CHUYỂN 4 TRANG =================
let trangHienTai = 1;
function chuyenTrang(huong) {
    trangHienTai += huong;
    if (trangHienTai > 4) trangHienTai = 1; // Nhảy từ trang 4 về trang 1
    if (trangHienTai < 1) trangHienTai = 4; // Lùi từ trang 1 xuống trang 4

    // Bật tắt giao diện
    let t1 = document.getElementById('trang-1');
    let t2 = document.getElementById('trang-2');
    let t3 = document.getElementById('trang-3');
    let t4 = document.getElementById('trang-4'); // Thêm trang 4
    
    if(t1 && t2 && t3 && t4) {
        t1.style.display = (trangHienTai === 1) ? '' : 'none';
        t2.style.display = (trangHienTai === 2) ? '' : 'none';
        t3.style.display = (trangHienTai === 3) ? '' : 'none';
        t4.style.display = (trangHienTai === 4) ? '' : 'none'; // Điều khiển trang 4
    }
}
/* ================= HỆ THỐNG MŨI TÊN CHUYỂN TRẬN ================= */
let tranHienTai = 1;
const tongSoTran = 6; // Khai báo tổng cộng có 6 trận

function chuyenTran(huong) {
    tranHienTai += huong;
    
    // Nếu đang ở Trận 1 mà bấm lùi, nó vòng xuống Trận 6
    if (tranHienTai < 1) tranHienTai = tongSoTran;
    
    // Nếu đang ở Trận 6 mà bấm tới, nó vòng lại Trận 1
    if (tranHienTai > tongSoTran) tranHienTai = 1;
    
    // Lệnh cho nó mở bảng thông số của trận vừa chuyển
    moThongSo(tranHienTai);
}