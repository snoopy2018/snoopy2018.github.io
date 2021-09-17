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

    if (hasClass(btn, "overlay-button-show")) {
        var reg = new RegExp('(\\s|^)' + "overlay-button-show" + '(\\s|$)');
        btn.className = btn.className.replace(reg, 'button-minus ');
    } else if (hasClass(btn, "button-minus")) {
        var reg = new RegExp('(\\s|^)' + "button-minus" + '(\\s|$)');
        btn.className = btn.className.replace(reg, ' overlay-button-show ');
    } else {
        console.log("Warning: neither class 'overlay-button-show' nor 'button-minus'  found");
    }

    /* This code snippet works also. */
    // if (btn.className.indexOf("overlay-button-show") == -1) {
    //     var reg = new RegExp('(\\s|^)' + "button-minus" + '(\\s|$)');
    //     btn.className = btn.className.replace(reg, ' overlay-button-show ');
    // } else {
    //     var reg = new RegExp('(\\s|^)' + "overlay-button-show" + '(\\s|$)');
    //     btn.className = btn.className.replace(reg, ' button-minus ');
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

// USE OF body-scroll-lock (lib/bodyScrollLock.js)
// 1. Import the functions
// const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

// / 3. ...in some event handler after showing the target element...disable body scroll
// disableBodyScroll(targetElement);
//
// // 4. ...in some event handler after hiding the target element...
// enableBodyScroll(targetElement);

// 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
// Specifically, the target element is the one we would like to allow scroll on (NOT a parent of that element).
// This is also the element to apply the CSS '-webkit-overflow-scrolling: touch;' if desired.


var previousBodyPositionSetting = void 0; // JE 06Sep21-1655
var previousScrollYPosition = 0; // JE 06Sep21-1655

function overlayOn(section) {
   /* The integer value 'section' determines which ID or Sector gets finally evaluated. */
   const overlayID = "overlay-" + section.toString();
   const overlayCanvasContainerSelector = "#overlay-canvas-container-" +  section.toString();

   // document.body.style.overflow = 'scroll';
   // console.log("in overlayOn:"); // JE 05Sep21
   // console.log("in overlayOn: document.body.style.overflow = " + document.body.style.overflow); // JE 05Sep21

   previousBodyPositionSetting = document.body.style.position; // JE 06Sep21-1655
   previousScrollYPosition = scrollY; // JE 06Sep21-1655

   // console.log("in overlayOn: current scroll position y= " + window.scrollY + "px"); // JE 05Sep21

  document.getElementById(overlayID).style.display = "block";

  // For some reason body-scroll-lock seem to scroll to #home (top position y=0) whenever it starts. This hack fixes that anoying feature. 31Aug2021
  // FIXED on 04Sep21 (see comment in overlayOff)
  // scrollPosition = window.pageYOffset;
  // console.log("scrollPosition (overlayOn): " + scrollPosition + "px");

  // Use of body-scroll-lock (lib/bodyScrollLock.js). It seems to work on iOS. August 31, 2021.-
  //const targetElement = document.querySelector('#overlay-container'); /* JE 07Sep21-0655 TEST */
  const targetElement = document.querySelector(overlayCanvasContainerSelector); /* JE 07Sep21-0655 TEST */
  // console.log("in overlayOn: targetElement ID: " + targetElement.id);

  disableBodyScroll(targetElement);

  // Reset scroll position to zero of targetElement (i.e. overlay-container)
  // console.log("in overlayOn: Reset scroll position to zero of targetElement = " + targetElement);
  targetElement.scrollTop = 0;

  // console.log("document.body.scrollTop) (after disableBodyScroll): " + document.body.scrollTop); // JE
}

function overlayOff(section) {
    /* The integer value 'section' determines which ID or Sector gets finally evaluated. */
    const overlayID = "overlay-" + section.toString();
    const overlayCanvasContainerSelector = "#overlay-canvas-container-" +  section.toString();

    document.getElementById(overlayID).style.display = "none";

    // Use of body-scroll-lock (lib/bodyScrollLock.js). It seems to work on iOS. August 31, 2021.-
    const targetElement = document.querySelector(overlayCanvasContainerSelector); /* JE 07Sep21-0655 TEST */
    // console.log("in overlayOff: targetElement ID: " + targetElement.id);


    enableBodyScroll(targetElement);

    // This code snippet scrolls the content to the position where it was
    // when the body-scroll-lock procedure started.
    if (previousBodyPositionSetting !== undefined) {
        // console.log("in overlayOff: restore body-position setting and window scroll position ");
        document.body.style.position = previousBodyPositionSetting;
         // console.log("in overlayOff: document.body.style.top = " + document.body.style.top);
        // console.log("in overlayOff: previousScrollYPosition = " + previousScrollYPosition);
        window.scrollTo(0, previousScrollYPosition);
         // console.log("in overlayOff: AFTER document.body.style.top = " + document.body.style.top); // JE 06Sep21-1655
    }
    // console.log("document.body.scrollTop) (after enableBodyScroll): " + document.body.scrollTop); // JE
}


function overlayContainerClicked(section) {
    // console.log("in overlayContainerClicked(section): section = " + section);

    /* The integer value 'section' determines which ID gets finally evaluated. */
    const overlayID = "overlay-" + section.toString();
    const overlayContainerID = "overlay-container-" + section.toString();
    const overlayCanvasContainerID = "overlay-canvas-container-" + section.toString();

    if (document.getElementById(overlayID).style.display === 'none') {
        // console.log("in overlayContainerClicked(): overlay is NOT visible. Nothing to do here, return now.");
        return;
    }

    var targetID = event.target.id;
    if (targetID === "") {
        targetID = "undefined element";
    }
    // console.log("in overlayContainerClicked(): target id: " + targetID);
    if(targetID === overlayContainerID || targetID === overlayCanvasContainerID ){
        // console.log("in overlayContainerClicked(): clicked on '" + targetID + "'. Will close overlay now!");
        overlayOff(section);
    } else {
        // console.log("in overlayContainerClicked(): clicked on '" + targetID + "'. Nothing to do here, return now.");
    }
}

// BEGIN ------>  FOR TEST only (checkIdentity) -------------------
function checkIdentity() {
    if (document.getElementById("overlay-1").style.display === 'none') {
        console.log("in checkIdentity(): " + identifier + " not visible. Nothing to do here, return now");
        return;
    }

    var targetID = event.target.id;
    var targetClassName = event.target.className;

    console.log("in checkIdentity(): document.getElementById('overlay-1').style.display: " + document.getElementById("overlay-1").style.display);

    console.log("in checkIdentity(): target id: " + targetID);
    console.log("in checkIdentity(): target className: " + targetClassName);
}
// <--------- END
