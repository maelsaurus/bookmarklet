(function() {
    function klikMenu(menuAlt, callback) {
        const menuHeader = document.querySelector(`li[alt="${menuAlt}"] > a.collapsible-header`);
        if (menuHeader) {
            menuHeader.click();
            setTimeout(callback, 1500);
        } else {
            alert("Menu tidak ditemukan: " + menuAlt);
        }
    }
    function klikElemen(xpath) {
        const elemen = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (elemen) {
            elemen.click();
        }
    }
    function isiInput(xpath, nilai) {
        const elemen = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (elemen) {
            elemen.value = nilai;
        }
    }
    const pilihan = prompt("Pilih menu:\n1 = Approval Pengisian\n2 = Approval Opname", "1");
    const targetMenuAlt = pilihan === "1" ? "Cro/pengisianApproval" : pilihan === "2" ? "Cro/opnameApproval" : null;
    if (!targetMenuAlt) {
        return alert("Pilihan tidak valid!");
    }
    const jumlahUlang = parseInt(prompt("Masukkan jumlah pengulangan:", "1"), 10);
    if (isNaN(jumlahUlang) || jumlahUlang < 1) {
        return alert("Jumlah pengulangan tidak valid!");
    }
    let hitungan = 0;
    function jalankanProses() {
        if (hitungan >= jumlahUlang) {
            alert("Selesai " + jumlahUlang + " kali. Kembali ke menu.");
            klikMenu(targetMenuAlt, () => {});
            return;
        }
        hitungan++;
        klikElemen("//td[13]/a");
        setTimeout(() => {
            isiInput('//*[@id="keterangan"]', "OK");
            setTimeout(() => {
                klikElemen('//a[@class="waves-effect waves-light btn btn-small green accent-4 approval" and @key="1"]');
                setTimeout(() => {
                    klikElemen('//*[@id="submit_form"]');
                    setTimeout(() => {
                        klikMenu(targetMenuAlt, () => {
                            setTimeout(jalankanProses, 1500);
                        });
                    }, 800);
                }, 600);
            }, 600);
        }, 800);
    }
    klikMenu(targetMenuAlt, () => {
        setTimeout(jalankanProses, 1500);
    });
})();
