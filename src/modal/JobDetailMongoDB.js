import {MongoClient} from 'mongodb';

const uri = "mongodb+srv://maxventurenix:Max135798642!@cluster0.xlb36qq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

export async function addJobDetail(jobDetail) {
    try {
        const database = client.db("jobsdb_scraping");
        const jobDetailsCollection = database.collection("job_details");

        const result = await jobDetailsCollection.insertOne(jobDetail);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // await client.close();
    }
}

export async function addJobDetailList(jobDetailList) {
    try {
        const database = client.db("jobsdb_scraping");
        const jobDetailsCollection = database.collection("job_details");

        console.log("Adding....");
        const result = await jobDetailsCollection.insertMany(jobDetailList);

        console.log(`JobDetails added successfully.`);
    } finally {
        // await client.close();
    }
}

export async function getJobDetailList(queryParams) {
    try {
        const { salaryRange, jobSubClassification, startDate, endDate } = queryParams;

        const database = client.db("jobsdb_scraping");
        const jobDetailsCollection = database.collection("job_details");

        let pipeline = [];

        // 处理 salaryRange
        if (salaryRange) {
            const [minSalary, maxSalary] = salaryRange.split('-').map(Number);
            if (!isNaN(minSalary) && !isNaN(maxSalary)) {
                pipeline.push({
                    $addFields: {
                        salaryParts: {
                            $map: {
                                input: { $split: ["$salaryRange", "-"] },
                                as: "part",
                                in: { $toInt: "$$part" }
                            }
                        }
                    }
                });
                pipeline.push({
                    $match: {
                        $expr: {
                            $and: [
                                { $gte: [{ $arrayElemAt: ["$salaryParts", 0] }, minSalary] },
                                { $lte: [{ $arrayElemAt: ["$salaryParts", 1] }, maxSalary] }
                            ]
                        }
                    }
                });
            } else {
                throw new Error('Invalid salary range format');
            }
        }

        // 处理 jobSubClassification
        if (jobSubClassification) {
            pipeline.push({
                $match: { jobSubClassification }
            });
        }

        // 处理日期范围
        if (startDate || endDate) {
            let dateFilter = {};
            if (startDate) {
                dateFilter.$gte = new Date(startDate);
            }
            if (endDate) {
                dateFilter.$lte = new Date(endDate);
            }
            pipeline.push({
                $match: { date: dateFilter }
            });
        }

        // 执行聚合查询
        const jobDetails = await jobDetailsCollection.aggregate(pipeline).toArray();
        return jobDetails;
    } catch (error) {
        console.error('Error in getJobDetailList:', error);
        throw error;
    }
}
