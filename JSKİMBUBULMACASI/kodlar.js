// Veri havuzunu oluştur
const ogrenciler = [
    { ad: "Enes", ipucu: "Hiperaktif" },
    { ad: "Bilal", ipucu: "Kumarbaz" },
    { ad: "Umut", ipucu: "Çalgıcı" },
    { ad: "Tuğba", ipucu: "Sincap" },
    { ad: "Erayinho", ipucu: "Okulu bıraktı" }
];

// Seviyelere göre tahmin hakkı belirleme
const seviyeler = {
    "kolay": 4,
    "orta": 3,
    "zor": 2
};

// HTML elementlerini değişkenlere atama
const kapsayici = document.getElementById("container");
const ipucuAlani = document.getElementById("hint");
const tahminGirisi = document.getElementById("guessInput");
const tahminButonu = document.getElementById("guessButton");
const kalanHakAlani = document.getElementById("attempts");
const sonucAlani = document.getElementById("result");
const seviyeSecimi = document.getElementById("level");

// Değişkenler ve sayaçlar
let sayac = 0;
let rastgeleOgrenci = {};
let kart = null;
let harfler = [];
let kalanHak = 0;
let basHarfAcildi = false;
let secilenSeviye = "kolay";

// Oyunu başlat
oyunuBaslat();

// Oyun başlatma fonksiyonunu tanımla
function oyunuBaslat() {
    rastgeleOgrenci = ogrenciler[Math.floor(Math.random() * ogrenciler.length)];

    ipucuAlani.textContent = "Acaba kim bu? " + rastgeleOgrenci.ipucu;

    // Seviyeye göre tahmin hakkı belirleme
    kalanHak = seviyeler[secilenSeviye];

    kalanHakAlani.textContent = `${kalanHak} tahmin hakkınız kaldı!`;

    // Kartları oluştur
    kartlariOlustur();

    // Sonuç alanını temizle
    sonucAlani.textContent = "";

    // Seviye bilgisini ekrana yaz
    seviyeBilgisiYaz();
    basHarfAcildi = false;
}

// Kartları oluşturma fonksiyonunu tanımla
function kartlariOlustur() {
    sayac = 0;
    kapsayici.innerHTML = "";

    // Kelimeyi parçalayıp harfleri diziye at
    harfler = rastgeleOgrenci.ad.toUpperCase().split("");

    harfler.forEach((harf, index) => {
        kart = document.createElement("div");
        kart.innerHTML = "?";
        kart.className = "card";
        kart.dataset.value = harf;
        kart.dataset.index = index;
        kapsayici.appendChild(kart);
        kart.addEventListener("click", kartAc);
    })
}

// Kartı açma fonksiyonunu tanımla
function kartAc() {
    // Baş harfin açılmasını engelle
    if (!basHarfAcildi && this.innerHTML === "?") {
        basHarfAcildi = true;
        return;
    }

    sayac++;
    kalanHak--;

    if (sayac <= seviyeler[secilenSeviye]) {
        this.innerHTML = harfler[this.dataset.index];
        this.classList.add("revealed");
        kalanHakAlani.textContent = `${kalanHak} tahmin hakkınız kaldı!`;
    }

    if (sayac === seviyeler[secilenSeviye]) {
        tahminButonu.disabled = false;
        kalanHakAlani.textContent = "Tahminizi yazın!";
    }
}

// Tahmin kontrol ve sonuç gösterme fonksiyonunu tanımla
function sonucKontrol() {
    const tahmin = tahminGirisi.value.trim().toUpperCase();

    if (tahmin === rastgeleOgrenci.ad.toUpperCase()) {
        sonucAlani.textContent = "Doğru!";
    } else {
        sonucAlani.textContent = "Yanlış!";
    }

    tahminButonu.disabled = true;
}

// Tahmin butonuna tıklanma olayını dinle
tahminButonu.addEventListener("click", sonucKontrol);

// Seviye seçimi değişikliğini dinle
seviyeSecimi.addEventListener("change", function() {
    secilenSeviye = this.value;
    oyunuBaslat();
});

// Seviye bilgisini ekrana yazan fonksiyonu tanımla
function seviyeBilgisiYaz() {
    let seviyeMetni = "";
    switch (secilenSeviye) {
        case "kolay":
            seviyeMetni = "Kolay";
            break;
        case "orta":
            seviyeMetni = "Orta";
            break;
        case "zor":
            seviyeMetni = "Zor";
            break;
        default:
            seviyeMetni = "Bilinmeyen";
            break;
    }
    document.getElementById("level-info").textContent = `Seviye: ${seviyeMetni}`;
}