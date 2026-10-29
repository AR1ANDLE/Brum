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

localStorage.setItem('coffecount', coffeeCart.length)

let total = 0

const totalSection = document.querySelector('.total-section')

// inject data in the panier section
const panierCards = document.querySelector('.card-container')

injectCoffe(panierCards, coffeeCart)

function emptyCart() {
    if(panierCards.innerHTML == ''){
        panierCards.innerHTML = `<h1> Your cart is Empty</h1>`
    }
}

function injectCoffe(zone, list) {
    zone.innerHTML = '';
    if (zone === panierCards) {
        list.forEach(coffe => {
            zone.innerHTML += `
                <article id='${coffe.id}'>
                    <h2 class="m-heading">${coffe.name}</h2>
                    <figure>
                        <img src="assets/images/${coffe.image}"/>
                    </figure>
                    <table>
                        <tbody style="display: flex; justify-content: space-between;">
                            <tr><td>Price · <span>${coffe.price.toFixed(2)} DH</span></td></tr>
                            <tr><td>Quantity · <span>${coffe.quantity}</span></td></tr>
                        </tbody>
                    </table>
                    <div class="add-container">
                        <button class='increase'>+</button>
                        <button class='decrease'>-</button>
                    </div>
                </article>
            `
        })
    } else {
        list.forEach(coffe => {
            zone.innerHTML += `
                <article id='${coffe.id}'>
                    <h2 class="m-heading">${coffe.name}</h2>
                    <figure>
                        <img src="assets/images/${coffe.image}"/>
                    </figure>
                    <table>
                        <tbody style="display: flex; justify-content: space-between;">
                            <tr><td>Price · <span>${coffe.price.toFixed(2)} DH</span></td></tr>
                            <tr><td>Category · <span>${coffe.category}</span></td></tr>
                        </tbody>
                    </table>
                    <button class='add-to-cart-button'>ADD TO CART > </button>
                </article>
            `
        })
    }
    emptyCart()
}

panierCards.addEventListener('click', (e) => {
    const button = e.target.closest('button')
    if(button === null) return
    const article = button.closest('article')
    if(article === null) return
    const coffeCard = coffeeCart.find(coffe => coffe.id === article.id)
    if(button.classList.contains('increase')) {
        coffeCard.quantity++
        countTotal()
        injectCoffe(panierCards, coffeeCart)
        injectTotal()
    }
    else if (button.classList.contains('decrease')){
        if (coffeCard.quantity > 1){
            coffeCard.quantity--;
        } else {
            coffeeCart = coffeeCart.filter(item => item.id !== coffeCard.id)
            localStorage.setItem('coffecount', coffeeCart.length)
        }
        countTotal()
        injectCoffe(panierCards, coffeeCart)
        injectTotal()
    }
})

// Inject total 




function injectTotal(){
    totalSection.innerHTML = `
        <article class="billet">
        <div class="badge">✓ Sélection ajoutée</div>
        <h2>Votre récapitulatif</h2>
        <h3> Tickets total · Quantité : ${coffeeCart.length}</h3>

        <div class="seperator"></div>

        <table id="ticket">
            <tbody>
            </tbody>
        </table>    
    </article>
    `
    let href = '?'
    for(let coffe of coffeeCart){
        totalSection.querySelector('tbody').innerHTML += `
            <tr>
                <td><span>${coffe.quantity}</span>  ·   ${coffe.name}</td>
                <td><span>${(coffe.price * coffe.quantity).toFixed(2)} </span>DH</td>
            </tr>
        `
        for(let key in coffe) {
            href += coffe[key]
        }
    }
    
    totalSection.querySelector('article').innerHTML += `
        <div style="margin: 0"class="seperator"></div>
        <h3 style='display: flex; justify-content: space-between; margin-top: 10px'>Prix de cette sélection · <span style='color: var(--coffe-text); font-size: 14px'>${countTotal().toFixed(2)} DH</span></h3>
            <button class="order button"><a href="checkout.html${href}">Order Now</a</button>
        `
}


injectTotal()

function countTotal() {
    total = 0;
    coffeeCart.forEach(coffe => {
        total += coffe.price * coffe.quantity
    })
    return total;
}

// selectedcoffe

const selectedcoffe = { 
    id: null,
    name: null,
    price: null,
    quantity: null,
    image: null
}

// Quick Search
const searchButton = document.getElementById('quickSearch')

searchButton.addEventListener('click', quickSearch)

const popUp = document.querySelector('.pop-up')
const catalog = popUp.querySelector('.catalog')
function quickSearch() {
    const searchBar = popUp.querySelector('input')
    popUp.classList.toggle('hidden')
 
    searchBar.addEventListener('input', () => {

        arr = coffeeProducts.filter(coffe => coffe.name.toUpperCase().includes(searchBar.value.toUpperCase()))
        injectCoffe(catalog, arr)

    })
}


catalog.addEventListener('click', (e) => {
        let clicked = e.target.closest('button')
        if(clicked === null) return;
        const exists = coffeeCart.find(item => item.id === clicked.parentElement.id) ?? false
        if(!exists){
            let obj = coffeeProducts.find(item => item.id === e.target.closest('button').parentElement.id)
            coffeeCart.push(selectCoffe(selectedcoffe, obj))
            localStorage.setItem('coffecount', coffeeCart.length)
            shopCount.innerHTML = JSON.parse(localStorage.getItem('coffecount'))
            countTotal()
            injectCoffe(panierCards, coffeeCart)
            injectTotal()
            popUp.classList.toggle('hidden')
            return;
        }
        console.log(exists)
        exists.quantity++
        let index = coffeeCart.findIndex(item => item.id === exists.id)
        coffeeCart[index] = exists;
        console.log(index)
        countTotal()
        injectCoffe(panierCards, coffeeCart)
        injectTotal()
        popUp.classList.toggle('hidden')
    })


function selectCoffe(obj1, obj2){
    obj1.id = obj2.id
    obj1.name = obj2.name
    obj1.price = obj2.price
    obj1.quantity = 1
    obj1.image = obj2.image

    return {...obj1}
}

const addToCartButton = popUp.querySelectorAll('button')

addToCartButton.forEach(btn => {
    btn.addEventListener('click', )
})