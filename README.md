# Skeleton Loading UI

Panel de administración demo que muestra el patrón **skeleton loading** en React + TypeScript. Mientras los datos se obtienen de forma asíncrona, se muestran bloques animados con efecto shimmer que replican la forma del contenido real, eliminando los saltos visuales al cargar.

---

## Tecnologías

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [react-icons](https://react-icons.github.io/react-icons/) (Feather Icons)

---

## Estructura del proyecto

```
src/
├── App.tsx                        # Panel principal con las tres secciones
└── skeleton-loading/
    ├── Skeleton.tsx               # Bloque base reutilizable
    ├── Skeleton.css               # Animación shimmer
    ├── UserCardSkeleton.tsx       # Skeleton para tarjeta de perfil
    ├── Productcardskeleton.tsx    # Skeleton para tarjeta de producto
    ├── Listrowskeleton.tsx        # Skeleton para filas de lista
    └── Useasync.tsx               # Hook genérico para llamadas async
```

---

## Cómo funciona

### `<Skeleton>`

Bloque base que acepta `width`, `height` y `circle`. Aplica la clase `.skeleton` con el efecto shimmer via `::after`.

```tsx
<Skeleton width="70%" height={14} />
<Skeleton circle width={52} height={52} />
```

### `useAsync<T>`

Hook genérico que maneja los tres estados de cualquier llamada asíncrona.

```tsx
const { data, loading, error } = useAsync<User>(() => fetchUser(id), [id]);
```

| Estado    | Mientras carga | Al resolver     |
|-----------|----------------|-----------------|
| `loading` | `true`         | `false`         |
| `data`    | `null`         | dato tipado `T` |
| `error`   | `null`         | `Error` o null  |

Usa `useReducer` internamente para evitar el warning `react-hooks/set-state-in-effect`.

### Skeletons específicos

Cada skeleton replica **exactamente** la estructura y tamaños del componente real para que no haya salto visual al renderizar el contenido.

| Skeleton               | Componente real |
|------------------------|-----------------|
| `UserCardSkeleton`     | `<UserCard>`    |
| `ProductCardSkeleton`  | `<ProductGrid>` |
| `ListRowSkeleton`      | `<SalesList>`   |

---

## Instalación

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173). Usá el botón **Recargar** para disparar las peticiones nuevamente y ver el efecto skeleton.

---

## Autor

**Matias Belmar** — mati.belmar0625@gmail.com
