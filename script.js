document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const cartMenu = document.getElementById('cart-menu');
    const cartSection = document.getElementById('cart-section');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    // Saludo basado en la hora
    const greetingElement = document.getElementById('greeting');
    const dateTimeElement = document.getElementById('date-time');

    const date = new Date();
    const hours = date.getHours();
    let greeting;

    if (hours < 12) {
        greeting = "¡Buenos Días!";
    } else if (hours < 18) {
        greeting = "¡Buenas Tardes!";
    } else {
        greeting = "¡Buenas Noches!";
    }

    greetingElement.textContent = greeting;
    dateTimeElement.textContent = `Fecha y hora: ${date.toLocaleString()}`;

    // Mostrar y ocultar carrito
    cartMenu.addEventListener('click', function (e) {
        e.preventDefault();
        cartSection.style.display = cartSection.style.display === 'none' || cartSection.style.display === '' ? 'flex' : 'none';
    });

    document.getElementById('close-cart-btn').addEventListener('click', function () {
        cartSection.style.display = 'none';
    });

    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.parentElement.getAttribute('data-product');
            const productPrice = parseInt(this.parentElement.getAttribute('data-price'));

            const productIndex = cart.findIndex(item => item.name === productName);
            if (productIndex === -1) {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            } else {
                cart[productIndex].quantity += 1;
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>${item.name}</div>
                <div>$${item.price} COP</div>
                <div>
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;
            cartItemsElement.appendChild(cartItem);
        });

        cartTotalElement.textContent = `Total: $${total} COP`;
        cartCountElement.textContent = `(${cart.length})`;
    }

    window.changeQuantity = function (index, delta) {
        if (cart[index].quantity + delta > 0) {
            cart[index].quantity += delta;
        }
        updateCart();
    };

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    document.getElementById('checkout-btn').addEventListener('click', function () {
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        let message = 'Hola, quiero hacer un pedido:\n\n';
        cart.forEach(item => {
            message += `${item.quantity} x ${item.name} - $${item.price * item.quantity} COP\n`;
        });

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        message += `\nTotal: $${total} COP`;

        const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Configuración del botón de WhatsApp flotante
    const whatsappFloat = document.getElementById('whatsapp-float');
    whatsappFloat.href = `https://wa.me/573001234567?text=Hola, estoy interesado en crear una tienda online similar a la que vi.`;
});
