import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './Pages/App.tsx';
import VideoPage from './Pages/section1/videoPage.tsx';
import ActivitiesPage from './Pages/ActivitiesPage.tsx';
import RefPage from './Pages/section2/RefPage.tsx';
//import MinePage from './Pages/MinePage.tsx';
import LuckyWinPage from './Pages/Spin/LuckyWinPage.tsx';
//import SpecialsPage from './Pages/Specials/SpecialsPage.tsx';
import './index.css';
//import BussinessPage from './Pages/Bussiness/BussinessPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} /> {/* Default route for App */}
        <Route path="/activities" element={<ActivitiesPage />} /> {/* Route for ActivitiesPage */}
        <Route path="/videoPage" element={<VideoPage />} /> {/* Route for ActivitiesPagevideoSection */}
        <Route path="/RefPage" element={<RefPage />} /> {/* Route for ActivitiesPageRefSection */}
        {/* <Route path="/MinePage" element={<MinePage />} /> Route for MinePage */}
        <Route path="/LuckyWinPage" element={<LuckyWinPage />} /> {/* Route for LuckyWinPage */}
        {/* <Route path="/SpecialsPage" element={<SpecialsPage />} /> Route for LuckyWinPage */}
        {/* <Route path="/BussinessPage" element={<BussinessPage />} /> Route for MinePageBussiness */}
      </Routes>
    </Router>
  </React.StrictMode>,
  
);