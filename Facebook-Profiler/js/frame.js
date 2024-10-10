console.log("Script Loaded");

const profileData = {
  type: "user",
  name: "",
  dp: "",
  cover: "",
  ID: 0,
  fb_dtsg: "",
};

const targetUserData = {
  type: "user",
  name: "",
  dp: "",
  cover: "",
  ID: "",
  username: "",
};

async function main() {
  if (await getProfileData()) {
    try {
      const username = document.getElementById("username");
      const searchBtn = document.getElementById("search-btn");
      username.disabled = false; // Enable the input field
      searchBtn.disabled = false; // Enable the search button
      
      searchBtn.addEventListener("click", async function () {
        targetUserData.username = username.value;
        log("info", "Username", targetUserData.username, "main");

        if (await getTargetUserProfile(targetUserData.username)) {
          log("info", "Target User Profile", targetUserData, "main");
          getData();
        }
      });
    } catch (error) {
      log(
        "error",
        "Error getting Target User Profile Data",
        error,
        "getTargetUserProfile"
      );
    }
  } else {
    log("warn", "User not logged in", null, "main");
    alert("User is not logged in!");
  }
} // main

async function getData() {
  // There is no such IDs in index.html like get_user_about and get_user_posts.
  // rest of the work on you, make all the logic, once user profile data is available.
  // show on front end some buttons (may be) that will trigger the rest of functions like getting about data and then posts data.
  console.log("get data started")
  document
    .getElementById("get_user_about")
    .addEventListener("click", async function () {
      const userAbout = await getAboutDetails();
      log("info", "UserInfo:", userAbout, "getData");
      // now u can show the userAbout on frontEnd
      console.log("get data started")
    });

  // then call function to get post data of the user
  document
    .getElementById("get_user_posts")
    .addEventListener("click", async function () {
      const userPostsWithEngagements = await getUserPostsData();
      log("info", "User Posts Data:", userPostsWithEngagements, "getData");

      // send userPostsWithEngagements for further analysis and first show the statistics of it on frontEnd.
    });
}

window.onload = main;
