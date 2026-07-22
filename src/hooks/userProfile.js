import { useState, useEffect } from 'react';

export const useProfiles = () => {
  const [profileKeys, setProfileKeys] = useState([]);
  const [rawProfiles, setRawProfiles] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const stored = JSON.parse(localStorage.getItem('autofillData') || '{}');
    setRawProfiles(stored);
    setProfileKeys(Object.keys(stored));
  };

  const saveProfile = (id, credentials) => {
    if (rawProfiles[id]) {
      const confirmOverwrite = window.confirm(`The profile ID "${id}" already exists. Do you want to overwrite it?`);
      if (!confirmOverwrite) return false;
    }

    const updated = { ...rawProfiles, [id]: credentials };
    localStorage.setItem('autofillData', JSON.stringify(updated));
    alert('Credentials Saved!');
    loadUsers();
    return true;
  };

  const deleteProfile = (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the profile "${id}"?`);
    if (!confirmDelete) return false;

    const stored = { ...rawProfiles };
    delete stored[id];
    localStorage.setItem('autofillData', JSON.stringify(stored));
    loadUsers();
    return true;
  };

  const exportProfiles = () => {
    const stored = localStorage.getItem('autofillData') || '{}';
    const blob = new Blob([stored], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'autofill-profiles.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importProfiles = (file, onSuccess) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (typeof importedData !== 'object' || importedData === null || Array.isArray(importedData)) {
          throw new Error('Invalid JSON structure');
        }

        const stored = JSON.parse(localStorage.getItem('autofillData') || '{}');
        const mergedData = { ...stored, ...importedData };
        localStorage.setItem('autofillData', JSON.stringify(mergedData));
        
        alert('Profiles imported successfully!');
        loadUsers();
        if (onSuccess) onSuccess();
      } catch {
        alert('Error parsing JSON file. Please ensure it is a valid backup file.');
      }
    };
    reader.readAsText(file);
  };

  return {
    rawProfiles,
    profileKeys,
    saveProfile,
    deleteProfile,
    exportProfiles,
    importProfiles,
  };
};