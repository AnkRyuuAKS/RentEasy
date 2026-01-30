import mongoose from "mongoose";
import Listing from "../models/listing_model.js"; // adjust path if needed
import dotenv from 'dotenv'
dotenv.config();
const MONGO_URI = process.env.MONGOOSE_SECRET_KEY; 

const seedListings = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");

        //i can create more if asked
        const listings = [
            {
                owner: "697cdd5f65bf5c40f96d1546", 
                title: "Cozy Single Room",
                address: "Bhubaneswar, Odisha",
                rent: 5000,
                perks: ["WiFi", "Water", "Parking"],
                type: "single",
                maxGuests: 1,
                description: "Perfect for students",
                status: "approved",
                images: [
                    "https://example.com/img1.jpg",
                    "https://example.com/img2.jpg"
                ]
            },
            {
                owner: "697cdd5f65bf5c40f96d1546",
                title: "Spacious Double Room",
                address: "Cuttack, Odisha",
                rent: 8000,
                perks: ["WiFi", "AC"],
                type: "double",
                maxGuests: 2,
                status: "approved",
                images: ["https://example.com/img3.jpg"]
            },
            {
                owner: "697cdd5f65bf5c40f96d1546",
                title: "Family Stay",
                address: "Puri, Odisha",
                rent: 12000,
                perks: ["Kitchen", "Parking"],
                type: "family",
                status: "approved",
                maxGuests: 4
            },
            {
                owner: "697cdde15a2924574dec6ba3",
                title: "Luxury Suite",
                address: "Bangalore, Karnataka",
                rent: 20000,
                type: "suite",
                perks: ["AC", "WiFi", "TV"],
                status: "approved",
                maxGuests: 3
            },
            {
                owner: "697cdde15a2924574dec6ba3",
                title: "Budget Room",
                address: "Delhi",
                status: "approved",
                rent: 4000
            },
            {
                owner: "697cdde15a2924574dec6ba3",
                title: "Student PG",
                address: "Noida",
                rent: 6000,
                status: "approved",
                perks: ["WiFi"]
            },
            {
                owner: "697cdd5f65bf5c40f96d1546",
                title: "Office Stay",
                address: "Gurgaon",
                status: "approved",
                rent: 9000
            },
            {
                owner: "697cdd5f65bf5c40f96d1546",
                title: "Peaceful Home",
                address: "Pune",
                status: "approved",
                rent: 10000
            },
            {
                owner: "697cdd5f65bf5c40f96d1546",
                title: "City Center Room",
                address: "Mumbai",
                status: "approved",
                rent: 15000
            },
            {
                owner: "697cdd5f65bf5c40f96d1546",
                title: "Affordable Stay",
                address: "Hyderabad",
                status: "approved",
                rent: 7000
            }
        ];

        await Listing.insertMany(listings);
        console.log("Listings seeded successfully");

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedListings();
