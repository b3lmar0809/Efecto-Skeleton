/**
 *Useasync class
 *
 * @version 1.0.0 - 20 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 20 may. 2026
 *
 **/

/* useAsync.ts
 Hook generico para cualquier llamada asíncrona (fetch, axios, etc.)
 maneja automaticamente los tres estados posibles: cargando, con datos, con error.

   Uso:
   const { data, loading, error } = useAsync<User>(() => fetchUser(id), [id]);

  El generico <T> le dice a TypeScript qué tipo tiene `data` al retornar.
*/
import { useReducer, useEffect } from 'react';

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

type AsyncAction<T> =
    | { type: 'loading' }
    | { type: 'success'; data: T }
    | { type: 'error'; error: Error };

function asyncReducer<T>(_state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> {
    switch (action.type) {
        case 'loading': return { data: null, loading: true, error: null };
        case 'success': return { data: action.data, loading: false, error: null };
        case 'error':   return { data: null, loading: false, error: action.error };
    }
}

export function useAsync<T>(
    asyncFn: () => Promise<T>,
    deps: React.DependencyList = []
): AsyncState<T> {

    const [state, dispatch] = useReducer(asyncReducer<T>, {
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let cancelled = false;

        dispatch({ type: 'loading' });

        asyncFn()
            .then((data) => {
                if (!cancelled) dispatch({ type: 'success', data });
            })
            .catch((error: Error) => {
                if (!cancelled) dispatch({ type: 'error', error });
            });

        return () => {
            cancelled = true;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return state;
}
