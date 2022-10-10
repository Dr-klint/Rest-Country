// import "core-js/stable"; //polyfilling everything else
// import "regenerator-runtime/runtime"; //polyfilling async
// import { async } from "regenerator-runtime";

const btnToggle = document.querySelector(".btn__filter");
const btnOption = document.querySelector(".btn__options");
const countryLayout = document.querySelector(".country__layout");
const inputCountry = document.querySelector(".search__country");
const inputSearch = document.querySelector(".search__country--input");
const headBtn = document.querySelector(".head__btn");
const iconToggle = document.querySelector(".icon__body");
const textContentToggle = document.querySelector(".dark__text");
const htmlBody = document.querySelector(".html__body");
const countryRegion = document.querySelector(".country__region");
const countryView = document.querySelector("country__view");
const spinner = document.querySelector(".spinner");

const renderCountry = async function () {
  try {
    countryLayout.innerHTML = "";
    spinner.classList.remove("hidden");
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(data);
    data.forEach((el) => {
      const markup = `
      <div class="bg-white dark:bg-darkBackground rounded overflow-hidden shadow-md mb-5 hover:cursor-pointer country__view"  data-country-name='${
        el.cca2
      }'>
      <img src="${el.flags.png}" alt="${
        el.name.official
      } flag" class="w-full  h-48 object-cover" />
      <div class="p-4 dark:text-darkText">
        <p class="font-bold text-lg">${el.name.official}</p>
        <p class="font-semibold mt-2">
          Population: <span class="font-light">${el.population}</span>
        </p>
        <p class="font-semibold">
          Capital: <span class="font-light">${el.capital || "nil"}</span>
        </p>
        <p class="font-semibold">
          Region: <span class="font-light">${el.region}</span>
        </p>
      </div>
    </div>
        `;

      countryLayout.insertAdjacentHTML("beforeend", markup);
      spinner.classList.add("hidden");
    });
  } catch (err) {
    console.error(`${err}`);
  }
};
renderCountry();

const searchCountry = async function (country) {
  try {
    countryLayout.innerHTML = "";
    spinner.classList.remove("hidden");
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    data.forEach((el) => {
      const markup = `
      <div class="bg-white dark:bg-darkBackground rounded overflow-hidden shadow-md mb-5 hover:cursor-pointer country__view"  data-country-name='${
        el.cca2
      }'>
        <img src="${el.flags.png}" alt="${
        el.name.official
      } flag" class="w-full  h-48 object-cover" />
        <div class="dark:text-darkText p-4">
          <p class="font-bold text-lg">${el.name.official}</p>
          <p class="font-semibold mt-2">
            Population: <span class="font-light">${el.population}</span>
          </p>
          <p class="font-semibold">
            Capital: <span class="font-light">${el.capital || "nil"}</span>
          </p>
          <p class="font-semibold">
            Region: <span class="font-light">${el.region}</span>
          </p>
        </div>
      </div>
          `;
      countryLayout.insertAdjacentHTML("beforeend", markup);
      spinner.classList.add("hidden");
    });
  } catch (err) {
    console.error(`${err}`);
  }
};

const renderRegion = async function (region) {
  try {
    countryLayout.innerHTML = "";
    spinner.classList.remove("hidden");
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(data);
    data.forEach((el) => {
      const markup = `
      <div class="bg-white dark:bg-darkBackground rounded overflow-hidden shadow-md mb-5 hover:cursor-pointer country__view"  data-country-name='${
        el.cca2
      }'>
        <img src="${el.flags.png}" alt="${
        el.name.official
      } flag" class="w-full  h-48 object-cover" />
        <div class="dark:text-darkText p-4">
          <p class="font-bold text-lg">${el.name.official}</p>
          <p class="font-semibold mt-2">
            Population: <span class="font-light">${el.population}</span>
          </p>
          <p class="font-semibold">
            Capital: <span class="font-light">${el.capital || "nil"}</span>
          </p>
          <p class="font-semibold">
            Region: <span class="font-light">${el.region}</span>
          </p>
        </div>
      </div>
          `;
      countryLayout.insertAdjacentHTML("beforeend", markup);
      spinner.classList.add("hidden");
    });
  } catch (err) {
    console.error(`${err}`);
  }
};

btnToggle.addEventListener("click", function () {
  btnOption.classList.toggle("hidden");
});

inputCountry.addEventListener("submit", function (e) {
  e.preventDefault();
  const country = inputSearch.value.toLowerCase();
  if (country === "") return;
  searchCountry(country);
  setTimeout(() => {
    inputSearch.value = "";
  }, 2000);
});

headBtn.addEventListener("click", renderCountry);

let text = true;
iconToggle.addEventListener("click", function (e) {
  if (e.target.closest(".icon__body")) {
    if (text === true) {
      textContentToggle.textContent = "Dark Mode";
      localStorage.setItem("screenMode", "light");
    } else {
      textContentToggle.textContent = "Light Mode";
      localStorage.setItem("screenMode", "dark");
    }
    text = !text;
    htmlBody.classList.toggle("dark");
  }
});

countryRegion.addEventListener("click", function (e) {
  const region = e.target.textContent;
  renderRegion(region);
});

countryLayout.addEventListener("click", function (e) {
  const countryCode = e.target.closest(".country__view");
  const code = countryCode.dataset.countryName;
  localStorage.setItem("code", code);
  window.location.href = `view.html`;
});

// local storage
window.onload = () => {
  const storage = localStorage.getItem("screenMode");
  console.log(storage);
  if (storage === "light") {
    htmlBody.classList.add("dark");
    textContentToggle.textContent = "Light Mode";
  }
  if (storage === "dark") {
    htmlBody.classList.remove("dark");
    textContentToggle.textContent = "Dark Mode";
  }
};
