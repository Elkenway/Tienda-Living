document.addEventListener("DOMContentLoaded", function() {
    const addProductButton = document.getElementById("add-product");
    const finalizarPedidoButton = document.getElementById("finalizar-pedido");
    const addedProducts = document.getElementById("added-products");
    const runningTotal = document.getElementById("running-total");
    const confirmacionPedidoFieldset = document.getElementById("confirmacion-pedido");
    const confirmacionMensaje = document.getElementById("mensaje-confirmacion");
    const confirmacionNumeroPedido = document.getElementById("numero-pedido");
    let total = 0;
    let pedidoFinalizado = false;

    addProductButton.addEventListener("click", function() {
        console.log("Click en agregar producto");
        if (pedidoFinalizado) return; 
        const productSelect = document.querySelector('select[name="product"]');
        console.log("Producto seleccionado:", productSelect);
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        console.log("Opción seleccionada:", selectedOption);
        const productName = selectedOption.textContent;
        const productPrice = parseInt(selectedOption.value);
        const productAvailable = selectedOption.getAttribute("data-disponible") === "true";

        if (!productAvailable) {
            console.log("Este producto no está disponible.");
            return;
        }

        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <span>${productName}</span>
            <button type="button" class="remove-product">Eliminar</button>
        `;
        addedProducts.appendChild(productItem);

        total += productPrice;
        runningTotal.textContent = `Total: $${total.toFixed(2)}`;

        const removeProductButton = productItem.querySelector(".remove-product");
        removeProductButton.addEventListener("click", function() {
            if (pedidoFinalizado) return; 
            total -= productPrice;
            runningTotal.textContent = `Total: $${total.toFixed(2)}`;
            addedProducts.removeChild(productItem);
        });
    });

    finalizarPedidoButton.addEventListener("click", function() {
        console.log("Click en finalizar pedido");
        if (addedProducts.children.length === 0) {
            console.log("No has agregado ningun producto.");
            alert("No has agregado ningun producto.");
            return;
        }
        pedidoFinalizado = true;
        finalizarPedidoButton.disabled = true;
        addProductButton.disabled = true;
        const numeroPedido = generarNumeroPedido();
        confirmacionPedidoFieldset.style.display = "block";
        confirmacionMensaje.textContent = `¡Gracias por su compra! Total a pagar es: $${total.toFixed(2)}`;
        confirmacionNumeroPedido.textContent = `Su numero de pedido es: #${numeroPedido}`;
    });

    function generarNumeroPedido() {
        return Math.floor(Math.random() * 1000000);
    }
});
