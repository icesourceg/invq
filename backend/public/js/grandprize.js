const stoploop = (indexnumber) => {
  let selectedregnum = '#regnum-' + indexnumber;
  let selectedshopname = '#shopname-' + indexnumber;
  let selectedname = '#name-' + indexnumber;
  let selectedcity = '#city-' + indexnumber;
  $(selectedregnum).data('animated', false);
  $(selectedregnum).text($(selectedregnum).data('value'));
  $(selectedshopname).html($(selectedshopname).data('value'));
  $(selectedname).html($(selectedname).data('value'));  
  $(selectedcity).html($(selectedcity).data('value'));  
}

$(document).ready(function() {
  let loopindex = 0;
  let prizeindex = 0;
  let selectedregnum = '';

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
 });
});
