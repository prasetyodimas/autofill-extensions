import { useRef } from 'react';

export const ManageProfiles = ({ profileKeys, onDelete, onExport, onImport }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImport(file, () => {
        event.target.value = null; // Reset input after success
      });
    }
  };

  return (
    <div className="tab-content">
      <div className="data-controls">
        <button className="btn btn-outline" onClick={onExport}>
          📤 Export JSON
        </button>
        <button className="btn btn-outline" onClick={() => fileInputRef.current.click()}>
          📥 Import JSON
        </button>
        <input 
          type="file" 
          accept=".json" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
        />
      </div>

      <label style={{ marginBottom: '10px', display: 'block' }}>Your Saved Profiles</label>
      {profileKeys.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: '#6c757d', textAlign: 'center', margin: '20px 0' }}>
          No profiles saved yet.
        </p>
      ) : (
        <ul className="profile-list">
          {profileKeys.map((user) => (
            <li key={user} className="profile-list-item">
              <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{user}</span>
              <button className="btn-delete" onClick={() => onDelete(user)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};