import type { ZoneId } from './types';

// ─── Zone metadata ────────────────────────────────────────────────────────────

export const ZONE_META: Record<ZoneId, { label: string; icon: string }> = {
  skirot:       { label: 'Šķirot',       icon: '🗂️' },
  sakartot:     { label: 'Sakārtot',     icon: '📐' },
  spodrinat:    { label: 'Spodrināt',    icon: '✨' },
  standardizet: { label: 'Standartizēt', icon: '📋' },
  stiprinat:    { label: 'Stiprināt',    icon: '💪' },
  sargat:       { label: 'Sargāt',       icon: '🦺' },
  komandas:     { label: 'Komandas Gars', icon: '🤝' },
};

export const ZONE_ORDER: ZoneId[] = [
  'skirot',
  'sakartot',
  'spodrinat',
  'standardizet',
  'stiprinat',
  'sargat',
  'komandas',
];

// ─── Zone 1 — Šķirot ─────────────────────────────────────────────────────────

export type SkirotCategory = 'vajadzigs' | 'karantina' | 'izmest';

export interface SkirotItem {
  id: string;
  icon: string;
  name: string;
  freq: string;
  correct: SkirotCategory;
}

export const SKIROT_ITEMS: SkirotItem[] = [
  { id: 's1',  icon: '🔨', name: 'Āmurs',                     freq: 'Katru dienu',   correct: 'vajadzigs' },
  { id: 's2',  icon: '🔧', name: 'Atslēgu komplekts',         freq: 'Katru nedēļu',  correct: 'vajadzigs' },
  { id: 's3',  icon: '📏', name: 'Mērlente',                  freq: 'Katru dienu',   correct: 'vajadzigs' },
  { id: 's4',  icon: '✏️', name: 'Zīmulis',                   freq: 'Katru dienu',   correct: 'vajadzigs' },
  { id: 's5',  icon: '🔌', name: 'Elektriskais urbjis',       freq: 'Katru nedēļu',  correct: 'vajadzigs' },
  { id: 's6',  icon: '🎯', name: 'Līmēšanas lente',           freq: 'Katru dienu',   correct: 'vajadzigs' },
  { id: 's7',  icon: '📦', name: 'Rezerves skrūves (liela partija)', freq: 'Reizi 6 mēn.', correct: 'karantina' },
  { id: 's8',  icon: '🔬', name: 'Precīzijas kalibrators',    freq: 'Reizi 6 mēn.', correct: 'karantina' },
  { id: 's9',  icon: '📚', name: 'Vecs katalogs (2018)',       freq: 'Nav lietots',   correct: 'izmest' },
  { id: 's10', icon: '🔩', name: 'Bojāts skrūvgriezis',       freq: 'Nav lietots',   correct: 'izmest' },
  { id: 's11', icon: '📄', name: 'Veci rasējumi (atcelts projekts)', freq: 'Nav lietots', correct: 'izmest' },
  { id: 's12', icon: '🖼️', name: 'Personīgā fotogrāfija',    freq: 'Nav lietots',   correct: 'izmest' },
];

// ─── Zone 2 — Sakārtot ───────────────────────────────────────────────────────

export type SakartotZone = 'primary' | 'secondary';

export interface SakartotTool {
  id: string;
  icon: string;
  name: string;
  correctZone: SakartotZone;
  hint: string;
}

export const SAKARTOT_TOOLS: SakartotTool[] = [
  { id: 't1', icon: '🔧', name: 'Plakanknaibles',          correctZone: 'primary',   hint: 'Ikdienas darbarīks' },
  { id: 't2', icon: '🪛', name: 'Skrūvgriezis',            correctZone: 'primary',   hint: 'Biežas rokasdarbs' },
  { id: 't3', icon: '✏️', name: 'Marķieris',               correctZone: 'primary',   hint: 'Izmanto katrā maiņā' },
  { id: 't4', icon: '📏', name: 'Mērlente',                correctZone: 'primary',   hint: 'Ikdienas mērīšana' },
  { id: 't5', icon: '🔌', name: 'Elektriskais urbjis',     correctZone: 'secondary', hint: 'Reizi nedēļā' },
  { id: 't6', icon: '⚙️', name: 'Momentatslēga',          correctZone: 'secondary', hint: 'Lieto retāk' },
  { id: 't7', icon: '🔋', name: 'Rezerves akumulators',   correctZone: 'secondary', hint: 'Rezerves elements' },
  { id: 't8', icon: '🔭', name: 'Precīzijas mērinstruments', correctZone: 'secondary', hint: 'Periodiskas pārbaudes' },
];

