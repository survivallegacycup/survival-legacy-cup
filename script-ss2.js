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
        dateEl.innerText = lichNgay[ngayThiDau] || "27/07/2026";
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
    "lkess2": {
        name: "LKE",
        desc: "LKE – Tên đầy đủ là LÊ KIÊN ESPORTS. Không cần hô hào quá lớn, LKE để kỹ năng lên tiếng. Mỗi pha giao tranh là một lời khẳng định, mỗi chiến thắng là một dấu ấn. Khi đã bước vào trận đấu, mục tiêu duy nhất của LÊ KIÊN ESPORTS là khiến cái tên của mình được nhắc đến nhiều nhất tại Survival Legacy Cup SS2!",
        logo: "logo-lkess2.jpg",
        country: "", 
        players: [
            { n: "LKE.CONG", r: "RUSHER", id: "2706594432" },
            { n: "LKE.KEY", r: "BOMBER", id: "2055349409" },
            { n: "LKE.FEAR", r: "SNIPER", id: "1693177119" },
            { n: "LKE.PLINH", r: "SUPPORT", id: "3209197272" },
            { n: "LKE.VANCUA", r: "SUPPORT", id: "1577337727" }
        ]
    },
    "pless2": {
        name: "PLE",
        desc: "PLE – Tên đầy đủ là PLE. Power • Legacy • Elite – sức mạnh, di sản và tinh thần tinh anh. PLE bước vào trận đấu với khát khao tạo nên dấu ấn của riêng mình, không ngại đối đầu với bất kỳ thử thách nào. Mỗi trận đấu là một cơ hội để khẳng định bản lĩnh, mỗi chiến thắng là một bước tiến đến vinh quang — PLE sẵn sàng bùng nổ tại Survival Legacy Cup SS2!",
        logo: "logo-pless2.jpg",
        country: "",
        players: [
            { n: "PLE.MHIEU", r: "RUSHER", id: "13221464596" },
            { n: "PLE.HOANGAN", r: "RUSHER", id: "6213932462" },
            { n: "PLE.HBO", r: "BOMBER", id: "7814538937" },
            { n: "PLE.NPHUC", r: "SNIPER", id: "276450094" },
            { n: "PLE.DLUONG", r: "SUPPORT", id: "4375352993" }
        ]
    },
    "ftss2": {
        name: "FT",
        desc: "FT – Tên đầy đủ là Fearless Team. Nỗi sợ là thứ khiến nhiều người chùn bước, nhưng với FT, đó chỉ là động lực để tiến lên. Dù đối thủ mạnh đến đâu hay thế trận khó khăn thế nào, Fearless Team vẫn giữ vững tinh thần chiến đấu và quyết tâm đến cùng. Không e ngại, không lùi bước, không bỏ cuộc — FT sẵn sàng chinh phục Survival Legacy Cup SS2!",
        logo: "logo-ftss2.jpg",
        country: "", 
        players: [
            { n: "FT.W4U", r: "RUSHER", id: "6456961336" },
            { n: "FT.JVARZ", r: "BOMBER", id: "4363598414" },
            { n: "FT.THANHDAI", r: "SNIPER", id: "3659332602" },
            { n: "FT.MILLOW", r: "SUPPORT", id: "2444693631" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ] 
    },
    "4whdss2": {
        name: "4WHD",
        desc: "4WHD – Tên đầy đủ là 4 Vui Vẻ Hoà Đồng. Không mang đến hình ảnh của những chiến binh lạnh lùng, 4WHD bước vào giải đấu với tinh thần đoàn kết, tích cực và luôn giữ ngọn lửa đam mê trong từng trận đấu. Nhưng đừng để sự vui vẻ đánh lừa, bởi khi đã vào trận, cả đội luôn chiến đấu hết mình vì màu cờ sắc áo. Vui vẻ ngoài trận đấu, quyết liệt trong trận đấu — 4WHD sẵn sàng tạo nên bất ngờ tại Survival Legacy Cup SS2!",
        logo: "logo-4whdss2.jpg",
        country: "", 
        players: [
            { n: "4WHD.TUANANH", r: "RUSHER", id: "2015939299" },
            { n: "4WHD.MNHAT", r: "RUSHER", id: "712500213" },
            { n: "4WHD.TRUONGAN", r: "RUSHER", id: "4359140364" },
            { n: "4WHD.TIGER", r: "SNIPER", id: "4109105748" },
            { n: "4WHD.HUUPHUOC", r: "SUPPORT", id: "6548727578" }
        ]
    },
    "tglss2": {
        name: "TGL",
        desc: "TGL – Tên đầy đủ là Team Gia Lai. Mang tinh thần của vùng đất Tây Nguyên đầy nắng gió, TGL bước vào chiến trường với sự lì lợm, mạnh mẽ và không ngại thử thách. Không chỉ thi đấu để chiến thắng, TGL còn quyết tâm mang dấu ấn Gia Lai đến Survival Legacy Cup SS2!",
        logo: "logo-tglss2.jpg", 
        country: "", 
        players: [
            { n: "TGL.DKHOI", r: "RUSHER", id: "1022337301" },
            { n: "TGL.HPHONG", r: "BOMBER", id: "9431656118" },
            { n: "TGL.GIAHAO", r: "SNIPER", id: "4371542961" },
            { n: "TGL.DKHOA", r: "SNIPER", id: "876012041" },
            { n: "TGL.CPHAT", e: "SUPPORT", id: "9712450395"}
        ]
    },
    "cupss2": {
        name: "CUP",
        desc: "CUP – Tên đầy đủ là CUP. Có những đội tuyển chiến đấu vì danh tiếng, có những đội tuyển chiến đấu vì phần thưởng. Nhưng với CUP, mục tiêu chỉ có một: nâng cao chiếc cúp vô địch. Mang trong mình khát khao chinh phục và tinh thần không bao giờ bỏ cuộc, CUP luôn sẵn sàng đối đầu với mọi thử thách. Đường đến vinh quang không dễ dàng, nhưng CUP sẽ chiến đấu đến cùng tại Survival Legacy Cup SS2!",
        logo: "logo-cupss2.jpg",
        country: "", 
        players: [
            { n: "CUP.EMHUY", r: "RUSHER", id: "9598223872" },
            { n: "CUP.EMCA", r: "BOMBER", id: "3033106390" },
            { n: "CUP.EMBI", r: "BOMBER", id: "9979079889" },
            { n: "CUP.EMDAY", r: "SNIPER", id: "2678630725" },
            { n: "CUP.EMBAO", r: "SUPPORT", id: "326665310" }
        ]
    },
    "tnfss2": {
        name: "TNF",
        desc: "TNF – Tên đầy đủ là TEAM NOT FOUND. Một cái tên tưởng như là lỗi hệ thống, nhưng lại là lời khẳng định đầy cá tính. Khi đối thủ tìm kiếm thông tin về TNF, thứ họ nhận được chỉ là sự bí ẩn. Không ai biết họ sẽ xuất hiện như thế nào, nhưng ai cũng phải dè chừng khi chạm trán. Ẩn mình trong bóng tối, bùng nổ trong thời khắc quyết định — TNF sẵn sàng tạo nên bất ngờ tại Survival Legacy Cup SS2!",
        logo: "logo-tnfss2.jpg",
        country: "", 
        players: [
            { n: "TNF.DHAO", r: "RUSHER", id: "15004360"},
            { n: "TNF.QVINH", r: "RUSHER", id: "1183370030" },
            { n: "TNF.LEYNII", r: "RIFLER", id: "561971260"},
            { n: "TNF.AMIA", r: "RIFLER", id: "4426672086" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "atess2": {
        name: "ATE",
        desc: "ATE – Tên đầy đủ là ATE. Aim • Trust • Execute – ngắm chuẩn mục tiêu, tin tưởng đồng đội và thực hiện kế hoạch đến cùng. ATE không phải đội tuyển thích nói nhiều, họ chọn cách chứng minh sức mạnh bằng hành động trên chiến trường. Kỷ luật trong lối chơi, quyết đoán trong giao tranh và lạnh lùng trước áp lực — ATE sẵn sàng bứt phá tại Survival Legacy Cup SS2!",
        logo: "logo-atess2.jpg",
        country: "", 
        players: [
            { n: "ATE.SUN",  r: "RUSHER", id: "5183160575" },
            { n: "ATE.DBIN",  r: "RIFLER", id: "7017022761" },
            { n: "ATE.HANA", r: "BOMBER", id: "2104295752" },
            { n: "ATE.FOR",  r: "SNIPER", id: "6738561967" },
            { n: "ATE.NTRI", r: "SUPPORT", id: "9348528189" }
        ]
    },
    "sess2": {
        name: "SE",
        desc: "SE – Tên đầy đủ là SE Esports. Silent Execution – im lặng nhưng đầy nguy hiểm. SE không cần trở thành tâm điểm trước khi trận đấu bắt đầu, bởi họ tin rằng kết quả cuối cùng mới là điều đáng nhớ nhất. Âm thầm tích lũy sức mạnh, bùng nổ đúng thời điểm và kết liễu gọn gàng — SE Esports sẵn sàng tạo nên bất ngờ tại Survival Legacy Cup SS2!",
        logo: "logo-sess2.jpg",
        country: "", 
        players: [
            { n: "SE.HONGPHI", r: "RUSHER", id: "8241364798"},
            { n: "SE.DUCTHIEN", r: "BOMBER", id: "15528147340" },
            { n: "SE.TANTHINH", r: "SNIPER", id: "6839460717" },
            { n: "SE.PHILONG", r: "SUPPORT", id: "1969967325" },
            { n: "SE.TPHONG", r: "SUPPORT", id: "10828968012" }
        ]
    },
    "t2alss2": {
        name: "T2AL",
        desc: "T2AL – Tên đầy đủ là T2AL. Một cái tên độc đáo mang theo tinh thần của những người luôn dám khác biệt. T2AL không bước vào giải đấu để làm nền cho bất kỳ ai, mà để tự viết nên câu chuyện của riêng mình. Dù đối mặt với thử thách nào, T2AL vẫn giữ vững ý chí, sẵn sàng bùng nổ và chiến đấu hết mình tại Survival Legacy Cup SS2!",
        logo: "logo-t2alss2.jpg",
        country: "", 
        players: [
            { n: "T2AL.LEVOR", r: "RUSHER", id: "9050876679" },
            { n: "T2AL.XQUYEN", r: "RIFLER", id: "5755547491" },
            { n: "T2AL.LHDUNG", r: "BOMBER", id: "13452922839" },
            { n: "T2AL.KTUAN", r: "SNIPER", id: "982519896" },
            { n: "T2AL.LHTUAN", r: "SUPPORT", id: "1794081493" }
        ]
    },
    "jkss2": {
        name: "JK",
        desc: "JK – Tên đầy đủ là JET KITTY. Đừng để cái tên dễ thương đánh lừa bạn. Khi bước vào chiến trường, JET KITTY luôn sẵn sàng chuyển từ đáng yêu sang đáng gờm chỉ trong tích tắc. Với lối chơi khó đoán và tinh thần không ngại va chạm, JK có thể là chú mèo ngoài đời, nhưng là mãnh thú trong trận đấu. Sẵn sàng săn chiến thắng tại Survival Legacy Cup SS2!",
        logo: "logo-jkss2.jpg",
        country: "", 
        players: [
            { n: "JK.DTHANH", r: "RUSHER", id: "9330818816" },
            { n: "JK.WY", r: "RIFLER", id: "8390009644" },
            { n: "JK.MINHKHANG", r: "SNIPER", id: "12456765114" },
            { n: "JK.THYZAN", r: "SUPPORT", id: "7849960599" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "bcmss2": {
        name: "BCM",
        desc: "BCM – Tên đầy đủ là BCM. Beyond Competitive Mindset – vượt xa giới hạn của một tinh thần thi đấu thông thường. BCM luôn hướng đến sự tiến bộ, không ngừng hoàn thiện bản thân qua từng trận đấu. Không ngại thất bại, không sợ thử thách, chỉ tập trung vào mục tiêu phía trước — BCM sẵn sàng khẳng định bản lĩnh tại Survival Legacy Cup SS2!",
        logo: "logo-bcmss2.jpg",
        country: "", 
        players: [
            { n: "BCM.ANHTHUY", r: "RUSHER", id: "6885450104" },
            { n: "BCM.XLIGHT", r: "RUSHER", id: "7736404517" },
            { n: "BCM.VHOANG", r: "RIFLER", id: "338291907" },
            { n: "BCM.TGAM", r: "BOMBER", id: "2386649347" },
            { n: "BCM.NNB", r: "SNIPER", id: "11902113344" }
        ]
    },
    "wbss2": {
        name: "WB",
        desc: "WB – Tên đầy đủ là WB. Wild Breakers – những kẻ phá vỡ mọi giới hạn. WB không thích đi theo lối mòn, họ luôn sẵn sàng tạo ra những pha xử lý táo bạo và những màn bứt phá bất ngờ. Càng hỗn loạn càng nguy hiểm, càng áp lực càng bùng nổ — WB quyết tâm để lại dấu ấn tại Survival Legacy Cup SS2!",
        logo: "logo-wbss2.jpg",
        country: "", 
        players: [
            { n: "WB.TRUNG", r: "RUSHER", id: "887238286" },
            { n: "WB.TSANG", r: "BOMBER", id: "5382822250" },
            { n: "WB.HLOI", r: "SNIPER", id: "1668278104" },
            { n: "WB.BAO", r: "SUPPORT", id: "2004524774" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG"}
        ]
    },
    "ptess2": {
        name: "PTE",
        desc: "PTE – Tên đầy đủ là PTE. Power • Tactics • Excellence – sức mạnh, chiến thuật và sự xuất sắc. PTE không chọn lối chơi an toàn, mà chọn cách đối mặt với thử thách bằng bản lĩnh và sự tự tin. Càng áp lực càng quyết tâm, càng giao tranh càng bùng nổ — PTE sẵn sàng khẳng định vị thế tại Survival Legacy Cup SS2!",
        logo: "logo-ptess2.jpg",
        country: "", 
        players: [
            { n: "PTE.TDAT", r: "RUSHER", id: "9301244448" },
            { n: "PTE.GIAHUY", r: "BOMBER", id: "327798964" },
            { n: "PTE.PHUCBO", r: "SNIPER", id: "1184142843" },
            { n: "PTE.NTA", r: "SUPPORT", id: "638505253" },
            { n: "PTE.MSANG", r :"SUPPORT", id: "7961250457"}
        ]
    },
    "gdass2": {
        name: "GDA",
        desc: "GDA – Tên đầy đủ là Gành Dầu Academy. Là tập thể những tuyển thủ trẻ đầy nhiệt huyết, GDA luôn sẵn sàng học hỏi, phát triển và chinh phục thử thách. Mỗi trận đấu là một cơ hội trưởng thành, mỗi chiến thắng là một bước tiến mới — GDA quyết tâm tỏa sáng tại Survival Legacy Cup SS2!",
        logo: "logo-gdass2.jpg",
        country: "", 
        players: [
            { n: "GDA.CTHIEN", r: "RUSHER", id: "7547340384" },
            { n: "GDA.WAN", r: "BOMBER", id: "9956040958" },
            { n: "GDA.NDUL", r: "SNIPER", id: "7720754299" },
            { n: "GDA.MHOA", r: "SNIPER", id: "641104087" },
            { n: "GDA.NUTS", r: "SUPPORT", id: "6752608040" }
        ]
    },
    "4svss2": {
        name: "4SV",
        desc: "4SV – Tên đầy đủ là 4SV. Four Strong Voices – bốn tiếng nói, một mục tiêu. Sức mạnh của 4SV không đến từ cá nhân xuất sắc nhất, mà đến từ sự đồng lòng của cả tập thể. Đoàn kết để chiến đấu, quyết tâm để chiến thắng — 4SV sẵn sàng khẳng định bản thân tại Survival Legacy Cup SS2!",
        logo: "logo-4svss2.jpg",
        country: "", 
        players: [
            { n: "4SV.INZAGHI", r: "RUSHER", id: "10662958879" },
            { n: "4SV.ITAR", r: "RIFLER", id: "6309254787" },
            { n: "4SV.CUSINA", r: "BOMBER", id: "4461929512" },
            { n: "4SV.SIKIBIDI", r: "SNIPER", id: "2421066275s" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "fhss2": {
        name: "FH",
        desc: "FH – Tên đầy đủ là FIRE HORSE. Như một chiến mã bùng cháy trên chiến trường, FIRE HORSE luôn lao về phía trước với tốc độ, sức mạnh và tinh thần không bao giờ bỏ cuộc. Sẵn sàng đốt cháy mọi giới hạn, FH quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS2!",
        logo: "logo-fhss2.jpg",
        country: "", 
        players: [
            { n: "FH.DKHANG", r: "RUSHER", id: "2590142436" },
            { n: "FH.JOHNSON", r: "RUSHER", id: "926872567" },
            { n: "FH.NPS", r: "SNIPER", id: "746523523" },
            { n: "FH.SADER", r: "SUPPORT", id: "2277930623" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "lgcss2": {
        name: "LGC",
        desc: "LGC – Tên đầy đủ là LEGACY. Di sản không được tạo nên chỉ bằng lời nói, mà bằng những trận đấu và những chiến thắng được ghi nhớ theo thời gian. LGC bước vào chiến trường với khát khao để lại dấu ấn của riêng mình, chiến đấu hết mình và viết tiếp di sản tại Survival Legacy Cup SS2!",
        logo: "logo-lgcss2.jpg",
        country: "", 
        players: [
            { n: "LGC.BLAM", r: "RUSHER", id: "464320039" },
            { n: "LGC.KREW",r: "RUSHER", id: "9412171548" },
            { n: "LGC.QNHIM", r: "SNIPER", id: "9057175396" },
            { n: "LGC.CUSHIN", r: "SUPPORT", id: "1779283386" },
            { n: "LGC.BOP", r: "SUPPORT", id: "1171104210" }
        ]
    },
    "gdess2": {
        name: "GDE",
        desc: "GDE – Tên đầy đủ là Gành Dầu Esports. Mang theo niềm tự hào và tinh thần chiến đấu của tập thể, GDE luôn sẵn sàng đối mặt với mọi thử thách trên chiến trường. Bản lĩnh trong từng pha giao tranh, quyết tâm trong từng trận đấu — GDE hướng đến việc khẳng định tên tuổi tại Survival Legacy Cup SS2!",
        logo: "logo-gdess2.jpg",
        country: "", 
        players: [
            { n: "GDE.KIWI", r: "RUSHER", id: "15339713714" },
            { n: "GDE.VANKHANH", r: "RUSHER", id: "7922229586" },
            { n: "GDE.TIENDAT", r: "SNIPER", id: "9764404235" },
            { n: "GDE.KIMANH",r: "SNIPER", id: "9330363250" },
            { n: "GDE.HAO", r: "SUPPORT", id: "9189412602" }
        ]
    },
    "ktgss2": {
        name: "KTG",
        desc: "KTG – Tên đầy đủ là KING TIGER. Mang khí chất của một vị vua và sự hung mãnh của mãnh hổ, KTG luôn sẵn sàng lao vào những cuộc đối đầu khốc liệt nhất. Uy lực như hổ vương, bản lĩnh như nhà vua — KTG quyết tâm gầm vang tại Survival Legacy Cup SS2!",
        logo: "logo-ktgss2.jpg",
        country: "", 
        players: [
            { n: "KTG.LION", r: "RUSHER", id: "677558905" },
            { n: "KTG.TIGER", r: "RIFLER", id: "25765433777" },
            { n: "KTG.CAT", r: "BOMBER", id: "622659438" },
            { n: "KTG.FOX", r: "SNIPER", id: "3200843467" },
            { n: "KTG.DUCK", r: "SUPPORT", id: "2340886222" }
        ]
    },
    "ovnss2": {
        name: "OVN",
        desc: "OVN – Tên đầy đủ là OBLIVION. Đội tuyển đại diện cho “Oblivion – Sự xóa sổ”, nơi mọi dấu vết của đối thủ đều bị quét sạch không thương tiếc. OVN không chỉ chiến thắng-họ khiến kẻ địch “biến mất” khỏi bản đồ tại Survival Legacy Cup SS2!",
        logo: "logo-ovnss2.jpg",
        country: "", 
        players: [
            { n: "OVN.TU", r: "RUSHER", id: "9881928946" },
            { n: "OVN.DUYEN", r: "RUSHER", id: "2299068955" },
            { n: "OVN.TINH", r: "BOMBER", id: "8866941793" },
            { n: "OVN.TIEN", r: "SNIPER", id: "12350585814" },
            { n: "OVN.DUY",  r: "SUPPORT", id: "12576856883" }
        ]
    },
    "vktss2": {
        name: "VKT",
        desc: "VKT – Tên đầy đủ là Vân Kiếm Tôn. Mang khí chất của một kiếm khách giữa phong vân, Vân Kiếm Tôn không tìm kiếm chiến thắng bằng lời nói mà bằng từng đường kiếm sắc bén trên chiến trường. Kiếm đã xuất, không lùi bước; trận đã vào, chỉ hướng đến chiến thắng tại Survival Legacy Cup SS2!",
        logo: "logo-vktss2.jpg",
        country: "", 
        players: [
            { n: "VKT.MCUONG", r: "RUSHER", id: "7809833038" },
            { n: "VKT.HIEUZZ", r: "RUSHER", id: "9849569769" },
            { n: "VKT.TONGCHU",r: "RIFLER", id: "5755160631" },
            { n: "VKT.TL", r: "SNIPER", id: "13382599307" },
            { n: "VKT.NHOMM", r: "SUPPORT", id: "7068947577S"}
        ]
    },
    "xhss2": {
        name: "XH",
        desc: "XH – Tên đầy đủ là XH ESPORTS. Đội tuyển đại diện cho “Xtreme Hunt – Cuộc săn cực hạn”, luôn truy đuổi đối thủ đến cùng và không cho bất kỳ cơ hội trốn thoát nào. XH không chỉ tìm mục tiêu—họ săn đến khi kết thúc hoàn toàn tại Survival Legacy Cup SS2!",
        logo: "logo-xhss2.jpg",
        country: "", 
        players: [
            { n: "XH.VINHHAO", r: "RUSHER", id: "2944272645" },
            { n: "XH.GIABAO", r: "RUSHER", id: "8231699643" },
            { n: "XH.KHANH", r: "BOMBER", id: "2205566148" },
            { n: "XH.VANLONG", r: "SNIPER", id: "7433774761" },
            { n: "XH.HUUNHAN", r: "SUPPORT", id: "4477210794" }
        ]
    },
    "dsss2": {
        name: "DS",
        desc: "DS – Tên đầy đủ là DIMSUM. Đừng để cái tên đồ ăn khiến bạn mất cảnh giác. DS có thể mang đến cảm giác vui vẻ bên ngoài, nhưng khi vào trận lại là một tập thể đầy khó chịu và khó lường. Nhỏ gọn nhưng chất lượng, đơn giản nhưng hiệu quả — DS sẵn sàng hấp chín mọi thử thách tại Survival Legacy Cup SS2!",
        logo: "logo-dsss2.jpg",
        country: "", 
        players: [
            { n: "DS.HOANGQUAN", r: "RUSHER", id: "184810428" },
            { n: "DS.GIABAO", r: "RIFLER", id: "14558452444" },
            { n: "DS.CHIBAO", r: "RIFLER", id: "7124555583" },
            { n: "DS.HOANHIEP", r: "SNIPER", id: "3971532776" },
            { n: "DS.VANSON", r: "SUPPORT", id: "2347132182" }
        ]
    },
    "msess2": {
        name: "MSE",
        desc: "MSE – Tên đầy đủ là Master Kill Esports. Sinh ra để săn mạng hạ gục, MSE luôn tìm kiếm cơ hội để áp đảo đối thủ bằng những pha giao tranh đầy quyết đoán. Mỗi lần nổ súng là một lần tạo khác biệt, mỗi pha giao tranh là cơ hội để tỏa sáng — MSE sẵn sàng bùng nổ tại Survival Legacy Cup SS2!",
        logo: "logo-msess2.jpg",
        country: "", 
        players: [
            { n: "MSE.XLIGHT", r: "RUSHER", id: "1743269057" },
            { n: "MSE.BECA", r: "RUSHER", id: "1234971029" },
            { n: "MSE.KING", r: "BOMBER", id: "2325777762" },
            { n: "MSE.KAY", r: "SUPPORT", id: "5622866722" },
            { n: "MSE.LUFFY", r: "SUPPORT", id: "7430013561" }
        ]
    },
    "tbess2": {
        name: "TBE",
        desc: "TBE – Tên đầy đủ là Tam Bình Esports. Mang theo tinh thần đoàn kết và ý chí chiến đấu bền bỉ, TBE luôn sẵn sàng đối mặt với mọi thử thách trên chiến trường. Bình tĩnh trong chiến thuật, bùng nổ trong giao tranh — Tam Bình Esports quyết tâm ghi dấu ấn tại Survival Legacy Cup SS2!",
        logo: "logo-tbess2.jpg",
        country: "", 
        players: [
            { n: "TBE.XBINN", r: "RUSHER", id: "535936843" },
            { n: "TBE.VULONG", r: "RIFLER", id: "6521256932" },
            { n: "TBE.S4ZG", r: "BOMBER", id: "154206856" },
            { n: "TBE.TANHUY", r: "SNIPER", id: "1214978140" },
            { n: "TBE.BON", r: "SUPPORT", id: "709852756" }
        ]
    },
    "adess2": {
        name: "ADE",
        desc: "ADE – Tên đầy đủ là ADE. Không cần một cái tên quá dài để tạo dấu ấn, ADE chọn cách khiến đối thủ phải ghi nhớ bằng màn trình diễn trên chiến trường. Với tinh thần không lùi bước, khả năng thích nghi linh hoạt và khát khao chinh phục từng trận đấu, ADE sẵn sàng bứt phá, tạo nên những khoảnh khắc đáng nhớ và khẳng định bản lĩnh tại Survival Legacy Cup SS2!",
        logo: "logo-adess2.jpg",
        country: "", 
        players: [
            { n: "ADE.HYZORX7", r: "RUSHER", id: "1029129000" },
            { n: "ADE.TNGHIA", r: "RUSHER", id: "4275108112" },
            { n: "ADE.CONCUA7M", r: "BOMBER", id: "390416383" },
            { n: "ADE.POTENTO", r: "SNIPER", id: "983026618" },
            { n: "ADE.MEMORY", r: "SUPPORT", id: "3768548347"  }
        ]
    },
    "vtess2": {
        name: "VTE",
        desc: "VTE – Tên đầy đủ là VTE Esports. Với tinh thần không ngừng tiến lên và khát khao chinh phục, VTE luôn sẵn sàng bước vào mọi trận đấu bằng sự tự tin và quyết tâm cao nhất. Càng áp lực càng bản lĩnh, càng thử thách càng mạnh mẽ — VTE quyết tâm tỏa sáng tại Survival Legacy Cup SS2!",
        logo: "logo-vtess2.jpg",
        country: "", 
        players: [
            { n: "VTE.UTKHANH", r: "RUSHER", id: "14839201287" },
            { n: "VTE.TUANPHI", r: "RIFLER", id: "12927517522" },
            { n: "VTE.NGUYEN", r: "BOMBER", id: "2946044939" },
            { n: "VTE.VANNHUAN", r: "BOMBER", id: "15873084690" },
            { n: "VTE.THU", r: "SUPPORT", id: "7444419352" }
        ]
    },
    "tvkss2": {
        name: "TVK",
        desc: "TVK – Tên đầy đủ là The Viking Esports. Mang tinh thần của những chiến binh Viking huyền thoại, TVK không ngại đối đầu với sóng gió hay những thử thách khắc nghiệt nhất. Dũng mãnh trong giao tranh, kiên cường trước áp lực — TVK sẵn sàng chinh phục mọi chiến tuyến tại Survival Legacy Cup SS2!",
        logo: "logo-tvkss2.jpg",
        country: "", 
        players: [
            { n: "TVK.PI", r: "RUSHER", id: "91244927" },
            { n: "TVK.VN", r: "RUSHER", id: "12807376070" },
            { n: "TVK.DREAM", r: "RIFLER", id: "2639091217" },
            { n: "TVK.TAY", r: "SNIPER", id: "1755026608" },
            { n: "TVK.HUYCAT", r: "SUPPORT", id: "10347046677" }
        ]
    },
    "sgpss2": {
        name: "SGP",
        desc: "SGP – Tên đầy đủ là SGP. Mang tinh thần Strike • Glory • Power, SGP luôn bước vào trận đấu với khát khao chiến thắng và bản lĩnh của những chiến binh thực thụ. Không ngại đối đầu, không lùi bước trước thử thách, SGP quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS2!",
        logo: "logo-sgpss2.jpg",
        country: "", 
        players: [
            { n: "SGP.ZENTA", r: "RUSHER", id: "4364899318" },
            { n: "SGP.GHOST", r: "RUSHER", id: "9861486205" },
            { n: "SGP.CACHEP", r: "RUSHER", id: "7769978863" },
            { n: "SGP.VANMINH", r: "RIFLER", id: "6806083725" },
            { n: "SGP.DHAU", r: "SUPPORT", id: "6454588420" }
        ]
    },
    "ckess2": {
        name: "CKE",
        desc: "CKE – Tên đầy đủ là Chicken Esports. Đừng để cái tên Chicken khiến bạn nghĩ đến sự e dè. CKE mang đến tinh thần thi đấu đầy tự tin, luôn sẵn sàng đối mặt với mọi thử thách và tạo nên bất ngờ trước những đối thủ mạnh. Có thể là gà trong tên gọi, nhưng trên chiến trường lại là những chiến binh không ngại va chạm — CKE quyết tâm ghi dấu ấn tại Survival Legacy Cup SS2!",
        logo: "logo-ckess2.jpg",
        country: "", 
        players: [
            { n: "CKE.GTHINH", r: "RUSHER", id: "3131294525" },
            { n: "CKE.ANBELL", r: "RUSHER", id: "952623283" },
            { n: "CKE.KQUY", r: "SNIPER", id: "1547430253" },
            { n: "CKE.HNGHIA", r: "SUPPORT", id: "3701999609" },
            { n: "CKE.TDUONG", r: "SUPPORT", id: "9887968187" }
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
                            SURVIVAL LEGACY<br>CUP SS2
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
        switchTeam('lkess2'); 
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