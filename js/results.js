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
  var resultsNotOff = '';
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

    // clear the table in case anything is in it already
    $('#resultsHeaderRow').siblings().remove();

    // initialize facet information lists
    initializeFacets();

    // copy objects into a sortable array and then do $.each on this collection instead of data?
    var courseArr = [];
    var i = 0;
    $.each( data, function (key, course) {
      courseArr[i] = course;
      i++;
    });

    courseArr = sortResults(courseArr, 'deptAbbrev', true);

    // iterate through the JSON file
    $.each( courseArr, function (key, course) {

      // intialize row. Add classes according to search parameters?
      var row = '';

      instance = course.classInstance;
      var numInstances = instance.length;

      // call function to enuermate facet information at the course level
      getCourseFacets(course);

      // building row for table
      // classes not offered next semester
      if (numInstances === 0) {
        row += notOfferedRow(course);
      }

      // building row for table
      // courses with one instance
      else if (numInstances === 1) {
        row += oneInstanceRow(course, instance[0]);

        // call function to enuermate facet information at the instance level
        getInstanceFacets(instance[0]);
      }

      // building row for table
      // courses with multiple instances
      else {
        row += '<tr class="courseHeaderRow">';
        row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
             + '<td class="courseNum">' + course.number + '</td>'
             + '<td class="courseTitle">' + course.title + '</td>'
             + '<td colspan="7">'; 

        // count number of lectures and discussions so we can display that information
        var instanceTypeCount = {
          'Lecture':0,
          'Discussion':0
        };
        for (var i=0; i<numInstances; i++)
          instanceTypeCount[instance[i].instanceType]+=1;

        // showing the number of lectures
        if (instanceTypeCount['Lecture'] > 0)
          row += '<p>' + instanceTypeCount['Lecture'] + ' Lecture' + (instanceTypeCount['Lecture']>1? 's':'') + '.</p>';

        // showing the number of dicussions
        if (instanceTypeCount['Discussion'] > 0)
          row += '<p>' + instanceTypeCount['Discussion'] + ' Discussion' + (instanceTypeCount['Discussion']>1? 's':'') + '.</p>';

        row += '</td></tr>';

        // add details
        row += detailsRow(course);

        for (var i=0; i<numInstances; i++){
          row += '<tr class="classInstance ' + instance[i].instanceType + '"><td colspan="3">' 
                + instance[i].instanceType + '</td>';

          // n row for multiple instances: add detail
          
          row += '<td class="instanceInstructor">' + instance[i].instructor + '</td>'
              + '<td class="instanceTime">' + instance[i].time.start + '-' + instance[i].time.end 
                                            + '<p>' + instance[i].days
                                            + '<p>' + instance[i].semester + '</p></td>'
              + '<td class="instancePlace">' + instance[i].location.room + ' <a href="http://www.berkeley.edu/map/googlemap/?' 
                                            + instance[i].location.building.toLowerCase() + '" target="new">'
                                            + instance[i].location.building + '</a></td>'
              + '<td class="courseUnits">' + course.credit + '</td>'
              + '<td class="instanceCCN">' + instance[i].ccn + '</td>'
              + '<td class="badges">' + 'badges' + '</td>'
              + '<td class="save"> <input type="checkbox"> </td>'
              + '</tr>';

          // call function to enuermate facet information at the instance level
          getInstanceFacets(instance[i]);

        }
      }

      // add a count for each course
      fSemester["All"]+=1;

      row += '<p><span class="descriptionCategory">Ratings and Grades</span></p></tr>';

      // this is really shitty but it should allow putting not offered courses at bottom.
      // QUESTION: should this be its own table?
      if (numInstances === 0) 
        resultsNotOff = resultsNotOff + row;
      else 
        results = results + row;
    });

  // adding the rows to the table
  results = results + resultsNotOff;

  $('#results tbody').append(results);

  // adding show/hide detail interaction
  $('.courseHeaderRow').on('click', function() {
    var $nextRow = $(this).next();
    if ($nextRow.hasClass('details'))
      $nextRow.toggleClass('hidden');
  });

  showFacets();

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

    fDays = {
      "M": 0,
      "Tu": 0,
      "W": 0,
      "Th": 0,
      "F": 0,
      "MW": 0,
      "TuTh": 0,
      "MWF": 0
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
      "DeCal": 0,
      "Course Thread": 0
    }

    fSemester = {
      "Fall 2014": 0,
      "All": 0
    }
  }

  function getCourseFacets (course) {

      // add to facet information lists

      //department
      var dept = course.deptAbbrev;
      if (!fDepartment[dept])
        fDepartment[dept] = 1;
      else
        fDepartment[dept] += 1;

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
      fMeeting[course.courseType]+=1;

      //fLevel
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

      if (!!course.courseThread)
        fMisc["Course Thread"]+=1;

      if (course.freshSophSem)
        fMisc["Freshman/Sophomore Seminar"]+=1;

      // QUESTION: is this how DeCal courses would be noted in the data?
      if (course.dept == "DeCal")
        fMisc["DeCal"]+=1;
  }

  function getInstanceFacets (instance) {

          //seats - available, waitlist, ?
          //QUESTION: how do we know if a course is or isn't accepting students on a waitlist? Are there other options?
          //LJ comment: Oops, this is missing from our data model. I see two options: 1) I update the scripts and produce new
          //data that includes; 2) We assume that for any class that has a waitlist, the waitlist is still open. Given the importance
          //of this item, I vote for 2. 
          if (instance.seats.available > 0)
            fSeats["Available"]+=1;
          else
            fSeats["Waitlist"]+=1;

          // class size
          var seatsMax = instance.seats.max;
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
          var days = instance.days;
          fDays[days] += 1;

          // semester
          fSemester[instance.semester]+=1;

          //TODO:
          // time
          // instance[i].time.start
          // instance[i].time.end
  }

  function showFacets () {

    var $ulDept = $('#facetsDepartments');
    $ulDept.children().remove();
    for (var item in fDepartment) {
      if (fDepartment[item] > 0)
        $ulDept.append('<li> <input type="checkbox"/>' + item + " (" + fDepartment[item] + ")</li>");
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
        $ulSeats.append('<li> <input type="checkbox"/>' + item + " (" + fSeats[item] + ")</li>");
    }

    var $ulDay = $('#facetsDay');
    $ulDay.children().remove();
    for (var item in fDays) {
      if (fDays[item] > 0)
      $ulDay.append('<li> <input type="checkbox"/>' + item + " (" + fDays[item] + ")</li>");
    }

    var $ulTime = $('#facetsTime');
    $ulTime.children().remove();
    for (var item in fTime) {
      if (fTime[item] > 0)
        $ulTime.append('<li> <input type="checkbox"/>' + item + " (" + fTime[item] + ")</li>");
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
       $ulType.append('<li> <input type="checkbox"/>' + item + " (" + fMeeting[item] + ")</li>");
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

    var $ulSem = $('#facetsSemester');
    $ulSem.children().remove();
    for (var item in fSemester) {
      if (fSemester[item] > 0)
        $ulSem.append('<li> <input type="checkbox"/>' + item + " (" + fSemester[item] + ")</li>");
    }
  }

}

