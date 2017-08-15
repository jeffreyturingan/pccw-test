function gallerymode() {
    var _datepick = $('#datepicker');
    if(!_datepick.length) {return;}
    _datepick.datepicker({ minDate: 0 });
}