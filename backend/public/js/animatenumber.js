(function($){

  $.fn.shuffleLetters = function(prop){

      var options = $.extend({
          "step"      : 10,           // How many times should the letters be changed
          "fps"       : 10,           // Frames Per Second
          "text"      : "",           // Use this text instead of the contents
          "callback"  : function(){},  // Run once the animation is complete
          "run"       : true
      },prop)

      return this.each(function(){

          var el = $(this),
              str = "";
          if(el.data('animated')){
            console.log('animated1')
            return true;
          }
          el.data('animated',true);
          if(options.text) {
            str = options.text.split('');
          }
          else {
            str = el.text().split('');
          }

          var types = [],
            letters = [];
          for(var i=0;i<str.length;i++){
            var ch = str[i];
            types[i] = 'number';
            letters.push(i);
          }          

          (function shuffle(start){
            var i,
                len = letters.length, 
                strCopy = str.slice(0); 
            if(el.data('animated') === false){
              return false;
            }
            if(start>len){
              el.data('animated',false);
              options.callback(el);
              return;
            }
            for(i=Math.max(start,0); i < len; i++){
              let rndindex = Math.floor(Math.random() * (+10 - +0)) + +0;
              strCopy[letters[i]] = rndindex;
            }
            el.text(strCopy.join(""));
            setTimeout(function(){
              shuffle(start+1);
            },1000/options.fps);
          })(-options.step);
      });
  };
  
})(jQuery);

const loop = (obj) => {
  console.log(obj);
  obj.shuffleLetters({callback:loop});
}

const stoploop = (indexnumber) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let selecteddetails = '#details-' + indexnumber;
  $(selectedregnum).data('animated', false);
  $(selectedregnum).text($(selectedregnum).data('regnumber'));
  let details = "<strong>" + $(selecteddetails).data('shopname') + "</strong><br />-" +
                "<br />" + $(selecteddetails).data('name') + "</strong><br />-" +
                "<br />" + $(selecteddetails).data('city');
  $(selecteddetails).html(details);  
}

$(document).ready(function() {
  let loopindex = 0;
  let prizeindex = 0;
  let selectedregnum = '';
  let selecteddetails = '';

  $('body').keyup(function(e){
    if(e.keyCode == 32){
      if (loopindex % 2 === 0){
        selectedregnum = '#regnum-'+prizeindex;
        console.log(selectedregnum);
        $(selectedregnum).text("0000");
        loop($(selectedregnum));

      } else {
        console.log(selectedregnum);
        stoploop(prizeindex)
        prizeindex++;
      }
      loopindex++;
    }

    // if(e.keyCode == 49){
    //   console.log('press 1');
    //   $('#container').data('animated', false);
    //   $('#container').text('9999');
    // }
 });
});
