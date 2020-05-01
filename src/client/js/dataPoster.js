export const postData = async ( url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header      
        body: JSON.stringify(data), 
    });
    console.log(data);
    try {
        let formURL = document.getElementById('name').value
        const newData = await response.json();
        console.log(newData);
        document.getElementById('url').innerHTML = "Url: " + formURL
        document.getElementById('text').innerHTML = "Text: " + newData.text
        document.getElementById('polarity').innerHTML = "Polarity: " + newData.polarity
        document.getElementById('polarity_confidence').innerHTML = "Polarity confidence: " + (newData.polarity_confidence*100) + "%"
        return newData;
    } catch(error) {
        console.log("error", error);
      // appropriately handle the error
    }
};