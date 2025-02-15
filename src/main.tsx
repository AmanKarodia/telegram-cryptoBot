import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './Pages/App.tsx';
import VideoPage from './Pages/section1/videoPage.tsx';
import ActivitiesPage from './Pages/ActivitiesPage.tsx';
import RefPage from './Pages/section2/RefPage.tsx';
import MinePage from './Pages/MinePage.tsx';
import SettingsPage from './Pages/SettingsPage.tsx';
import LuckyWinPage from './Pages/Spin/LuckyWinPage.tsx';
//import SpecialsPage from './Pages/Specials/SpecialsPage.tsx';
import BussinessPage from './Pages/Bussiness/BussinessPage.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} /> {/* Default route for App */}
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/videoPage" element={<VideoPage />} />
          <Route path="/RefPage" element={<RefPage />} />
          <Route path="/MinePage" element={<MinePage />} />
          <Route path="/LuckyWinPage" element={<LuckyWinPage />} />
          {/* <Route path="/SpecialsPage" element={<SpecialsPage />} /> */}
          <Route path="/BussinessPage" element={<BussinessPage />} />
          <Route path="/SettingsPage" element={<SettingsPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
);
