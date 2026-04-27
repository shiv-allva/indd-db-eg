// NOTE: Read readmd.md first before running this script.

var HOST = "127.0.0.1";
var PORT = 3000;
var ENDPOINT = "/users";

#include "json2.js"
#include "http.js"

// Fetch data
var data = http.get(HOST, PORT, "/users");

if (data && data.length > 0) {
    var doc = app.documents.add();
    var page = doc.pages[0];

    for (var i = 0; i < data.length; i++) {
        var tf = page.textFrames.add();
        tf.geometricBounds = [20 + (i * 20), 20, 40 + (i * 20), 180];
        tf.contents = data[i].name + " - " + data[i].role;
    }
} else {
    alert("No data received");
}
