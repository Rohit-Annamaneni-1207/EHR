const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    );
}

const Navbar = () => {
    return (
        <nav className="w-full flex justify-center justify-between items-center p-4">
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Doctor", "Patient", "Wallets"].map((item, index)=>(<NavbarItem key={item+index} title={item} />))}
            </ul>
        </nav>
    );
}

export default Navbar;