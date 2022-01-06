import LinkedIn from "../assets/linkedin.png";
import Twitter from "../assets/twitter.png";
import Github from "../assets/github.png";

function Footer() {

    return (
        <footer className="grid md:grid-cols-3 lg:px-20 md:px-28 space-y-4 py-8 justify-center items-center px-5 border-t-2 mt-6 border-light-gray">
            <p className="text-light-gray dark:text-light-white">For development only.</p>
            <a href="https://www.dwinawan.com/" target="_blank" rel="noopener" className="text-light-gray text-center dark:text-light-white">The Designer</a>
            <div className="flex gap-6 items-center justify-between md:justify-end">
                <a href="https://www.linkedin.com/in/serdarrgokhann/" target="_blank" rel="noopener"><img className="w-10 h-10" src={LinkedIn} alt="instagram" /></a>
                <a href="https://twitter.com/serdarrgokhann" target="_blank" rel="noopener"><img className="w-10 h-10" src={Twitter} alt="twitter" /></a>
                <a href="https://github.com/serdargokhan" target="_blank" rel="noopener"><img className="w-10 h-10" src={Github} alt="github" /></a>
            </div>
        </footer>
    );
}

export default Footer;
