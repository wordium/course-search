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
  var fDepartment = {}, 
      fSemester = {},
      fBreadth = {},
      fSeats = {},
      fDays = {},
      fTime = {},
      fUnits = {},
      fSize = {},
      fMeeting = {},
      fLevel = {};



  $.getJSON(path, function (data) {

    $('#resultsHeaderRow').siblings().remove();

    // initialize facet information lists
    initializeFacets();

    $.each( data, function( key, course ) {

      // intialize row. Add classes according to search parameters?
      var row = '<tr>';

      instance = course.classInstance;

      // add to facet information lists

      //department
      var dept = course.department;
      if (!fDepartment[dept])
        fDepartment[dept] = 1;
      else
        fDepartment[dept] += 1;

      //semester
      //console.log(course.offerHist);
      //QUESTION: how to handle offer history as well as current semester?


      // requirements
      if (course.breadth.AC)
        fBreadth["American Cultures"]+=1;
      if (course.breadth.AL)
        fBreadth["Arts & Literature"]+=1;
      if (course.breadth.BS)
        fBreadth["Biological Science"]+=1;
      if (course.breadth.HS)
        fBreadth["Historical Studies"]+=1;
      if (course.breadth.IS)
        fBreadth["International Studies"]+=1;
      if (course.breadth.PS)
        fBreadth["Physical Science"]+=1;
      if (course.breadth.PV)
        fBreadth["Philosophy & Values"]+=1;
      if (course.breadth.RCA)
        fBreadth["Reading & Composition A"]+=1;
      if (course.breadth.RCB)
        fBreadth["Reading & Composition B"]+=1;
      if (course.breadth.SS)
        fBreadth["Social & Behavioral Sciences"]+=1;

      // units
      fUnits[course.credit]+=1;

      //meeting type
      fMeeting[course.type]+=1;

      //fLevel
      //QUESTION: Do we want a facet that calls out Berkeley Connect or Freshman/Sophomore Seminars, 
      // or do we want another category in Levels/classifications?
      var courseNumber = (course.number).match(/\d+/)[0]; //numbers only
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
         + '<td class="courseNum">' + course.number + '</td>'
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

          // semester
          //console.log(instance[i].semester);

          row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
           + '<td class="courseNum">' + course.number + '</td>'
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

          //seats - available, waitlist, ?
          //QUESTION: how do we know if a course is or isn't accepting students on a waitlist? Are there other options?
          if (instance[i].seats.available > 0)
            fSeats["Available"]+=1;
          else
            fSeats["Waitlist"]+=1;

          // class size
          var seatsMax = instance[i].seats.max;
          if (seatsMax <= 15)
            fSize["15 and less"]+=1;
          else if (seatsMax > 15 && seatsMax <= 35)
            fSize["16-35"]+=1;
          else if (seatsMax > 35 && seatsMax <= 75)
            fSize["36-75"]+=1;
          else if (seatsMax > 75 && seatsMax <= 150)
            fSize["75-150"]+=1;
          else
            fSize["151+"]+=1;

          // days
          var days = instance[i].days;
          if (!fDays[days])
            fDays[days] = 1;
          else
            fDays[days] += 1;

          //TODO:
          // time
          // instance[i].time
          //QUESTION: are we going to do start time, or start/end time, and in the case of the latter, how do we handle classes 
          // go over noon time?
          // may need to separate start time, or else do some regex to figure out start time?

        }
      }

      row += '</tr>';
      results = row + results;
    });

  $('#results tbody').append(results);

  /*
  console.log(fDepartment);
  console.log(fMeeting);
  console.log(fLevel);
  console.log(fSize);

  console.log(fSeats);
  console.log(fUnits);
  console.log(fBreadth);
  console.log(fDays);
  */

  // display facets
/*


      <ul id="facetsDay"></ul>
      <ul id=""></ul>
      <ul id=""></ul>
      <ul id=""></ul>
      <ul id=""></ul>
      <ul id=""></ul>
      */

    var $ulDept = $('#facetsDepartments');
    $ulDept.children().remove();
    for (var item in fDepartment) {
      $ulDept.prepend('<li> <input type="checkbox"/>' + item + " (" + fDepartment[item] + ")</li>");
    }

    var $ulRequirements = $('#facetsRequirements');
    $ulRequirements.children().remove();
    for (var item in fBreadth) {
      $ulRequirements.prepend('<li> <input type="checkbox"/>' + item + " (" + fBreadth[item] + ")</li>");
    }

    var $ulSeats = $('#facetsSeats');
    $ulSeats.children().remove();
    for (var item in fSeats) {
      $ulSeats.prepend('<li> <input type="checkbox"/>' + item + " (" + fSeats[item] + ")</li>");
    }

    var $ulDay = $('#facetsDay');
    $ulDay.children().remove();
    for (var item in fDays) {
      $ulDay.prepend('<li> <input type="checkbox"/>' + item + " (" + fDays[item] + ")</li>");
    }

    var $ulTime = $('#facetsTime');
    $ulTime.children().remove();
    for (var item in fTime) {
      $ulTime.prepend('<li> <input type="checkbox"/>' + item + " (" + fTime[item] + ")</li>");
    }

    var $ulUnits = $('#facetsUnits');
    $ulUnits.children().remove();
    for (var item in fUnits) {
      $ulUnits.prepend('<li> <input type="checkbox"/>' + item + " (" + fUnits[item] + ")</li>");
    }

    var $ulSize = $('#facetsSize');
    $ulSize.children().remove();
    for (var item in fSize) {
      $ulSize.prepend('<li> <input type="checkbox"/>' + item + " (" + fSize[item] + ")</li>");
    }

    var $ulType = $('#facetsType');
    $ulType.children().remove();
    for (var item in fMeeting) {
      $ulType.prepend('<li> <input type="checkbox"/>' + item + " (" + fMeeting[item] + ")</li>");
    }

    var $ulLevel = $('#facetsLevel');
    $ulLevel.children().remove();
    for (var item in fLevel) {
      $ulLevel.prepend('<li> <input type="checkbox"/>' + item + " (" + fLevel[item] + ")</li>");
    }
  });


  function initializeFacets() {

    fSeats = {
      "Available": 0,
      "Waitlist": 0
    };

    fUnits = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    };

    fBreadth = {
      "American Cultures": 0, 
      "Arts & Literature": 0, 
      "Biological Science": 0, 
      "Historical Studies": 0, 
      "International Studies": 0, 
      "Physical Science": 0, 
      "Philosophy & Values": 0, 
      "Reading & Composition A": 0, 
      "Reading & Composition B": 0, 
      "Social & Behavioral Sciences": 0
    }

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

    fSize = {
      "15 and less": 0,
      "16-35": 0,
      "36-75": 0,
      "75-150": 0,
      "151+": 0
    };
  }

}

