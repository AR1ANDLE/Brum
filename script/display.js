// Imports 
    // Navigation Imports
    const personalize = document.querySelectorAll('.personalize-section')
    const checkout = document.getElementById('checkout')
    const shoppingCart = document.getElementById('shoppingCart')
    const logo = document.querySelector('.logo')
    const modifyButton = document.getElementById('modifyButton')
    const perCrumb = document.getElementById('pCrumb')
    const cheCrumb = document.getElementById('cCrumb')
    // Injection Imports
    const baseButton = document.querySelectorAll('.base-menu button')
    const sizeButton = document.querySelectorAll('.taille-menu button')
    const milkButton = document.querySelectorAll('.milk-menu button')
    const toppingButton = document.querySelectorAll('.topping-menu button')
    // Selection Menu Import
    const selectionButton = document.querySelectorAll('.optionbtn')

// Navigation

function toPersonalize() {
    for(let i = 0; i < personalize.length; i++) {
        personalize[i].classList.remove('hidden')
    }
    checkout.classList.add('hidden')
    window.scrollTo(0, 0)
}

function toCheckout() {
    for(let i = 0; i < personalize.length; i++) {
        personalize[i].classList.add('hidden')
    }
    checkout.classList.remove('hidden')
    window.scrollTo(0, 0)
}

logo.addEventListener('click', toPersonalize)
modifyButton.addEventListener('click', toPersonalize)
perCrumb.addEventListener('click', toPersonalize)
shoppingCart.addEventListener('click', toCheckout)
cheCrumb.addEventListener('click', toCheckout)

// Items injection

function injectItems(arr, data) {
    for(let i = 0; i < data.length; i++) {
        arr[i].firstElementChild.innerHTML = data[i].item
        if (data[i].price === 0) {
            arr[i].lastElementChild.innerHTML = 'inclus'
        } else {
            arr[i].lastElementChild.innerHTML = `${data[i].price},00 DH`
        }
    }
}

injectItems(baseButton, base)
injectItems(sizeButton, taille)
injectItems(milkButton, milk)
injectItems(toppingButton, topping)

// Selected buttons display

function selectButton(){
    for(let i = 0; i < selectionButton.length; i++) {
        selectionButton[i].addEventListener('click', () => {
            selectionButton[i].classList.toggle('optionbtn--selected')
        })
    }
}

selectButton()