// ─── Zone 3 — Spodrināt ──────────────────────────────────────────────────────

export interface SpodrinatHotspot {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  description: string;
}

export const SPODRINAT_HOTSPOTS: SpodrinatHotspot[] = [
  { id: 'h1', x: 55,  y: 115, w: 55, h: 45, title: 'Eļļas noplūde',       description: 'Eļļas noplūde no hidrauliskās sistēmas izraisa slīdēšanas risku un var bojāt iekārtu.' },
  { id: 'h2', x: 235, y: 55,  w: 65, h: 40, title: 'Nosērušis filtrs',    description: 'Aizsērēti filtri samazina efektivitāti par 15–30% un var izraisīt pārkaršanu.' },
  { id: 'h3', x: 315, y: 175, w: 60, h: 45, title: 'Saplaisājušas šļūtenes', description: 'Bojātas šļūtenes var pēkšņi pārsprāgt, radot traumu risku un ražošanas dīkstāvi.' },
  { id: 'h4', x: 135, y: 225, w: 65, h: 40, title: 'Atkaļķojumi',         description: 'Atkaļķojumi uz apkures elementiem palielina enerģijas patēriņu par 20–40%.' },
  { id: 'h5', x: 215, y: 275, w: 55, h: 45, title: 'Nosērusi gaisma',     description: 'Vāja apgaismojuma dēļ operators var pieļaut kļūdas un ir pakļauts lielākam traumu riskam.' },
];

// ─── Zone 4 — Standartizēt ───────────────────────────────────────────────────

export interface FloorZone {
  id: string;
  label: string;
  correctColor: string;
  colorName: string;
  description: string;
}

export const FLOOR_ZONES: FloorZone[] = [
  { id: 'fz1', label: 'Evakuācijas ceļš',    correctColor: '#eab308', colorName: 'Dzeltena',     description: 'Evakuācijas ceļi un gājēju zonas' },
  { id: 'fz2', label: 'Defektu zona',         correctColor: '#ef4444', colorName: 'Sarkana',      description: 'Zonā, kur tiek novietotas defektas detaļas' },
  { id: 'fz3', label: 'Iekārtu zona',         correctColor: '#e5e7eb', colorName: 'Balta',        description: 'Iekārtu un aprīkojuma izvietojums' },
  { id: 'fz4', label: 'Traumu risks',         correctColor: '#eab308', colorName: 'Dzelten-melna', description: 'Zonas ar traumatisma risku' },
  { id: 'fz5', label: 'Ūdens savienojums',    correctColor: '#3b82f6', colorName: 'Zila',         description: 'Ūdens padeve un kanalizācija' },
  { id: 'fz6', label: 'Gatavā produkcija',    correctColor: '#22c55e', colorName: 'Zaļa',         description: 'Gatavo izstrādājumu uzglabāšana' },
  { id: 'fz7', label: 'Materiāli (WIP)',      correctColor: '#f97316', colorName: 'Oranža',       description: 'Izejmateriāli un izstrādājumi ražošanas procesā' },
  { id: 'fz8', label: 'Metāllūžņi',          correctColor: '#6b7280', colorName: 'Pelēka',       description: 'Metāla atkritumu un lūžņu zona' },
];

export const COLOR_PALETTE: { color: string; name: string }[] = [
  { color: '#eab308', name: 'Dzeltena' },
  { color: '#ef4444', name: 'Sarkana' },
  { color: '#e5e7eb', name: 'Balta' },
  { color: '#3b82f6', name: 'Zila' },
  { color: '#22c55e', name: 'Zaļa' },
  { color: '#f97316', name: 'Oranža' },
  { color: '#6b7280', name: 'Pelēka' },
];

