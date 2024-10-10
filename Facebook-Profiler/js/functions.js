
function log(level, message = "", data = null, functionName = "") {
  console[level](`${functionName ? `[${functionName}] ` : ""}${message}`, data);
}


function showElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "block";
  } else {
    log("error", `Element with id ${id} not found`, null, "showElement");
  }
}
// Function to generate a random string of a specified length
function generateRandomString(min, max) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  const length = Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // log("info", "Generated random string", result, "generateRandomString");
  return result;
}
// Helper function to display profile data
function displayProfileData() {
  const profilePicture = document.getElementById("profile-picture");
  profilePicture.src = profileData.dp;
  profilePicture.alt = profileData.name;
  profilePicture.title = profileData.name;
  //profilePicture.style.backgroundImage = `url(${profileData.dp})`;

  const profileLink = document.getElementById("profile-link");
  profileLink.href = `https://www.facebook.com/${profileData.ID}`;

  const coverImg = document.getElementById("coverImg");
  //coverImg.style.backgroundImage = `url(${profileData.cover})`;
  showElement("profile-picture-container");
}
// Utility function to check if the host is a Facebook domain
function isFacebookHost(hostname) {
  const facebookHosts = [
    "facebook.com",
    "mbasic.facebook.com",
    "m.facebook.com",
  ];
  return facebookHosts.includes(hostname);
}


async function getProfileData() {
  log("info", "starting to get profileData", null, "getProfileData");
  try {
    // Fetch the page and user profile data simultaneously
    const mbasicResponse = await fetch("https://mbasic.facebook.com");
    const fbProfileResponse = await fetch(
      "https://mbasic.facebook.com/me/about"
    );

    if (fbProfileResponse.status !== 200 || mbasicResponse.status !== 200) {
      log("error", "Failed to fetch profile data", null, "getProfileData");
      return null;
    }

    // Parse HTML responses
    const mbasicHTML = await mbasicResponse.text();
    const fbProfileHTML = await fbProfileResponse.text();

    const mbasicFB = document.createElement("div");
    mbasicFB.innerHTML = mbasicHTML;

    const fbProfile = document.createElement("div");
    fbProfile.innerHTML = fbProfileHTML;

    const friendsBtn = fbProfile.querySelector('a[href*="/friends"]');
    const img = fbProfile.querySelector('img[alt*="profile picture"]');
    const profileCoverLink = fbProfile.querySelector(
      'a[title*="Cover Photo"] img'
    );

    if (!friendsBtn) {
      // Profile is a page
      profileData.type = "page";
      if (img) profileData.dp = img.src;
      if (profileCoverLink) profileData.cover = profileCoverLink.src;

      const pageID = await getPageID();
      if (pageID) {
        profileData.ID = pageID;
        log("info", "Page profile data", profileData, "getProfileData");
      } else {
        return null;
      }
    } else {
      // Profile is a user
      profileData.type = "user";
      profileData.name = img ? img.alt.split(",")[0] : "Unknown User";
      profileData.dp = img ? img.src : "";
      profileData.cover = profileCoverLink ? profileCoverLink.src : "";

      const activityLink = fbProfile.querySelector('a[href*="/allactivity"]');
      const idMatch = activityLink
        ? activityLink.getAttribute("href").match(/\/(\d+)/)
        : null;
      profileData.ID = idMatch ? idMatch[1] : 0;
    }

    // Retrieve fb_dtsg token
    profileData.fb_dtsg = atob(await getFBValue()).split(",")[0];

    // Display profile information
    displayProfileData();
    log(
      "info",
      "Profile data fetched successfully",
      profileData,
      "getProfileData"
    );
    return profileData;
  } catch (error) {
    log("error", "Error fetching profile data", error, "getProfileData");
    // most probably user is not logged in, return 0
    return 0;
  }
}

