function fetchGitHubInformation(event) {

    var username = $("#gh-username").val(); //The val() get the value from the test field which the user input
     
    //Return a piece of text if the if the username field is empty
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    /**
     * if text has been inputted into the field the display
     * an amimated loader
     */
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);
}