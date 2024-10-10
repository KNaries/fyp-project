
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-btn').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        if (username) {
            alert('Searching for ' + username + '...');
            // Simulate profile detection logic (replace this with actual logic)
            const profileFound = true; // Assume the profile is found for this example

            if (profileFound) {
                // Redirect to "viewall.html" after detecting the profile
                window.location.href = 'viewall.html';
            } else {
                alert('Profile not found');
            }
        } else {
            alert('Please enter a username');
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.querySelector('.search-box button');

    if (submitButton) {
        submitButton.addEventListener('click', async () => {
            // Get the username from the input field
            const usernameInput = document.querySelector('.search-box input');
            const username = usernameInput.value;

            // Fetch the loginCheck.js file
            const response = await fetch('/include/loginCheck.js');
            const scriptContent = await response.text();

            // Evaluate the script to ensure profileData is populated
            eval(scriptContent);

            // Check if the name in profileData matches the entered username
            if (profileData.name && profileData.name.toLowerCase() === username.toLowerCase()) {
                // Redirect to the profiling page if a match is found
                window.location.href = 'viewall.html';
            } else {
                alert('User not found');
            }
        });
    }
});


//TO DISPLAY USER NAME AND EMAIL.
document.addEventListener("DOMContentLoaded", () => {
    // Fetch posts.json data
    fetch('data/postData.json')
        .then(response => response.json())
        .then(posts => {
            // Extract the first post's username
            const firstPostUserName = posts[0].postedBy.name;
            const firstPostUserEmail = posts[0].postedBy.url;

            // Update the card's content with the username
            firstPostCard.innerHTML = `
              <h4 style="font-weight: bold;">${firstPostUserName}</h4>
              <p style="font-size: 16px; color: #555;"><b>Profile Url:<b> <a href="mailto:${firstPostUserEmail}" style="color: #3b5998;">${firstPostUserEmail}</a></p>
            `;
        })
        .catch(error => console.error('Error fetching posts:', error));
});


// FOLLOWERS SCRIPT
document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display total followers count from followers.json
    fetch('data/followers6117.json')
        .then(response => response.json())
        .then(followersData => {
            // Extract total followers count
            const totalFollowers = followersData[0].total_count;

            // Create the HTML for total followers count with styles
            const followersHTML = `
                <a style="color: #3b5998; font-size: 16px; margin-bottom: 10px;">
                    Total Followers: 
                    <span style="font-size: 24px; font-weight: bold; color: #000;">${totalFollowers}</span>
                </a>`;

            // Set the innerHTML of followersContent to display the count
            const followersContent = document.getElementById('followersContent');
            followersContent.innerHTML = followersHTML;
        })
        .catch(error => console.error('Error fetching followers.json:', error));
});

// FOLLOWING SCRIPT
document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display total following count from following.json
    fetch('data/following6117.json')
        .then(response => response.json())
        .then(followingData => {
            // Extract total following count
            const totalFollowing = followingData[0].total_count;

            // Create the HTML for total following count with styles
            const followingContent = document.getElementById('followingContent');
            const followingHTML = `
                <a style="color: #3b5998; font-size: 16px; margin-bottom: 10px;">
                    Total Following: 
                    <span style="font-size: 24px; font-weight: bold; color: #000;">${totalFollowing}</span>
                </a>`;

            // Set the innerHTML of followingContent to display the following count
            followingContent.innerHTML = followingHTML;
        })
        .catch(error => console.error('Error fetching following.json:', error));
});



//ABOUT SECTION.
document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display About section from about.json
    fetch('../include/about.js')  // Adjust the path if necessary
        .then(response => response.json())
        .then(data => {
            const aboutContent = document.getElementById('aboutContent');
            let aboutHTML = `<h5>ABOUT</h5>`;

            // Loop through each item in the about.json data
            data.forEach(item => {
                // Extract fieldTitle and fieldValue
                let title = item.fieldTitle;
                let value = item.fieldValue;

               

                // If the value is empty, replace it with a '-'
                if (!value) {
                    value = '-';
                }

                // Displaying the content with title and value
                aboutHTML += `<p><b>${title}:</b> ${value}</p>`;
            });

            // Set the innerHTML of aboutContent to display the about section
            aboutContent.innerHTML = aboutHTML;
        })
        .catch(error => console.error('Error fetching about.json:', error));
});

