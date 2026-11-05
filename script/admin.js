// form variables
const formSection = document.querySelector("#form-section");
const form = document.querySelector("form");

// typed data

import { coffeeProducts } from "./data.js";

const data = {
  name: null,
  prix: null,
  description: null,
  image: null,
  promotion: false,
  promocount: null,
  promoduration: null,
  origin: null,
  intensity: null,
  temp: null,
  taille: [],
  lait: [],
  supplements: [],
};

const regex = {
  name: /^\s*\S.*$/,
  prix: /(?:\$|£|€)?\d+(?:\.\d{2})?/,
  description: /^.*[a-zA-Z]+.*$/,
  image:
    /^https?:\/\/[^\s]+(?:\.|\/)(?:jpe?g|png|gif|webp|avif|bmp|svg)(?:\?.*)?$/,
  promocount: /^\d+(?:\.\d+)?$/,
  promoduration: /^\d+(?:\.\d+)?$/,
};

// inject data in form
function injectForm(name) {
  if (name === "Informations Générales") {
    form.innerHTML = `
            <label class="text-text w-full sm:w-[48%] h-20 flex flex-col text-start gap-1 font-body text-sm font-medium">
                Name
                <input type="text" class="bg-white rounded-lg border border-border h-10 px-3 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-accent" data-name='name'>
            </label>
            <label class="text-text w-full sm:w-[48%] h-20 flex flex-col text-start gap-1 font-body text-sm font-medium">
                Prix
                <input type="number" min="0" step="0.01" class="bg-white rounded-lg border border-border h-10 px-3 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-accent" data-name='prix'>
            </label>
            <label class="text-text w-full flex flex-col text-start gap-1 font-body text-sm font-medium">
                Description
                <textarea class="w-full border h-40 bg-white border-border rounded-xl p-3 text-sm font-normal resize-none focus:outline-none focus:ring-2 focus:ring-accent" data-name="description"></textarea>
            </label>
            <label class="text-text w-full flex flex-col text-start gap-1 font-body text-sm font-medium">
                image
                <input type="url" class="bg-white rounded-lg border border-border h-10 px-3 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-accent" data-name="image">
            </label>
            <label for="" class="text-text w-full flex flex-wrap gap-2 items-center font-body text-sm font-medium cursor-pointer" id="promotion">
                <input type="checkbox" class="w-[20px] h-[20px] accent-accent cursor-pointer" data-name="promotion">
                Promotion
                <div class="hidden [&:not(.hidden)]:flex w-full gap-4 mt-1">
                    <label class="flex flex-col gap-1 text-start text-sm font-medium">
                        Promo count
                        <input type="number" min="0" max="100%" class="bg-white rounded-lg border border-border h-10 px-3 w-36 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-accent" data-name='promocount' />
                    </label>
                    <label class="flex flex-col gap-1 text-start text-sm font-medium">
                        Promo duration
                        <input type="number" min="0" class="bg-white rounded-lg border border-border h-10 px-3 w-36 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-accent" data-name='promoduration'/>
                    </label>
                </div>
            </label>
            <div class="w-full flex justify-end my-3">
            <button class="btn w-[45%] bg-accent rounded-xl text-white font-body border-0 hover:opacity-90" type="button">Next</button>
            </div>
        `;
    setupPromoToggle();
    navigation(getButtons());
    displayProgress();
  } else if (name === "Caractéristiques & Options") {
    form.innerHTML = `
                    <label class="w-full my-2 text-start font-body font-normal text-sm text-text">
                        Origine des grains
                        <select class="w-full my-1 h-10 bg-stage cursor-pointer rounded-lg block text-sm border border-border px-2 text-text focus:outline-none focus:ring-2 focus:ring-accent" data-name='origin'>
                            <option>Colombie</option>
                            <option>Éthiopie</option>
                            <option>Brésil</option>
                            <option>Mélange Maison</option>
                        </select>
                    </label>
                    <label class="w-full my-2 text-start font-body font-normal text-sm text-text">
                        Niveau de torréfaction / Intensité
                        <input data-name='intensity' type="range" min="1" max="10" class="w-full my-2 h-2 bg-stage rounded-lg appearance-none cursor-pointer accent-accent
                            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                            
                            [&::-webkit-slider-thumb]:appearance-none
                            [&::-webkit-slider-thumb]:h-5
                            [&::-webkit-slider-thumb]:w-5
                            [&::-webkit-slider-thumb]:rounded-full
                            [&::-webkit-slider-thumb]:bg-accent
                            [&::-webkit-slider-thumb]:border-2
                            [&::-webkit-slider-thumb]:border-background
                            [&::-webkit-slider-thumb]:shadow-md
                            [&::-webkit-slider-thumb]:transition-all
                            [&::-webkit-slider-thumb]:active:scale-110
                            
                            [&::-moz-range-thumb]:h-5
                            [&::-moz-range-thumb]:w-5
                            [&::-moz-range-thumb]:rounded-full
                            [&::-moz-range-thumb]:bg-accent
                            [&::-moz-range-thumb]:border-2
                            [&::-moz-range-thumb]:border-background
                            [&::-moz-range-thumb]:shadow-md
                            [&::-moz-range-thumb]:transition-all
                            [&::-moz-range-thumb]:active:scale-110" />
                        <div class="flex justify-between text-xs font-body text-muted px-2 mt-2 select-none pointer-events-none">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                        </div>    
                    </label>
                    <fieldset class="fieldset bg-stage border-border rounded-box w-full sm:w-[48%] border p-4 text-start">
                        <legend class="fieldset-legend text-text font-body font-medium">Température </legend>
                        <div data-name='temp' class="flex flex-wrap gap-x-6 gap-y-2">
                            <label class="label text-text gap-2 cursor-pointer" for="temperature">
                                <input type="radio" class="radio bg-white border-muted checked:bg-white checked:text-accent checked:border-accent" data-key="chaud" name="temperature"/>
                                Chaud
                            </label>
                            <label class="label text-text gap-2 cursor-pointer" for="temperature">
                                <input type="radio" class="radio bg-white border-muted checked:bg-white checked:text-accent checked:border-accent" data-key="glace" name="temperature"/>
                                Glacé
                            </label>
                        </div>
                    </fieldset>
                    <fieldset class="fieldset bg-stage border-border rounded-box w-full sm:w-[48%] border p-4 text-start">
                        <legend class="fieldset-legend text-text font-body font-medium">Tailles disponibles</legend>
                        <div data-name='taille' class="flex flex-wrap gap-x-6 gap-y-2">
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Small"/>
                                Small
                            </label>
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Medium"/>
                                Medium
                            </label>
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Large"/>
                                Large
                            </label>
                        </div>
                    </fieldset>
                    <fieldset class="fieldset bg-stage border-border rounded-box w-full border p-4 text-start">
                        <legend class="fieldset-legend text-text font-body font-medium">Options de lait</legend>
                        <div data-name='lait' class="flex flex-wrap gap-x-6 gap-y-2">
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Vache" />
                                Vache
                            </label>
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Avoine"/>
                                Avoine
                            </label>
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Soja"/>
                                Soja
                            </label>
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Amande"/>
                                Amande
                            </label>
                        </div>
                    </fieldset>
                    <fieldset class="fieldset bg-stage border-border w-full rounded-box border p-4 text-start">
                        <legend class="fieldset-legend text-text font-body font-medium">Suppléments</legend>
                        <div data-name='supplements' class="flex flex-wrap gap-x-6 gap-y-2">
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Vanille"/>
                                Vanille
                            </label>
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Caramel"/>
                                Caramel
                            </label>
                            <label class="label text-text gap-2 cursor-pointer">
                                <input type="checkbox" class="checkbox bg-white border-muted checked:text-accent checked:border-accent checked:bg-white" data-key="Noisette"/>
                                Noisette
                            </label>
                        </div>
                        </fieldset>
                    <div class="w-full flex justify-between my-3">
                        <button class="btn w-[45%] bg-background border-border rounded-xl text-text font-body" type='button'>Back</button>
                        <button class="btn w-[45%] bg-accent rounded-xl text-white font-body border-0 hover:opacity-90" type="button">Next</button>
                    </div>
        `;
    navigation(getButtons());
    displayProgress();
  } else {
    form.innerHTML = `
        <article class="max-w-sm w-full bg-stage text-text border border-border p-4 flex flex-col rounded-3xl text-start">
            <figure class="overflow-hidden rounded-2xl mb-4">
                <img 
                    src="${data.image}" 
                    class="w-full h-48 object-cover rounded-2xl"
                />
            </figure>
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between gap-2">
                <h2 class="text-xl font-bold font-heading text-text">${data.name}</h2>
                <data value="" class="text-lg font-bold text-text whitespace-nowrap">
                    ${Number(data.prix).toFixed(2)}DH
                </data>
            </div>
            <p class="text-xs text-accent text-start leading-relaxed">
                ${data.description}
            </p>
            <dl class="flex items-center justify-between gap-2 text-xs py-2 border-y border-border">
                <div class="flex items-center gap-1.5">
                    <dt class="text-accent font-medium">Origine:</dt>
                    <dd class="font-semibold capitalize text-text">${data.origin}</dd>
                </div>
                <div class="flex items-center gap-1.5">
                    <dt class="text-accent font-medium">Intensité:</dt>
                    <dd class="font-bold text-text">
                    <meter min="1" max="10" value="10" class="w-24 h-2 align-middle">${data.intensity}/10</meter>
                    </dd>
                </div>
            </dl>
            <dl class="space-y-2 text-xs">
            <div class="flex items-center justify-between gap-2">
                <dt class="text-accent">Température:</dt>
                <dd>
                    <span class=" text-white font-medium border bg-accent px-2 py-0.5 rounded-full border-border uppercase text-[10px]">
                        ${data.temp}
                    </span>
                </dd>
            </div>
            <div class="flex items-center justify-between gap-2">
                <dt class="text-accent">Taille:</dt>
                <dd class="flex flex-wrap justify-end gap-1.5" id="taille">
                </dd>
            </div>
            <div class="flex flex-wrap items-center gap-2" id="lait">
                <dt class="text-accent mr-auto">Lait:</dt>
            </div>
            <div class="flex flex-wrap items-center gap-2" id="supplement">
                <dt class="text-accent mr-auto">Supplément:</dt>
            </div>
    `
    data.taille.forEach(taille => {
        form.querySelector('#taille').innerHTML += `
            <span class="text-text bg-white border border-border rounded-full px-2 py-0.5">${taille}</span>
        `
    })
    if(data.lait.length > 0 ){
        data.lait.forEach(milk => {
        form.querySelector('#lait').innerHTML += `
            <dd class="text-text bg-white border border-border rounded-full px-2 py-0.5">${milk}</dd>
        `
    })} else {
        form.querySelector('#lait').innerHTML += `<dd class="text-muted bg-white border border-border rounded-full px-2 py-0.5">'Not Selected'</dd>`
        console.log('hello')
    }
    if(data.supplements.length > 0 ){
        data.lait.forEach(supplement => {
            console.log(supplement)
        form.querySelector('#supplement').innerHTML += `
            <dd class="text-text bg-white border border-border rounded-full px-2 py-0.5">${supplement}</dd>
        `
    })} else {
        form.querySelector('#supplement').innerHTML += `<dd class="text-muted bg-white border border-border rounded-full px-2 py-0.5">Not Selected</dd>`
        console.log('hello')
    }

    if(data.promotion) {
        form.innerHTML += `
            <div class="w-full max-w-sm flex items-center justify-between bg-stage border border-border rounded-2xl px-4 py-2 text-xs">
                <dt class="text-accent">Promotion:  </dt>
                <dt class="text-text">${data.promocount}%</dt>
            </div>
            <div class="w-full max-w-sm flex items-center justify-between bg-stage border border-border rounded-2xl px-4 py-2 text-xs">
                <dt class="text-accent">Duration:  </dt>
                <dt class="text-text">${data.promoduration} hours</dt>
            </div>
            <div class="w-full max-w-sm flex items-center justify-between bg-stage border border-border rounded-2xl px-4 py-2 text-xs">
                <dt class="text-accent">Discounted Price :  </dt>
                <dt class="text-text">${discountPrice().toFixed(2)}DH</dt>
            </div>
        `
    }
    form.innerHTML += `
                </dl>
            </article>
            
            <div class="w-full flex justify-end my-3">
            <button class="btn w-[25%] bg-white rounded-xl text-text font-body border-black hover:opacity-90" type="button">Reset</button>
            <button class="btn w-[25%] bg-white rounded-xl text-text font-body border-0 hover:opacity-90" type="button">Back</button>
            <button class="btn w-[25%] bg-accent rounded-xl text-white font-body border-0 hover:opacity-90" type="button">Add to cart</button>
            </div>
        `
    navigation(getButtons());
    displayProgress();
  }
}

