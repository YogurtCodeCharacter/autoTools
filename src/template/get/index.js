
export  async function name(params) {
        const res = await axios.get(url,  { params });
        
        return res;
}
