import { useRecoilState, } from "recoil";
import { userState } from "../store/atoms/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Appber = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [user, setUser] = useRecoilState(userState)

    return <>

        {user.user?.id && <div className="w-full flex py-5 shadow-lg fixed top-0 z-10 bg-white">
            <div className="w-3/4 m-auto flex justify-between items-center">
                <div className="font-semibold text-3xl text-pink-600">TweetX</div>
                <ul className="flex space-x-20">
                    <NavItem to="/feed" currentPath={location.pathname}>
                        Feed
                    </NavItem>
                    <NavItem to="/users" currentPath={location.pathname}>
                        User
                    </NavItem>
                    <NavItem to="/profile" currentPath={location.pathname}>
                        Profile
                    </NavItem>
                </ul>
                <button className="font-bold bg-gray-300 rounded-lg px-5 py-2 shadow-md text-pink-600 hover:bg-slate-700" onClick={() => {
                    localStorage.removeItem('token');
                    setUser({ isLoading: true, user: null })
                    navigate('/login')
                    console.log(user)
                }}>Logout</button>
            </div>
        </div>}
    </>
}
interface NavItemProps {
    to: string;
    currentPath: string;
    children: React.ReactNode;
}
const NavItem: React.FC<NavItemProps> = ({ to, currentPath, children }) => {
    const isActive = to === currentPath
    const colorClass = isActive ? 'text-pink-400' : 'text-gray-300'
    return <div>
        <Link to={to} className={`font-semibold text-xl ${colorClass}`}>
            {children}
        </Link>
    </div>
}
export default Appber;