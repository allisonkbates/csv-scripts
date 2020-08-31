const accounts = [
	{ accountName: 'Timber Creek High School', industry: 'Education', subIndustry: null },
	{ accountName: 'Sunrise Elementary School', industry: 'Education', subIndustry: null },
  { accountName: 'Waterford Elementary School', industry: 'Education', subIndustry: 'Elementary School' },
  { accountName: 'Waterford', industry: 'Education', subIndustry: null }
];

/*
 1. Turn account name into lower case using map function
 2. Based on account name, set new field named industryAM using mapping variable (order of if statements is important!)
*/

const finalAccounts = accounts
  .map(account => {
    const formattedAccount = {
      accountName: account.accountName.toLowerCase(),
      industry: account.industry,
      subIndustry: account.subIndustry
    };
    return formattedAccount;
  }).map(account => {

    let accountName = account.accountName;
    let industry = account.industry;
    let subIndustry = account.subIndustry;
    let industryAM;

    if (accountName.includes('high school') || accountName.includes('senior high')) {
      industryAM = "High School";
    } 
    else if (accountName.includes('middle school') || accountName.includes('junior high')) {
      industryAM = "Middle School";
    }
    else if (accountName.includes('elementary')) {
      industryAM = "Elementary School";
    } 
    else if (accountName.includes('college') || accountName.includes('university') || accountName.includes('univ') || accountName.includes('career')) {
      industryAM = "Higher Education";
    } 
    else if (accountName.includes('library')) {
      industryAM = "Library";
    } 
    else if (accountName.includes('school district') || accountName.includes('charter school') || accountName.includes('academy') || accountName.includes('board of education') || accountName.includes('schools') || accountName.includes('public school') || accountName.includes('school')) {
      industryAM ="General K-12";
    }
    else if (subIndustry !== null) {
      industryAM = subIndustry;
    } 
    else {
      industryAM = "General Education";
    }

    const categorizedAccount = {
      accountName: accountName,
      industry: industry,
      subIndustry: account.subIndustry,
      industryAM: industryAM
    }
    return categorizedAccount;
  });

  console.log(finalAccounts);

/* check for the following

1. Check for the term "High School" and mark IndustryAM as High School
2. Check for the term "Middle School" and mark IndustryAM as Middle School
3. Check for the term "Elementary School" and mark IndustryAM as Elementary School
4. Check for the term "College" and mark industryAM as Higher Ed
5. Check for the term "University" and mark industryAM as Higher Ed
6. Check for the term "Library" and markk industryAM as Library
7. Check for the term "Junior High" and mark IndustyrAM as Middle School
8. Check for the term "Univ" and mark IndustyrAM as Middle School

General K-12
1. Check for the term "School District" - do not overwrite the previous ones
2. Check for the term "Schools" - do not overwrite the previous ones
3. Check for the term "Charter School" - do not overwrite the previous ones
4. Check for the term "Academy" - do not overwrite the previous ones
5. Check for the term "Board of Education" - do not overwrite the previous ones




*/