# S3BUCKET

### A simple project to download and upload file to AWS S3 Bucket

### Running locally:
* Create a .env file in the root and add the following:
```
PORT=YOUR_APPLICATION_PORT
AWS_ID=YOUR Access Key ID
AWS_SECRET=YOUR Secret Access Key
AWS_BUCKET_NAME=YOUR Bucket Name
AWS_REGION=YOUR AWS Region
``` 
* Install all the dependencies:
```
	npm install
```
* Start the server
```
	npm run dev
```
> This will start an express server with a POST endpoint /upload to upload a file  
> To Download a file there are separate functions in **downloadFile.js**