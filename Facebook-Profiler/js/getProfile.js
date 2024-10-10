function log(level, message = "", data = null, functionName = "") {
  console[level](`${functionName ? `[${functionName}] ` : ""}${message}`, data);
}

const profileInfo = {
  type: "user",
  name: "",
  dp: "",
  cover: "",
  ID: "",
};

async function getProfile(username) {
  try {
    log(
      "info",
      `Fetching profile for user: ${username}`,
      null,
      "getProfileData"
    );

    // Set the URL to target the user's 'About' page
    const url = `https://mbasic.facebook.com/${username}/about`;

    // Fetch the HTML source of the user's 'About' page
    const response = await fetch(url);

    if (!response.ok) {
      const fetchError = `HTTP error! Status: ${response.status}`;
      log("error", fetchError, null, "getProfileData");
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
      profileInfo.dp = img.src;
      profileInfo.name = img.alt.split(",")[0];
    } else {
      log("error", "Failed to find profile picture", null, "loginCheck");
    }

    profileInfo.cover = profileCoverLink
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
        profileInfo.ID = idMatch[1];
        log("info", "User ID found", profileInfo.ID, "getProfileData");
      }
    } else {
      log("error", "User ID not found", null, "getProfileData");
    }

    log(
      "info",
      "Profile data extraction complete",
      profileInfo,
      "getProfileData"
    );

    return profileInfo;
  } catch (error) {
    log(
      "error",
      "An error occurred during profile data extraction",
      error,
      "getProfileData"
    );
    return null;
  }
}

// Example Usage
(async () => {
  const username = "raja.junaid.127"; // Replace with the actual username
  const profile = await getProfile(username);
  console.log(profile);
})();
