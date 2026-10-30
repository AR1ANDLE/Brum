
let shopCount = document.querySelector('.shopCount')

shopCount.innerHTML = JSON.parse(localStorage.getItem('coffecount'))
function shopCountRefresh (){
    shopCount.innerHTML = JSON.parse(localStorage.getItem('coffecount'))
}

document.addEventListener('click',shopCountRefresh)
document.addEventListener('DOMContentLoaded', shopCountRefresh)
function toPanier() {
    window.location.href = '/Brum/cart.html'
}

function home() {
    window.location.href = '/Brum/index.html'
}