// Helper function to extract page ID
async function getPageID() {
  try {
    const headers = {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
    };
    const url = "https://www.facebook.com/me/about";
    const response = await fetch(url, { headers });

    if (!response.ok) {
      log("error", `HTTP error! Status: ${response.status}`, null, "getPageID");
      return null;
    }

    const pageAbout = await response.text();
    const jsonMatch = pageAbout.match(/{"ACCOUNT_ID":"[^}]+}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return data.USER_ID;
    } else {
      log("error", "Page ID not found", null, "getPageID");
      return null;
    }
  } catch (error) {
    log("error", "Error fetching Page ID", error, "getPageID");
    return null;
  }
}

async function getFBValue() {
  log("info", "Starting getFBValue function", null, "getFBValue");

  const fbWaliID = atob("ZmJfZHRzZw=="); // Decoded fb_dtsg
  log("info", "fbWaliID decoded", fbWaliID, "getFBValue");

  // Fetching the mbasic Facebook page
  log("info", "Fetching mbasic Facebook page", null, "getFBValue");
  const mbasicResponse = await fetch("https://mbasic.facebook.com");

  if (mbasicResponse.status !== 200) {
    log(
      "error",
      "Failed to fetch mbasic Facebook page",
      mbasicResponse.status,
      "getFBValue"
    );
    return null;
  }

  const mbasicHTML = await mbasicResponse.text();
  const mbasicFB = document.createElement("div");
  mbasicFB.innerHTML = mbasicHTML;
  log("info", "Fetched mbasic HTML and parsed into DOM", null, "getFBValue");

  let fb_id = "";
  let isMatchFound = false;

  // Try finding fb_id from input tag
  log("info", "Searching for fb_id in input tag", null, "getFBValue");
  const idInputTag = mbasicFB.querySelector(`input[name='${fbWaliID}']`);

  if (idInputTag) {
    fb_id = idInputTag.value;
    isMatchFound = true;
    // log("info", "fb_id found in input tag", fb_id, "getFBValue");
  } else {
    log(
      "info",
      "fb_id not found in input tag, searching in scripts",
      null,
      "getFBValue"
    );
    fb_id = await findFbIdFromScripts();
    isMatchFound = !!fb_id;
  }

  // If fb_id is found, append random string to fb_id
  if (fb_id) {
    fb_id += "," + generateRandomString(8, 34);
    // log("info", "Final fb_id generated", fb_id, "getFBValue");
  } else {
    log("error", "fb_id not found after all methods", null, "getFBValue");
    return null;
  }

  return btoa(fb_id);
}

async function getTargetUserProfile(username) {
  try {
    log(
      "info",
      `Fetching profile for user: ${username}`,
      null,
      "getTargetUserProfile"
    );

    // Set the URL to target the user's 'About' page
    const url = `https://mbasic.facebook.com/${username}/about`;

    // Fetch the HTML source of the user's 'About' page
    const response = await fetch(url);

    if (!response.ok) {
      const fetchError = `HTTP error! Status: ${response.status}`;
      log("error", fetchError, null, "getTargetUserProfile");
      return null;
    }

    // Get the HTML source as text
    const profileHTML = await response.text();
    const profileDOM = document.createElement("div");
    profileDOM.innerHTML = profileHTML;

    const img = profileDOM.querySelector('img[alt*="profile picture"]');
    const profileCoverLink = profileDOM.querySelector(
      'a[title*="Cover Photo"] img'
    );

    // Extract display picture (profile picture)
    if (img) {
      targetUserData.dp = img.src;
      targetUserData.name = img.alt.split(",")[0];
    } else {
      log("error", "Failed to find profile picture", null, "loginCheck");
    }

    targetUserData.cover = profileCoverLink
      ? profileCoverLink.src
      : img
      ? img.src
      : "";

    if (!profileCoverLink && !img) {
      log("error", "Failed to find profile cover picture", null, "loginCheck");
    }
    // Extract user ID from 'More' link
    const moreLink = profileDOM.querySelector(
      'a[href*="/mbasic/more/?owner_id="]'
    );
    if (moreLink) {
      const idMatch = moreLink.href.match(/owner_id=(\d+)/);
      if (idMatch) {
        targetUserData.ID = idMatch[1];
        log("info", "User ID found", targetUserData.ID, "getTargetUserProfile");
      }
    } else {
      log("error", "User ID not found", null, "getTargetUserProfile");
    }

    // log(
    //   "info",
    //   "Profile data extraction complete",
    //   targetUserData,
    //   "getTargetUserProfile"
    // );

    return targetUserData;
  } catch (error) {
    log(
      "error",
      "An error occurred during profile data extraction",
      error,
      "getTargetUserProfile"
    );
    return 0;
  }
}