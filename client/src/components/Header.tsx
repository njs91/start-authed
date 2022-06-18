import React, { FC, useContext, useMemo, useState } from 'react';
import headerStyles from '../css/components/header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import defaultStyles from '../css/default.module.scss';
import { faAngleRight, faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Section } from './default/Section';
import { UserContextType, UserContext } from '../contexts/UserContext';

interface HeaderProps {
    cls?: string;
}

export const Header: FC<HeaderProps> = ({ cls = '' }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Section clsOuter={`${headerStyles.headerOuter} ${cls}`} clsInner={headerStyles.headerInner} tag='header'>
            <h2>
                <Link to='/'>TITLE</Link>
            </h2>
            <div className={headerStyles.rightArea}>
                <FontAwesomeIcon icon={menuOpen ? faTimesCircle : faBars} onClick={() => setMenuOpen(!menuOpen)} />
                <div className={`${headerStyles.rightAreaInner} ${menuOpen ? headerStyles.open : ''}`}>
                    <AccountLinks links={links} />
                    <AccountButton />
                </div>
            </div>
        </Section>
    );
};

interface AccountLinksProps {
    links: Links;
}

const AccountLinks: FC<AccountLinksProps> = ({ links }) => (
    <ul>
        {links.map((link: LinkType) => (
            <li key={link.title}>
                <Link to={link.url}>
                    {link.title}
                    <FontAwesomeIcon icon={faAngleRight} />
                </Link>
            </li>
        ))}
    </ul>
);

const AccountButton = () => {
    const navigate = useNavigate();
    const { user, setAccount } = useContext<UserContextType>(UserContext);
    const text = useMemo(() => (user ? 'Log out' : 'Login'), [user]);

    const onClick = () => {
        if (user) {
            setAccount(null);
        }

        navigate('/login');
    };

    return (
        <button onClick={onClick} className={defaultStyles.btnSecondary}>
            {text}
        </button>
    );
};

export const links: Links = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'About',
        url: '/about',
    },
];

type LinkType = {
    title: string;
    url: string;
};
type Links = LinkType[];
