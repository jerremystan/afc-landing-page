// ==========================================
// 1. MOBILE MENU & TUTORIAL
// ==========================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');
    
    if (menu) menu.classList.toggle('hidden');
    if (iconOpen) iconOpen.classList.toggle('hidden');
    if (iconClose) iconClose.classList.toggle('hidden');
    
    tutupTutorial();
}

function tutupTutorial() {
    const tutorial = document.getElementById('menu-tutorial');
    if (tutorial) {
        tutorial.classList.add('hidden');
    }
    localStorage.setItem('afcMenuTutorialDone', 'true');
}

// Menutup menu/modal jika area di luar elemen diklik
window.addEventListener('click', function(e) {
    // Tutup Modal Gambar (index.html)
    const imgModal = document.getElementById('image-modal');
    if (imgModal && e.target === imgModal) {
        closeImageModal();
    }
    
    // Tutup Mobile Menu
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('menu-btn');
    if (menu && menuBtn && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.add('hidden');
        const iconOpen = document.getElementById('icon-open');
        const iconClose = document.getElementById('icon-close');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
    }
});

// ==========================================
// 2. MODALS (IMAGE & CERTIFICATE) - index.html
// ==========================================
function openImageModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalImage && modalContent) {
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    }
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (modal && modalContent) {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.getElementById('modal-image').src = "";
        }, 200);
    }
}

function bukaSertifikat(srcGambar) {
    const modal = document.getElementById('modal-sertifikat');
    const img = document.getElementById('gambar-besar');
    if (modal && img) {
        img.src = srcGambar;
        modal.classList.remove('hidden');
    }
}

function tutupSertifikat() {
    const modal = document.getElementById('modal-sertifikat');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// ==========================================
// 3. PRICING & FORMS (index.html & bisnis.html)
// ==========================================
let preformUrls = {};

function bukaForm(jenisProduk) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'form_submit',
        'topik_wa': jenisProduk
    });

    if (preformUrls[jenisProduk]) {
        window.open(preformUrls[jenisProduk] + '1', '_blank');
    } else {
        console.warn('Link preform untuk ' + jenisProduk + ' tidak ditemukan.');
    }
}

// ==========================================
// 4. WHATSAPP SENDER (pertanyaan.html)
// ==========================================
function kirimWA(topik) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'track_whatsapp',
        'topik_wa': topik
    });

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || 'Google Ads FAQ';
    const nomorWA = "6287828412340"; 
    const pesan = `Halo, saya baru membaca Halaman FAQ dan ingin konsultasi soal ${topik}. (Sumber: ${utmSource})`;
    const finalUrl = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
    
    window.open(finalUrl, '_blank');
}

// ==========================================
// 5. HELPER: FAQ FILTERING
// ==========================================
function inisialisasiFilterFAQ() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Ubah style tombol aktif
            filterBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'active-filter');
                b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
            });
            btn.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'active-filter');
            btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

            // Tampilkan/Sembunyikan FAQ
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category'); 
                if (filterValue === 'semua' || itemCategory === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================
// 6. HELPER: TESTIMONI VIDEO FILTER & CSV LOADER
// ==========================================
function inisialisasiFilterVideoTestimoni() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoItems = document.querySelectorAll('.video-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter').toLowerCase();

            // Ubah style tombol aktif
            filterBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'active-filter');
                b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
            });
            btn.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'active-filter');
            btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

            // Tampilkan/Sembunyikan Video dengan animasi CSS
            videoItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category') || '';
                const tags = itemCategory.split(' ').map(tag => tag.trim().toLowerCase());
                const shouldShow = filterValue === 'semua' || tags.includes(filterValue);

                if (shouldShow) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

function loadTestimoniCSV() {
    const videoGallery = document.getElementById('video-gallery');
    if (videoGallery && typeof Papa !== 'undefined') {
        Papa.parse("testimoni.csv", {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                const rows = results.data;
                let htmlContent = "";
                
                rows.forEach(row => {
                    htmlContent += `
                        <a href="${row.url_reels}" target="_blank" rel="noopener noreferrer" class="video-item relative rounded-2xl overflow-hidden aspect-[9/16] cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-slate-200 block" data-category="${row.kategori_id}">
                            <img src="${row.gambar_thumbnail}" alt="${row.judul_reels}" class="instagram-thumbnail w-full h-full object-cover" loading="lazy">
                            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
                                <div class="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                                    <svg class="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="absolute top-3 left-3">
                                <span class="text-[10px] bg-gradient-to-r from-purple-600 to-pink-500 text-white px-2 py-1 rounded-full font-bold">
                                    Instagram Reel
                                </span>
                            </div>
                            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                                <span class="text-[10px] bg-${row.label_warna} px-2 py-0.5 rounded font-bold uppercase tracking-wider mb-1 inline-block">
                                    ${row.label_nama}
                                </span>
                                <p class="text-sm font-semibold leading-tight line-clamp-2">
                                    ${row.judul_reels}
                                </p>
                            </div>
                        </a>
                    `;
                });
                
                videoGallery.innerHTML = htmlContent;
                inisialisasiFilterVideoTestimoni();
            },
            error: function(err) {
                videoGallery.innerHTML = `<div class="col-span-full text-center text-red-500 font-bold p-4">Gagal memuat data testimoni. Pastikan file "testimoni.csv" tersedia.</div>`;
            }
        });
    }
}

