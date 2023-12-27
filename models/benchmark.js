import { Schema, model, models } from "mongoose";

const BenchSchema = new Schema({
    cpu_model: {
        type: String,
        required: [true, "CPU model is required"],
    },
    os_info: {
        type: String,
        required: [true, "OS Info is required"],
    },
    digits: {
        type: Number,
        required: [true, "Digits is required"],
    },
    single_core_score: {
        type: Number,
        required: [true, "Single core score is required"],
    },
    multi_core_score: {
        type: Number,
        required: [true, "Multi core score is required"],
    },
    speedup: {
        type: Number,
        required: [true, "Speedup is required"],
    },
    efficiency: {
        type: Number,
        required: [true, "Efficiency is required"],
    },
    cpu_utilization: {
        type: Number,
        required: [true, "CPU utilization is required"],
    },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    hostname: {
        type: String,
        required: [true, "Host name is required"],
    },
    processes: {
        type: Number,
        required: [true, "Processes is required"],
    },
    key: {
        type: String,
        required: [true, "Key is required"],
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [false, "Creator is not required"],
    },
});

const Bench = models.Bench || model("Bench", BenchSchema);

export default Bench;