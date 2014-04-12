$(document).ready(function () {

  console.log('asdf');

  $.getJSON('data/test.json', function (d) {
	    console.log(d);
	  $.each( d, function( key, course ) {
	    $('#test').append('<p>title: ' + course.title + 
	    	'</p><p>department: ' + course.department + 
	    	'</p><p>abbreviation: ' + course.deptAbbrev + '</p>');
	  });
	 



  });

});