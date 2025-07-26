(function() {
    /**
     * Fungsi untuk mengklik menu navigasi di sidebar.
     * Mencari <li> dengan atribut 'alt' yang spesifik.
     * @param {string} menuAlt - Nilai atribut 'alt' dari menu yang dicari.
     * @param {function} callback - Fungsi yang dijalankan setelah menu diklik.
     */
    function klikMenu(menuAlt, callback) {
        const menuHeader = document.querySelector(`li[alt="${menuAlt}"] > a.collapsible-header`);
        if (menuHeader) {
            menuHeader.click();
            // Beri jeda 1.5 detik agar halaman/konten sempat dimuat
            setTimeout(callback, 1500);
        } else {
            alert("Menu tidak ditemukan: " + menuAlt);
        }
    }

    /**
     * Fungsi untuk mengklik sebuah elemen berdasarkan XPath-nya.
     * @param {string} xpath - XPath dari elemen yang akan diklik.
     */
    function klikElemen(xpath) {
        const elemen = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (elemen) {
            elemen.click();
        }
    }

    /**
     * Fungsi untuk mengisi input field berdasarkan XPath-nya.
     * @param {string} xpath - XPath dari input yang akan diisi.
     * @param {string} nilai - Teks yang akan dimasukkan ke input.
     */
    function isiInput(xpath, nilai) {
        const elemen = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (elemen) {
            elemen.value = nilai;
        }
    }

    // --- LOGIKA UTAMA ---

    // 1. Minta pengguna memilih jenis approval
    const pilihan = prompt("Pilih menu:\n1 = Approval Pengisian\n2 = Approval Opname", "1");
    const targetMenuAlt = pilihan === "1" ? "Cro/pengisianApproval" : pilihan === "2" ? "Cro/opnameApproval" : null;

    if (!targetMenuAlt) {
        return alert("Pilihan tidak valid!");
    }

    // 2. Minta jumlah pengulangan dari pengguna
    const jumlahUlang = parseInt(prompt("Masukkan jumlah pengulangan:", "1"), 10);
    if (isNaN(jumlahUlang) || jumlahUlang < 1) {
        return alert("Jumlah pengulangan tidak valid!");
    }

    let hitungan = 0;

    // 3. Fungsi utama yang akan berjalan berulang (loop)
    function jalankanProses() {
        if (hitungan >= jumlahUlang) {
            alert("Selesai " + jumlahUlang + " kali. Kembali ke menu.");
            klikMenu(targetMenuAlt, () => {}); // Kembali ke menu awal
            return;
        }
        hitungan++;

        // Rangkaian Aksi Otomatis dengan jeda waktu (setTimeout)
        // Klik item pertama pada tabel (di kolom ke-13)
        klikElemen("//td[13]/a");

        setTimeout(() => {
            // Isi kolom keterangan dengan "OK"
            isiInput('//*[@id="keterangan"]', "OK");
            
            setTimeout(() => {
                // Klik tombol "Approval" yang berwarna hijau
                klikElemen('//a[@class="waves-effect waves-light btn btn-small green accent-4 approval" and @key="1"]');

                setTimeout(() => {
                    // Klik tombol submit konfirmasi
                    klikElemen('//*[@id="submit_form"]');

                    setTimeout(() => {
                        // Kembali ke halaman daftar untuk memulai siklus berikutnya
                        klikMenu(targetMenuAlt, () => {
                            setTimeout(jalankanProses, 1500);
                        });
                    }, 800);
                }, 600);
            }, 600);
        }, 800);
    }

    // 4. Memulai proses
    klikMenu(targetMenuAlt, () => {
        setTimeout(jalankanProses, 1500); // Mulai loop setelah menu awal terbuka
    });

})();
