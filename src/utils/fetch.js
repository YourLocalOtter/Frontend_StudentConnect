import config from "../config";
import {useJWT} from "../hooks/auth";

export default function(url, opts){
    let destUrl = url;
    if(url.startsWith("/")){
        destUrl = config.apiUrl + url;
    }
    return (new Promise(async (resolve,reject) => {
        try{
            if(!opts.headers){
                opts.headers = {};
            }
            if(opts.bodyJson){
                opts.body = JSON.stringify(opts.bodyJson);
                
                opts.headers["Content-Type"] = "application/json";
            }
            let response = await fetch(destUrl, opts);
            if(opts.body && !opts.method){
                opts.method = "POST";
            }
            opts.method = opts.method || "GET";
            if(useJWT()[0]){
                opts.headers["Authorization"] = "Bearer " + useJWT()[0];
            }
            if(opts.raw){
                resolve(response);
                return;
            }else{
                if(opts.enforce200 && response.status != 200){
                    let respText = await response.text();
                    try{
                        respText = JSON.parse(respText)["detail"];
                    }catch(ex){
                        // Silent
                    }
                    reject(respText);
                }
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