
import { ProgramDay } from './types';

export const NOTIFICATION_EMAIL = 'helio@wizo.org';

export const FEDERATIONS = [
  'USA', 'United Kingdom', 'France', 'Brazil', 'Argentina', 
  'South Africa', 'Australia', 'Canada', 'Germany', 'Israel',
  'Switzerland', 'Netherlands', 'Belgium', 'Italy', 'Mexico',
  'Panama', 'Chile', 'Uruguay', 'Venezuela', 'Colombia',
  'Spain', 'Austria', 'Hungary', 'Greece', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'India'
];

export const PROGRAM: ProgramDay[] = [
  {
    day: 1,
    date: 'Sunday, Jan 18',
    title: 'Opening Day',
    subtitle: '"We Are Here"',
    activities: [
      { time: 'Morning', activity: 'Immersive Visits Across Israel', description: 'Personalized site visits to WIZO projects.' },
      { time: '16:00', activity: 'Regional Meetings', description: 'European & Ibero-American Federations.' },
      { time: '18:30', activity: 'Opening & Welcome Event', description: 'Rebecca Sieff House - Honoring Tova Ben Dov z"l.' }
    ]
  },
  {
    day: 2,
    date: 'Monday, Jan 19',
    title: 'Journey to the Jezreel Valley',
    subtitle: 'Nir HaEmek Youth Village',
    activities: [
      { time: '08:00', activity: 'Departure', description: 'From Hilton, Carlton & WIZO HQ.' },
      { time: '10:30', activity: 'Official Opening Session', description: 'Welcome by Anita Friedman & Esther Mor.' },
      { time: '15:00', activity: 'Empowering the Next Generation', description: 'Immersive experiential sessions at the village.' }
    ]
  },
  {
    day: 3,
    date: 'Tuesday, Jan 20',
    title: 'Jerusalem & Leadership',
    subtitle: 'Heritage & Renewal',
    activities: [
      { time: '08:30', activity: 'Departure', description: 'From Hilton, Carlton & WIZO HQ.' },
      { time: '10:00', activity: 'National Institutions Building', description: 'Remarks by Mr. Yizhar Hess.' },
      { time: '14:00', activity: 'Visit to the Kotel', description: 'A quiet moment at the heart of Jewish history.' },
      { time: '18:00', activity: 'Daniel Hagari Session', description: 'Reflections on leadership in times of crisis.' }
    ]
  },
  {
    day: 4,
    date: 'Wednesday, Jan 21',
    title: 'Israel\'s Northern Edge',
    subtitle: 'From Trauma to Renewal',
    activities: [
      { time: '08:00', activity: 'Departure', description: 'From Hilton, Carlton & WIZO HQ.' },
      { time: '10:00', activity: 'WIZO Israel Branches', description: 'Zichron Yaakov | Daliyat al-Carmel visits.' },
      { time: '14:00', activity: 'Rosh Hanikra Briefing', description: 'Briefing by Moshe Davidovich, Chairman Frontline Forum.' },
      { time: '18:30', activity: 'Dinner in the North', description: 'Unity and solidarity celebration.' }
    ]
  },
  {
    day: 5,
    date: 'Thursday, Jan 22',
    title: 'Global Leadership Building',
    subtitle: 'The Future Together',
    activities: [
      { time: '09:00', activity: 'Pedagogy & Future Education', description: 'Exploring early childhood pedagogy at WIZO.' },
      { time: '12:15', activity: 'Daniel Weiss - Choosing Life', description: 'Musical experience from Kibbutz Be\'eri.' },
      { time: '13:30', activity: 'Farewell Lunch', description: 'Leaving Israel inspired and ready to lead.' }
    ]
  }
];

export const COLORS = {
  navy: '#1a2433',
  gold: '#c5a059',
  goldLight: '#e5c07b',
  bg: '#fcfaf7'
};
