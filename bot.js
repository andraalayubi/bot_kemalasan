const puppeteer = require('puppeteer');

(async () => {
    // Luncurkan browser
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 20, // slow down by 20ms
    }); // set headless: true untuk tanpa UI
    const page = await browser.newPage();

    // Buka halaman
    await page.goto('https://online.mis.pens.ac.id/');
    await page.setViewport({ width: 1080, height: 1024 });

    // Tunggu elemen link "Login" muncul dan klik
    await page.waitForSelector('a[title="login"]');
    await page.click('a[title="login"]');

    // Tunggu elemen link "Login" muncul dan klik
    await page.waitForSelector('a[title="login mahasiswa/dosen/staff"]');
    await page.click('a[title="login mahasiswa/dosen/staff"]');

    // await page.waitForTimeout(2000);

    await page.waitForSelector('#username');
    await page.type('#username', 'alayubia@it.student.pens.ac.id');

    await page.waitForSelector('#password');
    await page.type('#password', 'Azkahammani25012010');

    await page.waitForSelector('.btn-submit');
    await page.click('.btn-submit');

    const akademikLink = await page.evaluateHandle(() => {
        return Array.from(document.querySelectorAll('a')).find(el => el.textContent.includes('Akademik'));
    });

    if (akademikLink) {
        await akademikLink.hover(); // Mengarahkan kursor (hover) pada elemen tersebut
    }

    await page.waitForSelector('a[href="mEntry_Logbook_KP1.php"]');
    await page.click('a[href="mEntry_Logbook_KP1.php"]');

    await page.waitForSelector('#jam_mulai');
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight); // Scroll ke bawah
    });
    await page.type('#jam_mulai', '10:00');

    await page.waitForSelector('#jam_selesai');
    await page.type('#jam_selesai', '18:00');

    await page.waitForSelector('#kegiatan');
    await page.type('#kegiatan', 'Membenarkan bug');

    await page.waitForSelector('#sesuai_kuliah1');
    await page.click('#sesuai_kuliah1');

    await page.waitForSelector('#matakuliah');
    await page.click('#matakuliah');

    await page.waitForSelector('select');
    await page.type('select', 'TI034107');
    await page.select('#matakuliah', '200719');
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight); // Scroll ke bawah
    });

    await page.waitForSelector('#Setuju');
    await page.click('#Setuju');

    await page.waitForSelector('input[type="button"][value="Simpan"]');
    await page.click('input[type="button"][value="Simpan"]');

    page.on('dialog', async dialog => {
        console.log('Dialog message:', dialog.message());
        await dialog.accept();
    });
    // Tutup browser (optional)
    // await browser.close();
})();
