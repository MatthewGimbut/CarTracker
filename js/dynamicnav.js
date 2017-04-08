/**
 * Retrieves cookies for user's session and determines if they are logged in.
 * If they are, changes some parts of the page
 *
 * @author Michael Crinite
 */
var userJSON;

function loadCookies() {
    userJSON = JSON.parse(localStorage.getItem('userJSON'));
}
