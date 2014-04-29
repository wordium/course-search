$(document).ready(function () {

  $('#fileChange li').on('click', function() {
    var filename = $(this).text();
    getJSON(filename);
  });

  var filename = $('#main').attr('data-file');
  getJSON(filename);

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
      var numInstances = instance.length;

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
      //LJ comment: I didn't think we were doing anything about offer history in the facets.
      //Our design calls for just showing current semester (or current and next if that schedule
      //is available) and "All." I think it would get cluttered and confusing if we included
      //facets for the semesters in the offering history, and it doesn't add anything
      //necessary for a use case that I can discern. 


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
      //LJ comment: I think we do want that as another facet, since they are orthogonal to 
      //rather than part of the upper/lower div stuff
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

      if (course.berkeleyConnect)
        fMisc["Berkeley Connect"]+=1;

      // building row for table
      // classes not offered next semester
      if (numInstances === 0) {
        row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
         + '<td class="courseNum">' + course.number + '</td>'
         + '<td class="courseTitle">' + course.title + '</td>'
         + '<td colspan="3" class="notOfferedTD"> ---- Not offered this semester. ---- </td>'
         + '<td class="courseUnits">' + course.credit + '</td>'
         + '<td class="notOfferedTD"> N/A </td>'
         + '<td class="badges">' + 'badges' + '</td>'
         + '<td class="save"> <input type="checkbox"> </td>'
         + '</tr>';


        // details
        row += '<tr><td colspan="10" class="hidden">';

        row += '<p><span class="descriptionCategory">Description: </span>' + course.description + '</p>';

        if ((course.prereqs).length > 0)
          row += '<p><span class="descriptionCategory">Prerequisites: </span>' + course.prereqs + '</p>';

        if ((course.restrictions).length > 0)
          row += '<p><span class="descriptionCategory">Restrictions: </span>' + course.restrictions + '</p>';

        if ((course.note).length > 0)
          row += '<p><span class="descriptionCategory">Notes: </span>' + course.note + '</p>';

        var offerHistory = course.offerHist;
        if (offerHistory.length > 0) {
          row += '<p><span class="descriptionCategory">Offering History: </span></p><ul>';
          for (var i = 0; i < offerHistory.length; i++)
            row += '<li>' + offerHistory[i] + '</li>';
          row += '</ul>';
        }


      }

      // building row for table
      // courses with one instance
      else if (numInstances === 1) {
        var classInfo = instance[0];
        row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
             + '<td class="courseNum">' + course.number + '</td>'
             + '<td class="courseTitle">' + course.title + '</td>'
             + '<td class="instanceInstructor">' + classInfo.instructor + '</td>'
             + '<td class="instanceTime">' + classInfo.time.start + '-' + classInfo.time.end + '</td>'
             + '<td class="instancePlace">' + classInfo.location.room + ' <a href="http://www.berkeley.edu/map/googlemap/?' 
                                           + classInfo.location.building.toLowerCase() + '" target="new">'
                                           + classInfo.location.building + '</a></td>'
             + '<td class="courseUnits">' + course.credit + '</td>'
             + '<td class="instanceCCN">' + classInfo.ccn + '</td>'
             + '<td class="badges">' + 'badges' + '</td>'
             + '<td class="save"> <input type="checkbox"> </td>'
             + '</tr>';
      }

      // building row for table
      // courses with one instance
      else {
        for (var i=0; i<numInstances; i++){
          // if multiple instances, add first row, then add course information and message
          if (i === 0) {
            row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
                 + '<td class="courseNum">' + course.number + '</td>'
                 + '<td class="courseTitle">' + course.title + '</td>'
                 + '<td colspan="7">' + numInstances + ' ' + course.type + 's. </td></tr>';
          }
          
          row += '<tr><td colspan="3">&nbsp;</td>';

          // n row for multiple instances: add detail
          
          row += '<td class="instanceInstructor">' + instance[i].instructor + '</td>'
              + '<td class="instanceTime">' + instance[i].time.start + '-' + instance[i].time.end + '</td>'
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
          //LJ comment: Oops, this is missing from our data model. I see two options: 1) I update the scripts and produce new
          //data that includes; 2) We assume that for any class that has a waitlist, the waitlist is still open. Given the importance
          //of this item, I vote for 2. 
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
           //LJ comment: Damn, another flaw in our data model. In this case, I think it is likely worth updating the model/scripts/data.

        }
      }


      row += '<p><span class="descriptionCategory">Ratings and Grades</span></p></tr>';
      results = results + row;
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
      if (fDepartment[item] > 0)
        $ulDept.prepend('<li> <input type="checkbox"/>' + item + " (" + fDepartment[item] + ")</li>");
    }

    var $ulRequirements = $('#facetsRequirements');
    $ulRequirements.children().remove();
    for (var item in fBreadth) {
      if (fBreadth[item] > 0)
        $ulRequirements.append('<li> <input type="checkbox"/>' + item + " (" + fBreadth[item] + ")</li>");
    }

    var $ulSeats = $('#facetsSeats');
    $ulSeats.children().remove();
    for (var item in fSeats) {
      if (fSeats[item] > 0)
        $ulSeats.prepend('<li> <input type="checkbox"/>' + item + " (" + fSeats[item] + ")</li>");
    }

    var $ulDay = $('#facetsDay');
    $ulDay.children().remove();
    for (var item in fDays) {
      if (fDepartment[item] > 0)
      $ulDay.prepend('<li> <input type="checkbox"/>' + item + " (" + fDays[item] + ")</li>");
    }

    var $ulTime = $('#facetsTime');
    $ulTime.children().remove();
    for (var item in fTime) {
      if (fTime[item] > 0)
        $ulTime.prepend('<li> <input type="checkbox"/>' + item + " (" + fTime[item] + ")</li>");
    }

    var $ulUnits = $('#facetsUnits');
    $ulUnits.children().remove();
    for (var item in fUnits) {
      if (fUnits[item] > 0)
        $ulUnits.append('<li> <input type="checkbox"/>' + item + " (" + fUnits[item] + ")</li>");
    }

    var $ulSize = $('#facetsSize');
    $ulSize.children().remove();
    for (var item in fSize) {
      if (fSize[item] > 0)
        $ulSize.append('<li> <input type="checkbox"/>' + item + " (" + fSize[item] + ")</li>");
    }

    var $ulType = $('#facetsType');
    $ulType.children().remove();
    for (var item in fMeeting) {
      if (fMeeting[item] > 0)
       $ulType.prepend('<li> <input type="checkbox"/>' + item + " (" + fMeeting[item] + ")</li>");
    }

    var $ulLevel = $('#facetsLevel');
    $ulLevel.children().remove();
    for (var item in fLevel) {
      if (fLevel[item] > 0)
        $ulLevel.append('<li> <input type="checkbox"/>' + item + " (" + fLevel[item] + ")</li>");
    }

    var $ulMisc = $('#facetsMisc');
    $ulMisc.children().remove();
    for (var item in fMisc) {
      if (fMisc[item] > 0)
        $ulMisc.append('<li> <input type="checkbox"/>' + item + " (" + fMisc[item] + ")</li>");
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
      "Lower Division": 0,
      "Upper Division": 0,
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

    fMisc = {
      "Berkeley Connect": 0,
      "Freshman/Sophomore Seminar": 0,
      "DeCal": 0
    }
  }

}

