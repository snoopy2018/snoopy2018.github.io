

// -------------------------------------------------------------------------
// CLEANUP on Tue Sep 21 11:12:28 CEST 2021:
//  - Removed scripts that handle plus minus button but old layout style.
//  - Removed old functions (commented out)
//
// You find the old version of this file in the Time Machine.
// -------------------------------------------------------------------------

// BEGIN JE 22Sep21 DO I NEED THIS FUNCTION onClick()
//????????????????????????
// Modal Image Gallery
// function onClick(element) {
//   document.getElementById("img01").src = element.src;
//   document.getElementById("modal01").style.display = "block";
//   var captionText = document.getElementById("caption");
//   captionText.innerHTML = element.alt;
// }
// ????????????????????????
// END JE 22Sep21 DO I NEED THIS FUNCTION onClick()

/* -------- SIDE NAVIGATION -----------------------------

The side navigation class is adopted from w3schools
with some modifications (https://www.w3schools.com/howto/howto_js_sidenav.asp). In particular the feature that
let the sidenav disappear when user taps/clicks on the
background (not the side navigation panel) is developed
by me.

State of mind on Septmeber 23, 2021.

*/
function sidenavManager(event) {
    var insideSidenav = document.getElementById("sideNav").contains(event.target);
    if(insideSidenav) {
        // nothing to do
        // console.log("in sidenavManager(): clicked INSIDE 'sideNav' ");
    } else {
        // console.log("in sidenavManager(): clicked OUTSIDE 'sideNav' ");
        closeNav();
    }
}

function touchStartEventListener(event) {
    sidenavManager(event);
}

function clickEventListener(event) {
    sidenavManager(event);
}

function openNav() {
  document.getElementById("sideNav").style.width = "9em";
  // document.getElementById("dummy-background").style.display = "block";
  document.getElementById("sideNav-hamburger").style.display = "none"; // hide 'hamburger'
  window.addEventListener("click", clickEventListener, true); // IMPORTANT I assume, the parameter 'true' makes sure that the click for this event gets consumed; otherwise, the click event listener invokes closeNav() immediately (i.e. navbar does not show at all).
  window.addEventListener("touchstart", touchStartEventListener, true);
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
  // document.getElementById("dummy-background").style.display = "";
  document.getElementById("sideNav-hamburger").style.display = "inline-block"; // show 'hamburger'
  window.removeEventListener("click", clickEventListener, true); // see IMPORTANT comment above (without the 'true' listener seems not o be removed)
  window.removeEventListener("touchstart", touchStartEventListener, true); // see IMPORTANT comment above (without the 'true' listener seems not o be removed)
}


// document.addEventListener(
//   "touchstart",
//   function(event) {
//       console.log("Event Listener: touchstart event");
//       // touchStartHandler(event);
//       // mobileNavbarClose(event);
//   },
//   false // 'useCapture" parameter: default is false.
// )

// document.addEventListener(
//   "touchend",
//   function(event) {
//       console.log("Event Listener: touchend event);
//       touchEndHandler(event);
//   },
//   false // 'useCapture" parameter: default is false.
// )


// document.addEventListener(
//   "click",
//   function(event) {
//       console.log("Event Listener: click event");
//       // clicktHandler(event);
//       // mobileNavbarClose(event);
//   },
//   false // 'useCapture" parameter: default is false.
// )
//


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

  // JE 26Sep21-2100 animation TEST
  // Animation: transition x-property from 0% t0 100% of overlay object
  // document.getElementById(overlayID).style.width = "100%";
  // document.getElementById(overlayID).style.height = "100%";
  // document.getElementById(overlayID).style.opacity = "1";
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

    // JE 26Sep21-2100 animation TEST
   // Animation: transition x-property from 0% t0 100% of overlay object
   // document.getElementById(overlayID).style.width = "0";
   // document.getElementById(overlayID).style.height = "0";
   // document.getElementById(overlayID).style.opacity = "0";
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

    // console.log("in checkIdentity(): document.getElementById('overlay-1').style.display: " + document.getElementById("overlay-1").style.display);

    console.log("in checkIdentity(): target id: " + targetID);
    console.log("in checkIdentity(): target className: " + targetClassName);
}
// <--------- END
