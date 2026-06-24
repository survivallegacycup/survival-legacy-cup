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
    // 1. Tính toán Ngày thi đấu và Trận trong ngày (Mỗi ngày 6 trận)
        ngayThiDau = Math.ceil(soTran / 6);
        tranTrongNgay = ((soTran - 1) % 6) + 1;

        // 2. Cập nhật Số Trận (Hiển thị TRẬN 1, TRẬN 2...)
        let tenTranEl = document.getElementById('ten-tran-dau');
        if (tenTranEl) tenTranEl.innerText = "TRẬN " + tranTrongNgay;

        // 3. Cập nhật NGÀY THI ĐẤU (Đã nối đúng ID của giao diện Neon)
        let dateEl = document.getElementById('ngay-thang-modal');
        if (dateEl) {
            const lichNgay = { 
                1: "21/05/2026", 2: "22/05/2026", 3: "23/05/2026", 
                4: "24/05/2026", 5: "25/05/2026", 6: "26/05/2026", 7: "27/05/2026" 
            };
            dateEl.innerText = lichNgay[ngayThiDau] || "21/05/2026";
        }

        // 4. Cập nhật GIỜ THI ĐẤU (Đã nối đúng ID của giao diện Neon)
        let timeEl = document.getElementById('gio-modal');
        if (timeEl) {
            const gioThiDau = { 
                1: "19:00", 2: "19:30", 3: "20:00", 
                4: "20:30", 5: "21:00", 6: "21:30" 
            };
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
    
   // Bắt đầu từ đoạn lấy header
        const headers = container.querySelectorAll('.g-header');
        container.innerHTML = '';
        
        // 1. TẠO HÀNG BỌC HEADER
        let headerRow = document.createElement('div');
        headerRow.className = 'g-row-header';
        headers.forEach(h => headerRow.appendChild(h));
        container.appendChild(headerRow);

        try {
            let linkHienTai = linkCacTran[soTran];
            if (!linkHienTai) return;
            
            const response = await fetch(linkHienTai);
            const data = await response.text();
            const rows = data.split('\n').slice(1);
            
            let booyahLogo = document.getElementById("logo-win-modal");
            let booyahName = document.getElementById("ten-win-modal");
            if (booyahLogo) booyahLogo.src = "https://placehold.co/80x80/222/FFF?text=?";
            if (booyahName) booyahName.innerText = "???";

            // BƯỚC A: ĐỌC DỮ LIỆU VÀ TÌM ĐIỂM CAO NHẤT (Để làm chuẩn cho Progress Bar)
            let danhSachDoi = [];
            let maxTongDiem = 0;

            for (let i = 0; i < rows.length; i++) {
                if (!rows[i] || rows[i].trim() === '') continue;
                const teamInfo = rows[i].split(',');
                let hang = teamInfo[0] ? teamInfo[0].trim() : '';
                let tenDoi = teamInfo[1] ? teamInfo[1].trim() : '';
                let diemTH = teamInfo[2] ? teamInfo[2].trim() : '';
                let diemKill = teamInfo[3] ? teamInfo[3].trim() : '';
                let tongDiem = teamInfo[4] ? teamInfo[4].trim() : '0';

                if (!tenDoi || tenDoi === 'ĐỘI TUYỂN' || tenDoi === 'ĐỘI') continue;

                let soDiem = parseInt(tongDiem) || 0;
                if (soDiem > maxTongDiem) maxTongDiem = soDiem; // Ghi nhận kỷ lục

                danhSachDoi.push({ hang, tenDoi, diemTH, diemKill, tongDiem: soDiem, rawTong: tongDiem });
            }

            // BƯỚC B: IN HTML CÙNG VỚI THANH PROGRESS BAR
            danhSachDoi.forEach((team, index) => {
                let logoThichHop = "logo-" + team.tenDoi.toLowerCase() + ".jpg";

                if (team.hang === "1" || team.hang === 1) {
                    if (booyahName) booyahName.innerText = team.tenDoi;
                    if (booyahLogo) booyahLogo.src = logoThichHop;
                }

                // Tính % chiều dài thanh điểm
                let phanTram = maxTongDiem > 0 ? (team.tongDiem / maxTongDiem) * 100 : 0;

                let htmlRow = `
                    <div class="g-row">
                        <div>${team.hang}</div>
                        <div>
                            <img src="${logoThichHop}" style="width:24px;height:24px;border-radius:6px;margin-right:10px;border:1px solid #00f0ff;object-fit:cover;"> 
                            ${team.tenDoi}
                        </div>
                        <div>${team.diemTH}</div>
                        <div>${team.diemKill}</div>
                        <div>${team.rawTong}</div>
                        
                        <div class="pts-bar-wrap">
                            <div class="pts-bar" id="bar-${index}" data-width="${phanTram}%"></div>
                        </div>
                    </div>
                `;
                container.innerHTML += htmlRow;
            });

            // BƯỚC C: KÍCH HOẠT ANIMATION CHẠY THANH ĐIỂM SAU KHI BẢNG ĐÃ MỞ
            setTimeout(() => {
                danhSachDoi.forEach((team, index) => {
                    let bar = document.getElementById(`bar-${index}`);
                    if (bar) bar.style.width = bar.getAttribute('data-width');
                });
            }, 100);

        } catch (error) {
            console.error("Lỗi khi load dữ liệu trận: ", error);
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
        desc: "UZI - Tên đầy đủ là UZI　LEGENDS. Đội tuyển mang hình tượng “song UZI khai hỏa”, tốc độ xả đạn nghẹt thở, dồn ép liên tục khiến đối thủ không kịp thở, vào giao tranh là quét sạch đội hình đối thủ trong tích tắc, thể hiện đẳng cấp “bắn nhanh – thắng nhanh” tại Survival Legacy Cup SS1!",
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
        desc: "KS – Tên đầy đủ là KINGS FF. Đội tuyển sở hữu lối chơi bản lĩnh và kỷ luật, luôn giữ thế trận ổn định và sẵn sàng áp đảo đối thủ để khẳng định vị thế “nhà vua” tại Survival Legacy Cup SS1!",
        logo: "logo-ks.jpg",
        country: "",
        players: [
            { n: "KS.GREAT", r: "RUSHER", id: "261423238" },
            { n: "KS.VPHAT", r: "RUSHER", id: "8534460998" },
            { n: "KS.CTHANG", r: "RUSHER", id: "9531598587" },
            { n: "KS.HLOC", r: "RIFLER", id: "8015399781" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "mao": {
        name: "MAO",
        desc: "MAO – Tên đầy đủ là MAO. Đội tuyển nổi bật với lối chơi nhanh, táo bạo và không ngại giao tranh, luôn tạo áp lực mạnh mẽ và sẵn sàng bùng nổ tại Survival Legacy Cup SS1!",
        logo: "logo-mao.jpg",
        country: "", 
        players: [
            { n: "MAO.ĐBIN", r: "RUSHER", id: "7017022761"},
            { n: "MAO.NTRI", r: "BOMBER", id: "9348528189"},
            { n: "MAO.QVINH", r: "SNIPER", id: "1183370030"},
            { n: "MAO.LEYNII?", r: "SUPPORT", id: " 561971260 "},
            { n: "MAO.SUN", r: "SUPPORT", id: "12225789596"}
        ]
    },
    "ft": {
        name: "FT",
        desc: "FT - Tên đầy đủ là Fearless Team. Đội tuyển luôn thi đấu với lòng quyết tâm, chiến thuật linh hoạt và tinh thần đồng đội mạnh mẽ. Chúng tôi hướng tới mục tiêu không chỉ là chiến thắng, mà còn là truyền cảm hứng cho cộng đồng tại Survival Legacy Cup SS1!",
        logo: "logo-ft.jpg",
        country: "", 
        players: [
            { n: "FT.W4U", r: "RUSHER", id: "6456961336" },
            { n: "FT.JVARZ", r: "BOMBER", id: "4363598414" },
            { n: "FT.THANHDAI", r: "SNIPER", id: "3659332602" },
            { n: "FT.MILLOW", r: "SUPPORT", id: "2444693631" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "wb": {
        name: "WB",
        desc: "WB - Tên đầy đủ là WIBU Esports. Đội tuyển với lối chơi trẻ trung, linh hoạt và giàu đột biến, thường xuyên tạo bất ngờ bằng những pha xử lý táo bạo và khả năng bứt phá mạnh mẽ tại Survival Legacy Cup SS1!",
        logo: "logo-wb.jpg", /* Nhớ gõ đúng tên file ảnh bạn vừa lưu ở Bước 1 */
        country: "", 
        players: [
            { n: "WB.K9", r: "RUSHER", id: "3890131812" },
            { n: "WB.BOI", r: "BOMBER", id: "9128936319" },
            { n: "WB.DMK", r: "SNIPER", id: "9625163973" },
            { n: "WB.PEPIN", r: "SUPPORT", id: "2598058404" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "tlk": {
        name: "TLK",
        desc: "TLK - Tên đầy đủ là Tú Lơ Khơ. Đội tuyển mang phong cách thi đấu ngẫu hứng nhưng đầy hiệu quả, nổi bật với những pha xử lý “khó đoán” và khả năng lật kèo ấn tượng tại Survival Legacy Cup SS1!",
        logo: "logo-tlk.jpg",
        country: "", 
        players: [
            { n: "TLK.DONTCRY", r: "RUSHER", id: "8974744042" },
            { n: "TLK.RAM", r: "BOMBER", id: "6787164998" },
            { n: "TLK.NTT", r: "SNIPER", id: "6489203171" },
            { n: "TLK.NGOCTIEN", r: "SUPPORT", id: "2514795764" },
            { n: "TLK.VANTUAN", r: "SUPPORT", id: "896939861" }
        ]
    },
    "uch": {
        name: "UCH",
        desc: "UCH - Tên đầy đủ là Uchiha. Đội tuyển mang phong cách lạnh lùng và chuẩn xác, nổi bật với khả năng kiểm soát giao tranh cùng những pha xử lý sắc bén, luôn sẵn sàng thiêu rụi đối thủ tại Survival Legacy Cup SS1!",
        logo: "logo-uch.jpg",
        country: "", 
        players: [
            { n: "UCH.HKIET", r: "RUSHER", id: "2706443747"},
            { n: "UCH.TDUY", r: "BOMBER", id: "9861347097" },
            { n: "UCH.TKIEN", r: "SNIPER", id: "12835295615"},
            { n: "UCH.XBAO", r: "SUPPORT", id: "9352178397" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "qc": {
        name: "QC",
        desc: "QC - Tên đầy đủ là Quyết Chiến Esports. Đội tuyển với tinh thần chiến đấu máu lửa, luôn chủ động giao tranh và không ngại va chạm, nổi bật với lối chơi quyết liệt và khả năng ép giao tranh mạnh mẽ tại Survival Legacy Cup SS1!",
        logo: "logo-qc.jpg",
        country: "", 
        players: [
            { n: "QC.KAME",  r: "RUSHER", id: "7169919048" },
            { n: "QC.DKHANG",  r: "RUSHER", id: "12662645082" },
            { n: "QC.NGHIEU", r: "BOMBER", id: "1868626947" },
            { n: "QC.CHIBUN",  r: "SNIPER", id: "6464845328" },
            { n: "QC.LAW", r: "SUPPORT", id: "13044258821" }
        ]
    },
    "kg": {
        name: "KG",
        desc: "KG – Tên đầy đủ là KG Esports. Đội tuyển thi đấu đầy bản lĩnh và kỷ luật, nổi bật với lối chơi chắc chắn, kiểm soát trận đấu tốt và khả năng phối hợp team cực kỳ ăn ý. Không chỉ mạnh ở kỹ năng cá nhân, họ còn sở hữu tư duy chiến thuật sắc bén, sẵn sàng bứt phá và làm chủ cuộc chơi ở những thời khắc quyết định tại Survival Legacy Cup SS1!",
        logo: "logo-kg.jpg",
        country: "", 
        players: [
            { n: "KG.TANPHAT", r: "RUSHER", id: "589071469"},
            { n: "KG.QUAN", r: "RUSHER", id: "7083435745" },
            { n: "KG.THINH", r: "SNIPER", id: "1211245755" },
            { n: "KG.HIEUDUC", r: "SUPPORT", id: "2073408899" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "nna": {
        name: "NNA",
        desc: "NNA - Tên đầy đủ là Nước Ngọt Academy. Đội tuyển mang phong cách “ngọt mà gắt”, vẻ ngoài nhẹ nhàng nhưng lối chơi cực kỳ khó chịu, sẵn sàng tung đòn kết liễu bất ngờ và khiến đối thủ “thấm đòn” tại Survival Legacy Cup SS1!",
        logo: "logo-nna.jpg",
        country: "", 
        players: [
            { n: "NNA.TCUONG", r: "RUSHER", id: "1246697946" },
            { n: "NNA.THDAT", r: "RUSHER", id: "3421297792" },
            { n: "NNA.DHAI", r: "BOMBER", id: "4184049752" },
            { n: "NNA.QMANH", r: "SUPPORT", id: "02645505986" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "bnn1": {
        name: "BNN1",
        desc: "BBN1 - Tên đầy đủ là Béc Nin No 1. Đội tuyển với khí chất dẫn đầu, lối chơi dứt khoát và đầy uy lực, luôn nhập cuộc với mục tiêu thống trị và khẳng định đẳng cấp số 1 tại Survival Legacy Cup SS1!",
        logo: "logo-bnn1.jpg",
        country: "", 
        players: [
            { n: "BNN1.HGIA", r: "RUSHER", id: "1716356557" },
            { n: "BNN1.TCONG", r: "BOMBER", id: "9774404730" },
            { n: "BNN1.VTAI", r: "SUPPORT", id: "9780579184" },
            { n: "BNN1.VLAP", r: "SNIPER", id: "1236791829" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "nnn": {
        name: "NNN",
        desc: "NNN - Tên đầy đủ là NO NO NO. Đội tuyển với tinh thần “nói không với thất bại”, nổi bật bởi lối chơi quyết đoán, áp lực liên tục và khả năng từ chối mọi cơ hội của đối thủ tại Survival Legacy Cup SS1!",
        logo: "logo-nnn.jpg",
        country: "", 
        players: [
            { n: "NNN.DINH", r: "RUSHER", id: "3011718064" },
            { n: "NNN.VANTAI", r: "RUSHER", id: "8102907685" },
            { n: "NNN.BMINH", r: "SNIPER", id: "6576055069" },
            { n: "NNN.NHATTIEN", r: "SUPPORT", id: "5389941711" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "t2al": {
        name: "T2AL",
        desc: "T2AL- Tên đầy đủ là T2AL Esports. Đội tuyển mang biểu tượng “số 2 bứt phá”, luôn âm thầm tích lũy sức mạnh trước khi tăng tốc mạnh mẽ, sẵn sàng vượt lên và chiếm lĩnh vị trí dẫn đầu tại Survival Legacy Cup SS1!",
        logo: "logo-t2al.jpg",
        country: "", 
        players: [
            { n: "T2AL.KTUAN", r: "RUSHER", id: "982519896" },
            { n: "T2AL.LHTUAN", r: "RUSHER", id: "1794081493" },
            { n: "T2AL.XQUYENN", r: "RIFLER", id: "8457251920" },
            { n: "T2AL.XUANLOC", r: "SNIPER", id: "9050876679" },
            { n: "T2AL.MINHANN",r: "SUPPORT", id: "3395103979" }
        ]
    },
    "tq": {
        name: "TQ",
        desc: "TQ - Tên đầy đủ là TQ Esports. Đội tuyển mang phong cách “im lặng nhưng kết liễu”, không ồn ào nhưng mỗi lần xuất hiện là một lần quét sạch, ra đòn ít nhưng chuẩn và cực kỳ chí mạng tại Survival Legacy Cup SS1.!",
        logo: "logo-tq.jpg",
        country: "", 
        players: [
            { n: "TQ.VKHANG", r: "RUSHER", id: "238934807" },
            { n: "TQ.SYHA", r: "RIFLER", id: "10039390084" },
            { n: "TQ.FAKE", r: "SNIPER", id: "8616363159" },
            { n: "TQ.MOICHOI", r: "SUPPORT", id: "1890915738" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG"}
        ]
    },
    "tgl": {
        name: "TGL",
        desc: "TGL - Tên đầy đủ là Team Gia Lai. Đội tuyển không chỉ thi đấu, họ “định hình” trận đấu theo cách của riêng mình. Với phong thái điềm tĩnh và những pha ra quyết định mang tính chuẩn mực, TGL luôn khiến chiến thắng trở thành điều tất yếu chứ không phải may mắn tại Survival Legacy Cup SS1!",
        logo: "logo-tgl.jpg",
        country: "", 
        players: [
            { n: "TGL.DEKAY", r: "RUSHER", id: "5529315258" },
            { n: "TGL.HDPE", r: "RUSHER", id: "248286997" },
            { n: "TGL.MUP", r: "BOMBER", id: "2984185398" },
            { n: "TGL.CUBA", r: "SNIPER", id: "4146302957" },
            { n: "TGL.NPHUNG", r: "SUPPORT", id: "363533799" }
        ]
    },
    "nvd": {
        name: "NVD",
        desc: "NVD - Tên đầy đủ là NEVERDIE. Đội tuyển với tinh thần chiến đấu không bỏ cuộc đúng như tên gọi. Lì lợm, bền bỉ và luôn chiến đến cùng, Neverdie cái tên luôn khiến đối thủ phải dè chừng mỗi khi bước vào trận tại Survival Legacy Cup SS1!",
        logo: "logo-nvd.jpg",
        country: "", 
        players: [
            { n: "NVD.QUOCHUY", r: "RUSHER", id: "1895472861" },
            { n: "NVD.PHAMCUONG", r: "RUSHER", id: "10808635533" },
            { n: "NVD.MINHTRI", r: "SPINER", id: "392420699" },
            { n: "NVD.TRANLONG", r: "SUPPORT", id: "1728096984" },
            { n: "NVD.QUOCMINH", r: "SUPPORT", id: "1921473584" }
        ]
    },
    "hp": {
        name: "HP",
        desc: "HP – Tên đầy đủ là HP ESPORTS. Đội tuyển mang phong cách thi đấu lạnh lùng và chuẩn xác. Không cần quá phô trương, HP luôn âm thầm tích lũy lợi thế và kết liễu trận đấu bằng những pha xử lý gọn gàng, dứt khoát tại Survival Legacy Cup SS1!",
        logo: "logo-hp.jpg",
        country: "", 
        players: [
            { n: "HP.PHUY", r: "RUSHER", id: "343473824" },
            { n: "HP.MLONG", r: "RUSHER", id: "30966128" },
            { n: "HP.HBAO", r: "BOMBER", id: "3117070335" },
            { n: "HP.HKIET", r: "SNIPER", id: "7533504927" },
            { n: "HP.ATUAN", r: "SUPPORT", id: "1824807835" }
        ]
    },
    "gods": {
        name: "GODS",
        desc: "GODS – Tên đầy đủ là GODS ESPORTS. Đội tuyển bước vào trận như những kẻ định đoạt số phận ván đấu. Mỗi pha di chuyển đều mang tính áp đặt, mỗi giao tranh đều là lời tuyên bố: đây là lãnh địa của GODS tại Survival Legacy Cup SS1!",
        logo: "logo-gods.jpg",
        country: "", 
        players: [
            { n: "GODS.BHUY", r: "RUSHER", id: "7286133977" },
            { n: "GODS.CHUY",r: "RUSHER", id: "5358748224" },
            { n: "GODS.KDUY", r: "SPINER", id: "9898703421" },
            { n: "GODS.TVAN", r: "SUPPORT", id: "4998752967" },
            { n: "GODS.GKIET", r: "SUPPORT", id: "6523254985" }
        ]
    },
    "whd": {
        name: "WHD",
        desc: "WHD - Tên đầy đủ là Vui Vẻ Hoà Đồng. Đội tuyển mang năng lượng tích cực vào từng trận đấu, nhưng đừng để sự vui vẻ đánh lừa, khi cần họ vẫn có thể bùng nổ và xoay chuyển cục diện theo cách không ai ngờ tới  tại Survival Legacy Cup SS1!",
        logo: "logo-whd.png",
        country: "", 
        players: [
            { n: "WHD.TUANANH", r: "RUSHER", id: "2015939299" },
            { n: "WHD.NGOCHAI", r: "BOMBER", id: "638649717" },
            { n: "WHD.THANHSON", r: "SNIPER", id: "4109105748" },
            { n: "WHD.NGOCCAC",r: "SNIPER", id: "2656003625" },
            { n: "WHD.HUUPHUOC", r: "SUPPORT", id: "6548727578" }
        ]
    },
    "arc": {
        name: "ARC",
        desc: "ARC – tên đầy đủ là ARCANE LEGION. Đội tuyển mang màu sắc huyền bí và khó lường, nơi mỗi bước di chuyển đều ẩn chứa toan tính. Với lối chơi tinh quái và khả năng tạo đột biến cao, ARC luôn khiến trận đấu xoay chiều theo cách rất “ma thuật” tại Survival Legacy Cup SS1!",
        logo: "logo-arc.jpg",
        country: "", 
        players: [
            { n: "ARC.HUY", r: "RUSHER", id: "3956442086" },
            { n: "ARC.MINHBOY", r: "BOMBER", id: "453404499" },
            { n: "ARC.DUNG", r: "SNIPER", id: "2812885077" },
            { n: "ARC.DONG", r: "SUPPORT", id: "3111464911" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "bne": {
        name: "BNE",
        desc: "BNE - Tên đầy đủ là BN ESPORT. Đội tuyển chơi theo kiểu “ít nhưng chất” — mỗi pha di chuyển đều có mục đích, mỗi giao tranh đều tính toán kỹ lưỡng. Không ồn ào, nhưng khi ra tay thì gần như không cho đối thủ cơ hội phản kháng tại Survival Legacy Cup SS1!",
        logo: "logo-bne.jpg",
        country: "", 
        players: [
            { n: "BNE.TUANAN", r: "RUSHER", id: "8368590729" },
            { n: "BNE.DPHONG", r: "BOMBER", id: "7930899723" },
            { n: "BNE.VINHKAKA", r: "BOMBER", id: "1231702254" },
            { n: "BNE.TNHAN", r: "SNIPER", id: "7506277174" },
            { n: "BNE.DBAO",  r: "SUPPORT", id: "9818033572" }
        ]
    },
    "cnct": {
        name: "CNCT",
        desc: "CNCT – Tên đầy đủ là CAINUOC CITY. Đội tuyển mang đậm chất đường phố với lối chơi táo bạo và không ngại va chạm. Luôn sẵn sàng lao vào giao tranh, CNCT biến mỗi trận đấu thành cuộc chiến thực thụ, nơi bản lĩnh được đặt lên hàng đầu tại Survival Legacy Cup SS1!",
        logo: "logo-cnct.jpg",
        country: "", 
        players: [
            { n: "CNCT.QN", r: "RUSHER", id: "109393806" },
            { n: "CNCT.CN", r: "RUSHER", id: "1503184563" },
            { n: "CNCT.KH",r: "RUSHER", id: "2519487267" },
            { n: "CNCT.SOI", r: "SNIPER", id: "12848040110" },
            { n: "CNCT.QUYEN", r: "SUPPORT", id: "12953668584" }
        ]
    },
    "btn": {
        name: "BTN",
        desc: "BTN - Tên đầy đủ là BTN. Đội tuyển mang phong cách thi đấu lạnh và lì, càng bị ép, họ càng nguy hiểm. Với những pha phản công sắc bén, BTN luôn biết cách biến thế trận bất lợi thành màn lật kèo đầy bất ngờ tại Survival Legacy Cup SS1!",
        logo: "logo-btn.jpg",
        country: "", 
        players: [
            { n: "BTN.TDUNG", r: "RUSHER", id: "1488596643" },
            { n: "BTN.VQUANG", r: "RUSHER", id: "5719612395" },
            { n: "BTN.TANH", r: "SNIPER", id: "2709719422" },
            { n: "BTN.HLONG", r: "SUPPORT", id: "8730416367" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "blx": {
        name: "BLX",
        desc: "BLX - Tên đầy đủ là BLITZX. Đội tuyển mang phong cách đánh nhanh, dồn dập đúng như cái tên “Blitz”. Không cho đối thủ thời gian thở, BLX luôn áp đảo nhịp trận bằng những pha tấn công chớp nhoáng và đầy uy lực tại Survival Legacy Cup SS1!",
        logo: "logo-blx.jpg",
        country: "", 
        players: [
            { n: "BLX.CP", r: "RUSHER", id: "2335381188" },
            { n: "BLX.CT", r: "RUSHER", id: "1943300913" },
            { n: "BLX.HT", r: "SNIPER", id: "7985693180" },
            { n: "BLX.TQ", r: "SNIPER", id: "600083928" },
            { n: "BLX.TC", r: "SUPPORT", id: "1586169125" }
        ]
    },
    "hre": {
        name: "HRE",
        desc: "HRE - Tên đầy đủ là HERO ESPORTS. Đội tuyển mang tinh thần của những “người hùng” thực thụ- luôn xuất hiện đúng lúc và tạo nên khác biệt. Với lối chơi bản lĩnh và những pha tỏa sáng cá nhân, HRE thường là nhân tố xoay chuyển cục diện trận đấu tại Survival Legacy Cup SS1!",
        logo: "logo-hre.jpg",
        country: "", 
        players: [
            { n: "HRE.RESFINA", r: "RUSHER", id: "1518845669" },
            { n: "HRE.COTU", r: "BOMBER", id: "6839933813" },
            { n: "HRE.TANHH", r: "SNIPER", id: "6153199502" },
            { n: "HRE.VANPHONG", r: "SUPPORT", id: "16899530216" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "pcm": {
        name: "PCM",
        desc: "PCM - Tên đầy đủ là PCM. Đội tuyển chơi như những “kẻ giật dây” phía sau trận đấu - không ồn ào nhưng luôn kiểm soát nhịp độ. Đến khi đối thủ nhận ra, mọi thứ đã nằm trọn trong thế trận của PCM tại Survival Legacy Cup SS1!",
        logo: "logo-pcm.jpg",
        country: "", 
        players: [
            { n: "PCM.APPOMEO", r: "RUSHER", id: "2215015375" },
            { n: "PCM.DZAI", r: "RUSHER", id: "949943695" },
            { n: "PCM.OGGY", r: "SNIPER", id: "8927718972" },
            { n: "PCM.K", r: "SUPPORT", id: "1222539985" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "dc": {
        name: "DC",
        desc: "DC - Tên đầy đủ là Diệt Cus. Đội tuyển mang phong cách thi đấu dứt khoát và đầy uy lực. Không vòng vo, mỗi pha hành động của DC đều như một đòn đánh chí mạng, nhanh gọn và đủ để định đoạt cục diện trận đấu Survival Legacy Cup SS1!",
        logo: "logo-dc.jpg",
        country: "", 
        players: [
            { n: "DC.PHAT", r: "RUSHER", id: "276351221" },
            { n: "DC.DONG", r: "RUSHER", id: "2447664617" },
            { n: "DC.KHANH", r: "SNIPER", id: "8857474561" },
            { n: "DC.HUNG", r: "SUPPORT", id: "2278495131" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "tgl2": {
        name: "TGL2",
        desc: "TGL2 - Tên đầy đủ là Team Gia Lai 2. Đội tuyển phiên bản trẻ trung nhưng không kém phần sắc bén của TGL - thi đấu với tinh thần máu lửa và khát khao khẳng định. Luôn sẵn sàng bùng nổ, TGL2 là ẩn số có thể tạo nên bất ngờ ở bất kỳ thời điểm nào tại Survival Legacy Cup SS1!",
        logo: "logo-tgl2.jpg",
        country: "", 
        players: [
            { n: "TGL2.DKHOI", r: "RUSHER", id: "955002794" },
            { n: "TGL2.HPHONG", r: "RUSHER", id: "3989001696" },
            { n: "TGL2.GHAO", r: "SNIPER", id: "4371542961" },
            { n: "TGL2.DKHOA", r: "SNIPER", id: "876012041" },
            { n: "TGL2.CPHAT", r: "SUPPORT", id: "9712450395" }
        ]
    },
    "se": {
        name: "SE",
        desc: "SE – Tên đầy đủ là SE ESPORTS. Đội tuyển thi đấu với phong thái lạnh như băng-ít sai lầm, nhiều áp lực. Mỗi bước di chuyển đều như siết dần không gian của đối thủ, đến khi nhận ra thì đã không còn đường lui tại Survival Legacy Cup SS1!",
        logo: "logo-se.jpg",
        country: "", 
        players: [
            { n: "SE.DONG", r: "RUSHER", id: "3111464911" },
            { n: "SE.MINHBOY", r: "RUSHER", id: "453404499" },
            { n: "SE.SON", r: "RUSHER", id: "1628027516" },
            { n: "SE.HUY", r: "BOMBER", id: "3966442086" },
            { n: "SE.DUNG", r: "SNIPER", id: "2812885077" }
        ]
    },
    "nok": {
        name: "NOK",
        desc: "NOK - Tên đầy đủ là NOKARA. Đội tuyển chơi theo kiểu “một đòn là đủ” - không cần nhiều pha giao tranh, chỉ cần đúng thời điểm. Lặng lẽ tích tụ, rồi bất ngờ tung cú kết liễu khiến đối thủ không kịp hiểu chuyện gì vừa xảy ra tại Survival Legacy Cup SS1!",
        logo: "logo-nok.jpg",
        country: "", 
        players: [
            { n: "NOK.THANHHUNG", r: "RUSHER", id: "1607088699" },
            { n: "NOK.THANHDAT", r: "RUSHER", id: "7941474305" },
            { n: "NOK.VVLAVIDA", r: "SNIPER", id: "3225479273" },
            { n: "NOK.MOUSE", r: "SNIPER", id: "1821218270" },
            { n: "NOK.DECADE", r: "SUPPORT", id: "1156181860" }
        ]
    },
    "wr": {
        name: "WR",
        desc: "WR - Tên đầy đủ là WARY ESPORTS. Đội tuyển luôn thi đấu trong trạng thái “cảnh giác tối đa” - từng bước di chuyển đều chặt chẽ, từng quyết định đều mang tính sống còn. Không dễ bị bắt bài, WR khiến đối thủ dần mắc sai lầm rồi trừng phạt bằng những pha xử lý lạnh lùng và chuẩn xác tại Survival Legacy Cup SS1!",
        logo: "logo-wr.jpg",
        country: "", 
        players: [
            { n: "WR.NH", r: "RUSHER", id: "2142110554" },
            { n: "WR.GINZ", r: "RIFLER", id: "7016299240" },
            { n: "WR.BRX1", r: "SNIPER", id: "4076949508" },
            { n: "WR.QUANHUY", r: "SUPPORT", id: "2286289594" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "4tl": {
        name: "4TL",
        desc: "4TL - Tên đầy đủ là 4TL. Đội tuyển đại diện cho “4 Tactics – 4 chiến thuật”, nơi mỗi thành viên là một mảnh ghép chiến lược hoàn chỉnh. Khi kết hợp, họ tạo nên thế trận đa hướng, biến mọi pha giao tranh thành màn áp đảo không thể chống đỡ tại Survival Legacy Cup SS1!",
        logo: "logo-4tl.jpg",
        country: "", 
        players: [
            { n: "4TL.PKHANH", r: "RUSHER", id: "673976563" },
            { n: "4TL.KING", r: "RIFLER", id: "3990065287" },
            { n: "4TL.THANHHUY", r: "BOMBER", id: "267718770" },
            { n: "4TL.MTAY", r: "SNIPER", id: "1444830129" },
            { n: "4TL.MNAM", r: "SUPPORT", id: "7567631186" }
        ]
    },
    "6it": {
        name: "6IT",
        desc: "6IT -  Tên đầy đủ là 6I TEAM. Đội tuyển đại diện cho “6 Instinct – 6 bản năng chiến đấu”, nơi mỗi quyết định đều dựa trên cảm giác và phản xạ đỉnh cao. Khi nhập cuộc, 6IT chơi như một thể thống nhất-nhanh, gắt và luôn đi trước đối thủ một nhịp tại Survival Legacy Cup SS1!",
        logo: "logo-6it.jpg",
        country: "", 
        players: [
            { n: "6IT.MKHANG", r: "RUSHER", id: "1274582211" },
            { n: "6IT.SUY", r: "RUSHER", id: "1230035221" },
            { n: "6IT.ANHDUC", r: "SNIPER", id: "2188993998" },
            { n: "6IT.THACH", r: "SNIPER", id: "11806045043" },
            { n: "6IT.HAU", r: "SUPPORT", id: "8294900883" }
        ]
    },
    "mb": {
        name: "MB",
        desc: "MB - Tên đầy đủ là MEMBES. Đội tuyển đại diện cho “Mind & Bullet – Trí tuệ và hỏa lực”, nơi chiến thuật và kỹ năng kết hợp hoàn hảo. Không chỉ bắn hay, MB còn thắng bằng cái đầu, biến mọi pha giao tranh thành nước đi đã được tính trước tại Survival Legacy Cup SS1!",
        logo: "logo-mb.jpg",
        country: "", 
        players: [
            { n: "MB.HIEU", r: "RUSHER", id: "34210900" },
            { n: "MB.DANGKHOA", r: "RIFLER", id: "679576072" },
            { n: "MB.NPHUNG", r: "BOMBER", id: "79343656218" },
            { n: "MB.QUOCKHANH", r: "SUPPORT", id: "2984185398" },
            { n: "MB.THAONHI", r: "SUPPORT", id: "9682496132" }
        ]
    },
    "km": {
        name: "KM",
        desc: "KM - Tên đầy đủ là KM ESPORTS. Đội tuyển đại diện cho “Killer Mind - Tư duy sát thủ”, nơi mọi quyết định đều nhanh, gọn và mang tính kết liễu. KM không chỉ chơi game, họ săn lùng cơ hội và dứt điểm đối thủ không chút do dự tại Survival Legacy Cup SS1!",
        logo: "logo-km.jpg",
        country: "", 
        players: [
            { n: "KM.HQN", r: "RUSHER", id: "3016983320" },
            { n: "KM.KCDON", r: "RIFLER", id: "2319234124" },
            { n: "KM.NGANDAO", r: "BOMBER", id: "4524940495" },
            { n: "KM.CRUSH", r: "SNIPER", id: "1890603447" },
            { n: "KM.MTHUAN", r: "SUPPORT", id: "5975854296" }
        ]
    },
    "4t": {
        name: "4T",
        desc: "4T – Tên đầy đủ là 4T ESPORTS. Đội tuyển đại diện cho “4 Triggers – 4 họng súng luôn sẵn sàng khai hỏa”, nơi mỗi thành viên là một điểm nổ có thể kích hoạt bất cứ lúc nào. Khi 4T nhập cuộc, trận đấu không còn là kiểm soát-mà là chuỗi phản ứng dây chuyền của những pha hủy diệt tại Survival Legacy Cup SS1!",
        logo: "logo-4t.jpg",
        country: "", 
        players: [
            { n: "4T.MINHNHAT", r: "RUSHER", id: "712500213" },
            { n: "4T.TRUONGAN", r: "BOMBER", id: "4359140364" },
            { n: "4T.NGOCCAC", r: "SNIPER", id: "2656003625" },
            { n: "4T.HOANGDUNG", r: "SUPPORT", id: "2543293151" },
            { n: "4T.BONG", r: "SUPPORT", id: "1836363131" }
        ]
    },
    "te": {
        name: "TE",
        desc: "TE – Tên đầy đủ là TOMESPORTS. Đội tuyển đại diện cho “Tactical Execution – Lối chơi chuẩn xác tuyệt đối”, nơi mọi pha xử lý đều được triển khai như một kịch bản hoàn hảo. TE không tạo ra cơ hội-họ tự viết nên thế trận và kết thúc nó theo cách của mình tại Survival Legacy Cup SS1!",
        logo: "logo-te.jpg",
        country: "", 
        players: [
            { n: "TE.SPEEDZ", r: "RUSHER", id: "5754555818" },
            { n: "TE.RENNO", r: "RUSHER", id: "3138080504" },
            { n: "TE.KOLIX", r: "BOMBER", id: "2094074229" },
            { n: "TE.TVL", r: "SNIPER", id: "60147504612" },
            { n: "TE.BEN10", r: "SUPPORT", id: "154415876" }
        ]
    },
    "lhdxb": {
        name: "LHDXB",
        desc: "LHDXB – Tên đầy đủ là LA HÁN ĐẨY XE BÒ. Đội tuyển đại diện cho “sức mạnh lì lợm và tiến công không ngừng”, như những La Hán kiên định đẩy thế trận tiến về phía trước. Không vội vàng nhưng không thể cản, LHDXB càng đánh càng ép, biến mọi trận đấu thành hành trình áp đảo tại Survival Legacy Cup SS1!",
        logo: "logo-lhdxb.jpg",
        country: "", 
        players: [
            { n: "LHDXB.NQUYEN", r: "RUSHER", id: "975051123" },
            { n: "LHDXB.MTOAN", r: "RUSHER", id: "4086920472" },
            { n: "LHDXB.NQUAN", r: "SNIPER", id: "6783878691" },
            { n: "LHDXB.HONGLINH", r: "SUPPORT", id: "3120683522" },
            { n: "LHDXB.CPHAT", r: "SUPPORT", id: "1815747167" }
        ]
    },
    "hkt": {
        name: "HKT",
        desc: "HKT – Tên đầy đủ là HKT. Đội tuyển đại diện cho “Hard Kill Team – Đội hình săn mạng không khoan nhượng”, nơi mọi giao tranh đều được đẩy lên cực điểm. HKT không chơi an toàn - họ lao vào, áp đảo và kết thúc đối thủ bằng những pha tấn công dồn dập tại Survival Legacy Cup SS1!",
        logo: "logo-hkt.jpg",
        country: "", 
        players: [
            { n: "6IT.MKHANG", r: "RUSHER", id: "1274582211" },
            { n: "6IT.SUY", r: "RUSHER", id: "1230035221" },
            { n: "6IT.ANHDUC", r: "SNIPER", id: "2188993998" },
            { n: "6IT.THACH", r: "SNIPER", id: "11806045043" },
            { n: "6IT.HAU", r: "SUPPORT", id: "8294900883" }
        ]
    },
    "tgl3": {
        name: "TGL3",
        desc: "TGL3 – Tên đầy đủ là TEAM GIA LAI 3. Đội tuyển đại diện cho “Third Impact – Cú bùng nổ thứ ba”, nơi sức trẻ và sự táo bạo tạo nên những pha xử lý không theo bất kỳ quy luật nào. TGL3 không đi theo lối cũ-họ phá vỡ nó và tạo ra cuộc chơi của riêng mình tại Survival Legacy Cup SS1!",
        logo: "logo-tgl3.jpg",
        country: "", 
        players: [
            { n: "TGL2.DKHOI", r: "RUSHER", id: "955002794" },
            { n: "TGL2.HPHONG", r: "RUSHER", id: "3989001696" },
            { n: "TGL2.GHAO", r: "SNIPER", id: "4371542961" },
            { n: "TGL2.DKHOA", r: "SNIPER", id: "876012041" },
            { n: "TGL2.CPHAT", r: "SUPPORT", id: "9712450395" }
        ]
    },
    "lt": {
        name: "LT",
        desc: "LT – Tên đầy đủ là LT Đội tuyển đại diện cho “Last Trigger – Phát bắn cuối cùng”, nơi mọi pha giao tranh đều có thể kết thúc chỉ trong một khoảnh khắc. LT không cần nhiều cơ hội-chỉ cần một lần ra tay là đủ để định đoạt trận đấu tại Survival Legacy Cup SS1!",
        logo: "logo-lt.jpg",
        country: "", 
        players: [
            { n: "LT.HDANG", r: "RUSHER", id: "4184330303" },
            { n: "LT.QDAT", r: "BOMBER", id: "4752316998" },
            { n: "LT.PBAN", r: "SNIPER", id: "10288568002" },
            { n: "LT.HTINH", r: "SUPPORT", id: "7984169749" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "ke": {
        name: "KE",
        desc: "KE – Tên đầy đủ là KE ESPORTS. Đội tuyển đại diện cho “Killer Elegance – Sự kết liễu đầy tinh tế”, nơi mỗi pha xử lý vừa đẹp mắt vừa chí mạng. KE không chỉ thắng-họ biến từng khoảnh khắc trong trận đấu thành màn trình diễn đẳng cấp tại Survival Legacy Cup SS1!",
        logo: "logo-ke.jpg",
        country: "", 
        players: [
            { n: "KE.ITAR", r: "RUSHER", id: "6309254787" },
            { n: "KE.LUAN", r: "RIFLER", id: "4461929512" },
            { n: "KE.CUSINA", r: "SNIPER", id: "4461929512" },
            { n: "KE.SIKIBIDI", r: "SUPPORT", id: "2421066275" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "hd": {
        name: "HD",
        desc: "HD – Tên đầy đủ là Hoà Đam. Đội tuyển đại diện cho “Heavy Damage – Sát thương hủy diệt”, nơi mỗi pha giao tranh đều mang sức công phá cực lớn. HD không cần kéo dài-họ kết thúc nhanh, gọn và đầy uy lực tại Survival Legacy Cup SS1!",
        logo: "logo-hd.jpg",
        country: "", 
        players: [
            { n: "HD.MKHANH", r: "RUSHER", id: "9607055670" },
            { n: "HD.TAIBEO", r: "BOMBER", id: "1332676822" },
            { n: "HD.MINHHAI", r: "SNIPER", id: "896345915" },
            { n: "HD.VANLONG", r: "SUPPORT", id: "1512501078" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "hd2": {
        name: "HD2",
        desc: "HD2 – Tên đầy đủ là Hoà Đam 2. Đội tuyển đại diện cho “Double Impact – Cú đánh kép”, nơi mỗi pha tấn công đều dồn dập và liên hoàn. HD2 không cho đối thủ thời gian thích nghi-chỉ có áp lực và sụp đổ tại Survival Legacy Cup SS1!",
        logo: "logo-hd2.jpg",
        country: "", 
        players: [
            { n: "HD2.ANHHAO", r: "RUSHER", id: "8795927885" },
            { n: "HD2.HAI",r: "BOMBER", id: "10818014400" },
            { n: "HD2.MINHSANG", r: "SNIPER", id: "1751028828" },
            { n: "HD2.VANHIEU", r: "SUPPORT", id: "9776458518" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "ns": {
        name: "NS",
        desc: "NS – Tên đầy đủ là NGUSI ESPORTS. Đội tuyển đại diện cho “No Signal – Mất tín hiệu”, bởi khi NS xuất hiện, đối thủ gần như “mất kết nối” với trận đấu. Nhịp game bị bóp nghẹt, tầm nhìn bị kiểm soát và mọi thứ kết thúc trước khi kịp hiểu chuyện gì xảy ra tại Survival Legacy Cup SS1!",
        logo: "logo-ns.jpg",
        country: "", 
        players: [
            { n: "NS.MINHTRI2", r: "RUSHER", id: "2038614210" },
            { n: "NS.PHAMCUONG", r: "RUSHER", id: "10808635533" },
            { n: "NS.QUOCHUY", r: "RUSHER", id: "1895472861" },
            { n: "NS.MINHTRI", r: "SNIPER", id: "392360699" },
            { n: "NS.TRANLONG", r: "SUPPORT", id: "1728096984" }
        ]
    },
    "ea": {
        name: "EA",
        desc: "EA – Tên đầy đủ là EAGLE. Đội tuyển đại diện cho “Eagle Eye – Con mắt đại bàng”, luôn bao quát toàn bản đồ và ra đòn với độ chính xác tuyệt đối. EA không săn vội-họ quan sát, khóa mục tiêu và kết liễu trong một khoảnh khắc tại Survival Legacy Cup SS1!",
        logo: "logo-ea.jpg",
        country: "", 
        players: [
            { n: "EA.DUONG", r: "RUSHER", id: "6029556071" },
            { n: "EA.BRXZ", r: "BOMBER", id: "8684104067" },
            { n: "EA.FREDA", r: "SNIPER", id: "6706995113" },
            { n: "EA.KHIM", r: "SUPPORT", id: "738994568" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "xh": {
        name: "XH",
        desc: "XH – Tên đầy đủ là XH ESPORTS. Đội tuyển đại diện cho “Xtreme Hunt – Cuộc săn cực hạn”, luôn truy đuổi đối thủ đến cùng và không cho bất kỳ cơ hội trốn thoát nào. XH không chỉ tìm mục tiêu—họ săn đến khi kết thúc hoàn toàn tại Survival Legacy Cup SS1!",
        logo: "logo-xh.jpg",
        country: "", 
        players: [
            { n: "XH.VHAO", r: "RUSHER", id: "8231699643" },
            { n: "XH.HUUNHAN", r: "RUSHER", id: "44772107941" },
            { n: "XH.VANLONG", r: "BOMBER", id: "7433774761" },
            { n: "XH.GIABAO", r: "SNIPER", id: "2129571314" },
            { n: "XH.DUYKHANH", r: "SUPPORT", id: "2205566148" }
        ]
    },
    "ovn": {
        name: "OVN",
        desc: "OVN – Tên đầy đủ là OBLIVION. Đội tuyển đại diện cho “Oblivion – Sự xóa sổ”, nơi mọi dấu vết của đối thủ đều bị quét sạch không thương tiếc. OVN không chỉ chiến thắng-họ khiến kẻ địch “biến mất” khỏi bản đồ tại Survival Legacy Cup SS1!",
        logo: "logo-ovn.jpg",
        country: "", 
        players: [
            { n: "OVN.DUY", r: "RUSHER", id: "12576856883" },
            { n: "OVN.VANTU", r: "RUSHER", id: "9881928946" },
            { n: "OVN.TIEN", r: "SNIPER", id: "12350586814" },
            { n: "OVN.TINH", r: "SNIPER", id: "8866941793" },
            { n: "OVN.TRACY", r: "SUPPORT", id: "8082886790" }
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
        // Thêm tham số 'index' để tính thời gian delay xuất hiện từng thẻ
        data.players.forEach((player, index) => { 
            
            // 1. Tự động chia màu Neon và Icon Emojis
            let neonColor = "rgba(100, 100, 100, "; // Xám mặc định
            let roleIcon = "🎮";
            let badgeStyle = "background: #555; color: #fff;";

            if (player.r === "RUSHER") {
                neonColor = "rgba(255, 0, 0, "; // Đỏ
                roleIcon = "⚔️";
                badgeStyle = "background: #ff0000; color: #fff;";
            } else if (player.r === "RIFLER") {
                neonColor = "rgba(0, 136, 255, "; // Xanh dương
                roleIcon = "🔫";
                badgeStyle = "background: #0088ff; color: #fff;";
            } else if (player.r === "BOMBER") {
                neonColor = "rgba(255, 204, 0, "; // Vàng
                roleIcon = "💣";
                badgeStyle = "background: #ffcc00; color: #000;";
            } else if (player.r === "SNIPER" || player.r === "SNIPPER") {
                neonColor = "rgba(0, 204, 68, "; // Xanh lá
                roleIcon = "🎯";
                badgeStyle = "background: #00cc44; color: #fff;";
            } else if (player.r === "SUPPORT") {
                neonColor = "rgba(255, 51, 204, "; // Hồng
                roleIcon = "🛡️";
                badgeStyle = "background: #ff33cc; color: #fff;";
            }

            // 2. Tính toán độ trễ (Delay) để bài ra từng lá bài một
            let delay = index * 0.15; // Mỗi người cách nhau 0.15 giây

            // 3. Xây dựng cấu trúc Thẻ (Truyền thẳng màu Neon vào CSS)
            container.innerHTML += `
                <div class="uzi-stat-card" style="
                    animation-delay: ${delay}s; 
                    --neon: ${neonColor} 0.8); 
                    --neon-dim: ${neonColor} 0.2);
                ">
                    <div class="card-header">
                        <span class="stat-role-badge" style="${badgeStyle}">${roleIcon} ${player.r ? player.r : 'THÀNH VIÊN'}</span>
                        <span class="card-uzi-logo" style="font-size: 9px; line-height: 1.3; text-align: right; color: #fff; text-shadow: 0 0 5px #fff;">
                            SURVIVAL LEGACY<br>CUP SS1
                        </span>
                    </div>

                    <div class="card-body">
                        <div class="data-field" style="margin-bottom: 15px;">
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
// =========================================================
// 1. SCROLL REVEAL (Trượt hàng giải đấu lên)
// =========================================================
const matchRows = document.querySelectorAll('.match-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
matchRows.forEach(row => observer.observe(row));

// =========================================================
// 2. HỆ THỐNG ÂM THANH CHUNG
// =========================================================
const hoverSound = document.getElementById("hoverSound");
const sfxHover = document.getElementById("sfxHover");
const sfxClick = document.getElementById("sfxClick");

// Tiếng tick cho hàng giải đấu
document.querySelectorAll('.match-item, .btn-stats, .login-btn').forEach(el => {
    el.addEventListener("mouseenter", () => {
        if(hoverSound) { hoverSound.currentTime = 0; hoverSound.play().catch(e => {}); }
    });
});

// Tiếng UI cho Modal Esports
document.querySelectorAll(".g-row, .nav-btn, .btn-back-top").forEach(el => {
    el.addEventListener("mouseenter", () => { 
        if(sfxHover) { sfxHover.currentTime = 0; sfxHover.volume = 0.5; sfxHover.play().catch(e => {}); }
    });
    el.addEventListener("click", () => { 
        if(sfxClick) { sfxClick.currentTime = 0; sfxClick.volume = 0.8; sfxClick.play().catch(e => {}); }
    });
});

// =========================================================
// 3. HIỆU ỨNG TÀN LỬA NỀN CAM (Trang chủ)
// =========================================================
const fireCanvas = document.getElementById('fireCanvas');
if (fireCanvas) {
    const ctxFire = fireCanvas.getContext('2d');
    let fw = fireCanvas.width = window.innerWidth;
    let fh = fireCanvas.height = window.innerHeight;
    let fires = [];
    for (let i = 0; i < 60; i++) {
        fires.push({
            x: Math.random() * fw, y: Math.random() * fh,
            r: Math.random() * 2 + 1, d: Math.random() * 100, speed: Math.random() * 2 + 0.5
        });
    }
    function drawFire() {
        ctxFire.clearRect(0, 0, fw, fh);
        ctxFire.fillStyle = "rgba(255, 80, 0, 0.8)";
        ctxFire.beginPath();
        fires.forEach((p) => {
            ctxFire.moveTo(p.x, p.y);
            ctxFire.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            p.y -= p.speed;
            p.x += Math.sin(p.d) * 0.5;
            p.d += 0.05;
            if (p.y < -10) p.y = fh + 10;
        });
        ctxFire.fill();
        requestAnimationFrame(drawFire);
    }
    drawFire();
    window.addEventListener("resize", () => { fw = fireCanvas.width = window.innerWidth; fh = fireCanvas.height = window.innerHeight; });
}

// =========================================================
// 4. HẠT BỤI NEON XANH (Trong bảng Thống số)
// =========================================================
const canvasModal = document.getElementById("particlesModal");
if (canvasModal) {
    const ctxModal = canvasModal.getContext("2d");
    function resizeCanvasModal() { canvasModal.width = canvasModal.offsetWidth; canvasModal.height = canvasModal.offsetHeight; }
    window.addEventListener('resize', resizeCanvasModal);
    setTimeout(resizeCanvasModal, 500);

    const pts = Array.from({length: 40}, () => ({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, a: Math.random() * 0.4 + 0.1
    }));

    function drawModalParticles() {
        const modal = document.getElementById("modal-thong-so");
        if (modal && modal.style.display !== "none") {
            if(canvasModal.width === 0) resizeCanvasModal();
            ctxModal.clearRect(0, 0, canvasModal.width, canvasModal.height);
            pts.forEach(p => {
                ctxModal.beginPath(); ctxModal.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctxModal.fillStyle = `rgba(0, 240, 255, ${p.a})`; ctxModal.fill();
                p.x += p.vx; p.y += p.vy;
                if(p.x < 0 || p.x > canvasModal.width) p.vx *= -1;
                if(p.y < 0 || p.y > canvasModal.height) p.vy *= -1;
            });
        }
        requestAnimationFrame(drawModalParticles);
    }
    drawModalParticles();
}
// =========================================================================
// CHỨC NĂNG BẢNG XẾP HẠNG V5 (LẮP LOGO TỰ ĐỘNG + ANIMATION + CHUYỂN BẢNG)
// =========================================================================

// 1. DỮ LIỆU ĐỘNG CHO 4 BẢNG (Đã cập nhật chuẩn 100% từ mã HTML của bạn)
const DU_LIEU_BXH_V5 = {
  'A': [
    {rank:1, name:"FT", booyah:3, kill:81, match:6, total:133},
    {rank:2, name:"WHD", booyah:1, kill:71, match:6, total:113},
    {rank:3, name:"CNCT", booyah:2, kill:42, match:6, total:91},
    {rank:4, name:"TQ", booyah:0, kill:32, match:6, total:72},
    {rank:5, name:"NNA", booyah:0, kill:32, match:6, total:61},
    {rank:6, name:"UZI", booyah:0, kill:30, match:6, total:58},
    {rank:7, name:"NNN", booyah:0, kill:24, match:6, total:55},
    {rank:8, name:"ARC", booyah:0, kill:18, match:6, total:37},
    {rank:9, name:"T2AL", booyah:0, kill:10, match:6, total:28},
    {rank:10, name:"KG", booyah:0, kill:10, match:6, total:24},
    {rank:11, name:"HP", booyah:0, kill:2, match:6, total:14},
    {rank:12, name:"BNE", booyah:0, kill:1, match:6, total:11}
  ],
  'B': [
    {rank:1, name:"QC", booyah:3, kill:93, match:6, total:146},
    {rank:2, name:"BNN1", booyah:1, kill:62, match:6, total:104},
    {rank:3, name:"GODS", booyah:0, kill:37, match:6, total:70},
    {rank:4, name:"TGL", booyah:2, kill:24, match:6, total:68},
    {rank:5, name:"TLK", booyah:0, kill:26, match:6, total:63},
    {rank:6, name:"MAO", booyah:0, kill:25, match:6, total:62},
    {rank:7, name:"NVD", booyah:0, kill:22, match:6, total:55},
    {rank:8, name:"BLX", booyah:0, kill:10, match:6, total:32},
    {rank:9, name:"UCH", booyah:0, kill:16, match:6, total:28},
    {rank:10, name:"WB", booyah:0, kill:8, match:6, total:20},
    {rank:11, name:"KS", booyah:0, kill:0, match:0, total:0},
    {rank:12, name:"BTN", booyah:0, kill:0, match:0, total:0}
  ],
  'C': [
    {rank:1, name:"4T", booyah:2, kill:36, match:6, total:81},
    {rank:2, name:"NOK", booyah:2, kill:29, match:6, total:71},
    {rank:3, name:"KM", booyah:0, kill:32, match:6, total:71},
    {rank:4, name:"WR", booyah:0, kill:31, match:6, total:66},
    {rank:5, name:"4TL", booyah:1, kill:32, match:6, total:65},
    {rank:6, name:"SE", booyah:0, kill:29, match:6, total:61},
    {rank:7, name:"TGL2", booyah:0, kill:26, match:6, total:57},
    {rank:8, name:"MB", booyah:0, kill:9, match:6, total:46},
    {rank:9, name:"PCM", booyah:0, kill:13, match:6, total:24},
    {rank:10, name:"6IT", booyah:0, kill:0, match:0, total:0},
    {rank:11, name:"HRE", booyah:0, kill:0, match:0, total:0},
    {rank:12, name:"DC", booyah:0, kill:0, match:0, total:0}
  ],
  'D': [
    {rank:1, name:"TGL3", booyah:2, kill:54, match:6, total:98},
    {rank:2, name:"TE", booyah:1, kill:56, match:6, total:94},
    {rank:3, name:"LT", booyah:0, kill:52, match:6, total:91},
    {rank:4, name:"NS", booyah:1, kill:42, match:6, total:86},
    {rank:5, name:"LHDXB", booyah:1, kill:44, match:6, total:83},
    {rank:6, name:"OVN", booyah:0, kill:42, match:6, total:70},
    {rank:7, name:"KE", booyah:0, kill:39, match:6, total:65},
    {rank:8, name:"HD2", booyah:1, kill:30, match:6, total:61},
    {rank:9, name:"XH", booyah:0, kill:26, match:6, total:45},
    {rank:10, name:"EA", booyah:0, kill:17, match:6, total:35},
    {rank:11, name:"HD", booyah:0, kill:23, match:6, total:31},
    {rank:12, name:"HKT", booyah:0, kill:9, match:6, total:20}
  ]
};

function getTierV5(rank){
  if(rank<=6) return { ac:"#00e5ff", sweep:"rgba(0,229,255,0.06)", bar:"#00e5ff", rowBg:"#020c14", nameBase:"#5ab8d8", nameHover:"#d0f8ff", rankBase:"#1e6080", rankHover:"#00e5ff", avaBase:"#001824", avaBorder:"#00e5ff22", avaHoverBg:"#002a38", avaHoverBorder:"#00e5ff88", totalBase:"#00e5ff", totalSize:15, killCol:"#22d3a5", booyahCol:"#e8b400" };
  if(rank<=9) return { ac:"#d060f0", sweep:"rgba(208,96,240,0.06)", bar:"#d060f0", rowBg:"#07020e", nameBase:"#9858b8", nameHover:"#e8c0ff", rankBase:"#5a2878", rankHover:"#d060f0", avaBase:"#0e0418", avaBorder:"#d060f022", avaHoverBg:"#1a0830", avaHoverBorder:"#d060f088", totalBase:"#c050e0", totalSize:14, killCol:"#22d3a599", booyahCol:"#e8b40099" };
  return { ac:"#40a0e0", sweep:"rgba(64,160,224,0.05)", bar:"#40a0e0", rowBg:"#02080f", nameBase:"#3a6888", nameHover:"#90c8e8", rankBase:"#1e4060", rankHover:"#40a0e0", avaBase:"#040e18", avaBorder:"#40a0e022", avaHoverBg:"#081828", avaHoverBorder:"#40a0e066", totalBase:"#3890c8", totalSize:13, killCol:"#22d3a566", booyahCol:"#e8b40066" };
}

function renderLeaderboardV5(bangId) {
  const teams = DU_LIEU_BXH_V5[bangId] || [];
  const podWrap = document.getElementById("podium");
  const restWrap = document.getElementById("rest-rows");
  
  if(!podWrap || !restWrap) return; // Nếu ko ở trang BXH thì bỏ qua
  
  podWrap.innerHTML = "";
  restWrap.innerHTML = "";
  if(teams.length === 0) return;

  const POD_CFG = [
    {teamIdx:1, podOrder:0, label:"HẠNG NHÌ", icon:"&#9670;", color:"#00c8ff", bg:"#00040e", border:"#00c8ff33", avaBg:"#001a2e", ringColor:"#00c8ff55", delay:350},
    {teamIdx:0, podOrder:1, label:"HẠNG NHẤT", icon:"&#9813;", color:"#e8b400", bg:"#0c0800", border:"#e8b40044", avaBg:"#1a1000", ringColor:"#e8b40066", delay:150},
    {teamIdx:2, podOrder:2, label:"HẠNG BA", icon:"&#9651;", color:"#ff6a00", bg:"#0c0400", border:"#ff6a0033", avaBg:"#1a0800", ringColor:"#ff6a0044", delay:550}
  ];

  POD_CFG.forEach(p => {
    if(!teams[p.teamIdx]) return;
    const t = teams[p.teamIdx];
    let logoThichHop = "logo-" + t.name.toLowerCase() + ".jpg"; // LOGO TỰ ĐỘNG

    const card = document.createElement("div");
    card.className = "pod-card";
    card.style.cssText = `background:${p.bg};border-color:${p.border};order:${p.podOrder};padding-top:${p.podOrder===1?'20px':'14px'}`;
    card.innerHTML = `<div class="pod-shine"></div>
      <div class="pod-no" style="color:${p.color}">${p.label}</div>
      <div class="pod-icon" style="color:${p.color}">${p.icon}</div>
      <div class="pod-ava" style="background:${p.avaBg};border-color:${p.color};">
        <div class="pod-ring" style="border-color:${p.ringColor}"></div>
        <img src="${logoThichHop}" style="width:100%;height:100%;border-radius:8px;object-fit:cover;position:relative;z-index:2;">
      </div>
      <div class="pod-name" style="color:${p.color};text-shadow:0 0 18px ${p.color}66">${t.name}</div>
      <div class="pod-pts" style="color:${p.color};text-shadow:0 0 24px ${p.color}77">${t.total}</div>
      <div class="pod-ptslbl">tổng điểm</div>
      <div class="pod-stats">
        <div class="ps-item"><span class="ps-v" style="color:${p.color}99">${t.booyah}</span><span class="ps-l">BOOYAH</span></div>
        <div class="ps-item"><span class="ps-v" style="color:#22d3a5">${t.kill}</span><span class="ps-l">HẠ GỤC</span></div>
        <div class="ps-item"><span class="ps-v" style="color:#3a6080">${t.match}</span><span class="ps-l">TRẬN</span></div>
      </div>`;
    podWrap.appendChild(card);
    setTimeout(() => card.classList.add("show"), p.delay);
  });

  const maxTotal = teams[0].total;
  teams.slice(3).forEach((t, i) => {
    if(i === 3) {
      const cut = document.createElement("div");
      cut.className = "qual-cut";
      cut.innerHTML = '<span class="cut-lbl">VÒNG LOẠI</span>';
      restWrap.appendChild(cut);
    }
    
    let logoThichHop = "logo-" + t.name.toLowerCase() + ".jpg"; // LOGO TỰ ĐỘNG
    const tier = getTierV5(t.rank);
    
    const row = document.createElement("div");
    row.className = "rest-row";
    row.style.background = tier.rowBg;
    row.innerHTML = `
      <div class="rr-sweep" style="background:${tier.sweep}"></div>
      <div class="rr-bar" style="background:${tier.bar}"></div>
      <div class="rr-rank" style="color:${tier.rankBase}">${t.rank}</div>
      <div class="rr-team">
        <div class="rr-ava" style="background:${tier.avaBase};border:1px solid ${tier.avaBorder};">
            <img src="${logoThichHop}" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
        </div>
        <span class="rr-name" style="color:${tier.nameBase}">${t.name}</span>
      </div>
      <div class="rr-val" style="color:${tier.booyahCol}">${t.booyah}</div>
      <div class="rr-val" style="color:${tier.killCol}">${t.kill}</div>
      <div class="rr-val" style="color:#2a4a6a">${t.match}</div>
      <div class="rr-total" style="color:${tier.totalBase};font-size:${tier.totalSize}px">${t.total}</div>
      <div class="prog-wrap"><div class="prog" id="p${bangId}-${i}" style="background:${tier.bar}77"></div></div>`;

    const rn = row.querySelector(".rr-rank"), nm = row.querySelector(".rr-name");
    const av = row.querySelector(".rr-ava"), tot = row.querySelector(".rr-total");
    row.addEventListener("mouseenter", () => {
      rn.style.color = tier.rankHover; nm.style.color = tier.nameHover;
      av.style.background = tier.avaHoverBg; av.style.borderColor = tier.avaHoverBorder;
      tot.style.color = "#fff"; tot.style.textShadow = `0 0 14px ${tier.ac}cc`; tot.style.fontSize = (tier.totalSize+1)+"px";
    });
    row.addEventListener("mouseleave", () => {
      rn.style.color = tier.rankBase; nm.style.color = tier.nameBase;
      av.style.background = tier.avaBase; av.style.borderColor = tier.avaBorder;
      tot.style.color = tier.totalBase; tot.style.textShadow = "none"; tot.style.fontSize = tier.totalSize+"px";
    });

    restWrap.appendChild(row);
    setTimeout(() => {
      row.classList.add("show");
      setTimeout(() => {
        const p = document.getElementById(`p${bangId}-${i}`);
        if(p) p.style.width = Math.round(t.total/maxTotal*100) + "%";
      }, 200);
    }, 750 + i * 65);
  });
}

// Bắt sự kiện Click nút chuyển Bảng
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("on"));
    this.classList.add("on");
    renderLeaderboardV5(this.getAttribute("data-bang"));
  });
});

// Chạy mặc định Bảng A nếu đang ở trang Bảng Xếp Hạng
if(document.getElementById("bxh-root")) {
    renderLeaderboardV5('A');
}
// =========================================================================
// CHỨC NĂNG BẢNG XẾP HẠNG BÁN KẾT (21 ĐỘI)
// =========================================================================

const DU_LIEU_BANKET = [
  {rank:1, name:"TE", booyah:4, kill:86, match:6, total:144},
  {rank:2, name:"WHD", booyah:3, kill:70, match:6, total:123},
  {rank:3, name:"NS", booyah:1, kill:61, match:6, total:108},
  {rank:4, name:"TGL3", booyah:1, kill:52, match:6, total:95},
  {rank:5, name:"FT", booyah:1, kill:54, match:6, total:89},
  {rank:6, name:"NOK", booyah:0, kill:47, match:6, total:85},
  {rank:7, name:"4T", booyah:0, kill:44, match:6, total:75},
  {rank:8, name:"NNA", booyah:0, kill:39, match:6, total:66},
  {rank:9, name:"CNCT", booyah:0, kill:42, match:6, total:66},
  {rank:10, name:"GODS", booyah:0, kill:31, match:6, total:65},
  {rank:11, name:"LHDXB", booyah:1, kill:23, match:6, total:64},
  {rank:12, name:"TGL", booyah:0, kill:23, match:6, total:59},
  {rank:13, name:"MAO", booyah:0, kill:21, match:6, total:51},
  {rank:14, name:"LT", booyah:0, kill:24, match:6, total:51},
  {rank:15, name:"TLK", booyah:0, kill:25, match:6, total:49},
  {rank:16, name:"KM", booyah:0, kill:30, match:6, total:49},
  {rank:17, name:"UZI", booyah:1, kill:20, match:6, total:43},
  {rank:18, name:"WR", booyah:0, kill:12, match:6, total:38},
  {rank:19, name:"OVN", booyah:0, kill:7, match:6, total:30},
  {rank:20, name:"SE", booyah:0, kill:8, match:6, total:28},
  {rank:21, name:"BNN1", booyah:0, kill:8, match:6, total:22}
];

// Hàm lấy màu cho bảng Bán Kết (Nới màu Tím tới Top 12)
function getTierBK(rank){
  if(rank<=6) return { ac:"#00e5ff", sweep:"rgba(0,229,255,0.06)", bar:"#00e5ff", rowBg:"#020c14", nameBase:"#5ab8d8", nameHover:"#d0f8ff", rankBase:"#1e6080", rankHover:"#00e5ff", avaBase:"#001824", avaBorder:"#00e5ff22", avaHoverBg:"#002a38", avaHoverBorder:"#00e5ff88", totalBase:"#00e5ff", totalSize:15, killCol:"#22d3a5", booyahCol:"#e8b400" };
  if(rank<=12) return { ac:"#d060f0", sweep:"rgba(208,96,240,0.06)", bar:"#d060f0", rowBg:"#07020e", nameBase:"#9858b8", nameHover:"#e8c0ff", rankBase:"#5a2878", rankHover:"#d060f0", avaBase:"#0e0418", avaBorder:"#d060f022", avaHoverBg:"#1a0830", avaHoverBorder:"#d060f088", totalBase:"#c050e0", totalSize:14, killCol:"#22d3a599", booyahCol:"#e8b40099" };
  return { ac:"#40a0e0", sweep:"rgba(64,160,224,0.05)", bar:"#40a0e0", rowBg:"#02080f", nameBase:"#3a6888", nameHover:"#90c8e8", rankBase:"#1e4060", rankHover:"#40a0e0", avaBase:"#040e18", avaBorder:"#40a0e022", avaHoverBg:"#081828", avaHoverBorder:"#40a0e066", totalBase:"#3890c8", totalSize:13, killCol:"#22d3a566", booyahCol:"#e8b40066" };
}

function renderBanket() {
  const podWrap = document.getElementById("podium-banket");
  const restWrap = document.getElementById("rest-rows-banket");
  if(!podWrap || !restWrap) return;

  const POD_CFG = [
    {teamIdx:1, podOrder:0, label:"HẠNG NHÌ", icon:"&#9670;", color:"#00c8ff", bg:"#00040e", border:"#00c8ff33", avaBg:"#001a2e", ringColor:"#00c8ff55", delay:350},
    {teamIdx:0, podOrder:1, label:"HẠNG NHẤT", icon:"&#9813;", color:"#e8b400", bg:"#0c0800", border:"#e8b40044", avaBg:"#1a1000", ringColor:"#e8b40066", delay:150},
    {teamIdx:2, podOrder:2, label:"HẠNG BA", icon:"&#9651;", color:"#ff6a00", bg:"#0c0400", border:"#ff6a0033", avaBg:"#1a0800", ringColor:"#ff6a0044", delay:550}
  ];

  POD_CFG.forEach(p => {
    const t = DU_LIEU_BANKET[p.teamIdx];
    let logoThichHop = "logo-" + t.name.toLowerCase() + ".jpg";
    const card = document.createElement("div");
    card.className = "pod-card";
    card.style.cssText = `background:${p.bg};border-color:${p.border};order:${p.podOrder};padding-top:${p.podOrder===1?'20px':'14px'}`;
    card.innerHTML = `<div class="pod-shine"></div>
      <div class="pod-no" style="color:${p.color}">${p.label}</div>
      <div class="pod-icon" style="color:${p.color}">${p.icon}</div>
      <div class="pod-ava" style="background:${p.avaBg};border-color:${p.color};">
        <div class="pod-ring" style="border-color:${p.ringColor}"></div>
        <img src="${logoThichHop}" style="width:100%;height:100%;border-radius:8px;object-fit:cover;position:relative;z-index:2;">
      </div>
      <div class="pod-name" style="color:${p.color};text-shadow:0 0 18px ${p.color}66">${t.name}</div>
      <div class="pod-pts" style="color:${p.color};text-shadow:0 0 24px ${p.color}77">${t.total}</div>
      <div class="pod-ptslbl">tổng điểm</div>
      <div class="pod-stats">
        <div class="ps-item"><span class="ps-v" style="color:${p.color}99">${t.booyah}</span><span class="ps-l">BOOYAH</span></div>
        <div class="ps-item"><span class="ps-v" style="color:#22d3a5">${t.kill}</span><span class="ps-l">HẠ GỤC</span></div>
        <div class="ps-item"><span class="ps-v" style="color:#3a6080">${t.match}</span><span class="ps-l">TRẬN</span></div>
      </div>`;
    podWrap.appendChild(card);
    setTimeout(() => card.classList.add("show"), p.delay);
  });

  const maxTotal = DU_LIEU_BANKET[0].total;
  DU_LIEU_BANKET.slice(3).forEach((t, i) => {
    // Top 12 (sau khi cắt Top 3) nằm ở vị trí index = 9
    if(i === 9) {
      const cut = document.createElement("div");
      cut.className = "qual-cut";
      cut.innerHTML = '<span class="cut-lbl" style="color:#ff2a2a; border: 1px solid #ff2a2a44; border-radius: 4px;">CHUNG KẾT</span>';
      restWrap.appendChild(cut);
    }
    
    let logoThichHop = "logo-" + t.name.toLowerCase() + ".jpg";
    const tier = getTierBK(t.rank);
    const row = document.createElement("div");
    row.className = "rest-row";
    row.style.background = tier.rowBg;
    row.innerHTML = `
      <div class="rr-sweep" style="background:${tier.sweep}"></div>
      <div class="rr-bar" style="background:${tier.bar}"></div>
      <div class="rr-rank" style="color:${tier.rankBase}">${t.rank}</div>
      <div class="rr-team">
        <div class="rr-ava" style="background:${tier.avaBase};border:1px solid ${tier.avaBorder};">
            <img src="${logoThichHop}" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
        </div>
        <span class="rr-name" style="color:${tier.nameBase}">${t.name}</span>
      </div>
      <div class="rr-val" style="color:${tier.booyahCol}">${t.booyah}</div>
      <div class="rr-val" style="color:${tier.killCol}">${t.kill}</div>
      <div class="rr-val" style="color:#2a4a6a">${t.match}</div>
      <div class="rr-total" style="color:${tier.totalBase};font-size:${tier.totalSize}px">${t.total}</div>
      <div class="prog-wrap"><div class="prog" id="pbk-${i}" style="background:${tier.bar}77"></div></div>`;

    const rn = row.querySelector(".rr-rank"), nm = row.querySelector(".rr-name");
    const av = row.querySelector(".rr-ava"), tot = row.querySelector(".rr-total");
    row.addEventListener("mouseenter", () => {
      rn.style.color = tier.rankHover; nm.style.color = tier.nameHover;
      av.style.background = tier.avaHoverBg; av.style.borderColor = tier.avaHoverBorder;
      tot.style.color = "#fff"; tot.style.textShadow = `0 0 14px ${tier.ac}cc`; tot.style.fontSize = (tier.totalSize+1)+"px";
    });
    row.addEventListener("mouseleave", () => {
      rn.style.color = tier.rankBase; nm.style.color = tier.nameBase;
      av.style.background = tier.avaBase; av.style.borderColor = tier.avaBorder;
      tot.style.color = tier.totalBase; tot.style.textShadow = "none"; tot.style.fontSize = tier.totalSize+"px";
    });

    restWrap.appendChild(row);
    setTimeout(() => {
      row.classList.add("show");
      setTimeout(() => {
        const p = document.getElementById(`pbk-${i}`);
        if(p) p.style.width = Math.round(t.total/maxTotal*100) + "%";
      }, 200);
    }, 750 + i * 50);
  });
}

// Khởi chạy Bán Kết khi trang load
renderBanket();
// =========================================================================
// CHỨC NĂNG BẢNG XẾP HẠNG CHUNG KẾT (12 ĐỘI)
// =========================================================================

const DU_LIEU_CHUNGKET = [
  {rank:1, name:"FT", booyah:0, kill:78, match:6, total:124},
  {rank:2, name:"TGL", booyah:2, kill:59, match:6, total:111},
  {rank:3, name:"4T", booyah:0, kill:45, match:6, total:82},
  {rank:4, name:"NS", booyah:1, kill:47, match:6, total:81},
  {rank:5, name:"TGL3", booyah:1, kill:29, match:6, total:67},
  {rank:6, name:"TE", booyah:1, kill:41, match:6, total:64},
  {rank:7, name:"LHDXB", booyah:1, kill:19, match:6, total:45},
  {rank:8, name:"NNA", booyah:0, kill:17, match:6, total:42},
  {rank:9, name:"GODS", booyah:0, kill:24, match:6, total:40},
  {rank:10, name:"NOK", booyah:0, kill:11, match:6, total:33},
  {rank:11, name:"WHD", booyah:0, kill:12, match:6, total:19},
  {rank:12, name:"CNCT", booyah:0, kill:1, match:6, total:7}
];

// Dùng chung bảng màu V5 chuẩn Esports
function getTierCK(rank){
  if(rank<=6) return { ac:"#00e5ff", sweep:"rgba(0,229,255,0.06)", bar:"#00e5ff", rowBg:"#020c14", nameBase:"#5ab8d8", nameHover:"#d0f8ff", rankBase:"#1e6080", rankHover:"#00e5ff", avaBase:"#001824", avaBorder:"#00e5ff22", avaHoverBg:"#002a38", avaHoverBorder:"#00e5ff88", totalBase:"#00e5ff", totalSize:15, killCol:"#22d3a5", booyahCol:"#e8b400" };
  if(rank<=9) return { ac:"#d060f0", sweep:"rgba(208,96,240,0.06)", bar:"#d060f0", rowBg:"#07020e", nameBase:"#9858b8", nameHover:"#e8c0ff", rankBase:"#5a2878", rankHover:"#d060f0", avaBase:"#0e0418", avaBorder:"#d060f022", avaHoverBg:"#1a0830", avaHoverBorder:"#d060f088", totalBase:"#c050e0", totalSize:14, killCol:"#22d3a599", booyahCol:"#e8b40099" };
  return { ac:"#40a0e0", sweep:"rgba(64,160,224,0.05)", bar:"#40a0e0", rowBg:"#02080f", nameBase:"#3a6888", nameHover:"#90c8e8", rankBase:"#1e4060", rankHover:"#40a0e0", avaBase:"#040e18", avaBorder:"#40a0e022", avaHoverBg:"#081828", avaHoverBorder:"#40a0e066", totalBase:"#3890c8", totalSize:13, killCol:"#22d3a566", booyahCol:"#e8b40066" };
}

function renderChungKet() {
  const podWrap = document.getElementById("podium-chungket");
  const restWrap = document.getElementById("rest-rows-chungket");
  if(!podWrap || !restWrap) return;

  // Cấu hình Podium: Đổi danh hiệu và màu cho Nhà Vô Địch
  const POD_CFG = [
    {teamIdx:1, podOrder:0, label:"Á QUÂN", icon:"&#9670;", color:"#00c8ff", bg:"#00040e", border:"#00c8ff33", avaBg:"#001a2e", ringColor:"#00c8ff55", delay:350},
    {teamIdx:0, podOrder:1, label:"NHÀ VÔ ĐỊCH", icon:"&#9813;", color:"#ffcc00", bg:"#141000", border:"#ffcc0066", avaBg:"#241a00", ringColor:"#ffcc0088", delay:150},
    {teamIdx:2, podOrder:2, label:"QUÝ QUÂN", icon:"&#9651;", color:"#ff6a00", bg:"#0c0400", border:"#ff6a0033", avaBg:"#1a0800", ringColor:"#ff6a0044", delay:550}
  ];

  POD_CFG.forEach(p => {
    const t = DU_LIEU_CHUNGKET[p.teamIdx];
    let logoThichHop = "logo-" + t.name.toLowerCase() + ".jpg";
    const card = document.createElement("div");
    card.className = "pod-card";
    card.style.cssText = `background:${p.bg};border-color:${p.border};order:${p.podOrder};padding-top:${p.podOrder===1?'20px':'14px'}`;
    
    // Nếu là Nhà Vô Địch, thêm hiệu ứng text rực rỡ hơn
    let ptsStyle = p.podOrder === 1 ? `color:${p.color};text-shadow:0 0 30px ${p.color}; font-size: 34px;` : `color:${p.color};text-shadow:0 0 24px ${p.color}77`;

    card.innerHTML = `<div class="pod-shine"></div>
      <div class="pod-no" style="color:${p.color}">${p.label}</div>
      <div class="pod-icon" style="color:${p.color}">${p.icon}</div>
      <div class="pod-ava" style="background:${p.avaBg};border-color:${p.color};">
        <div class="pod-ring" style="border-color:${p.ringColor}"></div>
        <img src="${logoThichHop}" style="width:100%;height:100%;border-radius:8px;object-fit:cover;position:relative;z-index:2;">
      </div>
      <div class="pod-name" style="color:${p.color};text-shadow:0 0 18px ${p.color}66">${t.name}</div>
      <div class="pod-pts" style="${ptsStyle}">${t.total}</div>
      <div class="pod-ptslbl">tổng điểm</div>
      <div class="pod-stats">
        <div class="ps-item"><span class="ps-v" style="color:${p.color}99">${t.booyah}</span><span class="ps-l">BOOYAH</span></div>
        <div class="ps-item"><span class="ps-v" style="color:#22d3a5">${t.kill}</span><span class="ps-l">HẠ GỤC</span></div>
        <div class="ps-item"><span class="ps-v" style="color:#3a6080">${t.match}</span><span class="ps-l">TRẬN</span></div>
      </div>`;
    podWrap.appendChild(card);
    setTimeout(() => card.classList.add("show"), p.delay);
  });

  const maxTotal = DU_LIEU_CHUNGKET[0].total;
  DU_LIEU_CHUNGKET.slice(3).forEach((t, i) => {
    let logoThichHop = "logo-" + t.name.toLowerCase() + ".jpg";
    const tier = getTierCK(t.rank);
    const row = document.createElement("div");
    row.className = "rest-row";
    row.style.background = tier.rowBg;
    row.innerHTML = `
      <div class="rr-sweep" style="background:${tier.sweep}"></div>
      <div class="rr-bar" style="background:${tier.bar}"></div>
      <div class="rr-rank" style="color:${tier.rankBase}">${t.rank}</div>
      <div class="rr-team">
        <div class="rr-ava" style="background:${tier.avaBase};border:1px solid ${tier.avaBorder};">
            <img src="${logoThichHop}" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
        </div>
        <span class="rr-name" style="color:${tier.nameBase}">${t.name}</span>
      </div>
      <div class="rr-val" style="color:${tier.booyahCol}">${t.booyah}</div>
      <div class="rr-val" style="color:${tier.killCol}">${t.kill}</div>
      <div class="rr-val" style="color:#2a4a6a">${t.match}</div>
      <div class="rr-total" style="color:${tier.totalBase};font-size:${tier.totalSize}px">${t.total}</div>
      <div class="prog-wrap"><div class="prog" id="pck-${i}" style="background:${tier.bar}77"></div></div>`;

    const rn = row.querySelector(".rr-rank"), nm = row.querySelector(".rr-name");
    const av = row.querySelector(".rr-ava"), tot = row.querySelector(".rr-total");
    row.addEventListener("mouseenter", () => {
      rn.style.color = tier.rankHover; nm.style.color = tier.nameHover;
      av.style.background = tier.avaHoverBg; av.style.borderColor = tier.avaHoverBorder;
      tot.style.color = "#fff"; tot.style.textShadow = `0 0 14px ${tier.ac}cc`; tot.style.fontSize = (tier.totalSize+1)+"px";
    });
    row.addEventListener("mouseleave", () => {
      rn.style.color = tier.rankBase; nm.style.color = tier.nameBase;
      av.style.background = tier.avaBase; av.style.borderColor = tier.avaBorder;
      tot.style.color = tier.totalBase; tot.style.textShadow = "none"; tot.style.fontSize = tier.totalSize+"px";
    });

    restWrap.appendChild(row);
    setTimeout(() => {
      row.classList.add("show");
      setTimeout(() => {
        const p = document.getElementById(`pck-${i}`);
        if(p) p.style.width = Math.round(t.total/maxTotal*100) + "%";
      }, 200);
    }, 750 + i * 65);
  });
}

// Khởi chạy Chung Kết khi trang load
renderChungKet();