(()=>{"use strict";"dark"===localStorage.theme||!("theme"in localStorage)&&window.matchMedia("(prefers-color-scheme: dark)").matches?(localStorage.theme="dark",document.documentElement.classList.add("dark")):(localStorage.theme="light",document.documentElement.classList.remove("dark")),document.querySelector("#themeSwitcher").addEventListener("click",(function(){"dark"===localStorage.theme?(localStorage.theme="light",document.documentElement.classList.remove("dark")):(localStorage.theme="dark",document.documentElement.classList.add("dark"))}))})();