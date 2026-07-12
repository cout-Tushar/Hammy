import fs from "fs";
import path from "path";


const FILE = path.join(
    process.cwd(),
    "collections.json"
);


export interface Collection {
    id: number;
    name: string;
    requests: number[];
}


function loadCollections(): Collection[] {

    if (!fs.existsSync(FILE)) {
        return [];
    }

    return JSON.parse(
        fs.readFileSync(FILE, "utf-8")
    );
}


function saveCollections(
    collections: Collection[]
) {

    fs.writeFileSync(
        FILE,
        JSON.stringify(
            collections,
            null,
            2
        )
    );

}


export function createCollection(
    name: string
): Collection {

    const collections = loadCollections();

    const collection: Collection = {
        id: Date.now(),
        name,
        requests: []
    };


    collections.push(collection);

    saveCollections(collections);

    return collection;
}



export function listCollections(): Collection[] {

    return loadCollections();

}



export function addRequestToCollection(
    collectionId: number,
    requestId: number
) {

    const collections = loadCollections();


    const collection = collections.find(
        c => c.id === collectionId
    );


    if (!collection) {
        throw new Error(
            "Collection not found"
        );
    }


    if(collection.requests.includes(requestId)){
        throw new Error(
            "Request already exists in collection"
        );
    }


    collection.requests.push(requestId);


    saveCollections(collections);

}



export function getCollection(
    id:number
): Collection | undefined {

    const collections = loadCollections();

    return collections.find(
        c => c.id === id
    );

}