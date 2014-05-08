function submitForm () {
  var inputSemester = $('#inputSemester').val(),
    inputDepartment = $('#inputDepartment').val().toLowerCase(),
    inputCourseNumber = $('#inputCourseNumber').val(),
    inputKeywords = $('#inputKeywords').val().toLowerCase(),
    inputTitle = $('#inputTitle').val().toLowerCase(),
    inputInstructors = $('#inputInstructors').val().toLowerCase(),
    openSeats = ($('#openSeats').is(':checked')) ? true:false,
    openWaitlist = ($('#openWaitlist').is(':checked')) ? true:false,
    exclude = ($('#exclude').is(':checked')) ? true:false,
    unitsMin = $('#unitsMin').val(),
    unitsMax = $('#unitsMax').val(),
    lowerDiv = ($('#lowerDiv').is(':checked')) ? true:false,
    upperDiv = ($('#upperDiv').is(':checked')) ? true:false,
    graduate = ($('#graduate').is(':checked')) ? true:false,
    professional = ($('#professional').is(':checked')) ? true:false,
    berkeleyConnect = ($('#berkeleyConnect').is(':checked')) ? true:false,
    courseThread = ($('#courseThread').is(':checked')) ? true:false,
    freshSophSem = ($('#freshSophSem').is(':checked')) ? true:false,
    r_AC = ($('#r-AC').is(':checked')) ? true:false,
    r_AH = ($('#r-AH').is(':checked')) ? true:false,
    r_AI = ($('#r-AI').is(':checked')) ? true:false,
    r_RCA = ($('#r-RCA').is(':checked')) ? true:false,
    r_RCB = ($('#r-RCB').is(':checked')) ? true:false,
    r_AL = ($('#r-AL').is(':checked')) ? true:false,
    r_BS = ($('#r-BS').is(':checked')) ? true:false,
    r_HS = ($('#r-HS').is(':checked')) ? true:false,
    r_IS = ($('#r-IS').is(':checked')) ? true:false,
    r_PV = ($('#r-PV').is(':checked')) ? true:false,
    r_PS = ($('#r-PS').is(':checked')) ? true:false,
    r_SBS = ($('#r-SBS').is(':checked')) ? true:false,
    reqMajor = $('#reqMajor').val().toLowerCase(),
    reqMinor = $('#reqMinor').val().toLowerCase(),
    times = $('.selected'),
    selectedCells = [],
    filename = '';

    // for each selected time
    times.each(function () {
      var time, day;

      // if the selected item is a time/day cell, get the time and day attributes and add them to the array
      if ($(this).hasClass('selectable')) {
        time = $(this).attr('data-time');
        day = $(this).attr('data-day');
        selectedCells.push({'time': time, 'day': day});
      }
    });


    // pre-determined search functions

    // Search #1: Public Health - Utilitarian
    // Major = Public Health, Semester = Fall 2014
    if (((reqMajor.indexOf('public health') >= 0) || (reqMajor.indexOf('pb hlth') >= 0)) && inputSemester === '2014fall') {
      window.location.href = 's1_pub_health.html';
    }

    // Search #2: Breadth Requirements - Planner
    // All L&S requirement boxes are checked. RCA and RCB boxes are checked. Semester field is All.
    else if (r_RCA && r_RCB && r_AL && r_BS && r_HS && r_IS && r_PV && r_PS && r_SBS && (inputSemester === 'all')) {
      window.location.href = 's2_breadth.html';
    }

    // Search #3: Sustainability - Focused Explorer
    // Keyword has "sustainability". Semester field is All.
    else if ((inputKeywords.indexOf('sustainability') >= 0) && (inputSemester === 'all')) {
      window.location.href = 's3_sustain.html';
    }

    // Search #4: Time-based - Utilitarian
    // Calendar is set to MW 9-12:30, and all of Th. Semester is Fall 2014.
    else if ((selectedCells.length > 0) && (inputSemester === '2014fall')) {
      var m = false,
        w = false,
        tu = false,
        th = false;
      // this is pretty relaxed; as long as any m and w have a morning cell selected, and any tu/th cells, it will pass.
      for (var i = 0; i < selectedCells.length; i++) {
        var day = selectedCells[i].day,
          time = selectedCells[i].time;
        if (day === 'mon') {
          if ((time === 'time-1') || (time === 'time-2') || (time === 'time-3')) {
            m = true;
          }
        }
        else if (day === 'wed') {
          if ((time === 'time-1') || (time === 'time-2') || (time === 'time-3')) {
            w = true;
          }
        }
        else if (day === 'tue') {
          tu = true;
        }
        else if (day === 'thu') {
          th = true;
        }
      }

      if (m && w && tu && th && (inputSemester === '2014fall')) {
        window.location.href = 's4_schedule.html';
      }
    }

    // Search #5: Backup search - Seeker
    // Open seats is checked. Semester is Fall 2014.
    else if (openSeats && (inputSemester === '2014fall')) {
      window.location.href = 's5_open.html';
    }

    // catchall
    else {
      // IT DOES NOTHING
    }
}

