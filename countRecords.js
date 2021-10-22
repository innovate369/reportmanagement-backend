

let coll = db.collection('collection_name');
coll.count().then((count) => {
    console.log(count);
});