// ─── Zone 5 — Stiprināt ──────────────────────────────────────────────────────

export interface StiprinatOption {
  id: string;
  text: string;
  consequence: string;
  longTerm: string;
  score: 20 | 60 | 100;
  disciplineChange: number;
}

export const STIPRINAT_SCENARIO =
  'Jānis regulāri atstāj darbarīkus nepareizā vietā pēc maiņas beigām. Šīs nedēļas laikā tas ir noticis jau 3 reizes. Tu esi viņa tiešais vadītājs un rīt ir komandas sanāksme.';

export const STIPRINAT_OPTIONS: StiprinatOption[] = [
  {
    id: 'o1',
    text: 'Ignorēt situāciju — Jānis ir labs darbinieks citos aspektos',
    consequence: 'Pārējie komandas locekļi redz, ka noteikumi netiek ievēroti.',
    longTerm: '5S kultūra sabrūk, citi sāk rīkoties līdzīgi. Efektivitāte krītas.',
    score: 20,
    disciplineChange: -25,
  },
  {
    id: 'o2',
    text: 'Uzreiz rakstīt brīdinājumu un draudēt ar atlaišanu',
    consequence: 'Jānis kļūst aizsargājošs un nemotivēts.',
    longTerm: 'Komandas morāle krītas. Problēma netiek risināta strukturāli.',
    score: 20,
    disciplineChange: -15,
  },
  {
    id: 'o3',
    text: 'Paskaidrot problēmu, apmācīt, noteikt skaidru procesu un veikt pārbaudes',
    consequence: 'Jānis saprot "kāpēc". Tiek izveidots skaidrs process.',
    longTerm: 'Komanda redz taisnīgu vadību. 5S kultūra nostiprinās ilgtermiņā.',
    score: 100,
    disciplineChange: 30,
  },
  {
    id: 'o4',
    text: 'Pašam sakārtot Jāņa darbarīkus, lai ietaupītu laiku',
    consequence: 'Problēma netiek risināta. Jānis nezina, ka rīkojas nepareizi.',
    longTerm: 'Tu tērē savu vadītāja laiku operatīvajā darbā, nevis problēmu risināšanā.',
    score: 60,
    disciplineChange: -5,
  },
];

// ─── Zone 6 — Sargāt ─────────────────────────────────────────────────────────

export interface SargatSymbol {
  id: string;
  icon: string;
  name: string;
}

export interface SargatSituation {
  id: string;
  icon: string;
  title: string;
  description: string;
  symbols: SargatSymbol[];
  correctSymbolId: string;
  explanation: string;
}

