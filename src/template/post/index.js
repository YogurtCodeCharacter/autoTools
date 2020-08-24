export  async function name(data) {
    const res = await axios.post(url, data);
    return res;
}