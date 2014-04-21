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
    console.log('data: ' + data);

    $.each( data, function( key, course ) {

      var row = '<tr>';
      console.log('course: ' + course);
      console.log('instance: ' + course.classInstance);
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


      //add instance information
      /*
      

      for (var i = 0; i < instance.length; i++) {
        $test.append(
          '<p>' + instance[i].semester + ', on ' + instance[i].days + ' at ' + instance[i].time + '</p>' + 
          '<p>In ' + instance[i].location.room + ' ' + '<a href="">' + instance[i].location.building + '</a></p>' +
          '<p>Taught by ' + instance[i].instructor + '.</p>' +
          '<p>CCN: ' + instance[i].ccn + '</p>' +
          '<p>Max seats: ' + instance[i].seats.max + ', enrolled: ' + instance[i].seats.enrolled + ', waitlist: ' +
                             instance[i].seats.waitlist + ', available: ' + instance[i].seats.available + '</p>' +
          '<p>Final: ' + instance[i].finalGroup + '</p>'
        );
      }

*/

      row += '</tr>';

      console.log('row: ' + row);

      results = row + results;
    });


  console.log('results: ' + results);
  $('#results tbody').append(results);

  });


}



    /*
          '<p>title: ' + course.title + 
        '<p>type: ' + course.type +
        '</p><p>department: ' + course.department + 
        '</p><p>abbreviation: ' + course.deptAbbrev + ' ' + course.number + ', ' + course.credit + ' units</p>' +
        '<p>crosslist: ' + course.crossListing + '</p>' +
        '<p>desc: ' + course.description + '</p>' + 
        '<p>format: ' + course.format + '</p>' + 
        '<p>prereq: ' + course.prereq + ', coreq: ' + course.hasCoreqs + ', prereq for: ' + course.isPrereqFor + '</p>' +
        '<p>restrictions: ' + course.restrictions + ', notes: ' + course.note + '</p>' +
        '<p>offer history: ' + course.offerHist + '</p>' + 
        '<p>courseThread: ' + course.courseThread + '</p>' +
        '<p>fulfills these breadth requirements: ' + AC + ', ' + PS + ', ' + RCA + '</p>' + 
        '<p>' + BC + ' Berkeley Connect</p>');
    */

    /*

    */
