function setupHelpText() {
  // on hover over various elements in the page, update the text in the box in the bottom right.
  var $helpBox = $('#prototypeHelp'),
    $helpTitle = $('#prototypeHelp h3'),
    $helpText = $('#helpTextDiv');
    $helpOff = $('#helpTextOff');

  // reset function to pass
  function resetHelpText () {
    $helpTitle.text('Prototype Annotations');
    $helpText.text('We have annotated our prototype with the correct behavior. Hover over a page element for more information about how it should work when implemented.');
  }

  // hide/close the help box
  $('#toggleHelp').on('click', function (event) {
    
    $helpTitle.toggleClass('hidden');
    $helpText.toggleClass('hidden');
    $helpOff.toggleClass('hidden');

    $('#prototypeHelp').toggleClass('helpboxClose')
                       .toggleClass('helpboxOpen');
    
    if ($helpTitle.hasClass('hidden')) {
      $(this).prop('value', 'Show');
      $helpOff.html('Prototype Help Box');
    }
    else {
      $(this).prop('value', 'Hide');
      resetHelpText();
    }

  });

  // bring back the explanatory text when hovering over the header or footer
  $('.bulletin').hover(function (event) {
    resetHelpText();
  });

  // describe the searches that you can do with this prototype
  $('.searchBtn').hover(function (event) {
    $helpTitle.text('Search Options');
    $helpText.html('Please note that search works only for the following supported form entries: <ol>'
    + '<li> Find Public Health major classes offered in the upcoming semester—'
    + 'Semester field: Fall 2014; Major field: "public health." </li>'
    + '<li> Find classes that meet the AC, R&CA, and R&CB campus requirements and all L&S breadth requirements—'
    + 'Campus section: AC, RCA, and RCB boxes checked; L&S Breadth section: all boxes checked; Semester field: All. </li>'
    + '<li> Find all classes related to sustainability—Semester field: All; Keyword field: "sustainability." </li>'
    + '<li> Find classes in the upcoming semester that meet only MW morning and TuTh—Semester field: Fall 2014; ' 
    + 'Day and Time: MW 9-12:30 selected and all of TuTh selected.</li>'
    + '<li> Find backup classes with open seats—Semester field: Fall 2014; open seats checkbox checked.</li>');
  });

  $('#inputSemester').hover(function (event) {
    $helpTitle.text('Semester menu');
    $helpText.html('<p>This menu should be populated with the current semester and upcoming '
    + 'semesters for which schedules are available, along with "All," which when selected returns '
    + 'any course regardless of scheduling status. When a semester ends, it should be removed '
    + 'from the menu. This will satisfy all use cases while minimizing interface clutter.</p>'
    + '<p>The default selection of the menu should be time-dependent: during the first half '
    + 'of the semester the default should be the current semester; in the second half, when '
    + 'the vast majority of students are no longer making changes to their schedules and the '
    + 'upcoming semester\'s schedule has become available, the default should change to the upcoming semester.');
  });
  
  $('#inputDepartment').hover(function (event) {
    $helpTitle.text('Department');
    $helpText.html('<p>Typing in this box generates autosuggested names of departments '
    + 'that contain the sequence of letters entered; the intent is that the suggestion list should start with '
    + 'departments that start with the sequence, followed alphabetically by department names '
    + 'containing the sequence internally. Department abbreviations in addition to full names should be supported.</p>');
  });

  $('#inputCourseNumber').hover(function (event) {
    $helpTitle.text('Course Number');
    $helpText.html('<p>If the Department field is filled in, '
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
    $helpText.html('<p>This field should support search on full or partial names and should '
    + 'search all instructors for a given class. Boolean logic for search of multiple terms '
    + 'should be AND. </p>');
  });

  $('#seats-units ul.formGroup').hover(function (event) {
    $helpTitle.text('Seats, Waitlist, Exclude');
    $helpText.html('<p><ul><li>Open Seats: returns only classes with seats open for registration.</li>'
    + '<li>Open Waitlist: returns only classes where there is a waitlist and that waitlist is open to new additions.</li>'
    + '<li>Exclude Discussions and Labs: excludes discussion sections, labs, and any other ancillary sections from search results.</li></ul></p>'
    + 'Multiple selections are supported.');
  });

  $('.units').hover(function (event) {
    $helpTitle.text('Units');
    $helpText.html('<p>To minimize interface clutter, dropdown options should not include all possible unit '
    + 'values. Since most classes are no more than four units, "6+" is a reasonably sized category. </p>');
  });

  $('#courseLevel').hover(function (event) {
    $helpTitle.text('Course Level');
    $helpText.html('<p>Multiple selections are supported.</p>');
  });

  $('#curriculum').hover(function (event) {
    $helpTitle.text('Curriculum Connections');
    $helpText.html('<p>The current list represents a selection of the different types of learning opportunities at Berkeley.'
    + 'We are aware that other programs may exist. They could be added in a second column; however, it is important to keep '
    +'in mind the principles of simplicity and presenting only the most necessary information.</p>');
  });

  $('#requirements').hover(function (event) {
    $helpTitle.text('Breadth Requirements');
    $helpText.html('<p>Multiple selections are supported.</p>');
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

  /***** results pages help text ******/
  $('#facets').hover(function (event) {
    $helpTitle.text('Facets');
    $helpText.html('There are several important behaviors of facets that are not implemented in this prototype: <ul>'
    + '<li>Facet categories should be collapsible, as indicated by the arrow icons alongside the facet titles.</li> '
    + '<li>Currently, when a facet option is selected and the results are narrowed, the results summary at the top of the screen '
    + 'remains the same. When implemented, this summary should be updated to reflect the number of results being displayed '
    + 'and the updated search criteria. </li>'
    + '<li>The facet options and categories should also update when options are selected; i.e., only the categories that are represented '
    + 'in the filtered results, along with the accurate counts, should display in the facets pane.'
    + '<li>Currently, the lecture and discussion instances returned by a search are not filtered out by the facets even if a '
    + 'facet criterion chosen should exclude the instance. For example, if a lecture is on a TuTh schedule '
    + 'and has discussion sections on M and W, even if the "TuTh" facet option is selected all of the discussion instances '
    + 'will be displayed. This should be fixed at implementation so that all displayed instances '
    + 'conform to all search criteria. </li><li>Note that it is not recommended to select more than 10 total facet options, as doing so may '
    + 'slow and/or crash your browser.</li></ul>');
  });
  
   $('#resultsSummary').hover(function (event) {
    $helpTitle.text('Results Summary');
    $helpText.html('This does not currently update with new search criteria when facet options are selected. At implementation, it should update.');
  });
  
     $('#savedCourses').hover(function (event) {
    $helpTitle.text('Saved Courses');
    $helpText.html('This feature has been designed but is not built in this prototype. '
    + 'Please see our <a href="http://www.ischool.berkeley.edu/programs/mims/projects/2014/coursesearch" target="_blank"> project report</a> for design details of this feature.');
  });

 $('#resultsHeaderRow').hover(function (event) {
    $helpTitle.text('Header Sorting');
    $helpText.html('As indicated by the sortation icons on the column headers, the results ' 
    + 'table should be sortable on Department, Number, Title, Instructor, Schedule, and Unit.');
  });
  
 $('.details').hover(function (event) {
    $helpTitle.text('Details');
    $helpText.html('<ul><li>Textbook Information: Textbook information is available through an API (talk to the CalCentral project folks for details). '
    + 'Text only (rather than cover images) should be used, along with a link to purchasing or other '
    + 'information about the book if possible. </li>'
    + '<li>Seats: The seat information tooltip should provide class-specific information about reserved seats and whether waitlist processing is automatic or manual.'
    + 'If that is not possible, it should provide general information that explains why some classes have open seats and waitlists simultaneously. </li>'
    + '<li>Offering History: Wherever possible, these should link to past course websites or syllabi.</li>'
    + '<li>Course Evaluations and Grade Distribution Information: This field is intended to display course evaluation and grade distribution data, '
    + 'which are highly desired by students. When available, the information should be displayed '
    + 'in a default-closed manner. </li> ');
  });

  $('#searchReturn').hover(function (event) {
    $helpTitle.text('Return to Search');
    $helpText.html('This link sends the user back to the search screen, populated with the parameters of the original search. '
      + 'This will allow the user to modify a search without having to fill in the form again. The browser\'s back button should also perform in this manner, for the same reason.');
  });
  
    $('#clearSearch').hover(function (event) {
    $helpTitle.text('Clear Search Options');
    $helpText.html('This button clears the form so a user can start fresh with a new search.');
  });

  


  // initialize the text
  resetHelpText();
}
