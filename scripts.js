let displayNum = 0;
function addNumber(e) {
  displayNum *= 10;
  displayNum += parseFloat(e);
  console.log(displayNum);
}

function deleteDigit() {
  displayNum = Math.floor(displayNum / 10);
  console.log(displayNum);
}
