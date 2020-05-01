export function handleSubmit(event) {
        event.preventDefault()
        let formURL = document.getElementById('name').value
        if(validURL(formURL) === true){
        	console.log("::: Data posted :::")
	        // check what text was put into the form field
	        console.log("::: Form Submitted :::")
	        Client.postData('/sentiment', {URL: formURL})
        } else{
        	alert("The URL you entered is not a valid URL. Please try again.")
        }

}

export function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}