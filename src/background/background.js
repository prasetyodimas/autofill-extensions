// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'autofill') {
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      // eslint-disable-next-line no-undef
      chrome.scripting.executeScript({
        target: { tabId },
        func: autofillForm,
        args: [msg.payload]
      });
    });
  }
});

function autofillForm(data) {
  const selectors = {
    corpId: "input[name='corpId']",
    userId: "input[name='userName'], input#userName_placeholder1",
    password: "input[name='passwordEncryption'], input[name='password'], input#password"
  };

  for (const key in selectors) {
    const el = document.querySelector(selectors[key]);
    if (!el) continue;

    el.focus();
    el.value = data[key];
    el.dispatchEvent(new Event('input',  { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }
}