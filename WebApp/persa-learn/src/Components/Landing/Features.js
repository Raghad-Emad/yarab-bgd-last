import React from 'react';

function Features() {
  const features = [
    { title: 'Experienced Instructors', description: 'Learn from industry experts with real-world experience.' },
    { title: 'Flexible Learning', description: 'Study at your own pace with our flexible online courses.' },
    { title: 'Career Support', description: 'Get career guidance and job placement assistance.' },
  ];

  return (
    <section className="py-5 bg-light text-center">
      <div className="container">
        <h2 className="mb-4">Why Choose Us</h2>
        <div className="row">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
