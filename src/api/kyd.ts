import ky from "ky";

/* 
  closure for fun
  but let's use the library correctly
*/
// const configureKy = (config: Readonly<Options>) => {
//   return (url: Input, options?: Options) =>
//     ky(url, Object.assign(config, options));
// };

export const kyd = ky.create({ retry: 0 });
