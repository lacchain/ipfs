const express = require('express');
const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient('http://localhost:5001');
const app = express();

app.use(express.json());

app.post('/addCredential', async (req, res) => {
    const data = req.body;
    
    const fileHash = await addFile(data);
    return res.send(`http://localhost:8080/ipfs/${ fileHash }`);
});

const addFile = async (file) => {
    const filesAdded = await ipfs.add(JSON.stringify(file));
    return filesAdded[0].hash;
}
app.listen(3000, () => {
    console.log('Server running on port 3000');
});