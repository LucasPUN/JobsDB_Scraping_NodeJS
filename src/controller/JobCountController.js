import * as JobCountMongoDB from "../modal/JobCountMongoDB.js"

export async function addJobCount(req, res) {
    req.body.date = new Date(req.body.date);
    await JobCountMongoDB.addJobCount(req.body);
    res.status(200).json({msg: "JobCount added successfully."});
}