$(document).ready(function () {

  var $form = $('form');
  console.log($form);
  var $text = $('#advancedState');
  var $advanced = $('#advanced');
  // uncomment when done testing:
  //$advanced.hide();

  departmentAutocomplete();

  // show/hide the advanced search stuff
  $('#toggleAdvSearch').on('click', function () {
    
    // change the show/hide text in a fancy way
    $text.parent().fadeOut(function() {
      if ($text.text() === 'Show') {
        $advanced.fadeIn(50);
        $('#advHelp').fadeIn(50);
        $text.text('Hide');
      }
      else {
        $advanced.fadeOut(50);
        $('#advHelp').fadeOut(50);
        $text.text('Show');
      }
    }).fadeIn();

  });


  function dateTime($this, classname) {
    if($this.hasClass('selected')) {
      $(classname).removeClass('selected');
      $this.removeClass('selected');
    } else {
      $(classname).addClass('selected');
      $this.addClass('selected');
    }
  }

  // toggle .selected on a .selectable td when clicked
  $('.selectable').on('click', function() {
    $(this).toggleClass('selected');
  });

  // event handler when a day is selected
  // get the classname to figure out what day, and deal with those days as necessary
  $('.selectDay').on('click', function () {
    var classname = '.' + $(this).attr('data-day');
    dateTime($(this), classname);
  });

  // event handler when a time is selected
  // get the classname to figure out what time, and deal with those days as necessary
  $('.selectTime').on('click', function () {
    var classname = '.' + $(this).attr('data-time');
    dateTime($(this), classname);
  });

  // event handler when either search button is clicked.
  $('.searchBtn').on('click', function (event) {
    submitForm();
  });


  // on hover over various elements in the page, update the text in the box in the bottom right.
  var $helpBox = $('#prototypeHelp'),
    $helpTitle = $('#prototypeHelp h3'),
    $helpText = $('#helpTextDiv');

  // reset function to pass
  var resetText = function resetHelpText () {
   // $helpTitle.text('Prototype Help Box');
   // $helpText.text('Hover over something in the search field for more information about it.');
  }

  $('#toggleHelp').on('click', function (event) {
    $('#prototypeHelp').toggleClass('helpboxClose')
                       .toggleClass('helpboxOpen');
    $helpTitle.toggleClass('hidden');
    $helpText.toggleClass('hidden');
    if ($helpTitle.hasClass('hidden')) {
      $(this).prop('value', 'Show');
    }
    else {
      $(this).prop('value', 'Hide');
    }
  });


  $('.searchBtn').hover(function (event) {
    $helpTitle.text('Search Options');
    $helpText.html('Supported searches: <ol>'
    + '<li> Find Public Health major classes offered in the upcoming semester—'
    + 'Semester field: Fall 2014, Major(s) field, "public health." </li>'
    + '<li> Find classes that meet Campus and Breadth requirements—'
    + 'All Campus and L&S Breadth requirements boxes checked, Semester field: All. </li>'
    + '<li> Find classes related to sustainability—Semester field: All, Keyword field: "sustainability." </li>'
    + '<li> Find classes in the upcoming semester that meet only MW morning and TTh—Semester field: Fall 2014,' 
    + 'calendar: MW 9-12:30 selected, all of TTh selected.</li>'
    + '<li> Find backup classes with open seats—Semester field: Fall 2014, open seats checkbox checked.</li>');
  });

  $('#inputSemester').hover(function (event) {
    $helpTitle.text('Semester menu');
    $helpText.html('<p>This menu should be populated with the current semester and upcoming '
    + 'semesters for which schedules are available, along with "All," which when selected returns '
    + 'any course regardless of scheduling status. When a semester ends, it should be removed '
    + 'from the menu. This will satisfy all use cases while minimizing interface clutter.</p>');
  });
  
  $('#inputDepartment').hover(function (event) {
    $helpTitle.text('Department');
    $helpText.html('<p>Typing in this box generates autosuggested names of departments '
    + 'that contain the sequence of letters entered; the intent is that the suggestion list should start with '
    + 'departments that start with the sequence, followed alphabetically by department names '
    + 'containing the sequence internally.</p>');
  });

  $('#inputCourseNumber').hover(function (event) {
    $helpTitle.text('Course Number');
    $helpText.html('<p>At implementation, if the Department field is filled in, '
    + 'this field should autosuggest valid course numbers.</p>');
  });

  $('#inputKeywords').hover(function (event) {
    $helpTitle.text('Keyword');
    $helpText.html('<p>For terms entered in this field, search should return results where the '
    + 'title or course description contains the term. Boolean logic for search of multiple terms '
    + 'should be AND. Quotes for phrase search should be supported.</p>');
  });

  $('#inputTitle').hover(function (event) {
    $helpTitle.text('Title Keyword');
    $helpText.html('<p>For terms entered in this field, search should return results where the '
    + 'course title contains the term. Boolean logic for search of multiple terms should be AND. '
    + 'Quotes for phrase search should be supported.</p>');
  });

  $('#inputInstructors').hover(function (event) {
    $helpTitle.text('Instructors');
    $helpText.html('<p>For terms entered in this field, search should return results of courses '
    + 'taught by the specified instructors. Boolean logic for search of multiple terms '
    + 'should be AND.</p>');
  });

  $('#seats-units ul.formGroup').hover(function (event) {
    $helpTitle.text('Seats, Waitlist, Exclude');
    $helpText.html('<p>Checkboxes to modify the search results.</p>');
  });

  $('.units').hover(function (event) {
    $helpTitle.text('Units');
    $helpText.html('<p>Dropdown options to set min and max units.</p>');
  });

  $('#courseLevel').hover(function (event) {
    $helpTitle.text('Course Level');
    $helpText.html('<p>Select multiple course levels.</p>');
  });

  $('#curriculum').hover(function (event) {
    $helpTitle.text('Curriculum Connections');
    $helpText.html('<p>A selection of the different types of learning opportunities at Berkeley.</p>');
  });

  $('#requirements').hover(function (event) {
    $helpTitle.text('Breadth Requirements');
    $helpText.html('<p>Campus and L&S Breadth requirement selections..</p>');
  });

  $('#reqMajor').hover(function (event) {
    $helpTitle.text('Major');
    $helpText.html('<p>This field should autosuggest similarly to Department. The results should be classes that '
    + 'meet requirements for the chosen major. Searches on multiple majors should be supported (clicking the + icon '
    + 'should bring up an additional entry field). Logic for multiple major searches should be Boolean OR.</p>' );
  });

  $('#reqMinor').hover(function (event) {
    $helpTitle.text('Minor');
    $helpText.html('<p>This field should autosuggest similarly to Department. The results should be classes that '
    + 'meet requirements for the chosen minor. Searches on multiple minors should be supported (clicking the + icon '
    + 'should bring up an additional entry field). Logic for multiple minor searches should be Boolean OR.</p>');
  });

  $('#timeTable').hover(function (event) {
    $helpTitle.text('Day and Time');
    $helpText.html('<p>This field allows the user to select time blocks when they are free. If left blank, '
    + 'no time restrictions are placed on the results. If any blocks are selected, results are classes '
    + 'that are fully contained within the selected blocks.</p><p> Note that time blocks have been chosen to '
    + 'balance search flexibility with keeping the page accessible; too many blocks '
    + 'would create arduous tabbing for users of screen readers. </p><p>Also note that current interaction '
    + 'is to click inside am individual time block to select it; a click and drag selection '
    + 'interaction would be preferred.</p>');
  });

  $(document).keypress(function (event) {
    if (event.which === 13) {
      submitForm();
    }
  })

});






