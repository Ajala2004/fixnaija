const User = require("../models/usermodel");
const Rating = require("../models/ratingmodel");

const addRating = async (req, res) => {
  const { providerId, email, rating } = req.body;

  try {
    // Check if the user has rated within the last month
    const lastRating = await Rating.findOne({ providerId, email })
      .sort({ ratedAt: -1 })
      .exec();

    if (lastRating && new Date() - new Date(lastRating.ratedAt) < 30 * 24 * 60 * 60 * 1000) {
      return res.status(400).json({ success: false, message: "You can only rate once per month." });
    }

    // Create a new rating
    const newRating = new Rating({ providerId, email, rating });
    await newRating.save();

    // Update provider's rating
    const provider = await User.findById(providerId);
    if (!provider) return res.status(404).json({ success: false, message: "Provider not found" });

    const totalRating = provider.rating * provider.ratingCount + rating;
    provider.ratingCount += 1;
    provider.rating = totalRating / provider.ratingCount;

    await provider.save();

    res.status(201).json({ success: true, message: "Rating added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = addRating 