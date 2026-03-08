import type { Level } from '../types';

export const levels: Level[] = [
  // ── ISO 9001 ─────────────────────────────────────────────────────────────
  {
    id: 'iso9001-1',
    systemId: 'iso9001',
    levelNumber: 1,
    title: 'Pamati',
    topic: 'KVS principi un darbības joma',
    description:
      'Izpēti septiņus kvalitātes vadības principus, kas ir ISO 9001 pamatā, un izproti standarta darbības jomu un mērķi.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-2',
    systemId: 'iso9001',
    levelNumber: 2,
    title: 'Procesu domāšana',
    topic: 'Procesu pieeja un PDCA',
    description:
      'Iedziļinies procesu pieejā un Plāno–Dari–Pārbaudi–Rīkojies ciklā, kas virza nepārtrauktu pilnveidi visā KVS.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-3',
    systemId: 'iso9001',
    levelNumber: 3,
    title: 'Riski un audits',
    topic: 'Riska domāšana un iekšējie auditi',
    description:
      'Uzzini, kā riska domāšana caurvij ISO 9001, un kā iekšējie auditi pārbauda, vai sistēma darbojas pareizi.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-4',
    systemId: 'iso9001',
    levelNumber: 4,
    title: 'Vadība',
    topic: 'Augstākās vadības apņemšanās',
    description:
      'Izproti, kā augstākā vadība demonstrē līderību un apņemšanos KVS un orientācijai uz klientu.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-5',
    systemId: 'iso9001',
    levelNumber: 5,
    title: 'Atbalsts',
    topic: 'Resursi, kompetence un izpratne',
    description:
      'Izpēti atbalsta prasības: cilvēkresursi, infrastruktūra, darba vide, uzraudzības resursi un organizatoriskās zināšanas.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-6',
    systemId: 'iso9001',
    levelNumber: 6,
    title: 'Operācijas',
    topic: 'Operatīvā plānošana un kontrole',
    description:
      'Apgūsti operatīvās klauzulas, kas aptver projektēšanu, iepirkumu, ražošanu un pakalpojumu sniegšanu.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-7',
    systemId: 'iso9001',
    levelNumber: 7,
    title: 'Darbības rezultāti',
    topic: 'Uzraudzība un mērīšana',
    description:
      'Uzzini, kā analizēt darbības datus, lai novērtētu KVS efektivitāti un klientu apmierinātību.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-8',
    systemId: 'iso9001',
    levelNumber: 8,
    title: 'Neatbilstības',
    topic: 'Korektīvā rīcība un neatbilstību ziņojumi',
    description:
      'Izproti, kā rīkoties ar neatbilstībām, veikt cēloņu analīzi un īstenot korektīvo rīcību.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-9',
    systemId: 'iso9001',
    levelNumber: 9,
    title: 'Dokumentācija',
    topic: 'Dokumentētā informācija',
    description:
      'Orientējies dokumentācijas prasībās: kas jādokumentē, jākontrolē un jāglabā.',
    minPassScore: 70,
  },
  {
    id: 'iso9001-10',
    systemId: 'iso9001',
    levelNumber: 10,
    title: 'Sertifikācija',
    topic: 'Sertifikācijas process un vadības pārskats',
    description:
      'Sagatavojies sertifikācijas ceļojumam: vadības pārskats, ārējā audita posmi un sertifikācijas uzturēšana.',
    minPassScore: 70,
  },

  // ── TQM ──────────────────────────────────────────────────────────────────
  {
    id: 'tqm-1',
    systemId: 'tqm',
    levelNumber: 1,
    title: 'TQM Pamati',
    topic: 'Definīcija, vēsture, mērķis un uzdevumi',
    description:
      'Uzzini, ko nozīmē katrs TQM vārds, iepazīsties ar Feigenbaumu un apgūsti TQM trīs galvenos uzdevumus.',
    minPassScore: 70,
  },
  {
    id: 'tqm-2',
    systemId: 'tqm',
    levelNumber: 2,
    title: 'TQM Taktika un Elementi',
    topic: '6 taktiku soļi, metodiskie līdzekļi un 6 TQM elementi',
    description:
      'Izpēti sešas TQM taktikas, metodiskos līdzekļus un sešus elementus, kas veido TQM pamatu.',
    minPassScore: 70,
  },
  {
    id: 'tqm-3',
    systemId: 'tqm',
    levelNumber: 3,
    title: 'Orientācija uz Klientu',
    topic: '1. princips — klientu klasifikācija un datu vākšana',
    description:
      'Izproti iekšējo un ārējo klientu atšķirības, tiešās un netiešās datu vākšanas metodes un "Patērētāju balss" koncepciju.',
    minPassScore: 70,
  },
  {
    id: 'tqm-4',
    systemId: 'tqm',
    levelNumber: 4,
    title: 'Vadības Loma',
    topic: '2. princips — līdera darbības un vides radīšana',
    description:
      'Apgūsti, kā TQM līderim jāveido vienota komanda, skaidra vīzija un uzticības atmosfēra organizācijā.',
    minPassScore: 70,
  },
  {
    id: 'tqm-5',
    systemId: 'tqm',
    levelNumber: 5,
    title: 'Darbinieku Iesaistīšana',
    topic: '3. princips — kvalitātes pulciņi, SINERĢIJA, Demings',
    description:
      'Uzzini, kā pilnīga darbinieku iesaistīšana rada sinerģiju, un kāpēc Demings apgalvo, ka 85% efektivitāti nosaka vide.',
    minPassScore: 72,
  },
  {
    id: 'tqm-6',
    systemId: 'tqm',
    levelNumber: 6,
    title: 'Procesu Pieeja',
    topic: '4. princips — procesa definīcija, veidi un Džurana modelis',
    description:
      'Izproti procesa būtību, trīs procesu veidus, pamata un atbalsta procesus, procesa īpašnieka lomu un Džurana vadības modeli.',
    minPassScore: 75,
  },
  {
    id: 'tqm-7',
    systemId: 'tqm',
    levelNumber: 7,
    title: 'Nepārtraukta Pilnveidošanās',
    topic: '5. princips — Kaizen vs Kairyo, 5×Kāpēc, Masaaki Imai',
    description:
      'Atklāj KAIZEN filozofiju, tās 10 principus, atšķirību no KAIRYO un četrus nepārtrauktas uzlabošanās posmus.',
    minPassScore: 75,
  },
  {
    id: 'tqm-8',
    systemId: 'tqm',
    levelNumber: 8,
    title: 'Personāla un Piegādātāju Iesaiste',
    topic: '6. princips — uzticības cikls un darbinieku pilnvarošana',
    description:
      'Izproti vadītāju-padoto uzticības ciklu, metodes efektīvai darbinieku iesaistīšanai un Deminga citātu par darba vidi.',
    minPassScore: 75,
  },
  {
    id: 'tqm-9',
    systemId: 'tqm',
    levelNumber: 9,
    title: 'Lēmumi un Piegādātāji',
    topic: '7. un 8. princips — fakti, Carrier sistēma, piegādātāju kritēriji',
    description:
      'Apgūsti faktiem balstītus lēmumus (20-90% neveiksmes statistika), Carrier novērtēšanas sistēmu un piegādātāju izvēles 10 kritērijus.',
    minPassScore: 78,
  },
  {
    id: 'tqm-10',
    systemId: 'tqm',
    levelNumber: 10,
    title: 'TQM Integrācija un Ieguvumi',
    topic: 'Visi 8 principi + 7 ieguvumi + ieviešanas sarežģītība',
    description:
      'Apkopo visus 8 TQM principus, izproti 7 ieguvumus un mācies risināt sarežģītus ieviešanas scenārijus.',
    minPassScore: 80,
  },

  // ── 7S sistēma ────────────────────────────────────────────────────────────
  {
    id: '7s-1',
    systemId: '7s',
    levelNumber: 1,
    title: '7S Ievads',
    topic: 'Vēsture, 7 elementi un sistēmas būtība',
    description:
      'Iepazīsties ar 7S sistēmas izcelsmi, uzzini, kā 5S paplašinājās par 7S, un apgūsti visus septiņus elementus.',
    minPassScore: 70,
  },
  {
    id: '7s-2',
    systemId: '7s',
    levelNumber: 2,
    title: 'Šķirot',
    topic: 'Seiri — atlase, sarkanā birka, karantīna',
    description:
      'Apgūsti pirmā S principu: kā atdalīt vajadzīgo no nevajadzīgā, izmantojot sarkanās birkas un karantīnas zonu.',
    minPassScore: 70,
  },
  {
    id: '7s-3',
    systemId: '7s',
    levelNumber: 3,
    title: 'Sakārtot',
    topic: 'Seiton — kārtīgums, 30 sekunžu likums, 4 soļi',
    description:
      'Izproti, kā katram priekšmetam noteikt vietu tā, lai jebko varētu atrast 30 sekundēs, un apgūsti 4 Seiton soļus.',
    minPassScore: 70,
  },
  {
    id: '7s-4',
    systemId: '7s',
    levelNumber: 4,
    title: 'Spodrināt',
    topic: 'Seiso — tīrīšanas principi un pienākumi',
    description:
      'Uzzini, kā Seiso pārveido tīrīšanu no pienākuma par kultūru, kur visi — no direktora līdz strādniekam — uztur tīrību.',
    minPassScore: 70,
  },
  {
    id: '7s-5',
    systemId: '7s',
    levelNumber: 5,
    title: 'Standartizēt',
    topic: 'Seiketsu — vizuālā kontrole, krāsu kodi',
    description:
      'Apgūsti, kā vizuālā kontrole, krāsu kodi un caurspīdīgums padara standartus redzamus un saprotamus ikvienam.',
    minPassScore: 75,
  },
  {
    id: '7s-6',
    systemId: '7s',
    levelNumber: 6,
    title: 'Stiprināt',
    topic: 'Shitsuke — disciplīna un paradumi',
    description:
      'Izproti, kā 7S prasības pārvērst par ikdienas paradumiem un kā vadītāja personīgais piemērs nodrošina ilgtspēju.',
    minPassScore: 75,
  },
  {
    id: '7s-7',
    systemId: '7s',
    levelNumber: 7,
    title: 'Sargāt',
    topic: 'Safety — Poka-yoke, bīstamo zonu marķēšana',
    description:
      'Uzzini, kā drošība integrējas 7S sistēmā: Poka-yoke metodes, bīstamo zonu vizuālie signāli un regulāras pārbaudes.',
    minPassScore: 75,
  },
  {
    id: '7s-8',
    systemId: '7s',
    levelNumber: 8,
    title: 'Komandas gars',
    topic: 'Spirit — darbinieku iesaiste, kultūra',
    description:
      'Apgūsti septīto elementu: kā brīvprātīga darbinieku iesaiste un darba grupu principi veido ilgtspējīgu 7S kultūru.',
    minPassScore: 75,
  },
  {
    id: '7s-9',
    systemId: '7s',
    levelNumber: 9,
    title: '7S Rīki',
    topic: 'Spageti diagramma, kontroles lapas, Kaizen',
    description:
      'Iepazīsties ar praktiskajiem 7S rīkiem: spageti diagramma, sarkanās birkas metode, kontroles lapas un Kaizen principi.',
    minPassScore: 80,
  },
  {
    id: '7s-10',
    systemId: '7s',
    levelNumber: 10,
    title: 'Meistarība',
    topic: 'Ieviešana, efektivitāte, integrācija',
    description:
      'Apkopo visus 7S elementus un izproti, kā veiksmīga ieviešana paaugstina ekonomisko efektivitāti un sagatavo pamatu citām sistēmām.',
    minPassScore: 80,
  },
];
