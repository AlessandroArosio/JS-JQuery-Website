window.onload = init;

function init() {
    setInitialFocus();
    addPlaceholder("lastname", "e.g. Arosio");
    checkFocus();
}


function setInitialFocus() {
    document.getElementById("firstname").focus();
}

function addPlaceholder(element, message) {
    document.getElementById(element).setAttribute("placeholder", message);
}

function checkFocus() {
    document.getElementById("lastname").onfocus = function () {
        this.setAttribute("placeholder", "");
    };
    document.getElementById("lastname").onblur = function () {
        this.setAttribute("placeholder", "e.g. Arosio");
    };
}