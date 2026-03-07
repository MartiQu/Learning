import type { Question } from '../types';

export const questions: Question[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ISO 9001 – 1. līmenis: Pamati
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iso9001-1-q1',
    levelId: 'iso9001-1',
    type: 'MultipleChoice',
    prompt: 'Cik kvalitātes vadības principus nosaka ISO 9001:2015?',
    data: {
      options: [
        { id: 'a', text: '5' },
        { id: 'b', text: '7' },
        { id: 'c', text: '9' },
        { id: 'd', text: '12' },
      ],
    },
    correctAnswer: 'b',
  },
  {
    id: 'iso9001-1-q2',
    levelId: 'iso9001-1',
    type: 'TrueFalse',
    prompt: 'ISO 9001:2015 pieprasa, lai organizācijai būtu īpašs Kvalitātes vadītāja amats.',
    data: { statement: 'ISO 9001:2015 pieprasa, lai organizācijai būtu īpašs Kvalitātes vadītāja amats.' },
    correctAnswer: 'false',
  },
  {
    id: 'iso9001-1-q3',
    levelId: 'iso9001-1',
    type: 'Matching',
    prompt: 'Savieno katru ISO 9001 principu ar tā pamatideju.',
    data: {
      left: [
        { id: 'l1', text: 'Orientācija uz klientu' },
        { id: 'l2', text: 'Līderība' },
        { id: 'l3', text: 'Cilvēku iesaiste' },
        { id: 'l4', text: 'Uz pierādījumiem balstīti lēmumi' },
      ],
      right: [
        { id: 'r1', text: 'Klientu vajadzību izpilde un pārsniegšana' },
        { id: 'r2', text: 'Datu un analīzes izmantošana lēmumos' },
        { id: 'r3', text: 'Kopīga mērķa un virziena nodrošināšana' },
        { id: 'r4', text: 'Kompetenti un pilnvaroti cilvēki' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r3', l3: 'r4', l4: 'r2' },
  },
  {
    id: 'iso9001-1-q4',
    levelId: 'iso9001-1',
    type: 'FillBlank',
    prompt: 'Aizpildi ISO 9001 principu: "Nepārtraukta _______ ir organizācijas pastāvīgs mērķis."',
    data: {
      before: 'Nepārtraukta ',
      after: ' ir organizācijas pastāvīgs mērķis.',
    },
    correctAnswer: 'pilnveide',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ISO 9001 – 2. līmenis: Procesu domāšana
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iso9001-2-q1',
    levelId: 'iso9001-2',
    type: 'DragSort',
    prompt: 'Sakārto PDCA cikla soļus pareizā secībā.',
    data: {
      items: [
        { id: 'check', text: 'Pārbaudi — uzraudi un mēri rezultātus' },
        { id: 'act', text: 'Rīkojies — veic uzlabošanas pasākumus' },
        { id: 'plan', text: 'Plāno — nospraud mērķus un procesus' },
        { id: 'do', text: 'Dari — īsteno procesus' },
      ],
    },
    correctAnswer: ['plan', 'do', 'check', 'act'],
  },
  {
    id: 'iso9001-2-q2',
    levelId: 'iso9001-2',
    type: 'MultipleChoice',
    prompt: 'Procesu pieejā — kas nosaka procesa ieejas un izejas?',
    data: {
      options: [
        { id: 'a', text: 'ISO standarta klauzulu numuri' },
        { id: 'b', text: 'Ieinteresēto pušu vajadzības un cerības' },
        { id: 'c', text: 'Organizācijas lielums un nozare' },
        { id: 'd', text: 'Iesaistīto darbinieku skaits' },
      ],
    },
    correctAnswer: 'b',
  },
  {
    id: 'iso9001-2-q3',
    levelId: 'iso9001-2',
    type: 'CaseStudy',
    prompt:
      'Ražošanas uzņēmums pamana, ka klientu sūdzības par novēlotām piegādēm pusgadā augušas par 40%. Operāciju vadītājs vēlas rīkoties nekavējoties.',
    data: {
      scenario:
        'Ražošanas uzņēmums pamana, ka klientu sūdzības par novēlotām piegādēm pusgadā augušas par 40%. Operāciju vadītājs vēlas rīkoties nekavējoties.',
      options: [
        {
          id: 'opt1',
          text: 'Nekavējoties nolīgt vairāk piegādes autovadītāju, neizmeklējot cēloņus.',
          consequence:
            'Pieņemšana darbā bez cēloņu analīzes var izšķērdēt resursus. Kavēšanās var rasties ražošanas plānošanā, nevis piegādē. Izmaksas pieaug, nerisinot reālo problēmu.',
        },
        {
          id: 'opt2',
          text: 'Izmantot PDCA ciklu: kartēt piegādes procesu, identificēt šaurvietas, testēt risinājumu un pēc tam pārskatīt.',
          consequence:
            'Pareiza pieeja. PDCA nodrošina, ka tiek atrasts cēlonis un risinājums testēts pirms pilnīgas ieviešanas. Klientu apmierinātība ilgtspējīgi uzlabojas.',
        },
        {
          id: 'opt3',
          text: 'Atvainoties klientiem un piedāvāt atlaides, turpinot pašreizējās operācijas.',
          consequence:
            'Īstermiņa labvēlības pasākums, kas nerisinā pamatā esošo procesu neveiksmi. Sūdzības turpināsies un izmaksas pieaugs.',
        },
      ],
    },
    correctAnswer: 'opt2',
  },
  {
    id: 'iso9001-2-q4',
    levelId: 'iso9001-2',
    type: 'TrueFalse',
    prompt: 'PDCA cikls ir vienreizēja darbība, ko veic tikai sākotnējās KVS ieviešanas laikā.',
    data: { statement: 'PDCA cikls ir vienreizēja darbība, ko veic tikai sākotnējās KVS ieviešanas laikā.' },
    correctAnswer: 'false',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ISO 9001 – 3. līmenis: Riski un audits
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iso9001-3-q1',
    levelId: 'iso9001-3',
    type: 'MultipleChoice',
    prompt: 'Kāds ir ISO 9001 KVS iekšējā audita galvenais mērķis?',
    data: {
      options: [
        { id: 'a', text: 'Sodīt nodaļas, kas nepilda mērķus' },
        { id: 'b', text: 'Sniegt informāciju par KVS atbilstību un efektivitāti' },
        { id: 'c', text: 'Aizstāt vadības pārskata procesu' },
        { id: 'd', text: 'Apmierināt tikai ārējo klientu pieprasījumus' },
      ],
    },
    correctAnswer: 'b',
  },
  {
    id: 'iso9001-3-q2',
    levelId: 'iso9001-3',
    type: 'DragSort',
    prompt: 'Sakārto iekšējā audita posmus pareizā secībā.',
    data: {
      items: [
        { id: 'report', text: 'Ziņot par audita konstatējumiem vadībai' },
        { id: 'plan', text: 'Plānot audita programmu' },
        { id: 'followup', text: 'Sekot līdzi korektīvajām darbībām' },
        { id: 'conduct', text: 'Veikt audita darbības' },
      ],
    },
    correctAnswer: ['plan', 'conduct', 'report', 'followup'],
  },
  {
    id: 'iso9001-3-q3',
    levelId: 'iso9001-3',
    type: 'TrueFalse',
    prompt: 'Riska domāšana ISO 9001:2015 prasa formālu risku reģistru kā obligātu dokumentu.',
    data: { statement: 'Riska domāšana ISO 9001:2015 prasa formālu risku reģistru kā obligātu dokumentu.' },
    correctAnswer: 'false',
  },
  {
    id: 'iso9001-3-q4',
    levelId: 'iso9001-3',
    type: 'FillBlank',
    prompt: 'Aizpildi apgalvojumu: "Plānojot KVS, jāapsver gan riski, gan _______."',
    data: {
      before: 'Plānojot KVS, jāapsver gan riski, gan ',
      after: '.',
    },
    correctAnswer: 'iespējas',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TKV – 1. līmenis: Pamati
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'tqm-1-q1',
    levelId: 'tqm-1',
    type: 'MultipleChoice',
    prompt: 'Kurš kvalitātes guru ieviesa koncepciju "14 vadības principi"?',
    data: {
      options: [
        { id: 'a', text: 'Džozefs Džurans' },
        { id: 'b', text: 'Filips Krosbijs' },
        { id: 'c', text: 'V. Edvards Demings' },
        { id: 'd', text: 'Kaoru Išikava' },
      ],
    },
    correctAnswer: 'c',
  },
  {
    id: 'tqm-1-q2',
    levelId: 'tqm-1',
    type: 'TrueFalse',
    prompt: 'Filips Krosbijs apgalvoja, ka "kvalitāte ir bez maksas", jo sliktas kvalitātes izmaksas pārsniedz profilakses izmaksas.',
    data: { statement: 'Filips Krosbijs apgalvoja, ka "kvalitāte ir bez maksas", jo sliktas kvalitātes izmaksas pārsniedz profilakses izmaksas.' },
    correctAnswer: 'true',
  },
  {
    id: 'tqm-1-q3',
    levelId: 'tqm-1',
    type: 'Matching',
    prompt: 'Savieno katru kvalitātes guru ar viņa galveno ieguldījumu.',
    data: {
      left: [
        { id: 'l1', text: 'V. Edvards Demings' },
        { id: 'l2', text: 'Džozefs Džurans' },
        { id: 'l3', text: 'Filips Krosbijs' },
        { id: 'l4', text: 'Kaoru Išikava' },
      ],
      right: [
        { id: 'r1', text: 'Kvalitātes triloģija: plānošana, kontrole, uzlabošana' },
        { id: 'r2', text: 'Zivs kaula / cēloņu un seku diagramma' },
        { id: 'r3', text: '14 vadības principi un PDCA' },
        { id: 'r4', text: '"Nulles defekti" un "Kvalitāte ir bez maksas"' },
      ],
    },
    correctAnswer: { l1: 'r3', l2: 'r1', l3: 'r4', l4: 'r2' },
  },
  {
    id: 'tqm-1-q4',
    levelId: 'tqm-1',
    type: 'FillBlank',
    prompt: 'TKV apzīmē Totālo _______ Vadību.',
    data: {
      before: 'Totālo ',
      after: ' Vadību.',
    },
    correctAnswer: 'Kvalitātes',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TKV – 2. līmenis: Orientācija uz klientu
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'tqm-2-q1',
    levelId: 'tqm-2',
    type: 'MultipleChoice',
    prompt: 'Tehnika "Klienta balss" (VoC) galvenokārt tiek izmantota, lai:',
    data: {
      options: [
        { id: 'a', text: 'Risinātu darbinieku sūdzības' },
        { id: 'b', text: 'Uztvertu klientu vajadzības un pārvērstu tās produkta prasībās' },
        { id: 'c', text: 'Veiktu piegādātāju kvalitātes auditu' },
        { id: 'd', text: 'Aprēķinātu ražošanas izmaksas' },
      ],
    },
    correctAnswer: 'b',
  },
  {
    id: 'tqm-2-q2',
    levelId: 'tqm-2',
    type: 'CaseStudy',
    prompt:
      'Viesnīcu tīkls pastāvīgi saņem atsauksmes, ka reģistrācijas rindas ir pārāk garas. Ģenerāldirektoram jāizlemj, kā reaģēt, izmantojot TKV principus.',
    data: {
      scenario:
        'Viesnīcu tīkls pastāvīgi saņem atsauksmes, ka reģistrācijas rindas ir pārāk garas. Ģenerāldirektoram jāizlemj, kā reaģēt, izmantojot TKV principus.',
      options: [
        {
          id: 'opt1',
          text: 'Ignorēt atsauksmes, jo reģistrācijas laiks atbilst nozares normām.',
          consequence:
            'Klientu atsauksmju ignorēšana pārkāpj TKV pamatprincipu — orientāciju uz klientu. Viesu apmierinātības rādītāji turpinās kristies.',
        },
        {
          id: 'opt2',
          text: 'Organizēt strukturētas VoC sesijas, kartēt reģistrācijas procesu un testēt mobilo iepriekšējās reģistrācijas risinājumu.',
          consequence:
            'Izcila TKV pieeja. Klientu vajadzību izpratne, procesa kartēšana un risinājuma testēšana pilnībā atbilst uz klientu vērstai nepārtrauktai pilnveidei.',
        },
        {
          id: 'opt3',
          text: 'Pīķa laikā pievienot vienu papildu reģistratoru un uzskatīt problēmu par atrisinātu.',
          consequence:
            'Īstermiņa risinājums, kas nerisinā pašu procesu. Rindas joprojām veidosies citos laikos, un izmaksas pieaug bez sistemātiska risinājuma.',
        },
      ],
    },
    correctAnswer: 'opt2',
  },
  {
    id: 'tqm-2-q3',
    levelId: 'tqm-2',
    type: 'DragSort',
    prompt: 'Sakārto soļus klientu vajadzību pārvēršanai produkta īpašībās (QFD "Kvalitātes mājas" secība).',
    data: {
      items: [
        { id: 'prioritise', text: 'Prioritizēt klientu prasības pēc nozīmīguma' },
        { id: 'correlate', text: 'Korelēt tehniskās prasības savā starpā' },
        { id: 'identify', text: 'Identificēt klientu prasības (KO)' },
        { id: 'technical', text: 'Definēt tehniskās prasības (KĀ)' },
        { id: 'benchmark', text: 'Salīdzināt ar konkurentiem' },
      ],
    },
    correctAnswer: ['identify', 'prioritise', 'technical', 'correlate', 'benchmark'],
  },
  {
    id: 'tqm-2-q4',
    levelId: 'tqm-2',
    type: 'TrueFalse',
    prompt: 'TKV kontekstā "klients" attiecas tikai uz ārējiem maksājošiem klientiem, nevis iekšējām nodaļām.',
    data: { statement: 'TKV kontekstā "klients" attiecas tikai uz ārējiem maksājošiem klientiem, nevis iekšējām nodaļām.' },
    correctAnswer: 'false',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TKV – 3. līmenis: Nepārtraukta pilnveide
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'tqm-3-q1',
    levelId: 'tqm-3',
    type: 'MultipleChoice',
    prompt: 'Japāņu termins "Kaizen" precīzāk tulkojams kā:',
    data: {
      options: [
        { id: 'a', text: 'Radikāla transformācija' },
        { id: 'b', text: 'Pārmaiņas uz labo pusi / nepārtraukta pilnveide' },
        { id: 'c', text: 'Nulles defekti' },
        { id: 'd', text: 'Klientu sajūsma' },
      ],
    },
    correctAnswer: 'b',
  },
  {
    id: 'tqm-3-q2',
    levelId: 'tqm-3',
    type: 'TrueFalse',
    prompt: 'Kaizen pasākumi (blitz) parasti iesaista tikai augstāko vadību, nevis frontālās līnijas darbiniekus.',
    data: { statement: 'Kaizen pasākumi (blitz) parasti iesaista tikai augstāko vadību, nevis frontālās līnijas darbiniekus.' },
    correctAnswer: 'false',
  },
  {
    id: 'tqm-3-q3',
    levelId: 'tqm-3',
    type: 'Matching',
    prompt: 'Savieno katru uzlabošanas koncepciju ar tās aprakstu.',
    data: {
      left: [
        { id: 'l1', text: 'Kaizen' },
        { id: 'l2', text: 'Kaikaku' },
        { id: 'l3', text: 'PDCA' },
        { id: 'l4', text: 'Gemba' },
      ],
      right: [
        { id: 'r1', text: 'Radikālas, transformatīvas pārmaiņas' },
        { id: 'r2', text: 'Faktiskā vieta, kur darbs notiek' },
        { id: 'r3', text: 'Iteratīvs Plāno-Dari-Pārbaudi-Rīkojies cikls' },
        { id: 'r4', text: 'Mazi, pakāpeniski uzlabojumi katru dienu' },
      ],
    },
    correctAnswer: { l1: 'r4', l2: 'r1', l3: 'r3', l4: 'r2' },
  },
  {
    id: 'tqm-3-q4',
    levelId: 'tqm-3',
    type: 'FillBlank',
    prompt: 'PDCA ciklā "P" apzīmē _______, kur nosaka mērķus un procesus.',
    data: {
      before: 'PDCA ciklā "P" apzīmē ',
      after: ', kur nosaka mērķus un procesus.',
    },
    correctAnswer: 'Plāno',
  },
];
