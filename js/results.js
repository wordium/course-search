

// facets
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

// facet class names
var classDept = '', // course.deptAbbrev, without space, comma, ampersand
  classSemester = '', // classInstance.semester, without space
  classBreadth = '', // course.breadth -- has multiple
  classSeats = '', // classInstance.seats.available
  classDays = '', // classInstance.days
  classTime = '', // classInstance.time.start
  classUnits = '', // course.credit
  classSize = '', // classInstance.seats.max
  classMeeting = '', // classInstance.instanceType
  classLevel = '', // course.number
  classCurricular = '';


function initializeFacets() {

  fDepartment = {};

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
    "76-150": 0,
    "151+": 0
  };

  fCurricular = {
    "Berkeley Connect": 0,
    "Freshman/Sophomore Seminar": 0,
    "DeCal": 0,
    "Course Thread": 0
  }

  fSemester = {
    "Fall 2014": 0,
    "All": 0
  }

  fTime = {
    "8-9:30A": 0,
    "9:30-11A": 0,
    "11A-12:30P": 0,
    "12:30-2P": 0,
    "2-3:30P": 0,
    "3:30-5P": 0,
    "5-9P": 0
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
      fBreadth["American Cultures"] += 1;
    if (course.breadth.AL)
      fBreadth["Arts & Literature"] += 1;
    if (course.breadth.BS)
      fBreadth["Biological Science"] += 1;
    if (course.breadth.HS)
      fBreadth["Historical Studies"] += 1;
    if (course.breadth.IS)
      fBreadth["International Studies"] += 1;
    if (course.breadth.PS)
      fBreadth["Physical Science"] += 1;
    if (course.breadth.PV)
      fBreadth["Philosophy & Values"] += 1;
    if (course.breadth.RCA)
      fBreadth["Reading & Composition A"] += 1;
    if (course.breadth.RCB)
      fBreadth["Reading & Composition B"] += 1;
    if (course.breadth.SS)
      fBreadth["Social & Behavioral Sciences"] += 1;

    // units
    fUnits[course.credit] += 1;

    //meeting type
    fMeeting[course.courseType] += 1;

    //fLevel
    var courseNumber = (course.number).match(/\d+/)[0]; //numbers only
    if (courseNumber < 100)
      fLevel["Lower Division"] += 1;
    else if (courseNumber >= 100 && courseNumber < 200)
      fLevel["Upper Division"] += 1;
    else if (courseNumber >= 200 && courseNumber < 300)
      fLevel["Graduate"] += 1;
    else if (courseNumber >= 300 && courseNumber < 400)
      fLevel["Professional"] += 1;
    else
      fLevel["Other"] += 1;

    if (course.berkeleyConnect)
      fCurricular["Berkeley Connect"] += 1;

    if (!!course.courseThread)
      fCurricular["Course Thread"] += 1;

    if (course.freshSophSem)
      fCurricular["Freshman/Sophomore Seminar"] += 1;

}

function getInstanceFacets (instance) {

        //seats - available, waitlist 
        if (instance.seats.available > 0)
          fSeats["Available"] += 1;
        else
          fSeats["Waitlist"] += 1;

        // class size
        var seatsMax = instance.seats.max;
        if (seatsMax <= 15)
          fSize["15 and less"] += 1;
        else if (seatsMax > 15 && seatsMax <= 35)
          fSize["16-35"] += 1;
        else if (seatsMax > 35 && seatsMax <= 75)
          fSize["36-75"] += 1;
        else if (seatsMax > 75 && seatsMax <= 150)
          fSize["76-150"] += 1;
        else
          fSize["151+"] += 1;

        // days
        var days = instance.days;
        fDays[days] += 1;

        // semester
        fSemester[instance.semester] += 1;

        // time
        var hour = ((instance.time.start).replace(/\:/, '')).match(/^\d+/)[0];
        if (hour <= 12)
          hour = hour * 100;
        var ampm = (instance.time.start).match(/[AP]$/)[0];

        if ((hour >= 800 && hour < 930) && ampm === 'A')
          fTime['8-9:30A'] += 1;
        else if ((hour >= 930 && hour < 1100) && ampm === 'A')
          fTime['9:30-11A'] += 1;
        else if (hour >= 1100 && hour < 1230)
          fTime['11A-12:30P'] += 1;
        else if (hour >= 1230 && hour < 200)
          fTime['12:30-2P'] += 1;
        else if (hour >= 200 && hour < 330)
          fTime['2-3:30P'] += 1;
        else if (hour >= 330 && hour < 500)
          fTime['3:30-5P'] += 1;
        else
          fTime['5-9P'] += 1;
}

