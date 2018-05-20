// "use strict";

$(document).ready(function () {
  var vm = new Vue({
    el: "#dl",
    data: function () {
      return {
        errMsgs: [],
        showDownload: false,
        isLoading: false,
        fileObj: null,
        fbDB: null
      };
    },
    methods: {
      initFirebase: function () {
        var config = {
          apiKey: "AIzaSyAXGUA9ZtTZWwDJzroezgyLjDrVNMA8oS8",
          authDomain: "otfs-fda65.firebaseapp.com",
          databaseURL: "https://otfs-fda65.firebaseio.com",
          projectId: "otfs-fda65",
          storageBucket: "otfs-fda65.appspot.com",
          messagingSenderId: "22071358982"
        };
        firebase.initializeApp(config);
        this.fbDB = firebase.database();
      },
      triggerDownload: function () {
        let fileObj = this.fileObj;
        let file = this.b64toBlob(fileObj.base64);
        saveFile(file, fileObj.name);

        function saveFile(file, fileName) {
          var a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          if (file != null && navigator.msSaveBlob) {
            return navigator.msSaveBlob(file, fileName); //IE
          }
          var blob = file;
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      },
      getFile: function () {
        const fileId = this.getParameterByName("f");
        this.isLoading = true;
        this.fbDB.ref('/files/' + fileId).once('value').then(function (snapshot) {
          that.isLoading = false;
          let v = snapshot.val()
          if (v) {
            that.fileObj = v;
            that.triggerDownload();
            that.showDownload = true;
            that.fbDB.ref('files/' + fileId).remove(); //remove file in server
          } else {
            that.isLoading = false;
            let msg = "Oops, file not found. Please contact the owner of file.";
            that.errMsgs.push(msg);
          }
        });
      },
      b64toBlob: function (b64Data, contentType, sliceSize) {
        //ref: https://ourcodeworld.com/articles/read/322/how-to-convert-a-base64-image-into-a-image-file-and-upload-it-with-an-asynchronous-form-using-jquery
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {
          type: contentType
        });
        return blob;
      },
      getParameterByName: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      }
    },
    created: function () {
      this.initFirebase();
      this.getFile();
    },
    watch: {},
    mounted: function () {}
  });
  var that = vm;
});