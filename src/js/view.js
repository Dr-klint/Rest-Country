const btnOption = document.querySelector(".btn__options");
const countryLayout = document.querySelector(".country__layout");
const inputCountry = document.querySelector(".search__country");
const headBtn = document.querySelector(".head__btn");
const textContentToggle = document.querySelector(".dark__text");
const htmlBody = document.querySelector(".html__body");
const countryView = document.querySelector("country__view");
const iconToggle = document.querySelector(".icon__body");
const mainBody = document.querySelector(".main__body");
const spinner = document.querySelector(".spinner");

headBtn.addEventListener("click", function () {
  console.log(`help`);
  window.location.href = `index.html`;
});

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

const viewRender = async function () {
  try {
    mainBody.innerHTML = "";
    spinner.classList.remove("hidden");
    const code = localStorage.getItem("code");
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await res.json();

    const boundaries = function () {
      let btn = ``;
      if (data[0].borders !== undefined) {
        data[0].borders.forEach((item) => {
          btn += `  <span class="font-light  border  px-3 mb-2 mr-2 py-1  shadow-md borders__country hover:cursor-pointer">${item}</span>`;
        });
      }
      return btn;
    };

    data.forEach((data) => {
      const html = `
    <div><img class="px-10 w-3/4 object-cover" src="${data.flags.png}" /></div>
    <div class="dark:text-darkText px-10 lg:px-0 items-end">
      <p class="font-bold text-lg mb-6">${data.name.common}</p>
      <div
        class="grid lg:grid-cols-2 grid-cols-1 gap-4 font-semibold text-sm"
      >
        <div>
          <ul>
            <li class="mt-1">
              Native Name: <span class="font-light">${
                Object.entries(data.name.nativeName)[0][1].common
              }</span>
            </li>
            <li class="mt-1">
              Population: <span class="font-light">${data.population}</span>
            </li>
            <li class="mt-1">Region: <span class="font-light">${
              data.region
            }</span></li>
            <li class="mt-1">
              Sub Region: <span class="font-light">${
                data.subregion || "nil"
              }</span>
            </li>
            <li class="mt-1">Capital: <span class="font-light">${
              data.capital || "nil"
            }</span></li>
          </ul>
        </div>
        <div>
          <ul>
            <li class="mt-1">
              Top Level Domain: <span class="font-light">${data.tld}</span>
            </li>
            <li class="mt-1">
              Currencies: <span class="font-light">${
                Object.entries(data.currencies)[0][1].name
              }</span>
            </li>
            <li class="mt-1">
              Languages: <span class="font-light">${
                Object.entries(data.languages)[0][1]
              }</span>
            </li>
          </ul>
        </div>
        <div class="mt-8 flex items-start">
        <p class='w-3/4'> Border Countries: </p>
        <div class='flex  flex-wrap  '> ${boundaries()}</div>
        </div>
      </div>
    </div>
    `;
      mainBody.insertAdjacentHTML("beforeend", html);
      spinner.classList.add("hidden");
    });
  } catch (err) {
    console.log(err);
  }
};
viewRender();

mainBody.addEventListener("click", function (e) {
  const code = e.target.closest(".borders__country").textContent;
  localStorage.setItem("code", code);
  viewRender();
});
