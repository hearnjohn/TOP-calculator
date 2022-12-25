let displayString = "";
function addChar(e) {
  let strLen = displayString.length;
  // Reject operators if the last char wasn't a number
  if (e === "+" || e === "-" || e === "×" || e === "÷") {
    if (
      strLen === 0 ||
      displayString[strLen - 1] === "+" ||
      displayString[strLen - 1] === "-" ||
      displayString[strLen - 1] === "×" ||
      displayString[strLen - 1] === "÷"
    ) {
      return;
    }
  }
  displayString += e;
  console.log(displayString);
}

function deleteChar() {
  displayString = displayString.slice(0, displayString.length - 1);
  console.log(displayString);
}

function processInput() {}

function operate(num1, num2, operator) {}
