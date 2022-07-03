export const randomString = (length: number = 4) => {
  let text = "";
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const fixDate = (date) => {
  const foo: Date = new Date(date.toDate());
  const options: any = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return foo.toLocaleDateString("en-US", options);
};
