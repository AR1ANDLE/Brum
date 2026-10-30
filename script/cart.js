// 1. Le tableau global (Catalogue complet incluant les accessoires)
const coffeeProducts = [
    { id: "c1", name: "Espresso Intense", category: "Base", price: 2.50, image: "espresso.jpg" },
    { id: "c2", name: "Cappuccino Mousseux", category: "Classique", price: 4.00, image: "cappuccino.jpg" },
    { id: "c3", name: "Latte Caramel", category: "Gourmand", price: 4.50, image: "latte.jpg" },
    { id: "c4", name: "Flat White", category: "Classique", price: 3.80, image: "flatwhite.jpg" },
    { id: "c5", name: "Iced Matcha Latte", category: "Froid", price: 5.00, image: "matcha.jpg" },
    { id: "c6", name: "Cold Brew", category: "Froid", price: 4.20, image: "coldbrew.jpg" },
    { id: "c7", name: "Cookie Pépites", category: "Snack", price: 2.00, image: "cookie.jpg" },
    { id: "c8", name: "Mug Isotherme Noir", category: "Accessoire", price: 15.00, image: "mug.jpg" },
    { id: "c9", name: "Filtres Papier V60 (x100)", category: "Accessoire", price: 6.50, image: "filters.jpg" },
    { id: "c10", name: "Tote Bag 'Coffee Lover'", category: "Accessoire", price: 12.00, image: "totebag.jpg" }
];

// 2. Le tableau des produits dans le panier par défaut (avec un accessoire)
let coffeeCart = [
    { id: "c2", name: "Cappuccino Mousseux", price: 4.00, quantity: 2, image: "cappuccino.jpg" },
    { id: "c3", name: "Latte Caramel", price: 4.50, quantity: 1, image: "latte.jpg" },
    { id: "c8", name: "Mug Isotherme Noir", price: 15.00, quantity: 1, image: "mug.jpg" }
];

function updateCartCount() {
    localStorage.setItem(
        'coffecount',
        coffeeCart.reduce((sum, item) => sum + item.quantity, 0)
    );
}

updateCartCount();

let total = 0;

const totalSection = document.querySelector('.total-section');
const panierCards = document.querySelector('.card-container');
const popUp = document.querySelector('.pop-up');
const catalog = popUp ? popUp.querySelector('.catalog') : null;

function emptyCart() {
    if (panierCards && coffeeCart.length === 0) {
        panierCards.innerHTML = `<h1>Your cart is empty</h1>`;
    }
}

function injectCoffe(zone, list) {
    if (zone === null) return;

    zone.innerHTML = '';

    if (zone === panierCards) {
        if (list.length === 0) {
            emptyCart();
            return;
        }

        list.forEach(coffe => {
            zone.innerHTML += `
                <article id="${coffe.id}" class="article">
                    <h2 class="m-heading">${coffe.name}</h2>
                    <figure>
                        <img loading="lazy" src="assets/images/${coffe.image}" alt="${coffe.name}">
                    </figure>
                    <table>
                        <tbody style="display: flex; justify-content: space-between;">
                            <tr>
                                <td>Price · <span>${coffe.price.toFixed(2)} DH</span></td>
                            </tr>
                            <tr>
                                <td>Quantity · <span>${coffe.quantity}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="add-container">
                        <button type="button" class="increase">+</button>
                        <button type="button" class="decrease">-</button>
                    </div>
                </article>
            `;
        });
    } else {
        list.forEach(coffe => {
            zone.innerHTML += `
                <article id="${coffe.id}" class="article">
                    <h2 class="m-heading">${coffe.name}</h2>
                    <figure>
                        <img src="assets/images/${coffe.image}" alt="${coffe.name}">
                    </figure>
                    <table>
                        <tbody style="display: flex; justify-content: space-between;">
                            <tr>
                                <td>Price · <span>${coffe.price.toFixed(2)} DH</span></td>
                            </tr>
                            <tr>
                                <td>Category · <span>${coffe.category}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="add-to-cart-button">ADD TO CART </button>
                </article>
            `;
        });
    }
}

