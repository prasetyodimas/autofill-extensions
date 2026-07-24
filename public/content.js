// This script runs on the actual web page

const chromeApi = globalThis.chrome;

chromeApi?.runtime?.onMessage?.addListener((request, sender, sendResponse) => {
  console.info(request)
  console.info(sender)
  console.info(sendResponse)
  if (request.action === 'autofill') {
    const { payload, selectors, autoLogin } = request;
    console.log(payload)
    console.log(selectors)
    console.log(autoLogin)

    const fillInput = (selector, value) => {
      if (!selector || !value) return;
      
      const input = document.querySelector(selector);
      if (input) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        console.warn(`Autofill Extension: Could not find input for selector "${selector}"`);
      }
    };

    fillInput(selectors.corpId, payload.corpId);
    fillInput(selectors.userId, payload.userId);
    fillInput(selectors.password, payload.password);

    if (autoLogin && selectors.submitBtn) {
      const submitButton = document.querySelector(selectors.submitBtn);
      if (submitButton) {
        setTimeout(() => {
          submitButton.click();
        }, 300);
      } else {
        console.warn(`Autofill Extension: Could not find submit button for selector "${selectors.submitBtn}"`);
      }
    }

    sendResponse({ status: 'success' });

    return true
  }
});