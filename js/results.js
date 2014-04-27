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

      if (instance.length === 0) {
        row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
         + '<td class="courseNum">' + course.number + '</td>'
         + '<td class="courseTitle">' + course.title + '</td>'
         + '<td colspan="3" class="notOfferedTD"> ---- Not offered this semester. ---- </td>'
         + '<td class="courseUnits">' + course.credit + '</td>'
         + '<td class="notOfferedTD"> N/A </td>'
         + '<td class="badges">' + 'badges' + '</td>'
         + '<td class="save"> <input type="checkbox"> </td>'
         + '</tr>';
      }

      for (var i=0; i<instance.length; i++){

        row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
         + '<td class="courseNum">' + course.number + '</td>'
         + '<td class="courseTitle">' + course.title + '</td>'
         + '<td class="instanceInstructor">' + instance[i].instructor + '</td>'
         + '<td class="instanceTime">' + instance[i].time + '</td>'
         + '<td class="instancePlace">' + instance[i].location.room + ' <a href="http://www.berkeley.edu/map/googlemap/?' + instance[i].location.building.toLowerCase() + '" target="new">'
                                              + instance[i].location.building + '</a></td>'
         + '<td class="courseUnits">' + course.credit + '</td>'
         + '<td class="instanceCCN">' + instance[i].ccn + '</td>'
         + '<td class="badges">' + 'badges' + '</td>'
         + '<td class="save"> <input type="checkbox"> </td>'
         + '</tr>';
      }

      row += '</tr>';
      results = row + results;
    });


  $('#results tbody').append(results);

  });


}

