import { cart } from '../data/cart.js';
import {products} from '../data/phonesdata.js'
import {cartSummery} from './orderSummery.js';


function pobulateTemsoOnThePage(){
  let productsInnerHTML=` ` ;

  products.forEach((product)=>{

    productsInnerHTML+=
    `
      <div class="draw-container-flex-column">
      <div class="price-value-container">
        <div class="price-container">
          <span class="price-value-tex">Price:</span>
          <span class="price-item-count">$${product.productInfo.productValue/100}</span>
        </div>
      </div>
      <div class="product-photo-container">
        <div class="image-container">
          <img class="product-image" src="${product.image}">
        </div>
        
      </div>
      <div class="produc-description-container">
          <div class="produc-description-flex">
            <div>
            Model: ${product.productInfo.version}
            </div>
           
          </div>

      </div>
      <div>
        <button class="buy-ticket-button js-addButton" data-id="${product.id}">Add To Cart</button>
      </div>


    

  </div>
    
    
    ` 

  });
  document.querySelector('.js-main-container-flex').querySelector('.products-container').innerHTML=productsInnerHTML;

}
pobulateTemsoOnThePage();

export function addToCartVersion2(productId){
  
  let productFound=products.find(product=>product.id===productId);
 
  let matchingItem=cart.find(cartItem=>cartItem.productId===productId);
 
  console.log( matchingItem);
  if(cart[0].productId){
    console.log('cart has valıid objects');
  }

  if(!matchingItem){
   
    if(cart[0].productId==='' && cart.length>=1 ){
     
      //cart has default item, replace it it
   
      cart[0]={productId:productFound.id,
          productName:productFound.name,
          productPrice:productFound.productInfo.productValue/100,
          totalProducts:1,
          totalCost:(productFound.productInfo.productValue/100)
        };
      renderOrderSummery();
      updateTotalAmount();
      savaData();

    }
    else{
      cart.push({
        productId:productFound.id,
        productName:productFound.name,
        productPrice:productFound.productInfo.productValue/100,
        totalProducts:1,
        totalCost:(productFound.productInfo.productValue/100)
      });
      savaData();
      let relatedCartItem=cart.find(cartItem=>cartItem.productId===productFound.id);
      console.log(relatedCartItem);
      cartHasItem(relatedCartItem);
      setUpincreaseOrDecreaseButtons();
      updateTotalAmount();
    }
     
  }
  else{
    console.log('MACTHİNG PRODUCT FOUND');
    matchingItem.totalProducts+=1;
    matchingItem.totalTicketCost=(matchingItem.productPrice* matchingItem.totalProducts);
    // renderOrderSummery();
    console.log(matchingItem.totalTicketCost);
    cartHasItem(matchingItem,false);
    savaData();
  }
 
 console.log(cart);
 
}
export function savaData(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
document.querySelectorAll('.js-addButton').forEach((btn)=>{
  btn.addEventListener(('click'),()=>{
    const relatedİd=btn.dataset.id; 
   
    
     addToCartVersion2(relatedİd);
   
  });
});

function renderOrderSummery(){
  let parentElement=document.querySelector('.js-order-summery');
  while (parentElement.firstChild) {
   parentElement.removeChild(parentElement.firstChild);
  }
 
  let orderSummerInnerHTML= ``;
    cart.forEach((cartItem)=>{
      
      orderSummerInnerHTML+=
      ` 
      <div class="product-info-container-flex">
      <div class="ordersummert-text">
        This is order summer
      </div>
      <div class="product-container js-product-container">
        <div class="product-info-container-grid">
          
          <div class="productName">
           ${cartItem.productName}
          </div>
          <div class="ticketPrice">
           
          </div>
          <div class="button-container">
            <button class="minus-button" data-id="${cartItem.productId}">
              -
            </button>
            <span class="ticketCount-text ${(cartItem.productName+cartItem.productId).replace(/\s/g, '')}" >1</span>
            <button class="plus-button" data-id="${cartItem.productId}">
              +
            </button>
          </div>
        </div>
      </div>
      <div class="ticket-info">
        <div class="totalTicket-container">
          <span class="totalticket-text">
            Total Products
          </span>
          <span class="ticketCount">${cartItem.totalProducts}</span>
        </div>
        <div class="totalcost-container">
          <span class="totalticket-cost-text">
           total cost
          </span>
          <span class="totaticket-cost">${cartItem.totalCost}</span>
        </div>
      </div>
      <div class="pay-button-container">
        <button class="Pay-Button">
          <a href="ordersummery.html"></a>
          Continue To Pay
        </button>
      </div>
    </div>

      `
    });
    parentElement.innerHTML=orderSummerInnerHTML;
    if(!cart[0].productId){
      
      document.querySelector('.product-info-container-grid').innerHTML='';
    }
    document.querySelector('.Pay-Button').addEventListener('click',()=>{
      window.location.href = "ordersummery.html";
      // cartSummery(cart);
      console.log(cart);
    });
    setUpincreaseOrDecreaseButtons();
    
  }




renderOrderSummery();

function cartHasItem(cartItem,shouldCreateNewItem=true){

  //if cart an item dont create new order summery only create new item 
  const innerHtml =
  `<div class="product-info-container-grid" data-id="${cartItem.id}${cartItem.name}">
    <div class="productName">
    ${cartItem.productName}
    </div>
    <div class="ticketPrice">
    
    </div>
    <div class="button-container">
      <button class="minus-button" data-id="${cartItem.productId}">
        -
      </button>
      <span class="ticketCount-text ${(cartItem.productName+cartItem.productId).replace(/\s/g, '')}">1</span>
      <button class="plus-button" data-id="${cartItem.productId}">
        +
      </button>
    </div>
    </div>
    `;

if(shouldCreateNewItem){

  
  var parentElement = document.querySelector('.js-product-container');
  parentElement.innerHTML+=innerHtml;
 
}
else{
  
  updateTotalAmount();
 
}
 
  
}
function updateTotalAmount(){
  //Updating total amount of cost and total tickts
  let totalProducts=0;
  let totalCostTest=0;
  cart.forEach((item)=>{
    totalProducts+=item.totalProducts;
    totalCostTest+=item.totalCost;
  });
  setProductCounter(totalProducts);
  document.querySelector('.ticketCount').textContent =`${totalProducts}`;
  document.querySelector('.totaticket-cost').textContent = '$'+`${totalCostTest}`;
  savaData();
  
}
export function setProductCounter(count){
  let cartProductCounter=document.querySelector('.product-count');
  cartProductCounter.innerHTML=count.toString();
}
function setUpincreaseOrDecreaseButtons(){
  document.querySelectorAll('.minus-button').forEach((btn)=>{
    btn.addEventListener('click',()=>{
      console.log('minus');
      console.log(btn.dataset.id);
      increaseOrDecreaseTickets(btn.dataset.id,false);
    });
  });
  document.querySelectorAll('.plus-button').forEach((btn)=>{
    btn.addEventListener('click',()=>{
      console.log('plus');
      console.log(btn.dataset.id);
      increaseOrDecreaseTickets(btn.dataset.id,true);
    });
  });
}
function increaseOrDecreaseTickets(id,shouldIncrease){

  if(shouldIncrease){
   
    let targetCart=cart.find((item)=>item.productId==id);
    targetCart.totalProducts+=1
    targetCart.totalCost=targetCart.totalProducts*targetCart.productPrice;
    let ticketCountText=document.querySelector(`.${(targetCart.productName+targetCart.productId).replace(/\s/g, '')}`);
   
    ticketCountText.innerHTML=targetCart.totalProducts;
    updateTotalAmount();
    
  }
  else{
    
    let targetCart=cart.find((item)=>item.productId==id);
   
    targetCart.totalProducts-= targetCart.totalProducts>0?1:0;
    targetCart.totalCost=targetCart.totalProducts*targetCart.productPrice;
    let ticketCountText=document.querySelector(`.${(targetCart.productName+targetCart.productId).replace(/\s/g, '')}`);
   
    ticketCountText.innerHTML=targetCart.totalProducts;
  
    updateTotalAmount();
    
  }

}
