import { useEffect, useState } from 'react';
import '../styles/extension.css';

function App() {
  const [userId, setUserId] = useState('');
  const [credentials, setCredentials] = useState({ corpId: '', userId: '', password: '' });
  const [allUsers, setAllUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSave = () => {
    const stored = JSON.parse(localStorage.getItem('autofillData') || '{}');
    const updated = { ...stored, [userId]: credentials };
    localStorage.setItem('autofillData', JSON.stringify(updated));
    alert('Saved!');
    setAllUsers(Object.keys(updated));
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('autofillData') || '{}');
    setAllUsers(Object.keys(stored));
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('autofillData') || '{}');
    if (userId && stored[userId]) {
      setCredentials(stored[userId]);
    }
  }, [userId]);

  const handleAutofill = () => {
    if (!userId) {
      alert('Pilih atau masukkan userId dulu!');
      return;
    }

    // eslint-disable-next-line no-undef
    if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage({ action: 'autofill', payload: credentials });
      window.close();
    } else {
      console.error('chrome.runtime not available');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ padding: 15, width: 300, fontFamily: 'sans-serif', display: 'block' }}>
      <div style={{ display: 'flex', justifyContent: 'start', gap: 2 }}>
        <img src={import.meta.env.BASE_URL + 'icon.png'} alt="Autofill Extension" style={{ width: 35, height: 35, marginBottom: 10 }} />
        <h3 style={{ marginTop: 0, marginBottom: 0, position: 'relative', top: 6, left: 5 }}>My Autofill Extension</h3>
      </div>
      <p style={{ fontSize: "12px", fontStyle: "italic", marginBottom: 10 }}>Efficiency Starts with Less Repetition</p>

      <div className="form-group">
        <label>List / Save Your ID :</label>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ flex: 1, marginRight: 10 }}
          >
            <option value="">Select or type your ID</option>
            {allUsers.map((data) => <option key={data} value={data} >{data}</option>)}
          </select>
          <input
            type="text"
            value={userId}
            placeholder="Your uniqe id will saved as list"
            onChange={(e) => setUserId(e.target.value)}
            style={{ flex: 1 }}
            className='form-control'
          />
        </div>
      </div>

      <div className="form-group">
        <label>Company ID:</label>
        <input
          name="corpId"
          type="text"
          value={credentials.corpId}
          onChange={handleChange}
          className='form-control'
          style={{ marginBottom: 10 }}
        />
      </div>

      <div className="form-group">
        <label>User ID:</label>
        <input
          name="userId"
          type="text"
          value={credentials.userId}
          onChange={handleChange}
          className='form-control'
          style={{ marginBottom: 10 }}
        />
      </div>

      <div className="form-group password-wrapper">
        <label>Password:</label>
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={handleChange}
          className='form-control'
          style={{ marginBottom: 10 }}
        />
        <span className="toggle-password" onClick={togglePasswordVisibility}> {showPassword ? 'Hide' : 'Show'} </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
        <button className='btn btn-primary' onClick={handleSave} style={{ flex: 1.2 }}>💾 Save</button>
        <button className='btn btn-success' onClick={handleAutofill} style={{ flex: 1.2 }}>⚡ Autofill</button>
      </div>
      <p style={{ fontSize: '0.8rem', marginTop: 10, display: 'flex', justifyContent: 'end' }}> Author &nbsp; <a href="https://github.com/prasetyodimas" target="_blank" rel="noreferrer">Dimas Prasetyo</a> </p>
    </div>
  );
}

export default App;

