const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

//Desc -> Get all bootcapms
//@routes GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    let query;

        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        query = await Bootcamp.find(JSON.parse(queryStr));
        const bootcamps = await query;
         
        if (!bootcamps) {
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({ succes: true,count: bootcamps.length, data: bootcamps });
})

//Desc -> Get single bootcapms
//@routes GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({ succes: true, data: bootcamp });

})

//Desc -> Create bootcapms
//@routes POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });     
});

//Desc -> Update bootcapms
//@routes PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
        }
        res.status(200).json({ success:true, data: bootcamp });
})

//Desc -> Delete bootcapms
//@routes DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({ success:true, data: bootcamp });
})

//Desc -> Get bootcapms within a radius
//@routes GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {

    const { zipcode, distance } = req.params;
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calc radius using radinas
    //Divide dist by radius of Earth
    const EarthRadius = 3963; //mi
    const radius = distance / EarthRadius;
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [ [lng, lat], radius] } }
    });
    res.status(200).json({
        succes: true,
        count: bootcamps.length,
        data: bootcamps
    });

})