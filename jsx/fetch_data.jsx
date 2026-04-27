// NOTE: Read readmd.md first before running this script.

var HOST = "127.0.0.1";
var PORT = 3000;
var ENDPOINT = "/users";

#include "json2.js"

function extractJSON(str) {
    var start = str.indexOf("[");
    var end = str.lastIndexOf("]");

    if (start === -1 || end === -1) return null;

    return str.substring(start, end + 1);
}

function removeNulls(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) !== 0) {
            result += str.charAt(i);
        }
    }
    return result;
}

function fetchAPI(path) {
    var socket = new Socket();
    var response = "";

    if (!socket.open(HOST + ":" + PORT, "binary")) {
        alert("Connection failed");
        return null;
    }

    // Proper HTTP/1.1 request
    var request =
        "GET " + path + " HTTP/1.1\r\n" +
        "Host: " + HOST + ":" + PORT + "\r\n" +
        "Accept: application/json\r\n" +
        "Connection: close\r\n" +
        "\r\n";

    socket.write(request);

    // IMPORTANT: safer read loop
    while (true) {
        var chunk = socket.read(1024);
        if (!chunk) break;
        response += chunk;
    }

    socket.close();

    // Debug once
    $.writeln("RAW RESPONSE:\n" + response);

    // Split headers + body safely
    var parts = response.split("\r\n\r\n");

    if (parts.length < 2) {
        alert("Invalid HTTP response:\n" + response);
        return null;
    }

    var body = parts.slice(1).join("\r\n\r\n");

    // Handle edge: chunked encoding (basic fix)
    if (body.indexOf("{") === -1 && body.indexOf("[") === -1) {
        alert("No JSON body found:\n" + body);
        return null;
    }

    // Extract JSON safely
    var jsonString = extractJSON(body);

    // clean string
    jsonString = removeNulls(jsonString);
    jsonString = jsonString.replace(/^\s+|\s+$/g, "");

    try {
        var data = JSON.parse(jsonString);
        return data;
    } catch (e) {
        alert("JSON parse error:\n" + jsonString + "\n\nError: " + e);
        return null;
    }

}

// Fetch data
$.writeln('Fetching data - START');
var data = fetchAPI(ENDPOINT);
$.writeln('Fetching data - END');

$.writeln('Building InDesign file - START ');
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
$.writeln('Building InDesign file - END');