/* assumes filename being passed does include the file type */
function loadJSON (filename) {

  var path = 'data/' + filename,
    results = '',
    resultsNotOff = '',
    instance = [];

  $.getJSON(path, function (data) {

    // clear the table in case anything is in it already
    $('#resultsHeaderRow').siblings().remove();

    // initialize facet information lists
    initializeFacets();

    // copy objects into a sortable array and then do $.each on this collection instead of data?
    var courseArr = [],
      i = 0;
    $.each(data, function (key, course) {
      courseArr[i] = course;
      i += 1;
    });

    courseArr = sortResults(courseArr, 'deptAbbrev', true);

    // iterate through the JSON file
    $.each(courseArr, function (key, course) {

      // get class names for facet interaction
      resetCourseTags();
      setCourseTags(course);

      // intialize row. Add classes according to search parameters?
      instance = course.classInstance;
      var row = '',
        numInstances = instance.length;

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
        row += multiInstanceRow(course, instance, numInstances);
      }

      // add a count for each course
      fSemester["All"] += 1;

      // this is really shitty but it should allow putting not offered courses at bottom.
      if (numInstances === 0) 
        resultsNotOff = resultsNotOff + row;
      else 
        results = results + row;
    });

    // adding the rows to the table
    results = results + resultsNotOff;

    $('#results tbody').append(results);

    // adding show/hide details and instances
    $('.courseHeaderRow td').on('click', function () {
      var data_classID = $(this).parent().attr('data-classID');
      var $details = $('.' + data_classID);
      $details.toggleClass('hidden');
    });

    $('.save').off();

    showFacets();

  });

  function showFacets () {

    // department facets
    // course.deptAbbrev, letters only
    var $ulDept = $('#facetsDepartments');
    $ulDept.children().remove();
    for (var item in fDepartment) {
      if (fDepartment[item] > 0) {
        // get class names for facet interaction
        var classDept = item.replace(/[&,\s]+/g, ''); //letters only
        $ulDept.append('<li class="facet"> <input type="checkbox" value="' + classDept + '" id="facet' + classDept + '"/>' 
                        + '<label for="facet' + classDept + '">' + item + ' (' + fDepartment[item] + ')</label></li>');
      }
    }

    // semester facet
    // classInstance.semester, without space
    var $ulSem = $('#facetsSemester');
    $ulSem.children().remove();
    for (var item in fSemester) {
      var classSemester = item.replace(/\s/, '');
      //console.log(classSemester)
      if (fSemester[item] > 0) {
        $ulSem.append('<li class="facet"> <input type="checkbox" id="facet' + classSemester + '" value="' + classSemester + '"/>' 
                      + '<label for="facet' + classSemester + '">' + item + ' (' + fSemester[item] + ')</label></li>');
      }
    }

    // breadth requirement facets
    // course.breadth -- has multiple
    var $ulRequirements = $('#facetsRequirements');
    $ulRequirements.children().remove();
    for (var item in fBreadth) {
      if (fBreadth[item] > 0) {
        var classBreadth = item.replace(/[&,\s]+/g, '');
        $ulRequirements.append('<li class="facet"> <input type="checkbox" id="facet' + classBreadth + '" value="' + classBreadth +'"/>' 
                              + '<label for="facet' + classBreadth + '">' + item + " (" + fBreadth[item] + ")</label></li>");
      }
    }

    // available/waitlist seats facet
    // classInstance.seats.available
    var $ulSeats = $('#facetsSeats');
    $ulSeats.children().remove();
    for (var item in fSeats) {
      if (fSeats[item] > 0) {
        $ulSeats.append('<li class="facet"> <input type="checkbox" id="facet' + item + '" value="' + item + '"/>' 
                        + '<label for="facet' + item + '">' + item + " (" + fSeats[item] + ")</label></li>");
      }
    }

    // days facet
    // classInstance.days
    var $ulDay = $('#facetsDay');
    $ulDay.children().remove();
    for (var item in fDays) {
      if (fDays[item] > 0) {
        $ulDay.append('<li class="facet"> <input type="checkbox" id="facetDays' + item + '" value="days' + item + '"/>' 
                      + '<label for="facetDays' + item + '">' + item + " (" + fDays[item] + ")</label></li>");
      }
    }

    // meeting start time
    // classInstance.time.start
    var $ulTime = $('#facetsTime');
    $ulTime.children().remove();
    for (var item in fTime) {
      if (fTime[item] > 0) {
        var className = 'time' + item.replace(/[-:]+/g, '');
        $ulTime.append('<li class="facet"> <input type="checkbox" id="facet' + className + '" value="' + className + '"/>' 
                       + '<label for="facet' + className + '">' + item + " (" + fTime[item] + ")</label></li>");
      }
    }

    // number of units
    // course.credit
    var $ulUnits = $('#facetsUnits');
    $ulUnits.children().remove();
    for (var item in fUnits) {
      if (fUnits[item] > 0) {
        var classUnits = 'units' + item;
        $ulUnits.append('<li class="facet"> <input type="checkbox" id="facet' + classUnits + '" value="' + classUnits + '"/>' 
                        + '<label for="facet' + classUnits + '">' + item + ' (' + fUnits[item] + ')</label></li>');
      }
    }

    // total class size
    // classInstance.seats.max
    var $ulSize = $('#facetsSize');
    $ulSize.children().remove();
    for (var item in fSize) {
      if (fSize[item] > 0) {
        var className = 'size' + item.replace(/[\-\+\s]+/g, '');
        //console.log(className);
        $ulSize.append('<li class="facet"> <input type="checkbox" id="facet' + className + '" value="' + className + '"/>' 
                       + '<label for="facet' + className + '">' + item + " (" + fSize[item] + ")</label></li>");
      }
    }

    // meeting type
    // classInstance.instanceType
    var $ulType = $('#facetsType');
    $ulType.children().remove();
    for (var item in fMeeting) {
      if (fMeeting[item] > 0) {
       $ulType.append('<li class="facet"> <input type="checkbox" id="facet' + item + '" value="' + item + '"/>' 
                       + '<label for="facet' + item + '">' + item + " (" + fMeeting[item] + ")</label></li>");
     }
    }

    // course level
    // course.number
    var $ulLevel = $('#facetsLevel');
    $ulLevel.children().remove();
    for (var item in fLevel) {
      if (fLevel[item] > 0) { 
        var classLevel = item.replace(/[&,\s]+/g, '');
        $ulLevel.append('<li class="facet"> <input type="checkbox" id="facet' + classLevel + '" value="' + classLevel + '"/>' 
                        + '<label for="facet' + classLevel + '">' + item + ' (' + fLevel[item] + ')</label></li>');
      }
    }

    // TODO
    // other curricular stuff
    var $ulCurricular = $('#facetsCurricular');
    $ulCurricular.children().remove();
    for (var item in fCurricular) {
      if (fCurricular[item] > 0) {
        var className = item.replace(/[\s\/]+/g, '');
        $ulCurricular.append('<li class="facet"> <input type="checkbox" id="facet' + className + '" value="' + className + '"/>' 
                       + '<label for="facet' + className + '">' + item + " (" + fCurricular[item] + ")</label></li>");
      }
    }


    // facet interactions
    // action to take when any facet checkbox is clicked
    $('.facet input:checkbox').on('click', function () {

      // which boxes are checked
      var $checked = $('.facet input:checked'),
        $checkedByCategory = [
          $('#facetsDepartments input:checked'),
          $('#facetsSemester input:checked'),
          $('#facetsRequirements input:checked'),
          $('#facetsSeats input:checked'),
          $('#facetsDay input:checked'),
          $('#facetsTime input:checked'),
          $('#facetsUnits input:checked'),
          $('#facetsSize input:checked'),
          $('#facetsType input:checked'),
          $('#facetsLevel input:checked'),
          $('#facetsCurricular input:checked')],
        classSelectors = [];

      // hide open rows
      $('.subrow').addClass('hidden');

      // if no facets are checked, display everything
      if ($checked.length === 0) {
        $('.courseHeaderRow').removeClass('hidden');
      }

      // if some facets are checked, hide everything then show according to checked boxes
      else {
        $('#resultsHeaderRow').siblings().addClass('hidden');

        // iterate over each category of facets.
        for (var i = 0; i < $checkedByCategory.length; i++) {

          // trying to prevent browser crashing? :)
          if (classSelectors.length > 500) {
            break;
          }

          // iterate over the checked facets in the current category
          // if there is nothing checked in this category, go to the next one
          if ($checkedByCategory[i].length === 0) {
            continue;
          }

          // if there are no class selectors yet, then add from the first category with checked boxes
          if (classSelectors.length === 0) {
            for (var j = 0; j < $checkedByCategory[i].length; j++) {
              classSelectors.push('.' + $checkedByCategory[i][j].value);
            }
            continue;
          }

          // concatenating the variations of classes to create array of selectors we need
          var newClassSelectors = [];
          for (var j = 0; j < $checkedByCategory[i].length; j++) {
            // append classname associated with current facet to all selectors
            var currentClass = $checkedByCategory[i][j].value;

            for (var k = 0; k < classSelectors.length; k++) {
              // console.log('adding: ' + classSelectors[k] + '.' + currentClass);
              newClassSelectors.push(classSelectors[k] + '.' + currentClass);
            }
          }

          // putting all selector combinations into one array to iterate over
          classSelectors = newClassSelectors;
          // console.log(classSelectors);
        }
        

        // iterate over facet selector combinations and show as needed
        for (var x = 0; x < classSelectors.length; x++) {
          // console.log('this box is checked: ' + checkedBox);
          var selector = classSelectors[x];
          $(selector).removeClass('hidden');

          // for multi instance rows, if none of its "children" are showing, hide it too
          $('.multiInstanceRow').each(function () {
            var classID = $(this).attr('data-classid'),
              instances = $('.' + classID),
              hasInstances = false;

            for (var i = 0; i < instances.length; i++) {
              var classList = (instances[i]).classList;
              //console.log("classlist: " + classList);
              //console.log(classID + ' this is an instance: ' + classList.contains('classInstance')  + ' and it is showing: ' + !classList.contains('hidden'));
              
              if (classList.contains('classInstance') && !classList.contains('hidden')) {
                hasInstances = true;
              }
              if (hasInstances) {
                break;
              }
            }

            //console.log(classID + " has instances: " + hasInstances);

            if (!($(this).hasClass('hidden')) && !hasInstances) {
              $(this).addClass('hidden');
            }

            if ($(this).hasClass('hidden') && hasInstances) {
              $(this).removeClass('hidden');
            }

          });
        }
        
        $('.classInstance').addClass('hidden'); //re-hiding class instances.
        
      }
    });
  }

}


