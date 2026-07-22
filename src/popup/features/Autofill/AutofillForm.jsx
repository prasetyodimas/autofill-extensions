import { useState, useEffect } from 'react';
import { FormInput } from '../../components/ui/Input'; 

export const AutofillForm = ({ profiles, profileKeys, onSave }) => {
  const [userId, setUserId] = useState('');
  const [credentials, setCredentials] = useState({ corpId: '', userId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userId && profiles[userId]) {
      setCredentials(profiles[userId]);
    } else if (!userId) {
      setCredentials({ corpId: '', userId: '', password: '' });
    }
  }, [userId, profiles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSaveClick = () => {
    if (!userId.trim()) {
      alert('Please enter a Profile ID.');
      return;
    }
    onSave(userId, credentials);
  };

  const handleAutofill = () => {
    if (!userId) {
      alert('Select or input a Profile ID first!');
      return;
    }

    const chromeRuntime = typeof globalThis !== 'undefined' ? globalThis.chrome?.runtime : undefined;

    if (chromeRuntime?.sendMessage) {
      chromeRuntime.sendMessage({ action: 'autofill', payload: credentials });
      window.close();
    } else {
      console.error('chrome.runtime not available.');
    }
  };

  return (
    <div className="tab-content">
      
      {/* --- ENHANCED COMBOBOX (Searchable Dropdown) --- */}
      <div className="form-group">
        <label>Profile ID (Search or Create New):</label>
        <input
          type="text"
          list="saved-profiles-list"
          value={userId}
          placeholder="Type to search or create..."
          onChange={(e) => setUserId(e.target.value)}
          className="form-control"
          autoComplete="off"
        />
        {/* The datalist connects to the input via the 'list' attribute ID */}
        <datalist id="saved-profiles-list">
          {profileKeys.map((key) => (
            <option key={key} value={key} />
          ))}
        </datalist>
      </div>
      {/* ----------------------------------------------- */}

      <FormInput label="Company ID:" name="corpId" value={credentials.corpId} onChange={handleChange} />
      <FormInput label="User ID:" name="userId" value={credentials.userId} onChange={handleChange} />

      <div className="form-group password-wrapper">
        <label>Password:</label>
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={handleChange}
          className="form-control"
          style={{ paddingRight: '50px' }}
        />
        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleSaveClick}>💾 Save</button>
        <button className="btn btn-success" onClick={handleAutofill}>⚡ Autofill</button>
      </div>
    </div>
  );
};