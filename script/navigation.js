
let shopCount = document.querySelector('.shopCount')

shopCount.innerHTML = JSON.parse(localStorage.getItem('coffecount'))
function toPanier() {
    window.location = 'http://127.0.0.1:5500/cart.html'
}