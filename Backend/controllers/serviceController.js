const Service = require("../models/Service");
exports.getAll = async (req, res) => {
  try {
    const services = await Service.find().populate("createdBy", "name email");
    res.status(200).json(services);
  } catch (err) {
    console.error("Service Fetch Error:", err); // ADD THIS
    res.status(500).json({ error: "Failed to fetch services." });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Invalid user token." });
    }

    const service = await Service.create({
      title,
      description,
      link,
      createdBy: req.user._id,
    });
    res.status(201).json(service);
  } catch (err) {
    console.error("Service creation error:", err);
    res.status(500).json({ error: "Failed to create service." });
  }
};