function setupPromoToggle() {
  const promo = document.querySelector("#promotion");
  if (!promo) return;

  const checkbox = promo.querySelector('input[type="checkbox"]');
  const toggleDiv = promo.querySelector("div");

  if (checkbox && toggleDiv) {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        toggleDiv.classList.remove("hidden");
        data.promotion = true;
      } else {
        toggleDiv.classList.add("hidden");
        toggleDiv
          .querySelectorAll("input")
          .forEach((input) => (input.value = null));
      }
    });
  }
}

function isPromoActive() {
  const promo = document.querySelector("#promotion");
  if (!promo) return false;

  return promo.querySelector('input[type="checkbox"]').checked;
}

function discountPrice() {
    return data.prix - (data.prix * (data.promocount / 100))
}

// Progress Bar
const progressBar = document.querySelector("#progressbar");
const steps = document.querySelectorAll("#breadcrumbNav a");

function getProgress() {
  let progress;
  steps.forEach((step) => {
    if (step.classList.contains("active")) {
      progress = step.dataset.step;
    }
  });
  return (progress / steps.length) * 100;
}

function displayProgress() {
  progressBar.querySelector("div").classList.add(`w-[${getProgress()}%]`);
}

// Check data
function checkRegex(regex, data) {
  return regex.test(data); // true < false
}

