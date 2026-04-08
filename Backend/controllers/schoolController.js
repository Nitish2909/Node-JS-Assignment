import mysql from "mysql2";
import db from "../config/database.js";

export const addSchoolController = (req, res) => {
  try {
    // console.log("API HIT", req.body);
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof name !== "string" || typeof address !== "string") {
      return res.status(400).json({ message: "Invalid data types" });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res
        .status(400)
        .json({ message: "Latitude and Longitude must be valid numbers" });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res
        .status(400)
        .json({
          message:
            "Latitude must be between -90 and 90 and Longitude must be between -180 and 180",
        });
    }

    //insert into database
    const sql =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES ( ?, ?, ?, ?)";

    db.query(sql, [name, address, lat, lng], (err, result) => {
      if (err) {
        console.error("Error inserting school into database:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res
        .status(201)
        .json({
          message: "School added successfully",
          id: result.insertedId,
          data: result,
        });
    });
  } catch (error) {
    console.error("Error adding school:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSchoolsController = (req, res) => {
  try {
    console.log("API HIT", req.query);
    const { latitude, longitude } = req.query;

    if (!latitude|| !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and Longitude are required" });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res
        .status(400)
        .json({ message: "Latitude and Longitude must be valid numbers" });
    }

    const sql = `SELECT name, address, latitude, longitude,

        (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance

        FROM schools

        ORDER BY distance ASC

        LIMIT 10;
`;

    db.query(sql, [lat, lng, lat], (err, results) => {
      if (err) {
        console.error("Error fetching schools from database:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({
        message: "Nearest Schools fetched successfully",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
