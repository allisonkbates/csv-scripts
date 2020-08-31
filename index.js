let json; // this will hold the parsed json

// Element from the DOM to use
let jsonContainer = document.querySelector('.jsonOutput'); // div container for json
let fileInput = document.getElementById('fileInput');

// Functions that do things...

// on file upload, the following function runs 
function loadFile(event) {
  jsonContainer.innerHTML = ''; // clear out any contents in the json container
  let file = event.target.files[0];
  
  if (file.type !== 'text/csv') { // make sure the file is CSV before proceeding
    updateContainer('This form only takes CSV files') // change in the future to display in UI
    return; // stop the function here
  }

  const reader = new FileReader(); // read the file with FileReader (Web API)
  reader.onload = function(e) { // this function is called when the reader reads the file
    json = d3.csvParse(e.target.result, d3.autoType); // use d3-dsv to parse the CSV - see https://github.com/d3/d3-dsv#autoType
    updateContainer((JSON.stringify(json, null, 4))); // formats json for use in HTML - update to output to json container
    showTools();// make tools available at this time to manipulate the file
  }
  reader.readAsText(file); // reader reads the text of the file, triggering the "onload" function above
}

// update json container with output
function updateContainer(string) {
  jsonContainer.innerHTML = string;
  console.log(`update json container + ${string}`);
}

// add the CTAs for each tool & an event listener
function showTools() { 
  let toolsContainer = document.getElementById('toolsContainer');

  if (!document.getElementById('catIndustry')) {   // check for catIndustry button, create it, add the event listener
    let catIndustry = document.createElement('button');
    catIndustry.setAttribute('id', 'catIndustry');
    catIndustry.innerHTML = 'Categorize Industry';
    toolsContainer.appendChild(catIndustry);
    catIndustry.addEventListener('click', categorizeIndustry);
  }

  if(!document.getElementById('catEmail')) { // check for catEmail button, create it, add the event listener
    let catEmail = document.createElement('button');
    catEmail.setAttribute('id', 'catEmail');
    catEmail.innerHTML = 'Categorize Email';
    toolsContainer.appendChild(catEmail);
    catEmail.addEventListener('click', categorizeEmail);
  }

  if (!document.getElementById('copyButton')) {   // check for copy button, create it, add the event listener
    let copyButton = document.createElement('button');
    copyButton.setAttribute('id', 'copyButton');
    copyButton.innerHTML = 'Copy CSV to Clipboard';
    toolsContainer.appendChild(copyButton);
    copyButton.addEventListener('click', copyToClipboard);
  }

  console.log('show tools in UI');
}

function categorizeIndustry() {
  const finalAccounts = 
  json
  .map(account => {
    const formattedAccount = {
      accountName: account.accountName,
      catAccountName: account.accountName.toLowerCase(),
      industry: account.industry,
      subIndustry: account.subIndustry
    };
    return formattedAccount;
  }).map(account => {
    let catAccountName = account.catAccountName;
    let accountName = account.accountName;
    let industry = account.industry;
    let subIndustry = account.subIndustry;
    let industryAM;

    if (subIndustry != null || subIndustry != undefined ) {
      industryAM = subIndustry;
    }

    else if (catAccountName.includes('high school') || catAccountName.includes('senior high')) {
      industryAM = "High School";
    } 
    else if (catAccountName.includes('middle school') || catAccountName.includes('junior high')) {
      industryAM = "Middle School";
    }
    else if (catAccountName.includes('elementary')) {
      industryAM = "Elementary School";
    } 
    else if (catAccountName.includes('college') || catAccountName.includes('university') || catAccountName.includes('univ') || catAccountName.includes('career')) {
      industryAM = "Higher Education";
    } 
    else if (catAccountName.includes('library')) {
      industryAM = "Library/Makerspace";
    }
    else if (catAccountName.includes('school district') || catAccountName.includes('district')) {
      industryAM = "District";
    }
    else if (catAccountName.includes('charter school') || catAccountName.includes('academy') || catAccountName.includes('board of education') || catAccountName.includes('schools') || catAccountName.includes('public school') || catAccountName.includes('school')) {
      industryAM ="General K-12";
    }
    else {
      industryAM = "General Education";
    }
    const categorizedAccount = {
      accountName: accountName,
      industry: industry,
      subIndustry: subIndustry,
      industryAM: industryAM
    }
    return categorizedAccount;
  });
  console.log(finalAccounts);
  updateContainer(JSON.stringify(finalAccounts, null , 4));
}

function categorizeEmail() {
  console.log('categorize the email!');
  const finalAccounts = 
  json
  .map(account => {
    console.log(account);
    const formattedAccount = {
      email: account.email,
      catEmail: account.email.toLowerCase(),
    };
    return formattedAccount;
  }).map(account => {
    let email = account.email;
    let catEmail = account.catEmail;
    let industryAM;

    if (catEmail.includes('.edu') || catEmail.includes('.k12.us')) {
      industryAM = 'Education';
    }
    else if (catEmail.includes('.gov')) {
      industryAM = 'Government';
    }
    else if (catEmail.includes('@makerbot.com')) {
      industryAM = 'MakerBot';
    }
    else if (catEmail.includes('@gmail.com') || catEmail.includes('googlemail')) {
      industryAM = 'Gmail';
    } else {
      industryAM = 'Uncategorized';
    }
    const categorizedAccount = {
      email: email,
      industryAM: industryAM
    }
    return categorizedAccount;
  })
  updateContainer(JSON.stringify(finalAccounts, null , 4));
}

function copyToClipboard() {
  // create the CSV string from the json output
  let jsonParse = JSON.parse(jsonContainer.innerHTML);
  let csvFormat = d3.csvFormat(jsonParse);
  // copy to clipboard functionality
  navigator.clipboard.writeText(csvFormat).then(function() {
    /* clipboard successfully set */
      console.log('copied!');
  }, function() {
      console.log('failed');
    /* clipboard write failed */
  });
  console.log(csvFormat);
}

// Event Listeners
fileInput.addEventListener('change', loadFile);