// ==========================================
// 7. INISIALISASI HALAMAN (MAIN INIT)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    
    // A. Menu Tutorial
    const sudahPernahBuka = localStorage.getItem('afcMenuTutorialDone');
    if (!sudahPernahBuka) {
        const tutorial = document.getElementById('menu-tutorial');
        if (tutorial) {
            setTimeout(() => {
                tutorial.classList.remove('hidden');
            }, 1000);
        }
    }

    // B. Dynamic Text Replacement (DTR)
    const params = new URLSearchParams(window.location.search);
    const rawKeyword = params.get('keyword') || params.get('utm_term');
    if (rawKeyword) {
        const keyword = decodeURIComponent(rawKeyword).replace(/\+/g, ' ');
        const headline = document.getElementById('dynamic-headline');
        
        if (headline) {
            const path = window.location.pathname.toLowerCase();
            if (path.includes('bisnis')) {
                headline.innerText = `Peluang Bisnis & Member AFC (${keyword})`;
            } else if (path.includes('pertanyaan')) {
                headline.innerText = `Pusat Bantuan Terapi ${keyword}`;
            } else if (path.includes('testimoni')) {
                headline.innerText = `Testimoni & Edukasi Terapi ${keyword}`;
            } else {
                headline.innerText = `Pusat Resmi & Konsultasi Terapi ${keyword}`;
            }
        }
    }

    // C. Fetch Harga (JSON) & URL Preform
    Promise.all([
        fetch('harga.json').then(res => res.json()).catch(() => ({})),
        fetch('preform.json').then(res => res.json()).catch(() => ({}))
    ])
    .then(([hargaData, preformData]) => {
        const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
        
        preformUrls = preformData;

        // Harga Produk Satuan (index.html)
        if (hargaData.sop && document.getElementById('harga-sop')) document.getElementById('harga-sop').innerText = formatRupiah(hargaData.sop);
        if (hargaData.utsu && document.getElementById('harga-utsu')) document.getElementById('harga-utsu').innerText = formatRupiah(hargaData.utsu);
        if (hargaData.hikari && document.getElementById('harga-hikari')) document.getElementById('harga-hikari').innerText = formatRupiah(hargaData.hikari);
        if (hargaData.sensei && document.getElementById('harga-sensei')) document.getElementById('harga-sensei').innerText = formatRupiah(hargaData.sensei);
        
        // Harga Paket Member (index.html & bisnis.html)
        if (hargaData.ruby) {
            if (document.getElementById('harga-ruby')) document.getElementById('harga-ruby').innerText = formatRupiah(hargaData.ruby);
            if (document.getElementById('price-ruby')) document.getElementById('price-ruby').innerText = formatRupiah(hargaData.ruby);
        }
        if (hargaData.sapphire) {
            if (document.getElementById('harga-sapphire')) document.getElementById('harga-sapphire').innerText = formatRupiah(hargaData.sapphire);
            if (document.getElementById('price-sapphire')) document.getElementById('price-sapphire').innerText = formatRupiah(hargaData.sapphire);
        }
        if (hargaData.diamond) {
            if (document.getElementById('harga-diamond')) document.getElementById('harga-diamond').innerText = formatRupiah(hargaData.diamond);
            if (document.getElementById('price-diamond')) document.getElementById('price-diamond').innerText = formatRupiah(hargaData.diamond);
        }

        // Setup href Buttons (bisnis.html)
        if (preformData.ruby && document.getElementById('btn-ruby')) document.getElementById('btn-ruby').href = preformData.ruby + '1';
        if (preformData.sapphire && document.getElementById('btn-sapphire')) document.getElementById('btn-sapphire').href = preformData.sapphire + '1';
        if (preformData.diamond && document.getElementById('btn-diamond')) document.getElementById('btn-diamond').href = preformData.diamond + '1';
    })
    .catch(error => console.error('Gagal mengambil data harga/preform:', error));

    // D. Fetch FAQ menggunakan PapaParse (pertanyaan.html)
    const faqContainer = document.getElementById('faq-container');
    if (faqContainer && typeof Papa !== 'undefined') {
        Papa.parse("pertanyaan.csv", {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                const rows = results.data;
                let htmlContent = "";
                rows.forEach(row => {
                    htmlContent += `
                        <details class="faq-item group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition hover:border-${row.warna}-300" data-category="${row.kategori_id}">
                            <summary class="flex justify-between items-center font-bold p-5 text-slate-800 group-open:bg-${row.warna}-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                                <div class="flex items-center gap-3 pr-4">
                                    <span class="hidden md:inline-block text-[10px] font-bold bg-${row.warna}-100 text-${row.warna}-800 px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
                                        ${row.kategori_nama}
                                    </span>
                                    <span>${row.pertanyaan}</span>
                                </div>
                                <span class="transition group-open:rotate-180 text-slate-400 group-open:text-${row.warna}-600 flex-shrink-0">
                                    <svg fill="none" height="24" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
                                </span>
                            </summary>
                            <div class="p-5 text-slate-600 text-sm md:text-base border-t border-slate-100 leading-relaxed bg-white">
                                ${row.jawaban}
                            </div>
                        </details>
                    `;
                });
                faqContainer.innerHTML = htmlContent;
                inisialisasiFilterFAQ(); 
            },
            error: function(err) {
                faqContainer.innerHTML = `<div class="text-center text-red-500 font-bold p-4">Gagal memuat pertanyaan. Pastikan file "pertanyaan.csv" tersedia.</div>`;
            }
        });
    }

    // E. Load Testimoni Video dari CSV (testimoni.html)
    loadTestimoniCSV();
});