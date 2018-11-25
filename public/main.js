function openWin() {
    window.open("https://www.google.com");
}


function rearrangeLinks(link) {

    alert(link)

    var mainDIV = document.getElementById("all")
    mainDIV.childNodes.forEach((node) => {

        //node.setAttribute('hidden', 'false')
        alert(node.innerHTML)

    })
}

function myFunction(subject) {
    var mainDIV = document.getElementById("all")
    mainDIV.childNodes.forEach((node) => {
        //     //document.getElementById("myP1").style.display = "none";
        if (node.id === subject) {
            node.style.display = ""
        } else {
            node.style.display = "none"
        }
    })
}