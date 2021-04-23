import axios from "axios"

const urlMin = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
const urlMax = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

class API {
  async loadData(url) {
    const urlSizeData = url === "max" ? urlMax : urlMin

    try {
      const response = await axios.get(urlSizeData)
      return response
    }
    catch(err) {
      return err
    }
  }
}

export default API