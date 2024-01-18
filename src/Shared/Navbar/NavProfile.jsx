import useAuth from "../../Hooks/useAuth";

const NavProfile = () => {
    const { user, logout } = useAuth();
    const name = user.email.split('')[0];

    const handleSignOut = () => {
        logout()
            .then(() => { })
    }


    return (
        <div className="dropdown dropdown-end z-20 md:block hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className=" rounded-full">
                    {
                        user.photoURL ? <img src={user.photoURL} />
                            :
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-12">
                                    <span>{name}</span>
                                </div>
                            </div>

                    }
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>{user?.displayName}</a></li>
                <li onClick={handleSignOut}><a>Logout</a></li>
            </ul>
        </div>
    );
};

export default NavProfile;