export const SARGAT_SITUATIONS: SargatSituation[] = [
  {
    id: 'sit1',
    icon: '🚶',
    title: 'Mitra grīda',
    description: 'Tikko notīrīta un mitra grīda gaiteņa zonā. Darbinieki iet cauri bez brīdinājuma.',
    symbols: [
      { id: 'sym1a', icon: '⚠️', name: 'Vispārējs brīdinājums' },
      { id: 'sym1b', icon: '💧', name: 'Slidena grīda' },
      { id: 'sym1c', icon: '🚫', name: 'Ieeja aizliegta' },
    ],
    correctSymbolId: 'sym1b',
    explanation: 'Mitrās grīdas apzīmē ar "Slidena grīda" simbolu (dzeltens trīsstūris ar cilvēku, kas krīt).',
  },
  {
    id: 'sit2',
    icon: '🔥',
    title: 'Karstā virsma',
    description: 'Iekārtas virsma darba laikā sasniedz 180°C. Operators piekļūst tai regulāri bez aizsardzības.',
    symbols: [
      { id: 'sym2a', icon: '🔥', name: 'Karstuma brīdinājums' },
      { id: 'sym2b', icon: '⚡', name: 'Elektriskais risks' },
      { id: 'sym2c', icon: '☣️', name: 'Ķīmiska viela' },
    ],
    correctSymbolId: 'sym2a',
    explanation: 'Karstas virsmas apzīmē ar "Karsta virsma" simbolu — roku kontakts var izraisīt 3. pakāpes apdegumus.',
  },
  {
    id: 'sit3',
    icon: '⚡',
    title: 'Bojāta elektroinstalācija',
    description: 'Elektriskā slēdžu kaste ar redzami bojātu izolāciju atrodas pieejamā darba zonā.',
    symbols: [
      { id: 'sym3a', icon: '🔥', name: 'Ugunsdrošība' },
      { id: 'sym3b', icon: '⚡', name: 'Elektriskais spriegums' },
      { id: 'sym3c', icon: '🚧', name: 'Darba zona' },
    ],
    correctSymbolId: 'sym3b',
    explanation: 'Bojāta elektroinstalācija apzīmējama ar "Elektriskais spriegums" simbolu — elektriskais trieciens var būt letāls.',
  },
  {
    id: 'sit4',
    icon: '📦',
    title: 'Smaguma celšana',
    description: 'Operators regulāri paceļ kastes ar svaru virs 25 kg bez palīglīdzekļiem vai apmācības.',
    symbols: [
      { id: 'sym4a', icon: '⚠️', name: 'Vispārējs risks' },
      { id: 'sym4b', icon: '🏋️', name: 'Smaguma celšanas risks' },
      { id: 'sym4c', icon: '🦺', name: 'Aizsargtērps' },
    ],
    correctSymbolId: 'sym4b',
    explanation: 'Smaguma celšana virs 25 kg bez palīglīdzekļiem apzīmē ar ergonomikas risku — muguras trauma ir biežākais darba ievainojums.',
  },
  {
    id: 'sit5',
    icon: '🧪',
    title: 'Ķīmiskas vielas',
    description: 'Darba virsma, kur tiek izmantoti skābes šķīdinātāji bez atbilstošas ventilācijas un aizsardzības.',
    symbols: [
      { id: 'sym5a', icon: '☣️', name: 'Ķīmiskas vielas' },
      { id: 'sym5b', icon: '🔥', name: 'Uzliesmojošs' },
      { id: 'sym5c', icon: '💧', name: 'Šķidrums' },
    ],
    correctSymbolId: 'sym5a',
    explanation: 'Ķīmiskas vielas ar korozīvu vai toksisku iedarbību apzīmē ar "Ķīmiskas vielas" simbolu — nepieciešami aizsargbrilles un cimdi.',
  },
  {
    id: 'sit6',
    icon: '🌫️',
    title: 'Putekļi ražošanā',
    description: 'Slīpēšanas darbi rada smalkas daļiņas. Darbinieki strādā bez elpošanas aizsardzības.',
    symbols: [
      { id: 'sym6a', icon: '😷', name: 'Elpošanas aizsardzība' },
      { id: 'sym6b', icon: '🦺', name: 'Aizsargveste' },
      { id: 'sym6c', icon: '👁️', name: 'Acu aizsardzība' },
    ],
    correctSymbolId: 'sym6a',
    explanation: 'Putekļu vai gāzu risks apzīmē ar "Elpošanas aizsardzība" — smalkas daļiņas var izraisīt plaušu slimības.',
  },
];

// ─── Zone 7 — Komandas Gars ───────────────────────────────────────────────────

export interface KomandaApproach {
  id: string;
  text: string;
  points: 5 | 10 | 25;
  feedback: string;
}

export interface KomandaEmployee {
  id: string;
  icon: string;
  name: string;
  type: string;
  challenge: string;
  approaches: KomandaApproach[];
}

