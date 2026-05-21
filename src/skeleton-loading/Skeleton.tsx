/**
 *Skeleton class
 *
 * @version 1.0.0 - 20 may. 2026
 * @author Matias Belmar - mati.belmar0625@gmail.com
 * @since 1.0.0 - 20 may. 2026
 *
 **/
interface SkeletonProps {
    width?: string | number; //ej: "70%", 200 default: "100%"
    height?: string | number;//ej: 12, "1rem" default: 16px
    circle?: boolean; //true → border-radius 50% (para avatares)
    style?: React.CSSProperties; //estilos extra opcionales
}

export default function ({ width, height, circle, style }: SkeletonProps) {
    return (
        <div
        className="skeleton"
        style={{
            width: width ?? '100%', //si no se pasa del width ocupa el contenedor
            height: height ?? 16,//altura por defectp
            borderRadius: circle ? '50%' : 4,//circulos para avatar
            ...style,//margen para los estilos adicionales
        }}>

        </div>
    )
}