import {MongoClient} from 'mongodb';

const uri = "mongodb+srv://maxventurenix:Max135798642!@cluster0.xlb36qq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

export async function addJobCount(jobCount) {
    try {
        const database = client.db("jobsdb_scraping");
        const jobDetailsCollection = database.collection("job_count");

        const result = await jobDetailsCollection.insertOne(jobCount);

        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // await client.close();
    }
}

export async function getJobCount(req, res) {
    try {
        const database = client.db("jobsdb_scraping");
        const jobDetailsCollection = database.collection("job_count");

        const jobCounts = await jobDetailsCollection.find({}).toArray();
        return jobCounts;
    } catch (error) {
        console.error("Error fetching job counts:", error);
        throw new Error("Failed to fetch JobCounts");
    }
}