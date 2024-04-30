import mongoose, { Schema } from "mongoose";

export const Basev2Schema: Schema = new mongoose.Schema({
    isDelete: Boolean,
    createTime: Date,
    updateTime: Date,
    isActive: Boolean,
})

