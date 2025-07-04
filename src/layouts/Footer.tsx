const Footer = () => {
    return (
        <footer className="h-[120px] bg-gray-800 text-white">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between h-full px-4">
                {/* Left Section */}
                <div className="text-center sm:text-left mb-3 sm:mb-0">
                    <h2 className="text-lg font-semibold">Library Management System</h2>
                    <p className="text-sm text-gray-300">
                        © {new Date().getFullYear()} All Rights Reserved.
                    </p>
                </div>

                {/* Center Section */}
                <div className="mb-3 sm:mb-0">
                    <a
                        href="#"
                        className="text-blue-400 hover:underline mx-2 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="text-blue-400 hover:underline mx-2 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Terms of Use
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;