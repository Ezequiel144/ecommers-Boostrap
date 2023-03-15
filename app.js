const product = [
    {
        prod: "Remeras-zlog",
        img: "./img/prodrem.jpg",
        tipo: "remera",
        cant: 1,
        id: 1,
        precio: 100,    
    },
    {
        prod: "Remeras-Admin",
        img: "./img/prodrem.jpg",
        tipo: "remera",
        cant: 1,
        id: 2,
        precio: 300,    
    },
    {
        prod: "Remeras-Block",
        img: "./img/prodrem.jpg",
        tipo: "remera",
        cant: 1,
        id: 3,
        precio: 150,    
    },
    {
        prod: "Remeras-Fire",
        img: "./img/prodrem.jpg",
        tipo: "remera",
        cant: 1,    
        id: 4,
        precio: 220,
    },
];
const sec2 = document.querySelector(".section2");
const cartitem = document.querySelector(".cart");
const cartshop = document.querySelector(".catshop");
let addprod = document.querySelectorAll(".agregar");
const closemenu = document.querySelector(".catshop__x");
const numbercart = document.querySelector(".content__cart__value");
const cartshopcontent = document.querySelector(".catshop__content");
const pricetotal = document.querySelector(".catshop__total__price__number");
let borrarprod = document.querySelectorAll(".cartshop__prod__delete");

function createprod(productE){
    productE.forEach(p => {
        const div = document.createElement("div");
        div.classList = "card";
        div.innerHTML = `<img src="${p.img}" class="card-img-top" alt="${p.id}">
        <div class="card-body">
          <h5 class="card-title text-center">${p.prod}</h5>
          <button id="${p.id}" class="agregar btn btn-danger">Agregar</button>
        </div>`
        sec2.append(div);
        
    });

    addclick();
    /* console.log(addprod); */
        
}
createprod(product);



function addclick(){
    addprod = document.querySelectorAll(".agregar");
    addprod.forEach(ad => {
        /* console.log(ad); */
        ad.addEventListener("click",addtolistcart);
    })
}


/* Carrito click abrir */ 
cartitem.addEventListener("click",()=>{
    cartshop.style.display = "block";
})
/* Carrito click cerrar */
closemenu.addEventListener("click",() => {
    cartshop.style.display = "none";
})


/* cargar carrito en lista */
const cartlist = [];

function addtolistcart(e){
    const id = e.currentTarget.id;
    /* const prodadd = buscarprod(product,id); */
    const prodadd = product.find(pr => pr.id === parseInt(id));
    /* con la funcion FIND encontrara el primer elemento 
    del arreglo que cumpla la condicion y
    retornara ese valor.
    en este caso un objeto en la cte PROADD*/
    
    /* console.log(cartlist); */
    if(cartlist.some(list => list.id === parseInt(id))){
        /* some(): Prueba si al menos un elemeto pasa la condicion que 
        fue implementada.
        retorna un TRUE o FALSE*/
        /* const index = cartlist.findIndex(ind => ind.id === parseInt(id));
        cartlist[index].cant++; */
        prodadd.cant++;
        /* console.log(prodadd); */
    }else{
        prodadd.cant = 1;
        cartlist.push(prodadd);//Agrega a la lista//        
    }
    /* console.log(cartlist); */
    updatenumbcart(cartlist);
    localStorage.setItem("lista-productos-al-carrito",JSON.stringify(cartlist));
    addtocart(cartlist);
}

function updatenumbcart(list){
    let totalcart = list.reduce((acc,number) => acc + number.cant, 0);
    numbercart.style.display = "block"
    numbercart.innerText = totalcart;
}

function addtocart(prod){
    
    /* cartshop.innerHTML = " "; */
    cartshopcontent.innerHTML = " ";
    prod.forEach(p => {
        const div2 = document.createElement("div");
        div2.classList = "cartshop__prod";
        div2.innerHTML = `
        <img class="cartshop__prod__img" src="${p.img}" alt="${p.id}">
        <h5 class="cartshop__prod__title">${p.prod}</h5>
        <img id="${p.id}" class="cartshop__prod__delete" src="./img/borrar.png" alt="borrar">
        <p class="cartshop__prod__cant">${p.cant}</p>
        <p class="cartshop__prod__price">${p.precio*p.cant}</p>`;
        /* cartshop.append(div2); */
        cartshopcontent.append(div2);
    })
    borrarproductos();
    total();
}

function total(){
    const totalcart = cartlist.reduce((acc,prod) => acc + (prod.cant * prod.precio),0);
    pricetotal.innerText = totalcart; 
}

function borrarproductos(){
    borrarprod = document.querySelectorAll(".cartshop__prod__delete");
    borrarprod.forEach(b => {
        /* console.log(b); */
        b.addEventListener("click",eliminarprod);
    });
}


function eliminarprod(p){
    let idprod = p.currentTarget.id;
    /* console.log(idprod); */
    let indextodelete = cartlist.findIndex(prod => prod.id === idprod);
    /* console.log(cartlist); */
    cartlist.splice(indextodelete,1);
    /* console.log(cartlist); */
    addtocart(cartlist);
}