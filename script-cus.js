// DÁN 3 LINK CSV MÀ BẠN VỪA LẤY Ở BƯỚC 1 VÀO ĐÂY:
const LINK_DAY1 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtBSowuBllvrWxdqCNHlmVOjaCKLvhpe45Qg5lrTMMCDnwrKS2UuTCuE7CzqUuSjZsvZayY0jV02H1/pub?gid=0&single=true&output=csv'; 
const LINK_DAY2 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtBSowuBllvrWxdqCNHlmVOjaCKLvhpe45Qg5lrTMMCDnwrKS2UuTCuE7CzqUuSjZsvZayY0jV02H1/pub?gid=1304469215&single=true&output=csv'; 
const LINK_DAY3 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtBSowuBllvrWxdqCNHlmVOjaCKLvhpe45Qg5lrTMMCDnwrKS2UuTCuE7CzqUuSjZsvZayY0jV02H1/pub?gid=1451683209&single=true&output=csv'; 

async function moThongSo(tenTran) {
    let modal = document.getElementById('modal-thong-so');
    let container = document.getElementById('data-bang-diem');
    if(!modal || !container) return;

    modal.style.display = 'block';
    container.style.display = 'block'; // Ép thành dạng Block để giao diện rộng rãi
    container.innerHTML = '<p style="color:#ffcc00; text-align:center; padding: 20px; font-weight:bold;">Đang tải dữ liệu trận đấu...</p>';

    // --- BỘ NÃO TỰ ĐỘNG CHỌN TAB ---
    let linkCanLay = LINK_DAY1;
    if (tenTran.toLowerCase().includes('bán kết')) {
        linkCanLay = LINK_DAY2;
    } else if (tenTran.toLowerCase().includes('chung kết')) {
        linkCanLay = LINK_DAY3;
    }

    try {
        const response = await fetch(linkCanLay);
        const data = await response.text();
        const rows = data.split('\n');

        let timThay = false;

        for (let i = 1; i < rows.length; i++) { 
            if (!rows[i] || rows[i].trim() === '') continue;
            
            const cols = rows[i].split(',');
            if (cols.length >= 4) {
                const tenTranTrongSheet = cols[0].trim();

                if (tenTranTrongSheet.toLowerCase() === tenTran.toLowerCase()) {
                    const doi1 = cols[1].trim();
                    const doi2 = cols[2].trim();
                    const doiThang = cols[3].trim();

                    // RÁP GIAO DIỆN VS VÀO ĐÚNG CHỖ NÀY (Sau khi đã có dữ liệu)
                    container.innerHTML = `
                        <div style="width: 100%; padding: 10px 0;">
                            <div style="display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.8); padding: 30px 10px; border-radius: 12px; border: 1px solid #555; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
                                <div style="flex: 1; text-align: right; padding-right: 25px;">
                                    <h3 style="color: #00d2ff; font-size: 32px; margin: 0; text-transform: uppercase; text-shadow: 0 0 15px #00d2ff;">${doi1}</h3>
                                </div>
                                <div style="padding: 0 20px;">
                                    <span style="color: #ff0000; font-size: 45px; font-weight: 900; font-style: italic; text-shadow: 0 0 20px #ff0000;">VS</span>
                                </div>
                                <div style="flex: 1; text-align: left; padding-left: 25px;">
                                    <h3 style="color: #00d2ff; font-size: 32px; margin: 0; text-transform: uppercase; text-shadow: 0 0 15px #00d2ff;">${doi2}</h3>
                                </div>
                            </div>
                            <div style="text-align: center; margin-top: 30px; padding: 25px; background: linear-gradient(90deg, #332200, #1a1100); border: 2px solid #ffcc00; border-radius: 8px; box-shadow: 0 0 25px rgba(255, 204, 0, 0.4);">
                                <div style="color: #fff; font-size: 16px; margin-bottom: 8px; font-weight: bold;">🏆 ĐỘI CHIẾN THẮNG 🏆</div>
                                <div style="color: #ffcc00; font-size: 34px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">
                                    ${doiThang && doiThang !== '' ? doiThang : 'ĐANG CẬP NHẬT...'}
                                </div>
                            </div>
                        </div>
                    `;
                    timThay = true;
                    break; 
                }
            }
        }

        if (!timThay) {
            container.innerHTML = '<p style="color:#ff4444; text-align:center; font-weight:bold; padding: 20px;">Trận này chưa có dữ liệu trên bảng điểm!</p>';
        }

    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
        container.innerHTML = '<p style="color:#ff4444; text-align:center; font-weight:bold; padding: 20px;">Không thể kết nối đến Google Sheets!</p>';
    }
}

// Giữ nguyên function dongThongSo() của bạn ở dưới nhé
function dongThongSo() {
    let modal = document.getElementById('modal-thong-so');
    if(modal) modal.style.display = 'none';
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