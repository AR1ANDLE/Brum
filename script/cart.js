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

let total = 0
const totalSection = document.querySelector('.total-section')

// inject data in the panier section
const panierCards = document.querySelector('.card-container')

injectCoffe()

function injectCoffe() {
    panierCards.innerHTML = '';
    coffeeCart.forEach(coffe => {
        panierCards.innerHTML += `
            <article id='${coffe.id}'>
                <h2 class="m-heading">${coffe.name}</h2>
                <figure>
                    <img src="assets/images/${coffe.image}"/>
                </figure>
                <table>
                    <tbody style="display: flex; justify-content: space-between;">
                        <tr><td>Price · <span>${coffe.price} DH</span></td></tr>
                        <tr><td>Quantity · <span>${coffe.quantity}</span></td></tr>
                    </tbody>
                </table>
                <div class="add-container">
                    <button class='increase'>+</button>
                    <button class='decrease'>-</button>
                </div>
                <h3></h3>
            </article>
        `
    })
}

panierCards.addEventListener('click', (e) => {
    const button = e.target.closest('button')
    const article = button.closest('article')
    const coffeCard = coffeeCart.find(coffe => coffe.id === article.id)
    if(button.classList.contains('increase')) {
        coffeCard.quantity++
        countTotal()
        injectCoffe()
        injectTotal()
    }
    else if (button.classList.contains('decrease') && coffeCard.quantity > 0){
        coffeCard.quantity--;
        countTotal()
        injectCoffe()
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
    for(let coffe of coffeeCart){
        totalSection.querySelector('tbody').innerHTML += `
            <tr>
                <td><span>${coffe.quantity}</span>  ·   ${coffe.name}</td>
                <td><span> ${coffe.price} </span>DH</td>
            </tr>
        `
    }
    totalSection.querySelector('article').innerHTML += `
        <div style="margin: 0"class="seperator"></div>
        <h3 style='display: flex; justify-content: space-between; margin-top: 10px'>Prix de cette sélection · <span style='color: var(--coffe-text); font-size: 14px'>${countTotal()} DH</span></h3>
            <button class="order button">Order Now</button>
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
