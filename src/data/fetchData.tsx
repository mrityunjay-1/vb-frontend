
const fetchData = async ({ url = "/", method = "GET", headers = {}, data = {} }: any) => {
    try {
        let localData: any = localStorage.getItem("AuthData");

        console.log("localData : ", localData);

        if (localData) {
            localData = JSON.parse(localData);
        }

        let newHeaders = {
            "Authorization": "Bearer " + localData?.token,
            "Content-Type": "application/json"
        };

        if (Object.keys(headers).length > 0) {
            newHeaders = { ...newHeaders, ...headers };
        }

        const options: any = {
            method,
            headers: newHeaders
        };

        if (Object.keys(data).length > 0) {
            options.body = JSON.stringify(data);
        }

        console.log("options : ", options);

        const raw_res = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, options);

        if (!(raw_res.status >= 200 && raw_res.status < 300)) {
            console.log("Api responded with non 2XX code.");
            throw new Error("Error while calling the API...");
        }

        const res = await raw_res.json();

        if (res) {
            return res;
        }

    } catch (err) {
        console.log("Error while calling the API : ", err);
    }
}

export default fetchData;