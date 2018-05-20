"use strict";

$(document).ready(function () {
  var vm = new Vue({
    el: "#index",
    data: function () {
      return {
        uploadedUrl: [],
        errMsgs: [],
        dragging: false
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
      handleFiles: function (files) {
        files = files || this.$refs.fileInput.files;
        this.uploadFile(files);
      },
      uploadFile: function (files) {
        for (let index = 0; index < files.length; index++) {
          var f = files[index];
          let rowIndex = this.uploadedUrl.length;
          this.$set(this.uploadedUrl, rowIndex, {
            percent: 0,
            name: f.name,
            url: "Processing..."
          });
          this.getBase64(f, rowIndex, function (base64) {
            let request = that.writeUserData(f.name, base64, "xxxx", function (response, key) {
              if (response) {
                let msg = error;
                if (!error.response) {
                  msg = error.description || "Network error"; // network error
                } else {
                  const response = error.response.data; // response data
                  msg = response;
                }
                that.errMsgs.push(msg);
              } else {
                const serverPath = window.location.href;
                let index = rowIndex;
                that.$set(that.uploadedUrl[index], "url", serverPath + "d.html?f=" + key);
                that.$set(that.uploadedUrl[index], "percent", 100);
              }
            });
          }); //insert data to database
        }
      },
      writeUserData: function (fileName, base64, password, f) {
        let newPostRef = this.fbDB.ref('files').push(); // Create a new post reference with an auto-generated id        
        let key = newPostRef.key;
        newPostRef.set({
          name: fileName,
          base64: base64,
          password: password
        }, function (error) {
          f(error, key);
        });
      },
      copyUrl: function (index) {
        let url = this.uploadedUrl[index].url;
        var copyText = this.$refs["urlBox" + index][0];
        copyText.select();
        document.execCommand("Copy");
        copyText.classList.add("is-valid");
        setTimeout(function () {
          copyText.classList.remove("is-valid");
        }, 1000);
      },
      dragenter: function (e) {
        e.stopPropagation();
        e.preventDefault();
        // console.log("dragenter");
        let layer = document.querySelector(".layer");
        layer.classList.add("active");
      },
      dragover: function (e) {
        // console.log("dragover");
        this.dragging = true;
        e.stopPropagation();
        e.preventDefault();
      },
      drop: function (e) {
        this.dragging = false;
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;
        this.handleFiles(files);
        let layer = document.querySelector(".layer");
        layer.classList.remove("active");
      },
      dragleave: function (e) {
        // console.log("dragleave");
        if (this.dragging) {
          let layer = document.querySelector(".layer");
          layer.classList.remove("active");
        }
        this.dragging = false;
        e.stopPropagation();
        e.preventDefault();
      },
      getBase64: function (file, index, f) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          const r = reader.result.split(",")[1];
          f(r);
        };
        reader.onerror = function (error) {
          that.errMsgs.push(JSON.stringify(error));
          console.log("Error: ", error);
        };
        // reader.onprogress = function(progressEvent) {
        //   if (progressEvent.lengthComputable) {
        //     let percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
        //     that.percentCompleted_base64[index] = percentCompleted;
        //   }
        // };
      },
    },
    created: function () {
      let body = document.querySelector("body");
      body.addEventListener("dragenter", this.dragenter, false);
      body.addEventListener("dragover", this.dragover, false);
      body.addEventListener("drop", this.drop, false);
      body.addEventListener("dragleave", this.dragleave, false);
      this.initFirebase();
    },
    watch: {},
    mounted: function () {}
  });
  var that = vm;
});