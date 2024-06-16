const allImages = []
const URL = "https://api.unsplash.com/search/photos?page=1&query=camp&client_id=sqIpbea8rLc12bQyYivxYCXCHF1bR8VbnnMRTe-oSAA";

const axios = require("axios");
axios.get(URL)
.then(res => {
    console.log(res.data.ur);

    
})

