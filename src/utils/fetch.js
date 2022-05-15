export default function(url, opts){
    return (new Promise(async (resolve,reject) => {
        try{
            if(opts.bodyJson){
                opts.body = JSON.stringify(opts.bodyJson);
            }
            let response = await fetch(url, opts);
            resolve(opts.raw ? (await response.blob()) : (await response.json()));
        }catch(ex){
            reject(ex);
        }
    }));
}