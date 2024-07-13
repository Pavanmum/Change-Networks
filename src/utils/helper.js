


function useDebounce(cd, delay) {
    let timerid;

    return (...arg) =>{
        clearTimeout(timerid);
        timerid = setTimeout(() => {
            cd(...arg);
        },delay)
    }
   
} 
export default useDebounce;