const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
//Desc -> Get all bootcapms
//@routes GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
      const bootcamps = await Bootcamp.find();
      res.status(200).json({ succes: true, data:{ count: bootcamps.length, bootcamps} });
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

//Desc -> DElete bootcapms
//@routes DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    }
    res.status(200).json({ success:true, data: bootcamp });
})