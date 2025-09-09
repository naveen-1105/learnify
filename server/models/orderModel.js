import mongoose,{Document,Model,Schema} from "mongoose";

const orderSchema = new Schema({
    courseId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },
    payment_info: {
        type: Object,
    }
},{timestamps: true})

const orderModel = mongoose.model('Order',orderSchema)

export default orderModel