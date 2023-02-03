if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}

var totalAmount = '0,00';

function ready() {

    const removeProductButtons = document.getElementsByClassName('remove-product-button');
    for (let i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener('click', removeProduct);
    }

    const quantityInputs = document.getElementsByClassName('product-qtd-input');
    for (let i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener('change', checkIfInputIsNull);
    }

    const addToCartButtons = document.getElementsByClassName('button-hover-backgronud');
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', addProductToCart);
    }

    const purchaseButton =  document.getElementsByClassName('purchase-button')[0];
    purchaseButton.addEventListener('click', makePurchase);
}

function makePurchase(){

    if(totalAmount === '0,00'){
        alert('Seu carrinho está vazio')
    }
    else{
        alert(
            `
                Agradecemos pela sua compra!
                Valor do pedido:${totalAmount}
                volte sempre :)

            `
        );
    }

    document.querySelector('.cart-table tbody').innerHTML = '';
    updateTotal();
}

function checkIfInputIsNull(event){

    if(event.target.value === '0'){
        event.target.parentElement.parentElement.remove();
    }
    updateTotal();
}




function addProductToCart(event) {

    const button = event.target;
    const productInfos = button.parentElement.parentElement;
    const productImage = productInfos.getElementsByClassName('product-image')[0].src;
    const productTitle = productInfos.getElementsByClassName('product-title')[0].innerText;
    const productPrice = productInfos.getElementsByClassName('product-price')[0].innerText;

    const productsCartName =  document.getElementsByClassName('card-product-title');
    for(let i = 0; i <  productsCartName.length; i++){

        if(productsCartName[i].innerText === productTitle){
            productsCartName[i].parentElement.parentElement.getElementsByClassName('product-qtd-input')[0].value++;
            return;
        }
    } 

    let newCartproduct = document.createElement('tr');
    newCartproduct.classList.add('card-product');

    newCartproduct.innerHTML = `
    
    <td class="product-identification">
        <img class="cart-product-image" src="${productImage}" alt="${productTitle}">
        <strong class="card-product-title">${productTitle}</strong>
    </td>
    <td>
        <span class="card-product-price">${productPrice}</span>
    </td>
    <td>
        <input class="product-qtd-input" type="number" value="1" min="0">
        <button class="remove-product-button" type="button">Remover</button>
    </td>
    `

   const tableBody = document.querySelector('.cart-table tbody');
   tableBody.append(newCartproduct);
   updateTotal();

   newCartproduct.getElementsByClassName('product-qtd-input')[0].addEventListener('change', checkIfInputIsNull);
   newCartproduct.getElementsByClassName('remove-product-button')[0].addEventListener('click', removeProduct);
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove();
    updateTotal();
}


function updateTotal() {

    totalAmount = 0;

    const cartProducts = document.getElementsByClassName('card-product');
    for (let i = 0; i < cartProducts.length; i++) {

        const productPrice = cartProducts[i].getElementsByClassName('card-product-price')[0].innerText.replace('R$', '').replace(',', '.');
        const productQuantity = cartProducts[i].getElementsByClassName('product-qtd-input')[0].value;

        totalAmount += productPrice * productQuantity;
    }

    totalAmount = totalAmount.toFixed(2);
    totalAmount = totalAmount.replace('.', ',');
    document.querySelector('.cart-total-container span').innerText = 'R$' + totalAmount;
}
