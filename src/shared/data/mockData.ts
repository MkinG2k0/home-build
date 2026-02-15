import type { Complex, NewsItem, TeamMember, VideoItem } from '../model';

const IMG = {
  building: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
  news: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  person: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
  video: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
} as const;

export const mockComplexes: Complex[] = [
  {
    address: 'ул. Примерная, 1',
    id: '1',
    image: IMG.building,
    metro: 'Станция «Центр»',
    name: 'Новый горизонт',
    priceStart: 'от 5,2 млн ₽',
    subtitle: 'Башня ONE',
  },
  {
    address: 'пр. Строителей, 10',
    id: '2',
    image: IMG.building,
    metro: 'Станция «Парк»',
    name: 'Солнечный',
    priceStart: 'от 4,8 млн ₽',
    subtitle: 'Корпус 2',
  },
  {
    address: 'ул. Речная, 5',
    id: '3',
    image: IMG.building,
    metro: 'Станция «Речная»',
    name: 'Речной квартал',
    priceStart: 'от 6,1 млн ₽',
    subtitle: 'Первая очередь',
  },
];

export const mockNews: NewsItem[] = [
  {
    date: '15.02.2025',
    description: 'Ход строительства корпуса 2: завершены несущие конструкции, идёт отделка фасада.',
    id: '1',
    image: IMG.news,
    title: 'Ход строительства',
  },
  {
    date: '10.02.2025',
    description: 'Лучший агент месяца — Анна Петрова. Поздравляем с рекордными продажами.',
    id: '2',
    image: IMG.news,
    title: 'Агент месяца',
  },
  {
    date: '05.02.2025',
    description: 'Заливка бетона на объекте «Новый горизонт»: выполнено 80% работ.',
    id: '3',
    image: IMG.news,
    title: 'Заливка бетона',
  },
];

export const mockTeam: TeamMember[] = [
  { name: 'Анна Петрова', photo: IMG.person, role: 'Руководитель отдела продаж' },
  { name: 'Иван Сидоров', photo: IMG.person, role: 'Старший риелтор' },
  { name: 'Мария Козлова', photo: IMG.person, role: 'Риелтор' },
];

export const mockVideos: VideoItem[] = [
  { id: '1', thumbnailUrl: IMG.video, title: 'Обзор комплекса «Новый горизонт»' },
  { id: '2', thumbnailUrl: IMG.video, title: 'Интервью с застройщиком' },
  { id: '3', thumbnailUrl: IMG.video, title: 'Экскурсия по готовым квартирам' },
];
