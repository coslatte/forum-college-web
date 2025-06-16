const BASE_NAMES: string[] = [
  "Juan",
  "Jennifer",
  "Jesus",
  "María",
  "Marcos",
  "Dayana",
  "Bonifacio",
  "Gheysa",
  "Hector",
  "Sheyla",
  "CHAYANNE",
];

export const createRandomUsername = (
  length: number,
  useBaseNames: boolean = true
) => {
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const index: number = Math.floor(Math.random() * BASE_NAMES.length);

  let username: string = useBaseNames ? BASE_NAMES[index] : "";
  username += "_";

  for (let i = 0; i < length - username.length; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return username;
};
