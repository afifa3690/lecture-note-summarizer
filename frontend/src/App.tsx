
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { SummaryView } from './pages/SummaryView';
import { QAView } from './pages/QAView';
import { SlideGeneratorView } from './pages/SlideGeneratorView';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/summary/:id" element={<SummaryView />} />
          <Route path="/qa" element={<QAView />} />
          <Route path="/slides" element={<SlideGeneratorView />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
