import { useState } from 'react';
import { FiShoppingBag, FiFileText, FiRefreshCw } from 'react-icons/fi';
import { useAsync } from './skeleton-loading/Useasync';
import UserCardSkeleton from './skeleton-loading/UserCardSkeleton';
import ProductCardSkeleton from './skeleton-loading/Productcardskeleton';
import ListRowSkeleton from './skeleton-loading/Listrowskeleton';

interface User    { name: string; role: string; bio: string; }
interface Product { id: number; name: string; category: string; price: string; }
interface Sale    { id: number; product: string; qty: number; total: string; }

const fakeDelay = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));

async function fetchUser(): Promise<User> {
  await fakeDelay(2000);
  return { name: 'Valentina López', role: 'Administradora', bio: 'Encargada de la tienda desde 2021. Gestiona inventario y ventas diarias.' };
}
async function fetchProducts(): Promise<Product[]> {
  await fakeDelay(2500);
  return [
    { id: 1, name: 'Leche entera 1L',  category: 'Lácteos',   price: '$890'   },
    { id: 2, name: 'Pan marraqueta',    category: 'Panadería', price: '$150'   },
    { id: 3, name: 'Aceite vegetal 1L', category: 'Abarrotes', price: '$1.590' },
  ];
}
async function fetchSales(): Promise<Sale[]> {
  await fakeDelay(1800);
  return [
    { id: 1, product: 'Leche entera',   qty: 3,  total: '$2.670' },
    { id: 2, product: 'Pan marraqueta', qty: 10, total: '$1.500' },
    { id: 3, product: 'Aceite vegetal', qty: 1,  total: '$1.590' },
    { id: 4, product: 'Azúcar 1kg',     qty: 2,  total: '$2.180' },
    { id: 5, product: 'Café molido',    qty: 1,  total: '$3.490' },
  ];
}

const card: React.CSSProperties = {
  background: '#161b27',
  border: '1px solid #1f2a3c',
  borderRadius: 16,
  overflow: 'hidden',
};

function UserCard({ user }: { user: User }) {
  const initials = user.name.split(' ').map(n => n[0]).join('');
  return (
    <div style={card}>
      <div style={{ height: 64, background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }} />
      <div style={{ padding: '0 1.25rem 1.25rem', marginTop: -28 }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          border: '3px solid #161b27',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 17, color: '#fff',
        }}>
          {initials}
        </div>
        <p style={{ margin: '10px 0 2px', fontWeight: 700, fontSize: 16, color: '#f1f5f9' }}>{user.name}</p>
        <span style={{ background: '#4c1d9522', color: '#a78bfa', fontSize: 11, padding: '2px 10px', borderRadius: 999, fontWeight: 500 }}>
          {user.role}
        </span>
        <p style={{ marginTop: 12, fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>{user.bio}</p>
      </div>
    </div>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  const categoryColor: Record<string, string> = {
    'Lácteos':   '#22d3ee', 'Panadería': '#f472b6', 'Abarrotes': '#fb923c',
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      {products.map(p => (
        <div key={p.id} style={card}>
          <div style={{
            height: 110,
            background: 'linear-gradient(135deg, #1a2236, #0f1117)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><FiShoppingBag size={38} color="#6d28d9" /></div>
          <div style={{ padding: '0.9rem' }}>
            <span style={{
              background: `${categoryColor[p.category] ?? '#94a3b8'}18`,
              color: categoryColor[p.category] ?? '#94a3b8',
              fontSize: 10, padding: '2px 8px', borderRadius: 999, fontWeight: 600, textTransform: 'uppercase',
            }}>
              {p.category}
            </span>
            <p style={{ margin: '8px 0 4px', fontWeight: 600, fontSize: 13, color: '#e2e8f0' }}>{p.name}</p>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#34d399' }}>{p.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SalesList({ sales }: { sales: Sale[] }) {
  return (
    <div style={{ ...card, padding: '0 1rem' }}>
      {sales.map((s, i) => (
        <div key={s.id} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 0',
          borderBottom: i < sales.length - 1 ? '1px solid #1f2a3c' : 'none',
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: '#052e1622', border: '1px solid #064e3b44',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}><FiFileText size={18} color="#34d399" /></div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 500, fontSize: 14, color: '#e2e8f0' }}>{s.product}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#4b5563' }}>Cantidad: {s.qty}</p>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#34d399' }}>{s.total}</span>
        </div>
      ))}
    </div>
  );
}

const label: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
  color: '#4b5563', textTransform: 'uppercase', marginBottom: 10,
};

export default function App() {
  const [resetKey, setResetKey] = useState(0);
  const { data: user,     loading: loadingUser     } = useAsync<User>(fetchUser,          [resetKey]);
  const { data: products, loading: loadingProducts } = useAsync<Product[]>(fetchProducts, [resetKey]);
  const { data: sales,    loading: loadingSales    } = useAsync<Sale[]>(fetchSales,       [resetKey]);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <div>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#4b5563' }}>Panel de administración</p>
        </div>
        <button
          onClick={() => setResetKey(k => k + 1)}
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff', border: 'none',
            padding: '9px 18px', borderRadius: 10,
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <FiRefreshCw size={14} /> Recargar
        </button>
      </div>

      {/* Perfil + Ventas — dos columnas */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, marginBottom: 16 }}>
        <section>
          <p style={label}>Perfil</p>
          {loadingUser || !user ? <UserCardSkeleton /> : <UserCard user={user} />}
        </section>

        <section>
          <p style={label}>Ventas recientes</p>
          {loadingSales || !sales ? <ListRowSkeleton rows={5} /> : <SalesList sales={sales} />}
        </section>
      </div>

      {/* Productos */}
      <section>
        <p style={label}>Productos</p>
        {loadingProducts || !products ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <ProductCardSkeleton /><ProductCardSkeleton /><ProductCardSkeleton />
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>

    </div>
  );
}
