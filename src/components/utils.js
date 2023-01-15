export const displayFunc = (str, func) => {
  func((currText) => {
    if (
      (currText[0] && currText[0] === "=" && /[0-9]/.test(str)) ||
      currText[1] === "error"
    ) {
      return [str];
    } else {
      return [...currText.filter((item) => item !== "="), str];
    }
  });
};

export const deleteLeft = (func) => {
  func((currText) => {
    return currText.slice(0, -1).filter((item) => item !== "=");
  });
};

export const calculateFunc = (func) => {
  func((currText) => {
    const digit = /[0-9]/;
    const strayStuff = /\)[0-9]+\)/g
    const moreStrayStuff = /[0-9]+&/g
    let formattedStr = currText
      .map((item, index) => {
        switch (item) {
          case "=":
            return "";
          case "^2":
            return "**2";
          case "^":
            return "**";
          case "%":
            return "/100";
          case 'mod':
            return "%";
          case "pi":
            if (digit.test(currText[index - 1])) {
              return "*" + Math.PI;
            } else if (digit.test(currText[index + 1])){
              return Math.PI + '*'
            } else 
              return Math.PI
          case "(":
            if (digit.test(currText[index - 1])) {
              return "*(";
            } else {
              return "(";
            }
          case ")":
            if (digit.test(currText[index + 1])) {
              return ")*";
            } else {
              return ")";
            }
          case "√(":
            if (digit.test(currText[index - 1])) {
              return "*Math.sqrt(";
            } else {
              return "Math.sqrt(";
            }
          case "cos(":
            return result
          case "sin(":
          case "tan(":
          case "cosh(":
          case "sinh(":
          case "tanh(":
            if (digit.test(currText[index - 1])) {
              return `*Math.${item}`
            } else {
              return `Math.${item}`
            }
            
          case "ln(":
            if (digit.test(currText[index-1])) {
              return '*Math.log('
            } else {
              return 'Math.log('
            }
          case "log(":
            const closeParen = findClosingParenthesis(currText, index, 1)
            const thingToLog = [...currText.slice(index + 1, closeParen)].join('')
            if (digit.test(currText[index - 1])) {
              return `*(Math.log(${thingToLog}) / Math.log(10)`    
            } else {
              return `(Math.log(${thingToLog}) / Math.log(10)`    
            }
          case "!":
            if (digit.test(currText[index-1])) {
              return `&${factorial(currText[index-1])}`
            } else {
              return item
            }
          case "e":
            if (digit.test(currText[index-1])) {
              return '*2.7182818284590452353'
            } else {
              return '2.7182818284590452353'
            }
          default:
            return item;
        }
      })
      .join("")
      
      const removals = [...formattedStr.matchAll(strayStuff)]
      removals.forEach((removal) => {formattedStr = formattedStr.replace(removal, '))')})

      const moreRemovals = [...formattedStr.matchAll(moreStrayStuff)]
      moreRemovals.forEach((removal) => {formattedStr = formattedStr.replace(removal, '')})

      formattedStr = formattedStr.replaceAll(')(', ')*(')
      console.log(formattedStr + '<< string to evaluate')
      let result;
    try {
      result = eval(formattedStr);
    } catch (err) {
      result = "error";
    }
    const roundedResult = Math.round(result * 100000) / 100000
    console.log(Math.round(result))
    return ["=", roundedResult];
  });
};

const findClosingParenthesis = (str, index, n) => {
  let depth = 1
  const openRegex = /[(]/g;
 
  const openIndexes = []
  
  while (openRegex.exec(str) !== null) {
    openIndexes.push(openRegex.lastIndex)
  }
  
  for (let i = index; i < str.length; i++) {
    switch(str[i]) {
      case '(':
        depth++
        break;
      case ')':
        if (--depth === 0) return i 
        break; 
      default:
        
    }
  }
  return -1
};

const factorial = (n) => {
  if (n !== 1) return n * factorial(n - 1);
return 1;
}