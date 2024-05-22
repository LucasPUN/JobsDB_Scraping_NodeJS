import * as JobDetailMongoDB from "../modal/JobDetailMongoDB.js"

export async function addJobDetail(req, res) {
    req.body.date = new Date(req.body.date);
    await JobDetailMongoDB.addJobDetail(req.body);
    res.status(200).json({msg: "JobDetail added successfully."});
}

export async function addJobDetailList(req, res) {
    // console.log(req.body)
    const jobDetailList = req.body.map((data) => {
        data.date = new Date(data.date);
        return data;
    })
    await JobDetailMongoDB.addJobDetailList(jobDetailList);
    res.status(200).json({msg: "JobDetails added successfully."});
}