if (panierCards !== null) {
    panierCards.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button === null) return;
        const article = button.closest('article');
        if (article === null) return;
        const coffeCard = coffeeCart.find(coffe => coffe.id === article.id);
        if (!coffeCard) return;
        if (button.classList.contains('increase')) {
            coffeCard.quantity++;
            updateCartCount();
            countTotal();
            injectCoffe(panierCards, coffeeCart);
            injectTotal();
        } else if (button.classList.contains('decrease')) {
            if (coffeCard.quantity > 1) {
                coffeCard.quantity--;
            } else {
                
                coffeeCart = coffeeCart.filter(item => item.id !== coffeCard.id);
            }
            updateCartCount();
            countTotal();
            injectCoffe(panierCards, coffeeCart);
            injectTotal();
        }
    });
}

const params = new URLSearchParams();
function injectTotal() {
    if (totalSection === null) return;

    params.set('cart', JSON.stringify(coffeeCart));

    const quantityTotal = coffeeCart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    totalSection.innerHTML = `
        <article class="billet">
            <div class="badge">✓ Sélection ajoutée</div>

            <h2>Votre récapitulatif</h2>

            <h3>Tickets total · Quantité : ${quantityTotal}</h3>

            <div class="seperator"></div>

            <table id="ticket">
                <tbody></tbody>
            </table>
        </article>
    `;

    const ticketBody = totalSection.querySelector('#ticket tbody');

    coffeeCart.forEach(coffe => {
        ticketBody.innerHTML += `
            <tr>
                <td>
                    <span>${coffe.quantity}</span> · ${coffe.name}
                </td>
                <td>
                    <span>${(coffe.price * coffe.quantity).toFixed(2)}</span> DH
                </td>
            </tr>
        `;
    });

    totalSection.querySelector('article').innerHTML += `
        <div style="margin: 0" class="seperator"></div>

        <h3 style="display: flex; justify-content: space-between; margin-top: 10px">
            Prix de cette sélection ·
            <span style="color: var(--coffe-text); font-size: 14px">
                ${countTotal().toFixed(2)} DH
            </span>
        </h3>

        <button onclick='toCheckout()'>
            Order Now
        </button>
    `
}

function toCheckout() {
    if (coffeeCart.length > 0){
        window.location.href = `/Brum/checkout.html?${params.toString()}`
    } else {
        alert('Please pick an item first')
        return;
    }
}

function countTotal() {
    total = 0;

    coffeeCart.forEach(coffe => {
        total += coffe.price * coffe.quantity;
    });

    localStorage.setItem('total', total.toFixed(2))
    return total;
}

const selectedcoffe = {
    id: null,
    name: null,
    price: null,
    quantity: null,
    image: null
};

// Quick Search
const searchButton = document.getElementById('quickSearch');
const searchBar = popUp ? popUp.querySelector('input') : null;

if (searchButton !== null) {
    searchButton.addEventListener('click', quickSearch);
}

function quickSearch() {
    if (popUp === null) return;

    popUp.classList.toggle('hidden');

    if (searchBar !== null) {
        searchBar.focus()
    }
}

const debounce = (func, delay = 200) => {
    let timeoutID;
    return (...args) => {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
           func(...args);
        }, delay);
    }
}

if (searchBar !== null && catalog !== null) {
    const debouncedSearch = debounce(() => {
        const arr = coffeeProducts.filter(coffe => coffe.name.toUpperCase().includes(searchBar.value.toUpperCase())) ?? false
        injectCoffe(catalog, arr)
    }, 300)
    searchBar.addEventListener('input', () => {
        debouncedSearch();
    })
}

if (catalog !== null) {
    catalog.addEventListener('click', (e) => {
        const clicked = e.target.closest('button');

        if (clicked === null) return;

        const article = clicked.closest('article');

        if (article === null) return;

        const product = coffeeProducts.find(item => item.id === article.id);

        if (!product) return;

        const exists = coffeeCart.find(item => item.id === product.id);

        if (!exists) {
            coffeeCart.push(selectCoffe(selectedcoffe, product));
        } else {
            exists.quantity++;
        }

        updateCartCount();
        countTotal();
        injectCoffe(panierCards, coffeeCart);
        injectTotal();

        if (popUp !== null) {
            popUp.classList.add('hidden');
        }
    });
}

