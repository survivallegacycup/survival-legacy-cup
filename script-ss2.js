/* ================= PHẦN 1: BẢNG THÔNG SỐ (TRANG LỊCH THI ĐẤU) ================= */
// Nhớ dán link Google Sheets của bạn vào đây nha:
const linkCacTran = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    22: "",
    23: "",
    24: "",
    25: "",
    26: "",
    27: "",
    28: "",
    29: "",
    30: "",
    31: "",
    32: "",
    33: "",
    34: "",
    35: "",
}
/* ================= BẢN SAO GARENA 1:1 ================= */
async function moThongSo(soTran) {
    if (!soTran) soTran = 1;
    
    // --- CHÈN 4 DÒNG NÀY VÀO ĐẦU HÀM ---
    tranHienTai = soTran;
    // =========================================================
    // 1. TÍNH TOÁN VÀ CẬP NHẬT GIAO DIỆN (NGÀY, GIỜ, BOOYAH)
    // =========================================================
    let ngayThiDau = Math.ceil(soTran / 5); 
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
    let tranTrongNgay = ((soTran - 1) % 5) + 1;

    let tenTranEl = document.getElementById('ten-tran-dau');
    if (tenTranEl) tenTranEl.innerText = "TRẬN " + tranTrongNgay;

    let dayEl = document.querySelector('.modal-title span'); 
    if (dayEl) dayEl.innerText = "DAY " + ngayThiDau;

    let dateEl = document.querySelector('.info-box.time-box .date');
    if (dateEl) {
        const lichNgay = { 1: "09/06/2026", 2: "10/06/2026", 3: "11/06/2026", 4: "12/06/2026", 5: "13/06/2026", 6: "14/06/2026", 7: "15/06/2026" };
        dateEl.innerText = lichNgay[ngayThiDau] || "09/06/2026";
    }

    let timeEl = document.querySelector('.info-box.time-box .time');
    if (timeEl) {
        const gioThiDau = { 1: "19:30", 2: "20:00", 3: "20:30", 4: "21:00", 5: "21:30" };
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
    "lke": {
        name: "LKE",
        desc: "BNA - Tên đầy đủ là BN Academy. Đội tuyển đại diện cho tinh thần rèn luyện, trưởng thành và vươn lên qua từng trận đấu. Từ những bước đi đầu tiên đến những màn đối đầu căng thẳng, BNA luôn giữ vững sự đoàn kết, không ngại thử thách và sẵn sàng bứt phá để khẳng định bản thân tại Survival Legacy Cup SS2!",
        logo: "logo-bna.jpg",
        country: "", 
        players: [
            { n: "BNA.HGIA", r: "RUSHER", id: "1716356557" },
            { n: "BNA.ĐQUANG", r: "RUSHER", id: "2349365559" },
            { n: "BNA.VLAP", r: "RUSHER", id: "3428078972" },
            { n: "BNA.KHANH", r: "SNIPER", id: "2120500181" },
            { n: "BNA.VTAI", r: "SUPPORT", id: "9780579184" }
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
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('player-cards-container')) {
        switchTeam('lke'); 
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
const tongSoTran = 35; // Khai báo tổng cộng có 5 trận

function chuyenTran(huong) {
    tranHienTai += huong;
    
    // Nếu đang ở Trận 1 mà bấm lùi, nó vòng xuống Trận 5
    if (tranHienTai < 1) tranHienTai = tongSoTran;
    
    // Nếu đang ở Trận 5 mà bấm tới, nó vòng lại Trận 1
    if (tranHienTai > tongSoTran) tranHienTai = 1;
    
    // Lệnh cho nó mở bảng thông số của trận vừa chuyển
    moThongSo(tranHienTai);
}