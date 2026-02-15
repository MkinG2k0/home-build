import { create } from 'zustand';

import {
  mockComplexes,
  mockNews,
  mockTeam,
  mockVideos,
} from '../../shared/data/mockData';
import type { Complex, NewsItem, TeamMember, VideoItem } from '../../shared/model';

export interface AppState {
  complexes: Complex[];
  news: NewsItem[];
  team: TeamMember[];
  videos: VideoItem[];
}

const initialState: AppState = {
  complexes: mockComplexes,
  news: mockNews,
  team: mockTeam,
  videos: mockVideos,
};

export const useAppStore = create<AppState>(() => initialState);
