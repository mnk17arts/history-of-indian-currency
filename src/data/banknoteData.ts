export interface BanknoteFeature {
  id: string;
  num: string; // '01', '02', etc.
  title: string;
  description: string;
  side: 'obverse' | 'reverse';
  coordinates: { x: number; y: number }; // percentage on banknote image
  featureImage?: string;
  gifUrl?: string; // Optional animated inspection GIF (2-3 frame loop)
}

export interface BanknoteModel {
  id: string;
  denomination: string;
  numeral: number;
  series: 'Mahatma Gandhi New Series' | 'Mahatma Gandhi Series';
  year: string;
  dimensions: string;
  color: string;
  accent: string;
  motifTitle: string;
  motifDescription: string;
  obverseImage: string;
  reverseImage: string;
  designFeatures: BanknoteFeature[];
  securityFeatures: BanknoteFeature[];
  isDemonetized?: boolean;
  demonetizedDate?: string;
  demonetizationNotice?: string;
}

export const BANKNOTE_SERIES = [
  'Mahatma Gandhi New Series',
  'Mahatma Gandhi Series'
] as const;

export const BANKNOTE_DATA: BanknoteModel[] = [
  // ==========================================
  // MAHATMA GANDHI NEW SERIES (2016 - PRESENT)
  // ==========================================
  {
    id: 'mg-new-2000',
    denomination: '₹ 2,000',
    numeral: 2000,
    series: 'Mahatma Gandhi New Series',
    year: '2016',
    dimensions: '166 mm × 66 mm',
    color: 'Magenta',
    accent: '#d946ef',
    motifTitle: 'Mangalyaan (Mars Orbiter Mission)',
    motifDescription: "India's landmark first interplanetary expedition launched by ISRO, highlighting indigenous scientific prowess and geometric patterns on both sides.",
    obverseImage: './specimens/mg_new_2000_front.jpg',
    reverseImage: './specimens/mg_new_2000_back.webp',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-2000-d1',
        num: '01',
        title: 'See-Through Register 2000',
        description: 'On the bottom left of the note is a see-through register with the denominational numeral ‘2000’, that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 9.8, y: 55.5 },
        gifUrl: './banknotes/features/feat-2000-d1.webp'
      },
      {
        id: 'feat-2000-d2',
        num: '02',
        title: 'Denominational Numeral in Devanagari',
        description: 'The denominational numeral ‘2000’ is written in Devanagari on the banknote.',
        side: 'obverse',
        coordinates: { x: 23.0, y: 40.8 },
        gifUrl: './banknotes/features/feat-2000-d2.webp'
      },
      {
        id: 'feat-2000-d3',
        num: '03',
        title: 'Portrait of Mahatma Gandhi',
        description: 'The portrait of Mahatma Gandhi can be seen in the centre of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 43.4, y: 23.2 },
        gifUrl: './banknotes/features/feat-2000-d3.webp'
      },
      {
        id: 'feat-2000-d4',
        num: '04',
        title: "Guarantee Clause, Governor's Signature & RBI Emblem",
        description: "On the right side of the note is the Guarantee clause, the Governor's signature with a promise of payment & the RBI emblem.",
        side: 'obverse',
        coordinates: { x: 63.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-2000-d4.webp'
      },
      {
        id: 'feat-2000-d5',
        num: '05',
        title: 'Number Panel (Top Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the top left side of the note.',
        side: 'obverse',
        coordinates: { x: 14.1, y: 29.5 },
        gifUrl: './banknotes/features/feat-2000-d5.webp'
      },
      {
        id: 'feat-2000-d6',
        num: '06',
        title: 'Number Panel (Bottom Right)',
        description: 'The number panel with numerals growing from small to big can also be seen on the bottom right side of the note.',
        side: 'obverse',
        coordinates: { x: 75.5, y: 89.5 },
        gifUrl: './banknotes/features/feat-2000-d6.webp'
      },
      {
        id: 'feat-2000-d7',
        num: '07',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 94.9, y: 91.6 },
        gifUrl: './banknotes/features/feat-2000-d7.webp'
      },

      // Back (Reverse) Design Features (01 - 04)
      {
        id: 'feat-2000-rev-d1',
        num: '01',
        title: 'Year of Printing',
        description: 'The year of printing can be seen on the reverse of the note on the top left.',
        side: 'reverse',
        coordinates: { x: 5.7, y: 18.0 },
        gifUrl: './banknotes/features/feat-2000-rev-d1.webp'
      },
      {
        id: 'feat-2000-rev-d2',
        num: '02',
        title: 'Swachh Bharat Logo',
        description: 'The Swachh Bharat logo with the slogan ‘एक कदम स्वच्छता की ओर’ i.e. \'one step towards cleanliness\' is seen on reverse of the note, at the bottom left side.',
        side: 'reverse',
        coordinates: { x: 17.0, y: 64.4 },
        gifUrl: './banknotes/features/feat-2000-rev-d2.webp'
      },
      {
        id: 'feat-2000-rev-d3',
        num: '03',
        title: 'Language Panel',
        description: 'The language panel is seen on the reverse of the note, in the centre. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 33.5, y: 17.2 },
        gifUrl: './banknotes/features/feat-2000-rev-d3.webp'
      },
      {
        id: 'feat-2000-rev-d4',
        num: '04',
        title: 'Mangalyaan Motif',
        description: 'On the reverse of the note, is the Mangalyaan motif - depicting the country\'s first venture into interplanetary space.',
        side: 'reverse',
        coordinates: { x: 58.5, y: 37.1 },
        gifUrl: './banknotes/features/feat-2000-rev-d4.webp'
      }
    ],
    securityFeatures: [
      // Common Security Features (01 - 12)
      {
        id: 'feat-2000-s1',
        num: '01',
        title: 'Latent Image 2000',
        description: 'A latent image with the denominational numeral ‘2000’ is on the bottom left. To view, hold the note at a 45-degree angle at eye level.',
        side: 'obverse',
        coordinates: { x: 7.7, y: 87.1 },
        gifUrl: './banknotes/features/feat-2000-s1.webp'
      },
      {
        id: 'feat-2000-s2',
        num: '02',
        title: 'Colour-Shifting Security Thread',
        description: 'Colour thread changes colour from green to blue when the note is tilted.',
        side: 'obverse',
        coordinates: { x: 56.8, y: 13.9 },
        gifUrl: './banknotes/features/feat-2000-s2.webp'
      },
      {
        id: 'feat-2000-s3',
        num: '03',
        title: "Micro Letters 'भारत' & 'INDIA'",
        description: "The micro letters 'भारत' & 'INDIA' can be seen on Mahatma Gandhi's shawl fold.",
        side: 'obverse',
        coordinates: { x: 48.5, y: 81.6 },
        gifUrl: './banknotes/features/feat-2000-s3.webp'
      },
      {
        id: 'feat-2000-s4',
        num: '04',
        title: "Micro Letters 'RBI'",
        description: "The micro letters 'RBI' can be seen on Mahatma Gandhi's spectacles’ frame.",
        side: 'obverse',
        coordinates: { x: 52.1, y: 51.5 },
        gifUrl: './banknotes/features/feat-2000-s4.webp'
      },
      {
        id: 'feat-2000-s5',
        num: '05',
        title: "Micro Letters 'RBI2000INDIA'",
        description: "The micro letters 'RBI2000INDIA' can be seen on the left side of the bank note.",
        side: 'obverse',
        coordinates: { x: 6.8, y: 47.9 },
        gifUrl: './banknotes/features/feat-2000-s5.webp'
      },
      {
        id: 'feat-2000-s6',
        num: '06',
        title: 'Watermark & Electrotype 2000',
        description: 'The Mahatma Gandhi portrait and electrotype (2000) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 78.3, y: 29.6 },
        gifUrl: './banknotes/features/feat-2000-s6.webp'
      },
      {
        id: 'feat-2000-s7',
        num: '07',
        title: 'Colour-Changing Ink (OVI) ₹2000',
        description: "The denomination 2000 along with the rupee symbol can be seen on the lower right side of the obverse. When the note is tilted, the color of '₹2000' changes from green to blue.",
        side: 'obverse',
        coordinates: { x: 74.0, y: 63.1 },
        gifUrl: './banknotes/features/feat-2000-s7.webp'
      },
      {
        id: 'feat-2000-s8',
        num: '08',
        title: 'Raised Print Horizontal Rectangle',
        description: 'You can see a horizontal rectangle with ‘₹2000’ in raised print on the right side of the note.',
        side: 'obverse',
        coordinates: { x: 93.3, y: 50.4 },
        gifUrl: './banknotes/features/feat-2000-s8.webp'
      },
      {
        id: 'feat-2000-s9',
        num: '09',
        title: 'Seven Angular Bleed Lines',
        description: 'To aid the visually impaired, seven angular bleed lines on left and right side in raised printing is seen on the obverse side',
        side: 'obverse',
        coordinates: { x: 96.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-2000-s9.webp'
      },
      {
        id: 'feat-2000-s10',
        num: '10',
        title: 'Raised Print Ashoka Pillar Emblem',
        description: 'To aid the visually impaired, Intaglio or raised printing is seen and felt on the Ashoka Pillar emblem',
        side: 'obverse',
        coordinates: { x: 94.2, y: 90.2 },
        gifUrl: './banknotes/features/feat-2000-s10.webp'
      },
      {
        id: 'feat-2000-s11',
        num: '11',
        title: 'Raised Print Mahatma Gandhi Portrait',
        description: 'To aid the visually impaired, Intaglio or raised printing is seen and felt on the Mahatma Gandhi portrait.',
        side: 'obverse',
        coordinates: { x: 41.5, y: 23.8 },
        gifUrl: './banknotes/features/feat-2000-s11.webp'
      },
      {
        id: 'feat-2000-s12',
        num: '12',
        title: 'Fluorescent Security Thread & Fibres',
        description: "Under UV light, the security thread emits fluorescence & dual colour fluorescent fibres are seen in the paper. You can also read the inscriptions 'भारत' and ‘RBI’ under the UV light.",
        side: 'obverse',
        coordinates: { x: 55.2, y: 32.4 },
        gifUrl: './banknotes/features/feat-2000-s12.webp'
      }
    ]
  },

  {
    id: 'mg-new-500',
    denomination: '₹ 500',
    numeral: 500,
    series: 'Mahatma Gandhi New Series',
    year: '2016',
    dimensions: '150 mm × 66 mm',
    color: 'Stone Grey',
    accent: '#94a3b8',
    motifTitle: 'Red Fort (Lal Qila), Delhi',
    motifDescription: 'The historic Mughal fortification in Delhi with the Indian National Flag hoisted at the ramparts, celebrating national sovereignty and Independence Day heritage.',
    obverseImage: './specimens/mg_new_500_front.jpg',
    reverseImage: './specimens/mg_new_500_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-500-d1',
        num: '01',
        title: 'See-Through Register 500',
        description: 'On the bottom left of the note is a see-through register with the denominational numeral ‘500’, that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 9.8, y: 55.5 },
        gifUrl: './banknotes/features/feat-500-d1.webp'
      },
      {
        id: 'feat-500-d2',
        num: '02',
        title: 'Denominational Numeral in Devanagari',
        description: 'The denominational numeral ‘500’ is written in Devanagari on the banknote.',
        side: 'obverse',
        coordinates: { x: 23.0, y: 40.8 },
        gifUrl: './banknotes/features/feat-500-d2.webp'
      },
      {
        id: 'feat-500-d3',
        num: '03',
        title: 'Portrait of Mahatma Gandhi',
        description: 'The portrait of Mahatma Gandhi can be seen in the centre of the banknote, on the obverse side.',
        side: 'obverse',
        coordinates: { x: 43.4, y: 23.2 },
        gifUrl: './banknotes/features/feat-500-d3.webp'
      },
      {
        id: 'feat-500-d4',
        num: '04',
        title: "Guarantee Clause, Governor's Signature & RBI Emblem",
        description: "On the right side of the note is the Guarantee clause, the Governor's signature with a promise of payment & the RBI emblem.",
        side: 'obverse',
        coordinates: { x: 63.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-500-d4.webp'
      },
      {
        id: 'feat-500-d5',
        num: '05',
        title: 'Number Panel (Top Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the top left side of the note.',
        side: 'obverse',
        coordinates: { x: 14.1, y: 29.5 },
        gifUrl: './banknotes/features/feat-500-d5.webp'
      },
      {
        id: 'feat-500-d6',
        num: '06',
        title: 'Number Panel (Bottom Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom right side of the note.',
        side: 'obverse',
        coordinates: { x: 75.5, y: 89.5 },
        gifUrl: './banknotes/features/feat-500-d6.webp'
      },
      {
        id: 'feat-500-d7',
        num: '07',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 94.9, y: 91.6 },
        gifUrl: './banknotes/features/feat-500-d7.webp'
      },

      // Back (Reverse) Design Features (01 - 05)
      {
        id: 'feat-500-rev-d1',
        num: '01',
        title: 'Year of Printing',
        description: 'The year of printing can be seen on the reverse of the note on the top left.',
        side: 'reverse',
        coordinates: { x: 5.7, y: 18.0 },
        gifUrl: './banknotes/features/feat-500-rev-d1.webp'
      },
      {
        id: 'feat-500-rev-d2',
        num: '02',
        title: 'Swachh Bharat Logo',
        description: 'The Swachh Bharat logo with the slogan ‘एक कदम स्वच्छता की ओर’ i.e. \'one step towards cleanliness\' is seen on reverse of the note, at the bottom left side.',
        side: 'reverse',
        coordinates: { x: 17.0, y: 64.4 },
        gifUrl: './banknotes/features/feat-500-rev-d2.webp'
      },
      {
        id: 'feat-500-rev-d3',
        num: '03',
        title: 'Language Panel',
        description: 'The language panel is seen on the reverse of the note, in the centre. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 33.5, y: 17.2 },
        gifUrl: './banknotes/features/feat-500-rev-d3.webp'
      },
      {
        id: 'feat-500-rev-d4',
        num: '04',
        title: 'Red Fort Motif',
        description: "On the reverse side is the Red Fort motif that represents India's rich cultural heritage.",
        side: 'reverse',
        coordinates: { x: 58.5, y: 37.1 },
        gifUrl: './banknotes/features/feat-500-rev-d4.webp'
      },
      {
        id: 'feat-500-rev-d5',
        num: '05',
        title: 'Denominational Numeral in Devanagari (Reverse)',
        description: 'On the reverse of the banknote, on the top right is the denominational numeral ‘500’, written in Devanagari.',
        side: 'reverse',
        coordinates: { x: 91.5, y: 14.0 },
        gifUrl: './banknotes/features/feat-500-rev-d5.webp'
      }
    ],
    securityFeatures: [
      // Common Security Features (01 - 12)
      {
        id: 'feat-500-s1',
        num: '01',
        title: 'Latent Image 500',
        description: 'A latent image with the denominational numeral ‘500’ is on the bottom left. To view, hold the note at a 45-degree angle at eye level.',
        side: 'obverse',
        coordinates: { x: 7.7, y: 87.1 },
        gifUrl: './banknotes/features/feat-500-s1.webp'
      },
      {
        id: 'feat-500-s2',
        num: '02',
        title: 'Colour-Shifting Security Thread',
        description: 'Colour thread changes colour from green to blue when the note is tilted.',
        side: 'obverse',
        coordinates: { x: 56.8, y: 13.9 },
        gifUrl: './banknotes/features/feat-500-s2.webp'
      },
      {
        id: 'feat-500-s3',
        num: '03',
        title: "Micro Letters 'भारत' & 'INDIA'",
        description: "The micro letters 'भारत' & 'INDIA' can be seen on Mahatma Gandhi's shawl fold.",
        side: 'obverse',
        coordinates: { x: 48.5, y: 81.6 },
        gifUrl: './banknotes/features/feat-500-s3.webp'
      },
      {
        id: 'feat-500-s4',
        num: '04',
        title: "Micro Letters 'RBI'",
        description: "The micro letters 'RBI' Can be seen on Mahatma Gandhi's spectacles’ frame.",
        side: 'obverse',
        coordinates: { x: 52.1, y: 51.5 },
        gifUrl: './banknotes/features/feat-500-s4.webp'
      },
      {
        id: 'feat-500-s5',
        num: '05',
        title: "Micro Letters 'RBI500INDIA'",
        description: 'The micro letters ‘RBI500INDIA’ Can be seen on the left side of the bank note.',
        side: 'obverse',
        coordinates: { x: 6.8, y: 47.9 },
        gifUrl: './banknotes/features/feat-500-s5.webp'
      },
      {
        id: 'feat-500-s6',
        num: '06',
        title: 'Watermark & Electrotype 500',
        description: 'The Mahatma Gandhi portrait and electrotype (500) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 78.3, y: 29.6 },
        gifUrl: './banknotes/features/feat-500-s6.webp'
      },
      {
        id: 'feat-500-s7',
        num: '07',
        title: 'Colour-Changing Ink (OVI) ₹500',
        description: 'The denominational numeral of the rupee symbol ‘₹500’ is seen on bottom right on the obverse side. The ink changes colour from green to blue when tilted.',
        side: 'obverse',
        coordinates: { x: 74.0, y: 63.1 },
        gifUrl: './banknotes/features/feat-500-s7.webp'
      },
      {
        id: 'feat-500-s8',
        num: '08',
        title: 'Raised Print Circle Identifier',
        description: 'You can see a circle with ‘₹500’ in raised print on the right side of the note.',
        side: 'obverse',
        coordinates: { x: 93.3, y: 50.4 },
        gifUrl: './banknotes/features/feat-500-s8.webp'
      },
      {
        id: 'feat-500-s9',
        num: '09',
        title: 'Five Angular Bleed Lines',
        description: 'To aid the visually impaired, five angular bleed lines on left and right side in raised printing is seen on the obverse side.',
        side: 'obverse',
        coordinates: { x: 96.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-500-s9.webp'
      },
      {
        id: 'feat-500-s10',
        num: '10',
        title: 'Raised Print Ashoka Pillar Emblem',
        description: 'To aid the visually impaired, intaglio or raised print can be felt on the Ashoka Pillar emblem.',
        side: 'obverse',
        coordinates: { x: 94.2, y: 90.2 },
        gifUrl: './banknotes/features/feat-500-s10.webp'
      },
      {
        id: 'feat-500-s11',
        num: '11',
        title: 'Raised Print Mahatma Gandhi Portrait',
        description: 'To aid the visually impaired, intaglio or raised printing is seen and felt on the Mahatma Gandhi portrait.',
        side: 'obverse',
        coordinates: { x: 41.5, y: 23.8 },
        gifUrl: './banknotes/features/feat-500-s11.webp'
      },
      {
        id: 'feat-500-s12',
        num: '12',
        title: 'Fluorescent Security Thread & Fibres',
        description: 'Under UV light, the security thread emits fluorescence & dual colour fluorescent fibres are seen in the paper. You can also read the inscriptions \'भारत\' and ‘RBI’ under the UV light.',
        side: 'obverse',
        coordinates: { x: 55.2, y: 32.4 },
        gifUrl: './banknotes/features/feat-500-s12.webp'
      }
    ]
  },

  {
    id: 'mg-new-200',
    denomination: '₹ 200',
    numeral: 200,
    series: 'Mahatma Gandhi New Series',
    year: '2017',
    dimensions: '146 mm × 66 mm',
    color: 'Bright Yellow',
    accent: '#eab308',
    motifTitle: 'Sanchi Stupa, Madhya Pradesh',
    motifDescription: 'The Great Buddhist Stupa at Sanchi, a UNESCO World Heritage site representing ancient Mauryan Buddhist art and architectural heritage.',
    obverseImage: './specimens/mg_new_200_front.jpg',
    reverseImage: './specimens/mg_new_200_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-200-d1',
        num: '01',
        title: 'See-Through Register 200',
        description: 'On the bottom left of the note is a see-through register with the denominational numeral ‘200’, that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 9.8, y: 55.5 },
        gifUrl: './banknotes/features/feat-200-d1.webp'
      },
      {
        id: 'feat-200-d2',
        num: '02',
        title: 'Denominational Numeral in Devanagari',
        description: 'The denominational numeral ‘200’ is written in Devanagari on the banknote.',
        side: 'obverse',
        coordinates: { x: 23.0, y: 40.8 },
        gifUrl: './banknotes/features/feat-200-d2.webp'
      },
      {
        id: 'feat-200-d3',
        num: '03',
        title: 'Portrait of Mahatma Gandhi',
        description: 'The portrait of Mahatma Gandhi can be seen in the centre of the banknote on the obverse side',
        side: 'obverse',
        coordinates: { x: 43.4, y: 23.2 },
        gifUrl: './banknotes/features/feat-200-d3.webp'
      },
      {
        id: 'feat-200-d4',
        num: '04',
        title: "Guarantee Clause, Governor's Signature & RBI Emblem",
        description: "On the right side of the note is the Guarantee clause, the Governor's signature with a promise of payment & the RBI emblem.",
        side: 'obverse',
        coordinates: { x: 63.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-200-d4.webp'
      },
      {
        id: 'feat-200-d5',
        num: '05',
        title: 'Number Panel (Top Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the top left side of the note.',
        side: 'obverse',
        coordinates: { x: 14.1, y: 29.5 },
        gifUrl: './banknotes/features/feat-200-d5.webp'
      },
      {
        id: 'feat-200-d6',
        num: '06',
        title: 'Number Panel (Bottom Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom right side of the note.',
        side: 'obverse',
        coordinates: { x: 75.5, y: 89.5 },
        gifUrl: './banknotes/features/feat-200-d6.webp'
      },
      {
        id: 'feat-200-d7',
        num: '07',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 94.9, y: 91.6 },
        gifUrl: './banknotes/features/feat-200-d7.webp'
      },

      // Back (Reverse) Design Features (01 - 05)
      {
        id: 'feat-200-rev-d1',
        num: '01',
        title: 'Year of Printing',
        description: 'The year of printing can be seen on the reverse of the note on the top left .',
        side: 'reverse',
        coordinates: { x: 5.7, y: 18.0 },
        gifUrl: './banknotes/features/feat-200-rev-d1.webp'
      },
      {
        id: 'feat-200-rev-d2',
        num: '02',
        title: 'Swachh Bharat Logo',
        description: 'The Swachh Bharat logo with the slogan ‘एक कदम स्वच्छता की ओर’ i.e. \'one step towards cleanliness\' is seen on reverse of the note, at the bottom left side.',
        side: 'reverse',
        coordinates: { x: 17.0, y: 64.4 },
        gifUrl: './banknotes/features/feat-200-rev-d2.webp'
      },
      {
        id: 'feat-200-rev-d3',
        num: '03',
        title: 'Language Panel',
        description: 'The language panel is seen on the reverse of the note, in the centre. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 33.5, y: 17.2 },
        gifUrl: './banknotes/features/feat-200-rev-d3.webp'
      },
      {
        id: 'feat-200-rev-d4',
        num: '04',
        title: 'Sanchi Stupa Motif',
        description: "On the reverse side of the banknote is the Sanchi Stupa motif that represents India's rich cultural heritage.",
        side: 'reverse',
        coordinates: { x: 58.5, y: 37.1 },
        gifUrl: './banknotes/features/feat-200-rev-d4.webp'
      },
      {
        id: 'feat-200-rev-d5',
        num: '05',
        title: 'Denominational Numeral in Devanagari (Reverse)',
        description: 'On the reverse side, on the top right is the denominational numeral ‘200’, written in Devanagari.',
        side: 'reverse',
        coordinates: { x: 91.5, y: 14.0 },
        gifUrl: './banknotes/features/feat-200-rev-d5.webp'
      }
    ],
    securityFeatures: [
      // Common Security Features (01 - 12)
      {
        id: 'feat-200-s1',
        num: '01',
        title: 'Latent Image 200',
        description: 'A latent image with the denominational numeral ‘200’ is on the bottom left. To view, hold the note at a 45-degree angle at eye level.',
        side: 'obverse',
        coordinates: { x: 7.7, y: 87.1 },
        gifUrl: './banknotes/features/feat-200-s1.webp'
      },
      {
        id: 'feat-200-s2',
        num: '02',
        title: 'Colour-Shifting Security Thread',
        description: 'Colour thread changes colour from green to blue when the note is tilted.',
        side: 'obverse',
        coordinates: { x: 56.8, y: 13.9 },
        gifUrl: './banknotes/features/feat-200-s2.webp'
      },
      {
        id: 'feat-200-s3',
        num: '03',
        title: "Micro Letters 'भारत' & 'INDIA'",
        description: "The micro letters 'भारत' & 'INDIA' can be seen on Mahatma Gandhi's shawl fold.",
        side: 'obverse',
        coordinates: { x: 48.5, y: 81.6 },
        gifUrl: './banknotes/features/feat-200-s3.webp'
      },
      {
        id: 'feat-200-s4',
        num: '04',
        title: "Micro Letters 'भारत' & 'INDIA' (Spectacles)",
        description: "The micro letters 'भारत' & 'INDIA' can be seen on Mahatma Gandhi's spectacles’ frame.",
        side: 'obverse',
        coordinates: { x: 52.1, y: 51.5 },
        gifUrl: './banknotes/features/feat-200-s4.webp'
      },
      {
        id: 'feat-200-s5',
        num: '05',
        title: "Micro Letters 'RBI200INDIA'",
        description: "The micro letters 'RBI200INDIA' can be seen on the left side of the bank note.",
        side: 'obverse',
        coordinates: { x: 6.8, y: 47.9 },
        gifUrl: './banknotes/features/feat-200-s5.webp'
      },
      {
        id: 'feat-200-s6',
        num: '06',
        title: 'Watermark & Electrotype 200',
        description: 'The Mahatma Gandhi portrait and electrotype (200) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 78.3, y: 29.6 },
        gifUrl: './banknotes/features/feat-200-s6.webp'
      },
      {
        id: 'feat-200-s7',
        num: '07',
        title: 'Colour-Changing Ink (OVI) ₹200',
        description: 'The denominational numeral of the rupee symbol ‘₹200’ is seen on bottom right on the obverse side. The ink changes colour from green to blue when tilted.',
        side: 'obverse',
        coordinates: { x: 74.0, y: 63.1 },
        gifUrl: './banknotes/features/feat-200-s7.webp'
      },
      {
        id: 'feat-200-s8',
        num: '08',
        title: 'Raised Print "H" Identifier',
        description: 'You can see an identification mark represented by H with ‘₹200’ in raised print on the right side of the note.',
        side: 'obverse',
        coordinates: { x: 93.3, y: 50.4 },
        gifUrl: './banknotes/features/feat-200-s8.webp'
      },
      {
        id: 'feat-200-s9',
        num: '09',
        title: 'Four Angular Bleed Lines with Two Circles',
        description: 'To aid the visually impaired, 4 angular bleed lines with two circles in between on the left & right side, in raised printing is seen on the obverse side.',
        side: 'obverse',
        coordinates: { x: 96.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-200-s9.webp'
      },
      {
        id: 'feat-200-s10',
        num: '10',
        title: 'Raised Print Ashoka Pillar Emblem',
        description: 'To aid the visually impaired, Intaglio or raised printing is seen and felt on the Ashoka Pillar emblem',
        side: 'obverse',
        coordinates: { x: 94.2, y: 90.2 },
        gifUrl: './banknotes/features/feat-200-s10.webp'
      },
      {
        id: 'feat-200-s11',
        num: '11',
        title: 'Raised Print Mahatma Gandhi Portrait',
        description: 'To aid the visually impaired, Intaglio or raised printing is seen and felt on the Mahatma Gandhi portrait',
        side: 'obverse',
        coordinates: { x: 41.5, y: 23.8 },
        gifUrl: './banknotes/features/feat-200-s11.webp'
      },
      {
        id: 'feat-200-s12',
        num: '12',
        title: 'Fluorescent Security Thread & Fibres',
        description: 'Under UV light, the security thread emits fluorescence & dual colour fluorescent fibres are seen in the paper. You can also read the inscriptions ‘200’, ‘RBI’ under the UV light.',
        side: 'obverse',
        coordinates: { x: 55.2, y: 32.4 },
        gifUrl: './banknotes/features/feat-200-s12.webp'
      }
    ]
  },

  {
    id: 'mg-new-100',
    denomination: '₹ 100',
    numeral: 100,
    series: 'Mahatma Gandhi New Series',
    year: '2018',
    dimensions: '142 mm × 66 mm',
    color: 'Lavender',
    accent: '#a855f7',
    motifTitle: 'Rani ki Vav (The Queen’s Stepwell), Gujarat',
    motifDescription: 'Intricate 11th-century subterranean stepwell located in Patan, Gujarat, built by Queen Udayamati of the Chaulukya dynasty, celebrating ancient water management and sculpture.',
    obverseImage: './specimens/mg_new_100_front.jpg',
    reverseImage: './specimens/mg_new_100_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-100-d1',
        num: '01',
        title: 'See-Through Register 100',
        description: 'On the bottom left of the note is a see-through register with the denominational numeral ‘100’, that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 9.8, y: 55.5 },
        gifUrl: './banknotes/features/feat-100-d1.webp'
      },
      {
        id: 'feat-100-d2',
        num: '02',
        title: 'Denominational Numeral in Devanagari',
        description: 'The denominational numeral ‘100’ is written in Devanagari on the banknote.',
        side: 'obverse',
        coordinates: { x: 23.0, y: 40.8 },
        gifUrl: './banknotes/features/feat-100-d2.webp'
      },
      {
        id: 'feat-100-d3',
        num: '03',
        title: 'Portrait of Mahatma Gandhi',
        description: 'The portrait of Mahatma Gandhi can be seen in the centre of the banknote, on the obverse side.',
        side: 'obverse',
        coordinates: { x: 43.4, y: 23.2 },
        gifUrl: './banknotes/features/feat-100-d3.webp'
      },
      {
        id: 'feat-100-d4',
        num: '04',
        title: "Guarantee Clause, Governor's Signature & RBI Emblem",
        description: "On the right side of the note is the Guarantee clause, the Governor's signature with a promise of payment & the RBI emblem.",
        side: 'obverse',
        coordinates: { x: 63.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-100-d4.webp'
      },
      {
        id: 'feat-100-d5',
        num: '05',
        title: 'Number Panel (Top Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the top left side of the note.',
        side: 'obverse',
        coordinates: { x: 14.1, y: 29.5 },
        gifUrl: './banknotes/features/feat-100-d5.webp'
      },
      {
        id: 'feat-100-d6',
        num: '06',
        title: 'Number Panel (Bottom Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom right side of the note.',
        side: 'obverse',
        coordinates: { x: 75.5, y: 89.5 },
        gifUrl: './banknotes/features/feat-100-d6.webp'
      },
      {
        id: 'feat-100-d7',
        num: '07',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 94.9, y: 91.6 },
        gifUrl: './banknotes/features/feat-100-d7.webp'
      },

      // Back (Reverse) Design Features (01 - 05)
      {
        id: 'feat-100-rev-d1',
        num: '01',
        title: 'Year of Printing',
        description: 'The year of printing can be seen on the reverse of the note on the top left.',
        side: 'reverse',
        coordinates: { x: 5.7, y: 18.0 },
        gifUrl: './banknotes/features/feat-100-rev-d1.webp'
      },
      {
        id: 'feat-100-rev-d2',
        num: '02',
        title: 'Swachh Bharat Logo',
        description: 'The Swachh Bharat logo with the slogan ‘एक कदम स्वच्छता की ओर’ i.e. \'one step towards cleanliness\' is seen on reverse of the note, at the bottom left side.',
        side: 'reverse',
        coordinates: { x: 17.0, y: 64.4 },
        gifUrl: './banknotes/features/feat-100-rev-d2.webp'
      },
      {
        id: 'feat-100-rev-d3',
        num: '03',
        title: 'Language Panel',
        description: 'The language panel is seen on the reverse of the note, in the centre. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 33.5, y: 17.2 },
        gifUrl: './banknotes/features/feat-100-rev-d3.webp'
      },
      {
        id: 'feat-100-rev-d4',
        num: '04',
        title: 'Rani Ki Vav Motif',
        description: 'On the reverse of the note, is the ‘Rani Ki Vav’ motif, that represents India\'s rich cultural heritage.',
        side: 'reverse',
        coordinates: { x: 58.5, y: 37.1 },
        gifUrl: './banknotes/features/feat-100-rev-d4.webp'
      },
      {
        id: 'feat-100-rev-d5',
        num: '05',
        title: 'Denominational Numeral in Devanagari (Reverse)',
        description: 'On the reverse of the banknote, on the top right, is the denominational numeral ‘100’ written in Devanagari.',
        side: 'reverse',
        coordinates: { x: 91.5, y: 14.0 },
        gifUrl: './banknotes/features/feat-100-rev-d5.webp'
      }
    ],
    securityFeatures: [
      // Common Security Features (01 - 11)
      {
        id: 'feat-100-s1',
        num: '01',
        title: 'Latent Image 100',
        description: 'A latent image with the denominational numeral ‘100’ is on the bottom left. To view, hold the note at a 45-degree angle at eye level.',
        side: 'obverse',
        coordinates: { x: 7.7, y: 87.1 },
        gifUrl: './banknotes/features/feat-100-s1.webp'
      },
      {
        id: 'feat-100-s2',
        num: '02',
        title: 'Colour-Shifting Security Thread',
        description: 'Colour thread changes colour from green to blue when the note is tilted.',
        side: 'obverse',
        coordinates: { x: 56.8, y: 13.9 },
        gifUrl: './banknotes/features/feat-100-s2.webp'
      },
      {
        id: 'feat-100-s3',
        num: '03',
        title: "Micro Letters 'भारत' & 'INDIA'",
        description: "The micro letters 'भारत' & 'INDIA' can be seen on Mahatma Gandhi's shawl fold.",
        side: 'obverse',
        coordinates: { x: 48.5, y: 81.6 },
        gifUrl: './banknotes/features/feat-100-s3.webp'
      },
      {
        id: 'feat-100-s4',
        num: '04',
        title: "Micro Letters 'भारत' (Spectacles)",
        description: "The micro letters 'भारत' can be seen on Mahatma Gandhi's spectacles’ frame.",
        side: 'obverse',
        coordinates: { x: 52.1, y: 51.5 },
        gifUrl: './banknotes/features/feat-100-s4.webp'
      },
      {
        id: 'feat-100-s5',
        num: '05',
        title: "Micro Letters 'RBI100INDIA'",
        description: 'The micro letters \'RBI100INDIA\' can be seen on the left side of the bank note.',
        side: 'obverse',
        coordinates: { x: 6.8, y: 47.9 },
        gifUrl: './banknotes/features/feat-100-s5.webp'
      },
      {
        id: 'feat-100-s6',
        num: '06',
        title: 'Watermark & Electrotype 100',
        description: 'The Mahatma Gandhi portrait and electrotype (100) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 78.3, y: 29.6 },
        gifUrl: './banknotes/features/feat-100-s6.webp'
      },
      {
        id: 'feat-100-s7',
        num: '07',
        title: 'Raised Print Triangle Identifier',
        description: 'You can see a horizontal triangle with ‘₹100’ in raised print on the right side of the note.',
        side: 'obverse',
        coordinates: { x: 93.3, y: 50.4 },
        gifUrl: './banknotes/features/feat-100-s7.webp'
      },
      {
        id: 'feat-100-s8',
        num: '08',
        title: 'Four Angular Bleed Lines',
        description: 'To aid the visually impaired, four angular bleed lines on left and right side in raised printing is seen on the obverse side.',
        side: 'obverse',
        coordinates: { x: 96.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-100-s8.webp'
      },
      {
        id: 'feat-100-s9',
        num: '09',
        title: 'Raised Print Ashoka Pillar Emblem',
        description: 'To aid the visually impaired, intaglio or raised printing is seen and felt on the Ashoka Pillar emblem.',
        side: 'obverse',
        coordinates: { x: 94.2, y: 90.2 },
        gifUrl: './banknotes/features/feat-100-s9.webp'
      },
      {
        id: 'feat-100-s10',
        num: '10',
        title: 'Raised Print Mahatma Gandhi Portrait',
        description: 'To aid the visually impaired, intaglio or raised printing is seen and felt on the Mahatma Gandhi portrait.',
        side: 'obverse',
        coordinates: { x: 41.5, y: 23.8 },
        gifUrl: './banknotes/features/feat-100-s10.webp'
      },
      {
        id: 'feat-100-s11',
        num: '11',
        title: 'Fluorescent Security Thread & Fibres',
        description: 'Under UV light, the security thread emits fluorescence & dual colour fluorescent fibres are seen in the paper. You can also read the inscriptions \'भारत\' and ‘RBI’ under the UV light.',
        side: 'obverse',
        coordinates: { x: 55.2, y: 32.4 },
        gifUrl: './banknotes/features/feat-100-s11.webp'
      }
    ]
  },

  {
    id: 'mg-new-50',
    denomination: '₹ 50',
    numeral: 50,
    series: 'Mahatma Gandhi New Series',
    year: '2017',
    dimensions: '135 mm × 66 mm',
    color: 'Fluorescent Blue',
    accent: '#06b6d4',
    motifTitle: 'Stone Chariot at Hampi, Karnataka',
    motifDescription: 'The monolithic granite shrine of Garuda at the Vijayanagara Empire capital of Hampi, reflecting classic Dravidian architectural mastery.',
    obverseImage: './specimens/mg_new_50_front.jpg',
    reverseImage: './specimens/mg_new_50_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-50-d1',
        num: '01',
        title: 'See-Through Register 50',
        description: 'On the bottom left of the note is a see-through register with the denominational numeral ‘50’, that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 9.8, y: 55.5 },
        gifUrl: './banknotes/features/feat-50-d1.webp'
      },
      {
        id: 'feat-50-d2',
        num: '02',
        title: 'Denominational Numeral in Devanagari',
        description: 'The denominational numeral ‘50’ is written in Devanagari on the banknotes.',
        side: 'obverse',
        coordinates: { x: 23.0, y: 40.8 },
        gifUrl: './banknotes/features/feat-50-d2.webp'
      },
      {
        id: 'feat-50-d3',
        num: '03',
        title: 'Portrait of Mahatma Gandhi',
        description: 'The portrait of Mahatma Gandhi can be seen in the centre of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 43.4, y: 23.2 },
        gifUrl: './banknotes/features/feat-50-d3.webp'
      },
      {
        id: 'feat-50-d4',
        num: '04',
        title: "Guarantee Clause, Governor's Signature & RBI Emblem",
        description: "On the right side of the note is the Guarantee clause, the Governor's signature with a promise of payment & the RBI emblem.",
        side: 'obverse',
        coordinates: { x: 63.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-50-d4.webp'
      },
      {
        id: 'feat-50-d5',
        num: '05',
        title: 'Number Panel (Top Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the top left side of the note.',
        side: 'obverse',
        coordinates: { x: 14.1, y: 29.5 },
        gifUrl: './banknotes/features/feat-50-d5.webp'
      },
      {
        id: 'feat-50-d6',
        num: '06',
        title: 'Number Panel (Bottom Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom right side of the note.',
        side: 'obverse',
        coordinates: { x: 75.5, y: 89.5 },
        gifUrl: './banknotes/features/feat-50-d6.webp'
      },
      {
        id: 'feat-50-d7',
        num: '07',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 94.9, y: 91.6 },
        gifUrl: './banknotes/features/feat-50-d7.webp'
      },

      // Back (Reverse) Design Features (01 - 05)
      {
        id: 'feat-50-rev-d1',
        num: '01',
        title: 'Year of Printing',
        description: 'The year of printing can be seen on the reverse of the note on the top left.',
        side: 'reverse',
        coordinates: { x: 5.7, y: 18.0 },
        gifUrl: './banknotes/features/feat-50-rev-d1.webp'
      },
      {
        id: 'feat-50-rev-d2',
        num: '02',
        title: 'Swachh Bharat Logo',
        description: 'The Swachh Bharat logo with the slogan ‘एक कदम स्वच्छता की ओर’ i.e. \'one step towards cleanliness\' is seen on reverse of the note, at the bottom left side.',
        side: 'reverse',
        coordinates: { x: 17.0, y: 64.4 },
        gifUrl: './banknotes/features/feat-50-rev-d2.webp'
      },
      {
        id: 'feat-50-rev-d3',
        num: '03',
        title: 'Language Panel',
        description: 'The language panel is seen on the reverse of the note, in the centre. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 33.5, y: 17.2 },
        gifUrl: './banknotes/features/feat-50-rev-d3.webp'
      },
      {
        id: 'feat-50-rev-d4',
        num: '04',
        title: 'Hampi with Chariot Motif',
        description: 'On the reverse side of the banknote is a Hampi with Chariot motif that represents India\'s rich cultural heritage.',
        side: 'reverse',
        coordinates: { x: 58.5, y: 37.1 },
        gifUrl: './banknotes/features/feat-50-rev-d4.webp'
      },
      {
        id: 'feat-50-rev-d5',
        num: '05',
        title: 'Denominational Numeral in Devanagari (Reverse)',
        description: 'On the reverse of the banknote, on the top right is the denominational numeral ‘50’ written in Devanagari.',
        side: 'reverse',
        coordinates: { x: 91.5, y: 14.0 },
        gifUrl: './banknotes/features/feat-50-rev-d5.webp'
      }
    ],
    securityFeatures: [
      // Common Security Features (01 - 07)
      {
        id: 'feat-50-s1',
        num: '01',
        title: 'Windowed Security Thread',
        description: 'The banknote has a demetalised windowed security thread with inscriptions \'भारत\' and ‘RBI’.',
        side: 'obverse',
        coordinates: { x: 56.8, y: 13.9 },
        gifUrl: './banknotes/features/feat-50-s1.webp'
      },
      {
        id: 'feat-50-s2',
        num: '02',
        title: "Micro Letters 'भारत' (Spectacles)",
        description: 'The micro letters \'भारत\' can be seen on Mahatma Gandhi\'s spectacles’ frame.',
        side: 'obverse',
        coordinates: { x: 52.1, y: 51.5 },
        gifUrl: './banknotes/features/feat-50-s2.webp'
      },
      {
        id: 'feat-50-s3',
        num: '03',
        title: "Micro Letters '50' & 'RBI' (Spectacles)",
        description: 'The micro letters \'50\' & \'RBI\' can be seen on Mahatma Gandhi\'s spectacles’ frame.',
        side: 'obverse',
        coordinates: { x: 53.5, y: 52.5 },
        gifUrl: './banknotes/features/feat-50-s3.webp'
      },
      {
        id: 'feat-50-s4',
        num: '04',
        title: "Micro Letters 'भारत' & 'INDIA' (Shawl)",
        description: 'The micro letters \'भारत\' & \'INDIA\' can be seen on Mahatma Gandhi\'s shawl fold.',
        side: 'obverse',
        coordinates: { x: 48.5, y: 81.6 },
        gifUrl: './banknotes/features/feat-50-s4.webp'
      },
      {
        id: 'feat-50-s5',
        num: '05',
        title: "Micro Letters 'RBI50INDIA'",
        description: 'The microletters \'RBI50INDIA\' can be seen on the left side of the banknote.',
        side: 'obverse',
        coordinates: { x: 6.8, y: 47.9 },
        gifUrl: './banknotes/features/feat-50-s5.webp'
      },
      {
        id: 'feat-50-s6',
        num: '06',
        title: 'Watermark & Electrotype 50',
        description: 'The Mahatma Gandhi portrait and electrotype (50) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 78.3, y: 29.6 },
        gifUrl: './banknotes/features/feat-50-s6.webp'
      },
      {
        id: 'feat-50-s7',
        num: '07',
        title: 'Fluorescent Security Thread & Fibres',
        description: 'Under UV light, the security thread emits fluorescence & dual colour fluorescent fibres are seen in the paper. You can also read the inscriptions, \'भारत\' and ‘RBI’ under the UV light.',
        side: 'obverse',
        coordinates: { x: 55.2, y: 32.4 },
        gifUrl: './banknotes/features/feat-50-s7.webp'
      }
    ]
  },

  {
    id: 'mg-new-20',
    denomination: '₹ 20',
    numeral: 20,
    series: 'Mahatma Gandhi New Series',
    year: '2019',
    dimensions: '129 mm × 63 mm',
    color: 'Greenish Yellow',
    accent: '#84cc16',
    motifTitle: 'Ellora Caves, Maharashtra',
    motifDescription: 'The rock-cut architectural marvel of Kailasa Temple (Cave 16) at Ellora, excavated from a single basalt volcanic cliff face.',
    obverseImage: './specimens/mg_new_20_front.jpg',
    reverseImage: './specimens/mg_new_20_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-20-d1',
        num: '01',
        title: 'See-Through Register 20',
        description: 'On the bottom left of the note is a see-through register with the denominational numeral ‘20’, that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 9.8, y: 55.5 },
        gifUrl: './banknotes/features/feat-20-d1.webp'
      },
      {
        id: 'feat-20-d2',
        num: '02',
        title: 'Denominational Numeral in Devanagari',
        description: 'The denominational numeral ‘20’ is written in Devanagari on the banknote.',
        side: 'obverse',
        coordinates: { x: 23.0, y: 40.8 },
        gifUrl: './banknotes/features/feat-20-d2.webp'
      },
      {
        id: 'feat-20-d3',
        num: '03',
        title: 'Portrait of Mahatma Gandhi',
        description: 'The portrait of Mahatma Gandhi can be seen in the centre of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 43.4, y: 23.2 },
        gifUrl: './banknotes/features/feat-20-d3.webp'
      },
      {
        id: 'feat-20-d4',
        num: '04',
        title: "Guarantee Clause, Governor's Signature & RBI Emblem",
        description: "On the right side of the note is the Guarantee clause, the Governor's signature with a promise of payment & the RBI emblem.",
        side: 'obverse',
        coordinates: { x: 63.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-20-d4.webp'
      },
      {
        id: 'feat-20-d5',
        num: '05',
        title: 'Number Panel (Top Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the top left side of the note.',
        side: 'obverse',
        coordinates: { x: 14.1, y: 29.5 },
        gifUrl: './banknotes/features/feat-20-d5.webp'
      },
      {
        id: 'feat-20-d6',
        num: '06',
        title: 'Number Panel (Bottom Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom right side of the note.',
        side: 'obverse',
        coordinates: { x: 75.5, y: 89.5 },
        gifUrl: './banknotes/features/feat-20-d6.webp'
      },
      {
        id: 'feat-20-d7',
        num: '07',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 94.9, y: 91.6 },
        gifUrl: './banknotes/features/feat-20-d7.webp'
      },

      // Back (Reverse) Design Features (01 - 05)
      {
        id: 'feat-20-rev-d1',
        num: '01',
        title: 'Year of Printing',
        description: 'The year of printing can be seen on the reverse of the note on the top left.',
        side: 'reverse',
        coordinates: { x: 5.7, y: 18.0 },
        gifUrl: './banknotes/features/feat-20-rev-d1.webp'
      },
      {
        id: 'feat-20-rev-d2',
        num: '02',
        title: 'Swachh Bharat Logo',
        description: 'The Swachh Bharat logo with the slogan ‘एक कदम स्वच्छता की ओर’ i.e. one step towards cleanliness\' is seen on reverse of the note, at the bottom left side.',
        side: 'reverse',
        coordinates: { x: 17.0, y: 64.4 },
        gifUrl: './banknotes/features/feat-20-rev-d2.webp'
      },
      {
        id: 'feat-20-rev-d3',
        num: '03',
        title: 'Language Panel',
        description: 'The language panel is seen on the reverse of the note, in the centre. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 33.5, y: 17.2 },
        gifUrl: './banknotes/features/feat-20-rev-d3.webp'
      },
      {
        id: 'feat-20-rev-d4',
        num: '04',
        title: 'Ellora Caves Motif',
        description: 'On the reverse side of the banknote is the Ellora Caves motif that represents India\'s rich cultural heritage.',
        side: 'reverse',
        coordinates: { x: 58.5, y: 37.1 },
        gifUrl: './banknotes/features/feat-20-rev-d4.webp'
      },
      {
        id: 'feat-20-rev-d5',
        num: '05',
        title: 'Denominational Numeral in Devanagari (Reverse)',
        description: 'On the reverse of the banknote, on the top right is the denominational numeral ‘20’ written in Devanagari.',
        side: 'reverse',
        coordinates: { x: 91.5, y: 14.0 },
        gifUrl: './banknotes/features/feat-20-rev-d5.webp'
      }
    ],
    securityFeatures: [
      // Common Security Features (01 - 07)
      {
        id: 'feat-20-s1',
        num: '01',
        title: 'Windowed Security Thread',
        description: 'The banknote has a demetalised windowed security thread with inscriptions \'भारत\' and ‘RBI’.',
        side: 'obverse',
        coordinates: { x: 56.8, y: 13.9 },
        gifUrl: './banknotes/features/feat-20-s1.webp'
      },
      {
        id: 'feat-20-s2',
        num: '02',
        title: "Micro Letters 'भारत' (Spectacles)",
        description: 'The micro letters \'भारत\' can be seen on Mahatma Gandhi\'s spectacles’ frame.',
        side: 'obverse',
        coordinates: { x: 52.1, y: 51.5 },
        gifUrl: './banknotes/features/feat-20-s2.webp'
      },
      {
        id: 'feat-20-s3',
        num: '03',
        title: "Micro Letters '20' & 'RBI' (Spectacles)",
        description: 'The micro letters \'20\' & \'RBI\' can be seen on Mahatma Gandhi\'s spectacles’ frame.',
        side: 'obverse',
        coordinates: { x: 53.5, y: 52.5 },
        gifUrl: './banknotes/features/feat-20-s3.webp'
      },
      {
        id: 'feat-20-s4',
        num: '04',
        title: "Micro Letters 'भारत' & 'INDIA' (Shawl)",
        description: 'The micro letters \'भारत\' & \'INDIA\' can be seen on Mahatma Gandhi\'s shawl fold.',
        side: 'obverse',
        coordinates: { x: 48.5, y: 81.6 },
        gifUrl: './banknotes/features/feat-20-s4.webp'
      },
      {
        id: 'feat-20-s5',
        num: '05',
        title: "Micro Letters 'RBI20INDIA'",
        description: 'The microletters \'RBI20INDIA\' can be seen on the left side of the banknote.',
        side: 'obverse',
        coordinates: { x: 6.8, y: 47.9 },
        gifUrl: './banknotes/features/feat-20-s5.webp'
      },
      {
        id: 'feat-20-s6',
        num: '06',
        title: 'Watermark & Electrotype 20',
        description: 'The Mahatma Gandhi portrait and electrotype (20) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 78.3, y: 29.6 },
        gifUrl: './banknotes/features/feat-20-s6.webp'
      },
      {
        id: 'feat-20-s7',
        num: '07',
        title: 'Fluorescent Security Thread & Fibres',
        description: 'Under UV light, the security thread emits fluorescence & dual colour fluorescent fibres are seen in the paper. You can also read the inscriptions \'भारत\' and ‘RBI’ under the UV light.',
        side: 'obverse',
        coordinates: { x: 55.2, y: 32.4 },
        gifUrl: './banknotes/features/feat-20-s7.webp'
      }
    ]
  },

  {
    id: 'mg-new-10',
    denomination: '₹ 10',
    numeral: 10,
    series: 'Mahatma Gandhi New Series',
    year: '2018',
    dimensions: '123 mm × 63 mm',
    color: 'Chocolate Brown',
    accent: '#b45309',
    motifTitle: 'Sun Temple at Konark, Odisha',
    motifDescription: 'The 13th-century Sun Temple chariot wheel with 24 carved spokes symbolising the eternal solar cycle of time.',
    obverseImage: './specimens/mg_new_10_front.jpg',
    reverseImage: './specimens/mg_new_10_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-10-d1',
        num: '01',
        title: 'See-Through Register 10',
        description: 'On the bottom left of the note is a see-through register with the denominational numeral ‘10’, that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 9.8, y: 55.5 },
        gifUrl: './banknotes/features/feat-10-d1.webp'
      },
      {
        id: 'feat-10-d2',
        num: '02',
        title: 'Denominational Numeral in Devanagari',
        description: 'The denominational numeral ‘10’ is written in Devanagari on the banknote.',
        side: 'obverse',
        coordinates: { x: 23.0, y: 40.8 },
        gifUrl: './banknotes/features/feat-10-d2.webp'
      },
      {
        id: 'feat-10-d3',
        num: '03',
        title: 'Portrait of Mahatma Gandhi',
        description: 'The portrait of Mahatma Gandhi can be seen in the centre of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 43.4, y: 23.2 },
        gifUrl: './banknotes/features/feat-10-d3.webp'
      },
      {
        id: 'feat-10-d4',
        num: '04',
        title: "Guarantee Clause, Governor's Signature & RBI Emblem",
        description: "On the right side of the note is the Guarantee clause, the Governor's signature with a promise of payment & the RBI emblem.",
        side: 'obverse',
        coordinates: { x: 63.7, y: 18.9 },
        gifUrl: './banknotes/features/feat-10-d4.webp'
      },
      {
        id: 'feat-10-d5',
        num: '05',
        title: 'Number Panel (Top Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the top left side of the note.',
        side: 'obverse',
        coordinates: { x: 14.1, y: 29.5 },
        gifUrl: './banknotes/features/feat-10-d5.webp'
      },
      {
        id: 'feat-10-d6',
        num: '06',
        title: 'Number Panel (Bottom Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom right side of the note.',
        side: 'obverse',
        coordinates: { x: 75.5, y: 89.5 },
        gifUrl: './banknotes/features/feat-10-d6.webp'
      },
      {
        id: 'feat-10-d7',
        num: '07',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 94.9, y: 91.6 },
        gifUrl: './banknotes/features/feat-10-d7.webp'
      },

      // Back (Reverse) Design Features (01 - 05)
      {
        id: 'feat-10-rev-d1',
        num: '01',
        title: 'Year of Printing',
        description: 'The year of printing can be seen on the reverse of the note on the top left.',
        side: 'reverse',
        coordinates: { x: 5.7, y: 18.0 },
        gifUrl: './banknotes/features/feat-10-rev-d1.webp'
      },
      {
        id: 'feat-10-rev-d2',
        num: '02',
        title: 'Swachh Bharat Logo',
        description: 'The Swachh Bharat logo with the slogan ‘एक कदम स्वच्छता की ओर’ i.e. \'one step towards cleanliness\' is seen on reverse of the note, at the bottom left side.',
        side: 'reverse',
        coordinates: { x: 17.0, y: 64.4 },
        gifUrl: './banknotes/features/feat-10-rev-d2.webp'
      },
      {
        id: 'feat-10-rev-d3',
        num: '03',
        title: 'Language Panel',
        description: 'The language panel is seen on the reverse of the note, in the centre. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 33.5, y: 17.2 },
        gifUrl: './banknotes/features/feat-10-rev-d3.webp'
      },
      {
        id: 'feat-10-rev-d4',
        num: '04',
        title: 'Sun Temple, Konark Motif',
        description: 'On the reverse side of the banknote is the Sun Temple, Konark motif that represents India\'s rich cultural heritage.',
        side: 'reverse',
        coordinates: { x: 58.5, y: 37.1 },
        gifUrl: './banknotes/features/feat-10-rev-d4.webp'
      },
      {
        id: 'feat-10-rev-d5',
        num: '05',
        title: 'Denominational Numeral in Devanagari (Reverse)',
        description: 'On the reverse of the banknote, on the top right is the denominational numeral ‘10’ written in Devanagari.',
        side: 'reverse',
        coordinates: { x: 91.5, y: 14.0 },
        gifUrl: './banknotes/features/feat-10-rev-d5.webp'
      }
    ],
    securityFeatures: [
      // Common Security Features (01 - 07)
      {
        id: 'feat-10-s1',
        num: '01',
        title: 'Windowed Security Thread',
        description: 'The banknote has a demetalised windowed security thread with inscriptions \'भारत\' and ‘RBI’.',
        side: 'obverse',
        coordinates: { x: 56.8, y: 13.9 },
        gifUrl: './banknotes/features/feat-10-s1.webp'
      },
      {
        id: 'feat-10-s2',
        num: '02',
        title: "Micro Letters 'भारत' (Spectacles)",
        description: 'The micro letters \'भारत\' can be seen on Mahatma Gandhi\'s spectacles’ frame.',
        side: 'obverse',
        coordinates: { x: 52.1, y: 51.5 },
        gifUrl: './banknotes/features/feat-10-s2.webp'
      },
      {
        id: 'feat-10-s3',
        num: '03',
        title: "Micro Letters '10' & 'RBI' (Spectacles)",
        description: 'The micro letters \'10\' & \'RBI\' can be seen on Mahatma Gandhi\'s spectacles’ frame.',
        side: 'obverse',
        coordinates: { x: 53.5, y: 52.5 },
        gifUrl: './banknotes/features/feat-10-s3.webp'
      },
      {
        id: 'feat-10-s4',
        num: '04',
        title: "Micro Letters 'India' & 'भारत' (Shawl)",
        description: 'The micro letters ‘India’ & भारत’ can be seen on Mahatma Gandhi’s shawl fold.',
        side: 'obverse',
        coordinates: { x: 48.5, y: 81.6 },
        gifUrl: './banknotes/features/feat-10-s4.webp'
      },
      {
        id: 'feat-10-s5',
        num: '05',
        title: "Micro Letters 'RBI10INDIA'",
        description: 'The microletters \'RBI10INDIA\' can be seen on the left side of the bank note.',
        side: 'obverse',
        coordinates: { x: 6.8, y: 47.9 },
        gifUrl: './banknotes/features/feat-10-s5.webp'
      },
      {
        id: 'feat-10-s6',
        num: '06',
        title: 'Watermark & Electrotype 10',
        description: 'The Mahatma Gandhi portrait and electrotype (10) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 78.3, y: 29.6 },
        gifUrl: './banknotes/features/feat-10-s6.webp'
      },
      {
        id: 'feat-10-s7',
        num: '07',
        title: 'Fluorescent Security Thread & Fibres',
        description: 'Under UV light the security thread emits fluorescent & dual colour fluorescent fibres are seen in the paper. You can also read the inscriptions \'भारत\' and ‘RBI’ under the UV light.',
        side: 'obverse',
        coordinates: { x: 55.2, y: 32.4 },
        gifUrl: './banknotes/features/feat-10-s7.webp'
      }
    ]
  },

  // ==========================================
  // MAHATMA GANDHI PRE-2016 SERIES (1996 - 2016)
  // ==========================================
  {
    id: 'mg-old-1000',
    denomination: '₹ 1,000',
    numeral: 1000,
    series: 'Mahatma Gandhi Series',
    year: '2000',
    dimensions: '177 mm × 73 mm',
    color: 'Amber & Red',
    accent: '#f59e0b',
    motifTitle: 'Economy & Technological Progress of India',
    motifDescription: 'Collage depicting Indian agriculture (combine harvester), petroleum offshore drilling (oil rig), satellite communication dish, space technology, and metallurgy.',
    obverseImage: './specimens/mg_1996_1000_front.jpg',
    reverseImage: './specimens/mg_1996_1000_back.jpg',
    isDemonetized: true,
    demonetizedDate: '8 November 2016',
    demonetizationNotice: 'Officially demonetized and withdrawn from legal tender status on 8 November 2016 during the landmark Indian banknote demonetization.',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-old-1000-d1',
        num: '01',
        title: "Devanagari Numeral 'Ek Hazaar Rupiye'",
        description: "The denominational numeral ‘1000’ is written in Devanagari on the banknote as 'Ek Hazaar Rupiye'.",
        side: 'obverse',
        coordinates: { x: 26, y: 16 }
      },
      {
        id: 'feat-old-1000-d2',
        num: '02',
        title: 'Mahatma Gandhi Portrait',
        description: 'Deeply etched intaglio portrait of Mahatma Gandhi facing right with intricate shading lines along the lapels and hairline.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 }
      },
      {
        id: 'feat-old-1000-d3',
        num: '03',
        title: "Guarantee Clause & Governor's Signature",
        description: "In the centre of the note is the Guarantee Clause, the Governor's signature with a promise of payment.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 }
      },
      {
        id: 'feat-old-1000-d4',
        num: '04',
        title: 'Number Panel (Top Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the top right side of the note.',
        side: 'obverse',
        coordinates: { x: 78, y: 12 }
      },
      {
        id: 'feat-old-1000-d5',
        num: '05',
        title: 'Number Panel (Bottom Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom left side of the note.',
        side: 'obverse',
        coordinates: { x: 28, y: 88 }
      },
      {
        id: 'feat-old-1000-d6',
        num: '06',
        title: 'Ashoka Pillar Lion Capital',
        description: 'Ashoka Pillar emblem engraved on the bottom left of the note with four lions standing back-to-back.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 }
      },
      {
        id: 'feat-old-1000-d7',
        num: '07',
        title: 'Reserve Bank of India Logo',
        description: 'The official Reserve Bank of India seal can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 }
      },
      // Back (Reverse) Design Features (08 - 10)
      {
        id: 'feat-old-1000-rev-d1',
        num: '08',
        title: 'Indian Economy & Technology Motif',
        description: 'A composite montage illustrating the vibrant 21st-century Indian economy: agriculture (combine harvester), petroleum rig, satellite telecommunications, and high-tech metallurgy.',
        side: 'reverse',
        coordinates: { x: 50, y: 50 }
      },
      {
        id: 'feat-old-1000-rev-d2',
        num: '09',
        title: 'Year of Printing',
        description: 'The year of printing can be seen at the base of the note, on the reverse side.',
        side: 'reverse',
        coordinates: { x: 50, y: 92 }
      },
      {
        id: 'feat-old-1000-rev-d3',
        num: '10',
        title: '15-Language Panel',
        description: 'The language panel is seen on the reverse of the note, on the right side. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 76, y: 50 }
      }
    ],
    securityFeatures: [
      {
        id: 'feat-old-1000-s1',
        num: '01',
        title: 'Floral See-Through Register (1000)',
        description: 'Towards the left of the note is a floral design see-through register with numeral 1000 that aligns perfectly when held against light.',
        side: 'obverse',
        coordinates: { x: 20, y: 42 }
      },
      {
        id: 'feat-old-1000-s2',
        num: '02',
        title: 'Latent Image (1000)',
        description: 'A latent image containing the denominational numeral ‘1000’ on the right vertical band, visible when held horizontally at eye level.',
        side: 'obverse',
        coordinates: { x: 92, y: 52 }
      },
      {
        id: 'feat-old-1000-s3',
        num: '03',
        title: 'Optically Variable Ink (OVI) 1000',
        description: 'The numeral 1000 in the center is printed in colour-shifting ink that transforms from green to blue when the note is tilted.',
        side: 'obverse',
        coordinates: { x: 48, y: 40 }
      },
      {
        id: 'feat-old-1000-s4',
        num: '04',
        title: 'Mahatma Gandhi Portrait & Electrotype (1000) Watermark',
        description: 'Multi-tonal Mahatma Gandhi portrait in watermark window alongside electrotype reading 1000, visible when viewed against light.',
        side: 'obverse',
        coordinates: { x: 20, y: 50 }
      },
      {
        id: 'feat-old-1000-s5',
        num: '05',
        title: 'Continuous Security Thread (Reverse View)',
        description: 'The security thread has inscriptions \'भारत\', \'1000\' & ‘RBI’. On the reverse, the thread is visible as a continuous line when viewed against the light.',
        side: 'reverse',
        coordinates: { x: 42, y: 50 }
      },
      {
        id: 'feat-old-1000-s6',
        num: '06',
        title: 'Windowed Security Thread (Obverse)',
        description: 'Windowed security thread with visible text "RBI" and "1000" that exhibits colour shifting and yellow fluorescence under UV light.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 }
      },
      {
        id: 'feat-old-1000-s7',
        num: '07',
        title: "Microletters 'RBI' & '1000'",
        description: "Intricate micro lettering reading 'RBI' and '1000' printed between the portrait and vertical border band.",
        side: 'obverse',
        coordinates: { x: 65, y: 46 }
      },
      {
        id: 'feat-old-1000-s8',
        num: '08',
        title: 'Fluorescent Thread & Dual-Colour Fibres under UV',
        description: 'Under ultraviolet light, the security thread fluoresces intensely and invisible dual-colour security fibres embedded in paper become luminous.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 }
      },
      {
        id: 'feat-old-1000-s9',
        num: '09',
        title: 'Intaglio Raised Print Gandhi Portrait',
        description: 'To aid the visually impaired, intaglio or raised tactile printing is seen and felt on the portrait of Mahatma Gandhi.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 }
      },
      {
        id: 'feat-old-1000-s10',
        num: '10',
        title: 'Intaglio Raised Print Reserve Bank Seal',
        description: 'To aid the visually impaired, intaglio raised printing is felt on the Reserve Bank seal.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 }
      },
      {
        id: 'feat-old-1000-s11',
        num: '11',
        title: 'Intaglio Diamond Identification Mark',
        description: 'To aid the visually impaired, a raised tactile diamond shape on the left edge above the watermark window.',
        side: 'obverse',
        coordinates: { x: 10, y: 42 }
      },
      {
        id: 'feat-old-1000-s12',
        num: '12',
        title: 'Angular Bleed Lines for Visually Impaired',
        description: 'Four angular bleed lines on the left and right borders printed in raised intaglio ink to assist tactile recognition.',
        side: 'obverse',
        coordinates: { x: 5, y: 50 }
      }
    ]
  },

  {
    id: 'mg-old-500',
    denomination: '₹ 500',
    numeral: 500,
    series: 'Mahatma Gandhi Series',
    year: '1997',
    dimensions: '167 mm × 73 mm',
    color: 'Olive & Orange',
    accent: '#84cc16',
    motifTitle: 'Dandi March (Salt Satyagraha, 1930)',
    motifDescription: 'Historic depiction of Mahatma Gandhi leading eleven satyagrahis on the 240-mile Salt March to Dandi, symbolic of peaceful civil disobedience.',
    obverseImage: './specimens/mg_1996_500_front.jpg',
    reverseImage: './specimens/mg_1996_500_back.jpg',
    isDemonetized: true,
    demonetizedDate: '8 November 2016',
    demonetizationNotice: 'Officially demonetized and withdrawn from legal tender status on 8 November 2016 during the landmark Indian banknote demonetization.',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-old-500-d1',
        num: '01',
        title: "Devanagari Numeral 'Paanch Sau Rupiye'",
        description: "The denominational numeral ‘500’ is written in Devanagari on the banknote as 'Paanch Sau Rupiye'.",
        side: 'obverse',
        coordinates: { x: 26, y: 16 }
      },
      {
        id: 'feat-old-500-d2',
        num: '02',
        title: 'Mahatma Gandhi Portrait',
        description: 'Intaglio engraved portrait of Mahatma Gandhi facing right with delicate line work.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 }
      },
      {
        id: 'feat-old-500-d3',
        num: '03',
        title: "Guarantee Clause & Governor's Signature",
        description: "In the centre of the note is the Guarantee Clause, the Governor's signature with a promise of payment.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 }
      },
      {
        id: 'feat-old-500-d4',
        num: '04',
        title: 'Number Panel (Top Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the top right side of the note.',
        side: 'obverse',
        coordinates: { x: 78, y: 12 }
      },
      {
        id: 'feat-old-500-d5',
        num: '05',
        title: 'Number Panel (Bottom Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom left side of the note.',
        side: 'obverse',
        coordinates: { x: 28, y: 88 }
      },
      {
        id: 'feat-old-500-d6',
        num: '06',
        title: 'Ashoka Pillar Lion Capital',
        description: 'Ashoka Pillar emblem on the bottom left of the note in raised intaglio print.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 }
      },
      {
        id: 'feat-old-500-d7',
        num: '07',
        title: 'Reserve Bank of India Logo',
        description: 'The official RBI logo can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 }
      },
      // Back (Reverse) Design Features (08 - 10)
      {
        id: 'feat-old-500-rev-d1',
        num: '08',
        title: 'Dandi March (Gyarah Murti) Motif',
        description: 'Sculptural panorama inspired by Gyarah Murti, depicting Mahatma Gandhi leading freedom marchers on the historic 1930 Salt Satyagraha.',
        side: 'reverse',
        coordinates: { x: 50, y: 50 }
      },
      {
        id: 'feat-old-500-rev-d2',
        num: '09',
        title: 'Year of Printing',
        description: 'The year of printing can be seen at the base of the note, on the reverse side.',
        side: 'reverse',
        coordinates: { x: 50, y: 92 }
      },
      {
        id: 'feat-old-500-rev-d3',
        num: '10',
        title: '15-Language Panel',
        description: 'The language panel is seen on the reverse of the note, on the right side. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 76, y: 50 }
      }
    ],
    securityFeatures: [
      {
        id: 'feat-old-500-s1',
        num: '01',
        title: 'Floral See-Through Register (500)',
        description: 'Towards the left of the note is a floral design see-through register with numeral 500 visible when held against light.',
        side: 'obverse',
        coordinates: { x: 20, y: 42 }
      },
      {
        id: 'feat-old-500-s2',
        num: '02',
        title: 'Latent Image (500)',
        description: 'A latent image containing numeral 500 on the right vertical band, visible when held horizontally at eye level.',
        side: 'obverse',
        coordinates: { x: 92, y: 52 }
      },
      {
        id: 'feat-old-500-s3',
        num: '03',
        title: 'Colour-Shifting OVI 500',
        description: 'Denomination numeral 500 printed in optically variable ink (OVI) that shifts colour from green to blue when tilted.',
        side: 'obverse',
        coordinates: { x: 48, y: 40 }
      },
      {
        id: 'feat-old-500-s4',
        num: '04',
        title: 'Mahatma Gandhi Portrait & Electrotype (500) Watermark',
        description: 'Watermark window containing Mahatma Gandhi smiling portrait alongside electrotype numeral 500.',
        side: 'obverse',
        coordinates: { x: 20, y: 50 }
      },
      {
        id: 'feat-old-500-s5',
        num: '05',
        title: 'Continuous Security Thread (Reverse View)',
        description: 'The security thread has inscriptions \'भारत\', \'500\' & ‘RBI’. On the reverse, the thread is visible as a continuous line when viewed against light.',
        side: 'reverse',
        coordinates: { x: 42, y: 50 }
      },
      {
        id: 'feat-old-500-s6',
        num: '06',
        title: 'Windowed Security Thread (Obverse)',
        description: 'Segmented security thread with visible text "RBI" and "500" that fluoresces under ultraviolet illumination.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 }
      },
      {
        id: 'feat-old-500-s7',
        num: '07',
        title: "Microletters 'RBI' & '500'",
        description: "Micro letters 'RBI' and '500' printed between the Gandhi portrait and the vertical edge.",
        side: 'obverse',
        coordinates: { x: 65, y: 46 }
      },
      {
        id: 'feat-old-500-s8',
        num: '08',
        title: 'Fluorescent Thread & Dual-Colour Fibres under UV',
        description: 'Security thread emits fluorescence and embedded dual-colour fibres become visible under UV light.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 }
      },
      {
        id: 'feat-old-500-s9',
        num: '09',
        title: 'Intaglio Raised Print Gandhi Portrait',
        description: 'Intaglio raised printing on Mahatma Gandhi portrait for tactile verification.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 }
      },
      {
        id: 'feat-old-500-s10',
        num: '10',
        title: 'Intaglio Circular Identification Mark',
        description: 'Tactile circular mark on the left margin above the watermark window for visually impaired recognition.',
        side: 'obverse',
        coordinates: { x: 10, y: 42 }
      },
      {
        id: 'feat-old-500-s11',
        num: '11',
        title: 'Angular Bleed Lines for Visually Impaired',
        description: 'Five angular bleed lines on the left and right border in raised intaglio print to assist identification.',
        side: 'obverse',
        coordinates: { x: 5, y: 50 }
      }
    ]
  },

  {
    id: 'mg-old-100',
    denomination: '₹ 100',
    numeral: 100,
    series: 'Mahatma Gandhi Series',
    year: '1996',
    dimensions: '157 mm × 73 mm',
    color: 'Blue-Green & Purple',
    accent: '#06b6d4',
    motifTitle: 'Mount Kanchenjunga (Himalayan Range)',
    motifDescription: "Spectacular panoramic vista of Mount Kanchenjunga, the world's third highest peak situated on the India-Nepal border in Sikkim.",
    obverseImage: './specimens/mg_1996_100_front.jpg',
    reverseImage: './specimens/mg_1996_100_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-old-100-d1',
        num: '01',
        title: "Devanagari Numeral 'Ek Sau Rupiye'",
        description: "The denominational numeral ‘100’ is written in Devanagari on the banknote as 'Ek Sau Rupiye'.",
        side: 'obverse',
        coordinates: { x: 26, y: 16 },
        gifUrl: './banknotes/features/feat-old-100-d1.webp'
      },
      {
        id: 'feat-old-100-d2',
        num: '02',
        title: 'Mahatma Gandhi Portrait',
        description: 'The portrait of Mahatma Gandhi can be seen on the right side of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 },
        gifUrl: './banknotes/features/feat-old-100-d2.webp'
      },
      {
        id: 'feat-old-100-d3',
        num: '03',
        title: "Guarantee Clause & Governor's Signature",
        description: "In the centre of the note is the Guarantee Clause, the Governor's signature with a promise of payment.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 },
        gifUrl: './banknotes/features/feat-old-100-d3.webp'
      },
      {
        id: 'feat-old-100-d4',
        num: '04',
        title: 'Number Panel (Top Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the top right side of the note.',
        side: 'obverse',
        coordinates: { x: 78, y: 12 },
        gifUrl: './banknotes/features/feat-old-100-d4.webp'
      },
      {
        id: 'feat-old-100-d5',
        num: '05',
        title: 'Number Panel (Bottom Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom left side of the note.',
        side: 'obverse',
        coordinates: { x: 28, y: 88 },
        gifUrl: './banknotes/features/feat-old-100-d5.webp'
      },
      {
        id: 'feat-old-100-d6',
        num: '06',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom left of the note.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 },
        gifUrl: './banknotes/features/feat-old-100-d6.webp'
      },
      {
        id: 'feat-old-100-d7',
        num: '07',
        title: 'Reserve Bank of India Logo',
        description: 'The RBI logo can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 },
        gifUrl: './banknotes/features/feat-old-100-d7.webp'
      },
      // Back (Reverse) Design Features (08 - 09)
      {
        id: 'feat-old-100-rev-d1',
        num: '08',
        title: 'Year of Printing',
        description: 'The year of printing can be seen at the base of the note, on the reverse side.',
        side: 'reverse',
        coordinates: { x: 50, y: 92 },
        gifUrl: './banknotes/features/feat-old-100-rev-d1.webp'
      },
      {
        id: 'feat-old-100-rev-d2',
        num: '09',
        title: '15-Language Panel',
        description: 'The language panel is seen on the reverse of the note, on the right side. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 76, y: 50 },
        gifUrl: './banknotes/features/feat-old-100-rev-d2.webp'
      }
    ],
    securityFeatures: [
      {
        id: 'feat-old-100-s1',
        num: '01',
        title: 'Floral See-Through Register (100)',
        description: 'Towards the left of the note is a floral design see through register with the denominational numeral 100 that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 20, y: 42 },
        gifUrl: './banknotes/features/feat-old-100-s1.webp'
      },
      {
        id: 'feat-old-100-s2',
        num: '02',
        title: 'Latent Image (100)',
        description: 'A latent image with the denominational numeral ‘100’ is on the right side of the note. To view, hold the note horizontally at eye level.',
        side: 'obverse',
        coordinates: { x: 92, y: 52 },
        gifUrl: './banknotes/features/feat-old-100-s2.webp'
      },
      {
        id: 'feat-old-100-s3',
        num: '03',
        title: 'Mahatma Gandhi Portrait & Electrotype Watermark',
        description: 'The Mahatma Gandhi portrait and electrotype (100) watermark can be seen towards the left on the obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 20, y: 50 },
        gifUrl: './banknotes/features/feat-old-100-s3.webp'
      },
      {
        id: 'feat-old-100-s4',
        num: '04',
        title: 'Continuous Security Thread (Reverse View)',
        description: 'The security thread has inscriptions \'भारत\' & ‘RBI’. On the reverse, the thread is visible as a continuous line when viewed against the light.',
        side: 'reverse',
        coordinates: { x: 42, y: 50 },
        gifUrl: './banknotes/features/feat-old-100-s4.webp'
      },
      {
        id: 'feat-old-100-s5',
        num: '05',
        title: 'Colour Shift Windowed Security Thread',
        description: 'The colour shift windowed security thread colour changes from green to blue on tilting.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 },
        gifUrl: './banknotes/features/feat-old-100-s5.webp'
      },
      {
        id: 'feat-old-100-s6',
        num: '06',
        title: "Microletters 'RBI' & '100'",
        description: "The micro letters 'RBI' & ‘100’ can be seen next to the Mahatma Gandhi's portrait and on the vertical band on the obverse side.",
        side: 'obverse',
        coordinates: { x: 65, y: 46 },
        gifUrl: './banknotes/features/feat-old-100-s6.webp'
      },
      {
        id: 'feat-old-100-s7',
        num: '07',
        title: 'Fluorescent Thread & Fibres under UV',
        description: 'Under ultraviolet (UV) light the security thread emits fluorescent light and dual colour fluorescent fibres are seen.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 },
        gifUrl: './banknotes/features/feat-old-100-s7.webp'
      },
      {
        id: 'feat-old-100-s8',
        num: '08',
        title: 'Intaglio Raised Print Gandhi Portrait',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the Mahatma Gandhi portrait.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 },
        gifUrl: './banknotes/features/feat-old-100-s8.webp'
      },
      {
        id: 'feat-old-100-s9',
        num: '09',
        title: 'Intaglio Raised Print Reserve Bank Seal',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the Reserve Bank seal.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 },
        gifUrl: './banknotes/features/feat-old-100-s9.webp'
      },
      {
        id: 'feat-old-100-s10',
        num: '10',
        title: "Intaglio Guarantee Clause & 'Ek Sau Rupiye'",
        description: "To aid the visually impaired, intaglio or raised printing is seen & felt on Guarantee Clause, ‘Ek Sau Rupiye’, Governor's signature and Promise clause in the centre of the note.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 },
        gifUrl: './banknotes/features/feat-old-100-s10.webp'
      },
      {
        id: 'feat-old-100-s11',
        num: '11',
        title: 'Intaglio Ashoka Pillar Emblem',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on Ashoka Pillar emblem.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 },
        gifUrl: './banknotes/features/feat-old-100-s11.webp'
      },
      {
        id: 'feat-old-100-s12',
        num: '12',
        title: 'Angular Bleed Lines for Visually Impaired',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the angular bleed lines.',
        side: 'obverse',
        coordinates: { x: 5, y: 50 },
        gifUrl: './banknotes/features/feat-old-100-s12.webp'
      },
      {
        id: 'feat-old-100-s13',
        num: '13',
        title: 'Triangular Identification Mark',
        description: 'To aid the visually impaired, a triangular identification mark on the left side in raised print is seen on the obverse side.',
        side: 'obverse',
        coordinates: { x: 10, y: 42 },
        gifUrl: './banknotes/features/feat-old-100-s13.webp'
      }
    ]
  },

  {
    id: 'mg-old-50',
    denomination: '₹ 50',
    numeral: 50,
    series: 'Mahatma Gandhi Series',
    year: '1997',
    dimensions: '147 mm × 73 mm',
    color: 'Mauve & Lilac',
    accent: '#a855f7',
    motifTitle: 'Parliament House of India (Sansad Bhavan)',
    motifDescription: 'The colonnaded circular architectural masterpiece in New Delhi designed by Sir Edwin Lutyens and Herbert Baker, the sovereign seat of Indian democracy.',
    obverseImage: './specimens/mg_1996_50_front.jpg',
    reverseImage: './specimens/mg_1996_50_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-old-50-d1',
        num: '01',
        title: "Devanagari Numeral 'Pachaas Rupiye'",
        description: "The denominational numeral ‘50’ is written Devanagari on the banknote as 'Pachaas Rupiye'.",
        side: 'obverse',
        coordinates: { x: 26, y: 16 },
        gifUrl: './banknotes/features/feat-old-50-d1.webp'
      },
      {
        id: 'feat-old-50-d2',
        num: '02',
        title: 'Mahatma Gandhi Portrait',
        description: 'The portrait of Mahatma Gandhi can be seen on the right side of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 },
        gifUrl: './banknotes/features/feat-old-50-d2.webp'
      },
      {
        id: 'feat-old-50-d3',
        num: '03',
        title: "Guarantee Clause & Governor's Signature",
        description: "In the centre of the note is the Guarantee Clause, the Governor's signature with a promise of payment.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 },
        gifUrl: './banknotes/features/feat-old-50-d3.webp'
      },
      {
        id: 'feat-old-50-d4',
        num: '04',
        title: 'Number Panel (Top Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the top right side of the note.',
        side: 'obverse',
        coordinates: { x: 78, y: 12 },
        gifUrl: './banknotes/features/feat-old-50-d4.webp'
      },
      {
        id: 'feat-old-50-d5',
        num: '05',
        title: 'Number Panel (Bottom Left)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom left side of the note.',
        side: 'obverse',
        coordinates: { x: 28, y: 88 },
        gifUrl: './banknotes/features/feat-old-50-d5.webp'
      },
      {
        id: 'feat-old-50-d6',
        num: '06',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom left of the note.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 },
        gifUrl: './banknotes/features/feat-old-50-d6.webp'
      },
      {
        id: 'feat-old-50-d7',
        num: '07',
        title: 'Reserve Bank of India Logo',
        description: 'The RBI logo can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 },
        gifUrl: './banknotes/features/feat-old-50-d7.webp'
      },
      // Back (Reverse) Design Features (08 - 09)
      {
        id: 'feat-old-50-rev-d1',
        num: '08',
        title: 'Year of Printing',
        description: 'The year of printing can be seen at the base of the note, on the reverse side.',
        side: 'reverse',
        coordinates: { x: 50, y: 92 },
        gifUrl: './banknotes/features/feat-old-50-rev-d1.webp'
      },
      {
        id: 'feat-old-50-rev-d2',
        num: '09',
        title: '15-Language Panel',
        description: 'The language panel is seen on the reverse of the note, on the right side. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 76, y: 50 },
        gifUrl: './banknotes/features/feat-old-50-rev-d2.webp'
      }
    ],
    securityFeatures: [
      {
        id: 'feat-old-50-s1',
        num: '01',
        title: 'Floral See-Through Register (50)',
        description: 'Towards the left of the note is a floral design see through register with the denominational numeral \'50\' that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 20, y: 42 },
        gifUrl: './banknotes/features/feat-old-50-s1.webp'
      },
      {
        id: 'feat-old-50-s2',
        num: '02',
        title: 'Latent Image (50)',
        description: 'A latent image with the denominational numeral ‘50’ is on the right side of the note. To view, hold the note horizontally at the eye level.',
        side: 'obverse',
        coordinates: { x: 92, y: 52 },
        gifUrl: './banknotes/features/feat-old-50-s2.webp'
      },
      {
        id: 'feat-old-50-s3',
        num: '03',
        title: 'Mahatma Gandhi Portrait & Electrotype Watermark',
        description: 'The Mahatma Gandhi portrait and electrotype (50) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 20, y: 50 },
        gifUrl: './banknotes/features/feat-old-50-s3.webp'
      },
      {
        id: 'feat-old-50-s4',
        num: '04',
        title: 'Continuous Security Thread (Reverse View)',
        description: 'The security thread has inscriptions \'भारत\' & ‘RBI’. On the reverse, the thread is visible as a continuous line when viewed against the light.',
        side: 'reverse',
        coordinates: { x: 42, y: 50 },
        gifUrl: './banknotes/features/feat-old-50-s4.webp'
      },
      {
        id: 'feat-old-50-s5',
        num: '05',
        title: "Microletters 'RBI' & '50'",
        description: "The micro letters 'RBI' & ‘50’ can be seen next to the Mahatma Gandhi's portrait & the vertical band on the obverse side.",
        side: 'obverse',
        coordinates: { x: 65, y: 46 },
        gifUrl: './banknotes/features/feat-old-50-s5.webp'
      },
      {
        id: 'feat-old-50-s6',
        num: '06',
        title: 'Fluorescent Thread & Fibres under UV',
        description: 'Under ultraviolet (UV) light the security thread emits fluorescent light & dual colour fluorescent fibres are seen in the paper.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 },
        gifUrl: './banknotes/features/feat-old-50-s6.webp'
      },
      {
        id: 'feat-old-50-s7',
        num: '07',
        title: 'Intaglio Raised Print Gandhi Portrait',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the Mahatma Gandhi portrait.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 },
        gifUrl: './banknotes/features/feat-old-50-s7.webp'
      },
      {
        id: 'feat-old-50-s8',
        num: '08',
        title: 'Intaglio Raised Print Reserve Bank Seal',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the Reserve Bank seal.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 },
        gifUrl: './banknotes/features/feat-old-50-s8.webp'
      },
      {
        id: 'feat-old-50-s9',
        num: '09',
        title: "Intaglio Guarantee Clause & 'Pachaas Rupiye'",
        description: "To aid the visually impaired, intaglio or raised printing is seen & felt on the Guarantee Clause, ‘Pachaas Rupiye’, Governor's signature and Promise clause in the centre of the note.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 },
        gifUrl: './banknotes/features/feat-old-50-s9.webp'
      },
      {
        id: 'feat-old-50-s10',
        num: '10',
        title: 'Intaglio Ashoka Pillar Emblem',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the Ashoka Pillar emblem.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 },
        gifUrl: './banknotes/features/feat-old-50-s10.webp'
      },
      {
        id: 'feat-old-50-s11',
        num: '11',
        title: 'Square Identification Mark',
        description: 'To aid the visually impaired, a square identification mark on the left side in raised printing is seen on the obverse side.',
        side: 'obverse',
        coordinates: { x: 10, y: 42 },
        gifUrl: './banknotes/features/feat-old-50-s11.webp'
      }
    ]
  },

  {
    id: 'mg-old-20',
    denomination: '₹ 20',
    numeral: 20,
    series: 'Mahatma Gandhi Series',
    year: '2001',
    dimensions: '147 mm × 63 mm',
    color: 'Reddish Orange',
    accent: '#f97316',
    motifTitle: 'Mount Harriet, Andaman & Nicobar Islands',
    motifDescription: 'Panoramic tropical coastal landscape showing palm trees, ocean waves, and the historic lighthouse viewed from Mount Harriet (Mount Manipur) in the Bay of Bengal.',
    obverseImage: './specimens/mg_1996_20_front.jpg',
    reverseImage: './specimens/mg_1996_20_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-old-20-d1',
        num: '01',
        title: "Devanagari Numeral 'Bees Rupiye'",
        description: "The denominational numeral ‘20’ is written in Devanagari on the banknote as 'Bees Rupiye'.",
        side: 'obverse',
        coordinates: { x: 26, y: 16 },
        gifUrl: './banknotes/features/feat-old-20-d1.webp'
      },
      {
        id: 'feat-old-20-d2',
        num: '02',
        title: 'Mahatma Gandhi Portrait',
        description: 'The portrait of Mahatma Gandhi can be seen on the right side of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 },
        gifUrl: './banknotes/features/feat-old-20-d2.webp'
      },
      {
        id: 'feat-old-20-d3',
        num: '03',
        title: "Guarantee Clause & Governor's Signature",
        description: "In the centre of the note is the Guarantee Clause, the Governor's signature with a promise of payment.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 },
        gifUrl: './banknotes/features/feat-old-20-d3.webp'
      },
      {
        id: 'feat-old-20-d4',
        num: '04',
        title: 'Number Panel (Top Right)',
        description: 'The number panel with numerals growing from small to big can be seen top right side of the note.',
        side: 'obverse',
        coordinates: { x: 78, y: 12 },
        gifUrl: './banknotes/features/feat-old-20-d4.webp'
      },
      {
        id: 'feat-old-20-d5',
        num: '05',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom left of the note.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 },
        gifUrl: './banknotes/features/feat-old-20-d5.webp'
      },
      {
        id: 'feat-old-20-d6',
        num: '06',
        title: 'Number Panel (Bottom Left)',
        description: 'The number panel with numerals growing from small to big can be seen bottom left side of the note.',
        side: 'obverse',
        coordinates: { x: 28, y: 88 },
        gifUrl: './banknotes/features/feat-old-20-d6.webp'
      },
      {
        id: 'feat-old-20-d7',
        num: '07',
        title: 'Reserve Bank of India Logo',
        description: 'The RBI logo can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 },
        gifUrl: './banknotes/features/feat-old-20-d7.webp'
      },
      // Back (Reverse) Design Features (08 - 09)
      {
        id: 'feat-old-20-rev-d1',
        num: '08',
        title: 'Year of Printing',
        description: 'The year of printing can be seen at the base of the note, on the reverse side.',
        side: 'reverse',
        coordinates: { x: 50, y: 92 },
        gifUrl: './banknotes/features/feat-old-20-rev-d1.webp'
      },
      {
        id: 'feat-old-20-rev-d2',
        num: '09',
        title: '15-Language Panel',
        description: 'The language panel is seen on the reverse of the note, on the right side. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 76, y: 50 },
        gifUrl: './banknotes/features/feat-old-20-rev-d2.webp'
      }
    ],
    securityFeatures: [
      {
        id: 'feat-old-20-s1',
        num: '01',
        title: 'Floral See-Through Register (20)',
        description: 'Towards the left of the note is a see-through register with the denominational numeral 20 that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 20, y: 42 },
        gifUrl: './banknotes/features/feat-old-20-s1.webp'
      },
      {
        id: 'feat-old-20-s2',
        num: '02',
        title: 'Latent Image (20)',
        description: 'A latent image with the denominational numeral ‘20’ is on the right side of the note. To view, hold the note horizontally at eye level.',
        side: 'obverse',
        coordinates: { x: 92, y: 52 },
        gifUrl: './banknotes/features/feat-old-20-s2.webp'
      },
      {
        id: 'feat-old-20-s3',
        num: '03',
        title: 'Mahatma Gandhi Portrait & Electrotype Watermark',
        description: 'The Mahatma Gandhi portrait and electrotype (20) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 20, y: 50 },
        gifUrl: './banknotes/features/feat-old-20-s3.webp'
      },
      {
        id: 'feat-old-20-s4',
        num: '04',
        title: 'Continuous Security Thread (Reverse View)',
        description: 'The security thread has inscriptions \'भारत\' & ‘RBI’. On the reverse, the thread is visible as a continuous line when viewed against the light.',
        side: 'reverse',
        coordinates: { x: 42, y: 50 },
        gifUrl: './banknotes/features/feat-old-20-s4.webp'
      },
      {
        id: 'feat-old-20-s5',
        num: '05',
        title: "Microletters 'RBI' & '20'",
        description: "The micro letters 'RBI & 20’ can be seen next to the Mahatma Gandhi's portrait & in the vertical band on the obverse side.",
        side: 'obverse',
        coordinates: { x: 65, y: 46 },
        gifUrl: './banknotes/features/feat-old-20-s5.webp'
      },
      {
        id: 'feat-old-20-s6',
        num: '06',
        title: 'Fluorescent Thread & Fibres under UV',
        description: 'Under ultraviolet (UV) light the security thread emits fluorescent light & dual colour fluorescent fibres are seen.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 },
        gifUrl: './banknotes/features/feat-old-20-s6.webp'
      },
      {
        id: 'feat-old-20-s7',
        num: '07',
        title: 'Intaglio Raised Print Gandhi Portrait',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the Mahatma Gandhi’s portrait.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 },
        gifUrl: './banknotes/features/feat-old-20-s7.webp'
      },
      {
        id: 'feat-old-20-s8',
        num: '08',
        title: 'Intaglio Raised Print Reserve Bank Seal',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the Reserve Bank seal.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 },
        gifUrl: './banknotes/features/feat-old-20-s8.webp'
      },
      {
        id: 'feat-old-20-s9',
        num: '09',
        title: "Intaglio Guarantee Clause & 'Bees Rupiye'",
        description: "To aid the visually impaired, intaglio or raised printing is seen & felt on the writings ‘Bees Rupiye’, the Governor's signature with promise clause in the center of the note.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 },
        gifUrl: './banknotes/features/feat-old-20-s9.webp'
      },
      {
        id: 'feat-old-20-s10',
        num: '10',
        title: 'Intaglio Ashoka Pillar Emblem',
        description: 'To aid the visually impaired, intaglio or raised printing is seen & felt on the Ashoka Pillar emblem.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 },
        gifUrl: './banknotes/features/feat-old-20-s10.webp'
      }
    ]
  },

  {
    id: 'mg-old-10',
    denomination: '₹ 10',
    numeral: 10,
    series: 'Mahatma Gandhi Series',
    year: '1996',
    dimensions: '137 mm × 63 mm',
    color: 'Orange-Brown',
    accent: '#d97706',
    motifTitle: 'Fauna of India (Rhinoceros, Elephant, Tiger)',
    motifDescription: 'Composite wildlife montage featuring three iconic protected animals of the subcontinent: the One-horned Rhinoceros, the Indian Elephant, and the Royal Bengal Tiger.',
    obverseImage: './specimens/mg_1996_10_front.jpg',
    reverseImage: './specimens/mg_1996_10_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 07)
      {
        id: 'feat-old-10-d1',
        num: '01',
        title: "Devanagari Numeral 'Das Rupiye'",
        description: "The denominational numeral ‘10’ is written Devanagari on the banknote as 'Das Rupiye'.",
        side: 'obverse',
        coordinates: { x: 26, y: 16 },
        gifUrl: './banknotes/features/feat-old-10-d1.webp'
      },
      {
        id: 'feat-old-10-d2',
        num: '02',
        title: 'Mahatma Gandhi Portrait',
        description: 'The portrait of Mahatma Gandhi can be seen on the right side of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 },
        gifUrl: './banknotes/features/feat-old-10-d2.webp'
      },
      {
        id: 'feat-old-10-d3',
        num: '03',
        title: "Guarantee Clause & Governor's Signature",
        description: "In the centre of the note is the Guarantee Clause, the Governor's signature with a promise of payment.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 },
        gifUrl: './banknotes/features/feat-old-10-d3.webp'
      },
      {
        id: 'feat-old-10-d4',
        num: '04',
        title: 'Number Panel (Top Right)',
        description: 'The number panel, with numerals growing from small to big, can be seen on the top right side of the note.',
        side: 'obverse',
        coordinates: { x: 78, y: 12 },
        gifUrl: './banknotes/features/feat-old-10-d4.webp'
      },
      {
        id: 'feat-old-10-d5',
        num: '05',
        title: 'Number Panel (Bottom Left)',
        description: 'The number panel, with numerals growing from small to big, can be seen on the bottom left side of the note.',
        side: 'obverse',
        coordinates: { x: 28, y: 88 },
        gifUrl: './banknotes/features/feat-old-10-d5.webp'
      },
      {
        id: 'feat-old-10-d6',
        num: '06',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen in the bottom left of the note.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 },
        gifUrl: './banknotes/features/feat-old-10-d6.webp'
      },
      {
        id: 'feat-old-10-d7',
        num: '07',
        title: 'Reserve Bank of India Logo',
        description: 'The RBI logo can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 },
        gifUrl: './banknotes/features/feat-old-10-d7.webp'
      },
      // Back (Reverse) Design Features (08 - 09)
      {
        id: 'feat-old-10-rev-d1',
        num: '08',
        title: 'Year of Printing',
        description: 'The year of printing can be seen at the base of the note, on the reverse side.',
        side: 'reverse',
        coordinates: { x: 50, y: 92 },
        gifUrl: './banknotes/features/feat-old-10-rev-d1.webp'
      },
      {
        id: 'feat-old-10-rev-d2',
        num: '09',
        title: '15-Language Panel',
        description: 'The language panel is seen on the reverse of the note, on the right side. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 76, y: 50 },
        gifUrl: './banknotes/features/feat-old-10-rev-d2.webp'
      }
    ],
    securityFeatures: [
      {
        id: 'feat-old-10-s1',
        num: '01',
        title: 'Floral See-Through Register (10)',
        description: 'Towards the left of the note is a floral design see through register with the denominational numeral 10 that can be seen when the note is held against light.',
        side: 'obverse',
        coordinates: { x: 20, y: 42 },
        gifUrl: './banknotes/features/feat-old-10-s1.webp'
      },
      {
        id: 'feat-old-10-s2',
        num: '02',
        title: 'Mahatma Gandhi Portrait & Electrotype Watermark',
        description: 'The Mahatma Gandhi portrait and electrotype (10) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 20, y: 50 },
        gifUrl: './banknotes/features/feat-old-10-s2.webp'
      },
      {
        id: 'feat-old-10-s3',
        num: '03',
        title: 'Continuous Security Thread (Reverse View)',
        description: 'The security thread has inscriptions \'भारत\' & ‘RBI’. On the reverse, the thread is visible as a continuous line when viewed against the light.',
        side: 'reverse',
        coordinates: { x: 42, y: 50 },
        gifUrl: './banknotes/features/feat-old-10-s3.webp'
      },
      {
        id: 'feat-old-10-s4',
        num: '04',
        title: "Microletters 'RBI'",
        description: "The micro letters 'RBI’ can be seen next to Mahatma Gandhi's portrait and on the vertical band on the obverse side.",
        side: 'obverse',
        coordinates: { x: 65, y: 46 },
        gifUrl: './banknotes/features/feat-old-10-s4.webp'
      },
      {
        id: 'feat-old-10-s5',
        num: '05',
        title: 'Fluorescent Thread & Fibres under UV',
        description: 'Under ultraviolet (UV) light the security thread emits fluorescent light and dual colour fluorescent fibres are seen.',
        side: 'obverse',
        coordinates: { x: 58, y: 50 },
        gifUrl: './banknotes/features/feat-old-10-s5.webp'
      }
    ]
  },

  {
    id: 'mg-old-5',
    denomination: '₹ 5',
    numeral: 5,
    series: 'Mahatma Gandhi Series',
    year: '2001',
    dimensions: '117 mm × 63 mm',
    color: 'Green & Pink',
    accent: '#10b981',
    motifTitle: 'Green Revolution (Agriculture & Modern Tractor)',
    motifDescription: 'A triumphant emblem of agrarian self-sufficiency depicting an Indian farmer steering a modern tractor at sunrise across fertile fields with electric power lines.',
    obverseImage: './specimens/mg_1996_5_front.jpg',
    reverseImage: './specimens/mg_1996_5_back.jpg',
    designFeatures: [
      // Front (Obverse) Design Features (01 - 06)
      {
        id: 'feat-old-5-d1',
        num: '01',
        title: "Devanagari Numeral 'Paanch Rupaiya'",
        description: "The denominational numeral ‘5’ is written in Devanagari on the banknote as 'Paanch Rupaiya'.",
        side: 'obverse',
        coordinates: { x: 26, y: 16 },
        gifUrl: './banknotes/features/feat-old-5-d1.webp'
      },
      {
        id: 'feat-old-5-d2',
        num: '02',
        title: 'Mahatma Gandhi Portrait',
        description: 'The portrait of Mahatma Gandhi can be seen on the right side of the banknote on the obverse side.',
        side: 'obverse',
        coordinates: { x: 74, y: 48 },
        gifUrl: './banknotes/features/feat-old-5-d2.webp'
      },
      {
        id: 'feat-old-5-d3',
        num: '03',
        title: "Guarantee Clause & Governor's Signature",
        description: "On the centre of the note is the Guarantee Clause, the Governor's signature with a promise of payment.",
        side: 'obverse',
        coordinates: { x: 48, y: 55 },
        gifUrl: './banknotes/features/feat-old-5-d3.webp'
      },
      {
        id: 'feat-old-5-d4',
        num: '04',
        title: 'Number Panel (Bottom Right)',
        description: 'The number panel with numerals growing from small to big can be seen on the bottom right side of the note.',
        side: 'obverse',
        coordinates: { x: 78, y: 88 },
        gifUrl: './banknotes/features/feat-old-5-d4.webp'
      },
      {
        id: 'feat-old-5-d5',
        num: '05',
        title: 'Ashoka Pillar Emblem',
        description: 'The Ashoka Pillar emblem can be seen on the bottom left of the note.',
        side: 'obverse',
        coordinates: { x: 12, y: 78 },
        gifUrl: './banknotes/features/feat-old-5-d5.webp'
      },
      {
        id: 'feat-old-5-d6',
        num: '06',
        title: 'Reserve Bank of India Logo',
        description: 'The RBI logo can be seen on the bottom right of the note.',
        side: 'obverse',
        coordinates: { x: 88, y: 84 },
        gifUrl: './banknotes/features/feat-old-5-d6.webp'
      },
      // Back (Reverse) Design Features (07 - 08)
      {
        id: 'feat-old-5-rev-d1',
        num: '07',
        title: 'Year of Printing',
        description: 'The year of printing can be seen at the base of the note, on the reverse side.',
        side: 'reverse',
        coordinates: { x: 50, y: 92 },
        gifUrl: './banknotes/features/feat-old-5-rev-d1.webp'
      },
      {
        id: 'feat-old-5-rev-d2',
        num: '08',
        title: '15-Language Panel',
        description: 'The language panel is seen on the reverse of the note, on the right side. It has the banknote denomination written in 15 different Indian languages.',
        side: 'reverse',
        coordinates: { x: 76, y: 50 },
        gifUrl: './banknotes/features/feat-old-5-rev-d2.webp'
      }
    ],
    securityFeatures: [
      {
        id: 'feat-old-5-s1',
        num: '01',
        title: 'Floral See-Through Register (5)',
        description: 'Towards the left is a floral design or see-through register. It is printed on both sides and appears as one when held against the light.',
        side: 'obverse',
        coordinates: { x: 20, y: 42 },
        gifUrl: './banknotes/features/feat-old-5-s1.webp'
      },
      {
        id: 'feat-old-5-s2',
        num: '02',
        title: 'Mahatma Gandhi Portrait & Electrotype Watermark',
        description: 'The Mahatma Gandhi portrait and electrotype (5) watermark can be seen on the right obverse side, when held against the light.',
        side: 'obverse',
        coordinates: { x: 20, y: 50 },
        gifUrl: './banknotes/features/feat-old-5-s2.webp'
      },
      {
        id: 'feat-old-5-s3',
        num: '03',
        title: 'Continuous Security Thread (Reverse View)',
        description: 'The security thread has inscriptions \'भारत\' & ‘RBI’. On the reverse, the thread is visible as a continuous line when viewed against the light.',
        side: 'reverse',
        coordinates: { x: 42, y: 50 },
        gifUrl: './banknotes/features/feat-old-5-s3.webp'
      },
      {
        id: 'feat-old-5-s4',
        num: '04',
        title: "Microletters 'RBI'",
        description: "The microletters RBI can be seen next to the Mahatma Gandhi's portrait & the vertical band on the obverse side.",
        side: 'obverse',
        coordinates: { x: 65, y: 46 },
        gifUrl: './banknotes/features/feat-old-5-s4.webp'
      }
    ]
  }
];
