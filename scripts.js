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
      break;
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
    break;
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

  let left = findNum(opInd, "left");
  let right = findNum(opInd, "right");
  console.log(left, right);

  // Need to remove start to finish of substring and replace with the result.
  // Build the new string!
  let newString = "";
  newString += displayString.slice(0, left.leftP);
  // console.log(newString);

  // Add evaluated bit
  let leftNum = parseFloat(left.num);
  let rightNum = parseFloat(right.num);
  let result = 0;
  if (operator === "^") {
    result = Math.pow(leftNum, rightNum);
  } else if (operator === "×") {
    result = leftNum * rightNum;
    newString += String(result);
  } else if (operator === "÷") {
    result = leftNum / rightNum;
    newString += String(result);
  } else if (operator === "+") {
    result = leftNum + rightNum;
    newString += String(result);
  } else {
    result = leftNum - rightNum;
    newString += String(result);
  }

  // Add rest of displayString
  newString += displayString.slice(right.rightP);
  console.log(newString);
}

function findNum(index, direction) {
  let strLen = displayString.length;
  var leftP, rightP, num;
  if (direction === "right") {
    leftP = index + 1;
    rightP = leftP;
    while (
      rightP < strLen &&
      (displayString[rightP] !== "+" ||
        displayString[rightP] !== "-" ||
        displayString[rightP] !== "×" ||
        displayString[rightP] !== "÷")
    ) {
      ++rightP;
    }
    num = displayString.slice(leftP, rightP);
    return { num, rightP };
  } else if (direction === "left") {
    leftP = index - 1;
    rightP = index;
    while (
      leftP > 0 &&
      (displayString[leftP] !== "+" ||
        displayString[leftP] !== "-" ||
        displayString[leftP] !== "×" ||
        displayString[leftP] !== "÷")
    ) {
      --leftP;
    }
    num = displayString.slice(leftP, rightP);
    return { num, leftP };
  }
}

function hasOperator(operator) {
  let strLen = displayString.length;
  for (let i = 0; i < strLen; ++i) {
    if (displayString[i] === operator) return true;
  }
  return false;
}
