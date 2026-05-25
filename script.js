/* ================= PHẦN 1: BẢNG THÔNG SỐ (TRANG LỊCH THI ĐẤU) ================= */
// Nhớ dán link Google Sheets của bạn vào đây nha:
const linkCacTran = {
    1: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1286104940&single=true&output=csv",
    2: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1439103614&single=true&output=csv",
    3: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1914379601&single=true&output=csv",
    4: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1824049530&single=true&output=csv",
    5: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=440796779&single=true&output=csv",
    6: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1658103566&single=true&output=csv",
    7: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=939701822&single=true&output=csv",
    8: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=279317705&single=true&output=csv",
    9: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1183253134&single=true&output=csv",
    10: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1678347431&single=true&output=csv",
    11: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=301684834&single=true&output=csv",
    12: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=826238436&single=true&output=csv",
    13: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1442129535&single=true&output=csv",
    14: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1239244746&single=true&output=csv",
    15: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=114491176&single=true&output=csv",
    16: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1769207601&single=true&output=csv",
    17: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=128248016&single=true&output=csv",
    18: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1080854428&single=true&output=csv",
    19: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1616471349&single=true&output=csv",
    20: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=89023083&single=true&output=csv",
    21: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=792217482&single=true&output=csv",
    22: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1390220854&single=true&output=csv",
    23: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1285083716&single=true&output=csv",
    24: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=172604801&single=true&output=csv",
    25: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=2068174820&single=true&output=csv",
    26: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=455236263&single=true&output=csv",
    27: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=143456023&single=true&output=csv",
    28: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=864925118&single=true&output=csv",
    29: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=2003679059&single=true&output=csv",
    30: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=2025142964&single=true&output=csv",
    31: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1340760834&single=true&output=csv",
    32: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1170510586&single=true&output=csv",
    33: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=2105778638&single=true&output=csv",
    34: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=810622302&single=true&output=csv",
    35: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1307308618&single=true&output=csv",
    36: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1476344665&single=true&output=csv",
    37: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=48914969&single=true&output=csv",
    38: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1965317117&single=true&output=csv",
    39: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1537367577&single=true&output=csv",
    40: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=326385261&single=true&output=csv",
    41: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=371280148&single=true&output=csv",
    42: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=520870058&single=true&output=csv"
}
/* ================= BẢN SAO GARENA 1:1 ================= */
async function moThongSo(soTran) {
    if (!soTran) soTran = 1;
    
    // --- CHÈN 4 DÒNG NÀY VÀO ĐẦU HÀM ---
    tranHienTai = soTran;
    // =========================================================
    // 1. TÍNH TOÁN VÀ CẬP NHẬT GIAO DIỆN (NGÀY, GIỜ, BOOYAH)
    // =========================================================
    let ngayThiDau = Math.ceil(soTran / 6); 
    let tranTrongNgay = ((soTran - 1) % 6) + 1; 

    let tenTranEl = document.getElementById('ten-tran-dau');
    if (tenTranEl) tenTranEl.innerText = "TRẬN " + tranTrongNgay;

    let dayEl = document.querySelector('.modal-title span'); 
    if (dayEl) dayEl.innerText = "DAY " + ngayThiDau;

    let dateEl = document.querySelector('.info-box.time-box .date');
    if (dateEl) {
        const lichNgay = { 1: "21/05/2026", 2: "22/05/2026", 3: "23/05/2026", 4: "24/05/2026", 5: "25/05/2026", 6: "26/05/2026", 7: "27/05/2026" };
        dateEl.innerText = lichNgay[ngayThiDau] || "21/05/2026";
    }

    let timeEl = document.querySelector('.info-box.time-box .time');
    if (timeEl) {
        const gioThiDau = { 1: "19:00", 2: "19:30", 3: "20:00", 4: "20:30", 5: "21:00", 6: "21:30" };
        timeEl.innerText = gioThiDau[tranTrongNgay] || "19:00";
    }

    let booyahLogo = document.querySelector('.info-box.booyah-box img');
    let booyahName = document.querySelector('.info-box.booyah-box .winner-name');
    const doiChienThang = {};
    if (booyahLogo && booyahName) {
        booyahName.innerText = doiChienThang[soTran] ? doiChienThang[soTran].ten : "???";
        booyahLogo.src = doiChienThang[soTran] ? doiChienThang[soTran].logo : "https://placehold.co/80x80/222/FFF?text=?";
    }

    // =========================================================
    // 2. LỆNH MỞ KHUNG POPUP (Đoạn này lúc nãy bạn lỡ xóa mất)
    // =========================================================
    let modal = document.getElementById('modal-thong-so');
    let container = document.getElementById('data-bang-diem');
    if(!modal || !container) return;

    modal.style.display = 'block'; // ĐÂY CHÍNH LÀ LỆNH GỌI CÁI BẢNG LÊN!
    
    const headers = container.querySelectorAll('.g-header');
    container.innerHTML = '';
    headers.forEach(h => container.appendChild(h));

    try {
        // Bốc đúng link CSV theo số trận
        let linkHienTai = linkCacTran[soTran];
        if (!linkHienTai) return; 

        const response = await fetch(linkHienTai);
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
    "uzi": {
        name: "UZI",
        desc: "UZI - Tên đầy đủ là UZI　LEGENDS. Đội tuyển Free Fire mang hình tượng “song UZI khai hỏa”, tốc độ xả đạn nghẹt thở, dồn ép liên tục khiến đối thủ không kịp thở, vào giao tranh là quét sạch đội hình đối thủ trong tích tắc, thể hiện đẳng cấp “bắn nhanh – thắng nhanh” tại Survival Legacy Cup SS1!",
        logo: "logo-uzi.jpg",
        country: "", 
        players: [
            { n: "UZI.TDUY", a: "t.duy.jpg", r: "RUSHER"},
            { n: "UZI.KEN", a: "ken.jpg", r: "RIFLER" },
            { n: "UZI.HANA", a: "hana.jpg", r: "BOMBER" },
            { n: "UZI.FOR", a: "for.jpg", r: "SNIPPER" },
            { n: "UZI.BIN", a: "bin.jpg", r: "SUPPORT" }
        ]
    },
    // ĐỘI 2 trở đi... (Lát nữa mình thay sau)
    "ks": {
        name: "KINGS FF",
        desc: "KS – Tên đầy đủ là KINGS FF. Đội tuyển Free Fire sở hữu lối chơi bản lĩnh và kỷ luật, luôn giữ thế trận ổn định và sẵn sàng áp đảo đối thủ để khẳng định vị thế “nhà vua” tại Survival Legacy Cup SS1!",
        logo: "logo-ks.jpg",
        country: "",
        players: [
            { n: "KS.GREAT", a: "great.jpg", r: "RUSHER" },
            { n: "KS.VPHAT", a: "vphat.jpg", r: "RUSHER" },
            { n: "KS.CTHANG", a: "cthang.jpg", r: "RUSHER" },
            { n: "KS.HLOC", a: "hloc.jpg", r: "RIFLER" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "mao": {
        name: "MAO",
        desc: "MAO – Tên đầy đủ là MAO. Đội tuyển Free Fire nổi bật với lối chơi nhanh, táo bạo và không ngại giao tranh, luôn tạo áp lực mạnh mẽ và sẵn sàng bùng nổ tại Survival Legacy Cup SS1!",
        logo: "logo-mao.jpg",
        country: "", 
        players: [
            { n: "MAO.ĐBIN", a: "đbin.jpg", r: "RUSHER"},
            { n: "MAO.NTRI", a: "ntri.jpg", r: "BOMBER"},
            { n: "MAO.QVINH", a: "qvinh.jpg", r: "SNIPER"},
            { n: "MAO.BAUUJU?", a: "bauju.jpg", r: "SUPPORT"},
            { n: "MAO.SUN", a: "sun.jpg", r: "SUPPORT"}
        ]
    },
    "ft": {
        name: "FT",
        desc: "FT - Tên đầy đủ là Fearless Team. Đội tuyển Free Fire luôn thi đấu với lòng quyết tâm, chiến thuật linh hoạt và tinh thần đồng đội mạnh mẽ. Chúng tôi hướng tới mục tiêu không chỉ là chiến thắng, mà còn là truyền cảm hứng cho cộng đồng tại Survival Legacy Cup SS1!",
        logo: "logo-ft.jpg",
        country: "", 
        players: [
            { n: "FT.W4U", a: "w4u.jpg", r: "RUSHER" },
            { n: "FT.JVARZ", a: "jvarz.jpg", r: "BOMBER" },
            { n: "FT.THANHDAI", a: "thanhdai.jpg", r: "SNIPER" },
            { n: "FT.MILLOW", a: "millow.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "wb": {
        name: "WB",
        desc: "WB - Tên đầy đủ là WIBU Esports. Đội tuyển Free Fire với lối chơi trẻ trung, linh hoạt và giàu đột biến, thường xuyên tạo bất ngờ bằng những pha xử lý táo bạo và khả năng bứt phá mạnh mẽ tại Survival Legacy Cup SS1!",
        logo: "logo-wb.jpg", /* Nhớ gõ đúng tên file ảnh bạn vừa lưu ở Bước 1 */
        country: "", 
        players: [
            { n: "WB.K9", a: "k9.jpg", r: "RUSHER" },
            { n: "WB.BOI", a: "boi.jpg", r: "BOMBER" },
            { n: "WB.DMK", a: "dmk.jpg", r: "SNIPER" },
            { n: "WB.PEPIN", a: "pin.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "tlk": {
        name: "TLK",
        desc: "TLK - Tên đầy đủ là Tú Lơ Khơ. Đội tuyển Free Fire mang phong cách thi đấu ngẫu hứng nhưng đầy hiệu quả, nổi bật với những pha xử lý “khó đoán” và khả năng lật kèo ấn tượng tại Survival Legacy Cup SS1!",
        logo: "logo-tlk.jpg",
        country: "", 
        players: [
            { n: "TLK.DONTCRY", a: "dontcry.jpg", r: "RUSHER" },
            { n: "TLK.RAM", a: "ram.jpg", r: "BOMBER" },
            { n: "TLK.NTT", a: "ntt.jpg", r: "SNIPER" },
            { n: "TLK.NGOCTIEN", a: "ngoctien.jpg", r: "SUPPORT" },
            { n: "TLK.VANTUAN", a: "vantuan.jpg", r: "SUPPORT" }
        ]
    },
    "uch": {
        name: "UCH",
        desc: "UCH - Tên đầy đủ là Uchiha. Đội tuyển Free Fire mang phong cách lạnh lùng và chuẩn xác, nổi bật với khả năng kiểm soát giao tranh cùng những pha xử lý sắc bén, luôn sẵn sàng thiêu rụi đối thủ tại Survival Legacy Cup SS1!",
        logo: "logo-uch.jpg",
        country: "", 
        players: [
            { n: "UCH.HKIET", a: "hkiet.jpg", r: "RUSHER"},
            { n: "UCH.TDUY", a: "tduy.jpg", r: "BOMBER" },
            { n: "UCH.TKIEN", a: "tkien.jpg", r: "SNIPER"},
            { n: "UCH.XBAO", a: "xbao.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "qc": {
        name: "QC",
        desc: "QC - Tên đầy đủ là Quyết Chiến Esports. Đội tuyển Free Fire với tinh thần chiến đấu máu lửa, luôn chủ động giao tranh và không ngại va chạm, nổi bật với lối chơi quyết liệt và khả năng ép giao tranh mạnh mẽ tại Survival Legacy Cup SS1!",
        logo: "logo-qc.jpg",
        country: "", 
        players: [
            { n: "QC.KAME", a: "kame.jpg", r: "RUSHER" },
            { n: "QC.DKHANG", a: "dkhang.jpg", r: "RUSHER" },
            { n: "QC.NGHIEU", a: "nghieu.jpg", r: "BOMBER" },
            { n: "QC.CHIBUN", a: "chibun.jpg", r: "SNIPER" },
            { n: "QC.LAW", a: "law.jpg", r: "SUPPORT" }
        ]
    },
    "kg": {
        name: "KG",
        desc: "KG – Tên đầy đủ là KG Esports. Đội tuyển Free Fire thi đấu đầy bản lĩnh và kỷ luật, nổi bật với lối chơi chắc chắn, kiểm soát trận đấu tốt và khả năng phối hợp team cực kỳ ăn ý. Không chỉ mạnh ở kỹ năng cá nhân, họ còn sở hữu tư duy chiến thuật sắc bén, sẵn sàng bứt phá và làm chủ cuộc chơi ở những thời khắc quyết định tại Survival Legacy Cup SS1!",
        logo: "logo-kg.jpg",
        country: "", 
        players: [
            { n: "KG.TANPHAT", a: "tanphat.jpg", r: "RUSHER" },
            { n: "KG.QUAN", a: "quan.jpg", r: "RUSHER" },
            { n: "KG.THINH", a: "thinh.jpg", r: "SNIPER" },
            { n: "KG.HIEUDUC", a: "hieuduc.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "nna": {
        name: "NNA",
        desc: "NNA - Tên đầy đủ là Nước Ngọt Academy. Đội tuyển Free Fire mang phong cách “ngọt mà gắt”, vẻ ngoài nhẹ nhàng nhưng lối chơi cực kỳ khó chịu, sẵn sàng tung đòn kết liễu bất ngờ và khiến đối thủ “thấm đòn” tại Survival Legacy Cup SS1!",
        logo: "logo-nna.jpg",
        country: "", 
        players: [
            { n: "NNA.TCUONG", a: "tcuong.jpg", r: "RUSHER" },
            { n: "NNA.THDAT", a: "thdat.jpg", r: "RUSHER" },
            { n: "NNA.DHAI", a: "dhai.jpg", r: "BOMBER" },
            { n: "NNA.QMANH", a: "qmanh.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "bnn1": {
        name: "BNN1",
        desc: "BBN1 - Tên đầy đủ là Béc Nin No 1. Đội tuyển Free Fire với khí chất dẫn đầu, lối chơi dứt khoát và đầy uy lực, luôn nhập cuộc với mục tiêu thống trị và khẳng định đẳng cấp số 1 tại Survival Legacy Cup SS1!",
        logo: "logo-bnn1.jpg",
        country: "", 
        players: [
            { n: "BNN1.HGIA", a: "hgia.jpg", r: "RUSHER" },
            { n: "BNN1.TCONG", a: "tcong.jpg", r: "BOMBER" },
            { n: "BNN1.VTAI", a: "vtai.jpg", r: "SUPPORT" },
            { n: "BNN1.VLAP", a: "vlap.jpg", r: "SNIPER" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "nnn": {
        name: "NNN",
        desc: "NNN - Tên đầy đủ là NO NO NO. Đội tuyển Free Fire với tinh thần “nói không với thất bại”, nổi bật bởi lối chơi quyết đoán, áp lực liên tục và khả năng từ chối mọi cơ hội của đối thủ tại Survival Legacy Cup SS1!",
        logo: "logo-nnn.jpg",
        country: "", 
        players: [
            { n: "NNN.DINH", a: "dinh.jpg", r: "RUSHER" },
            { n: "NNN.VANTAI", a: "vantai.jpg", r: "RUSHER" },
            { n: "NNN.BMINH", a: "bminh.jpg", r: "SNIPER" },
            { n: "NNN.NHATTIEN", a: "nhattien.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "t2al": {
        name: "T2AL",
        desc: "T2AL- Tên đầy đủ là T2AL Esports. Đội tuyển Free Fire mang biểu tượng “số 2 bứt phá”, luôn âm thầm tích lũy sức mạnh trước khi tăng tốc mạnh mẽ, sẵn sàng vượt lên và chiếm lĩnh vị trí dẫn đầu tại Survival Legacy Cup SS1!",
        logo: "logo-t2al.jpg",
        country: "", 
        players: [
            { n: "T2AL.KTUAN", a: "ktuan.jpg", r: "RUSHER" },
            { n: "T2AL.LHTUAN", a: "lhtuan.jpg", r: "RUSHER" },
            { n: "T2AL.XQUYENN", a: "xquyen.jpg", r: "RIFLER" },
            { n: "T2AL.XUANLOC", a: "xuanloc.jpg", r: "SNIPER" },
            { n: "T2AL.MINHANN", a: "minhan.jpg", r: "SUPPORT" }
        ]
    },
    "tq": {
        name: "TQ",
        desc: "TQ - Tên đầy đủ là TQ Esports. Đội tuyển Free Fire mang phong cách “im lặng nhưng kết liễu”, không ồn ào nhưng mỗi lần xuất hiện là một lần quét sạch, ra đòn ít nhưng chuẩn và cực kỳ chí mạng tại Survival Legacy Cup SS1.!",
        logo: "logo-tq.jpg",
        country: "", 
        players: [
            { n: "TQ.VKHANG", a: "vkhang.jpg", r: "RUSHER" },
            { n: "TQ.SYHA", a: "syha.jpg", r: "RIFLER" },
            { n: "TQ.FAKE", a: "fake.jpg", r: "SNIPER" },
            { n: "TQ.MOICHOI", a: "moichoi.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG"}
        ]
    },
    "tgl": {
        name: "TGL",
        desc: "TGL - Tên đầy đủ là Team Gia Lai. Đội tuyển Free Fire không chỉ thi đấu, họ “định hình” trận đấu theo cách của riêng mình. Với phong thái điềm tĩnh và những pha ra quyết định mang tính chuẩn mực, TGL luôn khiến chiến thắng trở thành điều tất yếu chứ không phải may mắn tại Survival Legacy Cup SS1!",
        logo: "logo-tgl.jpg",
        country: "", 
        players: [
            { n: "TGL.DEKAY", a: "dekay.jpg", r: "RUSHER" },
            { n: "TGL.HDPE", a: "hdpe.jpg", r: "RUSHER" },
            { n: "TGL.MUP", a: "mup.jpg", r: "BOMBER" },
            { n: "TGL.CUBA", a: "cuba.jpg", r: "SNIPER" },
            { n: "TGL.NPHUNG", a: "nphung.jpg", r: "SUPPORT" }
        ]
    },
    "nvd": {
        name: "NVD",
        desc: "NVD - Tên đầy đủ là NEVERDIE. Đội tuyển Free Fire với tinh thần chiến đấu không bỏ cuộc đúng như tên gọi. Lì lợm, bền bỉ và luôn chiến đến cùng, Neverdie cái tên luôn khiến đối thủ phải dè chừng mỗi khi bước vào trận tại Survival Legacy Cup SS1!",
        logo: "logo-nvd.jpg",
        country: "", 
        players: [
            { n: "NVD.QUOCHUY", a: "quochuy.jpg", r: "RUSHER" },
            { n: "NVD.PHAMCUONG", a: "phamcuong.jpg", r: "RUSHER" },
            { n: "NVD.MINHTRI", a: "minhtri.jpg", r: "SPINER" },
            { n: "NVD.TRANLONG", a: "tranlong.jpg", r: "SUPPORT" },
            { n: "NVD.QUOCMINH", a: "quocminh.jpg", r: "SUPPORT" }
        ]
    },
    "hp": {
        name: "HP",
        desc: "HP – Tên đầy đủ là HP ESPORTS. Đội tuyển Free Fire mang phong cách thi đấu lạnh lùng và chuẩn xác. Không cần quá phô trương, HP luôn âm thầm tích lũy lợi thế và kết liễu trận đấu bằng những pha xử lý gọn gàng, dứt khoát tại Survival Legacy Cup SS1!",
        logo: "logo-hp.jpg",
        country: "", 
        players: [
            { n: "HP.PHUY", a: "phuy.jpg", r: "RUSHER" },
            { n: "HP.MLONG", a: "mlong.jpg", r: "RUSHER" },
            { n: "HP.HBAO", a: "hbao.jpg", r: "BOMBER" },
            { n: "HP.HKIET", a: "h-kiet.jpg", r: "SNIPER" },
            { n: "HP.ATUAN", a: "atuan.jpg", r: "SUPPORT" }
        ]
    },
    "gods": {
        name: "GODS",
        desc: "GODS – Tên đầy đủ là GODS ESPORTS. Đội tuyển Free Fire bước vào trận như những kẻ định đoạt số phận ván đấu. Mỗi pha di chuyển đều mang tính áp đặt, mỗi giao tranh đều là lời tuyên bố: đây là lãnh địa của GODS tại Survival Legacy Cup SS1!",
        logo: "logo-gods.jpg",
        country: "", 
        players: [
            { n: "GODS.BHUY", a: "bhuy.jpg", r: "RUSHER" },
            { n: "GODS.CHUY", a: "chuy.jpg", r: "RUSHER" },
            { n: "GODS.KDUY", a: "kduy.jpg", r: "SPINER" },
            { n: "GODS.TVAN", a: "tvan.jpg", r: "SUPPORT" },
            { n: "GODS.GKIET", a: "gkiet.jpg", r: "SUPPORT" }
        ]
    },
    "whd": {
        name: "WHD",
        desc: "WHD - Tên đầy đủ là Vui Vẻ Hoà Đồng. Đội tuyển Free Fire mang năng lượng tích cực vào từng trận đấu, nhưng đừng để sự vui vẻ đánh lừa, khi cần họ vẫn có thể bùng nổ và xoay chuyển cục diện theo cách không ai ngờ tới  tại Survival Legacy Cup SS1!",
        logo: "logo-whd.png",
        country: "", 
        players: [
            { n: "WHD.TUANANH", a: "tuananh.jpg", r: "RUSHER" },
            { n: "WHD.NGOCHAI", a: "ngochai.jpg", r: "BOMBER" },
            { n: "WHD.THANHSON", a: "thanhson.jpg", r: "SNIPER" },
            { n: "WHD.NGOCCAC", a: "ngoccac.jpg", r: "SNIPER" },
            { n: "WHD.HUUPHUOC", a: "huuphuoc.jpg", r: "SUPPORT" }
        ]
    },
    "arc": {
        name: "ARC",
        desc: "ARC – tên đầy đủ là ARCANE LEGION. Đội tuyển Free Fire mang màu sắc huyền bí và khó lường, nơi mỗi bước di chuyển đều ẩn chứa toan tính. Với lối chơi tinh quái và khả năng tạo đột biến cao, ARC luôn khiến trận đấu xoay chiều theo cách rất “ma thuật” tại Survival Legacy Cup SS1!",
        logo: "logo-arc.jpg",
        country: "", 
        players: [
            { n: "ARC.HUY", a: "huy.jpg", r: "RUSHER" },
            { n: "ARC.MINHBOY", a: "minhboy.jpg", r: "BOMBER" },
            { n: "ARC.DUNG", a: "dung.jpg", r: "SNIPER" },
            { n: "ARC.DONG", a: "dong.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "bne": {
        name: "BNE",
        desc: "BNE - Tên đầy đủ là BN ESPORT. Đội tuyển Free Fire chơi theo kiểu “ít nhưng chất” — mỗi pha di chuyển đều có mục đích, mỗi giao tranh đều tính toán kỹ lưỡng. Không ồn ào, nhưng khi ra tay thì gần như không cho đối thủ cơ hội phản kháng tại Survival Legacy Cup SS1!",
        logo: "logo-bne.jpg",
        country: "", 
        players: [
            { n: "BNE.TUANAN", a: "tuanan.jpg", r: "RUSHER" },
            { n: "BNE.DPHONG", a: "dphong.jpg", r: "BOMBER" },
            { n: "BNE.VINHKAKA", a: "vinhkaka.jpg", r: "BOMBER" },
            { n: "BNE.TNHAN", a: "tnhan.jpg", r: "SNIPER" },
            { n: "BNE.DBAO", a: "dbao.jpg", r: "SUPPORT" }
        ]
    },
    "cnct": {
        name: "CNCT",
        desc: "CNCT – Tên đầy đủ là CAINUOC CITY. Đội tuyển Free Fire mang đậm chất đường phố với lối chơi táo bạo và không ngại va chạm. Luôn sẵn sàng lao vào giao tranh, CNCT biến mỗi trận đấu thành cuộc chiến thực thụ, nơi bản lĩnh được đặt lên hàng đầu tại Survival Legacy Cup SS1!",
        logo: "logo-cnct.jpg",
        country: "", 
        players: [
            { n: "CNCT.QN", a: "qn.jpg", r: "RUSHER" },
            { n: "CNCT.CN", a: "cn.jpg", r: "RUSHER" },
            { n: "CNCT.KH", a: "kh.jpg", r: "RUSHER" },
            { n: "CNCT.SOI", a: "soi.jpg", r: "SNIPER" },
            { n: "CNCT.QUYEN", a: "quyen.jpg", r: "SUPPORT" }
        ]
    },
    "btn": {
        name: "BTN",
        desc: "BTN - Tên đầy đủ là BTN. Đội tuyển Free Fire mang phong cách thi đấu lạnh và lì, càng bị ép, họ càng nguy hiểm. Với những pha phản công sắc bén, BTN luôn biết cách biến thế trận bất lợi thành màn lật kèo đầy bất ngờ tại Survival Legacy Cup SS1!",
        logo: "logo-btn.jpg",
        country: "", 
        players: [
            { n: "BTN.TDUNG", a: "tdung.jpg", r: "RUSHER" },
            { n: "BTN.VQUANG", a: "vquang.jpg", r: "RUSHER" },
            { n: "BTN.TANH", a: "tanh.jpg", r: "SNIPER" },
            { n: "BTN.HLONG", a: "hlong.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "blx": {
        name: "BLX",
        desc: "BLX - Tên đầy đủ là BLITZX. Đội tuyển mang phong cách đánh nhanh, dồn dập đúng như cái tên “Blitz”. Không cho đối thủ thời gian thở, BLX luôn áp đảo nhịp trận bằng những pha tấn công chớp nhoáng và đầy uy lực tại Survival Legacy Cup SS1!",
        logo: "logo-blx.jpg",
        country: "", 
        players: [
            { n: "BLX.CP", a: "cp.jpg", r: "RUSHER" },
            { n: "BLX.CT", a: "ct.jpg", r: "RUSHER" },
            { n: "BLX.HT", a: "ht.jpg", r: "SNIPER" },
            { n: "BLX.TQ", a: "tq.jpg", r: "SNIPER" },
            { n: "BLX.TC", a: "tc.jpg", r: "SUPPORT" }
        ]
    },
    "hre": {
        name: "HRE",
        desc: "HRE - Tên đầy đủ là HERO ESPORTS. Đội tuyển mang tinh thần của những “người hùng” thực thụ- luôn xuất hiện đúng lúc và tạo nên khác biệt. Với lối chơi bản lĩnh và những pha tỏa sáng cá nhân, HRE thường là nhân tố xoay chuyển cục diện trận đấu tại Survival Legacy Cup SS1!",
        logo: "logo-hre.jpg",
        country: "", 
        players: [
            { n: "HRE.RESFINA", a: "resfina.jpg", r: "RUSHER" },
            { n: "HRE.COTU", a: "cotu.jpg", r: "BOMBER" },
            { n: "HRE.TANHH", a: "tanhh.jpg", r: "SNIPER" },
            { n: "HRE.VANPHONG", a: "vanphong.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "pcm": {
        name: "PCM",
        desc: "PCM - Tên đầy đủ là PCM. Đội tuyển chơi như những “kẻ giật dây” phía sau trận đấu - không ồn ào nhưng luôn kiểm soát nhịp độ. Đến khi đối thủ nhận ra, mọi thứ đã nằm trọn trong thế trận của PCM tại Survival Legacy Cup SS1!",
        logo: "logo-pcm.jpg",
        country: "", 
        players: [
            { n: "PCM.APPOMEO", a: "appomeo.jpg", r: "RUSHER" },
            { n: "PCM.DZAI", a: "dzai.jpg", r: "RUSHER" },
            { n: "PCM.OGGY", a: "oggy.jpg", r: "SNIPER" },
            { n: "PCM.K", a: "k.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "dc": {
        name: "DC",
        desc: "DC - Tên đầy đủ là Diệt Cus. Đội tuyển Free Fire mang phong cách thi đấu dứt khoát và đầy uy lực. Không vòng vo, mỗi pha hành động của DC đều như một đòn đánh chí mạng, nhanh gọn và đủ để định đoạt cục diện trận đấu Survival Legacy Cup SS1!",
        logo: "logo-dc.jpg",
        country: "", 
        players: [
            { n: "DC.PHAT", a: "phat.jpg", r: "RUSHER" },
            { n: "DC.DONG", a: "dong2.jpg", r: "RUSHER" },
            { n: "DC.KHANH", a: "khanh.jpg", r: "SNIPER" },
            { n: "DC.HUNG", a: "hung.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
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
                        <span class="p-tag">[${player.r ? player.r : 'THÀNH VIÊN'}]</span>
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
const tongSoTran = 42; // Khai báo tổng cộng có 6 trận

function chuyenTran(huong) {
    tranHienTai += huong;
    
    // Nếu đang ở Trận 1 mà bấm lùi, nó vòng xuống Trận 6
    if (tranHienTai < 1) tranHienTai = tongSoTran;
    
    // Nếu đang ở Trận 6 mà bấm tới, nó vòng lại Trận 1
    if (tranHienTai > tongSoTran) tranHienTai = 1;
    
    // Lệnh cho nó mở bảng thông số của trận vừa chuyển
    moThongSo(tranHienTai);
}
// Tự động kích hoạt hiển thị đội UZI ngay khi vừa mở trang
window.onload = function() {
    switchTeam('uzi');
};