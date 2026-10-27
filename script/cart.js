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


// inject data in the panier section
const panierSection = document.querySelector('.panier-container')

function injectOrders(){
    if (coffeeCart.length === 0) {
        panierSection.innerHTML = `
            <h1>Votre panier est vide</h1>
            <div class='buttons-container'>
                <button>Acceder au catalog</button>
                <button>Personalizer votre café</button>
            </div>
        `
    } else {
        coffeeCart.forEach((coffee, i)    => {
            panierSection.innerHTML += `
                <article class="billet">
                    <h2>Ticket ${i + 1}</h2>
                    <table>
                        <tbody>
                <tr>
                    <td>· ${coffee.name} ·<span>${coffe}</span></td>
                    <td>Price · <span>${coffee.price}</span></td>
                    <td>Quantity · <span>${coffee.quantity}</span></td>
                </tr>

            `
        })
    }
}





// input validation 
const paymentForm = document.querySelector('.payment-form')
const paymentData = paymentForm.querySelectorAll('input')
const validName = /^[a-zA-ZÀ-ÿ'\s-]{2,30}$/
const validMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const validCvv = /^[0-9]{3,4}$/

function validate(){

    paymentData.forEach(data => {
        if(data.dataset.name === 'name') {
            if(validName.test(data.value)) {
                data.style.cssText = `
                    border: 2px solid green;
                `
                data.previousElementSibling.textContent = 'Valid name'
                data.previousElementSibling.style.cssText = 'color: green;'

            } else {
                data.style.cssText = `
                    border: 2px solid red;
                `
                data.previousElementSibling.textContent = 'Invalid name'
                data.previousElementSibling.style.cssText = 'color: red;'
            }
        }
        
        if(data.dataset.name === 'mail') {
            if(validMail.test(data.value)) {
                data.style.cssText = `
                    border: 2px solid green;
                `
                data.previousElementSibling.textContent = 'Valid name'
                data.previousElementSibling.style.cssText = 'color: green;'

            } else {
                data.style.cssText = `
                    border: 2px solid red;
                `
                data.previousElementSibling.textContent = 'Invalid name'
                data.previousElementSibling.style.cssText = 'color: red;'
            }
        }
    })
}


const submitPayment = document.getElementById('submit')

submitPayment.preventDefault
submitPayment.addEventListener('click', () => {
    validate();
})