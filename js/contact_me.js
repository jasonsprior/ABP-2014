$(function() {

    $("#contactForm").find("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var date = $("input#date").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var hour = today.getHours();
            var minute = today.getMinutes();
            var fullDate = yyyy+"-"+mm+"-"+dd+" "+hour+":"+minute;
            console.log(fullDate);
            

            var formSubmission = new Firebase("https://proof-of-concept.firebaseio.com/");

            var submissionRef = formSubmission.child(fullDate+" - "+ name);
            submissionRef.set({
                name: name,
                email: email,
                date: date,
                msg: message
                }, function(error) {
                    if (error){
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems my site is having technical problems. Please email me directly at amanda@ablochphotography.com");
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                    else{
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Thanks so much for contacting me!  I promise to be in touch within the next two days.</strong><p>In the mean time, let's connect on Facebook and/or Instagram.  I really enjoy meeting new people!</p>");
                        $('#success > .alert-success')
                            .append('</div>');

                        //clear all fields
                        $('#contactForm').trigger("reset");
                    }
                }
            );
            console.log(submissionRef);

            // $.ajax({
            //     url: "././mail/contact_me.php",
            //     type: "POST",
            //     data: {
            //         name: name,
            //         phone: phone,
            //         email: email,
            //         message: message
            //     },
            //     cache: false,
            //     success: function() {
                    // Success message
                    // $('#success').html("<div class='alert alert-success'>");
                    // $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    //     .append("</button>");
                    // $('#success > .alert-success')
                    //     .append("<strong>Thanks so much for contacting me!  I promise to be in touch within the next two days.</strong><p>In the mean time, let's connect on Facebook and/or Instagram.  I really enjoy meeting new people!</p>");
                    // $('#success > .alert-success')
                    //     .append('</div>');

                    // //clear all fields
                    // $('#contactForm').trigger("reset");
                // },
                // error: function() {
                //     // Fail message
                //     $('#success').html("<div class='alert alert-danger'>");
                //     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                //         .append("</button>");
                //     $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                //     $('#success > .alert-danger').append('</div>');
                //     //clear all fields
                //     $('#contactForm').trigger("reset");
                // },
            // })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
