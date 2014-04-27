$(document).ready(function () {

  $('#fileChange li').on('click', function() {
    var filename = $(this).text();
    getJSON(filename);
  });

});
//asdf

/* assumes filename being passed does include the file type */
function getJSON (filename) {

  var path = 'data/' + filename;
  var results = '';
  var instance = [];

  $.getJSON(path, function (data) {

    $('#resultsHeaderRow').siblings().remove();

    $.each( data, function( key, course ) {

      var row = '<tr>';

      instance = course.classInstance;

      console.log(instance);

      for (var i=0; i<instance.length; i++){

        row += '<td>' + course.deptAbbrev + '</td>'
         + '<td>' + course.number + '</td>'
         + '<td>' + course.title + '</td>'
         + '<td>' + instance[i].instructor + '</td>'
         + '<td>' + instance[i].time + '</td>'
         + '<td>' + instance[i].location.room + ' <a href="http://www.berkeley.edu/map/googlemap/?' + instance[i].location.building.toLowerCase() + '" target="new">'
                                              + instance[i].location.building + '</a></td>'
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

