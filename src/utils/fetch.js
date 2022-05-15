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
            }
            let response = await fetch(destUrl, opts);
            resolve(opts.raw ? (await response.blob()) : (await response.json()));
        }catch(ex){
            reject(ex);
        }
    }));
}