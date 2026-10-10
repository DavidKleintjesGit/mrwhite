import type { Dictionary } from "./nl";

/**
 * Not yet read through by a native speaker, so Turkish stays out of
 * VERIFIED_LOCALES and out of the picker. See lib/i18n/config.ts.
 */
const tr: Dictionary = {
  meta: {
    title: "Mister White",
    description:
      "3 ila 20 oyuncu için kelime oyunu. Herkes aynı gizli kelimeyi alır — sızanlar hariç.",
  },

  common: {
    back: "Geri",
    done: "Tamam",
  },

  roles: {
    burger: "Vatandaş",
    undercover: "Gizli ajan",
    white: "Mr. White",
  },

  categories: {
    eten: "Yiyecek",
    dieren: "Hayvanlar",
    plekken: "Mekânlar",
    huis: "Evde",
    beroepen: "Meslekler",
    sport: "Spor ve oyun",
    pop: "Popüler kültür",
    eigen: "Kendi kelimelerin",
  },

  home: {
    caseNumber: "Dosya no. 0042",
    rec: "Kayıt",
    recNumber: "No. 0042",
    stamp: "Çok gizli",
    titleTop: "Mr.",
    titleBottom: "White",
    tagline:
      "Herkes aynı gizli kelimeyi alır. Sızanlar hariç. Kim göründüğü kişi değil?",
    play: "Oyna",
    rules: "Nasıl oynanır",
    settings: "Ayarlar",
  },

  rules: {
    kicker: "Dedektif el kitabı",
    title: "Nasıl oynanır",
    cards: [
      { name: "Vatandaş", body: "Gerçek kelimeyi bilir." },
      {
        name: "Gizli ajan",
        body: "Neredeyse aynı kelime. Kendisi de bilmiyor.",
      },
      { name: "Mr. White", body: "Kelime yok. Blöf zamanı!" },
    ],
    items: [
      "Herkes gizlice bir kelime alır. Vatandaşların hepsinde aynı kelime vardır.",
      "Gizli ajanlar ona benzeyen bir kelime alır ve gizli ajan olduklarını bilmezler.",
      "Mr. White hiçbir şey almaz ve blöf yapmak zorundadır.",
      "Sırayla herkes ipucu olarak bir kelime söyler. Ne fazla açık ne fazla belirsiz.",
      "Sonra kimin eleneceğini oylarsınız. Mr. White yakalanırsa bir tahmin hakkı olur.",
    ],
    note: "Bütün sızanlar elendiğinde vatandaşlar kazanır. Geriye tek bir vatandaş kaldığında sızanlar kazanır.",
    cta: "Anlaşıldı, oynayalım",
  },

  settings: {
    kicker: "Merkez",
    title: "Ayarlar",
    categories: "Kelime kategorileri",
    pick: "Seç →",
    allCategories: "{total} kategorinin hepsi",
    someCategories: "{total} kategoriden {on} tanesi",
    noneChosen: "Hiçbiri seçili değil, hepsini alırız",
    display: "Görünüm",
    themeDark: "Koyu",
    themeLight: "Açık",
    difficulty: "Kelime zorluğu",
    diffEasy: "Kolay",
    diffMix: "Karışık",
    diffHard: "Zor",
    diffHelpEasy:
      "Kelimeler birbirinden uzak. Gizli ajanlar daha çabuk belli olur.",
    diffHelpMix: "Kolay ve çetrefilli kelime çiftlerinin karışımı.",
    diffHelpHard: "Kelimeler birbirine çok benziyor. Şüphe garanti.",
    language: "Dil",
    timer: "İpucu süresi",
    timerOff: "Kapalı",
    mrGuessLabel: "Mr. White tahmin edebilir",
    mrGuessDesc: "Yakalandı mı? Kelime için tek hak. Bilirse kazanır.",
    mrNotFirstLabel: "Mr. White asla başlamaz",
    mrNotFirstDesc: "İlk ipucu hep kelimesi olan birinden gelir.",
    customWords: "Kendi kelimelerin",
    customA: "Vatandaş kelimesi",
    customB: "Gizli ajan",
    customAdd: "Kelime çifti ekle",
    customRemove: "{a} ve {b} çiftini sil",
    customEmpty:
      '"Kendi kelimelerin" kategorisine düşecek bir kelime çifti uydur.',
    save: "Kaydet",
    privacy: "Gizlilik politikası",
  },

  archive: {
    tag: "ARŞİV",
    title: "Kelime kategorileri",
    search: "Kategori ara…",
    all: "Hepsini aç",
    none: "Hepsini kapat",
    count: "{total} kategoriden {on} açık",
    pairs: "{n} kelime çifti",
    noResults: '"{query}" için kategori bulunamadı.',
  },

  language: {
    tag: "ULUSLARARASI",
    title: "Dil",
    sub: "Oyun hangi dilde oynanacak?",
    chosen: "Seçildi",
  },

  setup: {
    kicker: "Adım 1 / {total}",
    title: "Yeni oyun",
    players: "Oyuncular",
    playersDesc: "3 ile 20 ajan arası",
    undercovers: "Gizli ajanlar",
    undercoversDesc: "Birazcık farklı bir kelime",
    whites: "Mr. White sayısı",
    whitesDesc: "Kelime yok, sadece blöf",
    distribution: "Şüphelilerin dağılımı",
    civilians: "Vatandaş",
    undercover: "Gizli ajan",
    white: "Mr. White",
    next: "Sıradaki: isimler →",
  },

  names: {
    kicker: "Adım 2 / {total}",
    title: "Kimler oynuyor?",
    hint: "Bir alanı boş bırakırsan sana kod adı veririz.",
    placeholder: "Ajan {n}",
    back: "Dağılım",
    deal: "Kelimeleri dağıt",
  },

  deal: {
    kicker: "Adım {n} / {total}",
    title: "Herkesin dosyası",
    instruction:
      "Telefonu elden ele dolaştırın. Kendi dosyana dokun, kelimeni okumak için basılı tut ve bırak. Başkasınınkine bakmak yok!",
    number: "No. {n}",
    tapToOpen: "Açmak için dokun",
    seenStamp: "Görüldü",
    seenText: "{total} dosyadan {seen} tanesi okundu",
    remaining: "{n} tane kaldı",
    reshuffle: "Yeniden dağıt",
    start: "1. turu başlat",
  },

  confirm: {
    tag: "DİKKAT!",
    title: "Yeniden dağıtılsın mı?",
    bodyStart:
      "Herkes yeni bir kelime ve yeni bir rol alır. Dosyasını okumuş olanların tekrar bakması gerekir. ",
    bodyStrong: "Bu geri alınamaz.",
    cancel: "Vazgeç",
    yes: "Evet, yeniden dağıt",
    waiting: "Önce oku… {n}",
  },

  card: {
    kicker: "Gizli dosya:",
    hold: "Basılı tut",
    holdSub: "Yalnızca {name} görebilir. Dosyayı kapatmak için bırak.",
    topSecret: "Top secret",
    youAre: "Sen",
    whiteTop: "Mr.",
    whiteBottom: "White",
    whiteNote: "Kelimen yok. İyi dinle ve blöf yap.",
    yourWord: "Gizli kelimen",
    wordNote: "İyi aklında tut. Çok erken ele verme.",
    close: "Tamam, devret",
  },

  hint: {
    kicker: "Sorgu",
    title: "{n}. tur",
    speaking: "Söz sırası",
    instruction: "Gizli kelimen hakkında ipucu olarak bir kelime söyle.",
    begins: "BAŞLIYOR!",
    voteNow: "Hemen oyla",
    next: "Sıradaki",
    toVote: "Oylamaya geç",
  },

  vote: {
    kicker: "{n}. tur · Yüzleşme",
    title: "Kim şüpheli?",
    instruction:
      "Tartışın, parmak basın ve oylayın. Elenecek şüpheliye dokunun.",
    stamp: "Şüpheli",
    anotherRound: "Bir tur daha",
    unmask: "{name} kimliğini açığa çıkar",
    pickFirst: "Bir şüpheli seç",
  },

  unmask: {
    kicker: "Dosyanın sahibi:",
    investigating: "İnceleniyor…",
    lineBurger: "Masum! Kendi adamınızı elediniz.",
    lineUndercover: "Yakalandı! Bu ajanın kelimesi azıcık farklıydı.",
    lineWhite: "Bulundu! Mr. White'ın hiç kelimesi yoktu.",
    next: "Devam",
    toGuess: "Mr. White tahmin edebilir",
  },

  guess: {
    lastChance: "Son şans…",
    title: "{name}, kelime ne?",
    sub: "Vatandaşların kelimesini bilirsen anında kazanırsın. Tek hakkın var.",
    placeholder: "Tahminini yaz…",
    submit: "Şansını dene",
    miss: "Yanlış!",
    missSub: '"{guess}" değil. Mr. White elendi.',
    next: "Devam",
  },

  end: {
    stamp: "Dosya kapandı",
    burgersTitle: "Vatandaşlar kazandı",
    burgersLine: "Bütün sızanlar açığa çıktı. İyi iş, ajanlar.",
    infiltrantenTitle: "Sızanlar kazandı",
    infiltrantenLine: "İş işten geçene kadar gözden uzak kaldılar.",
    whiteTitle: "Mr. White kazandı",
    whiteLine: "Bildi! Mr. White kelimeyi baştan beri biliyormuş.",
    civilianWord: "Vatandaş kelimesi",
    undercoverWord: "Gizli ajan kelimesi",
    out: "elendi",
    menu: "Menü",
    again: "Yeni bir dosya",
  },
  modes: {
    kicker: "Davanı seç",
    title: "Oyun modu",
    caseLabel: "Dava",
    open: "Dosyayı aç →",
    soon: "Yakında",
    classicTitle: "Klasik",
    classicDesc:
      "Vatandaşlar, gizli ajanlar ve Mr. White. İpucu ver, oy ver, maskeyi düşür.",
    classicMeta: "3–20 oyuncu",
    drinkTitle: "Drinking Edition",
    drinkDesc:
      "Rastgele üç ev kuralı, gizli görevler ve gizli oylama. Vatandaşı eleyen içer.",
    drinkMeta: "4–20 · 18+",
    soonCases: [
      {
        title: "White Lies",
        desc: "Yeni bir dava hazırlanıyor. Ayrıntılar yakında.",
      },
      {
        title: "Trust Issues",
        desc: "Kimseye güvenilmez. Sana da.",
      },
      {
        title: "Double Agent",
        desc: "Bir oyuncu aynı anda iki taraf için çalışıyor.",
      },
    ],
  },

  drink: {
    stepKicker: "Adım 3 / {total}",
    rulesTitle: "Bu oyunun kuralları",
    rulesIntro:
      "Bu üç kural tüm oyun boyunca geçerli. Grup kendi kendini denetler: birini çiğnersen küçük bir yudum alırsın. Alkolsüz her zaman serbest.",
    rolling: "Karıştırılıyor…",
    reroll: "Yeni kurallar",
    deal: "Rolleri dağıt",
    namesCta: "Kurallara geç",

    catsTitle: "Drinking Edition · kural türleri",

    catCount: "{n} kural",
    catALabel: "Yasak kelimeler",
    catAShort: "Kelime",
    catBLabel: "Yasak davranışlar",
    catBShort: "Davranış",
    catCLabel: "Konuşma kuralları",
    catCShort: "Konuşma",
    catDLabel: "Sosyal kaos",
    catDShort: "Sosyal",

    challengeKicker: "Gizli görev",
    challengeReward: "Ödül: {n} yudum dağıt.",
    challengeHint: "Başardın mı? O zaman {n} yudum dağıtırsın.",
    challengeDone: "Görev tamam",
    challengeHandOut: "{n} yudum dağıt",
    challengeSecret: "gizli",
    challengeLapsed: "iptal",
    challengeBusy: "Görev sürüyor",
    challengeWon: "Görev tamam · {n} yudum dağıttı",
    challengeLost: "Elendi · görev iptal",
    challengesTitle: "Bu oyunun görevleri",
    challengeCheck: "Görevini kontrol etmek için birinin dosyasını aç.",

    sheetTag: "SABIKA",

    sheetAsk: "Kim içiyor?",

    challengeLabel: "Görev: {t}",

    caseNo: "Dava No. 0042",

    agents: "Ajanlar",

    quit: "Çık",

    reveal: "Okumak için dokun",

    fileLabel: "Şahıs dosyası · No. {n}",

    status: "Durum",

    role: "Rol",

    roleHidden: "gizli gizli",

    achieved: "Tamam",

    rulesHelp: "Çiğnendi mi? Bir yudum al. Grup denetler.",

    close: "Kapat",

    sheetOpen: "Dava dosyası ▾",
    sheetClose: "Kapat ▴",
    sheetTitle: "Sabıka kaydı",
    sheetIntro:
      "Kural mı çiğnendi? İhlal'e dokun. Grup denetler, sayaç sadece yardımcıdır.",
    rulesTab: "Kurallar",
    houseRules: "Ev kuralları",
    violation: "İhlal",
    violationFlash: "Şerefe +1",
    sip: "{n} yudum",
    sips: "{n} yudum",
    eliminated: "Elendi",
    active: "Oyunda",

    resultDrink: "İçme vakti!",

    cheers: "Şerefe",
    resultDry: "Kimse içmiyor",
    resultBurger: "Bu vatandaşa oy verenler bir yudum alır.",
    resultNobody: "Garip ama bu vatandaşa kimse oy vermemiş.",
    resultInfiltrant: "Bu gizli ajana oy verenler doğru bilmiş.",

    rules: {
      "1": { t: "BEN yok", d: "'Ben' kelimesini söyleyemezsin." },
      "2": { t: "EVET yok", d: "'Evet' kelimesini söyleyemezsin." },
      "3": { t: "HAYIR yok", d: "'Hayır' kelimesini söyleyemezsin." },
      "4": { t: "EEE yok", d: "'Eee', 'ıııh' veya 'şey' diyemezsin." },
      "5": { t: "İsim yok", d: "Kimseye adıyla seslenemezsin." },
      "6": {
        t: "Şüpheli yok",
        d: "'Şüpheli' kelimesini söyleyemezsin.",
      },
      "7": {
        t: "Özür yok",
        d: "'Pardon' veya 'özür dilerim' diyemezsin.",
      },
      "8": {
        t: "Belki yok",
        d: "'Belki', 'galiba' veya 'muhtemelen' yok.",
      },
      "9": { t: "Neden yok", d: "'Neden' kelimesini söyleyemezsin." },
      "10": { t: "Cidden yok", d: "'Cidden' veya 'gerçekten' yok." },
      "11": { t: "Bilmek yok", d: "'Biliyorum', 'bilmek' veya 'bildim' yok." },
      "12": { t: "Sen yok", d: "'Sen', 'sana' veya 'senin' yok." },
      "13": {
        t: "Düşünmek yok",
        d: "'Sanırım', 'düşünmek' veya 'düşündüm' yok.",
      },
      "14": { t: "Sadece yok", d: "'Sadece' kelimesini söyleyemezsin." },
      "15": { t: "Ama yok", d: "'Ama' kelimesini söyleyemezsin." },
      "16": {
        t: "Parmakla gösterme",
        d: "Kimseyi parmağınla gösteremezsin.",
      },
      "17": {
        t: "Gülme",
        d: "İpucu sırasında veya tartışmada gülemezsin.",
      },
      "18": {
        t: "Göz teması yok",
        d: "Kendi ipucunu verirken kimsenin gözüne bakma.",
      },
      "19": {
        t: "Eller dursun",
        d: "Konuşurken yüzüne dokunamazsın.",
      },
      "20": {
        t: "Başını sallama",
        d: "Onaylamak için başını sallayamazsın.",
      },
      "21": {
        t: "Hayır anlamında sallama",
        d: "Reddetmek için başını iki yana sallayamazsın.",
      },
      "22": { t: "Kollar serbest", d: "Kollarını kavuşturamazsın." },
      "23": {
        t: "Telefona dokunma",
        d: "Sıra sende değilken telefona dokunma.",
      },
      "24": {
        t: "Sözünü kesme",
        d: "Konuşan birinin sözünü kesemezsin.",
      },
      "25": {
        t: "Ağzın açık",
        d: "Konuşurken ağzını kapatamazsın.",
      },
      "26": {
        t: "Sadece soru",
        d: "Tartışmada yalnızca soru sorabilirsin.",
      },
      "27": { t: "Soru yasak", d: "Hiç soru soramazsın." },
      "28": {
        t: "En fazla beş kelime",
        d: "Tartışmadaki her sıran en fazla beş kelimedir.",
      },
      "29": {
        t: "Tekrar yok",
        d: "Daha önce söylediğini tekrarlayamazsın.",
      },
      "30": {
        t: "Yabancı kelime yok",
        d: "Başka bir dilden kelime kullanamazsın.",
      },
      "31": {
        t: "Yavaş konuş",
        d: "Acele etme. Çok hızlı mıydın, buna grup karar verir.",
      },
      "32": {
        t: "Savunma yok",
        d: "Masum olduğunu söyleyemezsin.",
      },
      "33": {
        t: "Kesinlik yok",
        d: "Bir şeyden %100 emin olduğunu söyleyemezsin.",
      },
      "34": {
        t: "Benzersiz ipucu",
        d: "İpucun daha önce başkası tarafından verilmiş olamaz.",
      },
      "35": {
        t: "Tek cümle",
        d: "Tartışmada her sırada tek bir cümle söylersin.",
      },
      "36": {
        t: "Yasak müttefik",
        d: "Aynı kişiyi üst üste iki kez savunma.",
      },
      "37": {
        t: "Oy tavsiyesi yok",
        d: "Kimseye kime oy vereceğini söyleyemezsin.",
      },
      "38": {
        t: "Rol adı yok",
        d: "Asla 'vatandaş', 'gizli ajan' veya 'Mr. White' deme.",
      },
      "39": {
        t: "Suçlama yok",
        d: "Kimseyi doğrudan suçlayamazsın, yalnızca dolaylı olarak.",
      },
      "40": {
        t: "Kendini savunma yok",
        d: "Sana yöneltilen bir suçlamaya cevap veremezsin.",
      },
      "41": {
        t: "İlk sen olma",
        d: "Tartışma açıldığında ilk konuşan sen olamazsın.",
      },
      "42": {
        t: "Katılmak yok",
        d: "Birine katıldığını açıkça söyleyemezsin.",
      },
      "43": {
        t: "Oy sorusu yok",
        d: "Kimseye kime oy vereceğini soramazsın.",
      },
      "44": {
        t: "İpucu açıklaması yok",
        d: "İpucunu sonradan açıklayamazsın.",
      },
      "45": {
        t: "Alıntı yok",
        d: "Önceki ipuçlarını kelimesi kelimesine aktaramazsın.",
      },
    },

    challenges: {
      "1": {
        t: "Oltacı",
        d: "Kendin söylemeden birine yasak bir kelime söylet.",
      },
      "2": {
        t: "Papağan",
        d: "Başka bir oyuncunun ipucunu kelimesi kelimesine tekrarlamasını sağla.",
      },
      "3": {
        t: "Korunan",
        d: "Birinin seni kendiliğinden savunmasını sağla.",
      },
      "4": {
        t: "Manipülatör",
        d: "Birinin senin yüzünden şüphelisini yüksek sesle değiştirmesini sağla.",
      },
      "5": {
        t: "Yem",
        d: "Suçlanmayı başar ve oylamadan sağ çık.",
      },
      "6": {
        t: "Karıştırıcı",
        d: "İki oyuncunun aynı tartışmada birbirini suçlamasını sağla.",
      },
    },
  },

  pvote: {
    kicker: "Tur {n} · Gizli oylama",
    title: "Gizli oylama",
    revoteTitle: "Yeniden oylama",
    resultTitle: "Sonuç",
    instruction:
      "Rolündeki gibi: kendi dosyana dokun, gizlice oy ver ve telefonu devret. Sıra önemli değil.",
    number: "No. {n}",
    voted: "Oy verdi",
    tapToVote: "Oy vermek için dokun",
    waiting: "Henüz yok",
    tally: "Oyları say",
    progress: "{n} / {total} oy verdi",
    ask: "{name}, kime oy veriyorsun?",
    myVote: "Oyum",
    confirm: "{name} için oyu onayla",
    pickFirst: "Bir şüpheli seç",
    tieTitle: "Beraberlik",
    tieBody:
      "Kimse elenmiyor ve kimse içmiyor. Herkes yeniden oy veriyor, yalnızca şunlar arasında:",
    revote: "Yeniden oylamayı başlat",
  },
};

export default tr;
