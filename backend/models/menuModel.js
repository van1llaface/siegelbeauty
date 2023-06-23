const mongoose = require("mongoose");


const menuSchema = mongoose.Schema({
    menuName: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [20, "Name cannot exceed 20 characters."]
    }
})

const Menu = mongoose.model("Menu", menuSchema)

module.exports = Menu;