// function to sort the provided array according to the provided property
// oh my god so helpful http://stackoverflow.com/a/9188211
function sortResults(array, prop, asc) {
  array = array.sort(function (a, b) {

    // if sorting by department, then we want to check to see if we need to reorder by number for multiple courses in a dept.
    if (a['deptAbbrev'] === b['deptAbbrev']) {
      // some courses have letters in their numbers, so we need to take those out first.
      var aNumber = a['number'].match(/\d+/),
          bNumber = b['number'].match(/\d+/);
      return (aNumber >= bNumber) ? 1 : ((aNumber < bNumber) ? -1 : 0);
    }

    // otherwise sort by department
    if (asc) {
      return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
    } else {
      return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    }
  });
  return array;
}

function notOfferedRow (course) {

  var courseTags = classDept + classBreadth + classLevel + classUnits + classCurricular;

  var row = '<tr class="courseHeaderRow notOfferedRow ' + courseTags + '" data-classID="' + classDept + course.number + '">';
  row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
   + '<td class="courseNum">' + course.number + '</td>'
   + '<td class="courseTitle">' + course.title + '</td>'
   + '<td colspan="3" class="notOfferedTD"> ---- Not offered this semester. ---- </td>'
   + '<td class="courseUnits">' + course.credit + '</td>'
   + '<td class="notOfferedTD"> N/A </td>'
   + '<td class="badges">' + getBadges(course) + '</td>'
   + '<td class="save"> <input type="checkbox"> </td>'
   + '</tr>';


  // details
  row += detailsRow(course, false);

  return row;
}

