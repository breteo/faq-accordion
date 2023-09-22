import './style.css'

let questions = document.getElementsByClassName("card-question");

let firstQuestion = questions[0];
let firstAnswer = firstQuestion.nextElementSibling;

for (let i = 0; i < questions.length; i++) {
  questions[i].onclick = function () {
    var isActive = this.classList.contains("active");
    // Rotate arrow icon
    let arrow = this.getElementsByClassName('arrow')[0]

    // Close all accordions
    let allArrows = document.getElementsByClassName('arrow')
    for (let j = 0; j < questions.length; j++) {
      // Remove active class from section header
      questions[j].classList.remove("active");
      allArrows[j].classList.remove('up');



      // Remove the max-height class from the answer to close it
      var answer = questions[j].nextElementSibling;
      var maxHeightValue = getStyle(answer, "maxHeight");

      if (maxHeightValue !== "0px") {
        answer.style.maxHeight = null;
      }
    }

    if (isActive == true) {
      this.classList.remove('active')
      arrow.classList.remove('up')
    } else {
      this.classList.add('active')
      arrow.classList.add('up')
    }

    // Toggle the answer element
    var answer = this.nextElementSibling;
    var maxHeightValue = getStyle(answer, "maxHeight");

    if (maxHeightValue !== "0px") {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  };
}
// console.log(firstQuestion, firstAnswer, questions);


// Cross-browser way to get the computed height of a certain element. Credit to @CMS on StackOverflow (http://stackoverflow.com/a/2531934/7926565)
// Might have to learn jQuery
function getStyle(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return (function (value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}