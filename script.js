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
    // Tự động nạp ảnh Map tương ứng với số trận
    let mapBanner = document.getElementById('banner-map');
    if (mapBanner) {
        // Nếu trận đó có link ảnh thì hiện lên, không có thì giấu ảnh đi cho đỡ trống
        if (anhMapCacTran[soTran]) {
            mapBanner.src = anhMapCacTran[soTran];
            mapBanner.style.display = 'block';
        } 
        else {
            mapBanner.style.display = 'none'; 
        }
    }
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
    document.body.style.overflow = 'hidden'; /* Khóa cuộn trang nền */
    
    const headers = container.querySelectorAll('.g-header');
    container.innerHTML = '';
    headers.forEach(h => container.appendChild(h));

    try {
        // Bốc đúng link CSV theo số trận
        let linkHienTai = linkCacTran[soTran];
        if (!linkHienTai) return; 

        const response = await fetch(linkHienTai);
        const data = await response.text();
        // THÊM ĐÚNG DÒNG NÀY VÀO:
        console.log("DỮ LIỆU TỪ GOOGLE SHEETS LÀ:\n", data);
        const rows = data.split('\n').slice(1);
        // RESET BẢNG BOOYAH VỀ DẤU CHẤM HỎI TRƯỚC KHI ĐỌC TRẬN MỚI
        let booyahLogo = document.querySelector('.info-box.booyah-box img');
        let booyahName = document.querySelector('.info-box.booyah-box .winner-name');
        if (booyahLogo) booyahLogo.src = "https://placehold.co/80x80/222/FFF?text=?"; 
        if (booyahName) booyahName.innerText = "???";

        for (let i = 0; i < rows.length; i++) {
            if (!rows[i] || rows[i].trim() === '') continue; 
            const teamInfo = rows[i].split(',');
            let tenDoi = teamInfo[1] ? teamInfo[1].trim() : '';
            if (tenDoi === '') continue;
            let logoThichHop = "https://placehold.co/24x24/222/FFF?text=LOGO";
            // TỰ ĐỘNG BÊ ĐỘI HẠNG 1 LÊN BẢNG BOOYAH!
            if (teamInfo[0].trim() === '1') {
                let booyahLogo = document.querySelector('.info-box.booyah-box img');
                let booyahName = document.querySelector('.info-box.booyah-box .winner-name');
                if (booyahLogo) booyahLogo.src = logoThichHop;
                if (booyahName) booyahName.innerText = tenDoi;
            }
            let timDoi = Object.values(teamsDatabase).find(t => t.name.toUpperCase() === tenDoi.toUpperCase());
            if(timDoi && timDoi.logo) {
                logoThichHop = timDoi.logo;
            }
            // 2. DÁN ĐOẠN BOOYAH VÀO ĐÂY (Sau khi đã tìm thấy logoThichHop thật)
            if (teamInfo[0].trim() === '1') {
                let booyahLogo = document.querySelector('.info-box.booyah-box img');
                let booyahName = document.querySelector('.info-box.booyah-box .winner-name');
                if (booyahLogo) booyahLogo.src = logoThichHop;
                if (booyahName) booyahName.innerText = tenDoi;
            }
            // --- 3. IN 5 CỘT BÊN TRÁI (Gộp thành 1 khối bự duy nhất) ---
            container.innerHTML += `
                <div class="g-cell">${teamInfo[0] || ''}</div>
                <div class="g-cell team-name-cell">
                    <img src="${logoThichHop}" alt="logo" class="small-logo"> 
                    <span class="short-name">${tenDoi}</span>
                </div>
                <div class="g-cell">${teamInfo[2] || ''}</div>
                <div class="g-cell">${teamInfo[3] || ''}</div>
                <div class="g-cell cot-xam-garena">${teamInfo[4] || ''}</div>
            `;
        }
    } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
    }
}

