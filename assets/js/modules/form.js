function validateform() {
    var _validform = $('.js-form');
    if(!_validform.length) {return;}

    var _form = $('#testform', _validform),
        _formMethod = _form.attr('method'),
        _formAction = _form.attr('action');


    $('#verify').on('click',function(){
       if($(this).is(':checked')){
           $('#submitForm').removeAttr('disabled');
       } else {
           $('#submitForm').attr('disabled','disabled');
       }
    });
    $('#resetForm').on('click',function () {
        $('#submitForm').attr('disabled','disabled');
        $('span.error').remove();
    });



    _form.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'error', // default input error message class
        validClass: "success",
        rules: {
            fullname: {
                required: true,
                minlength: 5
            },
            datepicker: "required"
        },
        messages: {
            fullname: {
                required: "Please enter your full name",
                minlength: "Atleast Five (5) characters are required"
            },
            datepicker: "Please select a date"
        },

        errorPlacement: function(error, element) {
            error.insertAfter(element); // <- the default
        },
        success: function(label,element) {
            label.hide();
        },
        invalidHandler: function(form) {

        },
        submitHandler: function(form) {
            // these two variables contain the form's data
            var _serializedData = _form.serializeArray(); // raw serialized form data (array)
            var _jsonData = JSON.stringify(_serializedData); // json form data

            // ajax call for form submission
            $.ajax({
                method: _formMethod,
                data: _serializedData,
                url: _formAction
            }).done(function(data) { // handle form submission once request is successful

                // show thank you panel
                $('#testform').addClass('hide',function () {
                    _validform.append('<div class="successbox"><h2>Success!! <small>Form Successfully Submitted. Thank You!</small></h2></div>');
                });

            }).always(function(data) { // send out a callback everytime a form submission is attempted

                // if submission fails we still want to show the thank you panel
                $('#testform').addClass('hide',function () {
                    _validform.append('<div class="successbox"><h2>Success!! <small>Form Successfully Submitted. Thank You!</small></h2></div>');
                });

            });
        }
    });


}