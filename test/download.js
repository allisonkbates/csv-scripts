// This is for when I decide I want to figure out how to download a csv from the browser

function showDownload() {
  if (!document.getElementById("download")) {   // check for download button, create it, add the event listener
    let download = document.createElement("button");
    download.setAttribute("id", "download");
    download.innerHTML = "Download";
    downloadContainer.appendChild(download);
    download.addEventListener("click", downloadCSV);
  }
}

function downloadBlob(blob, filename) {
  console.log('tryiing to download blob')
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      this.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  return a;
}

function downloadCSV() {

  // create the CSV string from the json output
  let jsonParse = JSON.parse(jsonContainer.innerHTML);
  let csvFormat = d3.csvFormat(jsonParse);
  
  const blob = new Blob(
    [csvFormat],
    { type: 'text/csv' }
  );

  const downloadLink = downloadBlob(blob, 'download.csv');
  downloadLink.title = 'Export Records as CSV';
  downloadLink.classList.add('btn-link', 'download-link');
  downloadLink.textContent = 'Export Records';
  document.body.appendChild(downloadLink);

  console.log(csvFormat);
  
}