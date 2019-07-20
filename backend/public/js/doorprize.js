

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
 });
});
