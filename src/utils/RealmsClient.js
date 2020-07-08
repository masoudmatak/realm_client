import * as RealmWeb from "realm-web";

export default class RealmsClient {

  app = new RealmWeb.App({ id: "mmdok-mtkbq" });

  /*
  convertImageToBSONBinaryObject = file => {
    return new Promise(resolve => {
      var fileReader = new FileReader()
      fileReader.onload = event => {
        var eventBinary = new BSON.Binary(new Uint8Array(event.target.result))
        resolve(eventBinary)
      }
      fileReader.readAsArrayBuffer(file)
    })
  }
  */
 convertToBase64 = (file) => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      //let encoded = reader.result.toString().replace('data:*/*;base64', '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
  });
};

  async login(email, password) {
    let isLoggedIn = false;
    const credentials = RealmWeb.Credentials.emailPassword(email, password);
    try {
      const user = await this.app.logIn(credentials);
      if (user) {
        isLoggedIn = true;
      }
    }
    catch (error) {
      console.error("Failed to log in:" +  error);
    }
    return isLoggedIn;
  }

  async upload(metadata, name, type, file){
    const result = await this.app.functions.upload(metadata, name, type, this.convertToBase64(file));
    return result;
  }

  /*
  upload = (i, fileList, metadata, callback) => {
    const file = fileList[i];
    return convertImageToBSONBinaryObject(file)
      .then(result => {
        // AWS S3 Request
        const args = {
          ACL: 'public-read',
          Bucket: bucket,
          ContentType: file.type,
          Key: key,
          Body: result
        }

        const request = new AwsRequest.Builder()
          .withService('s3')
          .withAction('PutObject')
          .withRegion('us-east-2')
          .withArgs(args)
          .build()

        return this.aws.execute(request)
      })
      .then(result => {
        console.log(result)
        // MongoDB Request
        const picstream = this.mongodb.db('data').collection('picstream')
        return picstream.insertOne({
          owner_id: this.client.auth.user.id,
          owner_name: this.client.auth.user.profile.name,
          url,
          file: {
            name: file.name,
            type: file.type
          },
          s3: {
            bucket,
            key,
            ETag: result.ETag
          },
          ts: new Date()
        })
      })
      .then(result => {
        console.log(result)
        this.getEntries()
      })
      .catch(console.error)
  }
*/
}