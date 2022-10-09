async function getDataAsString(path){
    return new Promise(resolve=>{
        const xhr = new XMLHttpRequest();

        xhr.open("get", path);
        xhr.send();
        xhr.onreadystatechange = function() {
            if( xhr.readyState === 4 && xhr.status === 200) {
                resolve(this.responseText);
            }
        }
    });
}


export default getDataAsString;