function oneInstanceRow (course, classInfo) {

  var courseTags = classDept + classBreadth + classLevel + classUnits + classCurricular;

  resetInstanceTags();
  setInstanceTags(classInfo);
  var instanceTags = classSemester + classSeats + classDays + classTime + classSize + classMeeting;

  var row = '<tr class="courseHeaderRow ' + courseTags + instanceTags + '" data-classID="' + classDept + course.number + '">';
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
       + '<td class="badges">' + getBadges(course) + '</td>'
       + '<td class="save"> <input type="checkbox"> </td>'
       + '</tr>';

  // details
  row += detailsRow(course, true);

  return row;
}

function multiInstanceRow(course, instance, numInstances) {

  var courseTags = classDept + classBreadth + classLevel + classUnits + classCurricular;
  var row = '';

  row += '<tr class="courseHeaderRow multiInstanceRow ' + courseTags + '" data-classID="' + classDept + course.number + '">';
  row += '<td class="deptAbbrev">' + course.deptAbbrev + '</td>'
       + '<td class="courseNum">' + course.number + '</td>'
       + '<td class="courseTitle">' + course.title + '</td>'
       + '<td colspan="3" class="seatSpacer">'; 

  // count number of lectures and discussions so we can display that information
  var instanceTypeCount = {
    'Lecture':0,
    'Discussion':0
  };
  for (var i=0; i<numInstances; i++) {
    instanceTypeCount[instance[i].instanceType] += 1;
  }

  // showing the number of lectures
  if (instanceTypeCount['Lecture'] > 0) {
    row += '<p>' + instanceTypeCount['Lecture'] + ' Lecture' + (instanceTypeCount['Lecture']>1? 's':'') + '.</p>';
  }

  // showing the number of dicussions
  if (instanceTypeCount['Discussion'] > 0) {
    row += '<p>' + instanceTypeCount['Discussion'] + ' Discussion' + (instanceTypeCount['Discussion']>1? 's':'') + '.</p>';
  }

  // end counting cell
  row += '<p>Click to see options.</p></td>';

  // add units, a space for CCN, badges, and a space for save
  row += '<td class="courseUnits">' + course.credit + '</td>'
      + '<td class="instanceCCN"> &nbsp; </td>'
      + '<td class="badges">' + getBadges(course) + '</td>'
      + '<td class="save"> &nbsp; </td>';

  // ending the header row
  row += '</tr>';

  // add details
  row += detailsRow(course, true);

  // display each instance
  for (var i=0; i<numInstances; i++){

    resetInstanceTags();
    setInstanceTags(instance[i]);
    var instanceTags = classSemester + classSeats + classDays + classTime + classSize + classMeeting;

    row += '<tr class="classInstance subrow ' + instance[i].instanceType + ' ' + courseTags + instanceTags + ' ' 
                                       + classDept + course.number + ' hidden"><td colspan="3">' 
                                       + instance[i].instanceType + '</td>';

    var courseCredit = (instance[i].instanceType === 'Lecture')? course.credit : "--"; 
    
    row += '<td class="instanceInstructor">' + instance[i].instructor + '</td>'
        + '<td class="instanceTime">' + instance[i].time.start + '-' + instance[i].time.end 
                                      + '<p>' + instance[i].days
                                      + '<p>' + instance[i].semester + '</p></td>'
        + '<td class="instancePlace">' + instance[i].location.room + ' <a href="http://www.berkeley.edu/map/googlemap/?' 
                                      + instance[i].location.building.toLowerCase() + '" target="new">'
                                      + instance[i].location.building + '</a></td>'
        + '<td class="courseUnits">' + courseCredit + '</td>'
        + '<td class="instanceCCN">' + instance[i].ccn + '</td>'
        + '<td class="badges">' + getBadges(course) + '</td>'
        + '<td class="save"> <input type="checkbox"> </td>'
        + '</tr>';

    row += '<tr class="rowSeats hidden subrow ' + classDept + course.number + '"><td colspan="3">&nbsp;</td><td colspan="7">' 
        + '<p>Seats: ' + instance[i].seats.max 
        + '. Enrolled: ' + instance[i].seats.enrolled 
        + '. Waitlist: ' + instance[i].seats.waitlist 
        + '. Available: ' + instance[i].seats.available + '.</p></td></tr>';


    // call function to enuermate facet information at the instance level
    getInstanceFacets(instance[i]);

  }

  return row;
}