//POSTS. (most liked and least liked)
document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from posts.json
    fetch('include/postData.json')  // Adjust the path if necessary
        .then(response => response.json())
        .then(posts => {
            // Function to find the most and least liked posts
            function findMostAndLeastLikedPosts(posts) {
                let mostLiked = posts[0];
                let leastLiked = posts[0];

                posts.forEach(post => {
                    if (post.engagement.reactionsCount > mostLiked.engagement.reactionsCount) {
                        mostLiked = post;
                    }
                    if (post.engagement.reactionsCount < leastLiked.engagement.reactionsCount) {
                        leastLiked = post;
                    }
                });

                return { mostLiked, leastLiked };
            }

            // Function to render post inside a card
            function renderPost(post, elementId, type) {
                const postCard = `
                    <div class="card">
                        <img src="${post.media.url}" class="card-img-top" alt="Post Image">
                        <div class="card-body">
                            <h5 class="card-title">${type} Liked Post</h5>
                            <p class="card-text">${post.text || 'No description available'}</p>
                            <p class="card-text"><small class="text-muted">By: ${post.postedBy.name}</small></p>
                            <p class="card-text">Reactions: ${post.engagement.reactionsCount}</p>
                            <a href="${post.url}" class="btn btn-primary">View Post</a>
                        </div>
                    </div>
                `;
                document.getElementById(elementId).innerHTML = postCard;
            }

            // Get the most and least liked posts and render them
            const { mostLiked, leastLiked } = findMostAndLeastLikedPosts(posts);
            renderPost(mostLiked, 'mostLikedPost', 'Most');
            renderPost(leastLiked, 'leastLikedPost', 'Least');
        })
        .catch(error => console.error('Error fetching posts:', error));
});


//TOP 5 FRIENDS.
// Assuming you have fetched the posts data from posts.json
fetch('data/postsBilal.json')
  .then(response => response.json())
  .then(posts => {
    // Object to keep track of comment counts for each user
    const commentCounts = {};

    // Iterate over each post
    posts.forEach(post => {
      const topCommentAuthor = post.engagement.topLevelCommentAuthor;

      // Check if the top comment author is a valid user
      if (topCommentAuthor && topCommentAuthor.typename === "User") {
        const userName = topCommentAuthor.name;
        
        // Initialize or increment the comment count for the user
        if (commentCounts[userName]) {
          commentCounts[userName] += 1;
        } else {
          commentCounts[userName] = 1;
        }
      }
    });

    // Convert the commentCounts object to an array of entries
    const commentEntries = Object.entries(commentCounts);

    // Sort the entries by comment count in descending order
    commentEntries.sort((a, b) => b[1] - a[1]);

    // Get the top 5 users who commented most often
    const topFiveFriends = commentEntries.slice(0, 5).map(entry => {
      return { name: entry[0], comments: entry[1] };
    });

    // Log the top 5 friends
    console.log('Top 5 Friends by Comments:', topFiveFriends);
  })
  .catch(error => console.error('Error fetching posts:', error));

  //FOR SOCIAL MEDIA HANDLES
  // Fetch data from about.json and populate the social media information
fetch('data/about6117.json')
.then(response => response.json())
.then(data => {
    // Extract social media information
    const socialMediaData = data.filter(item => item.sectionType === 'websites_and_social_links' && item.fieldType === 'screenname');
    
    // Target the container to display social media info
    const socialsContainer = document.getElementById('socials-container');

    // Loop through each social media entry and append to the container
    socialMediaData.forEach(social => {
        const socialDiv = document.createElement('div');
        socialDiv.classList.add('mb-2');
        socialDiv.innerHTML = `<strong>${social.fieldValue}</strong>: ${social.fieldTitle}`;
        socialsContainer.appendChild(socialDiv);
    });
})
.catch(error => console.error('Error fetching the about.json file:', error));

