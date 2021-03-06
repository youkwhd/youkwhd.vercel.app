import Footer from "../Footer";
import { Banner } from "../../types";

type Props = {
    children: JSX.Element | JSX.Element[];
    banners: Banner[];
};

export const MainLayout = ({ children, banners }: Props): JSX.Element => {
    return (
        <>
            <main>
                {children}
            </main>
            <Footer banners={banners}/>
        </>
    );
};

const Layout = {
    MainLayout,
};

export default Layout;
