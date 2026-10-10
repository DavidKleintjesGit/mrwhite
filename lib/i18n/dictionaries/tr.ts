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
    diffHelpHard:
      "Kelimeler birbirine çok benziyor. Şüphe garanti.",
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
    kicker: "Adım 1 / 3",
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
    kicker: "Adım 2 / 3",
    title: "Kimler oynuyor?",
    hint: "Bir alanı boş bırakırsan sana kod adı veririz.",
    placeholder: "Ajan {n}",
    back: "Dağılım",
    deal: "Kelimeleri dağıt",
  },

  deal: {
    kicker: "Adım 3 / 3",
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
    holdSub:
      "Yalnızca {name} görebilir. Dosyayı kapatmak için bırak.",
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
};

export default tr;
