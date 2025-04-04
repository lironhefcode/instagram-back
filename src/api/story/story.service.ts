import { Asl } from "../../models/aslInterface"
import { story } from "../../models/stroyInterface"
import { User } from "../../models/userInterface"
import { asynLocalStorage } from "../../services/als.service"
import { dbService } from "../../services/db.service"
import dotenv from "dotenv"
dotenv.config()

export const stroyService = {
    query,
	add
}
const collectionName =process.env.POSTS_COLLECTION_NAME as string
async function query(filterBy = { txt: '' }) {
	try {
		const collection = await dbService.getCollection(collectionName)
		var storyCursor =  collection.aggregate([{$sample: {size: 7}}])


		const story = await storyCursor.toArray()
		return story
	} catch (err) {

		throw err
	}
}
async function add(story : story) {
	const {loggedinUser} = asynLocalStorage.getStore() as Asl
    const collection = await dbService.getCollection(collectionName)
    await collection.insertOne(story)
    return story
}

