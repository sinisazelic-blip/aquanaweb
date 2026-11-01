export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  date: string; // dd.mm.yyyy.
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export const allNewsArticles: NewsItem[] = [
  {
    "id": 1,
    "slug": "plivaj-srcem-2026-propozicije-i-prijave",
    "title": "Plivaj srcem 2026 — Zvanične propozicije i prijave za međunarodni GOB miting",
    "date": "28.10.2026.",
    "category": "Takmičenja",
    "image": "/images/Plivaj-srcem-2026-propozicije_261027_111254-300x225.jpg",
    "excerpt": "Objavljene su zvanične propozicije i satnica za tradicionalni međunarodni plivački miting na Gradskom olimpijskom bazenu.",
    "content": "Plivački klub 22. April i Gradski olimpijski bazen Banja Luka najavljuju tradicionalni međunarodni plivački miting 'Plivaj srcem 2026'. Miting okuplja preko 400 takmičara iz zemalja regiona. Takmičenje se održava u 50-metarskom olimpijskom bazenu uz elektronsko mjerenje vremena Omega sistemom. Prijave su otvorene do 15. novembra."
  },
  {
    "id": 2,
    "slug": "upis-novih-grupa-skola-plivanja-gob",
    "title": "Upis novih grupa u školu plivanja na Gradskom olimpijskom bazenu",
    "date": "24.10.2026.",
    "category": "Škola plivanja",
    "image": "/images/FB_IMG_1788612498206-300x225.jpg",
    "excerpt": "Komercijalne grupe za djecu neplivače i usavršavanje plivačkih tehnika uz profesore DIF-a. Prijave na telefon 065 72 50 50.",
    "content": "Gradski olimpijski bazen vrši svakodnevni upis novih polaznika u komercijalnu školu plivanja za djecu i odrasle. Program vode licencirani profesori sporta i fizičkog vaspitanja, uz prilagođene grupe početnika, poluplivača i usavršavanja stilova plivanja. Takođe, podsjećamo da se u saradnji sa Gradom Banja Luka redovno sprovodi i besplatna obuka za učenike osnovnih škola. Za sve informacije i rezervacije pozovite 065 72 50 50."
  },
  {
    "id": 3,
    "slug": "novi-raspored-staza-i-nocno-kupanje",
    "title": "Novi raspored rekreativnih staza i noćno kupanje za građanstvo",
    "date": "15.10.2026.",
    "category": "Građanstvo",
    "image": "/images/FB_IMG_1791365485852-300x225.jpg",
    "excerpt": "Prošireni kapaciteti za rekreativce sa 5 do 8 slobodnih staza u jutarnjim i večernjim terminima.",
    "content": "Kako bismo građanima Banjaluke omogućili maksimalan komfor i vrhunske uslove za rekreaciju, uveden je novi jesenje-zimski raspored staza. U jutarnjem terminu od 06:00 do 08:00h građanima je na raspolaganju čitav bazen po povoljnijoj cijeni, dok je u večernjem terminu od 20:00 do 22:00h obezbijeđeno noćno plivanje uz optimalnu rasvjetu i FINA temperaturu vode od 26.8°C."
  },
  {
    "id": 4,
    "slug": "%d0%b1%d0%b5%d1%81%d0%bf%d0%bb%d0%b0%d1%82%d0%b0%d0%bd-%d1%83%d0%bb%d0%b0%d0%b7-%d0%b7%d0%b0-%d0%b4%d0%b0%d0%bc%d0%b5-%d0%bd%d0%b0-%d0%b3%d1%80%d0%b0%d0%b4%d1%81%d0%ba%d0%b8-%d0%be%d0%bb%d0%b8%d0%bc",
    "title": "Бесплатан улаз за даме на Градски олимпијски базен поводом 8. марта!!!",
    "date": "07.03.2022.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "ЈП “Аquana” и Градски олимпијски базен, традиционално, поклањају бесплатан улаз свим бањалучким дамама за 8. март!\\nДобродошле нам на Градски олимпијски базен и...",
    "content": "ЈП “Аquana” и Градски олимпијски базен, традиционално, поклањају бесплатан улаз свим бањалучким дамама за 8. март!\\nДобродошле нам на Градски олимпијски базен и срећан вам празник ???"
  },
  {
    "id": 5,
    "slug": "proslava-8-marta-u-restoranu-aquana",
    "title": "Proslava 8. marta u Restoranu “Aquana”",
    "date": "16.02.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Restoran “Aquana” organizuje svečanu proslavu “Dana žena” za radne kolektive i to u dane 4., 5., 6., 7. i 8.3. Goste će zabavljati popularni banjalučki “NG bend...",
    "content": "Restoran “Aquana” organizuje svečanu proslavu “Dana žena” za radne kolektive i to u dane 4., 5., 6., 7. i 8.3. Goste će zabavljati popularni banjalučki “NG bend” sa bogatim muzičkim repertoarom. Sve goste očekuje ugodna atmosfera uz vrhunsku uslugu i gastronomske specijalitete našeg restorana.\\n\\nRezervišite svoje mjesto na vrijeme! Sve informacije (rezervacije, ponuda…) možete dobiti na broj telefona: 065/481-846 i email adresi: ugostiteljstvo@aquana.ba"
  },
  {
    "id": 6,
    "slug": "slajder-test",
    "title": "Vodeni park Aquana",
    "date": "23.08.2024.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Vodeni park Aquana, koji se prostire na 38.000 metara kvadratnih, je najveća turistička i zabavna atrakcija ove vrste u Banjaluci i širem okruženju. \\r\\nU sasta...",
    "content": "Vodeni park Aquana, koji se prostire na 38.000 metara kvadratnih, je najveća turistička i zabavna atrakcija ove vrste u Banjaluci i širem okruženju. \\r\\nU sastavu akvaparka nalaze se tri bazena: dječiji, plivački i bazen sa atrakcijama (tobogan dužine 100 metara, vodeni tok, vrtlog, fontane, masažna ležišta i masažni mlazevi) ukupne vodene površine od 1.500 metara kvadratnih, kao i velike zelene kaskade i površine sa prirodnim hladom od 24.000 metara kvadratnih."
  },
  {
    "id": 7,
    "slug": "redovni-godisnji-remont-na-gradskom-olimpijskom-bazenu",
    "title": "Redovni godišnji remont na Gradskom olimpijskom bazenu!",
    "date": "23.08.2024.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "\\r\\n Obavještavamo sve korisnike usluga Gradskog olimpijskog bazena da će u periodu od 03.08.2024. do 26.08.2024. biti izvršen redovni godišnji remont. \\r\\n \\r\\...",
    "content": "\\r\\n Obavještavamo sve korisnike usluga Gradskog olimpijskog bazena da će u periodu od 03.08.2024. do 26.08.2024. biti izvršen redovni godišnji remont. \\r\\n \\r\\n \\r\\n GOB neće raditi za građanstvo u navedenom periodu. \\r\\n"
  },
  {
    "id": 8,
    "slug": "igre-bez-granica-na-aquani",
    "title": "Igre bez granica na Aquani",
    "date": "23.08.2024.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "U subotu, 13.07.2024., od 14 do 17 časova, u saradnji sa Školom sporta “Kasper” organizujemo “Igre bez granica”. Očekuje nas pregršt zanimacija, kako na sportsk...",
    "content": "U subotu, 13.07.2024., od 14 do 17 časova, u saradnji sa Školom sporta “Kasper” organizujemo “Igre bez granica”. Očekuje nas pregršt zanimacija, kako na sportskim poligonima tako i na igrama u vodi. Zabava je zagarantovana a pravo učešća imaju svi posjetioci sa kupljenom (ili sezonskom) ulaznicom za vodeni park. Starosne granice nema i pozivamo sve koji se osjećaju fizički spremnim ili žele da se dobro zabave da učestvuju na ovom događaju.\\r\\n\\r\\nVidimo se na Aquani u subotu!!!"
  },
  {
    "id": 9,
    "slug": "kozara-etno-2024-na-aquani",
    "title": "“Kozara ETNO 2024” na Aquani",
    "date": "23.08.2024.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "U subotu, 06.07.2024., u prelijepom ambijentu Vodenog parka “Aquana” je održan kulturno-zabavni program u okviru “Kozara ETNO 2024”. Posjetilo nas je blizu 500 ...",
    "content": "U subotu, 06.07.2024., u prelijepom ambijentu Vodenog parka “Aquana” je održan kulturno-zabavni program u okviru “Kozara ETNO 2024”. Posjetilo nas je blizu 500 učesnika ove tredicionalne manifestacije. Čarolija koja spaja običaje, folklor i tradiciju, prikazana u našem vodenom parku, je oduševila sve prisutne."
  },
  {
    "id": 10,
    "slug": "naslov-slajder-test",
    "title": "Gradski olimpijski bazen",
    "date": "27.08.2024.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Gradski olimpijski bazen je najbolji u regiji i jedan od tri najbolja olimpijska bazena u Evropi. Na GOB-u su postavljeni najsavremeniji startni plivački blokov...",
    "content": "Gradski olimpijski bazen je najbolji u regiji i jedan od tri najbolja olimpijska bazena u Evropi. Na GOB-u su postavljeni najsavremeniji startni plivački blokovi sa najpreciznijim mjerenjem vremena. \\r\\nTo je zapravo najnovija Omegina serija čiji su blokovi prvi ugrađeni na Gradskom olimpijskom bazenu u Banjoj Luci.\\r\\n\\r\\nJP „Aquana”, koja je u vlasništvu grada Banje Luke, upravlja i novootvorenim Gradskim olimpijskim bazenom (GOB).\\r\\n\\r\\nOlimpijski bazen, dimenzija 50×25 metara, projektovan je po standardima Svjetske plivačke i vaterpolo federacije i osposobljen je za takmičenja na najvišem međunarodnom nivou."
  },
  {
    "id": 11,
    "slug": "%d0%bf%d1%80%d0%be%d1%81%d0%bb%d0%b0%d0%b2%d0%b0-8-%d0%bc%d0%b0%d1%80%d1%82%d0%b0-%d1%83-%d1%80%d0%b5%d1%81%d1%82%d0%be%d1%80%d0%b0%d0%bd%d1%83-aquana",
    "title": "Прослава 8. марта у Ресторану “Aquana”",
    "date": "16.02.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Ресторан “Aquana” организује свечану прославу “Дана жена” за радне колективе и то у дане 4., 5., 6., 7. и 8.3. Госте ће забављати популарни бањалучки “НГ бенд” ...",
    "content": "Ресторан “Aquana” организује свечану прославу “Дана жена” за радне колективе и то у дане 4., 5., 6., 7. и 8.3. Госте ће забављати популарни бањалучки “НГ бенд” са богатим музичким репертоаром. Све госте очекује угодна атмосфера уз врхунску услугу и гастрономске специјалитете нашег ресторана.\\n\\nРезервишите своје мјесто на вријеме! Све информације (резервације, понуда…) можете добити на број телефона: 065/481-846 и email адреси: ugostiteljstvo@aquana.ba"
  },
  {
    "id": 12,
    "slug": "vaterpolo-utakmice-na-gob-u-za-vikend",
    "title": "Vaterpolo utakmice na GOB- u za vikend",
    "date": "04.03.2022.",
    "category": "Sport i takmičenja",
    "image": "/images/GOB.jpg",
    "excerpt": "Na Gradskom olimpijskom bazenu će se za vikend održati vaterpolo utakmice i to: u subotu 05.03., od 16 časova, u okviru Regionalne lige, VK Borac – VK Branik Ma...",
    "content": "Na Gradskom olimpijskom bazenu će se za vikend održati vaterpolo utakmice i to: u subotu 05.03., od 16 časova, u okviru Regionalne lige, VK Borac – VK Branik Maribor i u nedelju 06.03., od 17 časova, u okviru 1. B lige Srbije, VK Banjaluka – VK Singidunum Beograd.\\n\\nGOB će u subotu, 05.03.2022., raditi za građanstvo/rekreativce do 14:30 časova, a u nedelju 06.03.2022. do 15:30 časova.\\n\\nKretanje članka"
  },
  {
    "id": 13,
    "slug": "besplatan-ulaz-za-dame-na-gradski-olimpijski-bazen-povodom-8-marta",
    "title": "Besplatan ulaz za dame na Gradski olimpijski bazen povodom 8. marta!!!",
    "date": "07.03.2022.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "JP “Aquana” i Gradski olimpijski bazen, tradicionalno, poklanjaju besplatan ulaz svim banjalučkim damama za 8. mart!\\nDobrodošle nam na Gradski olimpijski bazen...",
    "content": "JP “Aquana” i Gradski olimpijski bazen, tradicionalno, poklanjaju besplatan ulaz svim banjalučkim damama za 8. mart!\\nDobrodošle nam na Gradski olimpijski bazen i srećan vam praznik ???"
  },
  {
    "id": 14,
    "slug": "oglas-za-izdavanje-u-zakup-poslovnog-prostora-u-vodenom-parku-aquana-24-02-2022",
    "title": "Oglas za izdavanje u zakup poslovnog prostora u Vodenom parku Aquana, 24.02.2022.",
    "date": "07.03.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 15,
    "slug": "%d0%b2%d0%b0%d1%82%d0%b5%d1%80%d0%bf%d0%be%d0%bb%d0%be-%d1%83%d1%82%d0%b0%d0%ba%d0%bc%d0%b8%d1%86%d0%b5-%d0%bd%d0%b0-%d0%b3%d0%be%d0%b1-%d1%83-%d0%b7%d0%b0-%d0%b2%d0%b8%d0%ba%d0%b5%d0%bd%d0%b4",
    "title": "Ватерполо утакмице на ГОБ- у за викенд",
    "date": "04.03.2022.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "На Градском олимпијском базену ће се за викенд одржати ватерполо утакмице и то: у суботу 05.03., од 16 часова, у оквиру Регионалне лиге, ВК Борац – ВК Браник Ма...",
    "content": "На Градском олимпијском базену ће се за викенд одржати ватерполо утакмице и то: у суботу 05.03., од 16 часова, у оквиру Регионалне лиге, ВК Борац – ВК Браник Марибор и у недељу 06.03., од 17 часова, у оквиру 1. Б лиге Србије, ВК Бањалука – ВК Сингидунум Београд.\\n\\nГОБ ће у суботу, 05.03.2022., радити за грађанство/рекреативце до 14:30 часова, а у недељу 06.03.2022. до 15:30 часова."
  },
  {
    "id": 16,
    "slug": "%d0%bc%d0%b5%d1%92%d1%83%d0%bd%d0%b0%d1%80%d0%be%d0%b4%d0%bd%d0%b8-%d0%bf%d0%bb%d0%b8%d0%b2%d0%b0%d1%87%d0%ba%d0%b8-%d0%bc%d0%b8%d1%82%d0%b8%d0%bd%d0%b3-%d0%bd%d0%b0-%d0%b3%d0%be%d0%b1-%d1%83",
    "title": "Међународни пливачки митинг на ГОБ- у",
    "date": "25.02.2022.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "У суботу, 26.02.2022., на Градском олимпијском базену ће се одржати 11. Међународни меморијални пливачки митинг “Младост Куп – Бранко Мићин”.\\n\\nГОБ у суботу, 2...",
    "content": "У суботу, 26.02.2022., на Градском олимпијском базену ће се одржати 11. Међународни меморијални пливачки митинг “Младост Куп – Бранко Мићин”.\\n\\nГОБ у суботу, 26.02.2022., неће радити за грађанство/рекреативце.\\n\\n&nbsp;"
  },
  {
    "id": 17,
    "slug": "medjunarodni-plivacki-miting-na-gob-u",
    "title": "Međunarodni plivački miting na GOB- u",
    "date": "25.02.2022.",
    "category": "Sport i takmičenja",
    "image": "/images/ACO_1870-1.jpg",
    "excerpt": "U subotu, 26.02.2022., na Gradskom olimpijskom bazenu će se održati 11. Međunarodni memorijalni plivački miting “Mladost Kup – Branko Mićin”.\\n\\nGOB u subotu, 2...",
    "content": "U subotu, 26.02.2022., na Gradskom olimpijskom bazenu će se održati 11. Međunarodni memorijalni plivački miting “Mladost Kup – Branko Mićin”.\\n\\nGOB u subotu, 26.02.2022., neće raditi za građanstvo/rekreativce."
  },
  {
    "id": 18,
    "slug": "%d1%80%d0%b0%d1%87%d1%83%d0%bd%d0%b8-%d1%98%d0%bf-aquana-%d0%b7%d0%b0-%d0%bf%d0%b5%d1%80%d0%b8%d0%be%d0%b4-27-01-31-01-2022",
    "title": "Рачуни ЈП “Aquana” за период 27.01.-31.01.2022.",
    "date": "18.02.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 19,
    "slug": "racuni-jp-aquana-za-period-27-01-31-01-2022",
    "title": "Računi JP “Aquana” za period 27.01.-31.01.2022.",
    "date": "18.02.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 20,
    "slug": "%d0%be%d0%b4%d0%bb%d1%83%d0%ba%d0%b0-%d0%be-%d0%b4%d0%be%d0%b4%d1%98%d0%b5%d0%bb%d0%b8-%d1%83-%d0%b7%d0%b0%d0%ba%d1%83%d0%bf-%d0%bf%d0%be%d1%81%d0%bb%d0%be%d0%b2%d0%bd%d0%be%d0%b3-%d0%bf%d1%80%d0%be",
    "title": "Одлука о додјели у закуп пословног простора – Кафе “Оаза”",
    "date": "15.02.2022.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 21,
    "slug": "odluka-o-dodjeli-u-zakup-poslovnog-prostora-kafe-oaza",
    "title": "Odluka o dodjeli u zakup poslovnog prostora – Kafe “Oaza”",
    "date": "15.02.2022.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 22,
    "slug": "%d0%b2%d0%b0%d1%82%d0%b5%d1%80%d0%bf%d0%be%d0%bb%d0%be-%d1%83%d1%82%d0%b0%d0%ba%d0%bc%d0%b8%d1%86%d0%b0-%d0%b2%d0%ba-%d0%b1%d0%b0%d1%9a%d0%b0%d0%bb%d1%83%d0%ba%d0%b0-%d0%b2%d0%ba-%d1%81",
    "title": "Ватерполо утакмица ВК Бањалука – ВК Спартак Суботица, ГОБ 12.02.2022.",
    "date": "10.02.2022.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "У суботу, 12.02.2022., са почетком од 19:30 сати, на Градском олимпијском базену ће се одржати ватерполо утакмица између ВК Бањалука и ВК Спартака из Суботице.\\...",
    "content": "У суботу, 12.02.2022., са почетком од 19:30 сати, на Градском олимпијском базену ће се одржати ватерполо утакмица између ВК Бањалука и ВК Спартака из Суботице.\\n\\nГОБ у суботу, 12.02.2022., за грађанство/рекреативце ради до 18 сати."
  },
  {
    "id": 23,
    "slug": "vaterpolo-utakmica-vk-banjaluka-vk-spartak-subotica-gob-12-02-2022",
    "title": "Vaterpolo utakmica VK Banjaluka – VK Spartak Subotica, GOB 12.02.2022.",
    "date": "10.02.2022.",
    "category": "Sport i takmičenja",
    "image": "/images/GOB.jpg",
    "excerpt": "U subotu, 12.02.2022., sa početkom od 19:30 sati, na Gradskom olimpijskom bazenu će se održati vaterpolo utakmica između VK Banjaluka i VK Spartaka iz Subotice....",
    "content": "U subotu, 12.02.2022., sa početkom od 19:30 sati, na Gradskom olimpijskom bazenu će se održati vaterpolo utakmica između VK Banjaluka i VK Spartaka iz Subotice.\\n\\nGOB u subotu, 12.02.2022., za građanstvo/rekreativce radi do 18 sati."
  },
  {
    "id": 24,
    "slug": "%d1%80%d0%b0%d1%87%d1%83%d0%bd%d0%b8-%d1%98%d0%bf-aquana-%d0%b7%d0%b0-%d0%bf%d0%b5%d1%80%d0%b8%d0%be%d0%b4-01-12-31-12-2021",
    "title": "Рачуни ЈП “Aquana” за период 01.12.-31.12.2021.",
    "date": "27.01.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 25,
    "slug": "racuni-jp-aquana-za-period-01-12-31-12-2021",
    "title": "Računi JP “Aquana” za period 01.12.-31.12.2021.",
    "date": "27.01.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 26,
    "slug": "%d1%98%d0%b0%d0%b2%d0%bd%d0%b8-%d0%be%d0%b3%d0%bb%d0%b0%d1%81-%d0%b7%d0%b0-%d0%b4%d0%b0%d0%b2%d0%b0%d1%9a%d0%b5-%d1%83-%d0%b7%d0%b0%d0%ba%d1%83%d0%bf-%d0%bf%d0%be%d1%81%d0%bb%d0%be%d0%b2%d0%bd%d0%be",
    "title": "Јавни оглас за давање у закуп пословног простора – “Оаза” у Воденом парку Aquana",
    "date": "26.01.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 27,
    "slug": "javni-oglas-za-davanje-u-zakup-poslovnog-prostora-oaza-u-vodenom-parku-aquana",
    "title": "Javni oglas za davanje u zakup poslovnog prostora – “Oaza” u Vodenom parku Aquana",
    "date": "26.01.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 28,
    "slug": "%d0%ba%d0%be%d0%bd%d0%ba%d1%83%d1%80%d1%81-%d0%b7%d0%b0-%d0%bf%d0%be%d0%bf%d1%83%d0%bd%d1%83-%d1%83%d0%bf%d1%80%d0%b0%d0%b6%d1%9a%d0%b5%d0%bd%d0%be%d0%b3-%d1%80%d0%b0%d0%b4%d0%bd%d0%be%d0%b3-%d0%bc",
    "title": "Конкурс за попуну упражњеног радног мјеста у ЈП “Aquana”",
    "date": "04.01.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 29,
    "slug": "konkurs-za-popunu-upraznjenog-radnog-mjesta-u-jp-aquana",
    "title": "Konkurs za popunu upražnjenog radnog mjesta u JP “Aquana”",
    "date": "04.01.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 30,
    "slug": "%d0%b4%d0%be%d0%b4%d1%98%d0%b5%d0%bb%d0%b0-%d0%b4%d0%b8%d0%bf%d0%bb%d0%be%d0%bc%d0%b0-%d0%b7%d0%b0-%d0%bf%d0%be%d0%bb%d0%b0%d0%b7%d0%bd%d0%b8%d0%ba%d0%b5-%d0%b1%d0%b5%d1%81%d0%bf%d0%bb%d0%b0",
    "title": "Додјела диплома за полазнике “Бесплатне обуке за непливаче” (фото)",
    "date": "30.12.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "На Градском олимпијском базену је у сриједу, 29.12.2021., одржана манифестација свечане додјеле диплома за све полазнике “Бесплатне обуке непливача”, за ученике...",
    "content": "На Градском олимпијском базену је у сриједу, 29.12.2021., одржана манифестација свечане додјеле диплома за све полазнике “Бесплатне обуке непливача”, за ученике бањалучких основних школа. Овим пројектом је у 2021. обухваћено 300 малишана, који су успјешно завршили обуку те обогатили наш град за 300 нових младих пливача. Пројекат „Бесплатне обуке за непливаче“ је реализован у сарадњи ЈП Aquana и Града Бањалука. Обука је била бесплатна за све полазнике а средства за обуку је обезбиједио Град Бањалука.\\n\\nСвечаној додјели је присуствовао и Градоначелник Бањалуке, Господин Драшко Станивуковић који је свим полазницима уручио дипломе. Бањалучки основци су уживали у прелијепом амбијенту на Градском олимпијском базену и након додјеле диплома, уз надзор тренера/инструктора пливања одржан је и весели тренинг.\\n\\n \\n \\n"
  },
  {
    "id": 31,
    "slug": "dodjela-diploma-za-polaznike-besplatne-obuke-za-neplivace-foto",
    "title": "Dodjela diploma za polaznike “Besplatne obuke za neplivače” (foto)",
    "date": "30.12.2021.",
    "category": "Događaji",
    "image": "/images/ACO_1870-1.jpg",
    "excerpt": "Na Gradskom olimpijskom bazenu je u srijedu, 29.12.2021., održana manifestacija svečane dodjele diploma za sve polaznike “Besplatne obuke neplivača”, za učenike...",
    "content": "Na Gradskom olimpijskom bazenu je u srijedu, 29.12.2021., održana manifestacija svečane dodjele diploma za sve polaznike “Besplatne obuke neplivača”, za učenike banjalučkih osnovnih škola. Ovim projektom je u 2021. obuhvaćeno 300 mališana, koji su uspješno završili obuku te obogatili naš grad za 300 novih mladih plivača. Projekat „Besplatne obuke za neplivače“ je realizovan u saradnji JP Aquana i Grada Banjaluka. Obuka je bila besplatna za sve polaznike a sredstva za obuku je obezbijedio Grad Banjaluka.\\n\\nSvečanoj dodjeli je prisustvovao i Gradonačelnik Banjaluke, Gospodin Draško Stanivuković koji je svim polaznicima uručio diplome. Banjalučki osnovci su uživali u prelijepom ambijentu na Gradskom olimpijskom bazenu i nakon dodjele diploma, uz nadzor trenera/instruktora plivanja održan je i veseli trening.\\n\\n"
  },
  {
    "id": 32,
    "slug": "%d1%81%d1%80%d0%b5%d1%9b%d0%bd%d0%b5-%d0%bd%d0%be%d0%b2%d0%be%d0%b3%d0%be%d0%b4%d0%b8%d1%88%d1%9a%d0%b5-%d0%b8-%d0%b1%d0%be%d0%b6%d0%b8%d1%9b%d0%bd%d0%b5-%d0%bf%d1%80%d0%b0%d0%b7%d0%bd%d0%b8%d0%ba",
    "title": "Срећне новогодишње и Божићне празнике жели вам ЈП Aquana!!!",
    "date": "29.12.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Свим нашим корисницима услуга, пословним партнерима и суграђанима, срећне предстојеће, новогодишње и Божићне празнике жели ЈП Aquana.",
    "content": "Свим нашим корисницима услуга, пословним партнерима и суграђанима, срећне предстојеће, новогодишње и Божићне празнике жели ЈП Aquana."
  },
  {
    "id": 33,
    "slug": "srecne-novogodisnje-i-bozicne-praznike-zeli-vam-jp-aquana",
    "title": "Srećne novogodišnje i Božićne praznike želi vam JP Aquana!!!",
    "date": "29.12.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Svim našim korisnicima usluga, poslovnim partnerima i sugrađanima, srećne predstojeće, novogodišnje i Božićne praznike želi JP Aquana.\\n\\n&nbsp;",
    "content": "Svim našim korisnicima usluga, poslovnim partnerima i sugrađanima, srećne predstojeće, novogodišnje i Božićne praznike želi JP Aquana.\\n\\n&nbsp;"
  },
  {
    "id": 34,
    "slug": "%d0%bd%d0%b5%d1%80%d0%b0%d0%b4%d0%bd%d0%b8-%d0%b4%d0%b0%d0%bd%d0%b8-%d0%bd%d0%b0-%d0%b3%d0%be%d0%b1-%d1%83-%d0%b7%d0%b0-%d0%bd%d0%be%d0%b2%d0%be%d0%b3%d0%be%d0%b4%d0%b8%d1%88%d1%9a%d0%b5-%d0%b8",
    "title": "Нерадни дани на ГОБ- у за новогодишње и Божићне празнике",
    "date": "29.12.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Обавјештавамо све кориснике услуга да су нерадни дани на ГОБ- у: 01., 02., 03., 06., 07., 09., 10. и 14.01.2022. године.\\n\\nРадно вријеме 31.12.2021., за грађан...",
    "content": "Обавјештавамо све кориснике услуга да су нерадни дани на ГОБ- у: 01., 02., 03., 06., 07., 09., 10. и 14.01.2022. године.\\n\\nРадно вријеме 31.12.2021., за грађанство, је до 16 сати."
  },
  {
    "id": 35,
    "slug": "neradni-dani-na-gob-u-za-novogodisnje-i-bozicne-praznike",
    "title": "Neradni dani na GOB- u za novogodišnje i Božićne praznike",
    "date": "29.12.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Obavještavamo sve korisnike usluga da su neradni dani na GOB- u: 01., 02., 03., 06., 07., 09., 10. i 14.01.2022. godine.\\n\\nRadno vrijeme 31.12.2021., za građan...",
    "content": "Obavještavamo sve korisnike usluga da su neradni dani na GOB- u: 01., 02., 03., 06., 07., 09., 10. i 14.01.2022. godine.\\n\\nRadno vrijeme 31.12.2021., za građanstvo, je do 16 sati."
  },
  {
    "id": 36,
    "slug": "%d0%b2%d0%b0%d1%82%d0%b5%d1%80%d0%bf%d0%be%d0%bb%d0%be-%d0%ba%d1%83%d0%bf-%d0%b1%d0%b8%d1%85-%d1%83%d1%82%d0%b0%d0%ba%d0%bc%d0%b8%d1%86%d0%b0-%d0%b2%d0%ba-%d0%b1%d0%b0%d1%9a%d0%b0%d0%bb%d1%83%d0%ba",
    "title": "Ватерполо куп БиХ, утакмица ВК Бањалука – ВК Invictus",
    "date": "24.12.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "\\n \\n\\nУ недељу, 26.12.2021. са почетком од 18 сати, на ГОБ- у ће се одиграти ватерполо утакмица Купа БиХ између ВК Бањалука и ВК Invictus Сарајево.\\n\\nГОБ ће у...",
    "content": "\\n \\n\\nУ недељу, 26.12.2021. са почетком од 18 сати, на ГОБ- у ће се одиграти ватерполо утакмица Купа БиХ између ВК Бањалука и ВК Invictus Сарајево.\\n\\nГОБ ће у недељу, 26.12.2021. бити на располагању за грађанство/рекреативце до 16 сати.\\n\\n \\n \\n \\n \\n \\n \\n"
  },
  {
    "id": 37,
    "slug": "vaterpolo-kup-bih-utakmica-vk-banjaluka-vk-invictus",
    "title": "Vaterpolo kup BiH, utakmica VK Banjaluka – VK Invictus",
    "date": "24.12.2021.",
    "category": "Sport i takmičenja",
    "image": "/images/GOB.jpg",
    "excerpt": "U nedelju, 26.12.2021. sa početkom od 18 sati, na GOB- u će se odigrati vaterpolo utakmica Kupa BiH između VK Banjaluka i VK Invictus Sarajevo.\\n\\nGOB će u nede...",
    "content": "U nedelju, 26.12.2021. sa početkom od 18 sati, na GOB- u će se odigrati vaterpolo utakmica Kupa BiH između VK Banjaluka i VK Invictus Sarajevo.\\n\\nGOB će u nedelju, 26.12.2021. biti na raspolaganju za građanstvo/rekreativce do 16 sati.\\n\\n&nbsp;"
  },
  {
    "id": 38,
    "slug": "%d0%bc%d0%b5%d1%92%d1%83%d0%bd%d0%b0%d1%80%d0%be%d0%b4%d0%bd%d0%b8-%d0%bd%d0%be%d0%b2%d0%be%d0%b3%d0%be%d0%b4%d0%b8%d1%88%d1%9a%d0%b8-%d0%bf%d0%bb%d0%b8%d0%b2%d0%b0%d1%87%d0%ba%d0%b8-%d0%bc%d0%b8",
    "title": "Међународни новогодишњи пливачки митинг на ГОБ- у у суботу, 25.12.2021.",
    "date": "24.12.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "На Градском олимпијском базену у Бањалуци ће се, 25.12.2021., одржати Међународни новогодишњи пливачки митинг, у организацији Пливачког клуба “Aqua Star”.\\n\\nГО...",
    "content": "На Градском олимпијском базену у Бањалуци ће се, 25.12.2021., одржати Међународни новогодишњи пливачки митинг, у организацији Пливачког клуба “Aqua Star”.\\n\\nГОБ неће радити за рекреативце (грађанство) 25.12.2021."
  },
  {
    "id": 39,
    "slug": "medjunarodni-novogodisnji-plivacki-miting-na-gob-u-u-subotu-25-12-2021",
    "title": "Međunarodni novogodišnji plivački miting na GOB- u u subotu, 25.12.2021.",
    "date": "24.12.2021.",
    "category": "Sport i takmičenja",
    "image": "/images/ACO_1870-1.jpg",
    "excerpt": "Na Gradskom olimpijskom bazenu u Banjaluci će se, 25.12.2021., održati Međunarodni novogodišnji plivački miting, u organizaciji Plivačkog kluba “Aqua Star”.\\n\\n...",
    "content": "Na Gradskom olimpijskom bazenu u Banjaluci će se, 25.12.2021., održati Međunarodni novogodišnji plivački miting, u organizaciji Plivačkog kluba “Aqua Star”.\\n\\nGOB neće raditi za rekreativce (građanstvo) 25.12.2021."
  },
  {
    "id": 40,
    "slug": "%d0%b2%d0%b0%d1%82%d0%b5%d1%80%d0%bf%d0%be%d0%bb%d0%be-%d1%83%d1%82%d0%b0%d0%ba%d0%bc%d0%b8%d1%86%d0%b0-%d0%b2%d0%ba-%d0%b1%d0%b0%d1%9a%d0%b0%d0%bb%d1%83%d0%ba%d0%b0-%d0%b2%d0%ba-%d0%ba%d0%be%d1%88",
    "title": "Ватерполо утакмица ВК Бањалука-ВК Кошутњак и пионирско ватерполо Првенство БиХ на Гоб- у",
    "date": "10.12.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "У недељу, 12.12.2021. са почетком од 13 сати, на ГОБ- у ће се одиграти ватерполо утакмица Прве Б лиге Србије између ВК Бањалука и ВК Кошутњак.\\n\\nУ суботу и нед...",
    "content": "У недељу, 12.12.2021. са почетком од 13 сати, на ГОБ- у ће се одиграти ватерполо утакмица Прве Б лиге Србије између ВК Бањалука и ВК Кошутњак.\\n\\nУ суботу и недељу (11. и 12.12.2021.) на Градском олимпијском базену ће се одржати пионирско ватерполо Првенство БиХ.\\n\\nГОБ ће у суботу, 11.12.2021. бити на располагању за грађанство/рекреативце до 17 сати. У недељу, 12.12.2021. ГОБ неће радити за рекреативце."
  },
  {
    "id": 41,
    "slug": "vaterpolo-utakmica-vk-banjaluka-vk-kosutnjak-i-pionirsko-vaterpolo-prvenstvo-bih-na-gob-u",
    "title": "Vaterpolo utakmica VK Banjaluka-VK Košutnjak i pionirsko vaterpolo Prvenstvo BiH na Gob- u",
    "date": "10.12.2021.",
    "category": "Sport i takmičenja",
    "image": "/images/GOB.jpg",
    "excerpt": "U nedelju, 12.12.2021. sa početkom od 13 sati, na GOB- u će se odigrati vaterpolo utakmica Prve B lige Srbije između VK Banjaluka i VK Košutnjak.\\n\\nU subotu i ...",
    "content": "U nedelju, 12.12.2021. sa početkom od 13 sati, na GOB- u će se odigrati vaterpolo utakmica Prve B lige Srbije između VK Banjaluka i VK Košutnjak.\\n\\nU subotu i nedelju (11. i 12.12.2021.) na Gradskom olimpijskom bazenu će se održati pionirsko vaterpolo Prvenstvo BiH.\\n\\nGOB će u subotu, 11.12.2021. biti na raspolaganju za građanstvo/rekreativce do 17 sati. U nedelju, 12.12.2021. GOB neće raditi za rekreativce."
  },
  {
    "id": 42,
    "slug": "poziv-za-nabavku-advokatskih-usluga",
    "title": "Poziv za nabavku advokatskih usluga",
    "date": "03.09.2020.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 43,
    "slug": "%d0%bf%d0%be%d0%b7%d0%b8%d0%b2-%d0%b7%d0%b0-%d0%bd%d0%b0%d0%b1%d0%b0%d0%b2%d0%ba%d1%83-%d0%b0%d0%b4%d0%b2%d0%be%d0%ba%d0%b0%d1%82%d1%81%d0%ba%d0%b8%d1%85-%d1%83%d1%81%d0%bb%d1%83%d0%b3%d0%b0",
    "title": "Позив за набавку адвокатских услуга",
    "date": "03.09.2020.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 44,
    "slug": "testiranje-radnika-jp-aquana-na-prisustvo-alkohola-u-organizmu",
    "title": "Testiranje radnika JP “Aquana” na prisustvo alkohola u organizmu",
    "date": "17.03.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "16.03.2022. radnici JP “Aquana” su testirani, u toku radnog vremena, na prisustvo alkohola u organizmu. Testiranje je vršeno pomoću uređaja za mjerenje alkohola...",
    "content": "16.03.2022. radnici JP “Aquana” su testirani, u toku radnog vremena, na prisustvo alkohola u organizmu. Testiranje je vršeno pomoću uređaja za mjerenje alkohola u organizmu Drager Alcotest 6820. Testirano je 30 radnika i jedan radnik je bio pozitivan, sa rezultatom 0.79 promila. Protiv istog će se preduzeti disciplinske mjere u skladu sa zakonom."
  },
  {
    "id": 45,
    "slug": "%d1%82%d0%b5%d1%81%d1%82%d0%b8%d1%80%d0%b0%d1%9a%d0%b5-%d1%80%d0%b0%d0%b4%d0%bd%d0%b8%d0%ba%d0%b0-%d1%98%d0%bf-aquana-%d0%bd%d0%b0-%d0%bf%d1%80%d0%b8%d1%81%d1%83%d1%81%d1%82%d0%b2",
    "title": "Тестирање радника ЈП “Aquana” на присуство алкохола у организму",
    "date": "17.03.2022.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "16.03.2022. радници ЈП “Aquana” су тестирани, у току радног времена, на присуство алкохола у организму. Тестирање је вршено помоћу уређаја за мјерење алкохола у...",
    "content": "16.03.2022. радници ЈП “Aquana” су тестирани, у току радног времена, на присуство алкохола у организму. Тестирање је вршено помоћу уређаја за мјерење алкохола у организму Drager Alcotest 6820. Тестирано је 30 радника и један радник је био позитиван, са резултатом 0.79 промила. Против истог ће се предузети дисциплинске мјере у складу са законом."
  },
  {
    "id": 46,
    "slug": "spisak-zaposlenih-u-jp-aquana-01-11-2021",
    "title": "Spisak zaposlenih u JP “Aquana”, 01.11.2021.",
    "date": "17.11.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 47,
    "slug": "%d1%81%d0%bf%d0%b8%d1%81%d0%b0%d0%ba-%d0%b7%d0%b0%d0%bf%d0%be%d1%81%d0%bb%d0%b5%d0%bd%d0%b8%d1%85-%d1%83-%d1%98%d0%bf-aquana-01-11-2021",
    "title": "Списак запослених у ЈП “Aquana”, 01.11.2021.",
    "date": "17.11.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 48,
    "slug": "zakon-o-zastiti-od-uznemiravanja-na-radu",
    "title": "ZAKON O ZAŠTITI OD UZNEMIRAVANJA NA RADU",
    "date": "05.11.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 49,
    "slug": "%d0%b7%d0%b0%d0%ba%d0%be%d0%bd-%d0%be-%d0%b7%d0%b0%d1%88%d1%82%d0%b8%d1%82%d0%b8-%d0%be%d0%b4-%d1%83%d0%b7%d0%bd%d0%b5%d0%bc%d0%b8%d1%80%d0%b0%d0%b2%d0%b0%d1%9a%d0%b0-%d0%bd%d0%b0-%d1%80%d0%b0%d0%b4",
    "title": "ЗАКОН О ЗАШТИТИ ОД УЗНЕМИРАВАЊА НА РАДУ",
    "date": "05.11.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 50,
    "slug": "broj-zaposlenih-u-aquani",
    "title": "Broj zaposlenih u “Aquani”",
    "date": "27.10.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "JP „Aquana“ trenutno ima manji broj zaposlenih u odnosu na period prethodnog rukovodstva ovog preduzeća.\\n\\nZa vrijeme prethodnog rukovodstva ovo preduzeće imal...",
    "content": "JP „Aquana“ trenutno ima manji broj zaposlenih u odnosu na period prethodnog rukovodstva ovog preduzeća.\\n\\nZa vrijeme prethodnog rukovodstva ovo preduzeće imalo je 64 zaposlena radnika, dok je u „Aquani“ trenutno zaposleno 59 lica, od kojih 55 ugovorom na neodređeno vrijeme, dok su četiri radnika zaposlena na određeno.\\n\\nZa vrijeme trajanja sezone JP „Aquana“ angažovala je 16 sezonskih radnika.\\n\\nOd početka ove godine 16 radnika je okončalo radni odnos po različitim osnovama, a u radni odnos primljeno je 10 novih radnika, što pokazuje da je u ovom gradskom preduzeću postotak zaposlenih manji za deset odsto u odnosu na ranije period."
  },
  {
    "id": 51,
    "slug": "%d0%b1%d1%80%d0%be%d1%98-%d0%b7%d0%b0%d0%bf%d0%be%d1%81%d0%bb%d0%b5%d0%bd%d0%b8%d1%85-%d1%83-aquani",
    "title": "Број запослених у “Aquani”",
    "date": "27.10.2021.",
    "category": "Događaji",
    "image": "/images/GOB.jpg",
    "excerpt": "ЈП „Aquana“ тренутно има мањи број запослених у односу на период претходног руководства овог предузећа.\\n\\nЗа вријеме претходног руководства ово предузеће имало...",
    "content": "ЈП „Aquana“ тренутно има мањи број запослених у односу на период претходног руководства овог предузећа.\\n\\nЗа вријеме претходног руководства ово предузеће имало је 64 запослена радника, док је у „Aquani“ тренутно запослено 59 лица, од којих 55 уговором на неодређено вријеме, док су четири радника запослена на одређено.\\n\\nЗа вријеме трајања сезоне ЈП „Aquana“ ангажовала је 16 сезонских радника.\\n\\nОд почетка ове године 16 радника је окончало радни однос по различитим основама, а у радни однос примљено је 10 нових радника, што показује да је у овом градском предузећу постотак запослених мањи за десет одсто у односу на раније период."
  },
  {
    "id": 52,
    "slug": "spisak-zaposlenih-u-jp-aquana-15-09-2021",
    "title": "Spisak zaposlenih u JP “Aquana”, 15.09.2021.",
    "date": "21.09.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 53,
    "slug": "%d1%81%d0%bf%d0%b8%d1%81%d0%b0%d0%ba-%d0%b7%d0%b0%d0%bf%d0%be%d1%81%d0%bb%d0%b5%d0%bd%d0%b8%d1%85-%d1%83-%d1%98%d0%bf-aquana-15-09-2021",
    "title": "Списак запослених у ЈП “Aquana”, 15.09.2021.",
    "date": "21.09.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 54,
    "slug": "racuni-jp-aquana-za-period-01-08-31-08-2021",
    "title": "Računi JP “Aquana” za period 01.08.-31.08.2021.",
    "date": "08.09.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 55,
    "slug": "%d1%80%d0%b0%d1%87%d1%83%d0%bd%d0%b8-%d1%98%d0%bf-aquana-%d0%b7%d0%b0-%d0%bf%d0%b5%d1%80%d0%b8%d0%be%d0%b4-01-08-31-08-2021",
    "title": "Рачуни ЈП “Aquana” за период 01.08.-31.08.2021.",
    "date": "08.09.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 56,
    "slug": "spisak-zaposlenih-u-jp-aquana-01-09-2021",
    "title": "Spisak zaposlenih u JP “Aquana”, 01.09.2021.",
    "date": "07.09.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 57,
    "slug": "%d1%81%d0%bf%d0%b8%d1%81%d0%b0%d0%ba-%d0%b7%d0%b0%d0%bf%d0%be%d1%81%d0%bb%d0%b5%d0%bd%d0%b8%d1%85-%d1%83-%d1%98%d0%bf-aquana-01-09-2021",
    "title": "Списак запослених у ЈП “Aquana”, 01.09.2021.",
    "date": "07.09.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 58,
    "slug": "spisak-zaposlenih-u-jp-aquana-10-07-2021",
    "title": "Spisak zaposlenih u JP “Aquana”, 10.07.2021.",
    "date": "22.07.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  },
  {
    "id": 59,
    "slug": "%d1%81%d0%bf%d0%b8%d1%81%d0%b0%d0%ba-%d0%b7%d0%b0%d0%bf%d0%be%d1%81%d0%bb%d0%b5%d0%bd%d0%b8%d1%85-%d1%83-%d1%98%d0%bf-aquana-10-07-2021",
    "title": "Списак запослених у ЈП “Aquana”, 10.07.2021.",
    "date": "22.07.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n",
    "content": "Кликом на линк преузећете скениран званични документ у PDF формату.\\n\\n"
  },
  {
    "id": 60,
    "slug": "racuni-jp-aquana-za-period-15-05-08-06-2021",
    "title": "Računi JP “Aquana” za period 15.05.-08.06.2021.",
    "date": "05.07.2021.",
    "category": "Vodeni park",
    "image": "/images/vodeni-park.jpg",
    "excerpt": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n",
    "content": "Klikom na link preuzećete skeniran zvanični dokument u PDF formatu.\\n\\n"
  }
];
