import { useState, useEffect } from 'react';

export const useEnvironments = () => {
    const [environments, setEnvironments] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('autofill_envs') || '[]');
        setEnvironments(stored);
    }, []);

    const saveEnvironment = (name, url) => {
        if (!name.trim() || !url.trim()) {
            alert('Please provide both a name and a URL.');
            return false;
        }
        
        // Ensure URL has http:// or https:// so Chrome navigates correctly
        let formattedUrl = url;
        if (!/^https?:\/\//i.test(url)) {
            formattedUrl = 'http://' + url;
        }

        const newEnv = { id: Date.now().toString(), name, url: formattedUrl };
        const updatedEnvs = [...environments, newEnv];
        
        localStorage.setItem('autofill_envs', JSON.stringify(updatedEnvs));
        setEnvironments(updatedEnvs);
        return true;
    };

    const deleteEnvironment = (id) => {
        const updatedEnvs = environments.filter(env => env.id !== id);
        localStorage.setItem('autofill_envs', JSON.stringify(updatedEnvs));
        setEnvironments(updatedEnvs);
    };

    return { 
        environments, 
        saveEnvironment, 
        deleteEnvironment 
    };
};