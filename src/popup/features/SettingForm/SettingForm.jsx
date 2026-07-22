import { useState, useEffect } from 'react';
import { FormInput } from '../../components/ui/Input'; 

export const SettingsForm = ({ initialSelectors, onSave }) => {
  const [selectors, setSelectors] = useState(initialSelectors);

  useEffect(() => {
    setSelectors(initialSelectors);
  }, [initialSelectors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectors({ ...selectors, [name]: value });
  };

  return (
    <div className="tab-content">
      <p style={{ fontSize: '0.85rem', marginBottom: '15px', color: '#6c757d', lineHeight: '1.4' }}>
        Define the CSS selectors (ID, class, or name) so the extension knows where to inject the data on the page.
      </p>

      <FormInput 
        label="Company ID Selector:" 
        name="corpId" 
        placeholder="e.g., #company-id or input[name='corpId']"
        value={selectors.corpId} 
        onChange={handleChange} 
      />
      <FormInput 
        label="User ID Selector:" 
        name="userId" 
        placeholder="e.g., #user-id or .username-input"
        value={selectors.userId} 
        onChange={handleChange} 
      />
      <FormInput 
        label="Password Selector:" 
        name="password" 
        placeholder="e.g., #password or input[type='password']"
        value={selectors.password} 
        onChange={handleChange} 
      />
      <FormInput 
        label="Submit Button Selector (Optional):" 
        name="submitBtn" 
        placeholder="e.g., #login-btn or button[type='submit']"
        value={selectors.submitBtn} 
        onChange={handleChange} 
      />

      <div className="button-group">
        <button 
          className="btn btn-primary" 
          style={{ width: '100%' }} 
          onClick={() => onSave(selectors)}
        >
          ⚙️ Save Selectors
        </button>
      </div>
    </div>
  );
};