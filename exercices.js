//PARTIE I
//-----------------------------------------------------------------------------
//Revert

const reverse = (string) => {
    return string.split('').reverse().join('');
}

//-----------------------------------------------------------------------------
//UcFirst

const ucFirst = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

//-----------------------------------------------------------------------------
//Capitalize

const capitalize = (sentence) => {
    var splitSentence = sentence.toLowerCase().split(' ');
    for (var i = 0; i < splitSentence.length; i++) {
        splitSentence[i] = ucFirst(splitSentence[i]);
    }
    return splitSentence.join(' ');
}

//-----------------------------------------------------------------------------
//PascalCase

const pascalCase = (sentence) => {
    var splitSentence = sentence.toLowerCase().split(' ');
    for (var i = 0; i < splitSentence.length; i++) {
        splitSentence[i] = ucFirst(splitSentence[i]);
    }
    return splitSentence.join('');
}

//-----------------------------------------------------------------------------
//Palindrome

const palindrome = (string) => {
    var stringToCheck = string;
    var reversedString =  reverse(string);
    return (stringToCheck === reversedString);
}

//-----------------------------------------------------------------------------
//FindLongestWord

const findLongestWord = (sentence) => {
    var splitSentence = sentence.split(' ');
    var longestWord = splitSentence.sort(function(a,b) {
        return b.length - a.length;
    })
    return longestWord[0];
}

//-----------------------------------------------------------------------------
//Mapi

const Mapi = function([[key1, value1], [key2, value2]]) {
    this.array = [[key1, value1], [key2, value2]];
    this.mapiObject = Object.fromEntries(this.array);
    this.size = Object.keys(this.mapiObject).length;

    this.set = function (key, value) {
        if (!this.has(key)) {
            this.size ++;
        }
        this.mapiObject[key]=value;
    }

    this.delete = function (key) {
        delete this.mapiObject[key];
        this.size --;
    }

    this.get = function (key) {
        return this.mapiObject[key];
    }

    this.has = function (key) {
        return this.mapiObject.hasOwnProperty(key);
    }

    this.keys = function () {
        return Object.keys(this.mapiObject);
    }

    this.values = function () {
        return Object.values(this.mapiObject);
    }
}

//-----------------------------------------------------------------------------
//Prop access -- bonus

//-----------------------------------------------------------------------------
//Type check

const type_check_v1 = (value, type) => {
    return (typeof value === type);
}

//-----------------------------------------------------------------------------
//Type check V2

const type_check_v2 = (value, type, array) => {
    return (type_check_v1(value, type) && array.includes(value));
}

//-----------------------------------------------------------------------------
//PARTIE II
//-----------------------------------------------------------------------------
//Hash tag

const getHashTags = (sentence) => {
    return sentence.split(' ')
        .sort(function (a, b) {return b.length - a.length;})
        .splice(0,3)
        .map(word=> `#${word}`);
}

//-----------------------------------------------------------------------------
//RemoveDuplicates

const removeDuplicates = (array) => { return [...new Set(array)]; }

//-----------------------------------------------------------------------------
//Intersection

const intersection = (array1, array2) => {
    return filteredArray = array1.filter(value => array2.includes(value));
}

//-----------------------------------------------------------------------------
//Arraydiff
const arrayDiff = (array1, array2) => {
    const firstFiltrationArray = array1.filter(value => !array2.includes(value));
    const secondFiltrationArray = array2.filter(value => !array1.includes(value));
    const filteredArray = [...firstFiltrationArray, ...secondFiltrationArray];
    return removeDuplicates(filteredArray);
}

//-----------------------------------------------------------------------------
//Combination

function combination(...numbers) {
    return numbers.reduce((accumulator, currentValue) => accumulator * currentValue);
}

//-----------------------------------------------------------------------------
//Fiscal Code

const Person = function(name, surname, gender, dob) {
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.dob = dob;
}

const matt = new Person("Matt", "Edabit", "M", "1/1/1900");
const helen = new Person("Helen", "Yu", "F", "1/12/1950");
const mickey = new Person("Mickey", "Mouse", "M", "16/1/1928");

//REGEX + CONSTANT VARIABLES---------------------------------------------------
const regexVowels = /[AEIOU]/g;
const regexConsonants = /[BCDFGHJKLMNPQRSTVWXYZ]/g;
const xLetters=['X','X'];
const expectedLengthOfSurnameAndNameCode = 3;

