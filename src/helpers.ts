import { ARGS_PREFIX } from "./constants";

export const getArgs = () => {
  const args = process.argv.slice(2);
  return args.reduce((result, arg, index) => {
    if (arg.startsWith(ARGS_PREFIX)) {
      const key = arg.replace(ARGS_PREFIX, "");
      let value: string | boolean = true;
      if (args[index + 1] && !args[index + 1].startsWith(ARGS_PREFIX)) {
        value = args[index + 1];
      }
      result[key] = value;
    }
    return result;
  }, {} as Record<string, any>);
};
