import { useEffect, useState } from 'react';

export default function useHasMounted<T>(type = 'boolean'): T {
  const isBoolean = type === 'boolean';
  const [hasMounted, setHasMounted] = useState<any>(isBoolean ? false : 0);

  useEffect(() => {
    setHasMounted(isBoolean ? true : 1);
  }, [isBoolean]);

  return hasMounted;
}
