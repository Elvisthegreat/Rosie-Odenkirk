function userInformationHTML(user) {

    // Getting the object of the user that contains
    // example! Username, login profile and so
    // Setting the GitHub automatically generates an avatar if you dont have one
    // Display user followers count
    // Display how many people uers are following count
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

/**
 * Function to display our user data repository for our
 * selected user, to display that data on the screen.
 */

function repoInformationHTML(repos){
    if(repos.length == 0){
        return `<div class="clearFix repo-list">No repos!</div>`
    }
       // Take to the repo when we click on it 
       // And open in a new tab
    var listItemsHTML = repos.map(function(repo){
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a> 
                </li>`
    });

    /**And remember, we said that map() returns an array.
       So what we're going to do is use the join() 
       method on that array and join everything */
    return `<div class="clearFix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`
}

function fetchGitHubInformation(event) {
    /**
     * Setting their HTML content to an empty string has the effect of emptying these divs.
     * when their is no user input
     */
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");


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
            $.getJSON(`https://api.github.com/users/${username}`),
            $.getJSON(`https://api.github.com/users/${username}/repos`) //list the repositories for that individual user.
        ).then(
            function(firstResponse, secondResponse) {
                var userData = firstResponse[0];
                var repoData = secondResponse[0];
                $("#gh-user-data").html(userInformationHTML(userData));
                $("#gh-repo-data").html(repoInformationHTML(repoData));
            },
            function(errorResponse) {
                if (errorResponse.status === 404) {
                    $("#gh-user-data").html(
                        `<h2>No info found for user ${username}</h2>`);

                        /**present a nicer and friendlier error message to our users when this happens.
                         * When too many request from GitHub API is been made, and display a waiting time
                         */
                } else if(errorResponse.status === 403){
                    var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset') * 1000);
                    $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`) /**Adding toLocaleTimeString()  pick up your location from your browser and print the local time*/
                } else {
                    console.log(errorResponse);
                    $("#gh-user-data").html(
                        `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                }
            });
}

/**
 * Display the octocat profile when the page is fully loaded,
 * for has it a placeholder for the field text
 */
$(document).ready(fetchGitHubInformation);