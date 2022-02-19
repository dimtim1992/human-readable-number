module.exports = function toReadable (number) {
  const unit = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const decade = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const scale = ['', '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion'];
  let scaleDiv = [];
  let numStr = number.toString();
  let result;
  
  if(number === 0) {
    return 'zero';
  }
  
  
  
  while(numStr.length > 0) {
    if(numStr.length <= 3) {
      scaleDiv.push(numStr.substring(0));
      break;
    } else {
      scaleDiv.push(numStr.substring(numStr.length - 3));
      numStr = numStr.substring(0, numStr.length - 3); 
    }  
  }
  
  scaleDiv.reverse();
  
  result = scaleDiv.reduce((sum, item, ind) => {
    if(item.length === 3) {
      
      if(Number(item[0]) > 0) {
        sum += ` ${unit[Number(item[0])]} hundred`;
      }
      
      if(Number(item[1]) > 1) {
        sum += ` ${decade[Number(item[1])]}`;
      } else if (Number(item[1]) === 1) {
        sum += ` ${unit[Number(item[1] + item[2])]}`;
      }
      
      if(Number(item[1]) > 1 || Number(item[1]) === 0 && Number(item[2]) !== 0) {
        sum += ` ${unit[Number(item[2])]}`;
      }
      
    } else if (item.length === 2) {
      if(Number(item[0]) > 1) {
        sum += ` ${decade[Number(item[0])]}`;
      } else if(Number(item[0]) === 1) {
        sum += ` ${unit[Number(item[0] + item[1])]}`;
      }
      
      if(Number(item[0]) > 1 || Number(item[0]) === 0) {
        sum += ` ${unit[Number(item[1])]}`;
      } 
    } else if (item.length === 1) {
      sum += ` ${unit[Number(item[0])]}`;
    }
    
    if(Number(item) > 1 && scaleDiv.length - ind > 2) {
      sum += ` ${scale[scaleDiv.length - ind]}s`;
      return sum;
    } else if ((Number(item) === 1 && scaleDiv.length - ind > 2) || scaleDiv.length - ind > 1) {
      sum += ` ${scale[scaleDiv.length - ind]}`;
      return sum;
    }
    
    return sum;
  }, ''); 
  
  if (result[0] === ' ') {
    result = result.substring(1);
  }
  
  if (result[result.length - 1] === ' ') {
    result = result.substring(0, result.length - 1);
  }
  
  return result;
}
