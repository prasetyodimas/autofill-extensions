// This script runs on the actual web page

const chromeApi = globalThis.chrome;

chromeApi?.runtime?.onMessage?.addListener((request) => {
  if (request.action === 'autofill') {
    const { payload, selectors, autoLogin } = request;

    // Helper function to fill an input and trigger events 
    // (Crucial for websites built with React, Angular, or Vue)
    const fillInput = (selector, value) => {
      if (!selector || !value) return;
      
      const input = document.querySelector(selector);
      if (input) {
        input.value = value;
        // Dispatch events so modern frontend frameworks know the value changed
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        console.warn(`Autofill Extension: Could not find input for selector "${selector}"`);
      }
    };

    // 1. Inject the credentials using the selectors
    fillInput(selectors.corpId, payload.corpId);
    fillInput(selectors.userId, payload.userId);
    fillInput(selectors.password, payload.password);

    // 2. Handle the Auto-Login feature
    if (autoLogin && selectors.submitBtn) {
      const submitButton = document.querySelector(selectors.submitBtn);
      if (submitButton) {
        // Add a 300ms delay to ensure the web app registers the typed text before clicking
        setTimeout(() => {
          submitButton.click();
        }, 300);
      } else {
        console.warn(`Autofill Extension: Could not find submit button for selector "${selectors.submitBtn}"`);
      }
    }
  }
});