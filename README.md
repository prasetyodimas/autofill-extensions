## 🔐 Autofil Extensions – Smart Form & Password Autofiller
Autofil Extensions adalah ekstensi browser yang memudahkan pengguna dalam mengisi otomatis form dan password di berbagai situs web. Dibuat untuk meningkatkan produktivitas dan kenyamanan, ekstensi ini menyimpan data secara aman dan memungkinkan pengguna untuk mengisi form hanya dengan satu klik.

## 🔧 Cara Menggunakan

1. **Install Ekstensi**  
   Load ekstensi melalui *Developer Mode* di Chrome atau Firefox.

2. **Tambahkan Data**  
   Buka popup, isi data yang ingin disimpan, lalu klik **Simpan**.

3. **Autofill Form**  
   Buka situs web dengan form, lalu klik tombol **Autofill** di popup.

---

## 💻 Teknologi yang Digunakan

- **JavaScript (Vanilla/ES6+)**
- **WebExtension API**
- **Local Storage / IndexedDB**
- **Vite** 
- **Manifest V3** – kompatibel dengan versi terbaru Chrome

🔐 Catatan Keamanan
Autofil Extensions tidak mengirim data ke server mana pun. Semua data disimpan lokal dan dienkripsi di perangkat pengguna.


#Architecture 

src/
├── assets/                  # Icons, images (icon.png)
├── background/              # Chrome background scripts (service workers)
├── popup/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Main layout & Tab routing (High-level only)
│   │
│   ├── components/          # 🧩 UI & Feature Components
│   │   ├── ui/              # 1. Design System (Dumb components, purely visual)
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.css
│   │   │   ├── Input/
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Input.css
│   │   │   ├── Tabs/
│   │   │   │   ├── Tabs.jsx
│   │   │   │   └── Tabs.css
│   │   │   └── Header/
│   │   │       └── Header.jsx
│   │   │
│   │   └── features/        # 2. Smart Components (Business logic & domain)
│   │       ├── Autofill/
│   │       │   └── AutofillForm.jsx
│   │       └── ManageProfiles/
│   │           ├── ManageProfiles.jsx
│   │           └── ImportExport.jsx
│   │
│   ├── hooks/               # ⚙️ Logic Separation (SRP for state)
│   │   └── useProfiles.js   # Custom hook handling localStorage, import, export
│   │
│   └── utils/               # 🛠️ Helpers
│       └── chromeAPI.js     # Wrapper for chrome.runtime.sendMessage
│
└── styles/                  # 🎨 Global Styles ONLY
    └── global.css           # CSS Reset, CSS variables (colors, spacing), fonts