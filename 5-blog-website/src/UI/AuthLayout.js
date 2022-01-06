
function AuthLayout({ children }) {
    return (
        <div className="md:bg-top md:bg-140 bg-180 bg-center bg-no-repeat bg-register-img min-h-(screen-16) flex items-center justify-center">
            <div className="space-y-3 w-11/12 mx-4 px-6 py-4 text-light-dark lg:w-8/12 lg:mx-auto md:w-9/12 md:mx-auto md:px-5 border-2 border-light-purple rounded-2xl md:py-5 m-10 md:my-0 backdrop-blur-lg backdrop-hue-rotate-30">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
