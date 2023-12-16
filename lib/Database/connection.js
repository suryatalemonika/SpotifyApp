const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const DbConnection = async () => {
    try {
        const connect = await client.connect();
        const database = connect.db('spotify');
        let collection = database.collection('authentication')
        return collection;
    } catch (error) {
        console.log(`error in db connection ${error}`)
    }
}

const FindData = async (type) => {
    try {
        let collectiondetails = await DbConnection()
        const filter = { [type]: { $exists: true } };
        let fetchdata = await collectiondetails.findOne(filter)
        return fetchdata[type]
    } catch (error) {
        console.log(`error while fetching data ${error}`)
    }
}

const InsertData = async (data, type) => {
    try {
        let collectiondetails = await DbConnection()
        const filter = { [type]: { $exists: true } };
        let deleteall = await collectiondetails.deleteMany(filter);
        console.log(`deletion done`);
        console.log(deleteall)
        let insertion = await collectiondetails.insertOne(data)
        console.log(`insertion doneeeeeeeee`);
        console.log(insertion)
        return insertion
    } catch (error) {
        console.log(`error during insertion ${error}`)
    }
}
const DeleteOne = async (data) => {
    try {
        let db = await DbConnection();
        let deleteddata = await db.deleteOne(data);
        console.log(deleteddata)
        await client.close();
    } catch (error) {
        console.log(`error while deleting data ${error}`)
    }
}

const UpdateData = async (filter, update) => {
    try {
        let db = await DbConnection();
        let updatedata = await db.updateOne(filter, update)
        console.log(updatedata)
        await client.close();
    } catch (error) {
        console.log(`error while updating data ${error}`)
    }
}

const DeleteMany = async () => {
    try {
        let db = await DbConnection();
        let alldelete = await db.deleteMany({});
        console.log(alldelete)
        await client.close();
    } catch (error) {
        console.log(`error while deleting all data ${error}`)
    }
}

module.exports = {
    DbConnection,//DbConnection()
    FindData,//FindData({"name" : "rupali"})
    InsertData,//Insertion({ code: 'newcode' })
    DeleteOne,//DeleteOne({ "name" : "rupali" })
    UpdateData,//UpdateData({"name" : "monika"},{$set:{name:'rupali'}})
    DeleteMany //DeleteMany()
}