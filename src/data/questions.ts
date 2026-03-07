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
    explanation: 'ISO 9001:2015 balstās uz 7 kvalitātes vadības principiem: orientācija uz klientu, līderība, cilvēku iesaiste, procesu pieeja, uzlabošana, uz pierādījumiem balstīti lēmumi un attiecību vadība.',
    xpReward: 60,
  },
  {
    id: 'iso9001-1-q2',
    levelId: 'iso9001-1',
    type: 'TrueFalse',
    prompt: 'ISO 9001:2015 pieprasa, lai organizācijai būtu īpašs Kvalitātes vadītāja amats.',
    data: { statement: 'ISO 9001:2015 pieprasa, lai organizācijai būtu īpašs Kvalitātes vadītāja amats.' },
    correctAnswer: 'false',
    explanation: 'ISO 9001:2015 atteicās no obligātās "Kvalitātes vadītāja" prasības. Atbildība par KVS tiek sadalīta vadībai kopumā, veicinot lielāku iesaistīšanos visā organizācijā.',
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
    explanation: 'PDCA (Plāno-Dari-Pārbaudi-Rīkojies) ir iteratīvs cikls. Vispirms nospraud mērķus (Plāno), tad ievies (Dari), pēc tam uzraudi rezultātus (Pārbaudi) un veic korekcijas (Rīkojies).',
    xpReward: 75,
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
    explanation: 'PDCA cikla "P" fāzē tiek noteikti mērķi, identificēti riski un iespējas, un izveidots rīcības plāns. Labas plānošanas kvalitāte tieši ietekmē cikla efektivitāti.',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ISO 9001 – 1. līmenis: bonusa jautājumi ar paplašinātiem DragSort
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'iso9001-1-q5',
    levelId: 'iso9001-1',
    type: 'DragSort',
    prompt: 'Sakārto ISO 9001 sertifikācijas procesa galvenos posmus pareizā secībā.',
    data: {
      items: [
        { id: 'gap', text: 'Robu analīze — novērtē pašreizējo stāvokli' },
        { id: 'cert', text: 'Sertifikācijas audits — 2. posms' },
        { id: 'impl', text: 'KVS ieviešana un dokumentēšana' },
        { id: 'internal', text: 'Iekšējais audits un vadības pārskats' },
        { id: 'stage1', text: 'Dokumentācijas pārskatīšana — 1. posms' },
      ],
    },
    correctAnswer: ['gap', 'impl', 'internal', 'stage1', 'cert'],
    explanation: 'Sertifikācijas ceļš: sāc ar robu analīzi, ievies KVS, veic iekšējos auditus, pēc tam ārējais auditors pārskata dokumentāciju (1. posms) un veic pilno auditu (2. posms).',
    xpReward: 80,
  },
  {
    id: 'iso9001-1-q6',
    levelId: 'iso9001-1',
    type: 'MultipleChoice',
    prompt: 'Kurš no šiem IR viens no 7 ISO 9001:2015 kvalitātes vadības principiem?',
    data: {
      options: [
        { id: 'a', text: 'Nulles defekti' },
        { id: 'b', text: 'Attiecību vadība' },
        { id: 'c', text: 'Six Sigma' },
        { id: 'd', text: 'Kaizen' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Attiecību vadība (Relationship Management) ir viens no 7 ISO 9001:2015 principiem. Tā uzsver ilgtermiņa partnerattiecību veidošanu ar piegādātājiem un ieinteresētajām pusēm savstarpējai labklājībai.',
    xpReward: 60,
  },
  {
    id: 'iso9001-1-q7',
    levelId: 'iso9001-1',
    type: 'TrueFalse',
    prompt: 'ISO 9001:2015 pieprasa, lai organizācija dokumentētu visus savus procesus formālās procedūrās.',
    data: {
      statement: 'ISO 9001:2015 pieprasa, lai organizācija dokumentētu visus savus procesus formālās procedūrās.',
    },
    correctAnswer: 'false',
    explanation: 'ISO 9001:2015 ir elastīgāks nekā iepriekšējās versijas. Organizācijai pašai jānosaka, kāda dokumentācija nepieciešama efektīvai KVS darbībai — nav obligātu procedūru saraksta.',
    xpReward: 50,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 1. līmenis: 7S Ievads
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-1-q1',
    levelId: '7s-1',
    type: 'MultipleChoice',
    prompt: 'Cik elementu veido 7S sistēmu?',
    data: {
      options: [
        { id: 'a', text: '5' },
        { id: 'b', text: '6' },
        { id: 'c', text: '7' },
        { id: 'd', text: '8' },
      ],
    },
    correctAnswer: 'c',
    explanation: '7S sistēma satur tieši 7 elementus: Šķirot, Sakārtot, Spodrināt, Standartizēt, Stiprināt, Sargāt un Komandas gars.',
    hint: '7S ir 5S paplašinājums ar diviem papildu elementiem.',
    xpReward: 60,
  },
  {
    id: '7s-1-q2',
    levelId: '7s-1',
    type: 'DragSort',
    prompt: 'Sakārto 7S sistēmas elementus pareizā secībā.',
    data: {
      items: [
        { id: 'sakartot', text: 'Sakārtot' },
        { id: 'stiprinat', text: 'Stiprināt' },
        { id: 'skirot', text: 'Šķirot' },
        { id: 'sargat', text: 'Sargāt' },
        { id: 'standartizet', text: 'Standartizēt' },
        { id: 'komanda', text: 'Komandas gars' },
        { id: 'sodrinat', text: 'Spodrināt' },
      ],
    },
    correctAnswer: ['skirot', 'sakartot', 'sodrinat', 'standartizet', 'stiprinat', 'sargat', 'komanda'],
    explanation: 'Secība: Šķirot → Sakārtot → Spodrināt → Standartizēt → Stiprināt → Sargāt → Komandas gars. Pirmie 5 atbilst japāņu 5S, pēdējie 2 ir rietumu papildinājumi.',
    hint: 'Pirmie 5 elementi atbilst japāņu 5S. Nākamie divi ir rietumu papildinājumi.',
    xpReward: 75,
  },
  {
    id: '7s-1-q3',
    levelId: '7s-1',
    type: 'TrueFalse',
    prompt: '7S sistēmu var ieviest tikai ražošanas uzņēmumos.',
    data: { statement: '7S sistēmu var ieviest tikai ražošanas uzņēmumos.' },
    correctAnswer: 'false',
    explanation: '7S var ieviest jebkurā uzņēmējdarbības jomā — ražošanā, pakalpojumos, administrācijā, veselības aprūpē u.c.',
    hint: 'Padomā: vai birojam vai slimnīcai nevarētu noderēt organizēta darbavieta?',
    xpReward: 50,
  },
  {
    id: '7s-1-q4',
    levelId: '7s-1',
    type: 'FillBlank',
    prompt: 'Aizpildi: "Ja vadītāji apgūst 7S sistēmu, viņi var sekmīgi ieviest citas, sarežģītākas _______ sistēmas."',
    data: {
      before: 'Ja vadītāji apgūst 7S sistēmu, viņi var sekmīgi ieviest citas, sarežģītākas ',
      after: ' sistēmas.',
    },
    correctAnswer: 'kvalitātes',
    explanation: '7S ir pamats citām kvalitātes vadības sistēmām — TQM, TPM, Six Sigma, ISO 9001. Apgūstot 7S, organizācija iegūst disciplīnu un kārtību, kas nepieciešama sarežģītākām sistēmām.',
    hint: '7S ir pamats citiem vadības rīkiem, kā TQM, TPM, Six Sigma...',
    xpReward: 60,
  },
  {
    id: '7s-1-q5',
    levelId: '7s-1',
    type: 'MultipleChoice',
    prompt: 'Kurš zinātnieks tiek uzskatīts par 5S sistēmas pamatlicēju?',
    data: {
      options: [
        { id: 'a', text: 'V. Edvards Demings' },
        { id: 'b', text: 'Kaoru Išikava' },
        { id: 'c', text: 'Taiichi Ohno' },
        { id: 'd', text: 'Filips Krosbijs' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Kaoru Išikava (1915–1989) ir japāņu kvalitātes eksperts, kurš attīstīja 5S sistēmu. Viņš arī radīja "zivs kaula" jeb Išikavas diagrammu.',
    hint: 'Šis japāņu zinātnieks (1915–1989) ir slavens arī ar "zivs kaula" diagrammu.',
    xpReward: 60,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 2. līmenis: Šķirot
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-2-q1',
    levelId: '7s-2',
    type: 'MultipleChoice',
    prompt: 'Ko nozīmē "Šķirot" 7S sistēmā?',
    data: {
      options: [
        { id: 'a', text: 'Tīrīt iekārtas' },
        { id: 'b', text: 'Marķēt drošības zonas' },
        { id: 'c', text: 'Atdalīt nevajadzīgos priekšmetus no vajadzīgajiem' },
        { id: 'd', text: 'Standartizēt procesus' },
      ],
    },
    correctAnswer: 'c',
    explanation: 'Šķirošana (Seiri) nozīmē atstāt darba vietā tikai tos priekšmetus, kas ir tiešām nepieciešami darbam, un izvākt visus pārējos.',
    hint: 'Šķirošanas mērķis ir atstāt darba vietā tikai to, kas tiešām nepieciešams darbam.',
    xpReward: 60,
  },
  {
    id: '7s-2-q2',
    levelId: '7s-2',
    type: 'TrueFalse',
    prompt: 'Sarkanā birka (Red Tag) metode palīdz identificēt priekšmetus, kuru nepieciešamība ir apšaubāma.',
    data: { statement: 'Sarkanā birka (Red Tag) metode palīdz identificēt priekšmetus, kuru nepieciešamība ir apšaubāma.' },
    correctAnswer: 'true',
    explanation: 'Sarkanās birkas tiek piestiprinātas priekšmetiem, kuru nepieciešamība nav skaidra. Tie tiek nodoti karantīnas zonai turpmākai izvērtēšanai.',
    hint: 'Sarkanā birka iezīmē priekšmetus, kas tiek nodoti turpmākai izvērtēšanai.',
    xpReward: 50,
  },
  {
    id: '7s-2-q3',
    levelId: '7s-2',
    type: 'MultipleChoice',
    prompt: 'Cik dienas priekšmets atrodas karantīnas zonā, pirms tiek pieņemts lēmums par tā likteni?',
    data: {
      options: [
        { id: 'a', text: '7 dienas' },
        { id: 'b', text: '14 dienas' },
        { id: 'c', text: '30 dienas' },
        { id: 'd', text: '60 dienas' },
      ],
    },
    correctAnswer: 'c',
    explanation: '30 dienu karantīnas periods dod pietiekami daudz laika pārliecināties, vai priekšmets ir vajadzīgs vai var tikt likvidēts.',
    hint: 'Šis periods dod iespēju pārliecināties, vai priekšmets tomēr ir vajadzīgs.',
    xpReward: 60,
  },
  {
    id: '7s-2-q4',
    levelId: '7s-2',
    type: 'Matching',
    prompt: 'Savieno lietošanas biežumu ar ieteicamo glabāšanas vietu.',
    data: {
      left: [
        { id: 'l1', text: 'Nav lietots pēdējā gadā' },
        { id: 'l2', text: 'Lieto reizi nedēļā' },
        { id: 'l3', text: 'Lieto katru stundu' },
        { id: 'l4', text: 'Lieto reizi 2–6 mēnešos' },
      ],
      right: [
        { id: 'r1', text: 'Likvidēt' },
        { id: 'r2', text: 'Glabāt darba zonas tuvumā' },
        { id: 'r3', text: 'Turēt pie sevis vai tieši darba vietā' },
        { id: 'r4', text: 'Glabāt darba apgabalā' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Glabāšanas vieta jānosaka pēc lietošanas biežuma: biežāk lieto — tuvāk jāglabā. Reti vajadzīgus priekšmetus likvidē vai glabā tālu.',
    hint: 'Jo biežāk lieto — jo tuvāk jāglabā.',
    xpReward: 75,
  },
  {
    id: '7s-2-q5',
    levelId: '7s-2',
    type: 'FillBlank',
    prompt: 'Šķirošanas princips: "_______ ir labākais."',
    data: {
      before: '',
      after: ' ir labākais.',
    },
    correctAnswer: 'Viens',
    explanation: '"Viens ir labākais" — šis princips mudina minimizēt priekšmetu skaitu darba vietā: viens instruments, viena kopija dokumenta utt.',
    hint: 'Šis princips mudina minimizēt priekšmetu skaitu darba vietā.',
    xpReward: 60,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 3. līmenis: Sakārtot
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-3-q1',
    levelId: '7s-3',
    type: 'MultipleChoice',
    prompt: 'Cik sekunžu vajadzīgas, lai atrastu nepieciešamo priekšmetu, ja Seiton princips ir ieviests?',
    data: {
      options: [
        { id: 'a', text: '10 sekundes' },
        { id: 'b', text: '30 sekundes' },
        { id: 'c', text: '60 sekundes' },
        { id: 'd', text: '120 sekundes' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Seiton mērķis ir, lai jebkuru priekšmetu var atrast 30 sekundēs. Tas tiek panākts ar loģisku izvietojumu, marķēšanu un vizuālo kontroli.',
    hint: 'Sakārtošanas mērķis ir ātri atrast jebkuru priekšmetu bez kavēšanās.',
    xpReward: 60,
  },
  {
    id: '7s-3-q2',
    levelId: '7s-3',
    type: 'DragSort',
    prompt: 'Sakārto Seiton 4 soļus pareizā secībā.',
    data: {
      items: [
        { id: 's3', text: 'Glabāšanas kārtības izstrāde' },
        { id: 's1', text: 'Pašreizējās situācijas analīze' },
        { id: 's4', text: 'Ievērošanas sistēmas izveide' },
        { id: 's2', text: 'Lēmums par priekšmetu atrašanās vietām' },
      ],
    },
    correctAnswer: ['s1', 's2', 's3', 's4'],
    explanation: 'Secība: 1) Analizē pašreizējo situāciju, 2) Izlemj, kur glabāt katru priekšmetu, 3) Izstrādā glabāšanas kārtību, 4) Izveido sistēmu, lai kārtība tiktu ievērota.',
    hint: 'Vispirms jāsaprot problēma, tad jāplāno risinājums, tad jāīsteno, tad jānodrošina ievērošana.',
    xpReward: 75,
  },
  {
    id: '7s-3-q3',
    levelId: '7s-3',
    type: 'MultipleChoice',
    prompt: 'Ko attēlo "spageti diagramma" darba vietā?',
    data: {
      options: [
        { id: 'a', text: 'Procesu plūsmu' },
        { id: 'b', text: 'Darbinieka faktiskos pārvietošanās ceļus' },
        { id: 'c', text: 'Produkta kvalitātes kontroli' },
        { id: 'd', text: 'Iekārtu izvietojuma plānu' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Spageti diagramma vizualizē darbinieka faktiskos pārvietošanās ceļus darba vietā. Garas, sasvijušās līnijas atgādina spageti un norāda uz neefektīvu izkārtojumu.',
    hint: 'Nosaukums rodas no diagrammas izskata — garas, sasvijušās līnijas atgādina spageti.',
    xpReward: 60,
  },
  {
    id: '7s-3-q4',
    levelId: '7s-3',
    type: 'TrueFalse',
    prompt: 'Smagus priekšmetus ieteicams glabāt augšējos plauktos vieglas piekļuves dēļ.',
    data: { statement: 'Smagus priekšmetus ieteicams glabāt augšējos plauktos vieglas piekļuves dēļ.' },
    correctAnswer: 'false',
    explanation: 'Smagus priekšmetus glabā apakšējos plauktos vidus augstumā — tas samazina traumu risku un fizisko piepūli. Augšējos plauktos glabā vieglus, reti lietojamus priekšmetus.',
    hint: 'Padomā par darba drošību un fizisko piepūli, paceļot smagus priekšmetus.',
    xpReward: 50,
  },
  {
    id: '7s-3-q5',
    levelId: '7s-3',
    type: 'FillBlank',
    prompt: 'Darbinieks meklē 300 priekšmetus dienā × 20 sek. Ja meklēšanas laiku samazina par 5 sek., dienas ietaupījums ir _______ minūtes.',
    data: {
      before: 'Dienas ietaupījums ir ',
      after: ' minūtes.',
    },
    correctAnswer: '25',
    explanation: '300 priekšmeti × 5 sekundes = 1500 sekundes = 25 minūtes dienā. Tas ir vairāk nekā 2 stundas nedēļā — ievērojams produktivitātes pieaugums.',
    hint: '300 priekšmeti × 5 sekundes = 1500 sekundes. Pārvērst minūtēs.',
    xpReward: 75,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 4. līmenis: Spodrināt
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-4-q1',
    levelId: '7s-4',
    type: 'MultipleChoice',
    prompt: 'Kas piedalās tīrīšanā saskaņā ar Seiso principu?',
    data: {
      options: [
        { id: 'a', text: 'Tikai apkopējas' },
        { id: 'b', text: 'Tikai ražošanas darbinieki' },
        { id: 'c', text: 'Visi — no direktora līdz apkopējai' },
        { id: 'd', text: 'Tikai nodaļu vadītāji' },
      ],
    },
    correctAnswer: 'c',
    explanation: 'Seiso ir kultūras elements — atbildība par tīrību ir visas organizācijas, nevis tikai apkopēju. Vadītāja dalība tīrīšanā ir svarīgs piemēra rādīšanas veids.',
    hint: 'Seiso ir kultūras elements — atbildība par tīrību ir visas organizācijas, ne tikai apkopēju.',
    xpReward: 60,
  },
  {
    id: '7s-4-q2',
    levelId: '7s-4',
    type: 'TrueFalse',
    prompt: 'Seiso tīrīšana notiek tikai reizi nedēļā.',
    data: { statement: 'Seiso tīrīšana notiek tikai reizi nedēļā.' },
    correctAnswer: 'false',
    explanation: 'Seiso paredz ikdienas tīrīšanu — maiņas sākumā un/vai beigās. Regulāra tīrīšana palīdz agrīni atklāt iekārtu bojājumus un nodrošina pastāvīgu kārtību.',
    hint: 'Seiso paredz tīrīšanu maiņas sākumā un/vai beigās.',
    xpReward: 50,
  },
  {
    id: '7s-4-q3',
    levelId: '7s-4',
    type: 'FillBlank',
    prompt: 'Japāņu sakāmvārds Seiso kontekstā: "Tīrot, mēs tīrām arī savu _______."',
    data: {
      before: 'Tīrot, mēs tīrām arī savu ',
      after: '.',
    },
    correctAnswer: 'prātu',
    explanation: 'Seiso nav tikai fiziska darbība — tai ir arī psiholoģiska dimensija. Tīra darbavieta veicina skaidrāku domāšanu, fokusēšanos un labāku darba atmosfēru.',
    hint: 'Seiso nav tikai fiziska darbība — tai ir arī psiholoģiska dimensija.',
    xpReward: 60,
  },
  {
    id: '7s-4-q4',
    levelId: '7s-4',
    type: 'Matching',
    prompt: 'Savieno Seiso prasību ar tās mērķi.',
    data: {
      left: [
        { id: 'l1', text: 'Netīruma avotu samazināšana' },
        { id: 'l2', text: 'Tīrīšanas grafiks ar atbildīgajiem' },
        { id: 'l3', text: 'Iekārtu mazgāšana un eļļošana' },
        { id: 'l4', text: 'Vadītāju piedalīšanās tīrīšanā' },
      ],
      right: [
        { id: 'r1', text: 'Samazina laiku un pūles nākamajai tīrīšanai' },
        { id: 'r2', text: 'Nodrošina sistematizētu un paredzamu tīrīšanu' },
        { id: 'r3', text: 'Novērš bojājumus un pagarina iekārtu mūžu' },
        { id: 'r4', text: 'Veido kultūru, ka tīrība ir visu atbildība' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Katrai Seiso darbībai ir konkrēts loģisks rezultāts: avotu likvidēšana samazina darbu, grafiks nodrošina regularitāti, iekārtu kopšana pagarina to mūžu, un vadītāja piemērs veido kultūru.',
    hint: 'Katrai darbībai ir konkrēts, loģisks rezultāts Seiso ietvaros.',
    xpReward: 75,
  },
  {
    id: '7s-4-q5',
    levelId: '7s-4',
    type: 'CaseStudy',
    prompt: 'Ražošanas cehā strādnieki tīra iekārtas tikai pirms inspektoru vizītēm. Vecākais mehāniķis apgalvo, ka regulāra tīrīšana "izniekā laiku". Kā rīkoties?',
    data: {
      scenario: 'Ražošanas cehā strādnieki tīra iekārtas tikai pirms inspektoru vizītēm. Vecākais mehāniķis apgalvo, ka regulāra tīrīšana "izniekā laiku".',
      options: [
        { id: 'opt1', text: 'Piekrist mehāniķim — tīrīt tikai pirms inspektoru vizītēm', consequence: 'Iekārtas bojājas ātrāk, jo netīrums noslēpj defektus. Inspektori var pamanīt virspusēju pieeju.' },
        { id: 'opt2', text: 'Ieviest Seiso: ikdienas tīrīšanas grafiks, darbinieku apmācība, vadītāja rādīšana ar piemēru', consequence: 'Regulāra tīrīšana palīdz agrīni atklāt iekārtu bojājumus, samazina dīkstāves un pagarina iekārtu mūžu.' },
        { id: 'opt3', text: 'Nolīgt ārējo apkopēju firmu tīrīšanai', consequence: 'Ārēji apkopēji nezina iekārtas. Darbinieki nejūtas atbildīgi par darbavietu, un Seiso kultūra neveidojas.' },
      ],
    },
    correctAnswer: 'opt2',
    explanation: 'Seiso nav tikai estētika — regulāra tīrīšana palīdz atklāt iekārtu bojājumus (noplūdes, nodilumu, vibrāciju) pirms tie izraisa dārgus remontus vai dīkstāves.',
    hint: 'Seiso nav tikai estētika — regulāra tīrīšana palīdz atklāt iekārtu bojājumus agrīni.',
    xpReward: 80,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 5. līmenis: Standartizēt
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-5-q1',
    levelId: '7s-5',
    type: 'MultipleChoice',
    prompt: 'Kādi ir 3 Seiketsu galvenie komponenti?',
    data: {
      options: [
        { id: 'a', text: 'Plānošana, Ieviešana, Kontrole' },
        { id: 'b', text: 'Vizuālā kontrole, Krāsu kontrole, Caurspīdīgums' },
        { id: 'c', text: 'Dokumentācija, Apmācība, Audits' },
        { id: 'd', text: 'Marķēšana, Fotografēšana, Ziņošana' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Seiketsu trīs komponenti ir vizuālā kontrole (redzami standarti), krāsu kontrole (krāsu kodi norāda nozīmi) un caurspīdīgums (informācija pieejama visiem).',
    hint: 'Seiketsu mērķis ir padarīt standartus redzamus un saprotamus ikvienam.',
    xpReward: 60,
  },
  {
    id: '7s-5-q2',
    levelId: '7s-5',
    type: 'Matching',
    prompt: 'Savieno 7S standartizēto krāsu ar tās nozīmi.',
    data: {
      left: [
        { id: 'l1', text: 'Dzeltena' },
        { id: 'l2', text: 'Sarkana' },
        { id: 'l3', text: 'Oranža' },
        { id: 'l4', text: 'Balta/Sarkana' },
      ],
      right: [
        { id: 'r1', text: 'Ceļi un darba zonas' },
        { id: 'r2', text: 'Defekti, sarkanās birkas, atkritumu zonas' },
        { id: 'r3', text: 'Kvalitātes kontrolei paredzētie materiāli' },
        { id: 'r4', text: 'Drošības zonas elektropaneļu priekšā' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Krāsu kodi ir universāls vizuālās kontroles rīks: dzeltena — ceļi/darba zonas, sarkana — defekti/atkritumi, oranža — KK materiāli, balta/sarkana — drošības zonas.',
    hint: 'Krāsu kodi ir universāli — domā par ceļu satiksmi un rūpnīcas drošību.',
    xpReward: 75,
  },
  {
    id: '7s-5-q3',
    levelId: '7s-5',
    type: 'TrueFalse',
    prompt: 'Grīdas marķēšana ir vienīgā vizuālās kontroles metode Seiketsu ietvaros.',
    data: { statement: 'Grīdas marķēšana ir vienīgā vizuālās kontroles metode Seiketsu ietvaros.' },
    correctAnswer: 'false',
    explanation: 'Seiketsu ietver daudzveidīgas vizuālās kontroles metodes: grīdas marķēšanu, sienu un kolonnu marķēšanu, iekārtu marķēšanu, plauktu malu līnijas, caurspīdīgus skapjus u.c.',
    hint: 'Seiketsu ietver marķēšanu uz grīdas, sienām, kolonnām, iekārtām, plauktu malām...',
    xpReward: 50,
  },
  {
    id: '7s-5-q4',
    levelId: '7s-5',
    type: 'DragSort',
    prompt: 'Sakārto Seiketsu dokumentācijas elementus loģiskā secībā (no pamata uz konkrēto).',
    data: {
      items: [
        { id: 'd2', text: 'Priekšmetu izvietojuma noteikumi' },
        { id: 'd4', text: 'Darba drošības instrukcijas' },
        { id: 'd1', text: 'Priekšmetu klasifikācijas noteikumi' },
        { id: 'd3', text: 'Tīrīšanas un eļļošanas shēmas' },
      ],
    },
    correctAnswer: ['d1', 'd2', 'd3', 'd4'],
    explanation: 'Loģiskā secība seko 7S elementiem: vispirms klasificē (Šķiro), tad nosaka vietas (Sakārto), tad apraksta uzturēšanu (Spodrini), tad drošību (Sargā).',
    hint: 'Seko 7S elementu secībai: Šķiro → Sakārto → Spodrini → Standartizē.',
    xpReward: 75,
  },
  {
    id: '7s-5-q5',
    levelId: '7s-5',
    type: 'MultipleChoice',
    prompt: 'Kāda krāsu kombinācija tiek izmantota riska zonās, kur darbiniekam draud traumas?',
    data: {
      options: [
        { id: 'a', text: 'Sarkana' },
        { id: 'b', text: 'Oranža' },
        { id: 'c', text: 'Dzeltena/melna' },
        { id: 'd', text: 'Balta/sarkana' },
      ],
    },
    correctAnswer: 'c',
    explanation: 'Dzeltena/melna kombinācija ir universāls brīdinājuma signāls (kā bišu krāsas), plaši izmantots bīstamās vietās, kur pastāv traumu risks.',
    hint: 'Šī krāsu kombinācija ir universāls brīdinājuma signāls — kā bišu krāsas.',
    xpReward: 60,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 6. līmenis: Stiprināt
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-6-q1',
    levelId: '7s-6',
    type: 'MultipleChoice',
    prompt: 'Ko nozīmē Stiprināt (Shitsuke) 7S sistēmā?',
    data: {
      options: [
        { id: 'a', text: 'Stiprināt iekārtas ar skrūvēm' },
        { id: 'b', text: 'Padarīt 7S prasības par darbinieku ikdienas ieradumiem' },
        { id: 'c', text: 'Pastiprināt drošības pasākumus' },
        { id: 'd', text: 'Stiprināt piegādātāju sadarbību' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Shitsuke nozīmē disciplīnu — padarīt 7S prasības par dabisku darbinieku ikdienas paradumu, lai kārtība tiktu uzturēta arī bez ārējas uzraudzības.',
    hint: 'Disciplīna nozīmē, ka cilvēki dara pareizo lietu arī tad, kad neviens neskatās.',
    xpReward: 60,
  },
  {
    id: '7s-6-q2',
    levelId: '7s-6',
    type: 'TrueFalse',
    prompt: 'Pašdisciplīna ir viens no Stiprināšanas galvenajiem līdzekļiem.',
    data: { statement: 'Pašdisciplīna ir viens no Stiprināšanas galvenajiem līdzekļiem.' },
    correctAnswer: 'true',
    explanation: 'Shitsuke galarezultāts ir pašdisciplīna — darbinieks pats uztur kārtību, nevis tikai reaģē uz ārēju spiedienu vai kontroli.',
    hint: 'Shitsuke beidzot nozīmē, ka darbinieks pats uztur kārtību bez ārēja spiediena.',
    xpReward: 50,
  },
  {
    id: '7s-6-q3',
    levelId: '7s-6',
    type: 'Matching',
    prompt: 'Savieno Stiprināšanas līdzekli ar tā aprakstu.',
    data: {
      left: [
        { id: 'l1', text: 'Vadības piedalīšanās' },
        { id: 'l2', text: 'Motivācijas sistēma' },
        { id: 'l3', text: 'Darba aprakstu atjaunināšana' },
        { id: 'l4', text: 'Darbinieku informēšana' },
      ],
      right: [
        { id: 'r1', text: 'Parāda, ka 7S ir prioritāte no augšas' },
        { id: 'r2', text: 'Stimulē ievērošanu ar pozitīviem stimuliem' },
        { id: 'r3', text: 'Padara 7S par formāliem pienākumiem' },
        { id: 'r4', text: 'Nodrošina, ka visi zina mērķus un rezultātus' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Stiprināšana izmanto dažādus sviras punktus: vadītāja piemērs rada kultūru, motivācija rada vēlmi, formālie pienākumi rada atbildību, informēšana rada izpratni.',
    hint: 'Katrs līdzeklis vērsts uz citu motivācijas aspektu — kultūra, stimuli, formālie pienākumi, izpratne.',
    xpReward: 75,
  },
  {
    id: '7s-6-q4',
    levelId: '7s-6',
    type: 'FillBlank',
    prompt: 'Stiprināšanas princips: "Māci katram, kas jādara, un liec katram darīt to, ko _______."',
    data: {
      before: 'Māci katram, kas jādara, un liec katram darīt to, ko ',
      after: '.',
    },
    correctAnswer: 'iemācīja',
    explanation: 'Disciplīnas cikls: apmācība → prakse → ieradums. Teorija bez prakses neveido paradumus, tāpēc svarīgi nodrošināt, ka iemācītais tiek arī darīts.',
    hint: 'Disciplīna noslēdzas ciklā: apmācība → prakse → ieradums.',
    xpReward: 60,
  },
  {
    id: '7s-6-q5',
    levelId: '7s-6',
    type: 'CaseStudy',
    prompt: 'Uzņēmumā 7S sistēma ieviesta pirms 6 mēnešiem. Sākumā darbinieki ievēroja kārtību, bet tagad atgriežas pie veciem paradumiem. Kā vadītājam rīkoties?',
    data: {
      scenario: 'Uzņēmumā 7S sistēma ieviesta pirms 6 mēnešiem. Sākumā darbinieki ievēroja kārtību, bet tagad atgriežas pie veciem paradumiem. Vadītājs vēlas situāciju uzlabot.',
      options: [
        { id: 'opt1', text: 'Sodīt darbiniekus par neievērošanu', consequence: 'Bailes rada īslaicīgu ievērošanu, bet neveido ilgtermiņa paradumus. Darbinieku motivācija un uzticēšanās krītas.' },
        { id: 'opt2', text: 'Ieviest regulārus 7S auditus, publicēt rezultātus, vadītājam personīgi piedalīties kārtības uzturēšanā', consequence: 'Sistemātiska kontrole un vadītāja piemērs ir galvenie ilgtermiņa faktori. Publiski rezultāti rada pozitīvu konkurenci.' },
        { id: 'opt3', text: 'Sākt visu 7S ieviešanu no sākuma', consequence: 'Atkārtota ieviešana bez kultūras maiņas dos tādus pašus rezultātus — īslaicīgu uzlabojumu un atgriešanos pie veciem paradumiem.' },
      ],
    },
    correctAnswer: 'opt2',
    explanation: 'Shitsuke uzsver, ka vadītāja personīgais piemērs un sistemātiska (bet ne sodoša) kontrole ir galvenie faktori, kas nodrošina 7S ilgtspēju.',
    hint: 'Shitsuke uzsver, ka vadītāja personīgais piemērs un sistemātiska kontrole ir galvenie ilgtspējas faktori.',
    xpReward: 80,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 7. līmenis: Sargāt
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-7-q1',
    levelId: '7s-7',
    type: 'MultipleChoice',
    prompt: 'Ko nozīmē Poka-yoke drošības kontekstā?',
    data: {
      options: [
        { id: 'a', text: 'Japāņu vārds "drošība"' },
        { id: 'b', text: 'Kļūdu novēršanas mehānisms' },
        { id: 'c', text: 'Drošības inspektora amata nosaukums' },
        { id: 'd', text: 'Riska reģistra forma' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Poka-yoke (no japāņu: "kļūdu drošinātājs") ir mehānisms vai metode, kas padara kļūdu fiziski neiespējamu vai nekavējoties pamanāmu, pirms tā rada kaitējumu.',
    hint: 'Poka-yoke metodes mērķis ir padarīt kļūdu fiziski neiespējamu vai uzreiz pamanāmu.',
    xpReward: 60,
  },
  {
    id: '7s-7-q2',
    levelId: '7s-7',
    type: 'TrueFalse',
    prompt: 'Drošība (Sargāt) 7S sistēmā tika pievienota jau oriģinālajā 5S koncepcijā.',
    data: { statement: 'Drošība (Sargāt) 7S sistēmā tika pievienota jau oriģinālajā 5S koncepcijā.' },
    correctAnswer: 'false',
    explanation: 'Oriģinālā japāņu sistēma ir 5S. Rietumu valstīs tā tika paplašināta par 6S (ar Safety) un vēlāk par 7S (ar Komandas garu).',
    hint: '5S → 6S → 7S: drošība ir viens no diviem rietumu papildinājumiem pie japāņu 5S.',
    xpReward: 50,
  },
  {
    id: '7s-7-q3',
    levelId: '7s-7',
    type: 'Matching',
    prompt: 'Savieno drošības darbību ar tās mērķi.',
    data: {
      left: [
        { id: 'l1', text: 'Bīstamo zonu marķēšana ar simboliem' },
        { id: 'l2', text: 'Poka-yoke mehānismi' },
        { id: 'l3', text: 'Regulāras drošības pārbaudes' },
        { id: 'l4', text: 'Darbinieku drošības apmācība' },
      ],
      right: [
        { id: 'r1', text: 'Brīdina un vizuāli atgādina par riskiem' },
        { id: 'r2', text: 'Novērš kļūdas, padarot tās fiziski neiespējamas' },
        { id: 'r3', text: 'Identificē jaunus riskus pirms tie izraisa negadījumus' },
        { id: 'r4', text: 'Nodrošina, ka darbinieki zina, kā rīkoties bīstamās situācijās' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Katrai drošības darbībai ir savs loģisks efekts: marķēšana brīdina, Poka-yoke novērš, pārbaudes identificē, apmācība informē.',
    hint: 'Katrai drošības darbībai ir savs loģisks drošības efekts.',
    xpReward: 75,
  },
  {
    id: '7s-7-q4',
    levelId: '7s-7',
    type: 'MultipleChoice',
    prompt: 'Par cik reizēm samazinās traumu un nelaimes gadījumu skaits pēc veiksmīgas 7S ieviešanas?',
    data: {
      options: [
        { id: 'a', text: '1,5 reizes' },
        { id: 'b', text: '2 reizes' },
        { id: 'c', text: '3 reizes' },
        { id: 'd', text: '5 reizes' },
      ],
    },
    correctAnswer: 'c',
    explanation: 'Pēc veiksmīgas 7S ieviešanas traumu un nelaimes gadījumu skaits samazinās 3 reizes — tas ir viens no galvenajiem izmērāmajiem rezultātiem.',
    hint: 'Literatūra norāda konkrētu skaitli kā vienu no 7S ieviešanas rezultātiem.',
    xpReward: 60,
  },
  {
    id: '7s-7-q5',
    levelId: '7s-7',
    type: 'CaseStudy',
    prompt: 'Elektrisko iekārtu cehā darbinieki bieži aizmirst valkāt aizsargcimdus, jo tie netiek glabāti ērtā vietā. Cehā jau noticis viens nelaimes gadījums. Kā rīkoties?',
    data: {
      scenario: 'Elektrisko iekārtu cehā darbinieki bieži aizmirst valkāt aizsargcimdus, jo tie netiek glabāti ērtā vietā. Cehā jau noticis viens nelaimes gadījums.',
      options: [
        { id: 'opt1', text: 'Izlikt paziņojumu par obligātu cimdu lietošanu', consequence: 'Paziņojumi bez sistēmiskas pieejas ir neefektīvi — darbinieki tos drīz vien pārstāj pamanīt.' },
        { id: 'opt2', text: 'Pārvietot cimdus tieši pie iekārtas, marķēt vietu, ieviest Poka-yoke vizuālo atgādinājumu un organizēt drošības apmācību', consequence: 'Šī pieeja apvieno visus Sargāt principus: fizisko pieejamību, vizuālos signālus un zināšanas. Rezultāts — sistemātiska riska novēršana.' },
        { id: 'opt3', text: 'Nopirkt jaunus, ergonomiskākus cimdus', consequence: 'Jauni cimdi neatrisina pamata problēmu — glabāšanas vietu. Darbinieki joprojām aizmirsīs tos ņemt.' },
      ],
    },
    correctAnswer: 'opt2',
    explanation: 'Sargāt principi ietver gan fizisko pieejamību (cimdi pie iekārtas), gan vizuālos signālus (marķēšana, Poka-yoke), gan zināšanas (apmācība) — sistēmiska pieeja nodrošina ilgtermiņa drošību.',
    hint: 'Sargāt principi ietver gan fizisko pieejamību, gan vizuālos signālus, gan apmācību.',
    xpReward: 80,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 8. līmenis: Komandas gars
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-8-q1',
    levelId: '7s-8',
    type: 'MultipleChoice',
    prompt: 'Ko nozīmē "Komandas gars" 7S sistēmā?',
    data: {
      options: [
        { id: 'a', text: 'Kopīgas sporta aktivitātes darbiniekiem' },
        { id: 'b', text: 'Darbinieku iesaiste un vēlme sadarboties visos līmeņos' },
        { id: 'c', text: 'Komandas vadītāja autoritāte pār darbiniekiem' },
        { id: 'd', text: 'Darba grafika organizācija maiņās' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Komandas gars ir 7. elements, kas pārvieto 7S no rīka uz kultūras pārmaiņu. Tas nozīmē brīvprātīgu darbinieku iesaisti un sadarbību visos hierarhijas līmeņos.',
    hint: 'Komandas gars pārvieto 7S no rīka uz kultūras pārmaiņu.',
    xpReward: 60,
  },
  {
    id: '7s-8-q2',
    levelId: '7s-8',
    type: 'TrueFalse',
    prompt: '7S darba grupas tiek izveidotas obligātā kārtā pēc vadītāju rīkojuma.',
    data: { statement: '7S darba grupas tiek izveidotas obligātā kārtā pēc vadītāju rīkojuma.' },
    correctAnswer: 'false',
    explanation: 'Viens no 7S darba grupu pamatprincipiem ir brīvprātīgums — dalība grupā nav piespiedu kārtā. Tas nodrošina augstāku motivāciju un ilgtspējīgāku iesaisti.',
    hint: 'Viens no darba grupu principiem ir brīvprātīga dalība.',
    xpReward: 50,
  },
  {
    id: '7s-8-q3',
    levelId: '7s-8',
    type: 'Matching',
    prompt: 'Savieno darba grupu principu ar tā aprakstu.',
    data: {
      left: [
        { id: 'l1', text: 'Brīvprātīgums' },
        { id: 'l2', text: 'Pašpilnveidošanās' },
        { id: 'l3', text: 'Mijiedarbība ar darba vidi' },
        { id: 'l4', text: 'Nepārtraukta darbība' },
      ],
      right: [
        { id: 'r1', text: 'Dalība grupā nav piespiedu kārtā' },
        { id: 'r2', text: 'Katrs dalībnieks attīsta savas prasmes' },
        { id: 'r3', text: 'Uzlabojumi tieši ietekmē darba apstākļus' },
        { id: 'r4', text: 'Grupas darbs ir ilgtermiņa, nevis vienreizējs pasākums' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Šie četri principi atšķir 7S darba grupas no parastām darba grupām: brīvprātīgums, personīgā izaugsme, tiešā saikne ar darba vidi un ilgtermiņa perspektīva.',
    hint: 'Šie principi atšķir 7S komandas no parastām darba grupām.',
    xpReward: 75,
  },
  {
    id: '7s-8-q4',
    levelId: '7s-8',
    type: 'FillBlank',
    prompt: 'Komandas gara elements nozīmē darbinieku iesaisti visos _______ un vēlmi sadarboties.',
    data: {
      before: 'Darbinieku iesaiste visos ',
      after: ' un vēlme sadarboties.',
    },
    correctAnswer: 'līmeņos',
    explanation: 'Komandas garam jābūt visā organizācijas hierarhijā — no strādniekiem līdz direktoram. Tikai tad veidojas patiesa 7S kultūra.',
    hint: 'Komandas garam jābūt visā hierarhijā — no strādniekiem līdz direktoram.',
    xpReward: 60,
  },
  {
    id: '7s-8-q5',
    levelId: '7s-8',
    type: 'CaseStudy',
    prompt: 'Uzņēmumā 7S sistēma tiek ieviesta tikai no augšas uz leju — vadītāji nosaka prasības, bet darbinieki tās neuzskata par savām. Motivācija ir zema. Kā uzlabot situāciju?',
    data: {
      scenario: 'Uzņēmumā 7S sistēma tiek ieviesta tikai no augšas uz leju — vadītāji nosaka prasības, bet darbinieki tās neuzskata par savām. Motivācija ir zema.',
      options: [
        { id: 'opt1', text: 'Pastiprināt kontroli un ieviest sodus par neievērošanu', consequence: 'Sodi rada pretestību un veicina vēl lielāku atsvešinātību. Darbinieki dara minimumu, lai izvairītos no soda.' },
        { id: 'opt2', text: 'Iesaistīt darbiniekus 7S grupu izveidē, ļaut viņiem piedāvāt uzlabojumus, atzīt un publicēt sasniegumus', consequence: 'Brīvprātīga iesaiste un atzinība veido piederības sajūtu. Darbinieki uzskata 7S par savējo, nevis uzliktu pienākumu.' },
        { id: 'opt3', text: 'Atteikties no 7S un ieviest citu vadības sistēmu', consequence: 'Sistēma nav problēma — problēma ir ieviešanas pieeja. Cita sistēma ar to pašu pieeju dos tādus pašus rezultātus.' },
      ],
    },
    correctAnswer: 'opt2',
    explanation: 'Komandas gars nevar tikt uzspiest — tas jāveido ar brīvprātīgu iesaisti, iespēju ietekmēt lēmumus un pozitīvu atzinību par sasniegumiem.',
    hint: 'Komandas gars nevar tikt uzspiest — tas jāveido ar brīvprātīgu iesaisti un atzinību.',
    xpReward: 80,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 9. līmenis: 7S Rīki
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-9-q1',
    levelId: '7s-9',
    type: 'Matching',
    prompt: 'Savieno 7S rīku ar tā aprakstu.',
    data: {
      left: [
        { id: 'l1', text: 'Spageti diagramma' },
        { id: 'l2', text: 'Sarkanā birka' },
        { id: 'l3', text: 'Kontroles lapa' },
        { id: 'l4', text: 'Kaizen' },
      ],
      right: [
        { id: 'r1', text: 'Kartē darbinieka faktiskos pārvietošanās ceļus' },
        { id: 'r2', text: 'Identificē priekšmetus ar neskaidru nepieciešamību' },
        { id: 'r3', text: 'Fiksē tīrīšanas darbības un konstatētās problēmas' },
        { id: 'r4', text: 'Nepārtrauktu mazo uzlabojumu metode' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Katrs rīks risina specifisku 7S izaicinājumu: spageti diagramma atklāj pārvietošanos, sarkanā birka šķiro priekšmetus, kontroles lapa fiksē stāvokli, Kaizen veicina uzlabojumus.',
    hint: 'Katrs rīks risina specifisku 7S ieviešanas izaicinājumu.',
    xpReward: 75,
  },
  {
    id: '7s-9-q2',
    levelId: '7s-9',
    type: 'TrueFalse',
    prompt: 'Spageti diagramma palīdz samazināt darbinieku nevajadzīgos pārvietošanās ceļus.',
    data: { statement: 'Spageti diagramma palīdz samazināt darbinieku nevajadzīgos pārvietošanās ceļus.' },
    correctAnswer: 'true',
    explanation: 'Vizualizējot darbinieku pārvietošanās ceļus, var identificēt, kur iekārtas vai materiāli jāpārvieto tuvāk, tādējādi ietaupot laiku un samazinot nogurumu.',
    hint: 'Vizualizējot ceļus, var identificēt, kur iekārtas vai materiāli jāpārvieto tuvāk.',
    xpReward: 50,
  },
  {
    id: '7s-9-q3',
    levelId: '7s-9',
    type: 'DragSort',
    prompt: 'Sakārto 7S ieviešanas sagatavošanas posmus pareizā secībā.',
    data: {
      items: [
        { id: 'p3', text: 'Foto pirms ieviešanas' },
        { id: 'p5', text: 'Ieviešanas pasākuma organizēšana' },
        { id: 'p1', text: 'Vadītāju apmācība (min. 16 h)' },
        { id: 'p4', text: 'Darba grupu izveide' },
        { id: 'p2', text: 'Dokumentācijas un veidlapu sagatavošana' },
      ],
    },
    correctAnswer: ['p1', 'p2', 'p3', 'p4', 'p5'],
    explanation: 'Secība: 1) Apmāci vadītājus, 2) Sagatavo dokumentāciju, 3) Fotografē sākumstāvokli, 4) Izveido darba grupas, 5) Organizē formālo ieviešanas pasākumu.',
    hint: 'Vispirms jāapmāca vadītāji, tad jāsagatavo materiāli, tad jādokumentē sākumpunkts, tad jāorganizē cilvēki, tad formāli jāuzsāk.',
    xpReward: 80,
  },
  {
    id: '7s-9-q4',
    levelId: '7s-9',
    type: 'MultipleChoice',
    prompt: 'Kāda ir "karantīnas zonas" funkcija 7S sistēmā?',
    data: {
      options: [
        { id: 'a', text: 'Zona, kur glabā bīstamas ķīmiskas vielas' },
        { id: 'b', text: 'Speciāli marķēta zona priekšmetiem, kuru nepieciešamība tiek izvērtēta 30 dienu laikā' },
        { id: 'c', text: 'Zona, kur atrodas darba grupu sanāksmju telpa' },
        { id: 'd', text: 'Rezerves iekārtu uzglabāšanas vieta' },
      ],
    },
    correctAnswer: 'b',
    explanation: 'Karantīnas zona ir speciāla vieta priekšmetiem ar sarkanu birku. 30 dienu laikā tiek noskaidrots, vai tie ir vajadzīgi — ja nē, tie tiek likvidēti.',
    hint: 'Pēc sarkanās birkas piestiprināšanas priekšmets netiek uzreiz izmests — vispirms dod izvērtēšanas laiku.',
    xpReward: 60,
  },
  {
    id: '7s-9-q5',
    levelId: '7s-9',
    type: 'CaseStudy',
    prompt: 'Uzņēmums vēlas vizuāli kontrolēt komponentu daudzumu noliktavā, lai uzreiz redzētu, kad jāpasūta papildus. Noliktavas darbinieks jautā, kādu 7S rīku izmantot.',
    data: {
      scenario: 'Uzņēmums vēlas vizuāli kontrolēt komponentu daudzumu noliktavā, lai uzreiz redzētu, kad jāpasūta papildus, bez manuālas skaitīšanas.',
      options: [
        { id: 'opt1', text: 'Uzstādīt noliktavas pārvaldības programmatūru', consequence: 'Programmatūra prasa apmācību, uzturēšanu un piekļuvi ekrānam. Tā nav vizuāla risinājuma piemērs Seiketsu izpratnē.' },
        { id: 'opt2', text: 'Izmantot sarkanu svītru uz konteinera malas — kad redzama svītra, jāpasūta papildus; piemērot krāsu standartus', consequence: 'Šis ir klasisks Seiketsu vizuālās kontroles risinājums. Uzreiz redzams, bez skaitīšanas, bez tehnoloģijām — vienkāršs un efektīvs.' },
        { id: 'opt3', text: 'Katru dienu manuāli saskaitīt visus komponentus', consequence: 'Manuāla skaitīšana ir laikietilpīga, kļūdaini iespējama un neatbilst Seiketsu vizuālās kontroles principam.' },
      ],
    },
    correctAnswer: 'opt2',
    explanation: 'Seiketsu vizuālā kontrole nozīmē, ka stāvoklis ir uzreiz redzams ikvienam — bez skaitīšanas, bez piekļuves sistēmām. Svītra uz konteinera ir ideāls, vienkāršs risinājums.',
    hint: 'Seiketsu ietver vizuālo kontroli — risinājumam jābūt uzreiz redzamam, bez skaitīšanas.',
    xpReward: 80,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7S sistēma – 10. līmenis: Meistarība
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '7s-10-q1',
    levelId: '7s-10',
    type: 'MultipleChoice',
    prompt: 'Par cik procentiem pieaug ekonomiskā efektivitāte pēc veiksmīgas 7S ieviešanas?',
    data: {
      options: [
        { id: 'a', text: '15%' },
        { id: 'b', text: '25%' },
        { id: 'c', text: '35%' },
        { id: 'd', text: '50%' },
      ],
    },
    correctAnswer: 'c',
    explanation: 'Pēc veiksmīgas 7S ieviešanas ekonomiskā efektivitāte pieaug par 35% — tas ir viens no galvenajiem izmērāmajiem rezultātiem, kas padara 7S par rentablu ieguldījumu.',
    hint: 'Literatūra norāda precīzu procentuālo pieaugumu kā vienu no izmērāmajiem rezultātiem.',
    xpReward: 70,
  },
  {
    id: '7s-10-q2',
    levelId: '7s-10',
    type: 'DragSort',
    prompt: 'Sakārto visus 7 elementus pareizā secībā (japāņu 5S + 2 rietumu papildinājumi).',
    data: {
      items: [
        { id: 'e2', text: 'Sakārtot' },
        { id: 'e6', text: 'Sargāt' },
        { id: 'e1', text: 'Šķirot' },
        { id: 'e4', text: 'Standartizēt' },
        { id: 'e7', text: 'Komandas gars' },
        { id: 'e5', text: 'Stiprināt' },
        { id: 'e3', text: 'Spodrināt' },
      ],
    },
    correctAnswer: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7'],
    explanation: 'Pilnā 7S secība: Šķirot → Sakārtot → Spodrināt → Standartizēt → Stiprināt (japāņu 5S) → Sargāt → Komandas gars (rietumu papildinājumi).',
    hint: 'Pirmie 5 ir oriģinālie japāņu 5S. Pēdējie 2 ir rietumu papildinājumi.',
    xpReward: 80,
  },
  {
    id: '7s-10-q3',
    levelId: '7s-10',
    type: 'Matching',
    prompt: 'Savieno katru 7S elementu ar tā galveno rīku vai metodi.',
    data: {
      left: [
        { id: 'l1', text: 'Šķirot' },
        { id: 'l2', text: 'Sakārtot' },
        { id: 'l3', text: 'Standartizēt' },
        { id: 'l4', text: 'Sargāt' },
      ],
      right: [
        { id: 'r1', text: 'Sarkanā birka metode' },
        { id: 'r2', text: 'Spageti diagramma' },
        { id: 'r3', text: 'Krāsu kodi un vizuālā kontrole' },
        { id: 'r4', text: 'Poka-yoke mehānismi' },
      ],
    },
    correctAnswer: { l1: 'r1', l2: 'r2', l3: 'r3', l4: 'r4' },
    explanation: 'Katram 7S elementam ir sava "zīmola" metode: Šķirot = sarkanā birka, Sakārtot = spageti diagramma, Standartizēt = vizuālā kontrole, Sargāt = Poka-yoke.',
    hint: 'Katram elementam ir sava galvenā metode, kas padara to praktiski īstenojamu.',
    xpReward: 80,
  },
  {
    id: '7s-10-q4',
    levelId: '7s-10',
    type: 'TrueFalse',
    prompt: '7S sistēma ir tikai sākumpunkts — to var papildināt ar TQM, TPM un citām kvalitātes sistēmām.',
    data: { statement: '7S sistēma ir tikai sākumpunkts — to var papildināt ar TQM, TPM un citām kvalitātes sistēmām.' },
    correctAnswer: 'true',
    explanation: '7S apguve ļauj organizācijai sekmīgi ieviest sarežģītākas kvalitātes sistēmas — TQM, TPM, Six Sigma, ISO 9001. Tā rada nepieciešamo disciplīnu un kārtību kā pamatu turpmākai attīstībai.',
    hint: 'Literatūra tieši apgalvo: 7S apguve ļauj sekmīgi ieviest sarežģītākas kvalitātes sistēmas.',
    xpReward: 60,
  },
  {
    id: '7s-10-q5',
    levelId: '7s-10',
    type: 'CaseStudy',
    prompt: 'Uzņēmuma direktors vēlas novērtēt 7S ieviešanas panākumus pēc 1 gada. Kādus rādītājus vajadzētu mērīt?',
    data: {
      scenario: 'Uzņēmuma direktors vēlas objektīvi novērtēt 7S ieviešanas panākumus un ieguvumus pēc 1 gada. Viņš prasa ieteikumu, kādus rādītājus mērīt.',
      options: [
        { id: 'opt1', text: 'Tikai noliktavas uzkrājumu samazinājumu', consequence: 'Viens rādītājs neatspoguļo 7S daudzpusīgo ietekmi. Direktors var nokavēt citus būtiskus uzlabojumus vai problēmas.' },
        { id: 'opt2', text: 'Ekonomisko efektivitāti, traumu skaitu, produktivitāti, kvalitāti, noliktavas krājumus un darbinieku apmierinātību', consequence: 'Visaptveroša mērīšana ļauj novērtēt 7S pilno ietekmi — gan finansiālos ieguvumus, gan drošību, gan kultūras pārmaiņas.' },
        { id: 'opt3', text: 'Tikai darbinieku apmierinātības aptaujas', consequence: 'Aptaujas atspoguļo subjektīvu viedokli, bet neuzrāda finansiālos un operacionālos rezultātus, kas ir svarīgi lēmumu pieņemšanai.' },
      ],
    },
    correctAnswer: 'opt2',
    explanation: '7S ietekme ir daudzpusīga: ekonomiskā efektivitāte (+35%), traumu skaits (-3x), produktivitāte, kvalitāte, noliktavas krājumi un darbinieku apmierinātība — visi šie rādītāji ir jāmēra.',
    hint: '7S ietekme ir daudzpusīga — literatūra min vairākus izmērāmus rādītājus.',
    xpReward: 90,
  },
];
