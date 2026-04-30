import './CategoryBar.css';

const categories = [
  { id: 1, name: 'Moda', icon: '👕' },
  { id: 2, name: 'Elektronik', icon: '📱' },
  { id: 3, name: 'Ev & Yaşam', icon: '🏠' },
  { id: 4, name: 'Anne & Bebek', icon: '🍼' },
  { id: 5, name: 'Kozmetik', icon: '💄' },
  { id: 6, name: 'Mücevher', icon: '💎' },
  { id: 7, name: 'Spor & Outdoor', icon: '⚽' },
  { id: 8, name: 'Kitap & Oyun', icon: '🎮' },
  { id: 9, name: 'Otomobil', icon: '🚗' },
];

const CategoryBar = () => {
  return (
    <nav className="category-bar">
      <div className="container category-content">
        <ul className="category-list">
          {categories.map(cat => (
            <li key={cat.id} className="category-item">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-name">{cat.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryBar;
