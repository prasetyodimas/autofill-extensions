import { useState } from 'react';
import { useProfiles } from "@hooks/userProfile";
import { Header } from "@components/Header/Header";
import { AutofillForm } from "@feature/Autofill/AutofillForm";
import { ManageProfiles } from "@feature/ManageProfiles/ManageProfiles";
import "@styles/extension.css";

function App() {
  const [activeTab, setActiveTab] = useState('autofill');
  
  const { 
    rawProfiles, 
    profileKeys, 
    saveProfile, 
    deleteProfile, 
    exportProfiles, 
    importProfiles 
  } = useProfiles();

  return (
    <div className="extension-container">
      <Header />

      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'autofill' ? 'active' : ''}`}
          onClick={() => setActiveTab('autofill')}
        >
          Autofill
        </button>
        <button 
          className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Profiles
        </button>
      </div>

      {activeTab === 'autofill' && (
        <AutofillForm 
          profiles={rawProfiles} 
          profileKeys={profileKeys} 
          onSave={saveProfile} 
        />
      )}

      {activeTab === 'manage' && (
        <ManageProfiles 
          profileKeys={profileKeys} 
          onDelete={deleteProfile}
          onExport={exportProfiles}
          onImport={importProfiles}
        />
      )}

      <p className="footer-text">
        Author &nbsp;<a href="https://github.com/prasetyodimas" target="_blank" rel="noreferrer">Dimas Prasetyo</a>
      </p>
    </div>
  );
}

export default App;