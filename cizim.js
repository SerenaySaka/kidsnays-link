// =====================================================
// LİNK SAYFASINI ÇİZEN KOD
// Hem link sayfası hem admin panelinin önizlemesi bunu kullanır.
// =====================================================

const SOSYAL_IKONLAR = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3a7 7 0 0 1-3.9-1.2v6.3A6.1 6.1 0 1 1 10.5 9v3.1a3 3 0 1 0 3 3V3h3.1Z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5Z" fill="currentColor" stroke="none"/></svg>',
  eposta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>'
};

// kötü niyetli kod çalışmasın diye metinleri temizler
function temiz(yazi) {
  return String(yazi ?? "").replace(/[&<>"']/g, k => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[k]));
}

function sosyalAdres(tur, deger) {
  if (tur === "eposta") return "mailto:" + deger;
  if (tur === "whatsapp" && /^[0-9+\s]+$/.test(deger)) return "https://wa.me/" + deger.replace(/\D/g, "");
  return deger;
}

function sayfaCiz(veri, kutu) {
  const k = kutu.style;
  k.setProperty("--arka", veri.arkaPlan || "#F4EDE5");
  k.setProperty("--arka2", veri.gecisli ? (veri.arkaPlan2 || veri.arkaPlan) : (veri.arkaPlan || "#F4EDE5"));
  k.setProperty("--yazi", veri.yaziRengi || "#4A2E20");
  k.setProperty("--buton", veri.butonRengi || "#FFFFFF");
  k.setProperty("--buton-yazi", veri.butonYazi || "#4A2E20");
  k.setProperty("--vurgu", veri.vurguRengi || "#EE7C6F");
  k.setProperty("--kose", { yuvarlak: "99px", hafif: "16px", kare: "4px" }[veri.koseler] || "99px");
  kutu.className = "lt-sayfa " + (veri.butonStili || "dolgu");

  const sosyal = Object.entries(veri.sosyal || {})
    .filter(([tur, deger]) => deger && SOSYAL_IKONLAR[tur])
    .map(([tur, deger]) => `<a href="${temiz(sosyalAdres(tur, deger))}" target="_blank" rel="noopener" aria-label="${tur}">${SOSYAL_IKONLAR[tur]}</a>`)
    .join("");

  const linkler = (veri.linkler || [])
    .filter(l => l.aktif !== false && l.baslik)
    .map(l => `<a class="lt-link${l.vurgulu ? " vurgulu" : ""}" href="${temiz(l.url)}" target="_blank" rel="noopener">
        ${l.ikon ? `<span class="lt-ikon">${temiz(l.ikon)}</span>` : ""}${temiz(l.baslik)}</a>`)
    .join("");

  kutu.innerHTML = `
    <div class="lt-icerik">
      ${veri.logo ? `<div class="lt-logo"><img src="${temiz(veri.logo)}" alt="${temiz(veri.baslik)}"></div>` : ""}
      <h1 class="lt-baslik">${temiz(veri.baslik)}</h1>
      ${veri.aciklama ? `<p class="lt-aciklama">${temiz(veri.aciklama)}</p>` : ""}
      ${sosyal ? `<div class="lt-sosyal">${sosyal}</div>` : `<div style="height:24px"></div>`}
      <div class="lt-linkler">${linkler}</div>
      <p class="lt-alt"><a href="https://kidsnays.shop">kidsnays.shop</a></p>
    </div>`;
}
