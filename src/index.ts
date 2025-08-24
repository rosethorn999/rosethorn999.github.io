import './index.css';

function getYearsAndMonths(startDate: Date, endDate: Date = new Date()) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    months--;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years: years, months: months };
}

const calcCurrentJobPeriod = () => {
  const { years, months } = getYearsAndMonths(new Date(2024, 4, 28));
  const elem =
    window.document.querySelector<HTMLInputElement>('#currentJobPeriod');
  if (elem) {
    elem.innerText = `${years} yrs ${months} mos`;
  }
};
calcCurrentJobPeriod();

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  localStorage.theme = 'dark';
  document.documentElement.classList.add('dark');
} else {
  localStorage.theme = 'light';
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
