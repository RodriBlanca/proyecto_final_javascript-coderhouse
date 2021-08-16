/* CLASES */
class Product {
    constructor(img, name, price, id) {
        this.img = img;
        this.name = name;
        this.price = price;
        this.id = id;
        this.amount = 1;
    }
}

class User {
    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}

/* VARIABLES */
const body = document.querySelector('.body');
// Trolley variables
const trolley = document.querySelector('.trolley'); 
const cards = document.querySelectorAll('.card');
const trolleyList = document.querySelector('.trolley-products__list');
const trolleyProducts = document.querySelector('.trolley-products');
const trolleyTotal = document.querySelector('.trolley-total');
const deleteAllBtn = document.querySelector('.delete-all');
const totalBtn = document.querySelector('.calculate-total');
let productsList = [];
let product;
// User variables
const user = document.querySelector('.user');
const userRegister = document.querySelector('.user-register');
const logInBtn = document.querySelector('.log-in');
const nameInput = document.querySelector('.user-name__input');
const surnameInput = document.querySelector('.user-surname__input');
const emailInput = document.querySelector('.user-email__input');
const message = document.querySelector('.message');
const messageBtn = document.querySelector('.message-button');
let userName;
let userSurname;
let userEmail;
let newUser;
// Regular Expresion
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* CARGA LOS EVENTS LISTENERS */
loadEvents();

function loadEvents() {

    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
            if(e.target.classList.contains('add-button')) {
                clearTrolley();
                const newProduct = createProduct(i);   
                addProductTrolley(newProduct);         
                addToHTMLTrolley();
            }
        })
    }

    /* DELETE ALL TROLLEY BUTTON */
    deleteAllBtn.addEventListener('click', () => {
        productsList = [];
        clearTrolley();
    });

    /* DELETE PRODUCT */
    trolleyProducts.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.classList.contains('product-button')) {
            const productId = e.target.getAttribute('data-id');

            productsList = productsList.filter(producto => producto.id != productId)
            addToHTMLTrolley();
        }
    })

    /* TOTAL BUTTON EVENT */
    totalBtn.addEventListener('click', calculateTotal);

    /* LOG IN EVENT */
    logInBtn.addEventListener('click', register);

    /* INPUTS VALIDATION */
    nameInput.addEventListener('blur', nameValidation);
    surnameInput.addEventListener('blur', surnameValidation);
    emailInput.addEventListener('blur', emailValidation);

    /* ACTIVATE BUTTON */
    nameInput.addEventListener('blur', enableBtn);
    surnameInput.addEventListener('blur', enableBtn);
    emailInput.addEventListener('blur', enableBtn);

    /* MESSAGE BUTTON */
    // messageBtn.addEventListener('click', closeMessage);

}

/* FUNCTIONS */

/* CREA UN NUEVO PRODUCTO CON LOS VALORES DE LAS CARDS */
function createProduct(i) {
    const img = cards[i].children[0];
    const name = cards[i].children[1].children[0].textContent;
    const price = cards[i].children[1].children[1].children[0].textContent;
    const id = cards[i].querySelector('a').getAttribute('data-id');
    return new Product(img, name, price, id);
}

/* AGREGA UN PRODUCTO AL ARRAY "productList" */
function addProductTrolley(product) {
    productsList = [...productsList, product];
}

