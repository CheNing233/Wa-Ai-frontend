import axios from 'axios';

const BaseApiURL = 'http://' + window.location.hostname + ':8000/file/';

const FilesAPI_URLs = {
    "getImage": BaseApiURL + "get_image/",
}

function getFile(apiURL, id) {
    return new Promise((resolve, reject) => {
        // var file_b64 = localStorage.getItem(id);
        var file_b64 = null;
        if (file_b64 == null) {
            axios
                .get(apiURL, {
                    params: { uuid: id },
                })
                .then((resp) => {
                    // localStorage.setItem(id, resp.data.data);
                    resolve(resp.data.data);
                })
                .catch((err) => {
                    reject(err);
                });
        } else {
            resolve(file_b64);
        }
    });
}

export const FilesAPI = {
    getImage(id) {
        return getFile(FilesAPI_URLs.getImage, id);
    }
}