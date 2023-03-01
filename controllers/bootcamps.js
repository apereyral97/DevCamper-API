const Bootcamp = require('../models/Bootcamp');

//Desc -> Get all bootcapms
//@routes GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = async (req, res, next) => {
    try {
      const bootcamps = await Bootcamp.find();
      res.status(200).json({ succes: true, data:{ count: bootcamps.length, bootcamps} });
    } catch (error) {
        res.status(400).json({ success: false });
    }
    
}

//Desc -> Get single bootcapms
//@routes GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({ succes: true, data: bootcamp });
      } catch (error) {
        res.status(400).json({ success: false });
      }
}

//Desc -> Create bootcapms
//@routes POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
        success: true,
        data: bootcamp
        });
        
    } catch (error) {
       res.status(400).json({ succes: false }); 
    }

};

//Desc -> Update bootcapms
//@routes PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!bootcamp) {
       return res.status(400).json({ success: false });

    }
    res.status(200).json({ success:true, data: bootcamp });
}

//Desc -> DElete bootcapms
//@routes DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
       return res.status(400).json({ success: false });

    }
    res.status(200).json({ success:true, data: bootcamp });
}