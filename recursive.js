function mergedJSON(JsonA, JsonB) {
    Object.keys(JsonB).forEach(function (key) {
        if (key in JsonA) {
            if (Array.isArray(JsonA[key]) || Array.isArray(JsonB[key])) {
                newArray = []
                arrayMerge = JsonA[key].concat(JsonB[key])
                arrayMerge.forEach((e) => {
                    if (!newArray.includes(e)) {
                        newArray.push(e)
                    }
                });
                JsonA[key] = newArray;
            }
            else if (typeof JsonA[key] === 'object' && typeof JsonB[key] === 'object') {
                mergedJSON(JsonA[key], JsonB[key]);
            }
            else if (JsonA[key] !== JsonB[key]) {
                JsonA[key] = [JsonA[key], JsonB[key]];
            }
        } else {
            JsonA[key] = JsonB[key];
        }
    });
};
function getJson() {
    let objOne = document.querySelector(".jsonOne").value;
    let objTwo = document.querySelector(".jsonTwo").value;
    if (typeof objOne !== 'object' || typeof objTwo !== 'object') {
        try {
            JsonA = JSON.parse(objOne);
            JsonB = JSON.parse(objTwo);
            mergedJSON(JsonA, JsonB);
            document.querySelector(".preview").innerText = JSON.stringify(JsonA);
        } catch (error) {
            document.querySelector(".preview").innerText = "Invalid JSON";
        }
    }

}