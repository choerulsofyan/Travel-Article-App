import React from "react";

const Home: React.FC = () => {
    return (
        <div className="container mx-auto px-4 pt-20">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Travel Article App</h1> {/* Heading */}
            <p className="text-gray-700 leading-relaxed w-3/4">
                Welcome to our travel article platform. Browse insightful articles about destinations worldwide. Join our community to contribute your
                own stories and discover new travel experiences.
            </p>
        </div>
    );
};

export default Home;
