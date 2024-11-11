import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HtmlTable from './components/HtmlTable';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import MUITable from './components/MUITable';
import React from 'react';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/html-table" element={<HtmlTable />} />
              <Route path="/mui-table" element={<MUITable />} />
            </Route>
          </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;