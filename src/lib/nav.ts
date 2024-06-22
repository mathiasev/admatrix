

type NavArea = "primary" | "secondary";
type NavItem = {
    name: string,
    path: string,
    isProtected: boolean,
    navArea: NavArea,
    icon: string
}
type Nav = NavItem[];

const Nav: Nav = [
    {
        name: "Dashboard",
        isProtected: true,
        path: '/',
        navArea: "primary",
        icon: "Home"
    },
    {
        name: "Campaigns",
        isProtected: true,
        path: "/campaigns",
        navArea: "primary",
        icon: "Archive"
    },
    {
        name: "Clients",
        isProtected: true,
        path: "/clients",
        navArea: "primary",
        icon: "Tag"
    }
];
export default Nav;