function detailsRow (course, hasInstance) {

  var instance = [];
  if (hasInstance)
    instance = course.classInstance;

  var row = '<tr class="hidden details subrow ' + classDept + course.number + '"><td colspan="10" class="description">';

  row += '<h4>' + course.department + ' ' + course.number + '</h4>';

  row += '<p><span class="descriptionCategory">Description: </span>' + course.description + '</p>';

  // seats
  // add seats only for the one-instance case.
  if (hasInstance && (instance.length === 1)) {
    row += '<p><span class="descriptionCategory">Seats:</span></p><ul>'
        + '<li>Max: ' + instance[0].seats.max + '</li>'
        + '<li>Enrolled: ' + instance[0].seats.enrolled + '</li>'
        + '<li>Waitlist: ' + instance[0].seats.waitlist + '</li>'
        + '<li>Available: ' + instance[0].seats.available + '</li>';
  }

  if ((course.prereqs).length > 0)
    row += '<p><span class="descriptionCategory">Prerequisites: </span>' + course.prereqs + '</p>';

  // format
  row += '<p><span class="descriptionCategory">Format: </span>' + course.format + '</p>';

  
  if (hasInstance) {
    //final exam
    row += '<p><span class="descriptionCategory">Exam Group: </span>' +instance[0].finalGroup + '</p>';

    //textbooks/
    row += '<p><span class="descriptionCategory textbookInfo">Textbooks: </span> Text information would go here </p>';
  }


  if ((course.restrictions).length > 0)
    row += '<p><span class="descriptionCategory">Restrictions: </span>' + course.restrictions + '</p>';

  if ((course.note).length > 0)
    row += '<p><span class="descriptionCategory">Notes: </span>' + course.note + '</p>';

  var offerHistory = course.offerHist;
  if (offerHistory.length > 0) {
    row += '<p><span class="descriptionCategory">Offering History: </span>';
    for (var i = 0; i < offerHistory.length; i++) {
      row += offerHistory[i] + '. ';
    }
    row += '</p>';
  }

  row += '<p><img src="img/open.png" alt="Show Ratings and Grades" title="Show Ratings and Grades"> &nbsp; '
      + '<span class="descriptionCategory ratingsAndGrades">Ratings and Grades</span></p></tr>';

  return row;
}

