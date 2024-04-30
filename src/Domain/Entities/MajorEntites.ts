import { Basev2Schema } from './BaseEntitiesv2';
import mongoose, { model } from "mongoose";
import { BaseEntities } from "./BaseEntites";
import { IMajorEntities } from '../Interface/IMarjorEntities';
const MajorSchema = new mongoose.Schema({
    ...Basev2Schema.obj,
    majorName: {
        type: String
    },
})

export const Major = mongoose.model('Major', MajorSchema, "majors");