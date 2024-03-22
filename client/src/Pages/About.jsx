import React from 'react';
//about Page 
const About = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-2xl mx-auto p-3 text-center'>
            <div>
            <h1 className='text-3xl font-semibold text-center my-7'>
                About BookSphere Club
            </h1>
            <div className='text-md text-gray-500 flex flex-col gap-6'>
                <p>
                Welcome to BookSphere Club, a haven for book enthusiasts seeking the beauty of literature. Our club is a vibrant community that celebrates the magic of storytelling and the sheer joy of reading.
                </p>

                <p>
                Immerse yourself in a world where pages turn into portals, transporting you to new realms of imagination. Here, connecting with fellow readers and exploring diverse narratives is not just a hobby – it's a shared passion that binds us together.
                </p>

                <p>
                Join us in the pursuit of literary adventures, where every book is a journey waiting to unfold. BookSphere Club invites you to discover, connect, and embrace the boundless possibilities that the world of books offers. Let the love for reading unite us in this literary exploration.
                </p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default About;
