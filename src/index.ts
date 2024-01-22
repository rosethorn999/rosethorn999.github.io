import './index.css';

// const calcCurrentJobPeriod = () => {
//   const current = new Date();
//   const trendmicroOnBoardingDate = new Date(2019, 10, 13);
//   const x = current.getFullYear() - trendmicroOnBoardingDate.getFullYear() - 1;
//   const y = Math.abs(
//     current.getMonth() + (12 - trendmicroOnBoardingDate.getMonth()) + 1
//   );
//   const elem =
//     window.document.querySelector<HTMLInputElement>('#currentJobPeriod');
//   if (elem) {
//     elem.innerText = `${x} yrs ${y} mos`;
//   }
// };
// calcCurrentJobPeriod();

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

function switchTheme() {
  if (localStorage.theme === 'dark') {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  } else {
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  }
}
document.querySelector('#themeSwitcher').addEventListener('click', switchTheme);
