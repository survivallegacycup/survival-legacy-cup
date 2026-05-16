/* ================= PHẦN 1: BẢNG THÔNG SỐ (TRANG LỊCH THI ĐẤU) ================= */
// Nhớ dán link Google Sheets của bạn vào đây nha:
const linkCacTran = {
    1: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1286104940&single=true&output=csv",
    2: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1439103614&single=true&output=csv",
    3: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1914379601&single=true&output=csv",
    4: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1824049530&single=true&output=csv",
    5: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=440796779&single=true&output=csv",
    6: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxQ0XUFPh9AASBh24GIZExBRoR-Mx6IzgV8VmYzfbeTzIh-WXiOShCm2xHMnnuiEXMLunN2GQG-jpQ/pub?gid=1658103566&single=true&output=csv"
}
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
            { n: "KS.GREAT", a: "great.jpg" },
            { n: "KS.VPHAT", a: "vphat.jpg" },
            { n: "KS.CTHANG", a: "cthang.jpg" },
            { n: "KS.HLOC", a: "hloc.jpg" },
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
            { n: "FT.MILLOW", a: "millow.jpg" },
            { n: "FT.THANHDAI", a: "thanhdai.jpg" },
            { n: "FT.MEOMEO", a: "meomeo.jpg" },
            { n: "FT.W4U", a: "w4u.jpg" },
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
            { n: "QC.KAME", a: "kame.jpg" },
            { n: "QC.WIST", a: "wist.jpg" },
            { n: "QC.TABETA", a: "tabeta.jpg" },
            { n: "QC.EBOR", a: "ebor.jpg" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "vtp": {
        name: "VTP",
        desc: "VTP - Tên đầy đủ là VTP Esports. Đội tuyển Free Fire thi đấu đầy toan tính, nổi bật với khả năng đọc tình huống tốt và tận dụng thời cơ cực kỳ hiệu quả, luôn biết cách vươn lên đúng lúc tại Survival Legacy Cup SS1!",
        logo: "logo-vtp.jpg",
        country: "", 
        players: [
            { n: "VTP.ATUAN", a: "atuan.jpg", r: "RUSHER" },
            { n: "VTP.MCHIEN", a: "mchien.jpg", r: "SUPPORT" },
            { n: "VTP.MINHYUE", a: "minhyue.jpg", r: "SNIPER" },
            { n: "VTP.BUNCHA", a: "buncha.jpg", r: "BOMBER" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "nna": {
        name: "NNA",
        desc: "NNA - Tên đầy đủ Nước Ngọt Academy. Đội tuyển Free Fire mang phong cách “ngọt mà gắt”, vẻ ngoài nhẹ nhàng nhưng lối chơi cực kỳ khó chịu, sẵn sàng tung đòn kết liễu bất ngờ và khiến đối thủ “thấm đòn” tại Survival Legacy Cup SS1!",
        logo: "logo-nna.jpg",
        country: "", 
        players: [
            { n: "NNA.TCUONG", a: "tcuong.jpg", r: "RUSHER" },
            { n: "NNA.DHAI", a: "dhai.jpg", r: "BOMBER" },
            { n: "NNA.THDAT", a: "thdat.jpg", r: "SNIPER" },
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
            { n: "NNN.NHATTIEN", a: "nhattien.jpg", r: "SNIPER" },
            { n: "NNN.BMINH", a: "bminh.jpg", r: "SUPPORT" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
        ]
    },
    "t2al": {
        name: "T2AL",
        desc: "T2AL- Tên đầy đủ là T2AL Esports. Đội tuyển Free Fire mang biểu tượng “số 2 bứt phá”, luôn âm thầm tích lũy sức mạnh trước khi tăng tốc mạnh mẽ, sẵn sàng vượt lên và chiếm lĩnh vị trí dẫn đầu tại Survival Legacy Cup SS1!",
        logo: "logo-t2al.jpg",
        country: "", 
        players: [
            { n: "T2AL.KTUAN", a: "ktuan.jpg" },
            { n: "T2AL.LHTUAN", a: "lhtuan.jpg" },
            { n: "T2AL.XUANLOC", a: "xuanloc.jpg" },
            { n: "T2AL.MINHANN", a: "minhan.jpg" },
            { n: "KHÔNG CÓ", a: "https://placehold.co/200x250/111/555?text=TRONG" }
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
// Tự động kích hoạt hiển thị đội UZI ngay khi vừa mở trang
window.onload = function() {
    switchTeam('uzi');
};