import config from "../config";

export default function(url, opts){
    let destUrl = url;
    if(url.startsWith("/")){
        destUrl = config.apiUrl + url;
    }
    return (new Promise(async (resolve,reject) => {
        try{
            if(opts.bodyJson){
                opts.body = JSON.stringify(opts.bodyJson);
                if(!opts.headers){
                    opts.headers = {};
                }
                opts.headers["Content-Type"] = "application/json";
            }
            let response = await fetch(destUrl, opts);
            if(opts.body && !opts.method){
                opts.method = "POST";
            }
            opts.method = opts.method || "GET";
            if(opts.raw){
                resolve(response);
                return;
            }else{
                let responseJson = await response.json();
                resolve(responseJson);
            }
        }catch(ex){
            console.log("Data Fetch Error",ex);
            console.trace();
            window.lastFetchError = ex;
            reject(ex);
        }
    }));
}