import * as JobCountMongoDB from "../modal/JobCountMongoDB.js"

export async function addJobCount(req, res) {
    req.body.date = new Date(req.body.date);
    await JobCountMongoDB.addJobCount(req.body);
    res.status(200).json({msg: "JobCount added successfully."});
}

export async function getJobCount(req, res) {
    const jobCounts = await JobCountMongoDB.getJobCount(); // 假設有個函數從數據庫獲取所有 JobCount
    res.status(200).json(jobCounts);
}