import {Client, Databases, ID, Query} from "react-native-appwrite";
// Seguimiento de la busqueda del usuario

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client)
    
export const updateSerachCount = async (query:string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query),
        ])
    
        if (result.documents.length > 0) {
            const existingMOvie = result.documents[0]
    
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMOvie.$id,
                {
                    count: existingMOvie.count + 1,
                },
            )
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(),{
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            })
        }
    } catch (error) {
        console.log(error)
        throw error
    }      
}