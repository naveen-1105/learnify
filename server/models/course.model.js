import mongoose from "mongoose"


const commentReplies = new mongoose.Schema({
    user: Object,
    comment: String,
},{timestamps:true})

const reviewSchema =new mongoose.Schema({
    user: Object,
    rating:{
        type: Number,
        default: 0,
    },
    comment: String,
    commentReplies : [commentReplies]
},{timestamps: true})

const questionReplies = new mongoose.Schema({
    user: Object,
    answer: String,
},{timestamps:true})



const linkSchema =new mongoose.Schema({
    title: String,
    url: String,
},{timestamps:true})

const  QuestionSchema = new mongoose.Schema({
    user: Object,
    question: String,
    questionReplies: [questionReplies],
},{timestamps:true})

const courseDataSchema = new mongoose.Schema({
    videoUrl: String,
    title: String,
    videoSection: String,
    description: String,
    videoLength : Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [QuestionSchema]
})

const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    estimatedPrice:{
        type: Number,
    },
    thumbnail:{
        public_id:{
            type: String,
        },
        url:{
            type:String,
        },
    },
    tags:{
        type: String,
    },
    level:{
        type: String,
        required: true,
    },
    demoUrl:{
        type: String,
        required: true,
    },
    benefits:[{title: String}],
    prerequisites:[{title: String}],
    reviews: [reviewSchema],
    courseData:[courseDataSchema],
    ratings:{
        type:Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0,
    }
},{timeStamps: true})

const courseModel = mongoose.model("Course",courseSchema)
export default courseModel