/* MUESTRA LOS PRODUCTOS EN EL HTML */
function addToHTMLTrolley() {
    clearTrolley();
    productsList.forEach(product => {
        if(body.classList.contains('dark-body')) {
            const tr = document.createElement('tr');
            li.classList.add('product');
            const trName = document.createElement('td');
            const trPrice = document.createElement('td');
            const trAmount = document.createElement('td');
            const trButton = document.createElement('td');
            trButton.innerHTML = `
                <a href="#" class="product-button">X</a>
            `;
            trName.textContent = `${product.name}`;
            trAmount.textContent = `${product.amount}`;
            trPrice.textContent = `$${product.price}`;
            tr.style.color = 'white';
            tr.appendChild(trName);
            tr.appendChild(trAmount);
            tr.appendChild(trPrice);
            tr.appendChild(trButton);
            trolleyList.appendChild(tr);
        } else {
            const tr = document.createElement('tr');
            tr.classList.add('product');
            const trName = document.createElement('td');
            const trPrice = document.createElement('td');
            trPrice.setAttribute('align', 'left');
            const trAmount = document.createElement('td');
            const trButton = document.createElement('td');
            trButton.innerHTML = `
                <a href="#" class="product-button" data-id="${product.id}">X</a>
            `;
            trName.textContent = `${product.name}`;
            trAmount.textContent = `${product.amount}`;
            trPrice.textContent = `$${product.price}`;
            tr.appendChild(trName);
            tr.appendChild(trAmount);
            tr.appendChild(trPrice);
            tr.appendChild(trButton);
            trolleyList.appendChild(tr);
        }
    })
}

/* LIMPIA EL TROLLEY */
function clearTrolley() {
    trolleyList.textContent = '';
}

/* CALCULA EL TOTAL DE LA COMPRA */
function calculateTotal() {
    totalList = [];
    console.log(productsList);
    productsList.forEach(product => {
        console.log(parseInt(product.price));
        totalList = [...totalList, parseInt(product.price)];
        sum = 0;
        totalList.forEach(precios => {
            sum += precios;
            return sum;
        })
        console.log(totalList);
        console.log(sum);
    })
    sumToHTML(sum);
    setTimeout(function() {
        productsList = [];
        clearTrolley();
    }, 2500);
    setTimeout(function() {
        totalList = [];
        trolleyTotal.textContent = '';
    }, 3000);
}

/* MUESTRA EL TOTAL EN EL HTML */
function sumToHTML(total) {
    const totalToPay = document.createElement('p');
    totalToPay.textContent = `El total a pagar es de $${total}`;
    totalToPay.style.color = 'black';
    trolleyTotal.appendChild(totalToPay);
}

/* USER LOG IN */
function register(e) {
    e.preventDefault()
    createUser();
    localStorageUser(newUser);
    clearInput();
    createMessage();
}

function createUser() {
    const name = nameValidation();
    const surname = surnameValidation();
    const email = emailValidation();
    newUser = new User(name, surname, email);
    return newUser;
}

function nameValidation() {
    if(nameInput.value.length > 0) {
        
        // Elimina los errores de validación
        const error = document.querySelector('p.errorAlert');
        if(error) {
            error.remove();
        }

        nameInput.classList.remove('errorInput');
        nameInput.classList.add('validate');
        return nameInput.value;

    } else {
        nameInput.classList.remove('validate');
        nameInput.classList.add('errorInput');
        errorMessage('Todos los campos son obligatorios');
    }
}

function surnameValidation() {
    if(surnameInput.value.length > 0) {
        
        // Elimina los errores de validación
        const error = document.querySelector('p.errorAlert');
        if(error) {
            error.remove();
        }

        surnameInput.classList.remove('errorInput');
        surnameInput.classList.add('validate');
        return surnameInput.value;

    } else {
        surnameInput.classList.remove('validate');
        surnameInput.classList.add('errorInput');
        errorMessage('Todos los campos son obligatorios');
    }
}

function emailValidation() {
    if(emailInput.value.length > 0) {    
        // Elimina los errores de validación
        const error = document.querySelector('p.errorAlert');
        if(error) {
            error.remove();
        }

        // Validación del email
        if(re.test(emailInput.value)) {
            console.log('El email es válido');
            emailInput.classList.remove('errorInput');
            emailInput.classList.add('validate');
            return emailInput.value;
        } else {
            errorMessage('El email no es válido');
        }

        console.log(emailInput.classList);

    } else {
        emailInput.classList.remove('validate');
        emailInput.classList.add('errorInput');
        errorMessage('Todos los campos son obligatorios');
    }
}

/* HABILITA EL BOTÓN PARA ENVIAR EL FORMULARIO */
function enableBtn() {
    if(nameInput.value !== '' && surnameInput.value !== '' && emailInput.value !== '') {
        logInBtn.removeAttribute('disabled');
        logInBtn.style.backgroundColor = 'seagreen';
    }
}

