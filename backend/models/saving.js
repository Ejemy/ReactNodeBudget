const mongoose = require("mongoose");


var savingsSchema = new mongoose.Schema({ _id: String, name: String, amount: Number, total: Number, date: String, type: String });

let Saving = mongoose.model("Saving", savingsSchema);

module.exports = Saving;