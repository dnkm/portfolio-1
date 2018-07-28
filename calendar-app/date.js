const DateUtils = {}

DateUtils.getDaysInMonth = function(date) {
    let clone = new Date(date);
    clone.setDate(1);
    clone.setMonth(clone.getMonth()+1);
    clone.setDate(0);
    return clone.getDate();
}

DateUtils.getDayOfFirst = function(date) {
    let clone = new Date(date);
    clone.setDate(1);
    return clone.getDay();
}