/* Agrega un mensaje de error */
function errorMessage(message) {
    const errorAlert = document.createElement('p');
    errorAlert.classList.add('errorAlert');
    errorAlert.textContent = message;
    const errores = document.querySelectorAll('.errorInput');

    console.log(errores.length)
    
    if(errores.length === 1) {
        userRegister.insertBefore(errorAlert, logInBtn);
    }
}

/* LIMPIA LOS CAMPOS DEL FORMULARIO */
function clearInput() {
    nameInput.value = '';
    surnameInput.value = '';
    emailInput.value = '';
}

/* ENVÍA LOS DATOS DEL USUARIO AL LOCAL STORAGE */
function localStorageUser(user) {
    const userToString = JSON.stringify(user)
    localStorage.setItem('user', userToString);
}

/* TOMA DATOS DEL LOCALSTORAGE Y DEVUELVE UN SALUDO AL USUARIO */
function createMessage() {
    const localUser = localStorage.getItem('user');
    const userJSON = JSON.parse(localUser);
    const userMessage = document.createElement('div');
    userMessage.innerHTML = `
        <button class="message-button">X</button>
        <p>Bienvenido/a ${userJSON.name} ${userJSON.surname}, muchas gracias por registrarte!</p>
    `;   
    message.classList.add('user-message');
    message.appendChild(userMessage);
    return message;
}

/* CIERRA EL MENSAJE */
function closeMessage() {
    // message.classList.remove('user-message');
    // message.removeChild;
    console.log('Funciona');
}


/* UTILIZACIÓN DE JQUERY */
/* DARK MODE */
$( document ).ready(function(){

    /* Dependiendo si se almacenó un valor en el localStorage, ejecuta ese o el light por default */
    if(localStorage.getItem('mode') == 'dark') {
        dark();
    } else {
        light();
    }

    const theme = () => {
        if(localStorage.getItem('mode') == 'dark') {
            light();
        } else {
            dark();
        }
    }

    function dark () {
        $('.body').addClass('dark-body');
        $('.header').addClass('dark-header');
        $('.main').addClass('dark-main');
        $('.footer').addClass('dark-footer');
        $('.card').addClass('dark-card');
        $('.trolley-products').addClass('dark-trolley__products');
        $('.trolley-data').addClass('dark-trolley__data');
        $('.user-register').addClass('dark-user__register');
        /* UTILIZACIÓN DE EFECTOS CON JQUERY */
        $('.dark-mode').css('background-color', 'seagreen');
        $('.dark-mode').text('Light Mode');
    
        localStorage.setItem('mode', 'dark');
    }

    function light () {
        $('.body').removeClass('dark-body');
        $('.header').removeClass('dark-header');
        $('.main').removeClass('dark-main');
        $('.footer').removeClass('dark-footer');
        $('.card').removeClass('dark-card');
        $('.trolley-products').removeClass('dark-trolley__products');
        $('.trolley-data').removeClass('dark-trolley__data');
        $('.user-register').removeClass('dark-user__register');
        $('.product').removeClass('dark-product');
        /* UTILIZACIÓN DE EFECTOS CON JQUERY */
        $('.dark-mode').css('background-color', 'rgb(32, 32, 32)');
        $('.dark-mode').text('Dark Mode');

        localStorage.setItem('mode', 'light');
    }

    $('.dark-mode').click(theme);
})

const usersURL = 'https://jsonplaceholder.typicode.com/users';

const userDatos = {name: 'Roberto', surname: 'Juarez', email: 'rbjuarez@gmail.com'};

$('.log-in').click((e) => {
    e.preventDefault();
        $.post(usersURL, userDatos, (respuesta, estado) => {
            if(estado === "success") {
                // respuesta.forEach(e => {
                // //     $('body').prepend(`<div>
                // //     Guardado:${e.name};
                // // </div>`)
            
                // })
                console.log(respuesta);
            }
        })
        // console.log('funciona');
        // console.log(usersURL)
        $.get(usersURL, (respuesta, estado) => {
            respuesta.forEach(e => {
                console.log(e.name);
            })
        })
    })
