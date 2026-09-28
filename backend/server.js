
const app = require("./src/app");
const connectDB = require("./src/db/db");
const cron = require("node-cron");
const deleteExpiredAccounts = require("./src/jobs/accountDeletion.job");

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

// Account deletion scheduler
cron.schedule("0 * * * *", async () => {
    console.log("Checking for expired accounts...");
    await deleteExpiredAccounts();
});
