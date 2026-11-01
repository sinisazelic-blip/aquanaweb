export interface TenderItem {
  id: number;
  title: string;
  date: string; // dd.mm.yyyy.
  year: string;
  status: 'Aktivno' | 'Završeno' | 'Poništeno' | 'Dodijeljen ugovor';
  file: string;
}

export const initialTenders: TenderItem[] = [
  {
    "id": 1,
    "title": "Одлука о избору - Набавка хемијских средстава за санитарни третман воде",
    "date": "03.07.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-Набавка-хемијских-средстава-за-санитарни-третман-воде.pdf"
  },
  {
    "id": 2,
    "title": "Набавка хемијских средстава за санитарни третман воде",
    "date": "03.07.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-Набавка-хемијских-средстава-за-санитарни-третман-воде.pdf"
  },
  {
    "id": 3,
    "title": "Odluka o izboru - Nabavka hemijskih sredstava za sanitarni tretman vode",
    "date": "03.07.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-Набавка-хемијских-средстава-за-санитарни-третман-воде-1.pdf"
  },
  {
    "id": 4,
    "title": "Odluka o izboru najpovoljnijeg ponuđača - osiguranje",
    "date": "22.06.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-најповољнијег-понуђача.pdf"
  },
  {
    "id": 5,
    "title": "Одлука о избору најповољнијег понуђача",
    "date": "22.06.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-најповољнијег-понуђача-набавка-лож-уља-за-загријавање-Градског-олимпијског-базена.pdf"
  },
  {
    "id": 6,
    "title": "Одлука о избору најповољнијег понуђача - осигурање",
    "date": "22.06.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-најповољнијег-понуђача.pdf"
  },
  {
    "id": 7,
    "title": "Odluka o dodjeli u zakup prostora - pečeni i kuhani kukuruz i prženi krompir (tornado čips)",
    "date": "27.05.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-пословни-простор-21032025.pdf"
  },
  {
    "id": 8,
    "title": "Odluka o dodjeli u zakup prostora - krofnice (fritule)",
    "date": "27.05.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-пословни-простор-21032025-Copy.pdf"
  },
  {
    "id": 9,
    "title": "Odluka o dodjeli u zakup prostora - Akvarelo",
    "date": "27.05.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-poslovni-prostor-21032025.pdf"
  },
  {
    "id": 10,
    "title": "Odluka o dodjeli u zakup prostora - Nektar bar",
    "date": "27.05.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "javni-oglas-krofnice-2023-1.pdf"
  },
  {
    "id": 11,
    "title": "Odluka o dodjeli u zakup poslovnog prostora – krofnice",
    "date": "18.05.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-hrana-1.pdf"
  },
  {
    "id": 12,
    "title": "Javni oglas za davanje u zakup prostora za pripremu, usluzivanje i prodaju krofnica - fritula",
    "date": "18.05.2026.",
    "year": "2026",
    "status": "Aktivno",
    "file": "Javni-oglas-za-davanje-u-zakup-prostora-za-pripremu-usluzivanje-i-prodaju-krofnica.pdf"
  },
  {
    "id": 13,
    "title": "Javni oglas za davanje u zakup prostora za pripremu, usluzivanje i prodaju krofnica",
    "date": "18.05.2026.",
    "year": "2026",
    "status": "Aktivno",
    "file": "Odluka-o-dodjeli-u-zakup-prostora-Akvarelo.pdf"
  },
  {
    "id": 14,
    "title": "Javni oglas za davanje u zakup prostora za pripremu, usluzivanje i prodaju pečenog i kuhanog kukuruza i prženog krompira (tornado čips)",
    "date": "18.05.2026.",
    "year": "2026",
    "status": "Aktivno",
    "file": "Javni-oglas-za-davanje-u-zakup-prostora-za-pripremu-usluzivanje-i-prodaju-pecenog-i-kuhanog-kukuruza-i-przenog-krompira-tornado-cips.pdf"
  },
  {
    "id": 15,
    "title": "Javni oglas za davanje u zakup prostora-ugostiteljski objekti",
    "date": "18.05.2026.",
    "year": "2026",
    "status": "Aktivno",
    "file": "Javni-oglas-za-davanje-u-zakup-prostora-ugostiteljski-objekti.pdf"
  },
  {
    "id": 16,
    "title": "Odluka o izboru najpovoljnijeg ponuđača i dodjeli okvirog sporazuma u otvorenom postupku javne nabavke \"Nabavka pića za ugostiteljstvo\"",
    "date": "30.04.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudjaca-i-dodjeli-okvirnog-sporazuma-u-otvorenom-postupku-javne-nabavke.pdf"
  },
  {
    "id": 17,
    "title": "Odluka o izboru najpovoljnijeg ponudjaca i dodjeli okvirnog sporazuma u otvorenom postupku javne nabavke",
    "date": "30.04.2026.",
    "year": "2026",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-.pdf"
  },
  {
    "id": 18,
    "title": "Odluka o izboru najpovoljnijeg ponuđača i dodjeli ugovora za JN lož ulja za zagrijavanje GOB-a",
    "date": "31.12.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudjaca-i-dodjeli-ugovora-za-JN-loz-ulja-za-zagrijavanje-GOB-a.pdf"
  },
  {
    "id": 19,
    "title": "Odluka o izboru najpovoljnijeg ponudjaca i dodjeli ugovora za JN loz ulja za zagrijavanje GOB-a",
    "date": "31.12.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Преговарачки-поступак-без-објаве-обавјештења-електрична-енергија.pdf"
  },
  {
    "id": 20,
    "title": "Odluka o izboru najpovoljnijeg ponuđača u konkurentskom zahtjevu JN \"Nabavka materijala za tehničko održavanje\"",
    "date": "30.12.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudjaca-u-konkurentskom-zahtjevu-JN.pdf"
  },
  {
    "id": 21,
    "title": "Odluka o izboru najpovoljnijeg ponudjaca u konkurentskom zahtjevu JN",
    "date": "30.12.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-поништењу-поступка-ЈН-Реконструкција-и-санација-цјелина-2-Дјечије-игралиште.pdf"
  },
  {
    "id": 22,
    "title": "Odluka o izboru najpovoljnijeg ponudjaca u konkurentskom zahtjevu JN \"Nabavka materijala za tehnicko odrzavanje\"",
    "date": "30.12.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudjaca-u-konkurentskom-zahtjevu-JN.pdf"
  },
  {
    "id": 23,
    "title": "Odluka o izboru najpovoljnijeg ponuaca u konkurentskom zahtjevu JN \"Nabavka materijala za tehnicko odrzavanje\"",
    "date": "30.12.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudjaca-u-konkurentskom-zahtjevu-JN.pdf"
  },
  {
    "id": 24,
    "title": "Odluka o poništenju pregovarčkog postupka bez objave obavještenja javne nabavke električne energije",
    "date": "18.12.2025.",
    "year": "2025",
    "status": "Poništeno",
    "file": "Odluka-o-ponistenju-pregovarckog-postupka-bez-objave-obavjestenja-javne-nabavke-Elektricne-energije.pdf"
  },
  {
    "id": 25,
    "title": "Odluka",
    "date": "18.12.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Odluka-Fritule.pdf"
  },
  {
    "id": 26,
    "title": "Одлука о поништењу преговарчког поступка без објаве обавјештења јавне набавке електричне енергије",
    "date": "18.12.2025.",
    "year": "2025",
    "status": "Poništeno",
    "file": "Odluka-o-ponistenju-pregovarckog-postupka-bez-objave-obavjestenja-javne-nabavke-Elektricne-energije-1.pdf"
  },
  {
    "id": 27,
    "title": "Одлука",
    "date": "18.12.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "javni-oglas-sladoled-2023-2.pdf"
  },
  {
    "id": 28,
    "title": "САОПШТЕЊЕ ЗА ЈАВНОСТ",
    "date": "24.09.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Odluka-o-dodjeli-u-zakup-prostora-Nektar-bar.pdf"
  },
  {
    "id": 29,
    "title": "Odluka o poništenju postupka javne nabavke električne energije",
    "date": "17.09.2025.",
    "year": "2025",
    "status": "Poništeno",
    "file": "Odluka-o-ponistenju-postupka-JN-Elektricne-energije.pdf"
  },
  {
    "id": 30,
    "title": "Odluka o poništenju postupka JN Električne energije",
    "date": "17.09.2025.",
    "year": "2025",
    "status": "Poništeno",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudjaca-u-konkurentskom-zahtjevu-JN.pdf"
  },
  {
    "id": 31,
    "title": "Odluka o poništenju postupka jav Električne energije",
    "date": "17.09.2025.",
    "year": "2025",
    "status": "Poništeno",
    "file": "Odluka-o-ponistenju-postupka-JN-Elektricne-energije.pdf"
  },
  {
    "id": 32,
    "title": "SAOPŠTENJE ZA JAVNOST",
    "date": "21.07.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Odluka-o-dodjeli-u-zakup-prostora-tornado-cips.pdf"
  },
  {
    "id": 33,
    "title": "Odluka o izboru najpovoljnijeg ponuđača - sanitarni tretman vode",
    "date": "03.07.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-sanitarni-tretman-vode-2025.pdf"
  },
  {
    "id": 34,
    "title": "Odluka o izboru najpovoljnijeg ponuđača sanitarni tretman vode 2025",
    "date": "03.07.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Oglas-zakup-Akvarelo-Nektar-bar.pdf"
  },
  {
    "id": 35,
    "title": "Odluka o izboru najpovoljnijeg ponuđača- Javna nabavka usluge osiguranja",
    "date": "25.06.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-JN-Osiguranje-2025.pdf"
  },
  {
    "id": 36,
    "title": "Odluka o izboru najpovoljnijeg ponuđača JN Osiguranje 2025",
    "date": "25.06.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Plan-JN-2023-1.pdf"
  },
  {
    "id": 37,
    "title": "Одлука о избору најповољнијег понуђача- Јавна набавка услуге осигурања",
    "date": "25.06.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-JN-Osiguranje-2025.pdf"
  },
  {
    "id": 38,
    "title": "Odluka o dodjeli u zakup poslovnog prostora - krofnice",
    "date": "13.06.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-dodjeli-u-zakup-poslovnog-prostora-krofnice.pdf"
  },
  {
    "id": 39,
    "title": "Odluka o dodjeli u zakup prostora - tornado čips",
    "date": "13.06.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-dodjeli-u-zakup-prostora-tornado-cips.pdf"
  },
  {
    "id": 40,
    "title": "Odluka o dodjeli u zakup poslovnog prostora - Nektar bar i Akvarelo",
    "date": "13.06.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-dodjeli-u-zakup-poslovnog-prostora-Nektar-bar-i-Akvarelo.pdf"
  },
  {
    "id": 41,
    "title": "Javni oglas - zakup Nektar bar i Akvarelo",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Javni-oglas-Nektar-bar-Akvarelo.pdf"
  },
  {
    "id": 42,
    "title": "Javni oglas - Nektar bar Akvarelo",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Odluka-o-ponistenju-pregovarckog-postupka-bez-objave-obavjestenja-javne-nabavke-Elektricne-energije.pdf"
  },
  {
    "id": 43,
    "title": "Javni oglas - fritula",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Javni-oglas-fritule.pdf"
  },
  {
    "id": 44,
    "title": "Javni oglas - fritule",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Oglas-davanje-u-zakup-Oaza-mart-2025-1.pdf"
  },
  {
    "id": 45,
    "title": "Javni oglas - tornado čips",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Javni-oglas-Tornado-cips.pdf"
  },
  {
    "id": 46,
    "title": "Javni oglas - Tornado čips",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Javni-oglas-Tornado-cips.pdf"
  },
  {
    "id": 47,
    "title": "Јавни оглас - закуп Нектар бар и Акварело",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Javni-oglas-Nektar-bar-Akvarelo.pdf"
  },
  {
    "id": 48,
    "title": "Јавни оглас - фритула",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Javni-oglas-fritule.pdf"
  },
  {
    "id": 49,
    "title": "Јавни оглас - торнадо чипс",
    "date": "06.06.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Javni-oglas-Tornado-cips.pdf"
  },
  {
    "id": 50,
    "title": "Obavještenje za javnost!!!",
    "date": "28.05.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudjaca-i-dodjeli-okvirnog-sporazuma-u-otvorenom-postupku-javne-nabavke.pdf"
  },
  {
    "id": 51,
    "title": "Обавјештење за јавност!!!",
    "date": "28.05.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-u-postupku-javna-nabavke-radova-Idejni-projekat-za-uredenje-dijela-kompleksa-AQUANE-cjelina-3.3-Sanacija-terena.pdf"
  },
  {
    "id": 52,
    "title": "Odluka o izboru najpovoljnijeg ponuđača - Nabavka pića za ugostiteljsto",
    "date": "05.05.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-nabavka-pica-za-ugostieljstvo.pdf"
  },
  {
    "id": 53,
    "title": "Odluka o izboru najpovoljnijeg ponuđača - nabavka pića za ugostieljstvo",
    "date": "05.05.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-dodjeli-u-zakup-poslovnog-prostora-–-krofnice.pdf"
  },
  {
    "id": 54,
    "title": "Одлука о избору најповољнијег понуђача - Набавка пића за угоститељсто",
    "date": "05.05.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-најповољнијег-понуђача-набавка-пића-за-угоститељство.pdf"
  },
  {
    "id": 55,
    "title": "Одлука о избору најповољнијег понуђача - набавка пића за угоститељство",
    "date": "05.05.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-најповољнијег-понуђача.pdf"
  },
  {
    "id": 56,
    "title": "Odluka o izboru najpovoljnijeg ponuđača - Nabavka lož ulja za zagrijavanje Gradskog olimpijskog bazena",
    "date": "05.05.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-nabavka-loz-ulja-za-zagrijavanje-Gradskog-olimpijskog-bazena.pdf"
  },
  {
    "id": 57,
    "title": "Odluka o izboru najpovoljnijeg ponuđača - nabavka lož ulja za zagrijavanje Gradskog olimpijskog bazena",
    "date": "05.05.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Oglas-davanje-u-zakup-Oaza-mart-2025.pdf"
  },
  {
    "id": 58,
    "title": "Одлука о избору најповољнијег понуђача - Набавка лож уља за загријавање Градског олимпијског базена",
    "date": "05.05.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-најповољнијег-понуђача-набавка-лож-уља-за-загријавање-Градског-олимпијског-базена.pdf"
  },
  {
    "id": 59,
    "title": "Одлука о избору најповољнијег понуђача - набавка лож уља за загријавање Градског олимпијског базена",
    "date": "05.05.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-dodjeli-u-zakup-prostora-peceni-i-kuhani-kukuruz-i-przeni-krompir-tornado-cips.pdf"
  },
  {
    "id": 60,
    "title": "Odluka o dodjeli u zakup poslovnog prostora",
    "date": "21.03.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-hrana.pdf"
  },
  {
    "id": 61,
    "title": "Odluka poslovni prostor 21032025",
    "date": "21.03.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "DOC200225-20022025084620.pdf"
  },
  {
    "id": 62,
    "title": "Одлука о додјели у закуп пословног простора",
    "date": "21.03.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Fritule-3.pdf"
  },
  {
    "id": 63,
    "title": "Одлука пословни простор 21032025 - Copy",
    "date": "21.03.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Fritule-2.pdf"
  },
  {
    "id": 64,
    "title": "Одлука пословни простор 21032025",
    "date": "21.03.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Одлука-о-избору-Набавка-хемијских-средстава-за-санитарни-третман-воде.pdf"
  },
  {
    "id": 65,
    "title": "ЈАВНИ ОГЛАС за давање у закуп пословног простора",
    "date": "07.03.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Oglas-davanje-u-zakup-Oaza-mart-2025.pdf"
  },
  {
    "id": 66,
    "title": "Oglas- davanje u zakup Oaza, mart 2025",
    "date": "07.03.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Javni-oglas-Tornado.pdf"
  },
  {
    "id": 67,
    "title": "JAVNI OGLAS za davanje u zakup poslovnog prostora",
    "date": "07.03.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Oglas-davanje-u-zakup-Oaza-mart-2025.pdf"
  },
  {
    "id": 68,
    "title": "Одлука-о-избору-најповољнијег-понуђача-у-конкурентском-захтјеву-за-набавку-Материјала-за-техничко-одржавање",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-radovi-CJELINA-1.pdf"
  },
  {
    "id": 69,
    "title": "Одлука о избору најповољнијег понуђача у конкурентском захтјеву јавне набавке \"Набавка материјала за техничко одржавање\"",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-најповољнијег-понуђача-у-конкурентском-захтјеву-за-набавку-Материјала-за-техничко-одржавање.pdf"
  },
  {
    "id": 70,
    "title": "Odluka-o-izboru-najpovoljnijeg-ponudaca-cjelina-4.-1",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Javni-oglas-Nektar-bar-Akvarelo.pdf"
  },
  {
    "id": 71,
    "title": "Идејни пројекат за уређење дијела комплекса \"AQUANE\" цјелина 4.1. - Теретана",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-cjelina-4.-1.pdf"
  },
  {
    "id": 72,
    "title": "Odluka-o-izboru-najpovoljnijeg-ponudaca-cjelina-4.2",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-dodjeli-u-zakup-poslovnog-prostora-krofnice.pdf"
  },
  {
    "id": 73,
    "title": "Идејни пројекат за уређење дијела комплекса \"AQUANE\" цјелина 4.2. - Партерно уређење теретане",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-cjelina-4.2.pdf"
  },
  {
    "id": 74,
    "title": "Одлука-о-избору-најповољнијег-понуђача",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Plan-JN-2023.pdf"
  },
  {
    "id": 75,
    "title": "Идејни пројекат за уређење дијела комплекса \"AQUANЕ\" цјелина 3.1. - Спортски терени",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-најповољнијег-понуђача.pdf"
  },
  {
    "id": 76,
    "title": "Odluka-o-ponistenje-postupaka-cjelina-4.2.-Parterno-uredenje-teretane",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Odluka-o-ponistenju-postupka-cjelina-4.1.-Teretana.pdf"
  },
  {
    "id": 77,
    "title": "Одлука о поништењу поступка цјелина 4.2. - Партерно уређење теретане",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Poništeno",
    "file": "Odluka-o-ponistenje-postupaka-cjelina-4.2.-Parterno-uredenje-teretane.pdf"
  },
  {
    "id": 78,
    "title": "Odluka o poništenje postupka cjelina 4.2. - Parterno uređenje teretane",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Poništeno",
    "file": "Odluka-o-ponistenje-postupaka-cjelina-4.2.-Parterno-uredenje-teretane.pdf"
  },
  {
    "id": 79,
    "title": "Odluka-o-ponistenju-postupka-cjelina-4.1.-Teretana",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Aktivno",
    "file": "Odluka-hrana-1.pdf"
  },
  {
    "id": 80,
    "title": "Одлука о поништењу поступка цјелина 4.1. Теретана",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Poništeno",
    "file": "Odluka-o-ponistenju-postupka-cjelina-4.1.-Teretana.pdf"
  },
  {
    "id": 81,
    "title": "Odluka o izboru najpovoljnijeg ponuđača - Cjelina 3.3 - Sanacija terena",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-u-postupku-javna-nabavke-radova-Idejni-projekat-za-uredenje-dijela-kompleksa-AQUANE-cjelina-3.3-Sanacija-terena.pdf"
  },
  {
    "id": 82,
    "title": "Odluka o izboru najpovoljnijeg ponuđača u postupku javna nabavke radova Idejni projekat za uređenje dijela kompleksa AQUANE cjelina 3.3 - Sanacija terena",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-JN-Osiguranje-2025.pdf"
  },
  {
    "id": 83,
    "title": "Одлука о избору најповољнијег понуђача цјелина 3.3. - Санација Терена",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-u-postupku-javna-nabavke-radova-Idejni-projekat-za-uredenje-dijela-kompleksa-AQUANE-cjelina-3.3-Sanacija-terena.pdf"
  },
  {
    "id": 84,
    "title": "Odluka o izboru najpovoljnijeg ponuđača cjelina 3.3 - Sanacija terena",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Odluka-o-izboru-najpovoljnijeg-ponudaca-u-postupku-javna-nabavke-radova-Idejni-projekat-za-uredenje-dijela-kompleksa-AQUANE-cjelina-3.3-Sanacija-terena.pdf"
  },
  {
    "id": 85,
    "title": "Odluka o izboru najpovoljnijeg ponuđača u otvorenom postupku JN Idejni projekat za uređenje dijela kompleksa \"AQUANE\" cjelina 3.2. - Parterno uređenje terena",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Одлука-о-избору-фаза-3.2.pdf"
  },
  {
    "id": 86,
    "title": "Одлука-о-избору-фаза-3.2",
    "date": "14.02.2025.",
    "year": "2025",
    "status": "Dodijeljen ugovor",
    "file": "Pregovaracki-postupak-bez-objave-obavjestenja-elektricna-energija.pdf"
  }
];
