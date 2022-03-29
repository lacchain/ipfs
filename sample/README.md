## How to connect your application to the IPFS node.

This guide aims to provide an example of how to register documents in the ipfs node.
## Prerequisites
- Node IPFS
- Nodejs > 10.x 
- [ipfs-http-client](https://www.npmjs.com/package/ipfs-http-client)

## Install

After cloning the repository, we move to the _*sample*_ folder.

    $ cd sample

Then install the dependencies

    $ npm install


The following code allows you to register an [academy credential](/sample/academic.json) in ipfs and then register the ipfs hash in the blockhain.

```javascript 
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
```

We start the server on port 3000.

    $ node index.js

We register our credential in IPFS
```
    $ curl --location --request POST 'localhost:3000/addCredential' \
--header 'Content-Type: application/json' \
--data-raw '{
	"@context": [
		"https://www.w3.org/2018/credentials/v1",
		"https://www.lacchain.net/credentials/library/education/4e6c312cd8e6b18116fe3fd2e9b6e5df810afe0a716c1c511ef6c19cb8554578/v1"
	],
	"id": "d49ec380-49eb-474f-8128-a572e8b29278",
	"type": [
		"VerifiableCredential",
		"Certificate"
	],
	"issuer": "did:ethr:lacchain:0xadf1702b76419f428014d1386af487b2d8145f83",
	"issuanceDate": "2020-10-21T15:49:00.057Z",
	"expirationDate": "2025-10-21T15:49:00.057Z",
	"credentialSubject": {
		"id": "did:ethr:lacchain:0x48007072061dc756e5a2ecf15cf2c2bcc091de52",
		"givenName": "George",
		"familyName": "Walch",
		"email": "gw@town.org",
		"holds": {
			"category": "Diploma",
			"industry": "Computer Science",
			"skillset": "Blockchain",
			"course": "Introducción a LACChain Besu",
			"description": "Curso introductorio de despliegue de nodos en LACChain Besu para desarrolladores",
			"url": "https://aula.blockchainacademy.cl/p/introduccion-a-lacchain",
			"duration": 40,
			"modality": "virtual",
			"location": null
		}
	},
	"evidence": true,
	"credentialStatus": {
		"id": "0x4185Dab0662ccDa3D3F35779578a4242bb89Db37",
		"type": "SmartContract"
	},
	"proof": [
		{
			"id": "did:ethr:lacchain:0xadf1702b76419f428014d1386af487b2d8145f83",
			"type": "EcdsaSecp256k1Signature2019",
			"proofPurpose": "assertionMethod",
			"verificationMethod": "0x7a746D34754C14EB3eb1F214BD0EA23a1A18Be7A",
			"proofValue": "0x0b8d75810bf30fd221ddd6892e9e50b1c63240aba4767a9af2bfb8d8e5944e7b169f78d99f3174055de5a7fcbb65d1367c900a19302c5409a01d77339001d7181b"
		},
		{
			"id": "did:ethr:lacchain:0xf0c0ee53386b8463ff3e58203d45d982058b7917",
			"type": "EcdsaSecp256k1Signature2019",
			"proofPurpose": "assertionMethod",
			"verificationMethod": "0x7a746D34754C14EB3eb1F214BD0EA23a1A18Be7A",
			"proofValue": "0xb1d3eb341fef023b28a9e62bb6ba66ca5b473872249bd6724afcbc71a0d08a8e5a1fd2a325d5591e1380e94404921b90d6589b9366e9c2c638b2683e7c230fcd1b"
		},
		{
			"id": "did:ethr:lacchain:0xaa799564d54356cc754bd5d126101602f1d01ced",
			"type": "EcdsaSecp256k1Signature2019",
			"proofPurpose": "assertionMethod",
			"verificationMethod": "0x7a746D34754C14EB3eb1F214BD0EA23a1A18Be7A",
			"proofValue": "0x4361ba3b2e1a392858e5a6da1a4a948f1f73107849951e4167d9ad89cc0a35bf593d774e9e3ea9cf3ce2b7133c9c8ae1c6d3c2730ff0ec5c20a602cc1b61f21c1b"
		}
	]
}'
```

We have as a result the hash ipfs **QmVPwyet87XRotrdyj1jrhaoXfiav9dupZsTkWmPuBjhZj** which you can check at gateway http://localhost:8080/ipfs/QmVPwyet87XRotrdyj1jrhaoXfiav9dupZsTkWmPuBjhZj


## Copyright 2020 LACChain
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.