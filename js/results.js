$(document).ready(function () {

  $('#fileChange li').on('click', function() {
    var filename = $(this).text();
    getJSON(filename);
  });

});

/* assumes filename being passed does include the file type */
function getJSON (filename) {

  var path = 'data/' + filename;
  var results = '';
  var instance = [];

  //facets
  /*
    Departments
    Semester
    Requirements
    Seats
    Day
    Time
    Units
    Class size
    */


  var fDepartment, fMeeting, fLevel;



  $.getJSON(path, function (data) {

    $('#resultsHeaderRow').siblings().remove();

    // initialize facet information lists
    initializeFacets();

    $.each( data, function( key, course ) {

      var row = '<tr>';

      instance = course.classInstance;

      // add to facet information lists

      //department
      console.log(course.deptAbbrev);

      //meeting type
      fMeeting[course.type]+=1;

      //fLevel
      var courseNumber = (course.number).match(/\d+/)[0]; //numbers only

      console.log(courseNumber);
      if (courseNumber < 100)
        fLevel["Lower Division"]+=1;
      else if (courseNumber >= 100 && courseNumber < 200)
        fLevel["Upper Division"]+=1;
      else if (courseNumber >= 200 && courseNumber < 300)
        fLevel["Graduate"]+=1;
      else if (courseNumber >= 300 && courseNumber < 400)
        fLevel["Professional"]+=1;
      else
        fLevel["Other"]+=1;


      if (instance.length === 0) {
        row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
         + '<td class="courseNum">' + courseNumber + '</td>'
         + '<td class="courseTitle">' + course.title + '</td>'
         + '<td colspan="3" class="notOfferedTD"> ---- Not offered this semester. ---- </td>'
         + '<td class="courseUnits">' + course.credit + '</td>'
         + '<td class="notOfferedTD"> N/A </td>'
         + '<td class="badges">' + 'badges' + '</td>'
         + '<td class="save"> <input type="checkbox"> </td>'
         + '</tr>';
      }

      else {
        for (var i=0; i<instance.length; i++){

          row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
           + '<td class="courseNum">' + courseNumber + '</td>'
           + '<td class="courseTitle">' + course.title + '</td>'
           + '<td class="instanceInstructor">' + instance[i].instructor + '</td>'
           + '<td class="instanceTime">' + instance[i].time + '</td>'
           + '<td class="instancePlace">' + instance[i].location.room + ' <a href="http://www.berkeley.edu/map/googlemap/?' 
                                          + instance[i].location.building.toLowerCase() + '" target="new">'
                                          + instance[i].location.building + '</a></td>'
           + '<td class="courseUnits">' + course.credit + '</td>'
           + '<td class="instanceCCN">' + instance[i].ccn + '</td>'
           + '<td class="badges">' + 'badges' + '</td>'
           + '<td class="save"> <input type="checkbox"> </td>'
           + '</tr>';
        }
      }

      row += '</tr>';
      results = row + results;
    });

  $('#results tbody').append(results);

  console.log(fMeeting);
  console.log(fLevel);

  // display facets

  });


function initializeFacets() {


    fMeeting = {
      "Lecture": 0,
      "Discussion": 0,
      "Lab": 0,
      "Other": 0
    };
    fLevel = {
      "Upper Division": 0,
      "Lower Division": 0,
      "Graduate": 0,
      "Professional": 0,
      "Other": 0
    };
}

}

