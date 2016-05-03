//Function to Check if Browser is IE.
function checkIE() {
    if (navigator.userAgent.indexOf('MSIE') != -1) {
        var detectIEregexp = /MSIE (\d+\.\d+);/ //test for MSIE x.x
    } else { // if no "MSIE" string in userAgent
        var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists
    }
    if (detectIEregexp.test(navigator.userAgent)) {
        return true;
    }
    return false;
}