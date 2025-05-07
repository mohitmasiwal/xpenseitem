import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../storeredux/Theme';
const productsArr = [
    {
      id: 1,
      title: 'One8 Activewear T-Shirt',
      price: 1499,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/670232/01/fnd/IND/fmt/png',
    },
    {
      id: 2,
      title: 'One8 Virat Kohli Sneakers',
      price: 4499,
      imageUrl: 'https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/virat-kohli-4.jpg',
    },
    {
      id: 3,
      title: 'One8 Performance Shorts',
      price: 1999,
      imageUrl: ' ',
    },
    {
      id: 4,
      title: 'Virat Kohli Wearing One8',
      price: 2999,
      imageUrl: 'https://th.bing.com/th/id/OIP.5njpGINJALiXhWF0I2Q4DAHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 5,
      title: 'One8 Training Jacket',
      price: 2999,
      imageUrl: 'https://sule-hairtransplant.com/wp-content/uploads/2024/03/Hardik-Pandya-hair-transplant.jpg',
    },
    {
      id: 6,
      title: 'One8 Running Shoes',
      price: 5999,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/376676/01/fnd/IND/fmt/png',
    },
    {
      id: 7,
      title: 'Virat Kohli One8 Campaign',
      price: 1499,
      imageUrl: 'https://i.pinimg.com/736x/87/06/4d/87064de73891e37cd4d83831974aacd7.jpg',
    },
    {
      id: 8,
      title: 'One8 Signature Hoodie',
      price: 2799,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/670233/01/fnd/IND/fmt/png',
    },
    {
      id: 9,
      title: 'Virat Kohli with Puma Shoes',
      price: 4599,
      imageUrl: 'https://infashionbusiness.com/admin_assets/images/products/infashion-1691393649.jpg',
    },
    {
      id: 10,
      title: 'One8 Fitness Band',
      price: 1999,
      imageUrl: 'https://cdn.downtoearth.org.in/library/large/2022-09-06/0.25748700_1662457799_fitness.jpg',
    },
    {
      id: 11,
      title: 'One8 Casual Slides',
      price: 1099,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/372276/01/fnd/IND/fmt/png',
    },
    {
      id: 12,
      title: 'One8 Gym Duffle Bag',
      price: 2499,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/078411/01/fnd/IND/fmt/png',
    },
    {
      id: 1,
      title: 'One8 Activewear T-Shirt',
      price: 1499,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/670232/01/fnd/IND/fmt/png',
    },
    {
      id: 2,
      title: 'One8 Virat Kohli Sneakers',
      price: 4499,
      imageUrl: 'https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/virat-kohli-4.jpg',
    },
    {
      id: 3,
      title: 'One8 Performance Shorts',
      price: 1999,
      imageUrl: 'https://wallpapercave.com/wp/wp3978077.jpg',
    },
    {
      id: 4,
      title: 'Virat Kohli Wearing One8',
      price: 2999,
      imageUrl: 'https://th.bing.com/th/id/OIP.5njpGINJALiXhWF0I2Q4DAHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 5,
      title: 'One8 Training Jacket',
      price: 2999,
      imageUrl: 'https://sule-hairtransplant.com/wp-content/uploads/2024/03/Hardik-Pandya-hair-transplant.jpg',
    },
    {
      id: 6,
      title: 'One8 Running Shoes',
      price: 5999,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/376676/01/fnd/IND/fmt/png',
    },
    {
      id: 7,
      title: 'Virat Kohli One8 Campaign',
      price: 1499,
      imageUrl: 'https://i.pinimg.com/originals/2d/e6/c9/2de6c9e437408889cb9ff6de2781d7f0.jpg',
    },
    {
      id: 8,
      title: 'One8 Signature Hoodie',
      price: 2799,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/670233/01/fnd/IND/fmt/png',
    },
    {
      id: 9,
      title: 'Virat Kohli with Puma Shoes',
      price: 4599,
      imageUrl: 'https://infashionbusiness.com/admin_assets/images/products/infashion-1691393649.jpg',
    },
    {
      id: 10,
      title: 'One8 Fitness Band',
      price: 1999,
      imageUrl: 'https://cdn.downtoearth.org.in/library/large/2022-09-06/0.25748700_1662457799_fitness.jpg',
    },
    {
      id: 11,
      title: 'One8 Casual Slides',
      price: 1099,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/372276/01/fnd/IND/fmt/png',
    },
    {
      id: 12,
      title: 'One8 Gym Duffle Bag',
      price: 2499,
      imageUrl: 'https://images.puma.com/image/upload/f_auto,q_auto/global/078411/01/fnd/IND/fmt/png',
    }
  ];

const ProductListDemo = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <section
      className={`min-h-screen py-16 px-6 sm:px-10 bg-cover bg-center bg-fixed transition-all duration-300 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}
      style={{
        backgroundImage: isDarkMode
          ? 'url("https://th.bing.com/th/id/OIP.2c6s0tRUU6ItL0QkvVrbUQHaHa?rs=1&pid=ImgDetMain")'
          : 'url("https://wallpaperaccess.com/full/2009380.jpg")',
      }}
    >
      <div className="backdrop-blur-sm bg-black bg-opacity-60 rounded-3xl max-w-7xl mx-auto p-10">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 tracking-wide drop-shadow-xl uppercase">
            🏏 RCB x One8 Collection
          </h1>
          <button
            onClick={handleToggleTheme}
            className="px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white hover:scale-105 hover:shadow-lg transition"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {productsArr.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="bg-white bg-opacity-90 text-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-60 object-cover object-center transition-transform duration-300 hover:scale-105"
              />
              <div className="p-5 flex flex-col justify-between h-full">
                <h2 className="text-lg font-semibold mb-2 leading-tight">{product.title}</h2>
                <p className="text-md text-gray-700 font-medium mb-4">₹{product.price}</p>
                <button className="mt-auto w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-medium tracking-wide transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListDemo;
