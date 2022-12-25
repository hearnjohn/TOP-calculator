let displayString = "";
function addChar(e) {
  let strLen = displayString.length;
  // Reject operators if the last char wasn't a number
  if (e === "+" || e === "-" || e === "×" || e === "÷" || e === "^") {
    if (
      strLen === 0 ||
      displayString[strLen - 1] === "+" ||
      displayString[strLen - 1] === "-" ||
      displayString[strLen - 1] === "×" ||
      displayString[strLen - 1] === "÷" ||
      displayString[strLen - 1] === "^"
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

function processInput() {
  // Break displayString into smaller expressions, pass into operate function
  while (
    hasOperator("+") ||
    hasOperator("-") ||
    hasOperator("×") ||
    hasOperator("÷") ||
    hasOperator("^")
  ) {
    // Follow PEMDAS
    while (hasOperator("^")) {
      operate("^");
    }
    while (hasOperator("×")) {
      operate("×");
    }
    while (hasOperator("÷")) {
      operate("÷");
    }
    while (hasOperator("+")) {
      operate("+");
    }
    while (hasOperator("-")) {
      operate("-");
    }
  }
}

function operate(operator) {
  // Divide displayString into two, cutting out the numbers and operator of interest
  let strLen = displayString.length;
  let opInd = 0;

  while (opInd < strLen) {
    if (displayString[opInd] === operator) break;
    ++opInd;
  }
  if (opInd == strLen) return; // Case where there is no operator of interest present

  let leftP = opInd - 1,
    rightP = opInd + 1;

  while (
    leftP >= 0 &&
    (displayString[leftP] !== "+" ||
      displayString[leftP] !== "-" ||
      displayString[leftP] !== "×" ||
      displayString[leftP] !== "÷")
  ) {
    --leftP;
  }

  while (
    rightP < strLen &&
    (displayString[rightP] !== "+" ||
      displayString[rightP] !== "-" ||
      displayString[rightP] !== "×" ||
      displayString[rightP] !== "÷")
  ) {
    ++rightP;
  }
}

function hasOperator(operator) {
  let strLen = displayString.length;
  for (let i = 0; i < strLen; ++i) {
    if (displayString[i] === operator) return true;
  }
  return false;
}
