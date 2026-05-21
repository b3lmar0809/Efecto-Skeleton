/**
 *Productcardskeleton class
 *
 * @version 1.0.0 - 20 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 20 may. 2026
 *
 **/
/* ProductCardSkeleton.tsx
 Skeleton para una tarjeta de producto con imagen, badge de categoría y precio.
 Refleja la estructura visual del componente <ProductGrid> real.
*/
import Skeleton from './Skeleton';

export default function ProductCardSkeleton() {
    return (
        <div style={{ background: '#161b27', border: '1px solid #1f2a3c', borderRadius: 16, overflow: 'hidden' }}>

            {/* Imagen del producto — borderRadius: 0 porque la tarjeta ya tiene el redondeo */}
            <Skeleton width="100%" height={160} style={{ borderRadius: 0 }} />

            <div style={{ padding: '1rem' }}>
                {/* Badge de categoría — borderRadius 999 lo hace completamente pill/ovalado */}
                <Skeleton width={70} height={20} style={{ borderRadius: 999, marginBottom: 10 }} />

                {/* Nombre del producto */}
                <Skeleton width="80%" height={14} style={{ marginBottom: 8 }} />

                {/* Precio — más alto que el nombre porque la fuente real es más grande */}
                <Skeleton width="35%" height={18} />
            </div>

        </div>
    );
}