function valiateData() {
    if (
        document.querySelector(".active").textContent === "Informations Générales"
    ) {
        getData()
        const allInputs = form.querySelectorAll("input, textarea");
        
    for (let input of allInputs) {
        if (
        input.parentElement.parentElement.classList.contains("hidden") ||
        input.type === "checkbox"
      )
      continue;
      if (!checkRegex(regex[input.dataset.name], data[input.dataset.name])) {
          Swal.fire({
              icon: "error",
          title: "Oops...",
          text: `Please enter a valid ${input.dataset.name}`,
        });
        return false;
    }
}
}
if(
    document.querySelector('.active').textContent === "Caractéristiques & Options"
) {
      const {radioArr, tailleArr} = getData()
    
    if (radioArr.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Must specify a Temperature",
      });
      return false;
    }
    if (tailleArr.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please pick at least one size",
      });
      return false;
    }
  }
  return true;
}

function getData() {
  if (
    document.querySelector(".active").textContent === "Informations Générales"
  ) {
    let allInputs = form.querySelectorAll("input, textarea");
    allInputs.forEach((input) => {
      if (input.closest(".hidden")) return;
      if (input.type == "checkbox") data[input.dataset.name] = input.checked;
      else data[input.dataset.name] = input.value;
    });
  }

  if (
    document.querySelector(".active").textContent ===
    "Caractéristiques & Options"
  ) {
    let radioArr = [];
    let tailleArr = [];
    let selections = form.querySelectorAll('select, input[type="range"]');
    let inputs = form.querySelectorAll(
      'input[type="checkbox"], input[type="radio"]',
    );
    selections.forEach((selection) => {
      data[selection.dataset.name] = selection.value;
    });
    inputs.forEach((input) => {
      if (input.type === "radio") {
        if (input.checked) {
          data[input.closest("div").dataset.name] = input.dataset.key;
          radioArr.push(input);
        }
      } else if (input.type === "checkbox") {
        if (input.checked) {
          data[input.closest("div").dataset.name].push(input.dataset.key);
          if(input.closest('div').dataset.name === 'taille') {
            tailleArr.push(input)
          }
        }
      }
    });
    return {
        radioArr, tailleArr
    }
  }
}

