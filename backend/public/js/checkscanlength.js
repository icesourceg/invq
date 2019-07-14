$(document).ready(function(){
  $('#qrdata').on("paste keyup", function(){
    if($(this).val().length >= 36){
      $('#scanform').submit();
      $(this).val('SCAN CODE');      
    }
  });
});