export const KOMANDAS_EMPLOYEES: KomandaEmployee[] = [
  {
    id: 'e1',
    icon: '😊',
    name: 'Anna',
    type: 'Entuziastiskā',
    challenge: 'Anna ir aizrautīga par 7S un biežāk dara pati, nevis māca kolēģus. Viņas enerģija ir liels aktīvs.',
    approaches: [
      { id: 'a1a', text: 'Lūgt viņu vadīt 7S apmācību kolēģiem', points: 25, feedback: 'Lieliski! Annas enerģija tiek novirzīta konstruktīvi — viņa izplata zināšanas un jūtas novērtēta.' },
      { id: 'a1b', text: 'Ļaut viņai rīkoties pašai pēc saviem ieskatiem', points: 10, feedback: 'Viņa palīdz, bet citi nemācās. 7S kompetence neizplatās uz pārējo komandu.' },
      { id: 'a1c', text: 'Uzdot viņai administratīvus uzdevumus ārpus 7S', points: 5, feedback: 'Annas enerģija tiek izšķiesta. Viņa var kļūt nomākta un zaudēt motivāciju par 7S.' },
    ],
  },
  {
    id: 'e2',
    icon: '😒',
    name: 'Pēteris',
    type: 'Skeptiskais',
    challenge: 'Pēteris uzskata, ka 7S ir vēl viens "vadības modes šķirklis" un nevēlas mainīt savus ieradumus.',
    approaches: [
      { id: 'a2a', text: 'Parādīt konkrētus datus: laika ietaupījums, mazāk kļūdu pēc 7S', points: 25, feedback: 'Dati pārliecina skeptiķus. Pēteris var kļūt par 7S čempionu, ja redz reālu labumu.' },
      { id: 'a2b', text: 'Nosūtīt viņu uz obligātu apmācību bez skaidrojuma', points: 10, feedback: 'Viņš apmeklē apmācību, bet pretojas. Tas palielina slēpto pretestību.' },
      { id: 'a2c', text: 'Ignorēt viņa skepticismu, cerēt ka viņš pielāgosies', points: 5, feedback: 'Pēteris kļūst par aktīvu pretestnieku un negatīvi ietekmē pārējo komandu.' },
    ],
  },
  {
    id: 'e3',
    icon: '😟',
    name: 'Marta',
    type: 'Norūpējusies',
    challenge: 'Marta baidās, ka 7S izmaiņas nozīmēs negatīvu novērtējumu vai darbavietas zaudēšanu.',
    approaches: [
      { id: 'a3a', text: 'Privāti uzklausīt viņas bažas un paskaidrot, ka 7S ir par procesu, nevis vainošanu', points: 25, feedback: 'Uzticēšanās tiek veidota. Marta kļūst par atbalstītāju, zinot ka viņa ir droša šajā procesā.' },
      { id: 'a3b', text: 'Pateikt "Neuztraucies, viss būs labi" bez skaidrojuma', points: 10, feedback: 'Virsmas nomierinājums nerisina dziļākās bažas. Marta joprojām uztraucas klusumā.' },
      { id: 'a3c', text: 'Neuztvert viņas bažas nopietni un turpināt izmaiņas', points: 5, feedback: 'Marta jūtas ignorēta. Bailes palielinās un negatīvi ietekmē viņas darba kvalitāti.' },
    ],
  },
  {
    id: 'e4',
    icon: '😐',
    name: 'Kārlis',
    type: 'Pasīvais',
    challenge: 'Kārlis nedara neko nepareizi, bet nekādi neiesaistās 7S aktivitātēs un paliek komforta zonā.',
    approaches: [
      { id: 'a4a', text: 'Dot viņam nelielu, skaidri definētu 7S uzdevumu un atzinīgi novērtēt izpildi', points: 25, feedback: 'Kārlis iesaistās mazos soļos. Atzinība palielina viņa motivāciju un pašapziņu pakāpeniski.' },
      { id: 'a4b', text: 'Uzreiz pieprasīt, lai viņš vada 7S projektu komandā', points: 10, feedback: 'Pārāk liela atbildība uzreiz. Kārlis jūtas satriekts un vēl vairāk atkāpjas.' },
      { id: 'a4c', text: 'Atstāt viņu mierā — kāds taču jāstrādā klusumā', points: 5, feedback: 'Kārlis pilnībā norobežojas no komandas kultūras. 7S ieviešana paliek nepilnīga.' },
    ],
  },
];
