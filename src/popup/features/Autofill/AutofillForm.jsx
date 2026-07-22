/* global chrome */
import { useState, useEffect } from 'react';
import { FormInput } from '../../components/ui/Input/Input';

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

    if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({ action: 'autofill', payload: credentials });
      window.close();
    } else {
      console.error('chrome.runtime not available.');
    }
  };

  return (
    <div className="tab-content">
      <div className="form-group">
        <label>Saved Profiles:</label>
        <select
          value={profileKeys.includes(userId) ? userId : ''}
          onChange={(e) => setUserId(e.target.value)}
          className="form-control"
          style={{ marginBottom: '8px' }}
        >
          <option value="">-- Select a saved profile --</option>
          {profileKeys.map((data) => (
            <option key={data} value={data}>{data}</option>
          ))}
        </select>
        
        <label>Or Create New Profile ID:</label>
        <input
          type="text"
          value={userId}
          placeholder="e.g., Work Account, Client A"
          onChange={(e) => setUserId(e.target.value)}
          className="form-control"
        />
      </div>

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