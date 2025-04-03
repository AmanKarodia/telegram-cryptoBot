import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './Pages/App.tsx';
import VideoPage from './Pages/section1/videoPage.tsx';
import ActivitiesPage from './Pages/ActivitiesPage.tsx';
import RefPage from './Pages/section2/RefPage.tsx';
import MinePage from './Pages/MinePage.tsx';
import WalletPage from './Pages/wallet/WalletPage.tsx';
import SettingsPage from './Pages/SettingsPage.tsx';
import LuckyWinPage from './Pages/Spin/LuckyWinPage.tsx';
//import SpecialsPage from './Pages/Specials/SpecialsPage.tsx';
import BussinessPage from './Pages/Bussiness/BussinessPage.tsx';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Buffer } from 'buffer';
window.Buffer = Buffer; // Polyfill for browser

// Create TonConnect instance (manifest URL should point to your app's URL)
const manifestUrl = 'https://telegram-crypto-bot-five.vercel.app/manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
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
          <Route path="/WalletPage" element={<WalletPage />} />
        </Routes>
      </Router>
    </TonConnectUIProvider>
);
