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
    "vkt3": {
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
    "nok2": {
        name: "NOK",
        desc: "NOK – Tên đầy đủ là NOKARA. Mang trong mình tinh thần không ngại va chạm và luôn hướng đến những màn trình diễn bùng nổ, bước vào giải đấu với mục tiêu không chỉ góp mặt mà còn để lại dấu ấn. Mỗi trận đấu là một cơ hội để khẳng định bản lĩnh và đưa cái tên NOKARA vươn xa tại Survival Legacy Cup SS3!",
        logo: "logo-nok2.jpg",
        country: "",
        players: [
            { n: "NOK.LAVIDA", r: "RUSHER", id: "3225479273" },
            { n: "NOK.THANHDAT", r: "RUSHER", id: "2491284727" },
            { n: "NOK.VOHUNG", r: "RIFLER", id: "8776372081" },
            { n: "NOK.CRY", r: "SUPPORT", id: "2763014509" },
            { n: "NOK.NOVA", r: "SUPPORT", id: "1824618270" }
        ]
    },
    "lke": {
        name: "LKE",
        desc: "LKE – Tên đầy đủ là LÊ KIÊN ESPORTS. Không cần hô hào quá lớn, LKE để kỹ năng lên tiếng. Mỗi pha giao tranh là một lời khẳng định, mỗi chiến thắng là một dấu ấn. Khi đã bước vào trận đấu, mục tiêu duy nhất của LÊ KIÊN ESPORTS là khiến cái tên của mình được nhắc đến nhiều nhất tại Survival Legacy Cup SS3!",
        logo: "logo-lke.jpg",
        country: "", 
        players: [
            { n: "LKE.EMBEN", r: "RUSHER", id: "355294300"},
            { n: "LKE.KEYD", r: "BOMBER", id: "2055349409"},
            { n: "LKE.EMTHIEN", r: "SNIPER", id: "1693177119"},
            { n: "LKE.EMBOY", r: "SNIPER", id: "11487790754"},
            { n: "LKE.EMPHUC", r: "SUPPORT", id: "3209197272"}
        ] 
    },
    "vkt": {
        name: "VKT",
        desc: "VKT – Tên đầy đủ là Vân Kiếm Tôn. Tựa như một thanh kiếm được tôi luyện qua muôn vàn thử thách, Vân Kiếm Tôn bước vào mỗi trận đấu với sự sắc bén, bản lĩnh và quyết tâm chinh phục mọi giới hạn. Không chỉ hướng đến chiến thắng, VKT còn muốn khắc ghi tên mình bằng những màn trình diễn đầy khí chất và khẳng định đẳng cấp tại Survival Legacy Cup SS3!",
        logo: "logo-vkt.jpg",
        country: "", 
        players: [
            { n: "VKT.VANTUAN", r: "RUSHER", id: "1285407799" },
            { n: "VKT.VANTHAO", r: "RIFLER", id: "64897553" },
            { n: "VKT.KADO", r: "BOMBER", id: "1986949358" },
            { n: "VKT.MY", r: "SNIPER", id: "9353533657" },
            { n: "VKT.BOYWALK", r: "SUPPORT", id: "11041145321" }
        ]
    },
    "nse": {
        name: "NSE",
        desc: "NSE – Tên đầy đủ là NEW STAR ESPORTS. Mang khát vọng của những ngôi sao mới đang vươn mình tỏa sáng, NEW STAR ESPORTS không ngại đối đầu với bất kỳ thử thách nào. Với tinh thần thi đấu máu lửa, lối chơi đầy đột phá và khát khao chinh phục đỉnh cao, NSE sẵn sàng biến mỗi trận đấu thành cơ hội để khẳng định tên tuổi và tỏa sáng rực rỡ tại Survival Legacy Cup SS3!",
        logo: "logo-nse.jpg", 
        country: "", 
        players: [
            { n: "NSE.MAC", r: "RUSHER", id: "10808635533" },
            { n: "NSE.MINHTRIDZ", r: "BOMBER", id: "392360699" },
            { n: "NSE.MINHTRI", r: "SNIPER", id: "2038614210" },
            { n: "NSE.TRANLONG", r: "SUPPORT", id: "1728096984" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "ade2": {
        name: "ADE",
        desc: "ADE – Tên đầy đủ là ADE. Không cần một cái tên quá dài để tạo dấu ấn, ADE chọn cách khiến đối thủ phải ghi nhớ bằng màn trình diễn trên chiến trường. Với tinh thần không lùi bước, khả năng thích nghi linh hoạt và khát khao chinh phục từng trận đấu, ADE sẵn sàng bứt phá, tạo nên những khoảnh khắc đáng nhớ và khẳng định bản lĩnh tại Survival Legacy Cup SS3!",
        logo: "logo-ade2.jpg",
        country: "", 
        players: [
            { n: "ADE.TNGHIA", r: "RUSHER", id: "4275108112" },
            { n: "ADE.TPHONG", r: "RUSHER", id: "6794901944" },
            { n: "ADE.WHUY", r: "SNIPER", id: "983026618" },
            { n: "ADE.DOKI", r: "SNIPER", id: "8095908384" },
            { n: "ADE.TBON", r: "SUPPORT", id: "3768548347" }
        ]
    },
    "xbc": {
        name: "XBC",
        desc: "XBC – Tên đầy đủ là XBC. Càng áp lực, XBC càng bùng nổ. Với tinh thần quyết chiến và lối chơi không khoan nhượng, đội tuyển sẵn sàng chinh phục mọi thử thách để ghi tên mình vào những trận đấu đáng nhớ tại Survival Legacy Cup SS3!",
        logo: "logo-xbc.jpg",
        country: "", 
        players: [
            { n: "XBC.EMDEN", r: "RUSHER", id: "1651597235"},
            { n: "XBC.TINA", r: "RIFLER", id: "3486653852" },
            { n: "XBC.NGDUNG", r: "BOMBER", id: "6606575697"},
            { n: "XBC.GIAHUY", r: "SNIPER", id: "6706177979" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "tdt": {
        name: "TDT",
        desc: "TDT – Tên đầy đủ là Team Đầu Trâu. Đúng như cái tên, Team Đầu Trâu mang tinh thần lì lợm, bền bỉ và không bao giờ lùi bước trước bất kỳ đối thủ nào. Với ý chí quyết chiến và khát khao chinh phục, TDT sẵn sàng húc tung mọi thử thách để khẳng định sức mạnh tại Survival Legacy Cup SS3!",
        logo: "logo-tdt.jpg",
        country: "", 
        players: [
            { n: "TDT.GIABAO",  r: "RUSHER", id: "9653299037" },
            { n: "TDT.TUANANH",  r: "RIFLER", id: "13022794005" },
            { n: "TDT.PHAMBAO", r: "SNIPER", id: "9268264276" },
            { n: "TDT.DUCVIET",  r: "SUPPORT", id: "7297998533" },
            { n: "TDT.DUCNAM", r: "SUPPORT", id: "6347851915" }
        ]
    },
    "he2": {
        name: "HE",
        desc: "HE – Tên đầy đủ là HE. Với HE, H là Heart (trái tim nhiệt huyết), E là Elite (tinh thần của những chiến binh ưu tú). Thi đấu bằng cả đam mê và bản lĩnh, HE quyết tâm tạo nên những màn trình diễn bùng nổ tại Survival Legacy Cup SS3!",
        logo: "logo-he2.jpg",
        country: "", 
        players: [
            { n: "HE.THEVAN", r: "RUSHER", id: "8976760504"},
            { n: "HE.KUBILL", r: "RUSHER", id: "15516271021" },
            { n: "HE.QUOCTHUAN", r: "SNIPER", id: "2226577011" },
            { n: "HE.DIEMHANG", r: "SUPPORT", id: "229894720" },
            { n: "HE.THENHAT", r: "SUPPORT", id: "2601876385" }
        ]
    },
    "lte": {
        name: "LTE",
        desc: "LTE – Tên đầy đủ là Long Trị Esports. Khi Rồng cất cánh, bầu trời chỉ còn chỗ cho kẻ mạnh. Với tinh thần quyết chiến và khát khao chiến thắng, LTE sẵn sàng bùng nổ trong từng trận đấu để ghi dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-lte.jpg",
        country: "", 
        players: [
            { n: "LTE.TTAM", r: "RUSHER", id: "8123875526" },
            { n: "LTE.QDAT", r: "RUSHER", id: "4752316998" },
            { n: "LTE.GIABAO", r: "RIFLER", id: "10288568002" },
            { n: "LTE.HDANG", r: "BOMBER", id: "4184330303" },
            { n: "LTE.HTINH", r: "SUPPORT", id: "7984169749" }
        ]
    },
    "arty": {
        name: "ARTY",
        desc: "ARTY – Tên đầy đủ là ARTY KILLER. Sinh ra để săn kill, thi đấu để thống trị. Với lối chơi máu lửa và tinh thần không khoan nhượng, ARTY KILLER sẵn sàng biến mọi cuộc đối đầu thành màn trình diễn của mình tại Survival Legacy Cup SS3!",
        logo: "logo-arty.jpg",
        country: "", 
        players: [
            { n: "ARTY.TRINH", r: "RUSHER", id: "7289909444" },
            { n: "ARTY.KHOA", r: "RUSHER", id: "9794313196" },
            { n: "ARTY.TUAN", r: "RIFLER", id: "10208562491" },
            { n: "ARTY.HUNG", r: "SNIPER", id: "8970512236" },
            { n: "ARTY.HOA", r: "SUPPORT", id: "3091870862" }
        ]
    },
    "pc": {
        name: "PC",
        desc: "PC – Tên đầy đủ là PC Esports. Giống như một cỗ máy được tối ưu để chiến thắng, PC Esports luôn vận hành với sự chính xác, kỷ luật và tốc độ. Mỗi trận đấu là một cơ hội để PC bùng nổ và khẳng định sức mạnh tại Survival Legacy Cup SS3!",
        logo: "logo-pc.jpg",
        country: "", 
        players: [
            { n: "PC.DNDAN", r: "RUSHER", id: "7939875539" },
            { n: "PC.LHT", r: "RUSHER", id: "9531744891" },
            { n: "PC.HIEU", r: "RIFLER", id: "8614179975" },
            { n: "PC.TEN", r: "SNIPER", id: "5401984097" },
            { n: "PC.EMBE", r: "SUPPORT", id: "2124497748" }
        ]
    },
    "fh": {
        name: "FH",
        desc: "FH – Tên đầy đủ là FIRE HORSE. Như một chiến mã bùng cháy trên chiến trường, FIRE HORSE luôn lao về phía trước với tốc độ, sức mạnh và tinh thần không bao giờ bỏ cuộc. Sẵn sàng đốt cháy mọi giới hạn, FH quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-fh.jpg",
        country: "", 
        players: [
            { n: "FH.DNP", r: "RUSHER", id: "2277930623" },
            { n: "FH.GRIZZY", r: "RUSHER", id: "1127435270" },
            { n: "FH.DONKAI", r: "BOMBER", id: "926872567" },
            { n: "FH.BOI", r: "SNIPER", id: "746523523" },
            { n: "FH.HNAM",r: "SUPPORT", id: "2590142436" }
        ]
    },
    "xh2": {
        name: "XH",
        desc: "XH – Tên đầy đủ là XH Esports. Mỗi trận đấu là một cơ hội, mỗi đối thủ là một thử thách để vượt qua. Với tinh thần thi đấu máu lửa và khát khao chiến thắng, XH Esports sẵn sàng tạo nên những khoảnh khắc bùng nổ tại Survival Legacy Cup SS3!",
        logo: "logo-xh2.jpg",
        country: "", 
        players: [
            { n: "XH.SEPRD", r: "RUSHER", id: "2944272645" },
            { n: "XH.NERO", r: "BOMBER", id: "4477210794" },
            { n: "XH.VHAO", r: "SNIPER", id: "8231699643" },
            { n: "XH.ZYROX", r: "SUPPORT", id: "2205566148" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG"}
        ]
    },
    "ttr": {
        name: "TTR",
        desc: "TTR – Tên đầy đủ là Twin Tigger Reigh. Mang hình ảnh của những mãnh hổ song hành, Twin Tigger Reigh luôn thi đấu với sự ăn ý, tốc độ và bản lĩnh. Không ngại đối đầu với bất kỳ thử thách nào, TTR sẵn sàng săn lấy chiến thắng và khẳng định vị thế tại Survival Legacy Cup SS3!",
        logo: "logo-ttr.jpg",
        country: "", 
        players: [
            { n: "TTR.EMDZET", r: "RUSHER", id: "5514960658" },
            { n: "TTR.EMPTY", r: "RUSHER", id: "7593775838" },
            { n: "TTR.WANZT", r: "BOMBER", id: "4077941419" },
            { n: "TTR.BABYBOI", r: "SNIPER", id: "2709789364" },
            { n: "TTR.JADETEE", r: "SUPPORT", id: "6752608040" }
        ]
    },
    "mix": {
        name: "MIX",
        desc: "MIX – Tên đầy đủ là MIX Esports. Đúng như cái tên, MIX Esports là sự hòa quyện giữa kỹ năng, chiến thuật và tinh thần đồng đội. Với lối chơi linh hoạt và quyết tâm không lùi bước, MIX sẵn sàng tạo nên bất ngờ và khẳng định bản lĩnh tại Survival Legacy Cup SS3!",
        logo: "logo-mix.jpg",
        country: "", 
        players: [
            { n: "MIX.VMA", r: "RUSHER", id: "6446192753" },
            { n: "MIX.SUT", r: "RIFLER", id: "10789157722" },
            { n: "MIX.BIDAY", r: "BOMBER", id: "7325713391" },
            { n: "MIX.TQUAN", r: "SNIPER", id: "13306468362" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "isea": {
        name: "ISEA",
        desc: "ISEA – Tên đầy đủ là ISEA Esports. Như những con sóng giữa đại dương, ISEA Esports càng gặp thử thách càng bùng lên mạnh mẽ. Với tinh thần quyết chiến và khát khao chinh phục, ISEA sẵn sàng vượt mọi giới hạn để tạo nên dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-isea.jpg",
        country: "", 
        players: [
            { n: "ISEA.LUAN", r: "RUSHER", id: "2653093397" },
            { n: "ISEA.HANA", r: "RIFLER", id: "2104295752" },
            { n: "ISEA.AMIA", r: "BOMBER", id: "4426672086" },
            { n: "ISEA.MIN", r: "SNIPER", id: "3262117908" },
            { n: "ISEA.BIN", r: "SUPPORT", id: "9348528189" }
        ]
    },
    "vle": {
        name: "VLE",
        desc: "VLE – Tên đầy đủ là VL Esports. Bình tĩnh khi nhập cuộc, bùng nổ khi giao tranh. VL Esports mang theo tinh thần của những chiến binh không ngại va chạm và quyết tâm chiến đấu đến cùng để khẳng định bản lĩnh tại Survival Legacy Cup SS3!",
        logo: "logo-vle.jpg",
        country: "", 
        players: [
            { n: "VLE.KHANHTOAN", r: "RUSHER", id: "1466891354" },
            { n: "VLE.VANHIEU",r: "BOMBER", id: "931508938" },
            { n: "VLE.MINHDUC", r: "SNIPER", id: "1047846802" },
            { n: "VLE.VIETHUNG", r: "SNIPER", id: "1679326020" },
            { n: "VLE.SYTUAN", r: "SUPPORT", id: "1812440436" }
        ]
    },
    "b52e": {
        name: "B52E",
        desc: "B52E – Tên đầy đủ là B52 Esports. Chỉ cần B52E xuất trận, bầu không khí lập tức nóng lên. Với những pha xử lý bùng nổ và tinh thần không ngại đối đầu, B52 Esports quyết tâm làm rung chuyển mọi trận đấu tại Survival Legacy Cup SS3!",
        logo: "logo-b52e.jpg",
        country: "", 
        players: [
            { n: "B52E.ORHUN", r: "RUSHER", id: "10886768826" },
            { n: "B52E.MAKCUONG", r: "RUSHER", id: "3888878565" },
            { n: "B52E.LEVORZ", r: "BOMBER", id: "9050876679" },
            { n: "B52E.SEBEO",r: "SNIPER", id: "6353698339" },
            { n: "B52E.NGBAO", r: "SUPPORT", id: "4439122562" }
        ]
    },
    "đstn": {
        name: "ĐSTN",
        desc: "ĐSTN – Tên đầy đủ là ĐSTN Esports. Có những cái tên được nhớ bằng lời nói, còn ĐSTN Esports muốn được nhớ bằng những màn trình diễn. Với bản lĩnh và khát khao chiến thắng, đội tuyển quyết tâm bùng nổ và khẳng định vị thế tại Survival Legacy Cup SS3!",
        logo: "logo-đstn.jpg",
        country: "", 
        players: [
            { n: "ĐSTN.U7E", r: "RUSHER", id: "6775937715" },
            { n: "ĐSTN.KHUNG", r: "RUSHER", id: "9061635777" },
            { n: "ĐSTN.NVX", r: "SNIPER", id: "6556475658" },
            { n: "ĐSTN.TOP1", r: "SUPPORT", id: "3201187189" },
            { n: "ĐSTN.HDUNG", r: "SUPPORT", id: "6118395618" }
        ]
    },
    "vg": {
        name: "VG",
        desc: "VG – Tên đầy đủ là VG. Mang tinh thần Victory & Glory – chiến thắng và vinh quang, VG luôn bước vào trận đấu với khát khao chinh phục đỉnh cao. Không ngại thử thách, không lùi bước trước bất kỳ đối thủ nào, VG quyết tâm ghi tên mình vào những khoảnh khắc rực rỡ tại Survival Legacy Cup SS3!",
        logo: "logo-vg.jpg",
        country: "", 
        players: [
            { n: "VG.THTRIEU", r: "RUSHER", id: "1564568025" },
            { n: "VG.BLAN", r: "RUSHER", id: "11895984874" },
            { n: "VG.XHT", r: "SNIPER", id: "9322506139" },
            { n: "VG.MTRI", r: "SNIPER", id: "7813968373" },
            { n: "VG.XHT2",  r: "SUPPORT", id: "9363415496" }
        ]
    },
    "st": {
        name: "ST",
        desc: "ST – Tên đầy đủ là Shart TiTan. Khi Titan thức tỉnh, chiến trường chỉ còn chỗ cho những kẻ mạnh. Với tinh thần quyết chiến và khát khao chiến thắng, ST sẵn sàng bùng nổ trong từng trận đấu để tạo nên dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-st.jpg",
        country: "", 
        players: [
            { n: "ST.DLUONG", r: "RUSHER", id: "6470814423" },
            { n: "ST.NGAO", r: "RIFLER", id: "1756227636" },
            { n: "ST.TDUNG",r: "SNIPER", id: "1982342638" },
            { n: "ST.VP", r: "SUPPORT", id: "5329839627" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "cte": {
        name: "CTE",
        desc: "CTE – Tên đầy đủ là CTE. Với ý chí của những Champions Together Forever, CTE tin rằng sức mạnh lớn nhất đến từ sự gắn kết. Chiến đấu như một tập thể, quyết thắng như một đội tuyển, CTE quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-cte.jpg",
        country: "", 
        players: [
            { n: "CTE.GBAO", r: "RUSHER", id: "14501843024" },
            { n: "CTE.HOANGPHU", r: "RUSHER", id: "692914271" },
            { n: "CTE.LONGVU", r: "SNIPER", id: "2934208943" },
            { n: "CTE.BI", r: "SUPPORT", id: "11849275511" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "km2": {
        name: "KM",
        desc: "KM – Tên đầy đủ là KM Esports. Mang tinh thần Kill • Master, KM Esports luôn bước vào trận đấu với bản lĩnh của những người làm chủ mọi cuộc giao tranh. Không ngại đối đầu, không bỏ lỡ cơ hội, KM quyết tâm chinh phục chiến thắng và khẳng định vị thế tại Survival Legacy Cup SS3!",
        logo: "logo-km2.jpg",
        country: "", 
        players: [
            { n: "KM.WRONGUS", r: "RUSHER", id: "3016983320" },
            { n: "KM.GUNNERS", r: "RIFLER", id: "5975854296" },
            { n: "KM.PHAMTIEN", r: "BOMBER", id: "2315234124" },
            { n: "KM.EZLOVE", r: "SNIPER", id: "2146266439" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "sgp": {
        name: "SGP",
        desc: "SGP – Tên đầy đủ là SGP. Mang tinh thần Strike • Glory • Power, SGP luôn bước vào trận đấu với khát khao chiến thắng và bản lĩnh của những chiến binh thực thụ. Không ngại đối đầu, không lùi bước trước thử thách, SGP quyết tâm tạo nên dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-sgp.jpg",
        country: "", 
        players: [
            { n: "SGP.DAU", r: "RUSHER", id: "4364899318" },
            { n: "SGP.TTHUY", r: "RIFLER", id: "13614124304" },
            { n: "SGP.TAPO", r: "BOMBER", id: "6153199502" },
            { n: "SGP.QTIEN", r: "SNIPER", id: "14545224777" },
            { n: "KHÔNG CÓ", r: "SUPPORT", id: "7430013561" }
        ]
    },
    "mek": {
        name: "MEK",
        desc: "MEK – Tên đầy đủ là MegaKill Esports. Khi giao tranh bùng nổ cũng là lúc MegaKill Esports lên tiếng. Với tinh thần quyết chiến, kỹ năng sắc bén và khát khao chinh phục, MEK quyết tâm tạo nên những pha xử lý mãn nhãn và ghi dấu ấn tại Survival Legacy Cup SS3!",
        logo: "logo-mek.jpg",
        country: "", 
        players: [
            { n: "MEK.MTRIET", r: "RUSHER", id: "11689622261" },
            { n: "MEK.FRV", r: "RIFLER", id: "3248543787" },
            { n: "MEK.TRUNG", r: "SNIPER", id: "12770679079" },
            { n: "MEK.NANH", r: "SUPPORT", id: "12770679079" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG", r: "TRONG" }
        ]
    },
    "tglss3": {
        name: "TGL",
        desc: "TGL – Tên đầy đủ là Team Gia Lai. Mang tinh thần của vùng đất Tây Nguyên đầy nắng gió, TGL bước vào chiến trường với sự lì lợm, mạnh mẽ và không ngại thử thách. Không chỉ thi đấu để chiến thắng, TGL còn quyết tâm mang dấu ấn Gia Lai đến Survival Legacy Cup SS3!",
        logo: "logo-tglss3.jpg",
        country: "", 
        players: [
            { n: "TGL.DKHOI", r: "RUSHER", id: "1022337301" },
            { n: "TGL.HPHONG", r: "RUSHER", id: "6881001992" },
            { n: "TGL.DKHOA", r: "BOMBER", id: "876012041" },
            { n: "TGL.GHAO", r: "SNIPER", id: "9431656118" },
            { n: "TGL.CPHAT", r: "SUPPORT", id: "9712450395"  }
        ]
    },
    "bse": {
        name: "BSE",
        desc: "BSE – Tên đầy đủ là Buttersky Elite. Mang trong mình chất riêng của một tập thể tinh nhuệ, Buttersky Elite luôn sẵn sàng tăng tốc khi trận đấu bước vào thời khắc quyết định. Với bản lĩnh, sự quyết đoán và tinh thần không lùi bước, BSE quyết tâm bứt phá và khẳng định đẳng cấp tại Survival Legacy Cup SS3!",
        logo: "logo-bse.jpg",
        country: "", 
        players: [
            { n: "BSE.MTA", r: "RUSHER", id: "12921689211" },
            { n: "BSE.VENUS", r: "RUSHER", id: "9715895573" },
            { n: "BSE.HUNG", r: "BOMBER", id: "3716775696" },
            { n: "BSE.LONGVU", r: "SNIPER", id: "7559599413" },
            { n: "BSE.TOM", r: "SUPPORT", id: "5201490836" }
        ]
    },
    "ovn2": {
        name: "OVN",
        desc: "OVN – Tên đầy đủ là OVN Esports. Ba chữ cái, một tinh thần: Own the Victory Now – chiến thắng ngay từ khoảnh khắc nhập cuộc. Với lối chơi quyết đoán, tinh thần không ngại đối đầu và khát khao làm chủ chiến trường, OVN sẵn sàng bùng nổ và khẳng định bản lĩnh tại Survival Legacy Cup SS3!",
        logo: "logo-ovn2.jpg",
        country: "", 
        players: [
            { n: "OVN.DUY", r: "RUSHER", id: "12576856883" },
            { n: "OVN.VANTU", r: "RUSHER", id: "9881928946" },
            { n: "OVN.TIEN", r: "SNIPER", id: "12350585814" },
            { n: "OVN.TINH", r: "SNIPER", id: "8866941793" },
            { n: "OVN.TAO", r: "SUPPORT", id: "936555133" }
        ]
    },
    "cde": {
        name: "CDE",
        desc: "CDE – Tên đầy đủ là CDE. Challenge • Dominate • Elevate – thử thách, thống trị và vươn lên. CDE không bước vào chiến trường để đứng sau bất kỳ ai, mà để tạo áp lực, bứt phá và biến từng trận đấu thành cơ hội khẳng định bản lĩnh tại Survival Legacy Cup SS3!",
        logo: "logo-cde.jpg",
        country: "", 
        players: [
            { n: "CDE.VIETNHAT", r: "RUSHER", id: "9191569547" },
            { n: "CDE.TANDUNG", r: "RUSHER", id: "1829162964" },
            { n: "CDE.BEO", r: "RUSHER", id: "6353698339" },
            { n: "CDE.TRINH", r: "SNIPER", id: "7289909444" },
            { n: "CDE.ZEDRED", r: "SUPPORT", id: "7990559151" }
        ]
    },
    "bcs": {
        name: "BCS",
        desc: "BCS – Tên đầy đủ là BCS. Mang tinh thần Battle • Clutch • Strike, BCS không chờ cơ hội đến mà tự mình tạo ra nó. Càng vào những thời khắc quyết định, BCS càng sẵn sàng bùng nổ, quyết chiến đến cùng và khẳng định bản lĩnh tại Survival Legacy Cup SS3!",
        logo: "logo-bcs.jpg",
        country: "", 
        players: [
            { n: "BCS.GON", r: "RUSHER", id: "1444714436" },
            { n: "BCS.KHANH", r: "RUSHER", id: "2707736341" },
            { n: "BCS.LYHUNG", r: "SNIPER", id: "2278495131" },
            { n: "BCS.TUAN", r: "SNIPER", id: "12959767053" },
            { n: "BCS.NTRUONG", r: "SUPPORTT", id: "8872007162" }
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
                            SURVIVAL LEGACY<br>CUP SS3
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