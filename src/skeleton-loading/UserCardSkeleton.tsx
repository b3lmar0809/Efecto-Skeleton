/**
 *UserCardSkeleton class
 *
 * @version 1.0.0 - 20 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 20 may. 2026
 *
 **/

// ─── UserCardSkeleton.tsx ──────────────────────────────────────────────────────
// Skeleton específico para una tarjeta de perfil de usuario.
// La regla de oro: debe tener EXACTAMENTE la misma estructura y tamaños
// que el componente <UserCard> real para evitar saltos visuales al cargar.
// ──────────────────────────────────────────────────────────────────────────────
import Skeleton from './Skeleton';

export default function UserCardSkeleton() {
    return (
        <div style={{ padding: '1.25rem', border: '1px solid #eee', borderRadius: 12 }}>

            {/* Fila superior: avatar circular + dos líneas de texto (nombre y rol) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                {/* Avatar — circle=true aplica border-radius 50% */}
                <Skeleton circle width={44} height={44} />

                {/* Bloque de nombre y rol al lado del avatar */}
                <div style={{ flex: 1 }}>
                    <Skeleton width="65%" height={14} style={{ marginBottom: 8 }} /> {/* nombre */}
                    <Skeleton width="40%" height={12} />                              {/* rol/cargo */}
                </div>
            </div>

            {/* Párrafo de bio: tres líneas con anchos distintos para simular texto real.
          La última línea más corta imita el final natural de un párrafo. */}
            <Skeleton width="100%" height={12} style={{ marginBottom: 8 }} />
            <Skeleton width="90%"  height={12} style={{ marginBottom: 8 }} />
            <Skeleton width="60%"  height={12} />

        </div>
    );
}
