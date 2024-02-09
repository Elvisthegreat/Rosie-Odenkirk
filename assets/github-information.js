function fetchGitHubInformation(event) {

    var username = $("#gh-username").val(); //The val() get the value from the test field which is the user input
     
    //Display a piece of text if the if the username field is empty
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    /**
     * if text is been inputted into the field display
     * an amimated loader
     */
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

        // Retrieving some information from the GitHub API.
        // Issueing a promise with when and then.

        $.when(
            $.getJSON(`https://api.github.com/users/${username}`)
        ).then(
                function(response) {
                    var userData = response;
                    $("gh-user-data").html(userInformationHTML(userData));

                    // Incase the promise doesn't work out
                }, function(errorResponse) {
                    if(errorResponse.status === 404){
                        $("gh-user-data").html(`<h2>No info found for user ${username}</h2>`);

                    // Incase the error that come back is not a 404 error
                    }else{
                        console.log(errorResponse);
                        $("gh-user-data").html(
                            `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);      
                    }
                })
}