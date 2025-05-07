import React from 'react';

const Shoping = () => {
  const imageUrls = [
    'https://wallpapercave.com/wp/wp6636533.jpg',
    'https://wallpaperaccess.com/full/6903293.jpg',
    'https://th.bing.com/th/id/R.97fb32db458f379ed76cf465b1d0a185?rik=Rb1saQkpls0vzw&riu=http%3a%2f%2fposterwa.com%2fcdn%2fshop%2fproducts%2fIPL4_f88a8cac-e93b-4cef-a966-18f81276be1e.jpg%3fv%3d1659646840&ehk=e6GvivV%2bCde28xGIMA%2bPY1tSDTPAKaunnElmSKTb3I4%3d&risl=&pid=ImgRaw&r=0',
    ' https://wallpaperaccess.com/full/5014988.jpg',
 
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        backgroundColor: '#ff0000', 
        color: '#ffffff', 
        padding: '20px', 
        textAlign: 'center', 
        fontSize: '24px', 
        fontWeight: 'bold',
        borderRadius: '10px',
        marginBottom: '30px'
      }}>
        🎉 50% Off on Every RCB Match! Don't Miss Out! 🏏
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Promo ${index}`} style={{ width: '100%', borderRadius: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default Shoping;
