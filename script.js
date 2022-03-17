let product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        img:  'images/product2.jpg',
        descr: 'Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
        get Summ() {
            return this.price * this.amount 
        },
        get Kcall ( ) {
            return  this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 700,
        amount: 0,
        img:  'images/product1.jpg',
        descr: 'Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.',
        get Summ() {
            return this.price * this.amount 
        },
        get Kcall ( ) {
            return  this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO ',
        price: 31900,
        kcall: 1200,
        amount: 0,
        img:  'images/product3.jpg',
        descr: '  FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.' ,
        get Summ() {
            return this.price * this.amount 
        },
        get Kcall ( ) {
            return  this.kcall * this.amount
        }
    }
}




let extraProduct = {
    doubleMayonnaise: {
        name: 'двойной майонез',
        price: 1000,
        kcall: 100,
    },
    lettuce: {
        name: 'салатный лист',
        price: 700,
        kcall: 30,
    },
    cheese: {
        name: 'сыр',
        price: 500,
        kcall: 60,
    }
}

let str = '' 

function createBurher () {
    let main = document.querySelector('.main')
    for (let key in product) {
        let {name, price, descr, img} = product[key]
        str += `
        <section class="main__product" id="${key}">
        <div class="main__product-preview">
            <div class="main__product-info">
                <img src="${img}" alt="" class="main__product-img">
                <h2 class="main__product-title">${name}
                    <span class="main__product-many">${price} сум</span>
                </h2>
            </div>
            <p class="main__product-descr">
                ${descr}
            </p>
        </div>
        <div class="main__product-extra">
            <div class="main__product-number">


                <a class="main__product-btn fa-reg minus" data-symbol="-"></a>


                <output class="main__product-num">0</output>


                <a class="main__product-btn fa-reg plus" data-symbol="+"></a>


            </div>
            <div class="main__product-price"><span>0</span> сум</div> 
        </div>
        <div class="main__product-extraProduct">
        `;
        for (let newKey in extraProduct) {
            str += `
            <label class="main__product-label">
                        
                <input type="checkbox" class="main__product-checkbox" data-extra="${newKey}">
                <span class="main__product-check"></span>
                ${extraProduct[newKey].name}
            </label>
            `;
        }
        str += `
        </div>
            <div class="main__product-kcall"><span>0</span> калорий</div> 

        </section>
        `;
    }

   main.innerHTML = str

   burgers()
}

setTimeout(() => createBurher(), 1000)


function burgers () {
    let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCard = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptWindowOut = document.querySelector('.receipt__window-out'),
    receiptWindowBtn = document.querySelector('.receipt__window-btn');

btnPlusOrMinus.forEach(item => {
    item.addEventListener('click', function() {
        funcBtnPlusOrMinus(this)
    })
})

function funcBtnPlusOrMinus(el) {
    // .closest() - ищет ближащий родитель по указанному селектору
    const parentId = el.closest('.main__product').getAttribute('id')

    let out = el.closest('.main__product').querySelector('.main__product-num'),
        price = el.closest('.main__product').querySelector('.main__product-price span'),
        kcall = el.closest('.main__product').querySelector('.main__product-kcall span');
    if (el.getAttribute('data-symbol') === '+') {
        product[parentId].amount++
    }else if  (el.getAttribute('data-symbol') === '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    out.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall
}


checkExtraProduct.forEach(item => {
    item.addEventListener('click' , function() {
        addExtraProduct(this)
    })
})

function addExtraProduct(el) {
    const parent = el.closest('.main__product')
    const parentId = parent.getAttribute('id')

    product[parentId][el.getAttribute('data-extra')] = el.checked

    let price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elDataInfo = el.getAttribute('data-extra');

    if(product[parentId][elDataInfo] === true){
        product[parentId].price += extraProduct[elDataInfo].price
        product[parentId].kcall += extraProduct[elDataInfo].kcall
    } else  {
        product[parentId].price -= extraProduct[elDataInfo].price
        product[parentId].kcall -= extraProduct[elDataInfo].kcall
    }
    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall

}

let arrProduct = [],

    totalPrice = 0,
    totalKcall = 0,
    totalName = '';

addCard.addEventListener('click' , () => {
    for (let key in product) {
        let productobj = product[key]
        if (productobj.amount > 0 ) {
            arrProduct.push(productobj)
            for(let newKey in productobj) {
                if(productobj[newKey] === true) {
                    productobj.name += `\n ${extraProduct[newKey].name}`
                }
            } 

        }
        productobj.kcall = productobj.Kcall
        productobj.price = productobj.Summ
    }

    for (let i = 0;  i< arrProduct.length; i++) {
        let  el = arrProduct[i]
        totalPrice += el.price
        totalKcall += el.kcall
        totalName += `\n ${el.name} \n`
    }

    receiptWindowOut.innerHTML = `вы заказали \n ${totalName} \n коларийность ${totalKcall} \n общая сумма ${totalPrice} сум`

    receipt.style.display = `flex`
    setTimeout(() => receipt.style.opacity = 1, 100)
    setTimeout(() => receiptWindow.style.top = 0, 100)

    let outNum = document.querySelectorAll ('.main__product-num'),
        outPrice = document.querySelectorAll('.main__product-price span'),
        outKcall = document.querySelectorAll('.main__product-kcall span')
        
    for (let i = 0 ; i < outNum.length; i++) {
        outNum[i].innerHTML = 0
        outKcall[i].innerHTML = 0
        outPrice[i].innerHTML = 0
    }        

    receiptWindowBtn.addEventListener('click', () => {
        location.reload()
    })
})

}


let lvl = document.querySelector('.header__timer'),
    lvlNumber = document.querySelector('.header__timer-extra');
let  i = 0


function timer () {
    if (i < 99) {
        lvlNumber.innerHTML = i++
        setTimeout(() => timer(), 3)
    } else {
        lvlNumber.innerHTML = 100
    }
}


timer()