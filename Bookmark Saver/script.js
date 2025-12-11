const inputAddBookMark = document.querySelector(".inputAddBookMark");
const inputAddUrl = document.querySelector(".inputAddUrl");
const btnAdd = document.querySelector(".btnAdd");
const listBookMarksUl = document.querySelector(".bookmark-saver__items");
let arrBookmarks = [];

document.addEventListener("DOMContentLoaded", function () {
    const savedBookMarks = JSON.parse(localStorage.getItem("allbookMarks")) || [];
    arrBookmarks = savedBookMarks;
    savedBookMarks.forEach(bookMark => {
        renderBookMark(bookMark);
    });
});

btnAdd.addEventListener("click",function(){

    const bookmarkValue = inputAddBookMark.value.trim();
    const urlValue = inputAddUrl.value.trim();
    if(bookmarkValue.length === 0 || urlValue.length === 0){
        alert("Both fields must have a value");
        return;
    }

    if(!isValidHttpUrl(inputAddUrl.value.trim())){
        alert("Invalid URL");
        return;
    }

    addBookMark(bookmarkValue, urlValue);


});

function isValidHttpUrl(urlString) {
    try {
        const url = new URL(urlString);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}

function renderBookMark(bookmark) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const btn = document.createElement("button");

    li.classList.add("bookmark-saver__item");
    li.setAttribute("data-id", bookmark.id);

    a.classList.add("bookmark-saver__link");
    a.textContent = bookmark.name;
    a.href = bookmark.urlValue;

    btn.classList.add("bookmark-saver__remove-btn");
    btn.textContent = "Remove";
    btn.addEventListener("click", (e) => deleteBookMark(e));

    li.appendChild(a);
    li.appendChild(btn);
    listBookMarksUl.appendChild(li);
}

function addBookMark(name, urlValue) {
    const idValue = Math.random().toString(16).slice(2);

    const newBookmark = {
        id: idValue,
        name,
        urlValue
    };

    arrBookmarks.push(newBookmark);
    localStorage.setItem("allbookMarks", JSON.stringify(arrBookmarks));

    renderBookMark(newBookmark);

    inputAddBookMark.value = "";
    inputAddUrl.value = "";
    inputAddBookMark.focus();
}

function deleteBookMark(e){
    const liToDelete = e.target.parentElement;
    const idToDelete = liToDelete.getAttribute("data-id");
    arrBookmarks = arrBookmarks.filter(p=>p.id !== idToDelete);
    localStorage.setItem("allbookMarks", JSON.stringify(arrBookmarks));
    liToDelete.remove();
}