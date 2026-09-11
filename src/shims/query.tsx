import { useEffect, useState } from "react";

export function useQuery({ queryKey, queryFn, refetchInterval }: any) {
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(true);
  const key = JSON.stringify(queryKey);
  useEffect(() => {
    let on = true;
    const run = () =>
      Promise.resolve()
        .then(queryFn)
        .then((d) => {
          if (on) {
            setData(d);
            setLoading(false);
          }
        })
        .catch(() => {
          if (on) setLoading(false);
        });
    run();
    if (refetchInterval) {
      const t = setInterval(run, refetchInterval);
      return () => {
        on = false;
        clearInterval(t);
      };
    }
    return () => {
      on = false;
    };
  }, [key, refetchInterval]);
  return { data, isLoading };
}

export function QueryClient() {}
export function QueryClientProvider({ children }: { children: any }) {
  return children;
}