function dongThongSo() {
    let modal = document.getElementById('modal-thong-so');
    if(modal) modal.style.display = 'none';
    // THÊM DÒNG NÀY VÀO ĐỂ TRẢ LẠI THANH CUỘN CHO TRANG CHỦ:
    document.body.style.overflow = '';
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
            { n: "UZI.TDUY", r: "RUSHER", id: "1684785935" },
            { n: "UZI.KEN", r: "RIFLER", id: "11332758118" },
            { n: "UZI.HANA", r: "BOMBER", id: "2104295752" },
            { n: "UZI.FOR", r: "SNIPER", id: "6738561967" },
            { n: "UZI.BIN", r: "SUPPORT", id: "9173149407" }
        ]
    },
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
    "tgl2": {
        name: "TGL2",
        desc: "TGL2 - Tên đầy đủ là Team Gia Lai 2. Đội tuyển Free Fire phiên bản trẻ trung nhưng không kém phần sắc bén của TGL - thi đấu với tinh thần máu lửa và khát khao khẳng định. Luôn sẵn sàng bùng nổ, TGL2 là ẩn số có thể tạo nên bất ngờ ở bất kỳ thời điểm nào tại Survival Legacy Cup SS1!",
        logo: "logo-tgl2.jpg",
        country: "", 
        players: [
            { n: "TGL2.DKHOI", a: "dkhoi.jpg", r: "RUSHER" },
            { n: "TGL2.HPHONG", a: "hphong.jpg", r: "RUSHER" },
            { n: "TGL2.GHAO", a: "ghao.jpg", r: "SNIPER" },
            { n: "TGL2.DKHOA", a: "dkhoa.jpg", r: "SNIPER" },
            { n: "TGL2.CPHAT", a: "cphat.jpg", r: "SUPPORT" }
        ]
    },
    "se": {
        name: "SE",
        desc: "SE – Tên đầy đủ là SE ESPORTS. Đội tuyển thi đấu với phong thái lạnh như băng-ít sai lầm, nhiều áp lực. Mỗi bước di chuyển đều như siết dần không gian của đối thủ, đến khi nhận ra thì đã không còn đường lui tại Survival Legacy Cup SS1!",
        logo: "logo-se.jpg",
        country: "", 
        players: [
            { n: "SE.DONG", a: "dong.jpg", r: "RUSHER" },
            { n: "SE.MINHBOY", a: "minhboy.jpg", r: "RUSHER" },
            { n: "SE.SON", a: "son.jpg", r: "RUSHER" },
            { n: "SE.HUY", a: "huy.jpg", r: "BOMBER" },
            { n: "SE.DUNG", a: "dung.jpg", r: "SNIPER" }
        ]
    },
    "nok": {
        name: "NOK",
        desc: "NOK - Tên đầy đủ là NOKARA. Đội tuyển Free Fire chơi theo kiểu “một đòn là đủ” - không cần nhiều pha giao tranh, chỉ cần đúng thời điểm. Lặng lẽ tích tụ, rồi bất ngờ tung cú kết liễu khiến đối thủ không kịp hiểu chuyện gì vừa xảy ra tại Survival Legacy Cup SS1!",
        logo: "logo-nok.jpg",
        country: "", 
        players: [
            { n: "NOK.THANHHUNG", a: "thanhhung.jpg", r: "RUSHER" },
            { n: "NOK.THANHDAT", a: "thanhdat.jpg", r: "RUSHER" },
            { n: "NOK.VVLAVIDA", a: "vvlavida.jpg", r: "SNIPER" },
            { n: "NOK.MOUSE", a: "mouse.jpg", r: "SNIPER" },
            { n: "NOK.DECADE", a: "decade.jpg", r: "SUPPORT" }
        ]
    },
    "wr": {
        name: "WR",
        desc: "WR - Tên đầy đủ là WARY ESPORTS. Đội tuyển Free Fire luôn thi đấu trong trạng thái “cảnh giác tối đa” - từng bước di chuyển đều chặt chẽ, từng quyết định đều mang tính sống còn. Không dễ bị bắt bài, WR khiến đối thủ dần mắc sai lầm rồi trừng phạt bằng những pha xử lý lạnh lùng và chuẩn xác tại Survival Legacy Cup SS1!",
        logo: "logo-wr.jpg",
        country: "", 
        players: [
            { n: "WR.NH", a: "nh.jpg", r: "RUSHER" },
            { n: "WR.GINZ", a: "ginz.jpg", r: "RIFLER" },
            { n: "WR.BRX1", a: "brx1.jpg", r: "SNIPER" },
            { n: "WR.QUANHUY", a: "quanhuy.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "4tl": {
        name: "4TL",
        desc: "4TL - Tên đầy đủ là 4TL. Đội tuyển Free Fire đại diện cho “4 Tactics – 4 chiến thuật”, nơi mỗi thành viên là một mảnh ghép chiến lược hoàn chỉnh. Khi kết hợp, họ tạo nên thế trận đa hướng, biến mọi pha giao tranh thành màn áp đảo không thể chống đỡ tại Survival Legacy Cup SS1!",
        logo: "logo-4tl.jpg",
        country: "", 
        players: [
            { n: "4TL.PKHANH", a: "pkhanh.jpg", r: "RUSHER" },
            { n: "4TL.KING", a: "king.jpg", r: "RIFLER" },
            { n: "4TL.THANHHUY", a: "thanhhuy.jpg", r: "BOMBER" },
            { n: "4TL.MTAY", a: "mtay.jpg", r: "SNIPER" },
            { n: "4TL.MNAM", a: "mnam.jpg", r: "SUPPORT" }
        ]
    },
    "6it": {
        name: "6IT",
        desc: "6IT -  Tên đầy đủ là 6I TEAM. Đội tuyển Free Fire đại diện cho “6 Instinct – 6 bản năng chiến đấu”, nơi mỗi quyết định đều dựa trên cảm giác và phản xạ đỉnh cao. Khi nhập cuộc, 6IT chơi như một thể thống nhất-nhanh, gắt và luôn đi trước đối thủ một nhịp tại Survival Legacy Cup SS1!",
        logo: "logo-6it.jpg",
        country: "", 
        players: [
            { n: "6IT.MKHANG", a: "mkhang.jpg", r: "RUSHER" },
            { n: "6IT.SUY", a: "suy.jpg", r: "RUSHER" },
            { n: "6IT.ANHDUC", a: "anhduc.jpg", r: "SNIPER" },
            { n: "6IT.THACH", a: "thach.jpg", r: "SNIPER" },
            { n: "6IT.HAU", a: "hau.jpg", r: "SUPPORT" }
        ]
    },
    "mb": {
        name: "MB",
        desc: "MB - Tên đầy đủ là MEMBES. Đội tuyển Free Fire đại diện cho “Mind & Bullet – Trí tuệ và hỏa lực”, nơi chiến thuật và kỹ năng kết hợp hoàn hảo. Không chỉ bắn hay, MB còn thắng bằng cái đầu, biến mọi pha giao tranh thành nước đi đã được tính trước tại Survival Legacy Cup SS1!",
        logo: "logo-mb.jpg",
        country: "", 
        players: [
            { n: "MB.HIEU", a: "hieu.jpg", r: "RUSHER" },
            { n: "MB.DANGKHOA", a: "dangkhoa.jpg", r: "RIFLER" },
            { n: "MB.NPHUNG", a: "nphung2.jpg", r: "BOMBER" },
            { n: "MB.QUOCKHANH", a: "quockhanh.jpg", r: "SUPPORT" },
            { n: "MB.THAONHI", a: "thaonhi.jpg", r: "SUPPORT" }
        ]
    },
    "km": {
        name: "KM",
        desc: "KM - Tên đầy đủ là KM ESPORTS. Đội tuyển Free Fire đại diện cho “Killer Mind - Tư duy sát thủ”, nơi mọi quyết định đều nhanh, gọn và mang tính kết liễu. KM không chỉ chơi game, họ săn lùng cơ hội và dứt điểm đối thủ không chút do dự tại Survival Legacy Cup SS1!",
        logo: "logo-km.jpg",
        country: "", 
        players: [
            { n: "KM.HQN", a: "hqn.jpg", r: "RUSHER" },
            { n: "KM.KCDON", a: "kcdon.jpg", r: "RIFLER" },
            { n: "KM.NGANDAO", a: "ngandao.jpg", r: "BOMBER" },
            { n: "KM.CRUSH", a: "crush.jpg", r: "SNIPER" },
            { n: "KM.MTHUAN", a: "mthuan.jpg", r: "SUPPORT" }
        ]
    },
    "4t": {
        name: "4T",
        desc: "4T – Tên đầy đủ là 4T ESPORTS. Đội tuyển Free Fire đại diện cho “4 Triggers – 4 họng súng luôn sẵn sàng khai hỏa”, nơi mỗi thành viên là một điểm nổ có thể kích hoạt bất cứ lúc nào. Khi 4T nhập cuộc, trận đấu không còn là kiểm soát-mà là chuỗi phản ứng dây chuyền của những pha hủy diệt tại Survival Legacy Cup SS1!",
        logo: "logo-4t.jpg",
        country: "", 
        players: [
            { n: "4T.MINHNHAT", a: "minhnhat.jpg", r: "RUSHER" },
            { n: "4T.TRUONGAN", a: "truongan.jpg", r: "BOMBER" },
            { n: "4T.NGOCCAC", a: "ngoccac.jpg", r: "SNIPER" },
            { n: "4T.HOANGDUNG", a: "hoangdung.jpg", r: "SUPPORT" },
            { n: "4T.BONG", a: "bong.jpg", r: "SUPPORT" }
        ]
    },
    "te": {
        name: "TE",
        desc: "TE – Tên đầy đủ là TOMESPORTS. Đội tuyển Free Fire đại diện cho “Tactical Execution – Lối chơi chuẩn xác tuyệt đối”, nơi mọi pha xử lý đều được triển khai như một kịch bản hoàn hảo. TE không tạo ra cơ hội-họ tự viết nên thế trận và kết thúc nó theo cách của mình tại Survival Legacy Cup SS1!",
        logo: "logo-te.jpg",
        country: "", 
        players: [
            { n: "TE.SPEEDZ", a: "speedz.jpg", r: "RUSHER" },
            { n: "TE.RENNO", a: "renno.jpg", r: "RUSHER" },
            { n: "TE.KOLIX", a: "kolix.jpg", r: "BOMBER" },
            { n: "TE.TVL", a: "tvl.jpg", r: "SNIPER" },
            { n: "TE.BEN10", a: "ben10.jpg", r: "SUPPORT" }
        ]
    },
    "lhdxb": {
        name: "LHDXB",
        desc: "LHDXB – Tên đầy đủ là LA HÁN ĐẨY XE BÒ. Đội tuyển Free Fire đại diện cho “sức mạnh lì lợm và tiến công không ngừng”, như những La Hán kiên định đẩy thế trận tiến về phía trước. Không vội vàng nhưng không thể cản, LHDXB càng đánh càng ép, biến mọi trận đấu thành hành trình áp đảo tại Survival Legacy Cup SS1!",
        logo: "logo-lhdxb.jpg",
        country: "", 
        players: [
            { n: "LHDXB.NQUYEN", a: "nquyen.jpg", r: "RUSHER" },
            { n: "LHDXB.MTOAN", a: "mtoan.jpg", r: "RUSHER" },
            { n: "LHDXB.NQUAN", a: "nquan.jpg", r: "SNIPER" },
            { n: "LHDXB.HONGLINH", a: "honglinh.jpg", r: "SUPPORT" },
            { n: "LHDXB.CPHAT", a: "chanhphat.jpg", r: "SUPPORT" }
        ]
    },
    "hkt": {
        name: "HKT",
        desc: "HKT – Tên đầy đủ là HKT. Đội tuyển Free Fire đại diện cho “Hard Kill Team – Đội hình săn mạng không khoan nhượng”, nơi mọi giao tranh đều được đẩy lên cực điểm. HKT không chơi an toàn - họ lao vào, áp đảo và kết thúc đối thủ bằng những pha tấn công dồn dập tại Survival Legacy Cup SS1!",
        logo: "logo-hkt.jpg",
        country: "", 
        players: [
            { n: "HKT.MKHANG", a: "mkhang.jpg", r: "RUSHER" },
            { n: "HKT.SUY", a: "suy.jpg", r: "RUSHER" },
            { n: "HKT.ANHDUC", a: "anhduc.jpg", r: "SNIPER" },
            { n: "HKT.THACH", a: "thach.jpg", r: "SNIPER" },
            { n: "HKT.HAU", a: "hau.jpg", r: "SUPPORT" }
        ]
    },
    "tgl3": {
        name: "TGL3",
        desc: "TGL3 – Tên đầy đủ là TEAM GIA LAI 3. Đội tuyển Free Fire đại diện cho “Third Impact – Cú bùng nổ thứ ba”, nơi sức trẻ và sự táo bạo tạo nên những pha xử lý không theo bất kỳ quy luật nào. TGL3 không đi theo lối cũ-họ phá vỡ nó và tạo ra cuộc chơi của riêng mình tại Survival Legacy Cup SS1!",
        logo: "logo-tgl3.jpg",
        country: "", 
        players: [
            { n: "TGL3.DKHOI", a: "dkhoi.jpg", r: "RUSHER" },
            { n: "TGL3.HPHONG", a: "hphong.jpg", r: "RUSHER" },
            { n: "TGL3.GHAO", a: "ghao.jpg", r: "SNIPER" },
            { n: "TGL3.DKHOA", a: "dkhoa.jpg", r: "SNIPER" },
            { n: "TGL3.CPHAT", a: "cphat.jpg", r: "SUPPORT" }
        ]
    },
    "lt": {
        name: "LT",
        desc: "LT – Tên đầy đủ là LT Đội tuyển Free Fire đại diện cho “Last Trigger – Phát bắn cuối cùng”, nơi mọi pha giao tranh đều có thể kết thúc chỉ trong một khoảnh khắc. LT không cần nhiều cơ hội-chỉ cần một lần ra tay là đủ để định đoạt trận đấu tại Survival Legacy Cup SS1!",
        logo: "logo-lt.jpg",
        country: "", 
        players: [
            { n: "LT.HDANG", a: "hdang.jpg", r: "RUSHER" },
            { n: "LT.QDAT", a: "qdat.jpg", r: "BOMBER" },
            { n: "LT.PBAN", a: "pban.jpg", r: "SNIPER" },
            { n: "LT.HTINH", a: "htinh.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "ke": {
        name: "KE",
        desc: "KE – Tên đầy đủ là KE ESPORTS. Đội tuyển Free Fire đại diện cho “Killer Elegance – Sự kết liễu đầy tinh tế”, nơi mỗi pha xử lý vừa đẹp mắt vừa chí mạng. KE không chỉ thắng-họ biến từng khoảnh khắc trong trận đấu thành màn trình diễn đẳng cấp tại Survival Legacy Cup SS1!",
        logo: "logo-ke.jpg",
        country: "", 
        players: [
            { n: "KE.ITAR", a: "itar.jpg", r: "RUSHER" },
            { n: "KE.LUAN", a: "luan.jpg", r: "RIFLER" },
            { n: "KE.CUSINA", a: "cusina.jpg", r: "SNIPER" },
            { n: "KE.SIKIBIDI", a: "sikibidi.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "hd": {
        name: "HD",
        desc: "HD – Tên đầy đủ là Hoà Đam. Đội tuyển Free Fire đại diện cho “Heavy Damage – Sát thương hủy diệt”, nơi mỗi pha giao tranh đều mang sức công phá cực lớn. HD không cần kéo dài-họ kết thúc nhanh, gọn và đầy uy lực tại Survival Legacy Cup SS1!",
        logo: "logo-hd.jpg",
        country: "", 
        players: [
            { n: "HD.MKHANH", a: "mkhanh.jpg", r: "RUSHER" },
            { n: "HD.TAIBEO", a: "taibeo.jpg", r: "BOMBER" },
            { n: "HD.MINHHAI", a: "minhhai.jpg", r: "SNIPER" },
            { n: "HD.VANLONG", a: "vanlong.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "hd2": {
        name: "HD2",
        desc: "HD2 – Tên đầy đủ là Hoà Đam 2. Đội tuyển Free Fire đại diện cho “Double Impact – Cú đánh kép”, nơi mỗi pha tấn công đều dồn dập và liên hoàn. HD2 không cho đối thủ thời gian thích nghi-chỉ có áp lực và sụp đổ tại Survival Legacy Cup SS1!",
        logo: "logo-hd2.jpg",
        country: "", 
        players: [
            { n: "HD2.ANHHAO", a: "anhhao.jpg", r: "RUSHER" },
            { n: "HD2.HAI", a: "hai.jpg", r: "BOMBER" },
            { n: "HD2.MINHSANG", a: "minhsang.jpg", r: "SNIPER" },
            { n: "HD2.VANHIEU", a: "vanhieu.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "ns": {
        name: "NS",
        desc: "NS – Tên đầy đủ là NGUSI ESPORTS. Đội tuyển Free Fire đại diện cho “No Signal – Mất tín hiệu”, bởi khi NS xuất hiện, đối thủ gần như “mất kết nối” với trận đấu. Nhịp game bị bóp nghẹt, tầm nhìn bị kiểm soát và mọi thứ kết thúc trước khi kịp hiểu chuyện gì xảy ra tại Survival Legacy Cup SS1!",
        logo: "logo-ns.jpg",
        country: "", 
        players: [
            { n: "NS.MINHTRI2", a: "minhtri2.jpg", r: "RUSHER" },
            { n: "NS.PHAMCUONG", a: "phamcuong.jpg", r: "RUSHER" },
            { n: "NS.QUOCHUY", a: "quochuy.jpg", r: "RUSHER" },
            { n: "NS.MINHTRI", a: "minhtri.jpg", r: "SNIPER" },
            { n: "NS.TRANLONG", a: "tranlong.jpg", r: "SUPPORT" }
        ]
    },
    "ea": {
        name: "EA",
        desc: "EA – Tên đầy đủ là EAGLE. Đội tuyển Free Fire đại diện cho “Eagle Eye – Con mắt đại bàng”, luôn bao quát toàn bản đồ và ra đòn với độ chính xác tuyệt đối. EA không săn vội-họ quan sát, khóa mục tiêu và kết liễu trong một khoảnh khắc tại Survival Legacy Cup SS1!",
        logo: "logo-ea.jpg",
        country: "", 
        players: [
            { n: "EA.DUONG", a: "duong.jpg", r: "RUSHER" },
            { n: "EA.BRXZ", a: "brxz.jpg", r: "BOMBER" },
            { n: "EA.FREDA", a: "freda.jpg", r: "SNIPER" },
            { n: "EA.KHIM", a: "khim.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "xh": {
        name: "XH",
        desc: "XH – Tên đầy đủ là XH ESPORTS. Đội tuyển Free Fire đại diện cho “Xtreme Hunt – Cuộc săn cực hạn”, luôn truy đuổi đối thủ đến cùng và không cho bất kỳ cơ hội trốn thoát nào. XH không chỉ tìm mục tiêu—họ săn đến khi kết thúc hoàn toàn tại Survival Legacy Cup SS1!",
        logo: "logo-xh.jpg",
        country: "", 
        players: [
            { n: "XH.VHAO", a: "vanhao.jpg", r: "RUSHER" },
            { n: "XH.HUUNHAN", a: "huunhan.jpg", r: "RUSHER" },
            { n: "XH.VANLONG", a: "vanlong2.jpg", r: "BOMBER" },
            { n: "XH.GIABAO", a: "giabao.jpg", r: "SNIPER" },
            { n: "XH.DUYKHANH", a: "duykhanh.jpg", r: "SUPPORT" }
        ]
    },
    "ovn": {
        name: "OVN",
        desc: "OVN – Tên đầy đủ là OBLIVION. Đội tuyển Free Fire đại diện cho “Oblivion – Sự xóa sổ”, nơi mọi dấu vết của đối thủ đều bị quét sạch không thương tiếc. OVN không chỉ chiến thắng-họ khiến kẻ địch “biến mất” khỏi bản đồ tại Survival Legacy Cup SS1!",
        logo: "logo-ovn.jpg",
        country: "", 
        players: [
            { n: "OVN.DUY", a: "duy.jpg", r: "RUSHER" },
            { n: "OVN.VANTU", a: "vantu.jpg", r: "RUSHER" },
            { n: "OVN.TIEN", a: "tien.jpg", r: "SNIPER" },
            { n: "OVN.TINH", a: "tinh.jpg", r: "SNIPER" },
            { n: "OVN.TRACY", a: "tracy.jpg", r: "SUPPORT" }
        ]
    }
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
            // Đổi màu Role cho đẹp
            let badgeStyle = "background: #ffcc00; color: #000;"; 
            if(player.r === "BOMBER") badgeStyle = "background: #ff3366; color: #fff;"; 
            else if(player.r === "SUPPORT") badgeStyle = "background: #00ccff; color: #000;"; 
            else if(player.r === "SNIPER" || player.r === "SNIPPER") badgeStyle = "background: #ff9900; color: #000;"; 
            
            // Xây dựng thẻ Thông số 3D (ĐÃ XÓA 2 NÚT)
            container.innerHTML += `
                <div class="uzi-stat-card">
                    <div class="card-header">
                        <span class="stat-role-badge" style="${badgeStyle}">${player.r ? player.r : 'THÀNH VIÊN'}</span>
                        <span class="card-uzi-logo">SURVIVAL LEGACY CUP SS1</span>
                    </div>

                    <div class="card-body">
                        <div class="data-field">
                            <span class="data-label">TUYỂN THỦ</span>
                            <span class="data-value">${player.n}</span>
                        </div>
                        <div class="data-field" style="margin-bottom: 0;">
                            <span class="data-label">PLAYER ID</span>
                            <span class="data-value-id">${player.id ? player.id : 'DỮ LIỆU ĐANG CẬP NHẬT'}</span>
                        </div>
                    </div>
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