function displayData() {
  const allInputs = form.querySelectorAll("input, textarea");
  const promoCheckbox = form.querySelector('input[data-name="promotion"]');
  const toggleDiv = promoCheckbox
    ? promoCheckbox.closest("#promotion")?.querySelector("div")
    : null;
  if (promoCheckbox && data.promotion) {
    promoCheckbox.checked = data.promotion;
    if (toggleDiv) {
      if (data.promotion) {
        toggleDiv.classList.remove("hidden");
      } else {
        toggleDiv.classList.add("hidden");
      }
    }
  }

  allInputs.forEach((input) => {
    if (input.closest(".hidden")) return;
    input.value = data[input.dataset.name];
  });
}

injectForm("Informations Générales");

// Form Navigation

function getButtons() {
  return document.querySelectorAll("button");
}

function navigation(nodelist) {
  nodelist.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      if (item.textContent === "Next") {
        next();
      }
      if (item.textContent === "Back") {
        back();
      }
      if (item.textContent === "Reset") {
        reset()
      }
      if(item.textContent === "Add to cart"){
        updateCatalog()
      }
    });
  });
}

function next() {
  if (!valiateData()) return;
  const steps = breadcrumbNav.querySelectorAll("li > a");

  for (let step of steps) {
    if (step.classList.contains("active")) {
      step.classList.remove("active");
      step.classList.remove("border-b");
      step.parentElement.nextElementSibling.firstChild.classList.add("active");
      step.parentElement.nextElementSibling.firstChild.classList.add(
        "border-b",
      );
      injectForm(step.parentElement.nextElementSibling.firstChild.textContent);
      break;
    }
  }
  return;
}

function back() {
  const steps = breadcrumbNav.querySelectorAll("li > a");

  for (let step of steps) {
    if (step.classList.contains("active")) {
      step.classList.remove("active");
      step.classList.remove("border-b");
      step.parentElement.previousElementSibling.firstChild.classList.add(
        "active",
      );
      step.parentElement.previousElementSibling.firstChild.classList.add(
        "border-b",
      );
      injectForm(
        step.parentElement.previousElementSibling.firstChild.textContent,
      );
      break;
    }
  }
  displayData();
  return;
}

function reset() {
  const steps = breadcrumbNav.querySelectorAll('li > a')
    steps.forEach(step => {
      step.classList.remove('active', 'border-b')
    })
    steps[0].classList.add('active', 'border-b')
    injectForm(steps[0].textContent)
}

function updateCatalog() {
  coffeeProducts.push(data)
  window.location.href = '/cart.html'
}

// export Data 

// display depending on the breadcrumb navigation
let breadcrumbNav = document.querySelector("#breadcrumbNav");