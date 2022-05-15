

export function useJWT(){
    return [
        localStorage.getItem("token"),
        (token) => {
            localStorage.setItem("token",token);
        }
    ]
}