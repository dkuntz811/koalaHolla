console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object

  //get user input for new koala
    var objectToSend = {
      name: $('#nameIn').val(),
      sex: $('#sexIn').val(),
      age: $('#ageIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
  
$('#editKoala').on('click',function(){
  var objectToSend = {
    name: $('#nameEditIn').val(),
    sex: $('#sexEditIn').val(),
    age: $('#ageEditIn').val(),
    readyForTransfer: $('#readyForTransferEditIn').val(),
    notes: $('#notesEditIn').val()
  };//end objectToSend editKoala
editKoala(objectToSend);
});
}); // end doc ready

var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      var outputDiv = $('#viewKoalas');
      outputDiv.empty();

      outputDiv.append('<ul>');
      for (var i = 0; i < data.length; i++) {
         outputDiv.append('<li>' + data[i].name +' '+ data[i].sex + ' ' + data[i].age + ' ' + data[i].ready_transfer + ' '+ data[i].notes + '<li>');
      }
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each

}; // end getKoalas

var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/addKoala',
    type: 'post',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
    } // end success
  }); //end ajax
};//end saveKoala function


var editKoala = function( editKoala ){
  console.log('in editKoala', editKoala);

    $.ajax({
      url: '/editKoala',
      type: 'PUT',
      data: editKoala,
      success: function(data){
        console.log('success for editKoala ', data);
      }
  });//end ajax
};//end editKoala functions
