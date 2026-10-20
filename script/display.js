const personalize = document.querySelectorAll('.personalize-section')
const checkout = document.getElementById('checkout')
const shoppingCart = document.getElementById('shoppingCart')
const logo = document.querySelector('.logo')
const modifyButton = document.getElementById('modifyButton')
const perCrumb = document.getElementById('pCrumb')
const cheCrumb = document.getElementById('cCrumb')

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