// JavaScript for button functionality
document.getElementById('viewPostInsightsBtn').addEventListener('click', function() {
    window.location.href = 'posts-insights.html'; // Redirect to the next page
});


//-------------------------------------------posts-insights.html SCRIPTS

// Function to fetch posts from the JSON file and display them
function fetchPosts() {
    fetch('data/postData.json')  // Assumes posts.json is in the same directory
        .then(response => response.json())
        .then(posts => displayPosts(posts))
        .catch(error => console.error('Error fetching posts:', error));
}

// Function to fetch posts from the JSON file and display them
function fetchPosts() {
    fetch('data/postData.json')  // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            console.log("Fetched posts:", posts);  // For debugging, see if posts are fetched
            displayPosts(posts);
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Function to display posts
function displayPosts(posts) {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";  // Clear any existing content
    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <h3><a href="${post.url}" target="_blank">${post.postedBy.name}</a></h3>
            <p>Posted on: ${post.creationTime}</p>
            <p>Media: ${post.media.caption}</p>
            <p>Total Comments: ${post.engagements.comments.total_comments}</p>
        `;

        // Add sentiment analysis
        const sentiment = getSentiment(post.reactions);
        const sentimentDiv = document.createElement("p");
        sentimentDiv.classList.add("sentiment");
        sentimentDiv.textContent = `Sentiment: ${sentiment}`;
        postDiv.appendChild(sentimentDiv);

        container.appendChild(postDiv);
    });
}

// Function to determine the sentiment based on highest emoji reaction
function getSentiment(reactions) {
    let highestReaction = { reaction: null, count: 0 };

    reactions.forEach(reaction => {
        if (reaction.count > highestReaction.count) {
            highestReaction = reaction;
        }
    });

    return highestReaction.reaction || "No sentiment";
}

// Fetch and display posts on page load
document.addEventListener("DOMContentLoaded", fetchPosts);

//POSTS CHECKING
// Function to fetch data from engagements.json
function fetchEngagements() {
    fetch('engagements.json')  // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);  // For debugging, see if data is fetched
            displayEngagements(data);
        })
        .catch(error => console.error('Error fetching engagements:', error));
}

// Function to fetch data from engagements.json
function fetchEngagements() {
    fetch('engagements.json')  // Ensure this path is correct and engagements.json is in the same directory
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data);  // Log the fetched data to see if it's working
            if (data.length > 0) {
                displayEngagements(data);
            } else {
                console.log("No posts found in the data.");
            }
        })
        .catch(error => console.error('Error fetching engagements:', error));
}

// Function to display engagements in a card format
function displayEngagements(data) {
    const container = document.getElementById("engagements-container");
    container.innerHTML = "";  // Clear any existing content

    data.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("engagement-card");

        if (post.comments && post.comments.length > 0) {
            const comment = post.comments[0];
            const topReaction = comment.top_reactions.reduce((max, reaction) => 
                reaction.count > max.count ? reaction : max, {count: 0});

            postDiv.innerHTML = `
                <h3>Post ID: ${post.postID}</h3>
                <div class="comment">
                    <p><strong>Comment:</strong> ${comment.comment}</p>
                    <p><strong>By:</strong> <a href="${comment.user.profile_url}" target="_blank">${comment.user.name}</a></p>
                    <p><strong>Reactions Count:</strong> ${comment.reactions_count}</p>
                    <p><strong>Top Reaction Count:</strong> ${topReaction.count}</p>
                    <p><strong>Replies Count:</strong> ${comment.replies_count}</p>
                </div>
            `;
        } else {
            postDiv.innerHTML = `<p>No comments available for this post.</p>`;
        }

        container.appendChild(postDiv);
    });
}

// Fetch and display engagements on page load
document.addEventListener("DOMContentLoaded", fetchEngagements);
