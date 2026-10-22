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

// Count price
const confirmButton = document.getElementById('addToCart')
const priceTotal = document.getElementById('priceTotal')
const checkoutPrice = document.getElementById('total-price')
let price = document.querySelectorAll('.price')


// Navigation
function toPersonalize() {
    for(let i = 0; i < personalize.length; i++) {
        personalize[i].classList.remove('hidden')
    }

    checkout.classList.add('hidden')
    perCrumb.classList.add('active')
    cheCrumb.classList.remove('active')

    window.scrollTo(0, 0)
}

function toCheckout() {
    for(let i = 0; i < personalize.length; i++) {
        personalize[i].classList.add('hidden')
    }

    checkout.classList.remove('hidden')
    cheCrumb.classList.add('active')
    perCrumb.classList.remove('active')

    window.scrollTo(0, 0)
}

logo.addEventListener('click', toPersonalize)
modifyButton.addEventListener('click', toPersonalize)
perCrumb.addEventListener('click', toPersonalize)
shoppingCart.addEventListener('click', toCheckout)
cheCrumb.addEventListener('click', toCheckout)
confirmButton.addEventListener('click', toCheckout)


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


// Selected buttons display and total price
function selectButton() {
    for(let i = 0; i < selectionButton.length; i++) {
        selectionButton[i].addEventListener('click', () => {
            for(let j = 0; j < selectionButton.length; j++) {
                if (
                    selectionButton[i].parentElement.classList === selectionButton[j].parentElement.classList &&
                    selectionButton[i].parentElement.id === 'unique'
                ) {
                    selectionButton[j].classList.remove('optionbtn--selected')
                }

                selectionButton[i].classList.add('optionbtn--selected')
            }
        })

        selectionButton[i].addEventListener('click', () => {
            let total = 0

            for(let i = 0; i < price.length; i++) {
                let val = price[i].innerHTML.replace(/,.*$/, "")
                let pickedPrice = Number(val)

                if (Number.isNaN(pickedPrice)) {
                    total += 0
                } else if (
                    pickedPrice !== 0 &&
                    price[i].parentElement.classList.contains('optionbtn--selected')
                ) {
                    total += pickedPrice
                }
            }

            priceTotal.innerHTML = `<span> ${total},00</span> DH`
            checkoutPrice.innerHTML = `${total},00 DH`
        })
    }
}

selectButton()


// Push user selected elements
function getPickedElements() {
    for(let i = 0; i < selectionButton.length; i++) {
        if(selectionButton[i].classList.contains('optionbtn--selected')) {
            let currentElement = document.querySelector(
                `.${selectionButton[i].parentElement.previousElementSibling.id}`
            )

            let currentElementPrice = document.querySelector(
                `.${selectionButton[i].parentElement.previousElementSibling.id}-price`
            )
            currentElement.innerHTML = selectionButton[i].firstElementChild.innerHTML
            currentElementPrice.innerHTML = selectionButton[i].lastElementChild.innerHTML
        }
    }

}