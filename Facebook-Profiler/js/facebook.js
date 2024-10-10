async function getAboutDetails() {
    const fetchCollection = async (collectionNumber) => {
        const collection = btoa(`app_collection:${targetUserData.ID}:2327158227:${collectionNumber}`);
        const section = btoa(`app_section:${targetUserData.ID}:2327158227`);

        let variables, params;

        if (collectionNumber === 207) {
            // Special handling for life events
            variables = {
                appSectionFeedKey: "ProfileCometAppSectionFeed_timeline_nav_app_sections__AQHRH2rdy8yRPFDqzKzz5l9IfPv7F68wiN4FpQX18VBr1fiOwcxy7DqFYb-HXzbgZJlwTSo4W7bfGV1Fw5Pd9PgTP0t3iT33D0JOo-Lxo38_PNM",
                collectionToken: `${collection}`,
                pageID: `${targetUserData.ID}`,
                rawSectionToken: "AQHRH2rdy8yRPFDqzKzz5l9IfPv7F68wiN4FpQX18VBr1fiOwcxy7DqFYb-HXzbgZJlwTSo4W7bfGV1Fw5Pd9PgTP0t3iT33D0JOo-Lxo38_PNM",
                scale: 1,
                sectionToken: `${section}`,
                showReactions: true,
                userID: `${targetUserData.ID}`,
                __relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider: false,
                __relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider: false,
            };

            params = new URLSearchParams({
                av: profileData.ID,
                __aaid: "0",
                __user: profileData.ID,
                __a: "1",
                __req: "y",
                __hs: "20001.HYP:comet_pkg.2.1..2.1",
                dpr: "1",
                __ccg: "GOOD",
                __rev: "1017093295",
                __s: "0a03vb:0mjvbj:k9l75n",
                __hsi: "7422339281296502954",
                __comet_req: "15",
                fb_dtsg: profileData.fb_dtsg,
                jazoest: "25583",
                lsd: "SxGqs4Ds-bSv8bnzg7qIe1",
                __spin_r: "1017093295",
                __spin_b: "trunk",
                __spin_t: "1728148032",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "ProfileCometAboutAppSectionQuery",
                variables: JSON.stringify(variables),
                server_timestamps: "true",
                doc_id: "8209717269065472",
            });
        } else {
            // Standard handling for other collections
            variables = {
                appSectionFeedKey: "ProfileCometAppSectionFeed_timeline_nav_app_sections__AQHRtgvAS6EOc2zIjF3DyZWRufHp39yaUp8j3RIJ8peUnbIpzKjraBS1izZfniR8nKjxQgyFRLQ0VHMmcMb12bTpPWjmm3L2-G_-rSNhmFXfTc8",
                collectionToken: `${collection}`,
                pageID: `${targetUserData.ID}`,
                rawSectionToken: "AQHRtgvAS6EOc2zIjF3DyZWRufHp39yaUp8j3RIJ8peUnbIpzKjraBS1izZfniR8nKjxQgyFRLQ0VHMmcMb12bTpPWjmm3L2-G_-rSNhmFXfTc8",
                scale: 1,
                sectionToken: `${section}`,
                showReactions: true,
                userID: `${targetUserData.ID}`,
                __relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider: false,
            };

            params = new URLSearchParams({
                av: profileData.ID,
                __aaid: "0",
                __user: profileData.ID,
                __a: "1",
                __req: "u",
                __hs: "19991.HYP:comet_pkg.2.1..2.1",
                dpr: "1",
                __ccg: "MODERATE",
                __rev: "1016781217",
                __s: "tpn43i:d5lwxo:fe2zut",
                __hsi: "7418484930643806390",
                __comet_req: "15",
                fb_dtsg: profileData.fb_dtsg,
                jazoest: "25499",
                lsd: "SFZ1sJommoY-wZQRW79Jvm",
                __spin_r: "1016781217",
                __spin_b: "trunk",
                __spin_t: "1727250621",
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "ProfileCometAboutAppSectionQuery",
                variables: JSON.stringify(variables),
                server_timestamps: "true",
                doc_id: "7990221197755539",
            });
        }

        log("info", `Fetching collection ${collectionNumber}`, params, "getAboutDetails.fetchCollection");

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://www.facebook.com/api/graphql/", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Accept", "*/*");
            xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.8");
            xhr.setRequestHeader("Priority", "u=1, i");
            xhr.setRequestHeader("x-asbd-id", "129477");
            xhr.setRequestHeader("x-fb-friendly-name", "ProfileCometAboutAppSectionQuery");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        try {
                            let response;
                            try {
                                response = JSON.parse(xhr.responseText);
                            } catch (error) {
                                //log("warn", "Initial JSON parsing error", error.message, "getAboutDetails.fetchCollection");
                                let errorPosition = error.message.match(/position (\d+)/);
                                if (errorPosition) {
                                    let trimmedResponse = xhr.responseText.substring(0, errorPosition[1]);
                                    try {
                                        response = JSON.parse(trimmedResponse);
                                    } catch (secondError) {
                                        log("warn", "Second attempt to parse JSON response failed", secondError.message, "getAboutDetails.fetchCollection");
                                        return 0;
                                    }
                                } else {
                                    log("error", "Error position not found in the error message.", null, "getAboutDetails.fetchCollection");
                                    return;
                                }
                            }
                            log("info", `Response for ${collectionNumber}:`, response, "getAboutDetails.fetchCollection");
                            resolve(response);
                        } catch (error) {
                            reject(error);
                        }
                    } else {
                        reject(new Error(`Request failed with status ${xhr.status}`));
                    }
                }
            };

            xhr.send(params);
        });
    };

    try {
        const collectionNumbers = [201, 202, 203, 204, 205, 206, 207]; // Include life events
        const responses = await Promise.all(collectionNumbers.map(fetchCollection));

        const structuredData = {
            overview: [],
            work_and_education: [],
            places_lived: [],
            contact_and_basic_info: [],
            family_and_relationships: [],
            details_about_you: [],
            life_events: [],
        };

        responses.forEach((response, index) => {
            const userData = response?.data?.user ?? null;
            const aboutAppSections = userData?.about_app_sections?.nodes ?? [];

            aboutAppSections.forEach((section) => {
                const activeCollections = section?.activeCollections?.nodes ?? [];

                activeCollections.forEach((collection) => {
                    const profileFieldSections = collection?.style_renderer?.profile_field_sections ?? [];

                    profileFieldSections.forEach((fieldSection) => {
                        const sectionType = fieldSection?.field_section_type || "";
                        const fields = fieldSection?.profile_fields?.nodes ?? [];

                        fields.forEach((field) => {
                            const fieldType = field?.field_type || "unknown";
                            let fieldTitle = field?.title?.text || "No title";
                            let fieldValue = "";

                            // Skip fields with type "upsell"
                            if (fieldType === "upsell") return;

                            // Extract value from the appropriate field in the response
                            if (field?.renderer?.field?.text_content) {
                                fieldValue = field?.renderer?.field?.text_content?.text || "";
                            } else if (field?.list_item_groups) {
                                fieldValue = field?.list_item_groups[0]?.list_items[0]?.text?.text || "";
                            }

                            // Special case handling for contact and basic info
                            if (index === 3) { // contact_and_basic_info
                                // Swap title and value for contact and basic info
                                [fieldTitle, fieldValue] = [fieldValue, fieldTitle];
                            }

                            // Push the complete field structure to the corresponding section
                            if (fieldType && fieldTitle) {
                                const fieldData = {
                                    fieldType,
                                    fieldTitle,
                                    fieldValue,
                                };

                                switch (index) {
                                    case 0: // overview
                                        structuredData.overview.push(fieldData);
                                        break;
                                    case 1: // work_and_education
                                        if (fieldType === "work" || fieldType === "education") {
                                            structuredData.work_and_education.push(fieldData);
                                        }
                                        break;
                                    case 2: // places_lived
                                        structuredData.places_lived.push(fieldData);
                                        break;
                                    case 3: // contact_and_basic_info
                                        structuredData.contact_and_basic_info.push(fieldData);
                                        break;
                                    case 4: // family_and_relationships
                                        structuredData.family_and_relationships.push(fieldData);
                                        break;
                                    case 5: // details_about_you
                                        structuredData.details_about_you.push(fieldData);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        });
                    });
                });
            });

            // Handle life events specifically for collection 207
            if (index === collectionNumbers.indexOf(207)) {
                const lifeEvents = parseLifeEvents(response);
                structuredData.life_events = lifeEvents;
            }
        });

        log("info", `structuredData:`, structuredData, "getAboutDetails");
        return structuredData;
    } catch (error) {
        log("warn", `Error fetching data:`, error, "getAboutDetails");
        return null;
    }
}

// Life events parser
function parseLifeEvents(response) {
    const lifeEvents = [];
    const timelineSections = response?.data?.user?.about_app_sections?.nodes[0]?.activeCollections?.nodes[0]?.style_renderer?.user?.timeline_sections?.nodes ?? [];

    timelineSections.forEach((section) => {
        if (section?.year_overview?.items?.nodes?.length > 0) {
            section.year_overview.items.nodes.forEach((item) => {
                const event = {
                    year: section?.year ?? null,
                    text: item?.title?.text ?? "No title available",
                    url: item?.url ?? "#",
                    icon: item?.icon?.uri ?? "#",
                };
                lifeEvents.push(event);
            });
        }
    });

    return lifeEvents;
}



function formatTimestamp(timestamp) {
    if (!timestamp) return null;
    const date = new Date(timestamp * 1000); // Convert to milliseconds
  
    // Define arrays for days and months
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    // Extract components using local time
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0"); // 24-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    // Return formatted string
    return `${dayOfWeek} ${day} ${month} ${year} at ${hours}:${minutes}`;
  }
  
  function extractAuthorInfo(authorData) {
    return {
      typename: authorData?.__typename ?? "Unknown",
      name: authorData?.name ?? "Unknown",
      gender: authorData?.gender ?? "Unknown",
      url: authorData?.url ?? "Unknown",
      isVerified: authorData?.is_verified ?? false,
    };
  }
  
  function mapReactionIDToName(reactionID) {
    const reactionsMap = {
      115940658764963: "Haha",
      1635855486666999: "Like",
      444813342392137: "Angry",
      908563459236466: "Sad",
      1678524932434102: "Love",
      478547315650144: "Wow",
      613557422527858: "Care",
    };
    return reactionsMap[reactionID] || "Unknown";
  }
  
  // // // Utils // // //
  
  // // // Parsers // // //
  
  function parseCommentsResponse(response) {
    // Ensure parsedComments is initialized as an array
    const parsedComments = [];
  
    // Use optional chaining to safely access nested properties
    const commentEdges =
      response?.data?.node?.comment_rendering_instance_for_feed_location?.comments
        ?.edges || [];
  
    commentEdges.forEach((edge) => {
      const commentNode = edge?.node;
  
      // Safely access properties and provide fallback values
      if (commentNode) {
        parsedComments.push({
          user: {
            id: commentNode.author?.id ?? "Unknown",
            name: commentNode.author?.name ?? "Anonymous",
            profile_url: commentNode.author?.url ?? "#",
            profile_picture:
              commentNode.author?.profile_picture_depth_0?.uri ?? null,
          },
          comment: commentNode.body?.text ?? "No text available", // Prevent error on null text
          publish_date:
            formatTimestamp(commentNode?.created_time ?? 0) ?? "Unknown",
          reactions_count: commentNode.feedback?.reactors?.count_reduced ?? 0,
          top_reactions:
            commentNode.feedback?.top_reactions?.edges?.map((reactionEdge) => ({
              id: reactionEdge?.node?.id ?? "Unknown",
              reaction: mapReactionIDToName(reactionEdge?.node?.id),
              count: reactionEdge?.reaction_count ?? 0,
            })) ?? [],
          replies_count: commentNode.feedback?.replies_fields?.total_count ?? 0,
          url: commentNode.feedback?.url ?? "#",
        });
      }
    });
  
    // Extract next cursor for pagination
    const nextCursor = response?.data?.node
      ?.comment_rendering_instance_for_feed_location?.comments?.page_info
      ?.has_next_page
      ? response?.data?.node?.comment_rendering_instance_for_feed_location
          ?.comments?.page_info?.end_cursor
      : null;
  
    return { parsedComments, nextCursor };
  }
  
  function parseReactionsResponse(response, isFirstFetch) {
    const parsedData = {
      summary: [],
      total_reactions: 0, // Initialize total count
      details: [],
    };
  
    // Safely parse top reactions summary only on first fetch
    if (isFirstFetch) {
      const topReactionsSummary =
        response?.data?.node?.top_reactions?.summary ?? [];
  
      topReactionsSummary.forEach((reaction) => {
        if (reaction?.reaction) {
          parsedData.summary.push({
            localized_name: reaction.reaction.localized_name ?? "Unknown",
            count: reaction.reaction_count ?? 0,
            reduced_count: reaction.reaction_count_reduced ?? 0,
            face_image_uri: reaction.reaction.face_image?.uri ?? null,
            reaction_id: reaction.reaction.id ?? "Unknown", // Save the reaction ID for matching
          });
          // Calculate total count only once
          parsedData.total_reactions += reaction.reaction_count ?? 0;
        }
      });
    }
  
    // Safely parse reactors and their individual details
    const reactors = response?.data?.node?.reactors?.edges ?? [];
  
    reactors.forEach((reactorEdge) => {
      const reactor = reactorEdge?.node;
      const reactionInfo = reactorEdge?.feedback_reaction_info;
  
      if (reactor && reactionInfo) {
        const reactionId = reactionInfo.id ?? "Unknown";
        const reactionUri = reactionInfo.face_image?.uri ?? null;
  
        // Find localized name for the reaction using the reaction ID
        const localizedName = mapReactionIDToName(reactionId);
  
        parsedData.details.push({
          user_id: reactor.id ?? "Unknown",
          name: reactor.name ?? "Anonymous",
          profile_url: reactor.profile_url ?? "#",
          profile_picture: reactor.profile_picture?.uri ?? null,
          reaction: localizedName,
          reaction_uri: reactionUri,
          mutual_friends_count: reactor.mutual_friends?.count ?? 0,
          can_viewer_message: reactor.can_viewer_message ?? false,
          friendship_status: reactor.friendship_status ?? "Unknown",
          subscribe_status: reactor.subscribe_status ?? "Unknown",
        });
      }
    });
  
    // Extract next cursor for pagination
    const nextCursor = response?.data?.node?.reactors?.page_info?.has_next_page
      ? response?.data?.node?.reactors?.page_info?.end_cursor
      : null;
  
    return { parsedData, nextCursor };
  }
  
  function parseReshareResponse(response) {
    const parsedReshares = [];
  
    // Safely access the reshare edges
    const reshareEdges =
      response?.data?.feedback?.reshares?.edges ||
      response?.data?.node?.reshares?.edges ||
      [];
  
    reshareEdges.forEach((edge) => {
      // Safely access actor details
      const actor =
        edge?.node?.comet_sections?.context_layout?.story?.comet_sections
          ?.actor_photo?.story?.actors?.[0];
  
      if (actor) {
        parsedReshares.push({
          id: actor.id ?? "Unknown",
          name: actor.name ?? "Anonymous",
          profilePicture: actor.profile_picture?.uri ?? null,
        });
      }
    });
  
    // Safely extract the next cursor for pagination
    let nextCursor = null;
  
    if (
      response?.data?.feedback?.reshares?.page_info?.has_next_page ||
      response?.data?.node?.reshares?.page_info?.has_next_page
    ) {
      nextCursor =
        response?.data?.feedback?.reshares?.page_info?.end_cursor ??
        response?.data?.node?.reshares?.page_info?.end_cursor ??
        null;
    }
  
    return { parsedReshares, nextCursor };
  }
  
  function parsePostResponse(response) {
    const postEdges = response?.data?.node?.timeline_list_feed_units?.edges ?? [];
    const parsedPosts = [];
  
    postEdges.forEach((edge) => {
      const postNode = edge?.node ?? {};
      const postData = {
        id: postNode?.comet_sections?.content?.story?.post_id ?? null,
        creationTime: formatTimestamp(
          postNode?.comet_sections?.context_layout?.story?.comet_sections
            ?.metadata?.[0]?.story?.creation_time
        ),
        url: postNode?.comet_sections?.context_layout?.story?.comet_sections
          ?.metadata?.[0]?.story?.url,
        text: postNode?.comet_sections?.content?.story?.message?.text,
        postedBy: extractAuthorInfo(
          postNode?.comet_sections?.content?.story?.actors[0]
        ),
        privacy:
          postNode?.comet_sections?.context_layout?.story?.comet_sections
            ?.metadata?.[1]?.story?.privacy_scope?.icon_image?.name,
        media: {
          id:
            postNode?.comet_sections?.content?.story?.attachments[0]?.styles
              ?.attachment?.media?.id ?? null,
          caption:
            postNode?.comet_sections?.content?.story?.attachments[0]?.styles
              ?.attachment?.media?.accessibility_caption ?? null,
          url:
            postNode?.comet_sections?.content?.story?.attachments[0]?.styles
              ?.attachment?.media?.url ?? null,
        },
        engagements: {
          comments: {
            total_comments:
              postNode?.comet_sections?.feedback?.story?.story_ufi_container
                ?.story?.feedback_context?.feedback_target_with_context
                ?.comment_rendering_instance?.comments?.total_count ?? 0,
            topLevelComment:
              postNode?.comet_sections?.feedback?.story?.story_ufi_container
                ?.story?.feedback_context?.interesting_top_level_comments?.[0]
                ?.comment?.body?.text ?? null,
            topLevelCommentAuthor: extractAuthorInfo(
              postNode?.comet_sections?.feedback?.story?.story_ufi_container
                ?.story?.feedback_context?.interesting_top_level_comments?.[0]
                ?.comment?.author
            ),
            details: [],
          },
          reactions: {
            total_reactions:
              postNode?.comet_sections?.feedback?.story?.story_ufi_container
                ?.story?.feedback_context?.feedback_target_with_context
                ?.comet_ufi_summary_and_actions_renderer?.feedback?.reaction_count
                ?.count ?? 0,
            details: [],
            summary: [],
          },
          reshares: {
            total_reshares:
              postNode?.comet_sections?.feedback?.story?.story_ufi_container
                ?.story?.feedback_context?.feedback_target_with_context
                ?.comet_ufi_summary_and_actions_renderer?.feedback?.share_count
                ?.count ?? 0,
            details: [],
          },
        },
      };
      parsedPosts.push(postData);
    });
  
    const nextCursor =
      postEdges.length > 0 ? postEdges[postEdges.length - 1].cursor : null;
  
    return { parsedPosts, nextCursor };
  }
  // // // Parsers // // //
  
  // // // Functions // // //
  async function sendGraphQLRequest(variables, searchParams, callback) {
    const friendlyName = searchParams.get("fb_api_req_friendly_name");
    const lsd = searchParams.get("fb_api_req_friendly_name");
  
    // Check for `lsd` failure count and skip request if over the limit
    if (lsdFailureCounts[lsd] && lsdFailureCounts[lsd] >= MAX_FAILURES) {
      log(
        "warn",
        `Skipping request for ${friendlyName} due to repeated errors`,
        null,
        "sendGraphQLRequest"
      );
      return Promise.resolve(0);
    }
  
    log("info", "Sending GraphQL Request", { variables }, "sendGraphQLRequest");
  
    // Return a Promise that delays execution before sending the request
    return new Promise((resolve) => {
      setTimeout(() => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://www.facebook.com/api/graphql/", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.6");
        xhr.setRequestHeader("Priority", "u=1, i");
        xhr.setRequestHeader("x-asbd-id", "129477");
        xhr.setRequestHeader("x-fb-friendly-name", friendlyName);
        xhr.setRequestHeader("x-fb-lsd", lsd);
  
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            let response;
            try {
              response = JSON.parse(xhr.responseText);
  
              // Check if the response contains errors
              if (response.errors || !response.data) {
                log(
                  "error",
                  "GraphQL response contains errors or missing data",
                  response.errors,
                  "sendGraphQLRequest"
                );
  
                // Track and update failure count for the `lsd`
                lsdFailureCounts[lsd] = (lsdFailureCounts[lsd] || 0) + 1;
  
                log(
                  "info",
                  `${friendlyName}:`,
                  lsdFailureCounts[lsd],
                  "sendGraphQLRequest"
                );
                // Resolve with `0` to indicate error and continue execution
                resolve(callback(0));
                return;
              } else {
                // Successful response, reset the failure count
                lsdFailureCounts[lsd] = 0;
              }
            } catch (error) {
              log(
                "error",
                "JSON parsing error",
                error.message,
                "sendGraphQLRequest"
              );
  
              // Handle partial parsing if possible
              let errorPosition = error.message.match(/position (\d+)/);
              if (errorPosition) {
                let trimmedResponse = xhr.responseText.substring(
                  0,
                  errorPosition[1]
                );
                try {
                  response = JSON.parse(trimmedResponse);
                } catch (secondError) {
                  log(
                    "error",
                    "Second attempt to parse JSON response failed",
                    secondError.message,
                    "sendGraphQLRequest"
                  );
  
                  // Increment the failure count for the `lsd`
                  lsdFailureCounts[lsd] = (lsdFailureCounts[lsd] || 0) + 1;
  
                  resolve(callback(0));
                  return;
                }
              } else {
                log(
                  "error",
                  "Error position not found in the error message.",
                  null,
                  "sendGraphQLRequest"
                );
  
                // Increment the failure count for the `lsd`
                lsdFailureCounts[lsd] = (lsdFailureCounts[lsd] || 0) + 1;
  
                resolve(callback(0));
                return;
              }
            }
  
            log("info", "Response from GraphQL", response, "sendGraphQLRequest");
            resolve(callback(response));
          }
        };
  
        // Send the request
        xhr.send(searchParams);
      }, REQUEST_DELAY); // Delay the request by `REQUEST_DELAY` milliseconds
    });
  }
  
  function getComments(postID, maxComments) {
    log(
      "info",
      "Start fetching comments",
      { postID, maxComments },
      "getComments"
    );
    const feedbackTargetID = btoa(`feedback:${postID}`);
    let cursor = null;
    const commentsData = [];
  
    async function fetchMore() {
      const variables = {
        count: 10,
        commentsAfterCount: -1,
        commentsAfterCursor: cursor,
        commentsBeforeCount: null,
        commentsIntentToken: null,
        feedLocation: "PERMALINK",
        focusCommentID: null,
        scale: 1,
        useDefaultActor: false,
        id: `${feedbackTargetID}`,
      };
  
      const searchParams = new URLSearchParams({
        av: profileData.ID,
        __aaid: "0",
        __user: profileData.ID,
        __a: "1",
        __req: "18",
        __hs: "19996.HYP:comet_pkg.2.1..2.1",
        dpr: "1",
        __ccg: "EXCELLENT",
        __rev: "1016908551",
        __s: "8e9gx7:zxw32m:uux3of",
        __hsi: "7420340575161077905",
        __comet_req: "15",
        fb_dtsg: profileData.fb_dtsg,
        jazoest: "25299",
        lsd: "UDz5O0-CoWeHyeItEtl-11",
        __spin_r: "1016908551",
        __spin_b: "trunk",
        __spin_t: "1727682671",
        fb_api_caller_class: "RelayModern",
        fb_api_req_friendly_name: "CommentsListComponentsPaginationQuery",
        variables: JSON.stringify(variables),
        doc_id: "7604933456273464",
      });
  
      const { parsedComments, nextCursor } = await sendGraphQLRequest(
        variables,
        searchParams,
        (response) => (response ? parseCommentsResponse(response) : 0) // Skip parsing if response is 0
      );
  
      // Check if the result is 0 before proceeding
      if (!parsedComments) {
        log(
          "warn",
          "Skipping parsing due to error in response",
          null,
          "getComments.fetchMore"
        );
        return;
      }
  
      commentsData.push(...parsedComments);
      cursor = nextCursor;
  
      if (nextCursor && commentsData.length < maxComments) {
        await fetchMore();
      }
    }
  
    return fetchMore().then(() => commentsData.slice(0, maxComments));
  }
  
  function getReactions(postID, maxReactions) {
    log(
      "info",
      "Start fetching reactions",
      { postID, maxReactions },
      "getReactions"
    );
    const feedbackTargetID = btoa(`feedback:${postID}`);
    let cursor = null;
    let isFirstFetch = true;
    const reactionsData = {
      summary: [],
      details: [],
      total_reactions: 0,
    };
  
    async function fetchMore() {
      const variables = isFirstFetch
        ? { feedbackTargetID: `${feedbackTargetID}`, scale: 1 } // First request variables without cursor
        : {
            count: 10,
            cursor: cursor,
            feedbackTargetID: `${feedbackTargetID}`,
            reactionID: null,
            scale: 1,
            id: `${feedbackTargetID}`,
          };
  
      const docId = isFirstFetch
        ? "7934369403323688" // First request doc_id
        : "7443538865752313"; // Subsequent requests doc_id
  
      const searchParams = new URLSearchParams({
        av: profileData.ID,
        __aaid: "0",
        __user: profileData.ID,
        __a: "1",
        __req: "7n",
        __hs: "19993.HYP:comet_pkg.2.1..2.1",
        dpr: "1",
        __ccg: "EXCELLENT",
        __rev: "1016857063",
        __s: "v1fqrx:e4l2e0:ui21fo",
        __hsi: "7419190418064505827",
        __comet_req: "15",
        fb_dtsg: profileData.fb_dtsg,
        jazoest: "25424",
        lsd: "5gDTjwGlXhRzgCp5caMUK_",
        __spin_r: "1016857063",
        __spin_b: "trunk",
        __spin_t: "1727414880",
        fb_api_caller_class: "RelayModern",
        fb_api_req_friendly_name: "CometUFIReactionsDialogQuery",
        variables: JSON.stringify(variables),
        server_timestamps: "true",
        doc_id: docId,
      });
  
      const { parsedData, nextCursor } = await sendGraphQLRequest(
        variables,
        searchParams,
        (response) =>
          response ? parseReactionsResponse(response, isFirstFetch) : 0
      );
  
      // Check if the result is 0 before proceeding
      if (!parsedData) {
        log(
          "warn",
          "Skipping parsing due to error in response",
          null,
          "getReactions.fetchMore"
        );
        return;
      }
  
      if (isFirstFetch) {
        reactionsData.summary = parsedData.summary;
        reactionsData.total_reactions = parsedData.total_reactions;
        isFirstFetch = false;
      }
      reactionsData.details.push(...parsedData.details);
      cursor = nextCursor;
  
      if (nextCursor && reactionsData.details.length < maxReactions) {
        await fetchMore();
      }
    }
  
    return fetchMore().then(() => reactionsData);
  }
  
  function getReshares(postID, maxReshares) {
    log(
      "info",
      "Start fetching reshares",
      { postID, maxReshares },
      "getReshares"
    );
    const feedbackTargetID = btoa(`feedback:${postID}`);
    let cursor = null;
    let isFirstFetch = true;
    const resharesData = [];
  
    async function fetchMore() {
      const variables = isFirstFetch
        ? {
            feedbackID: `${feedbackTargetID}`,
            feedbackSource: 1,
            feedLocation: "SHARE_OVERLAY",
            privacySelectorRenderLocation: "COMET_STREAM",
            renderLocation: "reshares_dialog",
            scale: 1,
            __relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider: true,
            __relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider: false,
            __relay_internal__pv__IsWorkUserrelayprovider: false,
            __relay_internal__pv__IsMergQAPollsrelayprovider: false,
            __relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider: false,
            __relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider: false,
            __relay_internal__pv__CometUFIShareActionMigrationrelayprovider: true,
            __relay_internal__pv__IncludeCommentWithAttachmentrelayprovider: true,
            __relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider: true,
          } // First request variables without cursor
        : {
            count: 1,
            cursor: cursor,
            feedLocation: "SHARE_OVERLAY",
            feedbackSource: 1,
            focusCommentID: null,
            privacySelectorRenderLocation: "COMET_STREAM",
            renderLocation: "reshares_dialog",
            scale: 1,
            useDefaultActor: false,
            id: `${feedbackTargetID}`,
            __relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider: true,
            __relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider: false,
            __relay_internal__pv__IsWorkUserrelayprovider: false,
            __relay_internal__pv__IsMergQAPollsrelayprovider: false,
            __relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider: false,
            __relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider: false,
            __relay_internal__pv__CometUFIShareActionMigrationrelayprovider: true,
            __relay_internal__pv__IncludeCommentWithAttachmentrelayprovider: true,
            __relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider: true,
          };
      const docId = isFirstFetch ? "27250809307898783" : "9261416217225381";
  
      const searchParams = new URLSearchParams({
        av: profileData.ID,
        __aaid: "0",
        __user: profileData.ID,
        __a: "1",
        __req: "18",
        __hs: "19996.HYP:comet_pkg.2.1..2.1",
        dpr: "1",
        __ccg: "EXCELLENT",
        __rev: "1016908551",
        __s: "8e9gx7:zxw32m:uux3of",
        __hsi: "7420340575161077905",
        __comet_req: "15",
        fb_dtsg: profileData.fb_dtsg,
        jazoest: "25299",
        lsd: "UDz5O0-CoWeHyeItEtl-11",
        __spin_r: "1016908551",
        __spin_b: "trunk",
        __spin_t: "1727682671",
        fb_api_caller_class: "RelayModern",
        fb_api_req_friendly_name: "CometResharesFeedPaginationQuery",
        variables: JSON.stringify(variables),
        doc_id: docId,
      });
  
      const { parsedReshares, nextCursor } = await sendGraphQLRequest(
        variables,
        searchParams,
        (response) =>
          response ? parseReshareResponse(response, isFirstFetch) : 0
      );
  
      // Check if the result is 0 before proceeding
      if (!parsedReshares) {
        log(
          "warn",
          "Skipping parsing due to error in response",
          null,
          "getReshares.fetchMore"
        );
        return;
      }
  
      resharesData.push(...parsedReshares);
      cursor = nextCursor;
  
      if (nextCursor && resharesData.length < maxReshares) {
        await fetchMore();
      }
    }
  
    return fetchMore().then(() => resharesData.slice(0, maxReshares));
  }
  
  async function getEngagementData(postID) {
    log(
      "info",
      "Fetching engagement data started",
      { postID },
      "getEngagementData"
    );
    const engagementData = {
      postID: postID,
      comments: [],
      reactions: {
        summary: [],
        details: [],
        total_reactions: 0,
      },
      reshares: [],
    };
  
    try {
      console.log("\n");
      // Fetch Comments
      log("info", "Fetching comments...", null, "getComments");
      engagementData.comments = await getComments(postID, maxEngagmentsDetails);
      log(
        "info",
        "Comments fetched successfully",
        { comments: engagementData.comments.length },
        "getComments"
      );
  
      console.log("\n");
      // Fetch Reactions
      log("info", "Fetching reactions...", null, "getReactions");
      const reactionsData = await getReactions(postID, maxEngagmentsDetails);
      engagementData.reactions.summary = reactionsData.summary;
      engagementData.reactions.details = reactionsData.details;
      engagementData.reactions.total_reactions = reactionsData.total_reactions;
      log(
        "info",
        "Reactions fetched successfully",
        { reactions: engagementData.reactions.details.length },
        "getReactions"
      );
  
      console.log("\n");
      // Fetch Reshares
      log("info", "Fetching reshares...", null, "getReshares");
      engagementData.reshares = await getReshares(postID, maxEngagmentsDetails);
      log(
        "info",
        "Reshares fetched successfully",
        { reshares: engagementData.reshares.length },
        "getReshares"
      );
  
      console.log("\n");
      log(
        "info",
        "Engagement data fetched successfully",
        engagementData,
        "getEngagementData"
      );
  
      return engagementData;
    } catch (error) {
      log("error", "Error fetching engagement data", error, "getEngagementData");
      // Return the initial engagement data even in case of an error
      return engagementData;
    }
  }
  
  async function fetchEngagementData(postData) {
    try {
      log(
        "info",
        "Fetching engagement data for post",
        { postID: postData.id },
        "fetchEngagementData"
      );
      const engagementData = await getEngagementData(postData.id);
      log("info", "Engagements data:", engagementData, "fetchEngagementData");
      // Append engagement data to postData
      postData.engagements.comments.details = engagementData?.comments ?? [];
      postData.engagements.reactions.details =
        engagementData?.reactions?.details ?? [];
      postData.engagements.reactions.total_reactions =
        engagementData?.reactions?.total_reactions ?? 0;
      postData.engagements.reactions.summary =
        engagementData?.reactions?.summary ?? [];
      postData.engagements.reshares.details = engagementData?.reshares ?? [];
  
      log(
        "info",
        "Engagement data appended to post data",
        postData,
        "fetchEngagementData"
      );
  
      console.log("\n");
      console.log("\n");
      console.log("\n");
      return;
    } catch (error) {
      log(
        "error",
        "Error fetching engagements data",
        error,
        "fetchEngagementData"
      );
    }
  }
  
  async function getUserPostsData(User, maxPosts, maxEngagmentsDetails) {
    log(
      "info",
      "Fetching posts data started",
      { User, maxPosts, maxEngagmentsDetails },
      "getUserPostsData"
    );
  
    let allPosts = [];
    let cursor = null;
  
    const fetchPosts = async () => {
      const variables = {
        afterTime: null,
        beforeTime: null,
        count: 3,
        cursor: cursor,
        feedLocation: "TIMELINE",
        feedbackSource: 0,
        focusCommentID: null,
        memorializedSplitTimeFilter: null,
        omitPinnedPost: true,
        postedBy: null,
        privacy: null,
        privacySelectorRenderLocation: "COMET_STREAM",
        renderLocation: "timeline",
        scale: 1,
        stream_count: 1,
        taggedInOnly: null,
        useDefaultActor: false,
        id: `${targetUserData.ID}`,
        __relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider: false,
        __relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider: false,
        __relay_internal__pv__IsWorkUserrelayprovider: false,
        __relay_internal__pv__IsMergQAPollsrelayprovider: false,
        __relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider: false,
        __relay_internal__pv__CometUFIShareActionMigrationrelayprovider: true,
        __relay_internal__pv__IncludeCommentWithAttachmentrelayprovider: true,
        __relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider: true,
        __relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider: false,
      };
  
      const searchParams = new URLSearchParams({
        av: profileData.ID,
        __aaid: "0",
        __user: profileData.ID,
        __a: "1",
        __req: "u",
        __hs: "19991.HYP:comet_pkg.2.1..2.1",
        dpr: "1",
        __ccg: "MODERATE",
        __rev: "1016820347",
        __s: "ijcjet:vn5d95:em5tab",
        __hsi: "7418855109624003320",
        __comet_req: "15",
        fb_dtsg: profileData.fb_dtsg,
        jazoest: "25516",
        lsd: "MXTtrVcJK2bNVS4wTMYKsa",
        __spin_r: "1016820347",
        __spin_b: "trunk",
        __spin_t: "1727336810",
        fb_api_caller_class: "RelayModern",
        fb_api_req_friendly_name: "ProfileCometAboutAppSectionQuery",
        variables: JSON.stringify(variables),
        server_timestamps: "true",
        doc_id: "8277439662341249",
      });
      log("info", "Sending request:", allPosts.length + 1, "getUserPostsData");
      const { parsedPosts, nextCursor } = await sendGraphQLRequest(
        variables,
        searchParams,
        (response) => parsePostResponse(response)
      );
  
      if (parsedPosts.length > 0) {
        log(
          "info",
          "Posts Data fetched successfully",
          { Post: parsedPosts },
          "getUserPostsData"
        );
        console.log("\n\n");
        for (const post of parsedPosts) {
          // Fetch and append engagement data
          allPosts.push(post);
          await fetchEngagementData(post);
  
          // Stop fetching posts if limit reached
          if (allPosts.length >= totalPosts) break;
        }
  
        cursor = nextCursor;
  
        // If limit not reached and cursor exists, fetch more posts
        if (allPosts.length < totalPosts && cursor) {
          await fetchPosts();
        } else {
          log(
            "info",
            "All posts fetched with engagement data",
            allPosts,
            "getUserPostsData"
          );
        }
      } else {
        log("warn", "No posts found", null, "getUserPostsData");
      }
    };
  
    // Start fetching posts
    await fetchPosts();
  }
  
  // // // Functions // // //
  
  const totalPosts = 2;
  const maxEngagmentsDetails = 5;
  
  const MAX_FAILURES = 1; // Number of failures allowed before skipping the `lsd`
  const REQUEST_DELAY = 2000; // Delay in milliseconds before sending each request
  const lsdFailureCounts = {}; // Track problematic `lsd` values and their failure counts
  