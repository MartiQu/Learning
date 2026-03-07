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
    title: 'TKV pamati',
    topic: 'Pamatfilozofija un vēsture',
    description:
      'Atklāj TKV pirmsākumus, galvenos domātājus (Demings, Džurans, Krosbijs) un kultūras pārmaiņu, ko tā prasa.',
    minPassScore: 70,
  },
  {
    id: 'tqm-2',
    systemId: 'tqm',
    levelNumber: 2,
    title: 'Orientācija uz klientu',
    topic: 'Klienta balss',
    description:
      'Uzzini, kā TKV izvirza klientu katras lēmumu pieņemšanas centrā un kā uztvert un izmantot klientu vajadzības.',
    minPassScore: 70,
  },
  {
    id: 'tqm-3',
    systemId: 'tqm',
    levelNumber: 3,
    title: 'Nepārtraukta pilnveide',
    topic: 'Kaizen un PDCA',
    description:
      'Pielietojiet Kaizen principus un PDCA uzlabošanas ciklu, lai veicinātu pakāpeniskus, ilgtspējīgus kvalitātes uzlabojumus.',
    minPassScore: 70,
  },
  {
    id: 'tqm-4',
    systemId: 'tqm',
    levelNumber: 4,
    title: 'Darbinieku iesaiste',
    topic: 'Cilvēki un komandas',
    description:
      'Izproti, kā katra darbinieka pilnvarošana ir TKV panākumu un kvalitātes kultūras pamats.',
    minPassScore: 70,
  },
  {
    id: 'tqm-5',
    systemId: 'tqm',
    levelNumber: 5,
    title: 'Procesu vadība',
    topic: 'Procesu īpašumtiesības un standartizācija',
    description:
      'Apgūsti procesu īpašumtiesības, standartizācijas metodes un labākās prakses dokumentēšanu.',
    minPassScore: 70,
  },
  {
    id: 'tqm-6',
    systemId: 'tqm',
    levelNumber: 6,
    title: 'Kvalitātes rīki',
    topic: 'Septiņi pamata kvalitātes rīki',
    description:
      'Pielietojiet 7 QC rīkus: zivs kaula diagramma, Pareto diagramma, kontroles diagramma, histogramma, izkliedes diagramma, pārbaudes lapas un blokshēma.',
    minPassScore: 70,
  },
  {
    id: 'tqm-7',
    systemId: 'tqm',
    levelNumber: 7,
    title: 'Piegādātāju kvalitāte',
    topic: 'Piegādes ķēdes partnerība',
    description:
      'Paplašini TKV principus uz piegādātājiem: kvalifikācija, partnerības un kopīgie uzlabošanas mērķi.',
    minPassScore: 70,
  },
  {
    id: 'tqm-8',
    systemId: 'tqm',
    levelNumber: 8,
    title: 'Mērīšana',
    topic: 'Kvalitātes rādītāji un KPI',
    description:
      'Definē un seko nozīmīgiem kvalitātes KPI; izmanto datus lēmumu pieņemšanai, nevis viedokļus.',
    minPassScore: 70,
  },
  {
    id: 'tqm-9',
    systemId: 'tqm',
    levelNumber: 9,
    title: 'Kultūra',
    topic: 'Kvalitātes kultūra un pārmaiņu vadība',
    description:
      'Uztur kvalitātes kultūru ar līderību, apmācību, atzinību un pārmaiņu pretestības pārvarēšanu.',
    minPassScore: 70,
  },
  {
    id: 'tqm-10',
    systemId: 'tqm',
    levelNumber: 10,
    title: 'Meistarība',
    topic: 'TKV ieviešanas ceļvedis',
    description:
      'Izstrādā un īsteno pilnu TKV ieviešanas ceļvedi organizācijai, integrējot visus principus.',
    minPassScore: 70,
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
