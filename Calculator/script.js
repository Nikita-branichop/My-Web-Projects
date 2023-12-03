let reserve = 0;
let buffer = 0;
let operator;
let comma = false;
let comma_num = 0;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  switch (value) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      buffer = String(buffer);
      if (buffer === "0") {
        buffer = value;
      } else {
        buffer = buffer + value;
      }
      break;
    case "00":
      buffer = buffer + value;
      break;
    case "⌛":
      Data = new Date();
      Year = Data.getFullYear();
      Month = Data.getMonth() + 1;
      Day = Data.getDate();
      Hour = Data.getHours();
      Minutes = Data.getMinutes();
      screen.value =
        Day + "." + Month + "." + Year + " | " + Hour + ":" + Minutes;
      return;
    case "CE":
      reserve = 0;
      buffer = 0;
      operator = null;
      error = false;
      comma = false;
      break;
    case "C":
      buffer = 0;
      operator = null;
      error = false;
      comma = false;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      if (comma_num > buffer.length) {
        comma = false;
      }
      break;
    case "√x":
      buffer = Math.sqrt(buffer);
      break;
    case "%":
      buffer = buffer / 100;
      break;
    case "±":
      buffer *= -1;
      break;
    case "x2":
      buffer = buffer * buffer;
      break;
    case "=":
      buffer = parseFloat(buffer);
      if (operator === "+") {
        buffer += reserve;
      }
      if (operator === "-") {
        buffer = reserve - buffer;
      }
      if (operator === "x") {
        buffer *= reserve;
      }
      if (operator === "/") {
        if (buffer === 0) {
          screen.value = "На ноль не делится!";
          return;
        }
        buffer = reserve / buffer;
      }
      reserve = 0;
      comma = false;
      operator = null;
      break;
    case "+":
    case "-":
    case "x":
    case "/":
      buffer = parseFloat(buffer);
      if (operator != null && buffer != 0) {
        if (operator === "+") {
          buffer += reserve;
        }
        if (operator === "-") {
          buffer = reserve - buffer;
        }
        if (operator === "x") {
          buffer *= reserve;
        }
        if (operator === "/") {
          buffer = reserve / buffer;
        }
      }
      reserve = buffer;
      buffer = 0;
      operator = value;
      comma = false;
      break;
    case ".":
      if (!comma) {
        buffer = buffer + ".";
        comma_num = buffer.length;
      }
      comma = true;
      break;
  }
  screen.value = buffer;
}

document.querySelector(".buttons").addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
});
