/* Banner: sticked at the bottom of every page.
 * consist of gif/images
 */
import Link from "next/link";

type Props = {
    src: string;
    index?: number;
    href: string;
};

const Banner = ({ src, index: _index, href }: Props): JSX.Element => {
    return (
        <Link href={href}>
            <a>
                {/* https://web.dev/optimize-cls/?utm_source=lighthouse&utm_medium=lr#images-without-dimensions */}
                <img src={src} alt={href} width={88} height={31} />
            </a>
        </Link>
    );
};

export default Banner;
