// form variables
const formSection = document.querySelector('#form-section')
const form = document.querySelector('form')

// typed data
let data = {
    name: null,
    prix: null,
    description: null,
    image: null,
    promocount: null,
    promoduration: null,
    origin: null,
    intensity: null,
    temp: null,
    taille: {},
    lait: {},
    supplements: {} 
}


// inject data in form
function injectForm(name) {
    if(name === "Informations Générales") {
        form.innerHTML = `
            <label class="text-text w-xs h-20 flex flex-col text-start gap-1">
                Name
                <input type="text" class="bg-white rounded-lg border border-border" data-name='name'>
            </label>
            <label class="text-text w-xs h-20 flex flex-col text-start gap-1">
                Prix
                <input type="number" min="0" step="0.01" class="bg-white rounded-lg border border-border" data-name='prix'>
            </label>
            <label class="text-text w-full flex flex-col text-start gap-1">
                Description
                <textarea class="w-full border h-40  bg-white border-border rounded-xl" data-name="description"></textarea>
            </label>
            <label class="text-text w-full flex flex-col text-start gap-1">
                image
                <input type="url" class="bg-white rounded-lg border border-border" data-name="image">
            </label>
            <label for="" class="text-text flex gap-1 items-center" id="promotion">
                <input type="checkbox" class="w-[20px] h-[20px] bg-accent" data-name="promotion">
                Promotion
                <div class="hidden">
                    <label>
                        Promo count
                        <input type="number" data-name='promocount' />
                    </label>
                    <label>
                        Promo duration
                        <input type="number" data-name='promoduration'/>
                    </label>
                </div>
            </label>
            <div class="w-full flex justify-between my-3">
            <button class="btn w-[45%] bg-accent rounded-xl text-white font-body">Next</button>
            </div>
        `
        setupPromoToggle()
    } else if (name === 'Caractéristiques & Options') {
        form.innerHTML = `
                    <label class="w-full my-3 text-start font-body font-400 text-sm text-text">
                        Origine des grains
                        <select class="w-full my-1 h-10 bg-stage rounded-lg flex text-sm border border-border px-1">
                            <option>Colombie</option>
                            <option>Éthiopie</option>
                            <option>Brésil</option>
                            <option>Mélange Maison</option>
                        </select>
                    </label>
                    <label class="w-full my-3 text-start font-body font-400 text-sm text-text">
                        Niveau de torréfaction / Intensité
                        <input type="range" min="1" max="10" class="w-full my-2 h-2 bg-stage rounded-lg appearance-none cursor-pointer accent-accent
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
                    <fieldset class="fieldset bg-stage border-border rounded-box w-[48%] border p-4">
                        <legend class="fieldset-legend">Température </legend>
                        <div class="flex gap-10">
                            <label class="label text-text" for="temperature">
                                <input type="radio" class="radio checked:text-stage checked:border-stage" name="temperature"/>
                                Small
                            </label>
                            <label class="label text-text" for="temperature">
                                <input type="radio" class="radio checked:text-stage checked:border-stage" name="temperature"/>
                                Medium
                            </label>
                        </div>
                    </fieldset>
                    <fieldset class="fieldset bg-stage border-border rounded-box w-[48%] border p-4">
                        <legend class="fieldset-legend">Tailles disponibles</legend>
                        <div class="flex gap-10">
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Small
                            </label>
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Medium
                            </label>
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Large
                            </label>
                        </div>
                    </fieldset>
                    <fieldset class="fieldset bg-stage border-border rounded-box w-full border p-4">
                        <legend class="fieldset-legend">Options de lait</legend>
                        <div class="flex gap-10">
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Vache
                            </label>
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Avoine
                            </label>
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Soja
                            </label>
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Amande
                            </label>
                        </div>
                    </fieldset>
                    <fieldset class="fieldset bg-stage border-border w-full rounded-box border p-4">
                        <legend class="fieldset-legend">Tailles disponibles</legend>
                        <div class="flex gap-10">
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Small
                            </label>
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Medium
                            </label>
                            <label class="label text-text">
                                <input type="checkbox" class="checkbox checked:text-accent checked:border-accent checked:bg-white" />
                                Large
                            </label>
                        </div>
                        </fieldset>
                    <div class="w-full flex justify-between my-3">
                        <button class="btn w-[45%] bg-background border-border rounded-xl">Back</button>
                        <button class="btn w-[45%] bg-accent rounded-xl text-white font-body">Next</button>
                    </div>
        `
        return;
    }
}


function setupPromoToggle() {
    const promo = document.querySelector('#promotion');
    if (!promo) return;

    const checkbox = promo.querySelector('input[type="checkbox"]');
    const toggleDiv = promo.querySelector('div');

    if (checkbox && toggleDiv) {
        checkbox.addEventListener('change', () => {
            toggleDiv.classList.toggle('hidden');
        });
    }
}

function isPromoActive() {
    const promo = document.querySelector('#promotion');
    if (!promo) return false;
    
    return promo.querySelector('input[type="checkbox"]').checked;
}


function getData() {
    data = {};
    const allInputs = form.querySelectorAll('input, textarea, select');

    allInputs.forEach(input => {
        if (input.type === 'checkbox') return;
        if (input.closest('.hidden')) return;
        data[input.dataset.name] = input.value;
    });

    console.log(data);
}

function validateData() {
    const allInputs = Array.from(form.querySelectorAll('input, textarea, select'));
    let isValid = true;

    for (let item of allInputs) {
        if (item.closest('.hidden')) continue;
        if (item.type === 'checkbox') continue;

        if (item.value.trim() === '') {
            item.style.outline = '2px solid red'
            isValid = false;
            Swal.fire({
                icon: "error",
                title: "Invalid Choice",
                text: `Please fill all the fields`,
            });
        } else {
            item.style.outline = '2px solid green'
        }
    }
    if (isValid) {
        getData();
    }
}

injectForm('Informations Générales')


// Form Navigation

function getButtons() {
    return document.querySelectorAll('button')
}

function navigation(nodelist) {
    nodelist.forEach(item => {
        if(item.textContent === 'Next') {
            next()
        }
        if(item.textContent === 'Back') {
            back()
        }
    })
}

function next() {
    const steps = breadcrumbNav.querySelectorAll('li > a')
    
    for(let step of steps) {
        if (step.classList.contains('active')) {
            step.classList.remove('active')
            step.classList.remove('border-b')
            step.parentElement.nextElementSibling.firstChild.classList.add('active')
            step.parentElement.nextElementSibling.firstChild.classList.add('border-b')
            injectForm(step.parentElement.nextElementSibling.firstChild.textContent)
            break
        }
    }
    return;
}

function back() {
    const steps = breadcrumbNav.querySelectorAll('li > a')
    
    for(let step of steps) {
        if (step.classList.contains('active')) {
            step.classList.remove('active')
            step.classList.remove('border-b')
            step.parentElement.previousElementSibling.firstChild.classList.add('active')
            step.parentElement.previousElementSibling.firstChild.classList.add('border-b')
            injectForm(step.parentElement.previousElementSibling.firstChild.textContent)
            break
        }
    }
    return;
}


// display depending on the breadcrumb navigation 
let breadcrumbNav = document.querySelector('#breadcrumbNav')