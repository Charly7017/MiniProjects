const btnGenerate = document.querySelector(".colorPaletteContainer__btnGenerate");
const colorsSpan = document.querySelectorAll("span");
const colorPaletteCardsContainer = document.querySelector(".colorPaletteContainer__colorsContainer");

generateColors();

btnGenerate.addEventListener("click",generateColors);
colorPaletteCardsContainer.addEventListener("click",copyColor);

function copyColor(e){
    let hexColor;
    if(e.target.className === "colorPaletteContainer__card-header"){
        hexColor = e.target.nextElementSibling.firstElementChild.innerText;
        showCheck(e.target.nextElementSibling.firstElementChild.nextElementSibling);
    }
    else if(e.target.tagName === "I"){
        hexColor = e.target.previousElementSibling.innerText;
        showCheck(e.target);
    }
    navigator.clipboard.writeText(hexColor);
}

function showCheck(target){
    target.classList.remove("far","fa-copy");
    target.classList.add("fas","fa-check");

    const time = setTimeout(() => {
        target.classList.remove("fas","fa-check");
        target.classList.add("far","fa-copy");
    }, 500);

}

function generateColors(){
    colorsSpan.forEach(function (p) {
        p.innerText = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        p.parentElement.previousElementSibling.style.backgroundColor = p.innerText
    });
}


