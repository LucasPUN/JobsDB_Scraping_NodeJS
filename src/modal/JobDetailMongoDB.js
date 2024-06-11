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