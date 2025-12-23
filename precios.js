
const SHEET_ID = '1Gsxf5ca6QPYnoLMhr0WlYRQmXaVvKK6O6SLfYY_hLwI'; 
const SHEET_NAME = 'Hoja1';
const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;


let products = {
    
    'super17-simple': { name: 'Super 17', price: 0 },
    'cheddar-stack-simple': { name: 'Cheddar Stack', price: 0 },
    'clasica-simple': { name: 'Clásica', price: 0 },
    'americana-simple': { name: 'Americana', price: 0 },
    
    
    'super17-doble': { name: 'Super 17', price: 0 },
    'cheddar-stack-doble': { name: 'Cheddar Stack', price: 0 },
    'clasica-doble': { name: 'Clásica', price: 0 },
    'americana-doble': { name: 'Americana', price: 0 },
    
    
    'chicken-burger': { name: 'Chicken Burger', price: 0 },
    
    
    'nuggets-14': { name: 'Nuggets x14', price: 0 },
    'alitas-kentucky': { name: 'Alitas Kentucky x7', price: 0 },
    
    
    'pepsi': { name: 'Pepsi 354ml', price: 0 },
    'seven-up': { name: 'Seven Up 354ml', price: 0 },
    
    
    'sundae': { name: 'Sundae', price: 0 }
};

let preciosCargados = false;


async function loadPrices() {
    try {
        const response = await fetch(FULL_URL);
        const text = await response.text();
        const data = JSON.parse(text.substr(47).slice(0, -2));
        const rows = data.table.rows;

        rows.forEach(row => {
            const id = row.c[0]?.v; 
            const precio = row.c[1]?.v; 
            
            if (id && precio && products[id]) {
                products[id].price = precio;
                
                
                const priceElements = document.querySelectorAll(`[data-id="${id}"] .product-price, [data-id="${id}"] .item-price`);
                priceElements.forEach(el => {
                    el.textContent = `$${precio.toLocaleString('es-AR')}`;
                });
            }
        });

        preciosCargados = true;
        console.log("✅ Precios actualizados desde la nube");

        
        if (typeof updateAllPrices === 'function') {
            updateAllPrices();
        }
        
       
        if (typeof updateCart === 'function') {
            updateCart();
        }

    } catch (error) {
        console.error("❌ Error cargando precios:", error);
        alert("No se pudieron cargar los precios. Por favor, recarga la página.");
    }
}

window.addEventListener('DOMContentLoaded', loadPrices);


function verificarPreciosCargados() {
    if (!preciosCargados) {
        alert("⏳ Espera un momento, los precios se están cargando...");
        return false;
    }
    return true;
}