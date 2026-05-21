/**
 *Listrowskeleton class
 *
 * @version 1.0.0 - 20 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 20 may. 2026
 *
 **/

/* ListRowSkeleton
 Skeleton para listas de items (ej: ventas, productos en tabla).
 Acepta un prop `rows` para mostrar exactamente la misma cantidad de filas
 que el componente real va a renderizar — evita el salto visual al cargar.
*/
import Skeleton from './Skeleton';

interface ListRowSkeletonProps {
    rows?: number; // cuantas filas mostrar — default: 5
}

export default function ListRowSkeleton({ rows = 5 }: ListRowSkeletonProps) {
    return (
        <div style={{ background: '#161b27', border: '1px solid #1f2a3c', borderRadius: 16, padding: '0 1rem' }}>
            {/*
        Array.from({ length: rows }) genera un array vacío de N elementos
        solo para poder hacer .map() y renderizar N filas.
        El índice `i` se usa para variar los anchos y que no se vean todas iguales.
      */}
            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '13px 0',
                        borderBottom: '1px solid #1f2a3c',
                    }}
                >
                    {/* Icono cuadrado a la izquierda */}
                    <Skeleton width={36} height={36} style={{ borderRadius: 8, flexShrink: 0 }} />

                    {/* Bloque central: nombre del item + subtexto */}
                    <div style={{ flex: 1 }}>
                        {/* Anchos variables según el índice para simular texto real, no una cuadrícula uniforme */}
                        <Skeleton width={`${55 + (i % 3) * 10}%`} height={13} style={{ marginBottom: 6 }} />
                        <Skeleton width={`${30 + (i % 2) * 15}%`} height={11} />
                    </div>

                    {/* Valor a la derecha (ej: precio o cantidad) */}
                    <Skeleton width={50} height={13} />
                </div>
            ))}
        </div>
    );
}