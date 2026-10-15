export interface CinematicAct {
  id: string;
  actNumber: string; // e.g. "ACT I"
  title: string;
  subtitle: string;
  era: string;
  timeSpan: string;
  accentColor: string;
  heroImage: string;
  heroImageAlt: string;
  secondaryImages?: { url: string; caption: string }[];
  quote: {
    text: string;
    author: string;
    context: string;
  };
  narrativeChronicle: string[];
  metallurgy: {
    baseUnit: string;
    subdivisions: string;
    composition: string;
    mintingMethod: string;
  };
  purchasingPower: {
    standardUnit: string;
    historicalEquivalent: string;
    contemporaryContext: string;
  };
  iconography: {
    symbol: string;
    description: string;
  }[];
  keyFigures: string[];
  legacyNote: string;
}

export const CINEMATIC_ACTS: CinematicAct[] = [
  // ==========================================
  // ACT I: THE DAWN OF SILVER & GOLD
  // ==========================================
  {
    id: 'act-1-ancient',
    actNumber: 'ACT I',
    title: 'The Dawn of Silver & The Golden Age',
    subtitle: 'Punch-Marked Karshapanas & The Silk Road Gold Inflow',
    era: 'Ancient India',
    timeSpan: 'c. 600 BCE – 600 CE',
    accentColor: '#eab308', // Ancient Royal Gold
    heroImage: './specimens/chandragupta_ii_archer_gold_dinar.jpg',
    heroImageAlt: 'Imperial Gupta Gold Dinar of Chandragupta II Vikramaditya',
    secondaryImages: [
      {
        url: './specimens/India_Mauryan_emperor_Ashoka_Punch-marked_Coin.jpg',
        caption: 'Mauryan Punch-Marked Silver Karshapana (3rd Century BCE)'
      },
      {
        url: './specimens/samudragupta_lyrist_gold_dinar.jpg',
        caption: 'Samudragupta Lyrist Gold Dinar with Brahmi Calligraphy'
      }
    ],
    quote: {
      text: 'Not a single year passes without India draining our Empire of fifty-five million sesterces of pure gold and silver in exchange for luxury wares!',
      author: 'Pliny the Elder (77 CE)',
      context: 'Roman Senator & Naturalist lamenting the Mediterranean bullion drain to ancient Indian ports'
    },
    narrativeChronicle: [
      'Along the sacred fertile banks of the Ganges, the sovereign republics and kingdoms of ancient India—the Mahajanapadas—formulated one of civilization’s three independent coinage breakthroughs alongside ancient Lydia and the Yellow River.',
      'Under the Mauryan Empire, royal mentor Chanakya codified the Arthashastra, founding the world’s first state-regulated currency administration under the Lakshanadhyaksha (Superintendent of the Mint) and Rupadarshaka (Examiner of Coins) to test metallurgical fineness.',
      'Centuries later, the Silk Road Kushan monarchs transformed India into an international monetary clearinghouse. By melting down Roman gold Denarii, they minted high-karat gold Dinars. The classical Gupta Empire elevated this sovereign wealth into high art, die-striking magnificent portraits of royalty playing the veena, hunting lions, and honoring the goddess Lakshmi.'
    ],
    metallurgy: {
      baseUnit: 'Karshapana or Pana (Silver) & Suvarna / Dinar (Gold)',
      subdivisions: '1 Karshapana = 16 Mashakas = 64 Kakanis (32 Ratis / ~3.5 grams)',
      composition: '80–90% Pure Silver (Karshapana) / 22–24 Karat Fine Gold (Gupta Dinar)',
      mintingMethod: 'Cold-hammered silver droplets hand-stamped with up to 5 steel punches; later Greek-influenced two-die striking.'
    },
    purchasingPower: {
      standardUnit: '1 Silver Karshapana (c. 300 BCE)',
      historicalEquivalent: '70 kilograms of unhusked paddy rice or a month’s family ration of sesame oil and lentils in Pataliputra.',
      contemporaryContext: 'Equivalent to roughly ₹3,500 – ₹4,000 in purchasing capacity today.'
    },
    iconography: [
      {
        symbol: 'Six-Armed Solar Wheel (Shaddara-chakra)',
        description: 'Imperial Mauryan dynastic authority representing cosmic sovereignty and the wheel of Dharma.'
      },
      {
        symbol: 'Three-Arched Hill with Crescent',
        description: 'Represents the sacred Buddhist Chaitya and cosmic Mount Meru connecting heaven and earth.'
      },
      {
        symbol: 'Goddess Lakshmi on Lotus',
        description: 'Emblem of prosperity, auspicious fortune, and imperial sovereignty on classical Gupta gold coinage.'
      }
    ],
    keyFigures: [
      'Chandragupta Maurya (Founder of Mauryan Empire)',
      'Chanakya / Kautilya (Author of the Arthashastra)',
      'Kanishka I (Kushan Emperor of the Silk Road)',
      'Samudragupta (Gupta Emperor & Patron of the Arts)'
    ],
    legacyNote: 'Established the sacred civilizational principle that money derives its inviolable trust from state-verified metallurgical purity and sovereign insignia.'
  },

  // ==========================================
  // ACT II: THE BIRTH OF THE 'RUPIYA'
  // ==========================================
  {
    id: 'act-2-medieval',
    actNumber: 'ACT II',
    title: 'The Birth of the "Rupiya" & The Mughal Mohur',
    subtitle: 'From Tughlaq’s Token Experiment to Sher Shah Suri’s 178-Grain Masterwork',
    era: 'Medieval & Mughal Empires',
    timeSpan: '1200 – 1764 CE',
    accentColor: '#f59e0b', // Deep Amber & Flame Orange
    heroImage: './specimens/Silver_Coin_of_Sher_Shah_Suri__Shergarh_Mint__circa_950_AH__INHCRF_Coin_Museum__Nashik__Maharashtra.jpg',
    heroImageAlt: 'Original 1540 CE Pure Silver Rupiya of Sher Shah Suri',
    secondaryImages: [
      {
        url: './specimens/jahangir_zodiac_gold_mohur.jpg',
        caption: 'Emperor Jahangir’s Astrological Zodiac Gold Mohur (Leo)'
      },
      {
        url: './specimens/Silver_rupee_coin_of_Akbar__from_Lahore_mint.jpg',
        caption: 'Imperial Silver Rupee of Akbar the Great (Lahore Mint)'
      }
    ],
    quote: {
      text: 'The silver Rupiya of Sher Shah is the basis of the existing British currency... He established the standard of weight and fineness that has endured down to our own days.',
      author: 'Vincent A. Smith',
      context: 'Oxford History of India on the enduring genius of Sher Shah Suri’s monetary reform'
    },
    narrativeChronicle: [
      'In the 14th century, Sultan Muhammad bin Tughlaq attempted civilization’s boldest monetary experiment: issuing copper and brass token coins with face value equal to silver. Without anti-counterfeiting safeguards, every metalsmith forged coins, forcing the Sultan to redeem mountains of tokens with pure silver from the royal vaults.',
      'Out of this chaos arose Sher Shah Suri in 1540 CE. In five visionary years, he swept away debased issues and struck an uncompromisingly pure 178-grain silver coin: the "Rupiya" (from Sanskrit Rūpya, stamped silver).',
      'Akbar the Great adopted this standard across his vast empire. Mints operated with open access: any global merchant could bring bullion to royal karkhanas in Surat or Lahore and receive pristine silver Rupees. Jahangir took this further, minting poetic Persian couplets and astrological Zodiac gold Mohurs.'
    ],
    metallurgy: {
      baseUnit: 'Silver Rupiya (178 troy grains / 11.53 grams)',
      subdivisions: '1 Gold Mohur = 16 Silver Rupees; 1 Silver Rupee = 40 Copper Dams = 1,000 Jitals',
      composition: '97% Pure Silver Bullion / 24 Karat Pure Gold Mohurs',
      mintingMethod: 'Expert Persian calligraphers hand-carved reverse steel dies; blanks were sledgehammer-struck between anvils.'
    },
    purchasingPower: {
      standardUnit: '1 Silver Rupiya (c. 1600 under Akbar)',
      historicalEquivalent: '120 kilograms of wheat flour, or 45 kilograms of pure ghee, or 18 meters of hand-spun fine cotton.',
      contemporaryContext: 'An ordinary artisan or cavalryman earned 2 to 3 Rupees per month, enough to support an entire household.'
    },
    iconography: [
      {
        symbol: 'Persian Poetic Couplets (Bait)',
        description: 'Metered rhyming Persian poetry praising the sovereign as the shadow of God on earth.'
      },
      {
        symbol: 'The Kalima & Rightly Guided Caliphs',
        description: 'Sacred Islamic profession of faith surrounded by the names of Abu Bakr, Umar, Uthman, and Ali.'
      },
      {
        symbol: 'Zodiac Constellations (Burj)',
        description: 'Astrological symbols struck by Jahangir, breaking religious aniconism to celebrate imperial heavens.'
      }
    ],
    keyFigures: [
      'Muhammad bin Tughlaq (Sultan of Delhi & Token Innovator)',
      'Sher Shah Suri (Father of the 178-Grain Silver Rupiya)',
      'Akbar the Great (Institutionalized the Mughal Open-Mint Standard)',
      'Jahangir (Creator of the celebrated Zodiac Mohurs)'
    ],
    legacyNote: 'Sher Shah’s 178-grain silver standard was so trusted that it outlived the Mughal dynasty and served as the exact physical weight of the Indian Rupee until 1940.'
  },

  // ==========================================
  // ACT III: CHARTERED MERCHANTS & EARLY PAPER
  // ==========================================
  {
    id: 'act-3-colonial',
    actNumber: 'ACT III',
    title: 'Chartered Merchants & The First Promissory Paper',
    subtitle: 'From the Diwani of Bengal to Presidency Bank Promissory Notes',
    era: 'Colonial & Presidency Era',
    timeSpan: '1764 – 1857 CE',
    accentColor: '#10b981', // Maritime Emerald & Parchment Green
    heroImage: './specimens/bank_of_bengal_commerce_note.jpg',
    heroImageAlt: 'Historic Bank of Bengal Promissory Note with Commerce Vignette',
    secondaryImages: [
      {
        url: './specimens/bank_of_hindostan_1770.jpg',
        caption: 'Bank of Hindostan (1770) — India’s First Modern Paper Banknote'
      },
      {
        url: './specimens/murshidabad_sicca_rupee.jpg',
        caption: 'East India Company Silver Sicca Rupee (Murshidabad Mint)'
      }
    ],
    quote: {
      text: 'I promise to pay the bearer on demand at the Bank of Bengal, the sum of One Hundred Sicca Rupees for value received.',
      author: 'Bank of Bengal Promissory Clause (1812)',
      context: 'The legal foundation of credit paper replacing cumbersome silver chests across India'
    },
    narrativeChronicle: [
      'Following the Battle of Plassey (1757) and Buxar (1764), the East India Company acquired the revenue collection rights (Diwani) of Bengal, inheriting a bewildering maze of hundreds of regional rupees with arbitrary exchange discounts (Batta).',
      'Transporting heavy chests of silver coin along jungle tracks plagued by highwaymen was perilous. In 1770, merchant agency houses in Calcutta established the Bank of Hindostan, releasing India’s earliest paper banknotes: promissory instruments payable on demand in silver Sicca coin.',
      'The chartered Presidency Banks (Bank of Bengal, Bank of Bombay, Bank of Madras) standardized paper currency. To send funds safely by dak runners, banks literally cut notes in half with scissors! The recipient received the left half first, then the right half; clerks verified watermarks and pasted them back together before paying out.'
    ],
    metallurgy: {
      baseUnit: 'Sicca Rupee / Company Rupee (1835)',
      subdivisions: '1 Company Rupee = 16 Annas = 64 Pice = 192 Pies',
      composition: 'Handmade cotton rag parchment watermarked with Britannia motifs and deckled edges.',
      mintingMethod: 'Intaglio copperplate and steel plate press printing with hand-inscribed serial numbers and clerk signatures.'
    },
    purchasingPower: {
      standardUnit: '100 Sicca Rupees Paper Note (1812)',
      historicalEquivalent: 'Equal to 1,200 kilograms of fine rice, a herd of 15 milch cows, or nearly three years of salary for a clerk.',
      contemporaryContext: 'Equivalent to roughly ₹1,50,000 – ₹2,00,000 in modern purchasing value.'
    },
    iconography: [
      {
        symbol: 'Allegory of Britannia',
        description: 'Classical personification of British maritime dominance seated with trident, shield, and olive branch.'
      },
      {
        symbol: 'Four-Script Security Header',
        description: 'Denominations inscribed in English, Bengali, Persian, and Kaithi/Devanagari for cross-provincial trust.'
      },
      {
        symbol: 'The Mercantile Beehive',
        description: 'Classical emblem of commercial industry, thrifty savings, and collaborative banking enterprise.'
      }
    ],
    keyFigures: [
      'Robert Clive & Warren Hastings (Company Administrators)',
      'Prince Dwarkanath Tagore (Pioneering Indian Director of the Bank of Bengal)',
      'Lord William Bentinck (Promulgated the unified Coinage Act of 1835)'
    ],
    legacyNote: 'Proved to the subcontinent that paper backed by institutional credit and watermarks could successfully replace physical bullion for long-distance trade.'
  },

  // ==========================================
  // ACT IV: THE IMPERIAL CROWN & THE RBI
  // ==========================================
  {
    id: 'act-4-pre-independence',
    actNumber: 'ACT IV',
    title: 'The Imperial Crown & The Sovereign Reserve Bank',
    subtitle: 'From Queen Victoria Uniface Notes to the Birth of the RBI in 1935',
    era: 'British Raj & The Freedom Era',
    timeSpan: '1858 – 1947 CE',
    accentColor: '#06b6d4', // Victorian Steel & Imperial Cyan
    heroImage: './specimens/george_vi_first_rbi_5_rupees.jpg',
    heroImageAlt: 'First Reserve Bank of India 5 Rupee Note with King George VI (1938)',
    secondaryImages: [
      {
        url: './specimens/victoria_uniface_note.jpg',
        caption: 'Government of India Queen Victoria Uniface Note (Paper Currency Act 1861)'
      },
      {
        url: './specimens/george_v_1917_one_rupee.jpg',
        caption: 'First Indian One Rupee Note (1917) issued during World War I Silver Crisis'
      }
    ],
    quote: {
      text: 'The Reserve Bank of India commenced operations on April 1, 1935, taking over the sovereign responsibility of currency issue from the Government.',
      author: 'Preamble, Reserve Bank of India Act (1934)',
      context: 'Establishment of an independent central banking authority for South Asia'
    },
    narrativeChronicle: [
      'Following the 1857 Uprising, the British Crown assumed direct rule. In 1861, Finance Member James Wilson passed the landmark Paper Currency Act, establishing a state monopoly over paper issuance and debuting the legendary Uniface Victoria banknotes printed in Hampshire.',
      'World War I sparked an unprecedented run on silver coin. To prevent the collapse of the economy, the Government introduced India’s very first One Rupee and Two-and-a-Half Rupee paper notes on November 30, 1917. In 1928, India opened the India Security Press at Nasik, ending dependence on foreign printers.',
      'On April 1, 1935, the Reserve Bank of India was born. In January 1938, the RBI issued its first banknote: a 5-Rupee note featuring King George VI. Under Sir C.D. Deshmukh, the first Indian Governor, the RBI safeguarded currency integrity through the turbulent final years of imperial rule.'
    ],
    metallurgy: {
      baseUnit: 'Indian Rupee (11.66 grams of .917 fine silver until 1940; quaternary alloy 1940–45; pure nickel 1946)',
      subdivisions: '1 Rupee = 16 Annas = 64 Pice = 192 Pies',
      composition: 'Mould-made 100% cotton rag paper with embedded continuous metallic security thread (introduced 1944).',
      mintingMethod: 'Intaglio rainbow guilloche printing at Nasik with precision mechanical numbering machines.'
    },
    purchasingPower: {
      standardUnit: '1 Rupee Note (c. 1935 during Great Depression)',
      historicalEquivalent: '15 liters of fresh cow milk, or 8 kilograms of wheat flour, or a 100-kilometer third-class rail ticket.',
      contemporaryContext: 'Gold traded between ₹18 and ₹30 per sovereign (8 grams); today that same gold is worth over ₹65,000!'
    },
    iconography: [
      {
        symbol: 'Imperial Robes of State & Crown',
        description: 'Portrait of British monarchs adorned with the Imperial Crown of India and Star of India collar.'
      },
      {
        symbol: 'Rayed Star & Monarch Watermark',
        description: 'Intricate multi-tonal watermark portrait of George V / George VI visible when held against light.'
      },
      {
        symbol: 'Rainbow Guilloche Security Rosettes',
        description: 'Complex geometric interlocking line mathematics engineered to defeat photographic replication.'
      }
    ],
    keyFigures: [
      'James Wilson (First Finance Member & Creator of 1861 Paper Currency Act)',
      'Sir Osborne Smith (First Governor of the Reserve Bank of India, 1935)',
      'Sir Chintaman D. Deshmukh (First Indian Governor of the RBI, 1943–1949)',
      'King George VI (Emperor whose portrait graced wartime Indian currency)'
    ],
    legacyNote: 'Founded the Reserve Bank of India as the sole sovereign issuer of banknotes and established domestic security printing at Nasik.'
  },

  // ==========================================
  // ACT V: DAWN OF THE REPUBLIC
  // ==========================================
  {
    id: 'act-5-early-republic',
    actNumber: 'ACT V',
    title: 'Dawn of the Sovereign Republic',
    subtitle: 'Replacing the Monarch with the Sarnath Lion Capital of Ashoka',
    era: 'Early Republic of India',
    timeSpan: '1947 – 1957 CE',
    accentColor: '#38bdf8', // Sarnath Stone & Free Skies Blue
    heroImage: './specimens/republic_1949_one_rupee.jpg',
    heroImageAlt: 'Historical 1949 First One Rupee Note of Independent India',
    secondaryImages: [
      {
        url: './specimens/republic_1950_one_rupee_coin_obs.jpg',
        caption: '1950 Republic of India One Rupee Coin with Ashoka Lion Capital'
      },
      {
        url: './specimens/british_india_10000_rupees.jpg',
        caption: '1954 Giant 10,000 Rupee Note (Largest Denomination in Indian History)'
      }
    ],
    quote: {
      text: 'In place of the portrait of the British King, the symbol of the new sovereign Republic—the Ashoka Pillar of Sarnath—shall henceforth be the national emblem on all currency.',
      author: 'Government of India Declaration (1949)',
      context: 'Replacing imperial monarchical portraits with the ancient emblem of moral righteousness'
    },
    narrativeChronicle: [
      'At midnight on August 15, 1947, India became free. But millions of King George VI notes remained in circulation. The newly independent nation could not instantaneously scrap its currency overnight without paralyzing everyday commerce.',
      'The transformative milestone arrived on August 15, 1949, with the release of the first One Rupee note of Independent India. In place of the foreign king’s portrait stood the Ashoka Pillar Lion Capital from Sarnath—four lions standing back-to-back above the Dharma wheel, symbolizing truth, moral courage, and peace.',
      'On Republic Day 1950, new coinage was minted in pure nickel. In 1954, high-denomination notes of ₹1,000, ₹5,000, and massive ₹10,000 notes measuring 203 × 127 mm were reintroduced to facilitate post-war economic modernization and infrastructure development.'
    ],
    metallurgy: {
      baseUnit: 'One Rupee (Pure Nickel Coin / 100% Cotton Note)',
      subdivisions: '1 Rupee = 16 Annas = 64 Pice = 192 Pies (Pre-decimal system maintained)',
      composition: 'Pure electrolytic nickel coinage; security rag paper with Ashoka Pillar watermark.',
      mintingMethod: 'Industrial steam and electric presses at Bombay, Calcutta, and Hyderabad mints; Nasik Press.'
    },
    purchasingPower: {
      standardUnit: '1 Rupee (1950)',
      historicalEquivalent: '5 kilograms of rice, 2 liters of pure milk, or a full multi-course restaurant meal in Calcutta.',
      contemporaryContext: 'A primary school teacher earned ₹35 to ₹50 per month, which supported a multi-generational family.'
    },
    iconography: [
      {
        symbol: 'The Sarnath Lion Capital',
        description: 'National Emblem of India featuring four Asiatic lions, the galloping horse, and humped bull.'
      },
      {
        symbol: 'Satyameva Jayate',
        description: 'Ancient Upanishadic motto: "Truth Alone Triumphs", integrated into the national heraldry.'
      },
      {
        symbol: 'Dhow Sailing Boat & Leaping Gazelles',
        description: 'Replaced colonial heraldry with Indian wildlife, coastal seafaring heritage, and rural harmony.'
      }
    ],
    keyFigures: [
      'Jawaharlal Nehru (First Prime Minister of Independent India)',
      'Sardar Vallabhbhai Patel (Unified 565 Princely States under one currency)',
      'Dr. B.R. Ambedkar (Chief Architect of the Constitution & author of The Problem of the Rupee)',
      'Sir Benegal Rama Rau (Longest-serving RBI Governor, 1949–1957)'
    ],
    legacyNote: 'Permanently enshrined the Ashoka Pillar Lion Capital as the immortal visual emblem of free India’s currency.'
  },

  // ==========================================
  // ACT VI: THE DECIMAL REVOLUTION
  // ==========================================
  {
    id: 'act-6-decimal',
    actNumber: 'ACT VI',
    title: 'The Decimal Revolution & Nation Building',
    subtitle: 'From Annas to 100 Naye Paise, The Green Revolution & Gandhi Centenary',
    era: 'Decimal Transition & Industrial India',
    timeSpan: '1957 – 1996 CE',
    accentColor: '#ec4899', // Industrial Coral & Modernist Magenta
    heroImage: './specimens/gandhi_centenary_1969_10_rupees.jpg',
    heroImageAlt: '1969 Mahatma Gandhi Birth Centenary 10 Rupee Note',
    secondaryImages: [
      {
        url: './specimens/decimal_1957_ten_naye_paise_obs.jpg',
        caption: '1957 First Decimal 10 Naye Paise Coin'
      },
      {
        url: './specimens/tractor_farm_5_rupees.jpg',
        caption: 'Iconic Green Revolution ₹5 Note with Modern Tractor at Sunrise'
      },
      {
        url: './specimens/aryabhata_satellite_2_rupees.jpg',
        caption: '₹2 Note Celebrating Aryabhata — India’s First Space Satellite'
      }
    ],
    quote: {
      text: 'From the first of April 1957, the Rupee will be divided into 100 units, each called a Naya Paisa. Let the whole nation embrace this rational metric order.',
      author: 'All India Radio Broadcast (1957)',
      context: 'Nationwide literacy campaign announcing the end of the ancient 16-anna monetary math'
    },
    narrativeChronicle: [
      'For centuries, Indian merchants calculated in fractions: 1 Rupee was 16 Annas, 1 Anna was 4 Paise, 1 Paisa was 3 Pies. As Five-Year Plans laid industrial foundations, Parliament passed the Indian Coinage Act of 1955, launching complete Decimalization on April 1, 1957: 1 Rupee = 100 Naye Paise.',
      'In 1969, to commemorate the birth centenary of Mahatma Gandhi, the RBI made a historic aesthetic departure: issuing the very first banknote featuring Gandhi seated in his Sevagram Ashram.',
      'Throughout the 1970s and 80s, banknotes celebrated self-reliance: the Green Revolution tractor on ₹5, Aryabhata satellite on ₹2, and Sagar Samrat offshore oil rig on ₹1. In 1978, ₹1,000, ₹5,000, and ₹10,000 notes were demonetized; in 1987, inflation prompted the introduction of the first modern ₹500 note featuring the Dandi March.'
    ],
    metallurgy: {
      baseUnit: 'Decimal Rupee = 100 Paise (Naya dropped in 1964)',
      subdivisions: '1, 2, 3, 5, 10, 20, 25, 50 Paise; ₹1, ₹2, ₹5, ₹10, ₹20, ₹50, ₹100, ₹500',
      composition: 'Aluminium-Magnesium scalloped coins replacing cupro-nickel; Security paper from SPM Hoshangabad.',
      mintingMethod: 'Domestic banknote paper produced at Security Paper Mill, Hoshangabad (inaugurated 1967).'
    },
    purchasingPower: {
      standardUnit: '1 Rupee (1970)',
      historicalEquivalent: '1 liter of petrol (which cost 98 paise in 1970), a pack of biscuits, or sending 5 domestic letters.',
      contemporaryContext: 'A high-denomination ₹100 note in 1980 bought a family’s entire monthly grocery basket.'
    },
    iconography: [
      {
        symbol: 'Modern Farm Tractor & Sunrise',
        description: 'Triumphant symbol of the Green Revolution and agricultural food security on the ₹5 note.'
      },
      {
        symbol: 'Aryabhata Space Satellite',
        description: 'Celebrating India’s entry into the space age with its first indigenous satellite launched in 1975.'
      },
      {
        symbol: 'Dandi March (Gyarah Murti)',
        description: 'Mahatma Gandhi leading 11 freedom satyagrahis on the historic 1930 Salt March on the ₹500 note.'
      }
    ],
    keyFigures: [
      'Lal Bahadur Shastri (Prime Minister championing Jai Jawan Jai Kisan)',
      'Indira Gandhi (Prime Minister during nationalization of banks in 1969)',
      'Dr. Manmohan Singh (RBI Governor 1982–1985 overseeing monetary expansion)',
      'I.G. Patel (RBI Governor during the 1978 High-Denomination Demonetization)'
    ],
    legacyNote: 'Modernized Indian arithmetic into base-10 decimal science and immortalized India’s agricultural and scientific independence on paper money.'
  },

  // ==========================================
  // ACT VII: THE MAHATMA GANDHI ERA & THE NEW SERIES
  // ==========================================
  {
    id: 'act-7-modern',
    actNumber: 'ACT VII',
    title: 'The Mahatma Gandhi Era & The ₹ Revolution',
    subtitle: 'From the 1996 Uniform Series and 2010 ₹ Glyph to the 2016 Transformation',
    era: 'Modern India',
    timeSpan: '1996 – Present',
    accentColor: '#d946ef', // Vibrant Magenta & Ultraviolet
    heroImage: './specimens/mg_new_2000_front.jpg',
    heroImageAlt: '2016 Mahatma Gandhi (New) Series ₹2,000 Note with Mangalyaan',
    secondaryImages: [
      {
        url: './specimens/mg_new_500_front.jpg',
        caption: 'Stone Grey ₹500 Note featuring the Red Fort at Delhi'
      },
      {
        url: './specimens/mg_new_100_front.jpg',
        caption: 'Lavender ₹100 Note featuring Rani Ki Vav (UNESCO Stepwell)'
      },
      {
        url: './specimens/mg_1996_1000_front.jpg',
        caption: 'Historic 2000 Series ₹1,000 Note (Demod on Nov 8, 2016)'
      }
    ],
    quote: {
      text: 'The symbol of the Indian Rupee represents the amalgamation of the Devanagari "Ra" and the Latin Capital "R", embodying India’s cultural heritage and global financial stature.',
      author: 'D. Udaya Kumar (2010)',
      context: 'Designer of the official global ₹ currency symbol adopted by the Union Cabinet'
    },
    narrativeChronicle: [
      'In 1996, the RBI unified all denominations under the landmark Mahatma Gandhi Series. Based on a 1946 photograph of Gandhi alongside Lord Pethick-Lawrence, the series introduced world-class anti-counterfeiting physics: shaded watermarks, windowed security threads, micro-lettering, and raised intaglio tactile marks for the visually impaired.',
      'In 2010, India joined the US Dollar, British Pound, and Euro in possessing its own global glyph: ₹, designed by D. Udaya Kumar. The symbol merged Devanagari "र" with Latin "R", crossed by two horizontal tricolour stripes.',
      'At 8:15 PM on November 8, 2016, existing ₹500 and ₹1,000 notes ceased to be legal tender. Over subsequent months, the RBI released the Mahatma Gandhi (New) Series: vibrant, pastel-hued, architecturally themed notes celebrating Konark, Ellora, Hampi, Rani Ki Vav, Sanchi Stupa, Red Fort, and the interplanetary Mangalyaan mission on the iconic magenta ₹2,000 note.'
    ],
    metallurgy: {
      baseUnit: 'Indian Rupee (₹)',
      subdivisions: '₹1, ₹2, ₹5, ₹10, ₹20, ₹50, ₹100, ₹200, ₹500, ₹2,000',
      composition: '100% pure cotton rag paper with embedded dual-color fluorescent security fibers and windowed color-shifting threads.',
      mintingMethod: 'Intaglio, letterpress, offset lithography, and Optically Variable Ink (OVI) printed across Nasik, Dewas, Salboni, and Mysuru.'
    },
    purchasingPower: {
      standardUnit: '₹100 (2026)',
      historicalEquivalent: 'Purchases two cups of barista coffee, a short metro ride, or instant digital grocery delivery.',
      contemporaryContext: 'Represents everyday convenience in a fast-paced $4-trillion consumer economy.'
    },
    iconography: [
      {
        symbol: 'The Indian Rupee Glyph (₹)',
        description: 'Global symbol blending Devanagari "र" and Latin "R" with equal economic stripes.'
      },
      {
        symbol: 'Mangalyaan (Mars Orbiter Mission)',
        description: 'India’s historic first interplanetary spacecraft orbiting Mars, celebrated on the ₹2,000 note.'
      },
      {
        symbol: 'UNESCO Architectural Heritage Motifs',
        description: 'Rani Ki Vav, Konark Sun Temple, Hampi Stone Chariot, and Sanchi Stupa celebrating millennia of stone art.'
      }
    ],
    keyFigures: [
      'D. Udaya Kumar (Designer of the official ₹ Indian Rupee Symbol)',
      'Dr. Bimal Jalan & Dr. Y.V. Reddy (Governors who expanded the 1996 Gandhi Series)',
      'Dr. Raghuram Rajan & Dr. Urjit Patel (Overseeing clean note policies & 2016 transition)'
    ],
    legacyNote: 'Endowed India with a globally recognized currency symbol and integrated world-class multi-angle security features into everyday cash.'
  },

  // ==========================================
  // ACT VIII: THE SOVEREIGN DIGITAL HORIZON
  // ==========================================
  {
    id: 'act-8-digital',
    actNumber: 'ACT VIII',
    title: 'The Sovereign Digital Horizon',
    subtitle: 'From UPI Real-Time Rails to the Reserve Bank Digital Rupee (e₹)',
    era: 'Digital Age & Beyond',
    timeSpan: '2022 & Beyond',
    accentColor: '#6366f1', // Quantum Cyber Indigo & Neon Gold
    heroImage: './specimens/100RS_Digital_Rupee.png',
    heroImageAlt: 'Reserve Bank of India 100 Digital Rupee (e₹) Sovereign Token',
    secondaryImages: [
      {
        url: './specimens/2000RS_Digital_Rupee.png',
        caption: '2,000 Digital Rupee (e₹) Wholesale & Retail CBDC Token'
      },
      {
        url: './specimens/digital_rupee_obverse.svg',
        caption: 'Cryptographic Sovereign Architecture of the Digital Rupee (e₹)'
      }
    ],
    quote: {
      text: 'The Digital Rupee is the same as the sovereign currency note issued by the Reserve Bank. It is legal tender, non-interest bearing, and backed 100% by the sovereign balance sheet of India.',
      author: 'Reserve Bank of India Concept Note (2022)',
      context: 'Official declaration inaugurating India’s Central Bank Digital Currency (CBDC)'
    },
    narrativeChronicle: [
      'At the dawn of the 21st century, economists predicted developing economies would take decades to shed cash. India stunned the world. Powered by the Unified Payments Interface (UPI) developed by the NPCI, India built the world’s most prolific real-time financial rail: roadside chai stalls and multi-billion-dollar conglomerates alike transact instantly via interoperable QR codes, conducting over 13 billion transactions each month.',
      'Yet private bank servers and wallets depend on intermediaries. To preserve the sovereign finality of cash in a paperless age, the RBI launched the Central Bank Digital Currency: the Digital Rupee (e₹) in December 2022.',
      'The Digital Rupee is not a cryptocurrency: it is sovereign cash in digital form, issued in exact paper denominations (₹1 to ₹2,000) carrying unique cryptographic serial numbers directly on the central bank ledger. From 600 BCE silver Karshapanas to quantum bits in 2026, the Rupee’s 2,500-year journey continues.'
    ],
    metallurgy: {
      baseUnit: 'Digital Rupee (e₹-R for Retail, e₹-W for Wholesale)',
      subdivisions: 'Exact 1:1 parity with physical banknotes: 50p, ₹1, ₹2, ₹5, ₹10, ₹20, ₹50, ₹100, ₹200, ₹500, ₹2,000',
      composition: 'Cryptographically signed digital token tokens stored in sovereign hardware enclaves.',
      mintingMethod: 'Distributed ledger technology & cryptographic consensus managed directly by the Reserve Bank of India.'
    },
    purchasingPower: {
      standardUnit: '100 e₹ Token',
      historicalEquivalent: 'Possesses identical 1:1 purchasing power with a crisp paper 100-Rupee note anywhere in the world.',
      contemporaryContext: 'Enables offline peer-to-peer micro-payments, cross-border remittances, and automated programmable finance.'
    },
    iconography: [
      {
        symbol: 'Cryptographic Quantum ₹ Token',
        description: 'The national ₹ glyph encircled by glowing cryptographic blockchain validation rings.'
      },
      {
        symbol: 'Universal Bharat QR / UPI Interoperability',
        description: 'Instant friction-free settlement linking hundreds of millions of smartphone screens.'
      },
      {
        symbol: 'Zero-Fee Sovereign Finality',
        description: 'Eliminates card-swipe transaction charges, protecting merchant profits and economic velocity.'
      }
    ],
    keyFigures: [
      'Shaktikanta Das (RBI Governor inaugurating the Digital Rupee CBDC pilot in 2022)',
      'Nandan Nilekani (Pioneering public digital infrastructure architect & UPI champion)',
      'National Payments Corporation of India (NPCI — Engineering India’s digital financial rails)'
    ],
    legacyNote: 'Completes 2,500 years of monetary evolution: demonstrating that whether cold-punched on silver, inked on cotton rag, or encoded in cryptographic bits, the Rupee remains the sovereign pulse of India.'
  }
];