function resetCourseTags () {
  classDept = ''; // course.deptAbbrev, without space, comma, ampersand
  classBreadth = ''; // course.breadth -- has multiple
  classUnits = ''; // course.credit
  classLevel = ''; // course.number
  classCurricular = '';
}

function setCourseTags (course) {
    //department
    classDept = (course.deptAbbrev).replace(/[&,\s]+/g, ''); //letters only

    // breadths
    classBreadth = '';
    if (course.breadth.AC)
      classBreadth += ' AmericanCultures';
    if (course.breadth.AL)
      classBreadth += ' ArtsLiterature';
    if (course.breadth.BS)
      classBreadth += ' BiologicalScience';
    if (course.breadth.HS)
      classBreadth += ' HistoricalStudies';
    if (course.breadth.IS)
      classBreadth += ' InternationalStudies';
    if (course.breadth.PS)
      classBreadth += ' PhysicalScience';
    if (course.breadth.PV)
      classBreadth += ' PhilosophyValues';
    if (course.breadth.RCA)
      classBreadth += ' ReadingCompositionA';
    if (course.breadth.RCB)
      classBreadth += ' ReadingCompositionB';
    if (course.breadth.SS)
      classBreadth += ' SocialBehavioralSciences';

    // units
    classUnits = ' units' + course.credit;
    
    //course number
    classLevel = ' '; 
    var courseNumber = (course.number).match(/\d+/)[0]; //numbers only
    if (courseNumber < 100)
      classLevel += "LowerDivision";
    else if (courseNumber >= 100 && courseNumber < 200)
      classLevel += "UpperDivision";
    else if (courseNumber >= 200 && courseNumber < 300)
      classLevel += "Graduate";
    else if (courseNumber >= 300 && courseNumber < 400)
      classLevel += "Professional";
    else
      classLevel += "Other";

    // semester
    classSemester = ' All';


    // classCurricular / "snowflakes"
    classCurricular = '';
    if (course.berkeleyConnect)
      classCurricular += ' BerkeleyConnect';

    if (!!course.courseThread)
      classCurricular += ' CourseThread';

    if (course.freshSophSem)
      classCurricular += ' FreshmanSophomoreSeminar';

}

