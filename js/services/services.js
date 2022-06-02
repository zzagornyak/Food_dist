    // Функция post запроса с использование fetch и возврат промиса в формате json
    const postData = async (url, data) => {
        const res = await axios.post(url, data);

        return res;
    };
    // Функция создания get запроса
    const getData = async function(url) {
        const res = await axios.get(url);
        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${url}, status: ${res.satus}`);
        // }
        return await res;
    };
    export {postData};
    export {getData};