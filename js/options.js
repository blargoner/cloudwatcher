$(function() {
    var form = $('#options'),
        stored = form.find('.stored'),
        stat = $('#status');
    
    var store = function() {
        stored.each(function() {
            localStorage[this.name] = this.value;
        });

        stat.text('Saved!').show().delay(2000).fadeOut();
    };
    
    var restore = function() {
        stored.each(function() {
            this.value = localStorage[this.name] || '';
        });
    };

    form.submit(function(e) {
        e.preventDefault();
        store();
    });
    
    restore();
});
