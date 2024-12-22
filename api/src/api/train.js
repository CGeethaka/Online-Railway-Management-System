const express = require("express");
const { Op } = require('sequelize');
const { isUserAuthenticated } = require("../middlewares/auth");
const axios = require('axios');
const Train = require("../models/train");
const Booking = require("../models/booking");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trains
 *   description: Train Management
 */
router.post("/trains/distance", isUserAuthenticated, (req, res) => {

    const origin = req.body.data.origin,
        destination = req.body.data.destination;
    const apiKey = process.env.GOOGLE_MAP_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&mode=train&key=${apiKey}`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            const distanceText = response.data.rows[0].elements[0].distance.text;
            const distance = parseInt(distanceText.replace(/[^0-9.]/g, ''));
            const durationText = response.data.rows[0].elements[0].duration.text;
            const duration = parseInt(durationText.replace(/[^0-9.]/g, ''));
            res.json({
                distance: distance.toString(),
                duration: duration.toString()
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).json({ status: 'ERROR', message: 'Error fetching data' });
        });


});

router.post("/trains", isUserAuthenticated, async (req, res) => {

    const { trainNumber } = req.body.data;

    const alreadyExistsTrain = await Train.findOne({ where: { trainNumber } }).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );

    if (alreadyExistsTrain) {
        return res.status(409).json({ message: "Train with this Train Number already exists!" });
    }

    const newTrain = new Train(req.body.data);
    console.log(req.body.data)
    const savedTrain = await newTrain.save().catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: "Cannot register train at the moment!" });
    });

    if (savedTrain) res.json({ message: "Thanks for registering" });
});

router.get("/trains", async (req, res) => {
    let trains = [];
    try {

        if (req.query) {
            console.log(req.query)

            let whereClause = {};
            // Add conditions based on query parameters
            if (req.query.days) {
                whereClause.days = {
                    [Op.like]: `%${req.query.days}%`
                };
            }

            if (req.query.direction) {
                whereClause.direction = req.query.direction;
            }

            if (req.query.start && req.query.end) {
                whereClause.departure = {
                    [Op.between]: [req.query.start, req.query.end]
                };
            }

            if (req.query.startstation && req.query.endstation) {
                whereClause.stops = {
                    [Op.and]: [
                        { [Op.like]: `%${req.query.startstation}%` },
                        { [Op.like]: `%${req.query.endstation}%` }
                    ]
                };
            }

            // Fetch trains from the database based on the where clause
            trains = await Train.findAll({
                where: whereClause,
                order: [['departure', 'ASC']]
            });

        }
        else {
            // Fetch all trains from the database
            trains = await Train.findAll();

        }

        // Return the trains as the API response
        res.status(200).json(trains);
    } catch (error) {
        console.error("Error fetching trains:", error);
        res.status(500).json({ error: "Failed to fetch trains" });
    }
});

/**
 * @swagger
 * /trains/:trainNumber:
 *   get:
 *     summary: Get specific train
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/trains/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the train record based on trainNumber
        const train = await Train.findOne({
            where: { id },
        });

        // Return the trains as the API response
        res.status(200).json(train);
    } catch (error) {
        console.error("Error fetching trains:", error);
        res.status(500).json({ error: "Failed to fetch trains" });
    }
});

router.put("/trains/:trainNumber", async (req, res) => {
    try {
        const { trainNumber } = req.params;
        const updatedTrainData = req.body;

        // Find the train record based on trainNumber
        const train = await Train.findOne({
            where: { trainNumber },
        });

        if (!train) {
            return res.status(404).json({ error: "Train not found" });
        }

        // Update the train record with the new data
        await train.update(updatedTrainData);

        // Return the updated train as the API response
        res.status(200).json(train);
    } catch (error) {
        console.error("Error updating train:", error);
        res.status(500).json({ error: "Failed to update train" });
    }
});

router.delete("/trains/:trainNumber", async (req, res) => {
    try {
        const { trainNumber } = req.params;

        // Find the train record based on trainNumber
        const train = await Train.findOne({
            where: { trainNumber },
        });

        if (!train) {
            return res.status(404).json({ error: "Train not found" });
        }

        // Check if there are associated bookings
        const associatedBookings = await Booking.findAll({
            where: { trainNumber: train.trainNumber },
        });

        if (associatedBookings.length > 0) {
            return res.status(400).json({ error: "Train has associated bookings. Cannot delete." });
        }

        // Perform the actual deletion if no associated bookings found
        await train.destroy();

        // Return a success message as the API response
        res.status(200).json({ message: "Train deleted successfully" });
    } catch (error) {
        console.error("Error deleting train:", error);
        res.status(500).json({ message: "Failed to delete train" });
    }
});


module.exports = router;
