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


  $('#time td').on('click', function() {
    var $td = $(this);
    console.log($td.attr('data-selected'));

    if($td.attr('data-selected') === 'true'){
      $td.css('background-color', '#fff')
         .attr('data-selected', 'false');

    }
    else {
      $td.css('background-color', '#B9D3B6')
         .attr('data-selected', 'true');
    }
  });

	testJSON();

});

function submitForm () {
  
}



function testJSON () {

  var $test = $('#test');

  $.getJSON('data/CourseStructure.json', function (data) {
    console.log('data: ' + data);

    // course info
    $.each( data, function( key, course ) {

      var BC = course.berkeleyConnect ? 'is' : 'is not',
          AC = course.breadth.AC ? 'American Cultures' : '',
          PS = course.breadth.PS ? 'Physical Sciences' : '',
          RCA = course.breadth.RCA ? 'Reading & Composition A' : '';

      $test.append('<p> course: ' + key +
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

      // class instance info
      var instance = [];
      instance = course.classInstance;
      console.log(instance + ' length ' + instance.length);

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

      $test.append('<br />');
      
    });

  });
} // testJSON()








