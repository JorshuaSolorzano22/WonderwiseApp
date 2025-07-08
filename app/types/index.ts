export interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  category: 'cultura' | 'naturaleza' | 'gastronomia';
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  key: 'cultura' | 'naturaleza' | 'gastronomia';
}

export interface TabItem {
  id: string;
  title: string;
  key: 'destacados' | 'recomendados' | 'consejos';
}

export interface NavItem {
  id: string;
  title: string;
  icon: string;
  key: 'explorar' | 'mapa' | 'plan' | 'perfil';
}