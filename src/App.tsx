import { useState } from 'react';
import type { Page, SearchMode, RouteInfo } from '@/types';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import SelectPage from '@/pages/SelectPage';
import ResultsPage from '@/pages/ResultsPage';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [searchMode, setSearchMode] = useState<SearchMode>('near');
  const [route, setRoute] = useState<RouteInfo | undefined>(undefined);

  const handleNavigate = (next: Page) => {
    setPage(next);
    window.scrollTo(0, 0);
  };

  const handleSearch = (mode: SearchMode, routeInfo?: RouteInfo) => {
    setSearchMode(mode);
    setRoute(routeInfo);
    setPage('results');
    window.scrollTo(0, 0);
  };

  switch (page) {
    case 'landing':
      return <LandingPage onNavigate={handleNavigate} />;
    case 'auth':
      return <AuthPage onNavigate={handleNavigate} />;
    case 'select':
      return <SelectPage onNavigate={handleNavigate} onSearch={handleSearch} />;
    case 'results':
      return <ResultsPage mode={searchMode} route={route} onNavigate={handleNavigate} />;
  }
}
