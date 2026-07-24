import { useState } from 'react';
import { FormInput } from '../../components/ui/Input'; 
import '../ManageProfiles/styles/ManageEnv.css';

export const ManageEnv = ({ environments, onSaveEnv, onDeleteEnv }) => {
   
    const [isEnvOpen, setIsEnvOpen] = useState(false);
    const [envName, setEnvName] = useState('');
    const [envUrl, setEnvUrl] = useState('');

    const handleAddEnv = () => {
        const success = onSaveEnv(envName, envUrl);
        if (success) {
            setEnvName('');
            setEnvUrl('');
        }
    };

    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        alert('URL Copied to clipboard!');
    };

    const handleOpenUrl = (url) => {
        if (typeof window !== 'undefined' && window.chrome?.tabs) {
            window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                window.chrome.tabs.update(tabs[0].id, { url: url });
                window.close();
                }
            });
        } else {
            window.open(url, '_self');
        }
    };
   
    return (
    <>
        <div className="collapsible-header" 
            onClick={() => setIsEnvOpen(!isEnvOpen)}
        >
            <span>🌍 Environment URLs</span>
            <span>{isEnvOpen ? '▼' : '▶'}</span>
        </div>

       {isEnvOpen && (
        <div className="collapsible-content">
            <div className="env-form-card">
                <FormInput 
                label="Environment Name:" 
                placeholder="e.g., Local, UAT, Production" 
                value={envName} 
                onChange={(e) => setEnvName(e.target.value)} 
                />
                <FormInput 
                label="Environment URL:" 
                placeholder="e.g., http://localhost:3000" 
                value={envUrl} 
                onChange={(e) => setEnvUrl(e.target.value)} 
                />
                <button 
                className="btn btn-primary" 
                onClick={handleAddEnv} 
                style={{ width: '100%', marginTop: '5px' }}
                >
                ➕ Add Environment
                </button>
            </div>

            {environments.length > 0 && (
                <ul className="profile-list" style={{ maxHeight: '250px', marginTop: '15px' }}>
                    {environments.map((env) => (
                        <li key={env.id} className="env-card">
                            
                            <div className="env-card-header">
                                <div className="env-title-group">
                                <span className="env-icon">🌍</span>
                                <span className="env-name">{env.name}</span>
                                </div>
                                <button 
                                className="btn-icon-delete" 
                                onClick={() => onDeleteEnv(env.id)}
                                title="Delete Environment"
                                >
                                🗑️
                                </button>
                            </div>

                            <div className="env-url-wrap">
                                <span className="env-url">{env.url}</span>
                            </div>
                            
                            <div className="env-card-actions">
                                <button className="btn-secondary btn-sm" onClick={() => handleCopyUrl(env.url)}>
                                📋 Copy
                                </button>
                                <button className="btn-primary-sage btn-sm" onClick={() => handleOpenUrl(env.url)}>
                                🚀 Open
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            )}
        </div>
      )}
    </>
   )
}
