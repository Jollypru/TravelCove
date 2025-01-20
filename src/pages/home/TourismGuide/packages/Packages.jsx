import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const Packages = () => {
    const {data: packages , isLoading} = useQuery({
        queryKey: ['randomPackages'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/packages/random');
            console.log(res.data);
            return res.data;
        }
    });
    if(isLoading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if (!packages || packages.length === 0) {
        return (
            <div className="text-center mt-10">
                <p>No packages available right now.</p>
            </div>
        );
    }
    return (
        <div>
           <h2>Our Packages</h2>
           <div>
            {
                packages.map(pkg => (
                    <div key={pkg._id}>
                        <img src={pkg.image} alt="" />
                        <div>
                            <h3>{pkg.title}</h3>
                            <p>{pkg.tourType}</p>
                            <p>{pkg.price}</p>
                            <Link to={`/packageDetails/${pkg._id}`}View Package></Link>
                        </div>
                    </div>
                ))
            }
           </div>

        </div>
    );
};

export default Packages;