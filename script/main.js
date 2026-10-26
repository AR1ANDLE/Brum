const config = {
  base: {
    espresso: { name: "Espresso", price: 18 },
    filtre: { name: "Filtre", price: 16 }
  },
  taille: {
    s: { name: "S · 150 ml", price: 0 },
    m: { name: "M · 250 ml", price: 4 },
    l: { name: "L · 350 ml", price: 8 }
  },
  lait: {
    vache: { name: "Lait de vache", price: 0 },
    avoine: { name: "Lait d'avoine", price: 4 },
    amande: { name: "Lait d'amande", price: 5 }
  },
  supplements: {
    caramel: { name: "Caramel", price: 3 },
    vanille: { name: "Vanille", price: 3 }
  }
}

const tickets = []

let menuCrumb = document.getElementById('menuCrumb')
let checkoutCrumb = document.getElementById('checkoutCrumb')
let modifyButton = document.getElementById('modifyButton')

const menubuttons = [menuCrumb, modifyButton, document.querySelector('.logo')]
menubuttons.forEach(btn => {
    btn.addEventListener('click', toMenu)
}) 

function toCheckout() {
    const menuSection = document.querySelectorAll('.personalize-section')
    document.getElementById('checkout').classList.remove('hidden') 

    menuSection.forEach(section => {
        section.classList.add('hidden')
    })
    menuCrumb.classList.remove('active')
    checkoutCrumb.classList.add('active')

}

function toMenu() {
    const menuSection = document.querySelectorAll('.personalize-section')
    document.getElementById('checkout').classList.add('hidden') 

    menuSection.forEach(section => {
        section.classList.remove('hidden')
    })
    
    menuCrumb.classList.add('active')
    checkoutCrumb.classList.remove('active')
    
    window.location(0, 0)
}

const menuSection = document.getElementById('menu')
const formElement = menuSection.querySelector('form')

let menuHTML = ''
let total = 0;

for (const option in config) {
    let type = (option === 'supplements') ? 'Plusieurs choix' : 'Choix unique'

    menuHTML += `
        <label class="option-title" id="${option}">
            <h2>${option}</h2>
            <p>${type}</p>
        </label>
        <div class="selection-menu ${option}-menu">
    `

    for (const choices in config[option]) {
        const item = config[option][choices]
        const displayPrice = item.price === 0 ? 'Inclus' : `${item.price},00 DH`
        
        menuHTML += `
            <button type="button" class="optionbtn" data-category="${option}" data-key="${choices}">
                <h2>${item.name}</h2>
                <h3 class='price'>${displayPrice}</h3>
            </button>
        `
    }
    menuHTML += `</div>`
}
formElement.innerHTML = menuHTML

const optionButtons = document.querySelectorAll('.optionbtn')
const menuTotal = document.querySelector('#priceTotal')

function selectedButtons() {
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category

            if (category === 'supplements') {
                button.classList.toggle('optionbtn--selected')
            } else {
                let picked = button.classList.contains('optionbtn--selected')
                const siblings = menuSection.querySelectorAll(`.${category}-menu .optionbtn`)
                siblings.forEach(sib => sib.classList.remove('optionbtn--selected'))
                if (picked){
                    button.classList.remove('optionbtn--selected')
                } else {
                    button.classList.add('optionbtn--selected')
                }
                    
            }
            total = countTotal()
        })
    })
}

// Count total

function countTotal() {
    let total = 0;
    const activePrice = document.querySelectorAll('.optionbtn--selected')
    activePrice.forEach(price => {
        let category = price.dataset.category
        let key = price.dataset.key

        total += config[category][key].price
    })
    menuTotal.innerHTML = `<span>${total},00 DH</span>`
    return total;
}

// Generate ticket

function getPickedItems() {
    const pickedOptions = document.querySelectorAll('.optionbtn--selected')
    let ticket = {
        base: {},
        taille : {},
        lait: {name: 'without milk', price: 'Free'},
        supplements: {name: 'no topping', price: 'Free'},
    }
    let ticketTotal = 0;
    pickedOptions.forEach(pick => {
        ticket[pick.dataset.category].name = pick.dataset.key
        ticket[pick.dataset.category].price = pick.querySelector('h3').innerText
        ticketTotal += ticket[pick.dataset.category].price;
    })
    if(Object.entries(ticket.base).length === 0){
        alert('Please select a base option any addons')
        return
    }
    if(Object.entries(ticket.taille).length === 0){
        alert('Please pick a valid size')
        return
    }
    tickets.push(ticket)
    localStorage.setItem('Tickets', JSON.stringify(tickets))    
    return ticket;
}

function displayTicket() {
    const ticket = document.getElementById('ticket')
    if(Object.entries(getPickedItems()) < 2){
        return;
    }
    ticket.innerHTML = `
        <tbody>
    `
    for (item in getPickedItems()) {
        let row = `
            <tr>
                <td>${item} · <span>${getPickedItems()[item].name}</span></td>
                <td><span class="td-price">${getPickedItems()[item].price}</span></td>
            </tr>
        `
        ticket.innerHTML += row
    }
    ticket.innerHTML += `
        </tbody>
        <tfoot>
            <tr>
                <td>Total</td>
                <td><span id="total-price">${total},00 DH</span></td>
            </tr>
    `
    toCheckout()
}

// Inject Tickets in cart section

function injectTickets() {
    const cartSection = document.getElementById('cart-container')
    const tickets = JSON.parse(localStorage.getItem('Tickets'))

    if(tickets.length === 0){return;}

    cartSection.innerHTML = `
        <h1>You Have ${tickets.length} tickets.</h1>
        <table> <tbody>
    `

    tickets.forEach((ticket, index)=> {

        const row = Object.entries(ticket)
        
        
        cartSection.innerHTML += `
            <article>
                <h2>Ticket ${index + 1}</h2>
                <table>
                    <tbody>${row}</tbody>
                    <tfoot>${ticket.total}</tfoot>
                </table>
                
            </article>
        `
    })
}

selectedButtons()


// Cart section 

// inject tickets
const shoppingCart = document.getElementById('shoppingCart')

shoppingCart.addEventListener('click', () => {window.location.href = 'checkout.html'})