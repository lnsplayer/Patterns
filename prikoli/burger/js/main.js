/*-----переменные-----------------------------------------------*/

const burger = document.getElementById("burger"),
    header = document.querySelector("header");

/*-----функции-----------------------------------------------*/

document.addEventListener("DOMContentLoaded", function() {
    burger.addEventListener("click", function() {
        header.classList.toggle("open")
    })
})