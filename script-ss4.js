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
        const lichNgay = { 1: "11/08/2026", 2: "12/08/2026", 3: "13/08/2026", 4: "14/08/2026", 5: "15/08/2026", 6: "16/08/2026", 7: "17/08/2026" };
        dateEl.innerText = lichNgay[ngayThiDau] || "11/08/2026";
    }

    let timeEl = document.querySelector('.info-box.time-box .time');
    if (timeEl) {
        const gioThiDau = { 1: "19:30", 2: "20:00", 3: "20:30", 4: "21:00", 5: "21:30" };
        timeEl.innerText = gioThiDau[tranTrongNgay] || "19:30";
    }

    let booyahLogo = document.querySelector('.info-box.booyah-box img');
    let booyahName = document.querySelector('.info-box.booyah-box .winner-name');
    const doiChienThang = {};
    if (booyahLogo && booyahName) {
        booyahName.innerText = doiChienThang[soTran] ? doiChienThang[soTran].ten : "???";
        booyahLogo.src = doiChienThang[soTran] ? doiChienThang[soTran].logo : "https://placehold.co/80x80/222/FFF?text=?";
    }

    // =========================================================
    // 2. LỆNH MỞ KHUNG POPUP 
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
            }s
            // --- 3. IN 5 CỘT BÊN TRÁI (Gộp thành 1 khối bự duy nhất) ---
            container.innerHTML += `
                <div class="g-cell">${teamInfo[0] || ''}</div>
                <div class="g-cell team-name-cell">
                    <img src="${logoThichHop}" onerror="this.onerror=null; this.src='logo-uziss4ss4.jpg';" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
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
    "vktss4": {
        name: "VKT",
        desc: "VKT – Tên đầy đủ là Vân Kiếm Tôn. Mang khí chất của một kiếm khách giữa phong vân, Vân Kiếm Tôn không tìm kiếm chiến thắng bằng lời nói mà bằng từng đường kiếm sắc bén trên chiến trường. Kiếm đã xuất, không lùi bước; trận đã vào, chỉ hướng đến chiến thắng tại Survival Legacy Cup SS4!",
        logo: "logo-vktss4ss4.jpg",
        country: "", 
        players: [
            { n: "VKT.TONGCHU", r: "RUSHER", id: "5755160631" },
            { n: "VKT.KEM", r: "RIFLER", id: "7622410229" },
            { n: "VKT.PUN", r: "SNIPER", id: "1632389086" },
            { n: "VKT.ANMA", r: "SNIPER", id: "2135381973" },
            { n: "VKT.SHARKO", r: "SUPPORT", id: "12083562597" }
        ]
    },
    "tsss4": {
        name: "TS",
        desc: "TS – Tên đầy đủ là TS. Tactical Strike – ra đòn bằng chiến thuật, kết liễu bằng bản lĩnh. TS không tìm kiếm cơ hội, TS tạo ra cơ hội. Khi thời khắc quyết định xuất hiện, đội tuyển sẵn sàng tung đòn và xoay chuyển toàn bộ cục diện tại Survival Legacy Cup SS4!",
        logo: "logo-tsss4ss4.jpg",
        country: "",
        players: [
            { n: "TS.VENUS", r: "RUSHER", id: "9715895573" },
            { n: "TS.TN", r: "RUSHER", id: "14239022427" },
            { n: "TS.PRIME", r: "RUSHER", id: "7692544136" },
            { n: "TS.HUNG", r: "BOMBER", id: "3716775696" },
            { n: "TS.NAMVU", r: "SUPPORT", id: "7559599413" }
        ]
    },
    "fhss4": {
        name: "FH",
        desc: "FH – Tên đầy đủ là FIRE HORSE. Như một chiến mã bùng cháy trên chiến trường, FIRE HORSE luôn lao về phía trước với tốc độ, sức mạnh và tinh thần không bao giờ bỏ cuộc. Sẵn sàng đốt cháy mọi giới hạn, FH quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-fhss4ss4.jpg",
        country: "", 
        players: [
            { n: "FH.SADER", r: "RUSHER", id: "2277930623"},
            { n: "FH.DONKAI", r: "BOMBER", id: "926872567"},
            { n: "FH.COM", r: "SNIPER", id: "746523523"},
            { n: "FH.GRIZZY", r: "SNIPER", id: "1127435270"},
            { n: "FH.KANG", r: "SUPPORT", id: "2590142436"}
        ] 
    },
    "btvss4": {
        name: "BTV",
        desc: "BTV – Tên đầy đủ là BTV. Born To Victory – sinh ra để chiến thắng. BTV không bước vào trận đấu để thử sức, mà để chứng minh bản lĩnh. Càng áp lực càng lì lợm, càng quyết định càng bùng nổ — BTV sẵn sàng chiến đấu đến cùng tại Survival Legacy Cup SS4!",
        logo: "logo-btvss4ss4.jpg",
        country: "", 
        players: [
            { n: "BTV.THIENVU", r: "RUSHER", id: "14201869960" },
            { n: "BTV.AD", r: "RUSHER", id: "4439122562" },
            { n: "BTV.N16T", r: "SNIPER", id: "2625087688" },
            { n: "BTV.HTUAN", r: "SUPPORT", id: "1794081493" },
            { n: "BTV.GAU", r: "SUPPORT", id: "8050249339" }
        ]
    },
    "bbess4": {
        name: "BBE",
        desc: "BBE – Tên đầy đủ là Bánh Bao Esports. Đừng để cái tên “Bánh Bao” đánh lừa — bên ngoài có thể mềm, nhưng vào trận thì không mềm chút nào. BBE mang đến lối chơi đầy bất ngờ, càng bị ép càng bật lại mạnh mẽ. Bánh Bao có thể tròn, nhưng đường đến chiến thắng thì không vòng vo — BBE quyết chiến tại Survival Legacy Cup SS4!",
        logo: "logo-bbess4ss4.jpg", 
        country: "", 
        players: [
            { n: "BBE.KENDY", r: "RUSHER", id: "1774361226" },
            { n: "BBE.MYDIEU", r: "BOMBER", id: "2830766201" },
            { n: "BBE.KEN", r: "SNIPER", id: "9079507302" },
            { n: "BBE.THANHDAT", r: "SNIPER", id: "5681703686" },
            { n: "BBE.KAISER", r: "SUPPORT", id: "7809471778"}
        ]
    },
    "hdss4": {
        name: "HD",
        desc: "HD – Tên đầy đủ là Hoà Đam. Hai chữ cái, một tinh thần: Hold • Dominate – giữ vững thế trận, làm chủ cuộc chơi. HD không cần ồn ào để gây áp lực, chỉ cần vào trận là sẵn sàng bứt phá, áp đảo và chiến đấu đến cùng tại Survival Legacy Cup SS4!",
        logo: "logo-hdss4ss4.jpg",
        country: "", 
        players: [
            { n: "HD.WIN", r: "RUSHER", id: "16483572912" },
            { n: "HD.DVM", r: "RUSHER", id: "7818992208" },
            { n: "HD.ZANE", r: "RIFLER", id: "2327107805" },
            { n: "HD.MKHANH", r: "SNIPER", id: "9607055670" },
            { n: "HD.VHIEU", r: "SUPPORT", id: "9776458518" }
        ]
    },
    "tmhss4": {
        name: "TMH",
        desc: "TMH – Tên đầy đủ là TMH. Think. Move. Hunt. – nghĩ nhanh, di chuyển chuẩn, săn chiến thắng. TMH không cần ồn ào để tạo áp lực; chỉ cần một khoảnh khắc đúng lúc, đội tuyển sẵn sàng biến thế trận và ghi dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-tmhss4ss4.jpg",
        country: "", 
        players: [
            { n: "TMH.VANTUAN", r: "RUSHER", id: "1285407799"},
            { n: "TMH.THIENAN", r: "BOMBER", id: "9279800249" },
            { n: "TMH.MY", r: "SNIPER", id: "9353533657"},
            { n: "TMH.BOYWALK", r: "SUPPORT", id: "11041145321" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "kess4": {
        name: "KE",
        desc: "KE – Tên đầy đủ là KING Esports. Đã mang tên KING, thì bước vào chiến trường không phải để đứng sau bất kỳ ai. Với bản lĩnh của một nhà vua, tinh thần không khuất phục và khát khao chinh phục đỉnh cao, KE sẵn sàng đăng quang bằng chính thực lực tại Survival Legacy Cup SS4!",
        logo: "logo-kess4ss4.jpg",
        country: "", 
        players: [
            { n: "KE.DHAO",  r: "RUSHER", id: "15004360" },
            { n: "KE.TPHUC",  r: "RUSHER", id: "9379361512" },
            { n: "KE.BOUBER", r: "RIFLER", id: "561971260" },
            { n: "KE.AMIA",  r: "RIFLER", id: "4426672086" },
            { n: "KE.FOR", r: "SNIPER", id: "6738561967" }
        ]
    },
    "adess4": {
        name: "ADE",
        desc: "ADE – Tên đầy đủ là ADE. Không cần một cái tên quá dài để tạo dấu ấn, ADE chọn cách khiến đối thủ phải ghi nhớ bằng màn trình diễn trên chiến trường. Với tinh thần không lùi bước, khả năng thích nghi linh hoạt và khát khao chinh phục từng trận đấu, ADE sẵn sàng bứt phá, tạo nên những khoảnh khắc đáng nhớ và khẳng định bản lĩnh tại Survival Legacy Cup SS4!",
        logo: "logo-adess4ss4.jpg",
        country: "", 
        players: [
            { n: "ADE.TNGHIA", r: "RUSHER", id: "4275108112"},
            { n: "ADE.WHUY", r: "SNIPER", id: "983026618" },
            { n: "ADE.DOKI", r: "SNIPER", id: "8095908384" },
            { n: "ADE.TBON", r: "SUPPORT", id: "3768548347" },
            { n: "ADE.KIETLE", r: "SUPPORT", id: "4277007464" }
        ]
    },
    "bzess4": {
        name: "BZE",
        desc: "BZE – Tên đầy đủ là BZ Esports. Break the Zone, Break the Limit – phá vỡ giới hạn, bứt khỏi vùng an toàn. BZE không chờ chiến thắng tìm đến, mà chủ động tạo ra nó bằng những pha xử lý quyết đoán và tinh thần không ngại va chạm. Bước vào là chiến, bùng nổ là BZE — sẵn sàng khuấy đảo Survival Legacy Cup SS4!",
        logo: "logo-bzess4ss4.jpg",
        country: "", 
        players: [
            { n: "BZE.TDUNG", r: "RUSHER", id: "4017055018" },
            { n: "BZE.TVAN", r: "RUSHER", id: "9050876679" },
            { n: "BZE.ORHUN", r: "RUSHER", id: "10886768826" },
            { n: "BZE.BAS", r: "SNIPER", id: "5554805509" },
            { n: "BZE.SEBEO", r: "SUPPORT", id: "6353698339" }
        ]
    },
    "tckss4": {
        name: "TCK",
        desc: "TCK – Tên đầy đủ là TCK. Take Control, Keep Fighting – nắm quyền kiểm soát, chiến đấu đến cùng. TCK không chờ thời cơ xuất hiện, họ tự tạo ra thời cơ bằng từng pha xử lý quyết đoán. Kiểm soát thế trận, bùng nổ đúng lúc và chiến đấu đến giây cuối cùng tại Survival Legacy Cup SS4!",
        logo: "logo-tckss4ss4.jpg",
        country: "", 
        players: [
            { n: "TCK.TKHANH", r: "RUSHER", id: "7626327478" },
            { n: "TCK.SANG", r: "RUSHER", id: "15493068013" },
            { n: "TCK.PQUAN", r: "BOMBER", id: "10631438987" },
            { n: "TCK.J1Z", r: "SNIPER", id: "8382794436" },
            { n: "TCK.TRPHUC", r: "SUPPORT", id: "7634167228" }
        ]
    },
    "adnss4": {
        name: "ADN",
        desc: "ADN – Tên đầy đủ là ADN. Attack • Dominate • Never Back Down – tấn công, áp đảo và không bao giờ lùi bước. ADN mang tinh thần chiến đấu trực diện, càng va chạm càng mạnh, càng áp lực càng bùng nổ. Không né tránh, không chùn bước — ADN sẵn sàng chiến đến cùng tại Survival Legacy Cup SS4!",
        logo: "logo-adnss4ss4.jpg",
        country: "", 
        players: [
            { n: "ADN.BAOVAT", r: "RUSHER", id: "7087724023" },
            { n: "ADN.TAM", r: "BOMBER", id: "726580642" },
            { n: "ADN.TNOK", r: "SNIPER", id: "11661686307" },
            { n: "ADN.MINH", r: "SUPPORT", id: "1114877961" },
            { n: "ADN.PKHAI", r: "SUPPORT", id: "3428476614" }
        ]
    },
    "slss4": {
        name: "SL",
        desc: "SL – Tên đầy đủ là Serein Line. Mang trong mình sự điềm tĩnh của “Serein” – một vẻ đẹp yên bình giữa những biến động, Serein Line không cần ồn ào để tạo khác biệt. Càng áp lực, SL càng lạnh lùng, càng quyết đoán và sẵn sàng bứt phá tại Survival Legacy Cup SS4!",
        logo: "logo-slss4ss4.jpg",
        country: "", 
        players: [
            { n: "SL.EMKING", r: "RUSHER", id: "2325777762" },
            { n: "SL.EMCHUONG", r: "BOMBER", id: "1185079614" },
            { n: "SL.EMKHOI", r: "SNIPER", id: "2791106345" },
            { n: "SL.EMKIN", r: "SNIPER", id: "5223838420" },
            { n: "SL.ZADRED",r: "SUPPORT", id: "1884223878" }
        ]
    },
    "ilgss4": {
        name: "ILG",
        desc: "ILG – Tên đầy đủ là I Love Game. Với ILG, game không chỉ là cuộc chơi mà là nơi đam mê được biến thành bản lĩnh. Chơi vì đam mê, chiến vì chiến thắng — ILG sẵn sàng cháy hết mình, tạo bất ngờ và để lại dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-ilgss4ss4.jpg",
        country: "", 
        players: [
            { n: "ILG.NGPHUOC", r: "RUSHER", id: "1662260659" },
            { n: "ILG.PAYN", r: "RIFLER", id: "1295463080" },
            { n: "ILG.THELIGHT", r: "SNIPER", id: "2895527359" },
            { n: "ILG.OSIRIS", r: "SUPPORT", id: "2824600011" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG"}
        ]
    },
    "slass4": {
        name: "SLA",
        desc: "SLA – Tên đầy đủ là Serein Line Academy. Là thế hệ trẻ mang tinh thần của Serein Line, SLA bước vào đấu trường với mục tiêu học hỏi để trưởng thành, rèn luyện để bứt phá. Không ngại va chạm, không sợ áp lực, SLA sẵn sàng biến từng trận đấu thành một bước tiến mới tại Survival Legacy Cup SS4!",
        logo: "logo-slass4ss4.jpg",
        country: "", 
        players: [
            { n: "SLA.PON", r: "RUSHER", id: "449570398" },
            { n: "SLA.TBO", r: "BOMBER", id: "2876431694" },
            { n: "SLA.MYDIEU", r: "SNIPER", id: "6855910708" },
            { n: "SLA.PON2", r: "SNIPER", id: "2691989718" },
            { n: "SLA.RONG", r: "SUPPORT", id: "9143438657" }
        ]
    },
    "artyss4": {
        name: "ARTY",
        desc: "ARTY – Tên đầy đủ là ARTY KILLER. Sinh ra để săn kill, thi đấu để thống trị. Với lối chơi máu lửa và tinh thần không khoan nhượng, ARTY KILLER sẵn sàng biến mọi cuộc đối đầu thành màn trình diễn của mình tại Survival Legacy Cup SS4!",
        logo: "logo-artyss4ss4.jpg",
        country: "", 
        players: [
            { n: "ARTY.NTUAN", r: "RUSHER", id: "10208562491" },
            { n: "ARTY.PHMINH", r: "RUSHER", id: "8931041751" },
            { n: "ARTY.QCHIEN", r: "RIFLER", id: "752135692" },
            { n: "ARTY.TRINH", r: "SNIPER", id: "7289909444" },
            { n: "ARTY.TRHUNG", r: "SNIPER", id: "8970512236" }
        ]
    },
    "blss4": {
        name: "BL",
        desc: "BL – Tên đầy đủ là BL Esports. Bật lên là chiến, bước vào là quyết! BL mang tinh thần của một đội tuyển không ngại va chạm, luôn sẵn sàng tăng tốc khi cơ hội xuất hiện. Không cần ồn ào, chỉ cần một trận đấu đủ cháy để cả chiến trường phải nhớ tên BL tại Survival Legacy Cup SS4!",
        logo: "logo-blss4ss4.jpg",
        country: "", 
        players: [
            { n: "BL.FORX", r: "RUSHER", id: "10662958879" },
            { n: "BL.NEHUHU", r: "BOMBER", id: "4461929512" },
            { n: "BL.EVIL", r: "SNIPER", id: "6309254787" },
            { n: "BL.SIKIBIDI", r: "SUPPORT", id: "2421066275" },
            { n: "BL.LINA", r: "SUPPORT", id: "2338588519" }
        ]
    },
    "nexss4": {
        name: "NEX",
        desc: "NEX – Tên đầy đủ là NEXSIAS Esports. Next level, next threat. NEXSIAS không bước vào chiến trường để hòa mình vào đám đông, mà để trở thành cái tên khiến đối thủ phải dè chừng. Càng vào trận, NEX càng tăng tốc, càng áp lực càng bùng nổ — sẵn sàng vươn lên một đẳng cấp mới tại Survival Legacy Cup SS4!",
        logo: "logo-nexss4ss4.jpg",
        country: "", 
        players: [
            { n: "NEX.LU", r: "RUSHER", id: "8910861016" },
            { n: "NEX.TOAN",r: "BOMBER", id: "2025399286" },
            { n: "NEX.TALU", r: "SNIPER", id: "5273702160" },
            { n: "NEX.SENH", r: "SUPPORT", id: "9596099669" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "n1ctss4": {
        name: "N1CT",
        desc: "N1CT – Tên đầy đủ là No 1 Co Te. Cái tên mang theo một mục tiêu rõ ràng: đã chiến là phải hướng đến vị trí số 1. N1CT không ngại va chạm, không chùn bước trước áp lực, sẵn sàng tăng tốc đúng thời điểm và biến từng trận đấu thành cơ hội vươn lên tại Survival Legacy Cup SS4!",
        logo: "logo-n1ctss4ss4.jpg",
        country: "", 
        players: [
            { n: "N1CT.TIENANH", r: "RUSHER", id: "12716802702" },
            { n: "N1CT.NILAJS", r: "RIFLER", id: "12854479609" },
            { n: "N1CT.THANH", r: "BOMBER", id: "14450081056" },
            { n: "N1CT.ANTONI",r: "SUPPORT", id: "2141978426" },
            { n: "N1CT.GIABAO", r: "SUPPORT", id: "11438885872" }
        ]
    },
    "bbss4": {
        name: "BB",
        desc: "BB – Tên đầy đủ là Bất Bại Esports. Cái tên đã nói lên tất cả — không bước vào trận để chấp nhận thất bại. BB mang tinh thần lì lợm, càng bị dồn ép càng phản công mạnh mẽ, sẵn sàng chiến đấu đến cùng và bảo vệ danh xưng “Bất Bại” tại Survival Legacy Cup SS4!",
        logo: "logo-bbss4ss4.jpg",
        country: "", 
        players: [
            { n: "BB.NTHANH", r: "RUSHER", id: "1611862956" },
            { n: "BB.TEBI", r: "RUSHER", id: "700048316" },
            { n: "BB.HTRIET", r: "BOMBER", id: "173767117" },
            { n: "BB.HAN", r: "SNIPER", id: "15542851105" },
            { n: "BB.DONAL", r: "SUPPORT", id: "553191344" }
        ]
    },
    "tgess4": {
        name: "TGE",
        desc: "TGE – Tên đầy đủ là TIGER Esports. Trong rừng sâu, kẻ săn mồi không cần lên tiếng — chỉ cần một khoảnh khắc, con mồi đã nằm trong tầm ngắm. TGE mang tinh thần của một con hổ luôn chờ đúng thời điểm để vồ lấy chiến thắng. Ẩn mình, tăng tốc, kết liễu — TGE sẵn sàng biến Survival Legacy Cup SS4 thành lãnh địa của riêng mình!",
        logo: "logo-tgess4ss4.jpg",
        country: "", 
        players: [
            { n: "TGE.ONESEFL", r: "RUSHER", id: "8240307539" },
            { n: "TGE.VTUNG", r: "RIFLER", id: "6882956340" },
            { n: "TGE.OZIPLUS", r: "SNIPER", id: "14693816630" },
            { n: "TGE.PAN", r: "SUPPORT", id: "1589843978" },
            { n: "TGE.HNGHIA",  r: "SUPPORT", id: "11332758118" }
        ]
    },
    "kmss4": {
        name: "KM",
        desc: "KM – Tên đầy đủ là KM Esports. Mang tinh thần Kill • Master, KM Esports luôn bước vào trận đấu với bản lĩnh của những người làm chủ mọi cuộc giao tranh. Không ngại đối đầu, không bỏ lỡ cơ hội, KM quyết tâm chinh phục chiến thắng và khẳng định vị thế tại Survival Legacy Cup SS4!",
        logo: "logo-kmss4ss4.jpg",
        country: "", 
        players: [
            { n: "KM.LOSTINUS", r: "RUSHER", id: "3016983320" },
            { n: "KM.EZLOVE", r: "RIFLER", id: "2146266439" },
            { n: "KM.PHAMTIEN",r: "BOMBER", id: "2315234124" },
            { n: "KM.GUNNERS", r: "SNIPER", id: "5975854296" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "rzss4": {
        name: "RZ",
        desc: "RZ – Tên đầy đủ là RAZE Esports. Không báo trước, không cho cơ hội thứ hai. RAZE bước vào chiến trường như một cơn bão — âm thầm tích tụ, rồi bùng nổ đúng thời khắc quyết định. Đã chạm trán RZ, chỉ có thể chọn một: chống trả hoặc bị cuốn phăng khỏi cuộc chơi tại Survival Legacy Cup SS4!",
        logo: "logo-rzss4ss4.jpg",
        country: "", 
        players: [
            { n: "RZ.DUY", r: "RUSHER", id: "12576856883" },
            { n: "RZ.TIEN", r: "RUSHER", id: "12350585814" },
            { n: "RZ.TINH", r: "SNIPER", id: "8866941793" },
            { n: "RZ.TAO", r: "SUPPORT", id: "936555133" },
            { n: "RZ.HOANGDAT", r: "SUPPORT", id: "3934821628" }
        ]
    },
    "rz2ss4": {
        name: "RZ2",
        desc: "RZ2 – Tên đầy đủ là RAZE Esports 2. Một RAZE đã đủ đáng gờm, RZ2 xuất hiện để nhân đôi sức ép. Không cần ồn ào, RZ2 chọn cách tăng tốc đúng thời điểm, phá vỡ thế trận và biến từng pha giao tranh thành cơ hội kết liễu. RAZE trở lại với phiên bản thứ hai — mạnh hơn, liều lĩnh hơn và sẵn sàng khuấy đảo Survival Legacy Cup SS4!",
        logo: "logo-rz2ss4ss4.jpg",
        country: "", 
        players: [
            { n: "RZ2.VANTU", r: "RUSHER", id: "9881928946" },
            { n: "RZ2.NOVA", r: "RUSHER", id: "14822848068" },
            { n: "RZ2.DUYEN", r: "SNIPER", id: "2299068955" },
            { n: "RZ2.HOANGDAT", r: "SUPPORT", id: "3934821628" },
            { n: "RZ2.MTRI", r: "SUPPORT", id: "2270703674"  }
        ]
    },
    "zgdxss4": {
        name: "ZGDX",
        desc: "ZGDX – Tên đầy đủ là ZGDX Esports. Zero Fear, Dominate X – không sợ hãi, chỉ hướng đến áp đảo. ZGDX bước vào chiến trường với tinh thần không lùi bước, sẵn sàng biến từng pha giao tranh thành cơ hội bứt phá. Không run trước áp lực, không nhường trước đối thủ — ZGDX quyết chiến tại Survival Legacy Cup SS4!",
        logo: "logo-zgdxss4ss4.jpg",
        country: "", 
        players: [
            { n: "ZGDX.KIENVAN", r: "RUSHER", id: "2608313281" },
            { n: "ZGDX.ACH", r: "RIFLER", id: "4235464631" },
            { n: "ZGDX.SOINAU", r: "BOMBER", id: "6765552069" },
            { n: "ZGDX.ANHGM", r: "SNIPER", id: "8145868857" },
            { n: "ZGDX.PCH", r: "SNIPER", id: "7476816537" }
        ]
    },
    "sgpss4": {
        name: "SGP",
        desc: "SGP – Tên đầy đủ là SGP. Mang tinh thần Strike • Glory • Power, SGP luôn bước vào trận đấu với khát khao chiến thắng và bản lĩnh của những chiến binh thực thụ. Không ngại đối đầu, không lùi bước trước thử thách, SGP quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-sgpss4ss4.jpg",
        country: "", 
        players: [
            { n: "SGP.TNLOI", r: "RUSHER", id: "8231737839" },
            { n: "SGP.TAPO", r: "RIFLER", id: "7761859710" },
            { n: "SGP.DAU", r: "BOMBER", id: "4364899318" },
            { n: "SGP.LIGHT", r: "SNIPER", id: "14701815439" },
            { n: "SGP.KH", r: "SUPPORT", id: "6922295097" }
        ]
    },
    "rrqss4": {
        name: "RRQ",
        desc: "RRQ – Tên đầy đủ là RRQ Esports. Rise • Rule • Conquer – vươn lên, làm chủ và chinh phục. RRQ không bước vào chiến trường để tìm một vị trí an toàn, mà để tranh giành vị trí cao nhất. Bản lĩnh lên tiếng, chiến thắng là mục tiêu — RRQ sẵn sàng chinh phục Survival Legacy Cup SS4!",
        logo: "logo-rrqss4ss4.jpg",
        country: "", 
        players: [
            { n: "RRQ.FOX", r: "RUSHER", id: "6895539974" },
            { n: "RRQ.HOANGANH", r: "BOMBER", id: "7095694708" },
            { n: "RRQ.SAIFA", r: "SNIPER", id: "1724323294" },
            { n: "RRQ.ZENNY", r: "SUPPORT", id: "5072130583" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "mekss4": {
        name: "MEK",
        desc: "MEK – Tên đầy đủ là MegaKill Esports. Khi giao tranh bùng nổ cũng là lúc MegaKill Esports lên tiếng. Với tinh thần quyết chiến, kỹ năng sắc bén và khát khao chinh phục, MEK quyết tâm tạo nên những pha xử lý mãn nhãn và ghi dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-mekss4ss4.jpg",
        country: "", 
        players: [
            { n: "MEK.MTRIET", r: "RUSHER", id: "11689622261" },
            { n: "MEK.FRV", r: "RUSHER", id: "3248543787" },
            { n: "MEK.TRUNG", r: "SNIPER", id: "12770679079" },
            { n: "MEK.NANH", r: "SUPPORT", id: "1680769724" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "lkess4": {
        name: "LKE",
        desc: "LKE – Tên đầy đủ là LÊ KIÊN ESPORTS. Không cần hô hào quá lớn, LKE để kỹ năng lên tiếng. Mỗi pha giao tranh là một lời khẳng định, mỗi chiến thắng là một dấu ấn. Khi đã bước vào trận đấu, mục tiêu duy nhất của LÊ KIÊN ESPORTS là khiến cái tên của mình được nhắc đến nhiều nhất tại Survival Legacy Cup SS4!",
        logo: "logo-lkess4ss4.jpg",
        country: "", 
        players: [
            { n: "LKE.EMBEN", r: "RUSHER", id: "355294300" },
            { n: "LKE.EMTHIEN", r: "SNIPER", id: "3209197272" },
            { n: "LKE.EMBOY", r: "SNIPER", id: "11487790754" },
            { n: "LKE.EMPHUC", r: "SUPPORT", id: "605940899" },
            { n: "LKE.DIEMMY", r: "SUPPORT", id: "2055349409" }
        ]
    },
    "kkss4": {
        name: "KK",
        desc: "KK – Tên đầy đủ là KING KING. Hai lần KING, gấp đôi tham vọng. KK bước vào chiến trường với tinh thần của những kẻ không muốn đứng sau bất kỳ ai — càng áp lực càng máu lửa, càng quyết định càng bùng nổ. Một KING đã đáng gờm, hai KING càng không thể xem thường — KK sẵn sàng chinh phục Survival Legacy Cup SS4!",
        logo: "logo-kkss4ss4.jpg",
        country: "", 
        players: [
            { n: "KK.MHCUONG", r: "RUSHER", id: "7519765743" },
            { n: "KK.DUCANH", r: "RUSHER", id: "1263945996" },
            { n: "KK.ACH", r: "RIFLER", id: "4235464631" },
            { n: "KK.MINHDANG", r: "BOMBER", id: "1913479101" },
            { n: "KK.ANHGM", r: "SNIPER", id: "8145868857" }
        ]
    },
    "kmess4": {
        name: "KME",
        desc: "KME – Tên đầy đủ là KM Esports. Keep Moving, Keep Winning – không ngừng tiến lên, không ngừng chiến thắng. KME mang tinh thần càng đánh càng lì, càng vào sâu càng bùng nổ. Không đứng yên, không chùn bước — KME sẵn sàng tăng tốc và săn chiến thắng tại Survival Legacy Cup SS4!",
        logo: "logo-kmess4ss4.jpg",
        country: "", 
        players: [
            { n: "KME.LOSTINUS", r: "RUSHER", id: "3016983320" },
            { n: "KME.EZLOVE", r: "RIFLER", id: "2146266439" },
            { n: "KME.PHAMTIEN",r: "BOMBER", id: "2315234124" },
            { n: "KME.GUNNERS", r: "SNIPER", id: "5975854296" },
            { n: "KME.BI", r: "SUPPORT", id: "5826764732 "}
        ]
    },
    "sawss4": {
        name: "SAW",
        desc: "SAW – Tên đầy đủ là SHADOW Esports. Silent Approach, Wild Strike – âm thầm tiếp cận, bùng nổ ra đòn. SAW không cần xuất hiện ồn ào, chỉ cần một khoảnh khắc thích hợp để biến cái bóng thành cơn ác mộng trên chiến trường. Ẩn mình, chờ thời, tung đòn quyết định — SAW sẵn sàng săn chiến thắng tại Survival Legacy Cup SS4!",
        logo: "logo-sawss4ss4.jpg",
        country: "", 
        players: [
            { n: "SAW.NKHANH", r: "RUSHER", id: "9762026995" },
            { n: "SAW.DUY", r: "RUSHER", id: "12576856883" },
            { n: "SAW.TIEN", r: "RUSHER", id: "12350585814" },
            { n: "SAW.TINH", r: "SNIPER", id: "8866941793" },
            { n: "SAW.TAO", r: "SUPPORT", id: "936555133" }
        ]
    },
    "ilgess4": {
        name: "ILGE",
        desc: "ILGE – Tên đầy đủ là I Love Games Esports. Với ILGE, game không chỉ là sở thích mà còn là nơi đam mê được biến thành khát khao chiến thắng. Chơi bằng đam mê, chiến bằng bản lĩnh, thắng bằng thực lực — ILGE sẵn sàng cháy hết mình và tạo nên dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-ilgess4ss4.jpg",
        country: "", 
        players: [
            { n: "ILGE.NGPHUOC", r: "RUSHER", id: "1662260659" },
            { n: "ILGE.PAYN", r: "RIFLER", id: "1295463080" },
            { n: "ILGE.VH", r: "RIFLER", id: "3254504614" },
            { n: "ILGE.THELIGHT", r: "SNIPER", id: "2895527359" },
            { n: "ILGE.OSIRIS", r: "SUPPORT", id: "2824600011" }
        ]
    },
    "vdess4": {
        name: "VDE",
        desc: "VDE – Tên đầy đủ là Vô Danh Esports. Không mang theo hào quang hay danh tiếng, VDE bước vào chiến trường với hai bàn tay trắng và khát khao chứng minh bản thân. Hôm nay có thể là vô danh, nhưng ngày mai sẽ là cái tên khiến mọi đối thủ phải ghi nhớ — VDE sẵn sàng bùng nổ tại Survival Legacy Cup SS4!",
        logo: "logo-vdess4ss4.jpg",
        country: "", 
        players: [
            { n: "VDE.ONESEFL", r: "RUSHER", id: "8240307539" },
            { n: "VDE.OZIPLUS", r: "RUSHER", id: "14693816630" },
            { n: "VDE.PAN", r: "RIFLER", id: "1589843978" },
            { n: "VDE.VTUNG", r: "SNIPER", id: "6882956340" },
            { n: "VDE.HNGHIA",  r: "SUPPORT", id: "11332758118" }
        ]
    },
    "pfpss4": {
        name: "PFP",
        desc: "PFP – Tên đầy đủ là PFP Esports. Play For Pride – chiến đấu vì niềm tự hào. Mỗi trận đấu không chỉ là cuộc cạnh tranh điểm số mà còn là cơ hội để khẳng định bản lĩnh của cả tập thể. Không ngại thử thách, không sợ đối đầu, PFP sẵn sàng chiến hết mình tại Survival Legacy Cup SS4!",
        logo: "logo-pfpss4ss4.jpg",
        country: "", 
        players: [
            { n: "PFP.NTRI", r: "RUSHER", id: "2653093397" },
            { n: "PFP.THPHONG", r: "RIFLER", id: "3120331064" },
            { n: "PFP.HANA", r: "SNIPER", id: "2104295752" },
            { n: "PFP.YA", r: "SNIPER", id: "9138786364" },
            { n: "PFP.SUN", r: "SUPPORT", id: "2653093397" }
        ]
    },
    "x77ss4": {
        name: "X77",
        desc: "X77 – Tên đầy đủ là X77 Esports. Bí ẩn như chữ X, bùng nổ như con số 77, X77 là đội tuyển luôn mang đến những điều không thể đoán trước. Đối thủ có thể chuẩn bị cho mọi kịch bản, nhưng không thể chuẩn bị cho sự đột biến mà X77 tạo ra. Một khoảnh khắc tỏa sáng có thể thay đổi cả trận đấu — và X77 luôn sẵn sàng tạo ra khoảnh khắc đó tại Survival Legacy Cup SS4!",
        logo: "logo-x77ss4ss4.jpg",
        country: "", 
        players: [
            { n: "X77.TIENANH", r: "RUSHER", id: "12716802702" },
            { n: "X77.NILAJS", r: "RIFLER", id: "12854479609" },
            { n: "X77.THANH", r: "BOMBER", id: "14450081056" },
            { n: "X77.ANTONI",r: "SUPPORT", id: "2141978426" },
            { n: "X77.GIABAO", r: "SUPPORT", id: "11438885872" }
        ]
    },
    "ptess4": {
        name: "PTE",
        desc: "PTE – Tên đầy đủ là PTE. Power • Tactics • Excellence – sức mạnh, chiến thuật và sự xuất sắc. PTE không chọn lối chơi an toàn, mà chọn cách đối mặt với thử thách bằng bản lĩnh và sự tự tin. Càng áp lực càng quyết tâm, càng giao tranh càng bùng nổ — PTE sẵn sàng khẳng định vị thế tại Survival Legacy Cup SS4!",
        logo: "logo-ptess4ss4.jpg",
        country: "", 
        players: [
            { n: "PTE.TRIEUVY", r: "RUSHER", id: "1814073359" },
            { n: "PTE.MINH", r: "SNIPER", id: "7456885371" },
            { n: "PTE.MEOBINH", r: "SNIPER", id: "10676409066" },
            { n: "PTE.REYKER", r: "SUPPORT", id: "7934151585" },
            { n: "PTE.PU", r: "SUPPORT", id: "6334762860" }
        ]
    },
    "tlrss4": {
        name: "TLR",
        desc: "TLR – Tên đầy đủ là TLR Esports. The Last Resistance – phòng tuyến cuối cùng, nơi ý chí không bao giờ gục ngã. Dù bị dồn vào thế khó khăn nhất, TLR vẫn giữ vững tinh thần chiến đấu và sẵn sàng phản công bất cứ lúc nào. Không bỏ cuộc, không lùi bước — TLR quyết tâm chiến đấu đến cùng tại Survival Legacy Cup SS4!",
        logo: "logo-tlrss4ss4.jpg",
        country: "", 
        players: [
            { n: "TLR.CTHANH", r: "RUSHER", id: "4392383516" },
            { n: "TLR.DRIFTWAY", r: "RUSHER", id: "2271691178" },
            { n: "TLR.BLACK", r: "SNIPER", id: "218005353" },
            { n: "TLR.TONE", r: "SNIPER", id: "80767261" },
            { n: "TLR.HNGHIA", r: "SUPPORT", id: "2012322645" }
        ]
    },
    "tass4": {
        name: "TA",
        desc: "TA – Tên đầy đủ là TA Esports. Đằng sau hai chữ cái ngắn gọn là một tập thể luôn khao khát chinh phục những thử thách lớn nhất. TA không cần những lời tuyên bố mạnh mẽ, bởi chính những màn trình diễn trên chiến trường sẽ nói lên tất cả. Bản lĩnh để chiến đấu, quyết tâm để chiến thắng — TA sẵn sàng tạo dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-tass4ss4.jpg",
        country: "", 
        players: [
            { n: "TA.NTRI", r: "RUSHER", id: "371797166" },
            { n: "TA.ZORI", r: "RIFLER", id: "12621403136" },
            { n: "TA.NGA", r: "BOMBER", id: "2453358090" },
            { n: "TA.THPHONG", r: "SNIPER", id: "3120331064" },
            { n: "TA.YA", r: "SUPPORT", id: "9138786364"}
        ]
    },
    "uziss4": {
        name: "UZI",
        desc: "UZI - Tên đầy đủ là UZI　LEGENDS. Đội tuyển mang hình tượng “song UZI khai hỏa”, tốc độ xả đạn nghẹt thở, dồn ép liên tục khiến đối thủ không kịp thở, vào giao tranh là quét sạch đội hình đối thủ trong tích tắc, thể hiện đẳng cấp “bắn nhanh – thắng nhanh” tại Survival Legacy Cup SS4!",
        logo: "logo-uziss4.jpg",
        country: "", 
        players: [
            { n: "UZI.GPHIEN", r: "RUSHER", id: "5612947509" },
            { n: "UZI.DEATH", r: "RUSHER", id: "6248000758" },
            { n: "UZI.MILLOW", r: "RUSHER", id: "2444693631" },
            { n: "UZI.CHOPPER", r: "SNIPER", id: "3659332602" },
            { n: "UZI.BIN", r: "SUPPORT", id: "9173149407" }
        ]
    },
    "dzss4": {
        name: "DZ",
        desc: "DZ – Tên đầy đủ là DZ Gaming. Mang trong mình tinh thần của những chiến binh không ngại thử thách, DZ luôn sẵn sàng lao vào những cuộc giao tranh khốc liệt nhất để giành lấy chiến thắng. Càng căng thẳng càng bản lĩnh, càng khó khăn càng quyết tâm — DZ Gaming đến với Survival Legacy Cup SS4 không chỉ để thi đấu, mà để chinh phục!",
        logo: "logo-dzss4ss4.jpg",
        country: "", 
        players: [
            { n: "DZ.GHUNG", r: "RUSHER", id: "9339689538" },
            { n: "DZ.SECRET",r: "RIFLER", id: "12394662375" },
            { n: "DZ.SHIN", r: "BOMBER", id: "6437619969" },
            { n: "DZ.SUN", r: "SNIPER", id: "12225789596" },
            { n: "DZ.KEM", r: "SUPPORT", id: "273375308" }
        ]
    },
    "bless4": {
        name: "BLE",
        desc: "BLE – Tên đầy đủ là BLE. Break Limits Everywhere – phá vỡ mọi giới hạn. BLE không đặt mục tiêu chỉ để góp mặt, mà để vượt qua chính mình và tạo nên những bất ngờ trên chiến trường. Càng khó khăn càng quyết tâm, càng áp lực càng bùng nổ — BLE sẵn sàng viết nên câu chuyện của riêng mình tại Survival Legacy Cup SS4!",
        logo: "logo-bless4ss4.jpg",
        country: "", 
        players: [
            { n: "BLE.FORX", r: "RUSHER", id: "10662958879" },
            { n: "BLE.NEHUHU", r: "BOMBER", id: "4461929512" },
            { n: "BLE.EVIL", r: "SNIPER", id: "6309254787" },
            { n: "BLE.SIKIBIDI", r: "SUPPORT", id: "2421066275" },
            { n: "BLE.LINA", r: "SUPPORT", id: "2338588519" }
        ]
    },
    "ctess4": {
        name: "CTE",
        desc: "CTE – Tên đầy đủ là CTE. Với ý chí của những Champions Together Forever, CTE tin rằng sức mạnh lớn nhất đến từ sự gắn kết. Chiến đấu như một tập thể, quyết thắng như một đội tuyển, CTE quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-ctess4ss4.jpg",
        country: "", 
        players: [
            { n: "CTE.GIABAO", r: "RUSHER", id: "14501843024" },
            { n: "CTE.HPHU", r: "RUSHER", id: "692914271" },
            { n: "CTE.LONGVU", r: "SNIPER", id: "2934208943" },
            { n: "CTE.AKIET", r: "SUPPORT", id: "11849275511" },
            { n: "CTE.THIEN", r: "SUPPORT", id: "4707864091" }
        ]
    },
    "cdyss4": {
        name: "CDY",
        desc: "CDY – Tên đầy đủ là CDY. Challenge • Defy • Yield Never – dám thử thách, thách thức mọi giới hạn và không bao giờ khuất phục. CDY không bước vào trận đấu để tìm kiếm sự an toàn, mà để đối mặt với những đối thủ mạnh nhất. Càng áp lực càng kiên cường, càng khó khăn càng quyết chiến — CDY sẵn sàng bùng nổ tại Survival Legacy Cup SS4!",
        logo: "logo-cdyss4ss4.jpg",
        country: "", 
        players: [
            { n: "CDY.MHCUONG", r: "RUSHER", id: "7519765743" },
            { n: "CDY.VIETSON", r: "RUSHER", id: "7818813054" },
            { n: "CDY.ANHGM", r: "RIFLER", id: "8145868857" },
            { n: "CDY.DUCANH", r: "BOMBER", id: "1263945996" },
            { n: "CDY.DANGVU", r: "SNIPER", id: "1913479101" }
        ]
    },
    "qvss4": {
        name: "QV",
        desc: "QV – Tên đầy đủ là QV Esports. Quiet Victory – chiến thắng không cần quá nhiều lời nói. QV lựa chọn để kỹ năng lên tiếng, để bản lĩnh được thể hiện qua từng trận đấu. Khi cơ hội xuất hiện, QV sẽ không ngần ngại tăng tốc và biến lợi thế thành chiến thắng. Âm thầm tiến bước, bùng nổ đúng lúc — QV Esports sẵn sàng khẳng định mình tại Survival Legacy Cup SS4!",
        logo: "logo-qvss4ss4.jpg",
        country: "", 
        players: [
            { n: "QV.TORAI", r: "RUSHER", id: "325587001" },
            { n: "QV.CAMATMEO", r: "SNIPER", id: "1737545616" },
            { n: "QV.MEOMEOMEO", r: "SNIPER", id: "7044745891" },
            { n: "QV.BBQ", r: "SUPPORT", id: "327891042" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "bzss4": {
        name: "BZ",
        desc: "BZ – Tên đầy đủ là BZ Esports. Blaze Zone – vùng đất của những ngọn lửa không bao giờ tắt. BZ mang lối chơi đầy nhiệt huyết, luôn sẵn sàng bùng nổ trong những thời khắc quyết định và biến áp lực thành động lực. Càng chiến càng cháy, càng đánh càng hăng — BZ Esports quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS4!",
        logo: "logo-bzss4ss4.jpg",
        country: "", 
        players: [
            { n: "BZ.WASABI", r: "RUSHER", id: "12508509193" },
            { n: "BZ.ORHUN", r: "RUSHER", id: "10886768826" },
            { n: "BZ.ZBER", r: "SNIPER", id: "15599277601" },
            { n: "BZ.HINASS", r: "SNIPER", id: "9050876679" },
            { n: "BZ.BEO", r: "SUPPORT", id: "6353698339" }
        ]
    },
    "6itss4": {
        name: "6IT",
        desc: "6IT – Tên đầy đủ là 6IT. Con số 6 đại diện cho sự gắn kết, còn IT là tinh thần đổi mới và tư duy chiến thuật. 6IT không phải đội tuyển thích phô trương, nhưng luôn biết cách tỏa sáng khi trận đấu bước vào giai đoạn quyết định. Giữ vững đội hình, bùng nổ đúng thời điểm — 6IT sẵn sàng tạo bất ngờ tại Survival Legacy Cup SS4!",
        logo: "logo-6itss4ss4.jpg",
        country: "", 
        players: [
            { n: "6IT.HELLOEM", r: "RUSHER", id: "1274582211" },
            { n: "6IT.THU", r: "RUSHER", id: "6999920894" },
            { n: "6IT.HELUEM", r: "SNIPER", id: "12354441464" },
            { n: "6IT.GAIDEP", r: "SNIPER", id: "1779964983" },
            { n: "6IT.HAU", r: "SUPPORT", id: "8294900833" }
        ]
    },
    "jkss4": {
        name: "JK",
        desc: "JK – Tên đầy đủ là JET KITTY. Đừng để cái tên dễ thương đánh lừa bạn. Khi bước vào chiến trường, JET KITTY luôn sẵn sàng chuyển từ đáng yêu sang đáng gờm chỉ trong tích tắc. Với lối chơi khó đoán và tinh thần không ngại va chạm, JK có thể là chú mèo ngoài đời, nhưng là mãnh thú trong trận đấu. Sẵn sàng săn chiến thắng tại Survival Legacy Cup SS4!",
        logo: "logo-jkss4ss4.jpg",
        country: "", 
        players: [
            { n: "JK.SEPHIRE", r: "RUSHER", id: "9330818816" },
            { n: "JK.WY", r: "RUSHER", id: "8390009644" },
            { n: "JK.BIBIBI", r: "RIFLER", id: "7849960599" },
            { n: "JK.MKHANG", r: "SNIPER", id: "12456765114" },
            { n: "JK.PAO", r: "SUPPORT", id: "5887148075" }
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
                            SURVIVAL LEGACY<br>CUP SS4
                        </span>
                    </div>

                    <div class="card-body">
                        <div class="data-field" style="margin-bottom: 15px;">
                            <span class="data-label">TUYỂN THỦ</span>
                            <span class="data-value">${player.n}</span>
                        </div>
                        <div class="data-field" style="margin-bottom: 0;">
                            <span class="data-label">PLAYER ID</span>
                            <span class="data-value-id">${player.id ? player.id : 'KHÔNG CÓ DỮ LIỆU'}</span>
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
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('player-cards-container')) {
        switchTeam('vktss4'); 
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
// 1. KHO CHỨA DỮ LIỆU BẢNG XẾP HẠNG SS4
let DU_LIEU_BXH_SS4 = { 'A': [], 'B': [], 'C': [], 'D': [] };

// 2. CHỖ ĐỂ BẠN DÁN 4 LINK GOOGLE SHEETS CỦA SS4
const LINK_CacBang_SS4 = {
    'A': "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxDSOSL4H3e0x1AGroPVMIV9YURcz87dYbzfxTFrDeGzobsNg67840s51Dh59mxiBdIM_8XqT02bw8/pub?gid=0&single=true&output=csv",
    'B': "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxDSOSL4H3e0x1AGroPVMIV9YURcz87dYbzfxTFrDeGzobsNg67840s51Dh59mxiBdIM_8XqT02bw8/pub?gid=1709029258&single=true&output=csv",
    'C': "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxDSOSL4H3e0x1AGroPVMIV9YURcz87dYbzfxTFrDeGzobsNg67840s51Dh59mxiBdIM_8XqT02bw8/pub?gid=1643009496&single=true&output=csv",
    'D': "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxDSOSL4H3e0x1AGroPVMIV9YURcz87dYbzfxTFrDeGzobsNg67840s51Dh59mxiBdIM_8XqT02bw8/pub?gid=991012475&single=true&output=csv"
};

// 3. ĐỘNG CƠ TỰ ĐỘNG GOM DỮ LIỆU TỪ 4 LINK
async function layTatCaDuLieuSS4() {
    try {
        for (const bang in LINK_CacBang_SS4) {
            const link = LINK_CacBang_SS4[bang];
            if (link === "" || !link.includes("http")) continue; 

            const response = await fetch(link);
            const data = await response.text();
            
            // Bỏ dòng tiêu đề đầu tiên trong Google Sheets
            const rows = data.split('\n').slice(1); 
            
            rows.forEach(row => {
                if(!row.trim()) return;
                const cols = row.split(','); 
                
                // Gom chuẩn xác 6 cột từ Sheets vào web
                DU_LIEU_BXH_SS4[bang].push({
                    rank: parseInt(cols[0]),
                    name: cols[1].trim(),
                    booyah: parseInt(cols[2]),
                    kill: parseInt(cols[3]),
                    match: parseInt(cols[4]),
                    total: parseInt(cols[5])
                });
            });
        }
        
        // VẼ GIAO DIỆN (Đảm bảo tên hàm này khớp với hàm bên dưới của bạn)
        renderLeaderboardV5('A'); 
        
    } catch (error) {
        console.error("Lỗi đồng bộ dữ liệu SS4:", error);
    }
}

// KHỞI ĐỘNG HỆ THỐNG!
layTatCaDuLieuSS4();
function renderLeaderboardV5(bangId) {
  const teams = DU_LIEU_BXH_SS4[bangId] || [];
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
    let logoThichHop = "logo-" + t.name.toLowerCase() + "ss4.jpg"; // LOGO TỰ ĐỘNG

    const card = document.createElement("div");
    card.className = "pod-card";
    card.style.cssText = `background:${p.bg};border-color:${p.border};order:${p.podOrder};padding-top:${p.podOrder===1?'20px':'14px'}`;
    card.innerHTML = `<div class="pod-shine"></div>
      <div class="pod-no" style="color:${p.color}">${p.label}</div>
      <div class="pod-icon" style="color:${p.color}">${p.icon}</div>
      <div class="pod-ava" style="background:${p.avaBg};border-color:${p.color};">
        <div class="pod-ring" style="border-color:${p.ringColor}"></div>
        <img src="${logoThichHop}" onerror="this.onerror=null; this.src='logo-uziss4.jpg';" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
      </div>
      <div class="pod-name" style="color:${p.color};text-shadow:0 0 18px ${p.color}66">${t.name}</div>
      <div class="pod-pts" style="color:${p.color};text-shadow:0 0 24px ${p.color}77">${t.total}</div>
      <div class="pod-ptslbl">tổng điểm</div>
      <div class="pod-stats">
        <div class="ps-item"><span class="ps-v" style="color:${p.color}99">${t.booyah}</span><span class="ps-l">WINNER</span></div>
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
    
    let logoThichHop = "logo-" + t.name.toLowerCase() + "ss4.jpg"; // LOGO TỰ ĐỘNG
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
            <img src="${logoThichHop}" onerror="this.onerror=null; this.src='logo-uziss4.jpg';" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
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
    let logoThichHop = "logo-" + t.name.toLowerCase() + "ss4.jpg";
    const card = document.createElement("div");
    card.className = "pod-card";
    card.style.cssText = `background:${p.bg};border-color:${p.border};order:${p.podOrder};padding-top:${p.podOrder===1?'20px':'14px'}`;
    card.innerHTML = `<div class="pod-shine"></div>
      <div class="pod-no" style="color:${p.color}">${p.label}</div>
      <div class="pod-icon" style="color:${p.color}">${p.icon}</div>
      <div class="pod-ava" style="background:${p.avaBg};border-color:${p.color};">
        <div class="pod-ring" style="border-color:${p.ringColor}"></div>
        <img src="${logoThichHop}" onerror="this.onerror=null; this.src='logo-uziss4.jpg';" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
      </div>
      <div class="pod-name" style="color:${p.color};text-shadow:0 0 18px ${p.color}66">${t.name}</div>
      <div class="pod-pts" style="color:${p.color};text-shadow:0 0 24px ${p.color}77">${t.total}</div>
      <div class="pod-ptslbl">tổng điểm</div>
      <div class="pod-stats">
        <div class="ps-item"><span class="ps-v" style="color:${p.color}99">${t.booyah}</span><span class="ps-l">WINNER</span></div>
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
    
    let logoThichHop = "logo-" + t.name.toLowerCase() + "ss4.jpg";
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
            <img src="${logoThichHop}" onerror="this.onerror=null; this.src='logo-uziss4.jpg';" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
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
    let logoThichHop = "logo-" + t.name.toLowerCase() + "ss4.jpg";
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
        <img src="${logoThichHop}" onerror="this.onerror=null; this.src='logo-uziss4.jpg';" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
      </div>
      <div class="pod-name" style="color:${p.color};text-shadow:0 0 18px ${p.color}66">${t.name}</div>
      <div class="pod-pts" style="${ptsStyle}">${t.total}</div>
      <div class="pod-ptslbl">tổng điểm</div>
      <div class="pod-stats">
        <div class="ps-item"><span class="ps-v" style="color:${p.color}99">${t.booyah}</span><span class="ps-l">WINNER</span></div>
        <div class="ps-item"><span class="ps-v" style="color:#22d3a5">${t.kill}</span><span class="ps-l">HẠ GỤC</span></div>
        <div class="ps-item"><span class="ps-v" style="color:#3a6080">${t.match}</span><span class="ps-l">TRẬN</span></div>
      </div>`;
    podWrap.appendChild(card);
    setTimeout(() => card.classList.add("show"), p.delay);
  });

  const maxTotal = DU_LIEU_CHUNGKET[0].total;
  DU_LIEU_CHUNGKET.slice(3).forEach((t, i) => {
    let logoThichHop = "logo-" + t.name.toLowerCase() + "ss4.jpg";
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
            <img src="${logoThichHop}" onerror="this.onerror=null; this.src='logo-uziss4.jpg';" style="width:100%;height:100%;border-radius:4px;object-fit:cover;">
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
// =========================================================================
// CHỨC NĂNG ANIMATION SCROLL REVEAL CHO TRANG THÔNG TIN (Fade Up)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Hiện 15% là kích hoạt animation
    };

    const ttObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Tắt theo dõi sau khi đã hiện để mượt mà hiệu năng
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Bắt đầu theo dõi tất cả các khối có class fade-up
    document.querySelectorAll('.fade-up').forEach(element => {
        ttObserver.observe(element);
    });
});
// HÀM CHIA MÀU BẢNG XẾP HẠNG (BẢN FULL MÀU SẮC CHI TIẾT)
function getTierV5(rank) {
    if (rank <= 6) return { 
        ac: "#00e5ff", sweep: "rgba(0,229,255,0.06)", bar: "#00e5ff", rowBg: "#020c14", 
        nameBase: "#3a6888", nameHover: "#00e5ff", rankBase: "#2a4a6a", 
        avaBase: "transparent", avaBorder: "transparent", avaHoverBg: "rgba(0,229,255,0.1)", avaHoverBorder: "#00e5ff",
        booyahCol: "#ffcc00", killCol: "#22d3a5", totalBase: "#00e5ff", totalSize: 16
    };
    if (rank <= 9) return { 
        ac: "#d060f0", sweep: "rgba(208,96,240,0.06)", bar: "#d060f0", rowBg: "#07020e", 
        nameBase: "#3a6888", nameHover: "#d060f0", rankBase: "#2a4a6a", 
        avaBase: "transparent", avaBorder: "transparent", avaHoverBg: "rgba(208,96,240,0.1)", avaHoverBorder: "#d060f0",
        booyahCol: "#ffcc00", killCol: "#22d3a5", totalBase: "#d060f0", totalSize: 16
    };
    return { 
        ac: "#40a0e0", sweep: "rgba(64,160,224,0.05)", bar: "#40a0e0", rowBg: "#02080f", 
        nameBase: "#3a6888", nameHover: "#40a0e0", rankBase: "#2a4a6a", 
        avaBase: "transparent", avaBorder: "transparent", avaHoverBg: "rgba(64,160,224,0.1)", avaHoverBorder: "#40a0e0",
        booyahCol: "#ffcc00", killCol: "#22d3a5", totalBase: "#40a0e0", totalSize: 16
    };
}