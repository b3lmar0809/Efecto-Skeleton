# Skeleton Loading UI

Panel de administración demo que muestra el patrón **skeleton loading** en React + TypeScript. Mientras los datos se obtienen de forma asíncrona, se muestran bloques animados con efecto shimmer que replican la forma del contenido real, eliminando los saltos visuales al cargar.

---

## ¿Qué es skeleton loading?

Es una técnica de UX que consiste en mostrar una silueta del contenido mientras los datos todavía están cargando. En lugar de ver una pantalla en blanco o un spinner genérico, el usuario ve la forma exacta de lo que va a aparecer — tarjetas, textos, imágenes — pero en gris y con un efecto de brillo animado.

Lo usan plataformas como YouTube, LinkedIn y Facebook para que la app se sienta rápida incluso cuando el servidor tarda en responder.

---

## Vista previa

> Screenshot próximamente

---

## Requisitos previos

Antes de instalar, asegurate de tener:

- [Node.js](https://nodejs.org/) v18 o superior
- npm (viene incluido con Node.js)

Podés verificar tu versión con:

```bash
node -v
npm -v
```

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

## Cómo funciona el efecto shimmer (CSS)

El efecto de brillo animado está construido enteramente en CSS, sin JavaScript. Se aplica a través de la clase `.skeleton` en `Skeleton.css`.

### 1. El bloque base

```css
.skeleton {
    background-color: #1e2533;
    position: relative;
    overflow: hidden;
}
```

`position: relative` y `overflow: hidden` son obligatorios. El shimmer es un pseudo-elemento que se mueve dentro del bloque, y `overflow: hidden` lo recorta para que no se desborde por los costados. Sin esto, el brillo cruzaría toda la pantalla.

### 2. El pseudo-elemento que hace el brillo

```css
.skeleton::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.06) 50%,
        transparent 100%
    );
    animation: shimmer 1.6s infinite;
}
```

- `content: ''` es obligatorio para que el pseudo-elemento exista, aunque esté vacío.
- `position: absolute` + `inset: 0` lo estira para cubrir todo el bloque padre.
- El gradiente va de `transparent` → blanco al **6% de opacidad** → `transparent`. Ese porcentaje tan bajo es intencional: el brillo tiene que ser sutil, apenas perceptible, no un flash brillante.
- `90deg` lo hace horizontal, de izquierda a derecha.

### 3. La animación

```css
@keyframes shimmer {
    from { transform: translateX(-100%); }
    to   { transform: translateX(100%);  }
}
```

El gradiente empieza completamente fuera del bloque a la izquierda (`-100%`) y viaja hasta salir por la derecha (`100%`). Como el padre tiene `overflow: hidden`, el gradiente queda invisible hasta que entra al bloque, cruza y vuelve a desaparecer. Eso crea la ilusión de un destello que recorre el elemento de forma continua.

### Por qué `transform` y no `left`

Usar `transform: translateX()` en lugar de cambiar `left` o `margin` es una decisión de rendimiento. Las propiedades `transform` y `opacity` son las únicas que el navegador puede animar en el **compositor** (GPU), sin recalcular el layout de la página en cada frame. Animar `left` forzaría un recálculo de layout 60 veces por segundo, lo que en listas largas de skeletons causaría caídas de FPS.

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
