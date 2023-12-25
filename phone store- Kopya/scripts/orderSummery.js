// import {cart} from '../data/cart.js'
import {products} from '../data/data.js'

// import {setProductCounter} from './raffleManager.js'

let cart=JSON.parse(localStorage.getItem('cart'));
document.addEventListener('DOMContentLoaded', () => {
  
  if(cart){
    console.log('cart loaded');
    
    cartSummery();
    
  }
  else{
    console.log('cart not found');
  }
  console.log(cart);
});


export function cartSummery(){
  let innerHtml='';
  let parentOrder=document.querySelector('.order-summery-main');
  console.log(parentOrder);
  let totalProducts=0;
  let totalCost=0;
  cart.forEach(element => {
    totalCost+=element.totalCost;
    totalProducts+=element.totalProducts;
    
    console.log(element.totalTicket);
   
  });
  innerHtml+= `
   <div class="order-summery-text">
    Order Summery
   </div>
  <div class="totoal-products-text">
    Total Products: ${totalProducts}
  </div>
  <div class="total-cost-text">
   TOTAL COST: $${totalCost}
  </div>
  
  `;
  const createdDiv=document.createElement('div');
  createdDiv.classList="cart-summery-container";
  createdDiv.innerHTML=innerHtml;
  parentOrder.appendChild(
    createdDiv
  );
 
  console.log(totalProducts);
  let cartProductCounter=document.querySelector('.product-count');
  cartProductCounter.innerHTML=totalProducts.toString();
}





