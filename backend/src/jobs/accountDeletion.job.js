import User from "../models/User.model.js";
const accountDelete = async (req, res) => {
    try {
        const users = await User.find({ status: "deletion_requested",
            deletionScheduledAt: { $lte: new Date() },
            deletionScheduledFor: {
                $lte: new Date()
            }
        });
        for (const user of users) {
            await User.findByIdAndDelete(user._id);
            console.log(
                `Deleted account: ${user._id}`
            );
        }
        res.status(200).json({ message: "Account deletion job completed successfully!" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = accountDelete;