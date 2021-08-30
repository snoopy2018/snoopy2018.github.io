// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
// Disabled 'animated navbar on scroll'. State of mind on August 12, 2021
// window.onscroll = function() {myFunction()};
// function myFunction() {
//     var navbar = document.getElementById("myNavbar");
//     if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//         navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
//     } else {
//         navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
//     }
// }

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Used for '+ / -' button

function changeClass(btn, cls) {
        if(!hasClass(btn, cls)) {
            addClass(btn, cls);
        }
    }

// ----- togglePlusMinus   -------
// Source and inspired by "How can I change an element's class with JavaScript?"
// https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

// function addClass(ele, cls) {
//     if (!hasClass(ele, cls))
//         ele.className += " " + cls;
// }

// function removeClass(ele, cls) {
//     if (hasClass(ele, cls)) {
//         var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
//         ele.className = ele.className.replace(reg, ' ');
//     }
// }

function togglePlusMinus(btn, article) {
    // console.log("before:" + btn.className);

    if (hasClass(btn, "btn-plus")) {
        var reg = new RegExp('(\\s|^)' + "btn-plus" + '(\\s|$)');
        btn.className = btn.className.replace(reg, ' btn-minus ');
    } else if (hasClass(btn, "btn-minus")) {
        var reg = new RegExp('(\\s|^)' + "btn-minus" + '(\\s|$)');
        btn.className = btn.className.replace(reg, ' btn-plus ');
    } else {
        console.log("Warning: neither class 'btn-plus' nor 'btn-minus'  found");
    }

    /* This code snippet works also. */
    // if (btn.className.indexOf("btn-plus") == -1) {
    //     var reg = new RegExp('(\\s|^)' + "btn-minus" + '(\\s|$)');
    //     btn.className = btn.className.replace(reg, ' btn-plus ');
    // } else {
    //     var reg = new RegExp('(\\s|^)' + "btn-plus" + '(\\s|$)');
    //     btn.className = btn.className.replace(reg, ' btn-minus ');
    // }

    // console.log("after:" + btn.className);

    // Java Script Debugger
    // console.log(article); // print value of article on console
    var dots;
    var moreText;

    switch (article) {
        case 1:
            dots = document.getElementById("dots-1");
            moreText = document.getElementById("more-1");
            break;
        case 2:
            dots = document.getElementById("dots-2");
            moreText = document.getElementById("more-2");
            break;
        case 3:
            dots = document.getElementById("dots-3");
            moreText = document.getElementById("more-3");
            break;
        case 4:
            dots = document.getElementById("dots-4");
            moreText = document.getElementById("more-4");
            break;
        case 5:
            dots = document.getElementById("dots-5");
            moreText = document.getElementById("more-5");
            break;
        default:
            // Leave default
            break;
    }

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        /* btnText.innerHTML = ""; /* "Mehr lesen"; */
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        /* btnText.innerHTML = ""; /*"Weniger lesen"; */
        moreText.style.display = "inline";
    }

}
