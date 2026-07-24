import { useState } from 'react';
import { useProfiles } from "@hooks/userProfile";
import { useSettings } from '@hooks/useSettings';
import { useEnvironments } from '@hooks/useEnvironments';
import { Header } from "@components/Header/Header";
import { AutofillForm } from "@feature/Autofill/AutofillForm";
import { ManageProfiles } from "@feature/ManageProfiles/ManageProfiles";
import { SettingsForm } from '@feature/SettingForm/SettingForm';
import "@styles/extension.css";

function App() {
  const [activeTab, setActiveTab] = useState('manage');
  const { 
    rawProfiles, 
    profileKeys, 
    saveProfile, 
    deleteProfile, 
    exportProfiles, 
    importProfiles 
  } = useProfiles();
  const { selectors, saveSelectors } = useSettings();
  const { environments, saveEnvironment, deleteEnvironment } = useEnvironments();

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
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {activeTab === 'autofill' && (
        <AutofillForm 
          profiles={rawProfiles} 
          profileKeys={profileKeys} 
          onSave={saveProfile} 
          selectors={selectors}
        />
      )}

      {activeTab === 'manage' && (
        <ManageProfiles 
          profileKeys={profileKeys} 
          onDelete={deleteProfile}
          onExport={exportProfiles}
          onImport={importProfiles}
          environments={environments}
          onSaveEnv={saveEnvironment}
          onDeleteEnv={deleteEnvironment}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsForm 
          initialSelectors={selectors} 
          onSave={saveSelectors} 
        />
      )}

      <p className="footer-text">
        Author &nbsp;<a href="https://github.com/prasetyodimas" target="_blank" rel="noreferrer">Dimas Prasetyo</a>
      </p>
    </div>
  );
}

export default App;