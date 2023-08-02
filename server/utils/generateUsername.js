const generateRandomDigits = () => {
  let result = '';
  const numberOfDigits = 8;

  for (let i = 0; i < numberOfDigits; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    result += randomDigit;
  }

  return result;
};

const generateUsername = (firstName, lastName) => {
  const lowerFirstName = firstName.toLowerCase();
  const lowerLastName = lastName.toLowerCase();

  const randomDigits = generateRandomDigits();
  const username = `${lowerFirstName}-${lowerLastName}-${randomDigits}`;

  return username;
};

module.exports = generateUsername;
