import { Timestamp } from "@react-native-firebase/firestore";

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age.toString();
};

export const generateScanId = (): string => {
  const randomNum = Math.floor(10000 + Math.random() * 90000); // Generates a 5-digit number
  return `SC${randomNum}`;
};

export const extractDateTime = (input: string): { date: string; time: string } => {
  console.log(input);
  
  const regex = /^(\d{1,2} \w+ \d{4}) at (\d{2}:\d{2}:\d{2})/;
  const match = input.match(regex);

  if (!match) throw new Error("Invalid format");

  return {
    date: match[1], // "28 March 2025"
    time: match[2], // "23:18:40"
  };
};
