function numberPad(num, size) {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}


$(document).ready(function() {
  var ajax_url = window.location.origin + "/api/guest/listall";
  var signin_url = window.location.origin + "/api/guest/directsignin/";

  var table = $('#tblguestlist').DataTable({
    "processing": true,
    "serverSide": false,
    ajax: ajax_url,
    "columns": [
      { "data": "name" },
      { "data": "shop_name" },
      { "data": "city" },
      { "data": "num_invited" },
      { "data": "guesttype" },
      { "data": "desknumber" },
      { "data": "Guesthistory.id", "defaultContent": "-" , "mRender": function ( data, type, full ) {
        if (!data){
          return '-';
        } else {
          let formatted_data = numberPad(data,4);
          return formatted_data;
        }
    }
    },
      { "data": "Guesthistory.createdAt", 
          "defaultContent": "-", "mRender": function ( data, type, full ) {
            if (!data){
              return '-';
            } else {
              let formatted_date = moment(data).format("YYYY-MM-DD HH:mm:ss");
              return formatted_date;
            }
        }
      },
      { "data": "Guesthistory.createdAt", "defaultContent": "-", "mRender": function ( data, type, full ) {
         if (!data ){
           return '<span class="badge badge-danger">not signed in</span>';
         } else {
           return moment(data).fromNow() + ' <span class="badge badge-success">signed in</span>';
         }
      } 
    },
    { "data": {"histcreate":"Guesthistory.createdAt", "code": "code"}, "defaultContent": "-", "mRender": function ( data, type, full ) {
        if (!data.Guesthistory ){
          return '<a class="directcheckin" href="' + signin_url + data.code + '">signin</a>';
        } else {
          return '-';
        }
     } 
    }
    ],
    "pageLength": 10,
    "order": [[ 7, "desc" ]],
    dom: 'Bfrtip',
    buttons: ['csv'],
    responsive: true,
    
  });

  table.buttons().container()
        .appendTo( '#tblguestlist_wrapper .col-md-6:eq(0)' );
  setInterval( function () {
    table.ajax.reload();
  }, 60000 );
  
  
  var url = window.location.origin + "/api/guest/countsignedin"
  $.get( url, function( data ) {
    $('#livesignedin').text(data["data"]);
  });
  setInterval(function() {
    $.get( url, function( data ) {
      $('#livesignedin').text(data["data"]);
    });
  }, 60000);

  var urlguest = window.location.origin + "/api/guest/countguest"
  $.get( urlguest, function( data ) {
    $('#liveguest').text(" / " + data["data"]);
  });
  setInterval(function() {
    $.get( urlguest, function( data ) {
      $('#liveguest').text(" / " + data["data"]);
    });
  }, 60000);


  $(document).on("click", ".directcheckin", function() {
    var clickur = $(this).attr("href");
    $.get( clickur, function( data ) {
      console.log(data);
    });
    location.reload();
    event.preventDefault();
  });

});