function selectCoffe(obj1, obj2) {
    obj1.id = obj2.id;
    obj1.name = obj2.name;
    obj1.price = obj2.price;
    obj1.quantity = 1;
    obj1.image = obj2.image;

    return { ...obj1 };
}

injectCoffe(panierCards, coffeeCart);
injectTotal();

// Checkout Section
const paymentForm = document.querySelector('.payment-form');

if (paymentForm !== null) {
    const regex = {
        name: /^[\p{L}]+(?:[',. -][\p{L}]+)*$/u,
        lastname: /^[\p{L}]+(?:[',. -][\p{L}]+)*$/u,
        mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35[0-9]{3})[0-9]{11})$/,
        cvv: /^[0-9]{3,4}$/,
        expiry: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
    };

    const userData = {
        name: null,
        lastname: null,
        mail: null,
        card: null,
        cvv: null,
        expiry: null
    };

    function getUserData(arr) {
        arr.name = paymentForm.querySelector('input[data-name="name"]')?.value.trim() ?? '';
        arr.lastname = paymentForm.querySelector('input[data-name="lastname"]')?.value.trim() ?? '';
        arr.mail = paymentForm.querySelector('input[data-name="mail"]')?.value.trim() ?? '';
        arr.card = paymentForm.querySelector('input[data-name="card"]')?.value.replace(/\D/g, '') ?? '';
        arr.cvv = paymentForm.querySelector('input[data-name="cvv"]')?.value.trim() ?? '';
        arr.expiry = paymentForm.querySelector('input[data-name="expiry"]')?.value.trim() ?? '';
    }
    function validatData(regex, data) {
        const orderContainer = document.querySelector('.order-container');
        let valid = true;
        
        for (const key in regex) {
            if (!regex[key].test(data[key])) {
                valid = false;
                if(!valid) {
                    let input = document.querySelector(`input[data-name="${key}"]`)
                    let wrong = document.createElement('span')
                    wrong.innerText = ` Invalid ${key} ` 
                    wrong.style.cssText = `
                        color: red;
                        font-size : 9px;
                        margin: 10px 0px;
                    `
                    input.className = 'wrong-input'
                }
            } else {
                document.querySelector(`input[data-name="${key}"]`).className = 'right-input'
                console.log(document.querySelector(`input[data-name="${key}"]`))
            }
        }
        if(valid) {
            orderContainer.classList.add('final-cart')
            localStorage.setItem('name', data.name);

            localStorage.setItem('email', data.email);
    
            const url = new URLSearchParams(window.location.search);
            const cartData = JSON.parse(url.get('cart'))
            orderContainer.innerHTML = `<h1>Hello ${data.name}, Your order is ready for shipping</h1>`
            orderContainer.innerHTML += "<div class='command-container'> </div>"
            for (let coffe of cartData) {
                console.log(coffe)
                orderContainer.querySelector('.command-container').innerHTML += `
                    <article class="article">
                        <h2 class="m-heading">${coffe.name}</h2>
                        <figure>
                            <img src="assets/images/${coffe.image}" alt="${coffe.name}">
                        </figure>
                        <table>
                            <tbody style="display: flex; justify-content: space-between;">
                                <tr>
                                    <td>Price · <span>${coffe.price} DH</span></td>
                                </tr>
                                <tr>
                                    <td>Category · <span>${coffe.quantity}</span></td>
                                </tr>
                            </tbody>
                                <tr>
                                    <td>Total · <span>${coffe.quantity * coffe.price}DH </span></td>
                                </tr>
                        </table>
                        <button>Check Delivery status</button>
                    </article>
                `
            }
            orderContainer.innerHTML += `
                <article class="billet" style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center">
                    <h3>Tickets total · Quantité : ${localStorage.getItem('coffecount')}</h3>
                    <h2>Prix total · ${localStorage.getItem('total')} DH</h2>
                </article>
            `
        }
    }
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        getUserData(userData);
        validatData(regex, userData);
    });
}