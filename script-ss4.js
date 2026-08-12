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
    "vktss4": {
        name: "VKT",
        desc: "VKT – Tên đầy đủ là Vân Kiếm Tôn. Mang khí chất của một kiếm khách giữa phong vân, Vân Kiếm Tôn không tìm kiếm chiến thắng bằng lời nói mà bằng từng đường kiếm sắc bén trên chiến trường. Kiếm đã xuất, không lùi bước; trận đã vào, chỉ hướng đến chiến thắng tại Survival Legacy Cup SS4!",
        logo: "logo-vktss4.jpg",
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
        logo: "logo-tsss4.jpg",
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
        logo: "logo-fhss4.jpg",
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
        logo: "logo-btvss4.jpg",
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
        logo: "logo-bbess4.jpg", 
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
        logo: "logo-hdss4.jpg",
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
        logo: "logo-tmhss4.jpg",
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
        logo: "logo-kess4.jpg",
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
        logo: "logo-adess4.jpg",
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
        logo: "logo-bzess4.jpg",
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
        logo: "logo-tckss4.jpg",
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
        logo: "logo-adnss4.jpg",
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
        logo: "logo-slss4.jpg",
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
        logo: "logo-ilgss4.jpg",
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
        logo: "logo-slass4.jpg",
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
        logo: "logo-artyss4.jpg",
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
        logo: "logo-blss4.jpg",
        country: "", 
        players: [
            { n: "BL.FORX", r: "RUSHER", id: "10662958879" },
            { n: "BL.NBBZ", r: "BOMBER", id: "4461929512" },
            { n: "BL.FAUST", r: "SNIPER", id: "6309254787" },
            { n: "BL.SIKIBIDI", r: "SUPPORT", id: "2421066275" },
            { n: "BL.LINA", r: "SUPPORT", id: "2338588519" }
        ]
    },
    "nexss4": {
        name: "NEX",
        desc: "NEX – Tên đầy đủ là NEXSIAS Esports. Next level, next threat. NEXSIAS không bước vào chiến trường để hòa mình vào đám đông, mà để trở thành cái tên khiến đối thủ phải dè chừng. Càng vào trận, NEX càng tăng tốc, càng áp lực càng bùng nổ — sẵn sàng vươn lên một đẳng cấp mới tại Survival Legacy Cup SS4!",
        logo: "logo-nexss4.jpg",
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
        logo: "logo-n1ctss4.jpg",
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
        logo: "logo-bbss4.jpg",
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
        logo: "logo-tgess4.jpg",
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
        logo: "logo-kmss4.jpg",
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
        logo: "logo-rzss4.jpg",
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
        logo: "logo-rz2ss4.jpg",
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
        logo: "logo-zgdxss4.jpg",
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
        logo: "logo-sgpss4.jpg",
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
        logo: "logo-rrqss4.jpg",
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
        logo: "logo-mekss4.jpg",
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
        logo: "logo-lkess4.jpg",
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
        logo: "logo-kkss4.jpg",
        country: "", 
        players: [
            { n: "KK.MHCUONG", r: "RUSHER", id: "7519765743" },
            { n: "KK.DUCANH", r: "RUSHER", id: "1263945996" },
            { n: "KK.ACH", r: "RIFLER", id: "4235464631" },
            { n: "KK.MINHDANG", r: "BOMBER", id: "1913479101" },
            { n: "KK.ANHGM", r: "SNIPER", id: "8145868857" }
        ]
    },
    "kme": {
        name: "KME",
        desc: "KME – Tên đầy đủ là KM Esports. Keep Moving, Keep Winning – không ngừng tiến lên, không ngừng chiến thắng. KME mang tinh thần càng đánh càng lì, càng vào sâu càng bùng nổ. Không đứng yên, không chùn bước — KME sẵn sàng tăng tốc và săn chiến thắng tại Survival Legacy Cup SS4!",
        logo: "logo-kmess4.jpg",
        country: "", 
        players: [
            { n: "KME.LOSTINUS", r: "RUSHER", id: "3016983320" },
            { n: "KME.EZLOVE", r: "RIFLER", id: "2146266439" },
            { n: "KME.PHAMTIEN",r: "BOMBER", id: "2315234124" },
            { n: "KME.GUNNERS", r: "SNIPER", id: "5975854296" },
            { n: "KME.BI", r: "SUPPORT", id: "5826764732 "}
        ]
    },
    "pte": {
        name: "PTE",
        desc: "PTE – Tên đầy đủ là PTE. Power • Tactics • Elite – sức mạnh, chiến thuật và bản lĩnh tinh nhuệ. PTE không bước vào trận đấu để làm nền, mà để tạo khác biệt, bứt phá và quyết chiến đến cùng tại Survival Legacy Cup SS3!",
        logo: "logo-pte.jpg",
        country: "", 
        players: [
            { n: "PTE.THANHDAT", r: "RUSHER", id: "1778037828" },
            { n: "PTE.REYKER", r: "BOMBER", id: "7934151585" },
            { n: "PTE.TRIEUVY", r: "SNIPER", id: "1814073359" },
            { n: "PTE.PU", r: "SUPPORT", id: "6334762860" },
            { n: "PTE.KUDEN", r: "SUPPORT", id: "7300663730" }
        ]
    },
    "uziss3": {
        name: "UZI",
        desc: "UZI - Tên đầy đủ là UZI　LEGENDS. Đội tuyển mang hình tượng “song UZI khai hỏa”, tốc độ xả đạn nghẹt thở, dồn ép liên tục khiến đối thủ không kịp thở, vào giao tranh là quét sạch đội hình đối thủ trong tích tắc, thể hiện đẳng cấp “bắn nhanh – thắng nhanh” tại Survival Legacy Cup SS3!",
        logo: "logo-uzi.jpg",
        country: "", 
        players: [
            { n: "UZI.MILLOW", r: "RUSHER", id: "2444693631" },
            { n: "UZI.FOX", r: "RUSHER", id: "6895539974" },
            { n: "UZI.HANA", r: "BOMBER", id: "2104295752" },
            { n: "UZI.CHOPPER", r: "SNIPER", id: "3659332602" },
            { n: "UZI.BIN", r: "SUPPORT", id: "9173149407" }
        ]
    },
    "vta": {
        name: "VTA",
        desc: "VTA – Tên đầy đủ là VTA. Victory • Tactics • Ambition – chiến thắng, chiến thuật và khát vọng. VTA bước vào mỗi trận đấu với mục tiêu rõ ràng: chơi bằng thực lực, đánh bằng bản lĩnh và quyết tâm tiến xa tại Survival Legacy Cup SS3!",
        logo: "logo-vta.jpg",
        country: "", 
        players: [
            { n: "VTA.PHUCTHINH", r: "RUSHER", id: "7754321281" },
            { n: "VTA.TUANANH", r: "BOMBER", id: "1047965020" },
            { n: "VTA.MHOANG", r: "SNIPER", id: "5969646401" },
            { n: "VTA.TANDUAN", r: "SNIPER", id: "5001589171" },
            { n: "VTA.DUCANH", r: "SUPPORT", id: "3309814632" }
        ]
    },
    "tmh": {
        name: "TMH",
        desc: "TMH – Tên đầy đủ là TMH. Think. Move. Hunt. – nghĩ nhanh, di chuyển chuẩn, săn chiến thắng. TMH không cần ồn ào để tạo áp lực; chỉ cần một khoảnh khắc đúng lúc, đội tuyển sẵn sàng biến thế trận và ghi dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-tmh.jpg",
        country: "", 
        players: [
            { n: "TMH.VANTUAN", r: "RUSHER", id: "1285407799" },
            { n: "TMH.BOYWALK", r: "BOMBER", id: "11041145321" },
            { n: "TMH.MY", r: "SNIPER", id: "9353533657" },
            { n: "TMH.AN", r: "SUPPORT", id: "9279800249" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "ze": {
        name: "ZE",
        desc: "4T – Tên đầy đủ là 4T ESPORTS. Đội tuyển đại diện cho “4 Triggers – 4 họng súng luôn sẵn sàng khai hỏa”, nơi mỗi thành viên là một điểm nổ có thể kích hoạt bất cứ lúc nào. Khi 4T nhập cuộc, trận đấu không còn là kiểm soát-mà là chuỗi phản ứng dây chuyền của những pha hủy diệt tại Survival Legacy Cup SS1!",
        logo: "logo-4t.jpg",
        country: "", 
        players: [
            { n: "ZE.DNDAN", r: "RUSHER", id: "7939875539" },
            { n: "ZE.LHT", r: "RUSHER", id: "9531744891" },
            { n: "ZE.HIEU", r: "RIFLER", id: "8614179975" },
            { n: "ZE.TEN", r: "SNIPER", id: "5401984097" },
            { n: "ZE.EMBE", r: "SUPPORT", id: "2124497748" }
        ]
    },
    "sgp2": {
        name: "SGP2",
        desc: "SGP2 – Tên đầy đủ là SGP2. Strike • Glory • Power — Level 2. Không chỉ bước vào để thi đấu, SGP2 hướng đến một cấp độ hoàn toàn khác: mạnh hơn, nhanh hơn và quyết liệt hơn. Sẵn sàng bùng nổ trong từng pha giao tranh, SGP2 quyết tâm tạo dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-sgp2.jpg",
        country: "", 
        players: [
            { n: "SGP2.LOI", r: "RUSHER", id: "8231737839" },
            { n: "SGP2.DH", r: "RIFLER", id: "3081890813" },
            { n: "SGP2.EMIT", r: "BOMBER", id: "7781127261" },
            { n: "SGP2.GHOST", r: "SNIPER", id: "9861486205" },
            { n: "SGP2.MEO", r: "SUPPORT", id: "8720767754" }
        ]
    },
    "ggl": {
        name: "GGL",
        desc: "GGL – Tên đầy đủ là GGL. Go • Grind • Glory – tiến lên, không ngừng rèn luyện và hướng tới vinh quang. GGL không cần khởi đầu hoàn hảo, chỉ cần càng đánh càng mạnh. Với tinh thần quyết chiến và khát khao bứt phá, GGL sẵn sàng tạo dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-ggl.jpg",
        country: "", 
        players: [
            { n: "GGL.CUBA", r: "RUSHER", id: "4146302957" },
            { n: "GGL.DEKAY", r: "RUSHER", id: "5529315258" },
            { n: "GGL.SLASH", r: "BOMBER", id: "1156181860" },
            { n: "GGL.CHAN", r: "SNIPER", id: "8722710019" },
            { n: "GGL.YOGOU", r: "SUPPORT", id: "248286997" }
        ]
    },
    "klbb": {
        name: "KLBB",
        desc: "KLBB – Tên đầy đủ là KLBB Esports. Keep • Lock • Battle • Break – giữ vững, khóa mục tiêu, chiến đấu và bứt phá. KLBB Esports càng vào sâu càng lì đòn, càng áp lực càng bản lĩnh. Không ngại bất kỳ đối thủ nào, KLBB quyết tâm phá mọi giới hạn và tạo dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-klbb.jpg",
        country: "", 
        players: [
            { n: "KLBB.HUUDAI", r: "RUSHER", id: "928351548" },
            { n: "KLBB.TUANANH", r: "RIFLER", id: "13022794005" },
            { n: "KLBB.DUCVIET", r: "SNIPER", id: "7297998533" },
            { n: "KLBB.GIABAO", r: "SUPPORT", id: "9653299037" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "sl": {
        name: "SL",
        desc: "SL – Tên đầy đủ là Serein Line. Mang trong mình sự điềm tĩnh của “Serein” – một vẻ đẹp yên bình giữa những biến động, Serein Line không cần ồn ào để tạo khác biệt. Càng áp lực, SL càng lạnh lùng, càng quyết đoán và sẵn sàng bứt phá tại Survival Legacy Cup SS3!",
        logo: "logo-sl.jpg",
        country: "", 
        players: [
            { n: "SL.KING", r: "RUSHER", id: "2325777762" },
            { n: "SL.KAM", r: "RIFLER", id: "362038211" },
            { n: "SL.HCHUONG", r: "BOMBER", id: "1185079614" },
            { n: "SL.DREX", r: "SNIPER", id: "5223838420" },
            { n: "SL.EMKHOI", r: "SNIPER", id: "2791106345" }
        ]
    },
    "hbpe": {
        name: "HBPE",
        desc: "HBPE – Tên đầy đủ là HBP Esports. Mang tinh thần Hold • Break • Push • Elevate, HBP Esports luôn biết khi nào cần giữ thế, khi nào phải bứt phá. Bình tĩnh trong từng bước di chuyển, quyết đoán trong thời khắc quyết định, HBPE sẵn sàng vượt giới hạn và vươn lên tại Survival Legacy Cup SS3!",
        logo: "logo-hbpe.jpg",
        country: "", 
        players: [
            { n: "HBPE.KENDY", r: "RUSHER", id: "1774361226" },
            { n: "HBPE.MYDIEU", r: "BOMBER", id: "2830766201" },
            { n: "HBPE.THANHDAT", r: "SNIPER", id: "5681703686" },
            { n: "HBPE.KEN", r: "SNIPER", id: "9079507302" },
            { n: "HBPE.ZADRED", r: "SUPPORT", id: "1884223878" }
        ]
    },
    "dpkq": {
        name: "DPKQ",
        desc: "DPKQ – Tên đầy đủ là DPKQ Esports. Don’t Pause. Keep Qualifying. – không dừng lại, không ngừng tiến bước. DPKQ Esports càng vào sâu càng bản lĩnh, càng áp lực càng quyết đoán, sẵn sàng bứt phá qua từng vòng đấu và tạo dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-dpkq.jpg",
        country: "", 
        players: [
            { n: "DPKQ.NABABI", r: "RUSHER", id: "4162915867" },
            { n: "DPKQ.NOTHING", r: "RUSHER", id: "8185602496" },
            { n: "DPKQ.MVP", r: "SNIPER", id: "2545864104" },
            { n: "DPKQ.TANDUNG", r: "SUPPORT", id: "6237439641" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "noka": {
        name: "NOKA",
        desc: "NOKA – Tên đầy đủ là NOKA. Never Overlook. Keep Advancing. – không xem nhẹ bất kỳ đối thủ nào, không ngừng tiến lên. NOKA bước vào từng trận đấu với sự tự tin, quyết đoán và tinh thần sẵn sàng bứt phá để tạo dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-noka.jpg",
        country: "", 
        players: [
            { n: "NOKA.LAVIDA", r: "RUSHER", id: "3225479273" },
            { n: "NOKA.TDAT", r: "RUSHER", id: "2491284727" },
            { n: "NOKA.CRYLUV", r: "RIFLER", id: "2763014509" },
            { n: "NOKA.HUNG", r: "RIFLER", id: "8776372081" },
            { n: "NOKA.NOVA", r: "SUPPORT", id: "1824618270" }
        ]
    },
    "xht": {
        name: "XHT",
        desc: "XHT – Tên đầy đủ là XHAMTERS. Nghe tên tưởng đùa, vào trận mới biết không đùa được. XHT mang đến lối chơi khó đoán, sẵn sàng tạo biến số và khiến mọi đối thủ phải dè chừng. Tên có thể gây cười, nhưng thực lực thì không — XHT quyết tâm tạo dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-xht.jpg",
        country: "", 
        players: [
            { n: "XHT.AGM", r: "RUSHER", id: "1731908696" },
            { n: "XHT.PLTL",r: "RIFLER", id: "3538480583" },
            { n: "XHT.CUTIT", r: "BOMBER", id: "9326144006" },
            { n: "XHT.NGNHAT", r: "SNIPER", id: "3120004297" },
            { n: "XHT.SKIBIDI", r: "SUPPORT", id: "4465994720" }
        ]
    },
    "tkt": {
        name: "TKT",
        desc: "TKT – Tên đầy đủ là TOKUTA. TO the top, Keep fighting, TAke the win — tiến lên đỉnh, chiến đấu đến cùng, giành lấy chiến thắng. TKT không vào trận để làm nền, mà để tạo bất ngờ và khiến từng khoảnh khắc tại Survival Legacy Cup SS3 phải nhớ đến cái tên TOKUTA!",
        logo: "logo-tkt.jpg",
        country: "", 
        players: [
            { n: "TKT.NVX", r: "RUSHER", id: "6556475658" },
            { n: "TKT.HUNG", r: "RUSHER", id: "9061635777" },
            { n: "TKT.U7E", r: "RIFLER", id: "6775937715" },
            { n: "TKT.VTT", r: "SNIPER", id: "3201187189" },
            { n: "TKT.ODCH", r: "SUPPORT", id: "9774162852" }
        ]
    },
    "h2k": {
        name: "H2K",
        desc: "H2K – Tên đầy đủ là H2K. Hard to Kill – khó bị đánh bại. Đúng như cái tên, H2K luôn giữ vững bản lĩnh ngay cả khi thế trận trở nên căng thẳng nhất. Càng bị dồn ép, H2K càng lì lợm, càng quyết chiến và sẵn sàng lật ngược mọi thế trận tại Survival Legacy Cup SS3!",
        logo: "logo-h2k.jpg",
        country: "", 
        players: [
            { n: "H2K.VANHIEU", r: "RUSHER", id: "931508938" },
            { n: "H2K.SYTUAN", r: "BOMBER", id: "728485649" },
            { n: "H2K.MINHDUC", r: "BOMBER", id: "1047846802" },
            { n: "H2K.VIETHUNG", r: "SNIPER", id: "1679326020" },
            { n: "H2K.KTOAN", r: "SUPPORT", id: "1466891354" }
        ]
    },
    "stt": {
        name: "STT",
        desc: "STT – Tên đầy đủ là Shark TiTan. Sau một thời gian vắng bóng, Shark TiTan chính thức trở lại. Lần comeback này không phải để tìm lại ánh hào quang, mà để tạo ra một phiên bản mạnh mẽ hơn, lì lợm hơn và đáng gờm hơn. STT trở lại để săn chiến thắng và viết tiếp hành trình tại Survival Legacy Cup SS3!",
        logo: "logo-stt.jpg",
        country: "", 
        players: [
            { n: "STT.HUNG", r: "RUSHER", id: "10081813956" },
            { n: "STT.NGAO", r: "RIFLER", id: "1756227636" },
            { n: "STT.TDUNG", r: "SNIPER", id: "1982342638" },
            { n: "STT.VP", r: "SUPPORT", id: "5329839627" },
            { n: "STT.GIAPHONG", r: "SUPPORT", id: "1380391498S" }
        ]
    },
    "tae": {
        name: "TAE",
        desc: "TAE – Tên đầy đủ là Tu Anh Esports. Mang tinh thần của một tập thể luôn tiến về phía trước, TAE không ngại thử thách và luôn sẵn sàng tăng tốc khi thời khắc quyết định xuất hiện. Bản lĩnh trong từng pha đấu, quyết đoán trong từng khoảnh khắc, TAE quyết tâm tạo dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-tae.jpg",
        country: "", 
        players: [
            { n: "TAE.HDAC", r: "RUSHER", id: "1921590936" },
            { n: "TAE.KAYZ", r: "RUSHER", id: "8427796049" },
            { n: "TAE.VANDU", r: "SNIPER", id: "14784206632" },
            { n: "TAE.EMBI", r: "SNIPER", id: "1214825454" },
            { n: "TAE.SOI", r: "SUPPORT", id: "2778311951" }
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