$(document).ready(function () {

  getJSON('s1_pub_health');

});
//asdf

/* assumes filename being passed does not include the file type */
function getJSON (filename) {

  var path = 'data/' + filename + '.json';
  var results = '';
  var instance = [];

  $.getJSON(path, function (data) {

    $.each( data, function( key, course ) {

      var row = '<tr>';

      instance = course.classInstance;

      for (var i=0; i<instance.length; i++){

        row += '<td>' + course.deptAbbrev + '</td>'
         + '<td>' + course.number + '</td>'
         + '<td>' + course.title + '</td>'
         + '<td>' + instance[i].instructor + '</td>'
         + '<td>' + instance[i].time + '</td>'
         + '<td>' + instance[i].location.room + ' <a href="">' + instance[i].location.building + '</a></td>'
         + '<td>' + course.credit + '</td>'
         + '<td>' + instance[i].ccn + '</td>'
         + '<td>' + 'badges' + '</td>'
         + '<td>' + 'save button' + '</td>'
         + '</tr>';
      }

      row += '</tr>';
      results = row + results;
    });


  $('#results tbody').append(results);

  });


}