function notOfferedRow (course) {
  var row = '<tr class="courseHeaderRow">';
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
  row += detailsRow(course);

  return row;
}

// function to sort the provided array according to the provided property
// oh my god so helpful http://stackoverflow.com/a/9188211
function sortResults(array, prop, asc) {
  array = array.sort(function(a, b) {
      if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
  });
  return array;
}

function oneInstanceRow (course, classInfo) {

  var row = '<tr class="courseHeaderRow">';
  row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
       + '<td class="courseNum">' + course.number + '</td>'
       + '<td class="courseTitle">' + course.title + '</td>'
       + '<td class="instanceInstructor">' + classInfo.instructor + '</td>'
       + '<td class="instanceTime">' + classInfo.time.start + '-' + classInfo.time.end  
                                     + '<p>' + classInfo.days + '</p>'
                                     + '<p>' + classInfo.semester + '</p></td>'
       + '<td class="instancePlace">' + classInfo.location.room + ' <a href="http://www.berkeley.edu/map/googlemap/?' 
                                     + classInfo.location.building.toLowerCase() + '" target="new">'
                                     + classInfo.location.building + '</a></td>'
       + '<td class="courseUnits">' + course.credit + '</td>'
       + '<td class="instanceCCN">' + classInfo.ccn + '</td>'
       + '<td class="badges">' + 'badges' + '</td>'
       + '<td class="save"> <input type="checkbox"> </td>'
       + '</tr>';

  // details
  row += detailsRow(course);

  return row;
}

function multiInstanceRows (course, instances) {

}

function detailsRow (course) {
  var row = '<tr class="hidden details"><td colspan="10" class="description">';

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

  return row;
}



