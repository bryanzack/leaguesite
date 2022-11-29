export function sendRequest(region, name) {
    fetch(`/users/${region}/${name}`)
      .then(response => {
        let serverResponseCode = response["status"];
        console.log("Connection to backend: : ", serverResponseCode);
        if (serverResponseCode >= 200 && serverResponseCode <= 299) {
          response.json().then(result => {
            let apiResponseCode = result["status"];
            console.log("Connection to Riot api: " + apiResponseCode);
            console.log(result);
          });
        } 
        else if (serverResponseCode >= 400 && serverResponseCode <= 499) {
          response.json().then(result => {
            console.log(response);
          });
        }
    }); 
}
