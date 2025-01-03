🚀 GitHub Unfollow Bot

This project automates the process of unfollowing users on GitHub who haven't followed you back. It leverages the GitHub API to retrieve your following and follower lists, compares them, and unfollows users who are not following you back.

📋 Features
Fetches your following and followers lists using the GitHub API.
Handles pagination to retrieve all users (more than 30).
Identifies users who haven't followed you back.
Automatically unfollows non-followers.

🛠 Technologies Used
Node.js: JavaScript runtime for building server-side applications.
Axios: For making API requests.
dotenv: To manage environment variables.

⚙️ Setup Instructions
1️⃣ Prerequisites
Make sure you have the following installed on your system:

    Node.js (v16 or higher)
    npm or yarn

A GitHub Personal Access Token with the user:follow scope.

2️⃣ Clone the Repository:

   `https://github.com/Sawrozzz/Github-automation-bot.git`
    cd Github-automation-bot

3️⃣ Install Dependencies:

   npm install

4️⃣ Create a .env File:

    GITHUB_TOKEN=your_personal_access_token
    GITHUB_USERNAME=your_github_username

🔐 Note:

      Replace your_personal_access_token with your actual GitHub token.
      Replace your_github_username with your GitHub username.

5️⃣ Run the Script
node main.js or you can use nodemon main.js.

📚 Example Output

   Found 5 users who haven't followed you back:


       ✅ Unfollowed user1
       ✅ Unfollowed user2
       ✅ Unfollowed user3
       ✅ Unfollowed user4
       ✅ Unfollowed user5
       ✅ Unfollow process completed.

🛡️ Important Notes
    Ensure your GitHub token has the user:follow scope to follow/unfollow users.
    Use this script responsibly to avoid rate-limiting or violating GitHub's terms of service.
