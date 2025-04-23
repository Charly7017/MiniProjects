
class Product{
    constructor(name, emoji, price, stock,code) {
        this.name = name;
        this.emoji = emoji;
        this.price = price;
        this.stock = stock;
        this.code = code;
    }

    static Buy(code){
        const selectedProduct = products.find(p=>p.code === code);
        if(selectedProduct === undefined){
            sweetAlertCreate("error","Oops...","Product does not exist");
            return;
        }
        if(currentBalance < selectedProduct.price){
            sweetAlertCreate("error","Oops...","Not enough money");
            return;
        }

        if(selectedProduct.stock === 0){
            sweetAlertCreate("error","Oops...","Product out of stock");
            return;
        }

        currentBalance -= selectedProduct.price;
        selectedProduct.stock--;
        balanceP.textContent =  "Current balance: $" + currentBalance;
    };
}

const products = [
    new Product("Chocolate", "🍫", 15, 10,1),
    new Product("Soda", "🥤", 20, 4,2),
    new Product("Sweets", "🍬", 10, 3,3),
    new Product("Cookies", "🍪", 12, 4,4),
    new Product("Apple", "🍎", 13, 5,5),
    new Product("Sándwich", "🥪", 25, 2,6)
];

const inputProduct = document.querySelector(".inputProduct");
const itemContainer = document.querySelector(".items");
const items = document.querySelectorAll(".item");
const balanceP = document.querySelector(".balance");
const btnPay = document.querySelector(".btnPay");

let currentBalance = Math.floor(Math.random() * (150 - 10 + 1)) + 10;
balanceP.textContent =  "Current balance: $" + currentBalance;
    

renderProducts();

btnPay.addEventListener("click",function(e){
    if(inputProduct.value === ""){
        sweetAlertCreate("error","Oops...","No product entered");
        return;
    }
    Product.Buy(parseInt(inputProduct.value));
    renderProducts(); 
});

function renderProducts(){
    itemContainer.innerHTML = ""; 

    products.forEach((p,i)=>{
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `${p.code}<br>${p.emoji}<br>$${p.price}<br>Stock: ${p.stock}`;

        if (p.stock === 0) {
            div.style.opacity = "0.5";
            div.style.pointerEvents = "none";
        }

        div.addEventListener("click", () => {
            inputProduct.value = p.code;
        });

        itemContainer.appendChild(div);
    });
}


function sweetAlertCreate(icon,title,text){
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

