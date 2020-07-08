import axios from 'axios';
import UserMessage from './UserMessage';
import { SERVER_URL } from '../constants';
export default class HttpClient {

  messenger = new UserMessage();

  sendUpdate = (filename, attr, value, success) => {
    axios({
      method: 'patch',
      url: SERVER_URL + '/update',
      data:
      {
        'filename': filename,
        'attribute': attr,
        'value': value
      },
      headers: { 'Authorization': "Bearer " + sessionStorage.getItem('token') }
    }
    ).then(() => {
      console.log("update successful");
      success();
    }).catch((error) => {
      console.log("error in update");
        if (error.response.status == 401)
          this.messenger.alert("Du får ej uppdatera det här dokumentet")
        else
          this.messenger.alert(error.response.message);
      });
  }

  delete = (filename, success) => {
    axios({
      method: 'delete',
      url: SERVER_URL + '/delete',
      data:
      {
        'filename': filename
      },
      headers: { 'Authorization': "Bearer " + sessionStorage.getItem('token') }
    }
    ).then(() => {
      console.log("success");
      success();
    })
      .catch((error) => {
        if (error.response.status == 401)
          this.messenger.alert("Du får ej radera det här dokumentet")
        else
          this.messenger.alert(error.response.message);
      });
  }

  upload = (i, fileList, metadata, callback) => {
    let formData = new FormData();
    formData.append('file', fileList[i], fileList[i].name);
    formData.append('metadata', metadata);

    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
      }
    }

    axios.post(SERVER_URL + '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          'metadata': metadata
        }
      },
      config
    ).then(() => {
      fileList[i].sent = true;
      callback({ files: fileList });
    })
      .catch(() => {
        fileList[i].sent = false;
        this.messenger.alert('Uppladdning misslyckades');
      });
  }

  count = (getCount) => {
    axios.get(SERVER_URL + '/count')
    .then(response => {
      getCount(response.data.count);
    })
    .catch(error => { 
      console.log(error.message);
      getCount(0);
    })
  }
}

