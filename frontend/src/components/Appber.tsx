import { useRecoilState, } from "recoil";
import { userState } from "../store/atoms/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const Appber = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userState)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return <>

        {user.user?.id && <div className="w-full flex py-5 shadow-lg fixed top-0 z-10 bg-white">
            <div className=" w-3/4 m-auto flex justify-between items-center">
                <div className=" font-semibold text-3xl text-pink-600">TweetX</div>
                <ul className="hidden md:flex space-x-20">
                    <NavItem to="/feed" currentPath={location.pathname} onClick={() => setIsMenuOpen(false)}>
                        Feed
                    </NavItem>
                    <NavItem to="/users" currentPath={location.pathname} onClick={() => setIsMenuOpen(false)}>
                        User
                    </NavItem>
                    <NavItem to="/profile" currentPath={location.pathname} onClick={() => setIsMenuOpen(false)}>
                        Profile
                    </NavItem>
                </ul>
                <div className="md:hidden">
                    <button
                        className="focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 right-2 bg-white border rounded-lg shadow-md w-2/4 text-center ">
                        <ul className="flex flex-col space-y-3 p-2">
                            <NavItem to="/feed" currentPath={location.pathname} onClick={() => setIsMenuOpen(false)}>
                                Feed
                            </NavItem>
                            <NavItem to="/users" currentPath={location.pathname} onClick={() => setIsMenuOpen(false)}>
                                User
                            </NavItem>
                            <NavItem to="/profile" currentPath={location.pathname} onClick={() => setIsMenuOpen(false)}>
                                Profile
                            </NavItem>
                        </ul>
                        <button
                            className=" md:block font-bold bg-gray-300 rounded-lg px-5 py-2 shadow-md text-pink-600 hover:bg-slate-700"
                            onClick={() => {
                                localStorage.removeItem("token");
                                setUser({ isLoggedIn: false, user: null });
                                navigate("/login");
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>}
    </>
}
interface NavItemProps {
    to: string;
    currentPath: string;
    children: React.ReactNode;
    onClick?: () => void;
}
const NavItem: React.FC<NavItemProps> = ({ to, currentPath, children, onClick }) => {
    const isActive = to === currentPath
    const colorClass = isActive ? 'text-pink-400' : 'text-gray-300'
    return <div>
        <Link to={to} className={`font-semibold text-xl ${colorClass}`} onClick={onClick}>
            {children}
        </Link>
    </div>
}
export default Appber;