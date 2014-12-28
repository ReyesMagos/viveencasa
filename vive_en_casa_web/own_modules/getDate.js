module.exports = function() {
    var x = new Date();
    var day = x.getDate();
    var month = x.getMonth() + 1;
    var hour = x.getHours();
    var year = x.getFullYear();
    var minuts = x.getMinutes();
    var date = day + '/' + month + '/' + year + ' ' + hour + ':' + minuts;
    return date;
};
