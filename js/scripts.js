
function dateTime($this, classname) {
  console.log($this);
  console.log(classname);
  if($this.attr('data-selected') === 'true') {
    $(classname).attr('data-selected', 'false')
                .css('background-color', '#fff');

    $this.attr('data-selected', 'false')
         .css('background-color', '#fff');
  } else {
    $(classname).attr('data-selected', 'true')
                .css('background-color', '#B9D3B6');

    $this.attr('data-selected', 'true')
         .css('background-color', '#B9D3B6');
  }
}


function submitForm () {
  console.log("submitform");


  //time table
  /*

<table id="timeTable">
  <tr>
  <td data-selected="false" class="time-1 wed selectable"></td>
  */

  var inputSemester = $('#inputSemester').val(),
    inputDepartment = $('#inputDepartment').val(),
    inputCourseNumber = $('#inputCourseNumber').val(),
    inputKeywords = $('#inputKeywords').val(),
    inputTitle = $('#inputTitle').val(),
    inputInstructors = $('#inputInstructors').val(),
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
    r_PS = ($('#r-PS').is(':checked')) ? true:false,
    r_SBS = ($('#r-SBS').is(':checked')) ? true:false,
    reqMajor = $('#reqMajor').val(),
    reqMinor = $('#reqMinor').val();

  console.log ( inputSemester + ' ' + inputDepartment + ' ' + inputCourseNumber + ' ' + inputKeywords + ' ' + inputTitle + ' ' + inputInstructors);
  console.log(openSeats + ' ' + openWaitlist + ' ' + exclude  + ' ' + unitsMin + ' ' + unitsMax);
  console.log(lowerDiv + ' ' + upperDiv + ' ' + graduate + ' ' + professional );
  console.log(berkeleyConnect + ' ' + courseThread + ' ' + freshSophSem);
  console.log(r_AC + ' ' + r_AH + ' ' + r_AI + ' ' + r_RCA + ' ' + r_RCB);
  console.log(r_AL + ' ' + r_BS + ' ' + r_HS + ' ' + r_HS + ' ' + r_IS + ' ' + r_PS + ' ' + r_SBS);
  console.log(reqMajor + ' ' + reqMinor);


  
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
        $text.text('Hide');
      }
      else {
        $advanced.fadeOut(50);
        $text.text('Show');
      }
    }).fadeIn();

    // less fancy way
    /*
    if ($text.text() === 'Show')
      $text.text('Hide');
    else
      $text.text('Show');
    $('#advanced').toggle();
    */

  });


  $('.selectable').on('click', function() {
    var $td = $(this);
    //console.log($td.attr('data-selected'));

    if($td.attr('data-selected') === 'true'){
      $td.css('background-color', '#fff')
         .attr('data-selected', 'false');

      // set appropriate .selectDay and .selectTime to data-selected='false'
    }
    else {
      $td.css('background-color', '#B9D3B6')
         .attr('data-selected', 'true');
    }
  });

  $('.selectDay').on('click', function () {
    var classname = '.' + $(this).attr('data-day');
    dateTime($(this), classname);
  });

  $('.selectTime').on('click', function () {
    var classname = '.' + $(this).attr('data-time');
    dateTime($(this), classname);
  });

  $('.searchBtn').on('click', function (event) {
    submitForm();
  });

});






