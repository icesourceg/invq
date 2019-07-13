function checkLength(field) {
  console.log(field.value.length);
  //$('#scanindicator').text(field.value.length);
  if (field.value.length >= 36){
    $('#scanform').submit();
  }
}