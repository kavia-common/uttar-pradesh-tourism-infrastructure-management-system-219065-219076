export interface Project {
  id: string;
  name: string;
  code?: string;
  status?: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  location?: string; // TODO: integrate Leaflet map later
}
