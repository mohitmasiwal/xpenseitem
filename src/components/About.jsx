import React from 'react';

const team = [
  {
    name: 'Mohit Masiwal',
    branch: 'Computer Science',
    image: 'https://th.bing.com/th/id/OIP.bln6_k2mfSfUZ6f318RPhQHaJQ?rs=1&pid=ImgDetMain',
  },
  {
    name: 'Gaurav Nainwal',
    branch: 'Information Technology',
    image: 'https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/virat-kohli-4.jpg',
  },
  {
    name: 'Rahul pathak',
    branch:  'Computer Science',
    image: 'https://gymfluencers.com/wp-content/uploads/2022/05/3702281.jpg',
  },
  {
    name: 'Divya Darsan',
    branch: 'Computer Science',
    image: 'https://www.bhmpics.com/downloads/chris-bumstead-wallpaper/42.photo2020-12-02_52823pm_d0ebaf64-6588-4c6d-b8d5-1daa3a7f076d_250x250@2x.jpg',
  },
];

const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-10">Meet the Team 💻</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-500"
              />
              <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
              <p className="text-gray-600">{member.branch}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
