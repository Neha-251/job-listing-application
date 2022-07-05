const express = require("express");

const Job = require("../models/job.model");

const router = express.Router();



router.get("/", async (req, res) => {
    try {
        let page = req.query.page || 1
        let pagesize = req.query.pagesize || 5

        let role = req.query.role || "all"
        let experience = req.query.experience;
        let location = req.query.location;
        let salary = req.query.salary;

        let sort = req.query.sort;

        const skip = (page - 1) * pagesize;


        if (role !== "all") {
            const job = await Job.find({ role: { $eq: { role } } }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ role: { $eq: { role } } }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }
        else if (location !== "all") {
            const job = await Job.find({ location: { $eq: { location } } }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ location: { $eq: { location } } }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }
        else if (experience !== "all") {
            const job = await Job.find({ experience: { $eq: { experience } } }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ experience: { $eq: { experience } } }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }
        else if (salary !== "all") {
            const job = await Job.find({ salary: { $gte: { salary } } }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ salary: { $gte: { salary } } }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (salary !== "all" && location !== "all") {
            const job = await Job.find({ $and: [{ salary: { $gte: { salary } } }, { location: { $eq: { location } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ salary: { $gte: { salary } } }, { location: { $eq: { location } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (role !== "all" && location !== "all") {
            const job = await Job.find({ $and: [{ role: { $eq: { role } } }, { location: { $eq: { location } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ role: { $eq: { role } } }, { location: { $eq: { location } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (salary !== "all" && role !== "all") {
            const job = await Job.find({ $and: [{ salary: { $gte: { salary } } }, { role: { $eq: { role } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ salary: { $gte: { salary } } }, { role: { $eq: { role } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (experience !== "all" && role !== "all") {
            const job = await Job.find({ $and: [{ role: { $eq: { role } } }, { experience: { $eq: { experience } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ role: { $eq: { role } } }, { experience: { $eq: { experience } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (experience !== "all" && location !== "all") {
            const job = await Job.find({ $and: [{ location: { $eq: { location } } }, { experience: { $eq: { experience } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ location: { $eq: { location } } }, { experience: { $eq: { experience } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (experience !== "all" && salary !== "all") {
            const job = await Job.find({ $and: [{ salary: { $gte: { salary } } }, { experience: { $eq: { experience } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ salary: { $gte: { salary } } }, { experience: { $eq: { experience } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (salary !== "all" && location !== "all" && role !== "all") {
            const job = await Job.find({ $and: [{ salary: { $gte: { salary } } }, { location: { $eq: { location } } }, { role: { $eq: { role } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ salary: { $gte: { salary } } }, { location: { $eq: { location } } }, { role: { $eq: { role } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }


        else if (salary !== "all" && experience !== "all" && role !== "all") {
            const job = await Job.find({ $and: [{ salary: { $gte: { salary } } }, { experience: { $eq: { experience } } }, { role: { $eq: { role } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ salary: { $gte: { salary } } }, { experience: { $eq: { experience } } }, { role: { $eq: { role } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (salary !== "all" && location !== "all" && experience !== "all") {
            const job = await Job.find({ $and: [{ salary: { $gte: { salary } } }, { location: { $eq: { location } } }, { experience: { $eq: { experience } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ salary: { $gte: { salary } } }, { location: { $eq: { location } } }, { experience: { $eq: { experience } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }


        else if (role !== "all" && location !== "all" && experience !== "all") {
            const job = await Job.find({ $and: [{ role: { $eq: { role } } }, { location: { $eq: { location } } }, { experience: { $eq: { experience } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ role: { $eq: { role } } }, { location: { $eq: { location } } }, { experience: { $eq: { experience } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }

        else if (role !== "all" && location !== "all" && experience !== "all" && salary !== "all") {
            const job = await Job.find({ $and: [{ salary: { $gte: { salary } } }, { role: { $eq: { role } } }, { location: { $eq: { location } } }, { experience: { $eq: { experience } } }] }).skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find({ $and: [{ salary: { $gte: { salary } } }, { role: { $eq: { role } } }, { location: { $eq: { location } } }, { experience: { $eq: { experience } } }] }).countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }


        else {
            const job = await Job.find().skip(skip).limit(pagesize).sort({ _id: sort }).lean().exec();
            const totalPages = Math.ceil(await Job.find().countDocuments()) / pagesize;
            return res.status(200).send({ job, totalPages });
        }





        // if(role !== "all" && tag !== "all"){

        //     const product=await Product.find({$and: [{brand:{$eq:brand}}, {tag: {$eq: tag}}]}).skip(skip).limit(pagesize).sort({price:price}).lean().exec()
        //     const total_pages=Math.ceil((await Product.find({brand:{$eq:brand}}).countDocuments())/pagesize)
        //     return res.send({product, total_pages})
        // }
        // else if(tag !== "all" && brand == "all"){
        //     const product=await Product.find({tag: {$eq: tag}}).skip(skip).limit(pagesize).sort({price:price}).lean().exec()
        //     const total_pages=Math.ceil((await Product.find({tag:{$eq:tag}}).countDocuments())/pagesize)
        //     return res.send({product, total_pages})
        // }
        // else if(tag == "all" && brand !== "all"){
        //     const product=await Product.find({brand: {$eq: brand}}).skip(skip).limit(pagesize).sort({price:price}).lean().exec()
        //     const total_pages=Math.ceil((await Product.find({brand:{$eq:brand}}).countDocuments())/pagesize)
        //     return res.send({product, total_pages})
        // }
        // else{
        //     const product = await Product.find().skip(skip).limit(pagesize).lean().exec()
        //     const total_pages = Math.ceil((await Product.find().sort({price:price}).countDocuments())/pagesize)

        //     return res.send({product, total_pages})
        // }
    }
    catch (error) {
        res.send(error)
    }
})




module.exports = router;