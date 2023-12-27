export const getArgs = () => {
  const args = process.argv.slice(2);
  return args.reduce((result, arg, index) => {
    if (arg.startsWith("--")) {
      const key = arg.replace("--", "");
      let value: string | boolean = false;
      if (args[index + 1] && !args[index + 1].startsWith("--")) {
        value = args[index + 1];
      }
      result[key] = value;
    }
    return result;
  }, {} as Record<string, string | boolean>);
};
