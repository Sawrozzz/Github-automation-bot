import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const token = process.env.GITHUB_TOKEN;

const userName = process.env.GITHUB_USERNAME;

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${token}`,
  },
});

// Helper function to handle pagination
async function getAllPages(endpoint) {
  let results = [];
  let page = 1;

  try {
    while (true) {
      const { data } = await api.get(`${endpoint}?per_page=100&page=${page}`);
      results = results.concat(data);

      if (data.length < 100) break;
      page++;
    }
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.message);
    return [];
  }

  return results.map((user) => user.login);
}
//fucntion to get your following users
async function getYourFollowingUsers() {
  try {
    const followingUsers = await getAllPages(`/users/${userName}/following`);
    // console.log("Following Users:", followingUsers);
    return followingUsers || [];
  } catch (error) {
    console.error("Error fetching following users:", error.message);
  }
}

//function to get your follower User
async function getYourFollowerUsers() {
  try {
    const followerUsers = await getAllPages(`/users/${userName}/followers`);
    // console.log("Followers:", followerUsers);
    return followerUsers || [];
  } catch (error) {
    console.error("Error fetching follower users:", error.message);
    return [];
  }
}

// Unfollow a user
async function unfollowUser(username) {
  try {
    await api.delete(`/user/following/${username}`);
    console.log(`✅ Unfollowed ${username}`);
  } catch (error) {
    console.error(`❌ Failed to unfollow ${username}:`, error.message);
  }
}

//main fucntion to unfollow all the users who haven't follow you back.
async function unfollowNonFollowers() {
  try {
    const followingUsers = await getYourFollowingUsers();
    const followerUsers = await getYourFollowerUsers();

    if (!Array.isArray(followingUsers) || !Array.isArray(followerUsers)) {
      console.log("Error: Failed to retrieve users.");
      return;
    }

    if (!followingUsers.length || !followerUsers.length) {
      console.log("No users to unfollow.");
      return;
    }

    const nonFollowers = followingUsers.filter(
      (user) => !followerUsers.includes(user)
    );
    console.log(
      `Found ${nonFollowers.length} users who haven't followed you back.`
    );
    for (const user of nonFollowers) {
      await unfollowUser(user);
    }
    console.log("Successfully unfollow completed.");
  } catch (error) {
    console.error(error.message);
  }
}
unfollowNonFollowers();
