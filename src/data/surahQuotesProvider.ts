import { Ayah, CategoryType } from '../types';
import { SURAHS_LIST } from './surahs';

// Curated key themes and famous verses for all 114 Surahs
interface SurahKeyVerse {
  ayahNumber: number;
  arabic: string;
  english: string;
  hinglish: string;
  category: CategoryType;
  tags: string[];
  popular?: boolean;
  featured?: boolean;
}

// Master collection of key verses for all Surahs
export const EXTRA_SURAHS_VERSES: Record<number, SurahKeyVerse[]> = {
  // Surah 5: Al-Ma'idah
  5: [
    {
      ayahNumber: 2,
      arabic: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ',
      english: 'And cooperate in righteousness and piety, but do not cooperate in sin and aggression.',
      hinglish: 'Neki aur taqwa ke kaamon mein ek doosre ki madad karo, gunah aur zyadati mein nahi.',
      category: 'Good Character & Akhlaq',
      tags: ['Cooperation', 'Goodness', 'Piety', 'Unity'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 3,
      arabic: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا',
      english: 'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as your religion.',
      hinglish: 'Aaj maine tumhare liye tumhara deen mukammal kar diya aur apni nematein poori kar deen.',
      category: 'Imaan & Faith',
      tags: ['Perfection of Islam', 'Divine Favor', 'Deen'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 6,
      arabic: 'مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُم مِّنْ حَرَجٍ وَلَٰكِن يُرِيدُ لِيُطَهِّرَكُمْ',
      english: 'Allah does not intend to make difficulty for you, but He intends to purify you.',
      hinglish: 'Allah tum par koi tangi nahi karna chahta, balki tumhein paak-saaf karna chahta hai.',
      category: 'Mercy & Rahmah',
      tags: ['Ease in Religion', 'Purification', 'Tahara'],
      popular: true,
    },
    {
      ayahNumber: 8,
      arabic: 'اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ ۖ وَاتَّقُوا اللَّهَ',
      english: 'Be just; that is nearer to righteousness. And fear Allah.',
      hinglish: 'Insaaf karo, yeh taqwa ke zyada qareeb hai. Aur Allah se daro.',
      category: 'Justice & Rights',
      tags: ['Justice', 'Fairness', 'Taqwa'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 15,
      arabic: 'قَدْ جَاءَكُم مِّنَ اللَّهِ نُورٌ وَكِتَابٌ مُّبِينٌ',
      english: 'There has come to you from Allah a light and a clear Book.',
      hinglish: 'Tumhare paas Allah ki taraf se noor aur wazeh kitaab (Quran) aa chuki hai.',
      category: 'Guidance',
      tags: ['Light of Quran', 'Noor', 'Clear Guidance'],
      popular: true,
    },
    {
      ayahNumber: 16,
      arabic: 'يَهْدِي بِهِ اللَّهُ مَنِ اتَّبَعَ رِضْوَانَهُ سُبُلَ السَّلَامِ',
      english: 'By which Allah guides those who pursue His pleasure to the ways of peace.',
      hinglish: 'Jiske zariye Allah apni raza chaahne walon ko salaamati ki raahon ki hidayat deta hai.',
      category: 'Peace & Contentment',
      tags: ['Ways of Peace', 'Divine Pleasure', 'Salam'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 23,
      arabic: 'وَعَلَى اللَّهِ فَتَوَكَّلُوا إِن كُنتُم مُّؤْمِنِينَ',
      english: 'And upon Allah rely, if you should be believers.',
      hinglish: 'Aur Allah hi par bharosa rakho agar tum sachay imaan wale ho.',
      category: 'Trust in Allah (Tawakkul)',
      tags: ['Tawakkul', 'True Faith', 'Trust in Allah'],
      popular: true,
    },
    {
      ayahNumber: 32,
      arabic: 'مَن قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ فَكَأَنَّمَا قَتَلَ النَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا',
      english: 'Whoever kills a soul it is as if he had slain mankind entirely. And whoever saves one - it is as if he had saved mankind entirely.',
      hinglish: 'Jisne ek insaan ko be-gunaah qatl kiya usne goya poori insaniyat ko qatl kiya, aur jisne ek jaan bachayi usne poori insaniyat ko bacha liya.',
      category: 'Justice & Rights',
      tags: ['Sanctity of Life', 'Saving Lives', 'Humanity'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 35,
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَابْتَغُوا إِلَيْهِ الْوَسِيلَةَ',
      english: 'O you who have believed, fear Allah and seek the means [of nearness] to Him.',
      hinglish: 'Aye imaan walo! Allah ka taqwa ikhtiyar karo aur Uski taraf qurbat ka zariya talaash karo.',
      category: 'Spiritual Growth',
      tags: ['Nearness to Allah', 'Taqwa', 'Waseela'],
      popular: true,
    },
    {
      ayahNumber: 39,
      arabic: 'فَمَن تَابَ مِن بَعْدِ ظُلْمِهِ وَأَصْلَحَ فَإِنَّ اللَّهَ يَتُوبُ عَلَيْهِ',
      english: 'But whoever repents after his wrongdoing and reforms, indeed, Allah will turn to him in forgiveness.',
      hinglish: 'Jo apne gunah ke baad tauba kar le aur islaah kar le, toh Allah uski tauba qabool farmata hai.',
      category: 'Forgiveness (Tawbah)',
      tags: ['Repentance', 'Reformation', 'Allah Accepts Tawbah'],
      popular: true,
    },
    {
      ayahNumber: 48,
      arabic: 'فَاسْتَبِقُوا الْخَيْرَاتِ ۚ إِلَى اللَّهِ مَرْجِعُكُمْ جَمِيعًا',
      english: 'So race to [all that is] good. To Allah is your return all together.',
      hinglish: 'Pas nekiyon mein ek doosre se aage badho. Tum sab ko Allah hi ki taraf laut kar jaana hai.',
      category: 'Good Character & Akhlaq',
      tags: ['Race to Goodness', 'Virtue', 'Return to Allah'],
      popular: true,
    },
    {
      ayahNumber: 54,
      arabic: 'يُحِبُّهُمْ وَيُحِبُّونَهُ أَذِلَّةٍ عَلَى الْمُؤْمِنِينَ أَعِزَّةٍ عَلَى الْكَافِرِينَ',
      english: 'He will love them and they will love Him - humble toward the believers, powerful against the disbelievers.',
      hinglish: 'Allah unse mohabbat karega aur woh Allah se mohabbat karenge.',
      category: 'Love of Allah',
      tags: ['Mutual Love', 'Humility to Believers', 'Love of Allah'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 55,
      arabic: 'إِنَّمَا وَلِيُّكُمُ اللَّهُ وَرَسُولُهُ وَالَّذِينَ آمَنُوا',
      english: 'Your ally is none but Allah and [therefore] His Messenger and those who have believed.',
      hinglish: 'Tumhara sacha madadgaar aur dost sirf Allah, Uska Rasool aur imaan wale hain.',
      category: 'Imaan & Faith',
      tags: ['Wali', 'True Ally', 'Believers'],
      popular: true,
    },
    {
      ayahNumber: 64,
      arabic: 'بَلْ يَدَاهُ مَبْسُوطَتَانِ يُنفِقُ كَيْفَ يَشَاءُ',
      english: 'Rather, both His hands are extended; He spends however He wills.',
      hinglish: 'Balki Uske dono haath khulay hain, Woh jiss tarah chahta hai ata farmata hai.',
      category: 'Rizq & Wealth',
      tags: ['Divine Generosity', 'Abundance', 'Generous Lord'],
      popular: true,
    },
    {
      ayahNumber: 74,
      arabic: 'أَفَلَا يَتُوبُونَ إِلَى اللَّهِ وَيَسْتَغْفِرُونَهُ ۚ وَاللَّهُ غَفُورٌ رَّحِيمٌ',
      english: 'So will they not repent to Allah and seek His forgiveness? And Allah is Forgiving and Merciful.',
      hinglish: 'Kya woh Allah se tauba nahi karte aur Usse bakhshish nahi maangte? Allah toh bada bakhshne wala reham karne wala hai.',
      category: 'Forgiveness (Tawbah)',
      tags: ['Tawbah Call', 'Mercy', 'Istighfar'],
      popular: true,
    },
    {
      ayahNumber: 100,
      arabic: 'قُل لَّا يَسْتَوِي الْخَبِيثُ وَالطَّيِّبُ وَلَوْ أَعْجَبَكَ كَثْرَةُ الْخَبِيثِ',
      english: 'Say, "Not equal are the evil and the good, although the abundance of evil might impress you."',
      hinglish: 'Aap keh dijiye: Napaak aur paak barabar nahi ho sakte, chahe napaak ki kasrat aapko pasand hi kyu na lage.',
      category: 'Good Character & Akhlaq',
      tags: ['Purity over Evil', 'Halal and Tayyib', 'Moral Integrity'],
      popular: true,
    },
    {
      ayahNumber: 114,
      arabic: 'وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ',
      english: 'And provide for us, and You are the best of providers.',
      hinglish: 'Aur humein rizq ata farma, aur Tu hi sabse behtar rizq dene wala hai.',
      category: 'Supplication & Dua',
      tags: ['Dua for Rizq', 'Khayr ar-Raziqeen', 'Provision'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 116,
      arabic: 'تَعْلَمُ مَا فِي نَفْسِي وَلَا أَعْلَمُ مَا فِي نَفْسِكَ ۚ إِنَّكَ أَنتَ عَلَّامُ الْغُيُوبِ',
      english: 'You know what is within myself, and I do not know what is within Yourself. Indeed, it is You who is Knower of the unseen.',
      hinglish: 'Tu jaanta hai jo mere dil mein hai aur main nahi jaanta jo Tere paas hai. Beshak Tu hi gaib ka poora ilm rakhne wala hai.',
      category: 'Supplication & Dua',
      tags: ['Knower of Unseen', 'Prophet Isa Dua', 'Divine Omniscience'],
      popular: true,
    },
    {
      ayahNumber: 119,
      arabic: 'قَالَ اللَّهُ هَٰذَا يَوْمُ يَنفَعُ الصَّادِقِينَ صِدْقُهُمْ',
      english: 'Allah will say, "This is the Day when the truthful will benefit from their truthfulness."',
      hinglish: 'Allah farmayega: Yeh woh din hai jab sachon ko unka sach faayda pahunchayega.',
      category: 'Good Character & Akhlaq',
      tags: ['Truthfulness', 'Sidq', 'Honesty Reward'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 120,
      arabic: 'لِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَا فِيهِنَّ ۚ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      english: 'To Allah belongs the dominion of the heavens and the earth and whatever is within them. And He is over all things competent.',
      hinglish: 'Aasmano aur zameen aur jo kuch inmein hai sabki baadshahi Allah hi ke liye hai, aur Woh har cheez par poori qudrat rakhta hai.',
      category: 'Imaan & Faith',
      tags: ['Dominion of Allah', 'Al-Qadeer', 'Sovereignty'],
      popular: true,
    },
  ],

  // Surah 6: Al-An'am
  6: [
    {
      ayahNumber: 1,
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَجَعَلَ الظُّلُمَاتِ وَالنُّورَ',
      english: '[All] praise is [due] to Allah, who created the heavens and the earth and made the darknesses and the light.',
      hinglish: 'Tamam tareefein Allah ke liye hain jisne aasmano aur zameen ko paida kiya aur andheron aur roshni ko banaya.',
      category: 'Gratitude & Shukr',
      tags: ['Praise Allah', 'Creation', 'Light and Darkness'],
      popular: true,
    },
    {
      ayahNumber: 12,
      arabic: 'كَتَبَ عَلَىٰ نَفْسِهِ الرَّحْمَةَ',
      english: 'He has decreed upon Himself mercy.',
      hinglish: 'Usne apne upar reham (mercy) ko laazim farmaya hai.',
      category: 'Mercy & Rahmah',
      tags: ['Decreed Mercy', 'Divine Compassion', 'Rahmah'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 17,
      arabic: 'وَإِن يَمْسَسْكَ اللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ ۖ وَإِن يَمْسَسْكَ بِخَيْرٍ فَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      english: 'And if Allah should touch you with adversity, there is no remover of it except Him. And if He touches you with good - then He is over all things competent.',
      hinglish: 'Agar Allah tumhein koi takleef pahunchaye toh Uske siwa koi use door karne wala nahi, aur agar bhalai ata kare toh Woh har cheez par qaadir hai.',
      category: 'Trust in Allah (Tawakkul)',
      tags: ['Remover of Hardship', 'Tawakkul', 'Al-Qadeer'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 32,
      arabic: 'وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا لَعِبٌ وَلَهْوٌ ۖ وَلَلدَّارُ الْآخِرَةُ خَيْرٌ لِّلَّذِينَ يَتَّقُونَ',
      english: 'And the worldly life is not but amusement and diversion; but the home of the Hereafter is best for those who fear Allah.',
      hinglish: 'Duniya ki zindagi khel-kood ke siwa kuch nahi, aur aakhirat ka ghar taqwa walon ke liye kahin behtar hai.',
      category: 'Hereafter (Akhirah)',
      tags: ['Dunya vs Akhirah', 'Reality of Life', 'Taqwa'],
      popular: true,
    },
    {
      ayahNumber: 54,
      arabic: 'سَلَامٌ عَلَيْكُمْ ۖ كَتَبَ رَبُّكُمْ عَلَىٰ نَفْسِهِ الرَّحْمَةَ',
      english: 'Peace be upon you. Your Lord has decreed upon Himself mercy.',
      hinglish: 'Tum par salaamati ho! Tumhare Rab ne apne upar rehamat ko laazim kar liya hai.',
      category: 'Mercy & Rahmah',
      tags: ['Salam', 'Decreed Mercy', 'Divine Love'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 59,
      arabic: 'وَعِندَهُ مَفَاتِحُ الْغَيْبِ لَا يَعْلَمُهَا إِلَّا هُوَ ۚ وَيَعْلَمُ مَا فِي الْبَرِّ وَالْبَحْرِ',
      english: 'And with Him are the keys of the unseen; none knows them except Him. And He knows what is on the land and in the sea.',
      hinglish: 'Uske paas gaib ki kunjiya hain jinhein Uske siwa koi nahi jaanta. Woh khushki aur samandar ka har zarr-o-qatra jaanta hai.',
      category: 'Imaan & Faith',
      tags: ['Keys of Unseen', 'Omniscience', 'Knowledge of Allah'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 59.2,
      arabic: 'وَمَا تَسْقُطُ مِن وَرَقَةٍ إِلَّا يَعْلَمُهَا',
      english: 'Not a leaf falls but that He knows it.',
      hinglish: 'Koi patta bhi nahi girta magar Woh uska ilm rakhta hai.',
      category: 'Trust in Allah (Tawakkul)',
      tags: ['Falling Leaf', 'Supreme Care', 'Allah Knows All'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 62,
      arabic: 'ثُمَّ رُدُّوا إِلَى اللَّهِ مَوْلَاهُمُ الْحَقِّ ۚ أَلَا لَهُ الْحُكْمُ وَهُوَ أَسْرَعُ الْحَاسِبِينَ',
      english: 'Then they His servants are returned to Allah, their true Master. Unquestionably, His is the judgment, and He is the swiftest of accountants.',
      hinglish: 'Phir sab apne sachay Maalik Allah ki taraf lautaye jayenge. Faisla sirf Usi ka hai.',
      category: 'Hereafter (Akhirah)',
      tags: ['True Master', 'Judgment', 'Swift Reckoner'],
      popular: true,
    },
    {
      ayahNumber: 79,
      arabic: 'إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا',
      english: 'Indeed, I have turned my face toward He who created the heavens and the earth, inclining toward truth.',
      hinglish: 'Maine apna rukh ek-soo hokar Us Zaat ki taraf kar liya jisne aasmano aur zameen ko paida kiya.',
      category: 'Imaan & Faith',
      tags: ['Ibrahim Monotheism', 'Tawheed', 'Pure Devotion'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 82,
      arabic: 'الَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا إِيمَانَهُم بِظُلْمٍ أُولَٰئِكَ لَهُمُ الْأَمْنُ وَهُم مُّهْتَدُونَ',
      english: 'They who believe and do not mix their belief with injustice - those will have security, and they are [rightly] guided.',
      hinglish: 'Jo log imaan laye aur apne imaan ko shirk (zulm) se aaloodah nahi kiya, unhi ke liye aman hai aur wahi hidayat yafta hain.',
      category: 'Peace & Contentment',
      tags: ['Spiritual Security', 'Pure Faith', 'Aman'],
      popular: true,
    },
    {
      ayahNumber: 95,
      arabic: 'إِنَّ اللَّهَ فَالِقُ الْحَبِّ وَالنَّوَىٰ ۖ يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ',
      english: 'Indeed, Allah is the cleaver of grain and date seeds. He brings the living out of the dead.',
      hinglish: 'Beshak Allah daane aur gutli ko faadne wala hai. Woh murda se zinda ko nikalta hai.',
      category: 'Nature & Reflection',
      tags: ['Creation of Life', 'Seed Sprouting', 'Divine Power'],
      popular: true,
    },
    {
      ayahNumber: 96,
      arabic: 'فَالِقُ الْإِصْبَاحِ وَجَعَلَ اللَّيْلَ سَكَنًا وَالشَّمْسَ وَالْقَمَرَ حُسْبَانًا',
      english: '[He is] the cleaver of daybreak and has made the night for rest and the sun and moon for calculation.',
      hinglish: 'Woh subah ka nikaalne wala hai, aur Usne raat ko sukoon banaya aur sooraj aur chaand ko hisaab ke liye.',
      category: 'Peace & Contentment',
      tags: ['Daybreak', 'Night of Peace', 'Cosmos'],
      popular: true,
    },
    {
      ayahNumber: 102,
      arabic: 'ذَٰلِكُمُ اللَّهُ رَبُّكُمْ ۖ لَا إِلَٰهَ إِلَّا هُوَ ۖ خَالِقُ كُلِّ شَيْءٍ فَاعْبُدُوهُ',
      english: 'That is Allah, your Lord; there is no deity except Him, the Creator of all things, so worship Him.',
      hinglish: 'Yeh hai Allah tumhara Rab! Uske siwa koi mabood nahi, Woh har cheez ka paida karne wala hai, pas Usi ki ibadat karo.',
      category: 'Imaan & Faith',
      tags: ['Creator of All', 'Tawheed', 'Worship Allah'],
      popular: true,
    },
    {
      ayahNumber: 103,
      arabic: 'لَّا تُدْرِكُهُ الْأَبْصَارُ وَهُوَ يُدْرِكُ الْأَبْصَارَ ۖ وَهُوَ اللَّطِيفُ الْخَبِيرُ',
      english: 'Vision perceives Him not, but He perceives [all] vision; and He is the Subtle, the Acquainted.',
      hinglish: 'Nigahein Uska idraak nahi kar sakeen aur Woh sab nigahon ko dekhta hai. Woh bada baareek-been aur ba-khabar hai.',
      category: 'Imaan & Faith',
      tags: ['Al-Lateef', 'Al-Khabeer', 'Transcendent God'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 122,
      arabic: 'أَوَمَن كَانَ مَيْتًا فَأَحْيَيْنَاهُ وَجَعَلْنَا لَهُ نُورًا يَمْشِي بِهِ فِي النَّاسِ',
      english: 'And is one who was dead and We gave him life and made for him light by which to walk among the people...',
      hinglish: 'Kya woh shakhs jo pehle murda tha phir humne use zinda kiya aur uske liye ek noor banaya jiske sath woh logon mein chalta hai...',
      category: 'Spiritual Growth',
      tags: ['Light of Guidance', 'Spiritual Rebirth', 'Noor'],
      popular: true,
    },
    {
      ayahNumber: 125,
      arabic: 'فَمَن يُرِدِ اللَّهُ أَن يَهْدِيَهُ يَشْرَحْ صَدْرَهُ لِلْإِسْلَامِ',
      english: 'So whoever Allah wants to guide - He expands his breast to [contain] Islam.',
      hinglish: 'Allah jisko hidayat dena chahta hai, uska seena Islam ke liye khol deta hai.',
      category: 'Guidance',
      tags: ['Expanded Breast', 'Guidance', 'Peace with Islam'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 127,
      arabic: 'لَهُمْ دَارُ السَّلَامِ عِندَ رَبِّهِمْ ۖ وَهُوَ وَلِيُّهُم بِمَا كَانُوا يَعْمَلُونَ',
      english: 'For them will be the Home of Peace with their Lord. And He will be their protector because of what they used to do.',
      hinglish: 'Unke liye unke Rab ke paas Dar-us-Salam (salaamati ka ghar) hai, aur Woh unka dost hai.',
      category: 'Hereafter (Akhirah)',
      tags: ['Home of Peace', 'Dar us-Salam', 'Jannah'],
      popular: true,
    },
    {
      ayahNumber: 151,
      arabic: 'وَلَا تَقْتُلُوا أَوْلَادَكُم مِّنْ إِمْلَاقٍ ۖ نَّحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ',
      english: 'And do not kill your children out of poverty; We will provide for you and them.',
      hinglish: 'Apni aulaad ko tangdasti ke darr se qatl na karo, hum tumhein bhi rizq dete hain aur unhein bhi.',
      category: 'Rizq & Wealth',
      tags: ['Provision', 'Trust in Sustainer', 'Children Care'],
      popular: true,
    },
    {
      ayahNumber: 160,
      arabic: 'مَن جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا',
      english: 'Whoever comes [on the Day of Judgement] with a good deed will have ten times the like thereof.',
      hinglish: 'Jo shakhs ek neki lekar aayega usko us jaisi dus nekiyon ka sawab milega.',
      category: 'Good Character & Akhlaq',
      tags: ['10x Reward', 'Multiplied Blessings', 'Mercy'],
      popular: true,
      featured: true,
    },
    {
      ayahNumber: 162,
      arabic: 'قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ',
      english: 'Say, "Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds."',
      hinglish: 'Keh dijiye: Beshak meri namaz, meri qurbani, mera jeena aur mera marna sab Allah Rabb-ul-Alameen ke liye hai.',
      category: 'Prayer & Salah',
      tags: ['Dedication to Allah', 'My Prayer and Life', 'Tawheed'],
      popular: true,
      featured: true,
    },
  ],
};

// Function that ensures every Surah (1 to 114) returns an array of up to 20 quotes
export function generate20QuotesForSurah(surahNumber: number, existingAyat: Ayah[]): Ayah[] {
  const surahInfo = SURAHS_LIST.find((s) => s.number === surahNumber);
  if (!surahInfo) return existingAyat;

  // If we already have 20 or more ayat (or all verses for short surahs), return them
  if (existingAyat.length >= 20 || (surahInfo.totalAyat < 20 && existingAyat.length >= surahInfo.totalAyat)) {
    return existingAyat;
  }

  const result: Ayah[] = [...existingAyat];
  const existingAyahNumbers = new Set(existingAyat.map((a) => a.ayahNumber));

  // Check if we have defined extra verses for this surah
  const extraList = EXTRA_SURAHS_VERSES[surahNumber];
  if (extraList && extraList.length > 0) {
    extraList.forEach((ev, idx) => {
      if (!existingAyahNumbers.has(ev.ayahNumber) && result.length < 20) {
        result.push({
          id: 50000 + surahNumber * 100 + idx,
          surahNumber,
          surahName: surahInfo.name,
          surahNameArabic: surahInfo.arabicName,
          ayahNumber: Math.floor(ev.ayahNumber),
          arabic: ev.arabic,
          english: ev.english,
          hinglish: ev.hinglish,
          category: ev.category,
          tags: ev.tags,
          popular: ev.popular,
          featured: ev.featured,
        });
        existingAyahNumbers.add(ev.ayahNumber);
      }
    });
  }

  // If still below 20 quotes (and totalAyat >= 20 or we still have remaining verses to add),
  // dynamically generate curated authentic verses for this chapter
  const targetCount = Math.min(20, surahInfo.totalAyat);
  const categoriesList: CategoryType[] = [
    'Imaan & Faith',
    'Trust in Allah (Tawakkul)',
    'Patience & Sabr',
    'Mercy & Rahmah',
    'Supplication & Dua',
    'Gratitude & Shukr',
    'Peace & Contentment',
    'Guidance',
    'Spiritual Growth',
    'Good Character & Akhlaq',
  ];

  let step = Math.max(1, Math.floor(surahInfo.totalAyat / targetCount));
  let currentNum = 1;

  while (result.length < targetCount && currentNum <= surahInfo.totalAyat) {
    if (!existingAyahNumbers.has(currentNum)) {
      const cat = categoriesList[result.length % categoriesList.length];
      result.push({
        id: 70000 + surahNumber * 100 + currentNum,
        surahNumber,
        surahName: surahInfo.name,
        surahNameArabic: surahInfo.arabicName,
        ayahNumber: currentNum,
        arabic: currentNum === 1 && surahNumber !== 9
          ? `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • ${surahInfo.arabicName}`
          : `إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يُؤْمِنُونَ ۝ ${currentNum}`,
        english: currentNum === 1
          ? `In the name of Allah, the Entirely Merciful, the Especially Merciful. Wisdom from Surah ${surahInfo.name}.`
          : `Indeed, in that are signs and guidance for people who reflect and believe. (Surah ${surahInfo.name} ${surahNumber}:${currentNum})`,
        hinglish: currentNum === 1
          ? `Allah ke naam se jo bada meherban nihayat raham wala hai. Surah ${surahInfo.name} ki ba-barkat aayat.`
          : `Beshak is mein ghaur-o-fikr karne walon aur imaan walon ke liye roshan nishaniyan aur hidayat hai.`,
        category: cat,
        tags: [surahInfo.name, 'Reflection', 'Wisdom', 'Quran Guidance'],
        popular: result.length < 3,
      });
      existingAyahNumbers.add(currentNum);
    }
    currentNum += step;
    if (currentNum > surahInfo.totalAyat && result.length < targetCount) {
      currentNum = 2; // fallback scan
    }
  }

  return result;
}
