/**
 *UserCardSkeleton class
 *
 * @version 1.0.0 - 20 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 20 may. 2026
 *
 **/

/*UserCardSkeleton.tsx
 Skeleton específico para una tarjeta de perfil de usuario.
 La regla de oro: debe tener EXACTAMENTE la misma estructura y tamaños
 que el componente <UserCard> real para evitar saltos visuales al cargar.
*/
import Skeleton from './Skeleton';

export default function UserCardSkeleton() {
    return (
        <div style={{ background: '#161b27', border: '1px solid #1f2a3c', borderRadius: 16, overflow: 'hidden' }}>
            {/* Franja de header */}
            <Skeleton width="100%" height={64} style={{ borderRadius: 0 }} />

            <div style={{ padding: '0 1.25rem 1.25rem', marginTop: -28 }}>
                {/* Avatar superpuesto */}
                <Skeleton circle width={52} height={52} style={{ border: '3px solid #161b27' }} />

                <Skeleton width="55%" height={14} style={{ marginTop: 10, marginBottom: 8 }} />
                <Skeleton width="35%" height={12} style={{ borderRadius: 999 }} />

                <Skeleton width="100%" height={11} style={{ marginTop: 16, marginBottom: 6 }} />
                <Skeleton width="85%"  height={11} style={{ marginBottom: 6 }} />
                <Skeleton width="60%"  height={11} />
            </div>
        </div>
    );
}