//FUNCTIONS--------------------------------------------------------------------
const transformToUpperCaseElementsThatMatchWithRegex = (word, regex) => {
    return word.toUpperCase().match(regex);
}

const createSurnameAndNameCode = (array) => {
    return array.slice(0,expectedLengthOfSurnameAndNameCode).join('');
}

//CODE FROM NAME GENERATION----------------------------------------------------
const generateCodeFromName = (name) => {
    let nameConsonants = transformToUpperCaseElementsThatMatchWithRegex(name, regexConsonants);
    if (nameConsonants.length > 3) {
        nameConsonants.splice(1,1);
    }

    const processedName = nameConsonants
        .concat(transformToUpperCaseElementsThatMatchWithRegex(name, regexVowels))
        .concat(xLetters);

    return createSurnameAndNameCode(processedName);
}

//CODE FROM SURNAME GENERATION-------------------------------------------------
const generateCodeFromSurname = (surname) => {
    const processedSurname = transformToUpperCaseElementsThatMatchWithRegex(surname, regexConsonants)
        .concat(transformToUpperCaseElementsThatMatchWithRegex(surname, regexVowels))
        .concat(xLetters);

    return createSurnameAndNameCode(processedSurname);
}

//CODE FROM DOB DEPENDING ON GENRE GENERATION----------------------------------
const generateCodeFromBOBAndGender = (dob, gender) => {
    const splitDOB = dob.split('/');
    const dateOfBirth = new Date(splitDOB[2], (splitDOB[1]-1), splitDOB[0]);
    const codeByMonth = new Map([
        [0, 'A'], //JANVIER
        [1, 'B'], //FEVRIER
        [2, 'C'], //MARS
        [3, 'D'], //AVRIL
        [4, 'E'], //MAI
        [5, 'H'], //JUIN
        [6, 'L'], //JUILLET
        [7, 'M'], //AOUT
        [8, 'P'], //SEPTEMBRE
        [9, 'R'], //OCTOBRE
        [10, 'S'], //NOVEMBRE
        [11, 'T'] //DECEMBRE
    ]);

    const yearCode = dateOfBirth.getFullYear().toString().slice(2);
    const monthCode = codeByMonth.get(dateOfBirth.getMonth());

    var genderDependantDayCode = '';

    if (gender === 'M' && dateOfBirth.getDate()<10) {
        genderDependantDayCode = '0'.concat(dateOfBirth.getDate().toString());
    }else if (gender === 'F'){
        genderDependantDayCode = (40 + dateOfBirth.getDate()).toString();
    }else{
        genderDependantDayCode = dateOfBirth.getDate();
    }

    return yearCode.concat(monthCode).concat(genderDependantDayCode);
}
//FISCAL CODE GENERATION-------------------------------------------------------

const fiscalCode = (person) => {
    return generateCodeFromSurname(person.surname)
        .concat(generateCodeFromName(person.name))
        .concat(generateCodeFromBOBAndGender(person.dob, person.gender));
}

//-----------------------------------------------------------------------------
//Least Common Multiple

const gcd = (a, b) => {
    if (b) {
        return gcd(b, a%b);
    }else{
        return a;
    }
}

const ppcm = (a, b) => {
    return (a*b)/gcd(a,b);
}

const lcm = (...numbers) => {
    return numbers.reduce((accumulator, currentValue) => ppcm(accumulator, currentValue));
}

//-----------------------------------------------------------------------------
//Merge -- bonus

// const object1 = {
//     a: [{x: 2}, {y: 4}],
//     b: 1
// }
//
// const object2 = {
//     a: {z: 3},
//     b: [2,3],
//     c: 'foo'
// }

const merge = (...objectsToMerge) => {
    let target = {};
    // Merge the object into the target object
    let merger = (object) => {
        for (let prop in object) {
            if (object.hasOwnProperty(prop)) {
                //If the prop contains an object
                if (Object.prototype.toString.call(object[prop]) === '[object Object]'){
                    // If we're doing a deep merge
                    // and the property is an object
                    target[prop] = merge(target[prop], object[prop]);
                }else if (Array.isArray(prop)){
                    //If the prop contains an array
                    target[prop] = [].concat(object[prop]);
                } else {
                    // Otherwise, do a regular merge
                    target[prop] = object[prop];
                }
            }
        }
    };

    //Loop through each object and conduct a merge
    for (let i = 0; i < objectsToMerge.length; i++) {
        merger(objectsToMerge[i]);
    }
    return target;
}
// console.log(merge(object1, object2));

///-----------------------------------------------------------------------------
//Comments filter -- bonus

