const padDigits = function(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

const generateRandom = function(){
  let lstnum = Array.from(Array(1000).keys());
  return lstnum.map(x => padDigits(x,4));
}

const scrollnumber = function(randomnumber){
  $this.text("-");
  setTimeout(function() {
    $this.text
  }, 1000);
}

const random = (value, timeout) => {
  $this.text($this.attr('data-value'));
}

$(document).ready(function() {
  let rndnumber = generateRandom();
  let counter = 0;

  $(document).keyup(function(e) { 
    if (e.keyCode == 32) {
      counter++;
      console.log(counter);
    }
  });
});