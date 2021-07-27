/* CLASES */
class Product {
    constructor(img, name, price) {
        this.img = img;
        this.name = name;
        this.price = price;
        this.amount = 1;
    }
}

/* VARIABLES */
const trolley = document.querySelector('.trolley'); 
const cards = document.querySelectorAll('.card');
const trolleyList = document.querySelector('.trolley-products__list');
const deleteAllBtn = document.querySelector('.trolley-products__button');
let productsList = [];
let product;

/* CARGA LOS EVENTS LISTENERS */
loadEvents();

function loadEvents() {
    trolley.addEventListener('click', showTrolleyList)

    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
            if(e.target.classList.contains('add-button')) {
                clearTrolley();
                createProduct(i);
                addProductTrolley(product);         
                addToHTMLTrolley(product);
            }
        })
    }

    deleteAllBtn.addEventListener('click', () => {
        productsList = [];
        clearTrolley();
    });
}

/* FUNCTIONS */

/* MUESTRA Y OCULTA LA LISTA DE LOS PRODUCTOS */
function showTrolleyList() {
    const showList = trolley.parentElement.children[2];
    const listBtn = trolley.parentElement.children[2].children[1];
    if(showList.classList.contains('show')) {
        showList.classList.remove('show');
        listBtn.classList.remove('show-button');
    } else {
        showList.classList.add('show');
        listBtn.classList.add('show-button');
    }
}

/* CREA UN NUEVO PRODUCTO CON LOS VALORES DE LAS CARDS */
function createProduct(i) {
    const img = cards[i].children[0];
    const name = cards[i].children[1].children[0].textContent;
    const price = cards[i].children[1].children[1].children[0].textContent;
    product = new Product(img, name, price);
    return product;
}

/* AGREGA UN PRODUCTO AL ARRAY "productList" */
function addProductTrolley() {
    productsList = [...productsList, product];
}

/* MUESTRA LOS PRODUCTOS EN EL HTML */
function addToHTMLTrolley() {
    productsList.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('product');
        li.innerHTML = `
            <p>${product.name}</p>
            <p>$${product.price}</p>
        `;
        trolleyList.appendChild(li);
    })
}

/* LIMPIA EL TROLLEY */
function clearTrolley() {
    trolleyList.textContent = '';
}