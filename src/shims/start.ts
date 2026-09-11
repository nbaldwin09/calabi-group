export function createServerFn() {
  return {
    validator() {
      return {
        handler(fn: any) {
          return fn;
        },
      };
    },
  };
}