function resetInstanceTags () {
  classSeats = ''; // classInstance.seats.available
  classDays = ''; // classInstance.days
  classTime = ''; // classInstance.time.start
  classSemester = ''; // classInstance.semester, without space
  classSize = ''; // classInstance.seats.max
  classMeeting = ''; // classInstance.instanceType
}

function setInstanceTags (instance) {
  // classSemester
  classSemester += ' Fall2014'

  // classSeats
  if ((instance.seats.available) > 0)
    classSeats = ' Available';

  // classDays
  classDays = ' days' + instance.days;

  //TODO
  // classTime
  classTime = ' time';
  //var className = 'time' + item.replace(/[-:]+/g, '');
  var hour = ((instance.time.start).replace(/\:/, '')).match(/^\d+/)[0];
  if (hour <= 12)
    hour = hour * 100;
  var ampm = (instance.time.start).match(/[AP]$/)[0];

  if ((hour >= 800 && hour < 930) && ampm === 'A')
    classTime += '8930A';
  else if ((hour >= 930 && hour < 1100) && ampm === 'A')
    classTime += '93011A';
  else if (hour >= 1100 && hour < 1230)
    classTime += '11A1230P';
  else if (hour >= 1230 && hour < 200)
    classTime += '12302P';
  else if (hour >= 200 && hour < 330)
    classTime += '2330P';
  else if (hour >= 330 && hour < 500)
    classTime += '3305P';
  else
    classTime += '59P';

  // classSize
    //      var className = 'size' + item.replace(/[\-\+\s]+/g, '');
  classSize = ' size';
  var size = instance.seats.max;
  if (size <= 15)
    classSize += '15andless';
  else if (size >= 16 && size <= 35)
    classSize += '1635';
  else if (size >= 36 && size <= 75)
    classSize += "3675";
  else if (size >= 76 && size <= 150)
    classSize += "76150";
  else
    classSize += "151";

  // classMeeting
  classMeeting = ' ' + instance.instanceType;
}

function getBadges (course) {
  var images = '';

  if (course.breadth.AC)
    images += '<img src="img/AC.png" alt="American Cultures" title="American Cultures">';
  if (course.breadth.AL)
    images += '<img src="img/AL.png" alt="Arts & Literature" title="Arts & Literature">';
  if (course.breadth.BS)
    images += '<img src="img/BS.png" alt="Biological Science" title="Biological Science">';
  if (course.breadth.HS)
    images += '<img src="img/HS.png" alt="Historical Studies" title="Historical Studies">';
  if (course.breadth.IS)
    images += '<img src="img/IS.png" alt="International Studies" title="International Studies">';
  if (course.breadth.PS)
    images += '<img src="img/PS.png" alt="Physical Science" title="Physical Science">';
  if (course.breadth.PV)
    images += '<img src="img/PV.png" alt="Philosophy & Values" title="Philosophy & Values">';
  if (course.breadth.RCA)
    images += '<img src="img/RCA.png" alt="Reading & Composition A" title="Reading & Composition A">';
  if (course.breadth.RCB)
    images += '<img src="img/RCB.png" alt="Reading & Composition B" title="Reading & Composition B">';
  if (course.breadth.SS)
    images += '<img src="img/SBS.png" alt="Social & Behavioral Sciences" title="Social & Behavioral Sciences">';

  //if (images === '')
    //images += '--N/A--';

  return images;
}

/*
    classSemester = '', // classInstance.semester, without space
    classSeats = '', // classInstance.seats.available
    classDays = '', // classInstance.days
    classTime = '', // classInstance.time.start

    classSize = '', // classInstance.seats.max
    classMeeting = '', // classInstance.instanceType
    */

$(document).ready(function () {

  $('#fileChange li').on('click', function () {
    var filename = $(this).text();
    loadJSON(filename);
  });

  var filename = $('#main').attr('data-file');
  loadJSON(filename);
});

