const url = "http://localhost:8080/api/analises/correlacao"

document.querySelector('#inputGroupFileAddon04').addEventListener('click', function(){
  const file = document.querySelector('#inputGroupFile04').files[0];
  const formData = new FormData();
  formData.append('file',file);

  axios.post(url, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  }).then(response => {
      console.log(response);
  }).catch(error => {
      console.log(error);
  });
});

