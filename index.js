// const body = document.querySelector('body');
// function addEl(str, container){
//     return container.append(document.createElement('div').innerHTML = str)
// }
// addEl(`hello`, body)
// console.log('start');
// console.log('start 2');
// function twoSeconds() {
//     console.log('Inside timeout, after 2000sec.');
// }
// window.setTimeout(function() {
//     console.log('Inside timeout, after 4000sec.');
// }, 4000);
// setTimeout(twoSeconds, 2000);
// console.log('end');
// Promises
// console.log('Request data...');
// setTimeout(() => {
//     console.log('Preparing data...');

//     const backendData = {
//         server: 'aws',
//         port: 2000,
//         status: 'working',
//     }

//     setTimeout(() => {
//         backendData.modified = true
//         console.log('Data received', backendData);
//     }, 2000);
// }, 2000);

// console.log('Request data...');
// const promise = new Promise(function(resolve, reject){
//     setTimeout(() => {
//         console.log('Preparing data...')
//         const backendData = {
//             server: 'aws',
//             port: 2000,
//             status: 'working',
//         }
//         resolve(backendData)
//     }, 2000);
// })
// promise.then(function(data){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             data.modified = true
//             resolve(data)
//             // reject(data)
//         }, 2000);
//     })
// }).then(clientData => {
//     console.log('Data recived', clientData);
//     clientData.fromPromise = true
//     return clientData
// }).then(data => {
//     console.log('Modified', data);
// })
// .catch(err => console.log('Error:', err))
// .finally(() => console.log('Finally'))
// console.log('Request data...');
// const sleep = ms => {
//   return new Promise(resolve => {
//   setTimeout(() => { resolve() },ms)
//   })
// }
// sleep(2000).then(() => console.log('After 2 sec'))
// sleep(3000).then(() => console.log('After 3 sec'))

// Promise.all([sleep(2000), sleep(5000)])
//     .then(() => {
//         console.log('After finish all promises')
//     })

// Promise.race([sleep(2000), sleep(5000)])
//     .then(() => {
//         console.log('After finish first promise')
//     })
// const mock = [
//     {
//         "id": 1,
//         "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//         "price": 109.95,
//         "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//         "category": "men's clothing",
//         "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//         "rating": {
//             "rate": 3.9,
//             "count": 120
//         },
//     },
//     {
//         "id": 2,
//         "title": "Fjallraven - Foldsack No. 2 Backpack, Fits 15 Laptops",
//         "price": 109.95,
//         "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//         "category": "men's clothing",
//         "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//         "rating": {
//             "rate": 3.9,
//             "count": 120
//         }
//     },
//     {
//         "id": 3,
//         "title": "Fjallraven - Foldsack No. 3 Backpack, Fits 15 Laptops",
//         "price": 109.95,
//         "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//         "category": "men's clothing",
//         "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//         "rating": {
//             "rate": 3.9,
//             "count": 120
//         }
//     },
// ]
// const load = function (fn) {
//     fetch(GET_URL)
//         .then((response) => {
//             if (response.ok) {
//                 return response.json()
//             }
//         })
//         .then((data) => {
//             fn(data)
//         })
// }

// load(renderCard)
const GET_URL = 'https://fakestoreapi.com/products?limit=3';
// const cardTemplate = document.querySelector('#card').content.querySelector('.cardItem');
const cardTemplate = document.querySelector('#card').content.querySelector('.products__swiper-slide');
const imgCardTemplate = document.querySelector('#imgCard').content.querySelector('.card__swiper-slide');
// const container = document.querySelector('.container');
const container = document.querySelector('.products__swiper-wrapper');


const getCardTemplate = (cardData) => {
    
    // console.log(imgCard);

    const card = cardTemplate.cloneNode(true)
    card.querySelector('h3').textContent = cardData.title;
    card.querySelector('p').textContent = cardData.description;
    card.querySelector('span').textContent = `Price:${cardData.price} ₽`;    
    // console.log(card);
    return card

}

const getImgTemplate = (cardData) => {

    const imgCard = imgCardTemplate.cloneNode(true)
    imgCard.querySelector('img').src = cardData.image;
    imgCard.querySelector('img').alt = `${cardData.title}.`;
    // console.log(imgCard);
    return imgCard

}

const renderCard = (dataArr) => {    

    // Массив элементов карточек
    cardArr = dataArr.map((item)=>( 
        getCardTemplate(item) 
    ))    
    
    // Добавление карточке в вёрстку     
    cardArr.forEach(card => {
        container.append(card)
    });
    
    // Нахожу все свормировавшие контейнеры
    const inerContainer = document.querySelectorAll('.card__swiper-wrapper');

    // На каждом конетейнере запускаю цикл формирования и заполнения оставшейся части карточки товара 
    inerContainer.forEach(element => {

        imgArr = dataArr.map((item)=>( 
            getImgTemplate(item) 
        ))
        // Пушу в каждый контейнер остаток карточки из массива посредством спред оператора
        element.append(...imgArr);
        
    });
}

// renderCard(mock)

const load = function (fn) {
    const promise = new Promise((resolve, reject) => {
        resolve(fetch(GET_URL))
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
        }
    })
    .then((data) => {
        fn(data)
    })
    .catch((error) => console.log(`Error: `, error))
}

load(renderCard)

