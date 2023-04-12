import React from 'react';
import { CgGlobeAlt as GlobeLogo, CgMail as MailLogo } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const ProfileNav = ({ pathname, profileData }) => {
    const pathItem = pathname.split('/');
    const { website, email, name } = profileData[0] || {
        name: '',
        email: '',
        website: '',
    };
    // website email name

    return (
        <section className='nav-container'>
            {/*--- person's nav --*/}
            <div className='person-nav'>
                {/* path name */}
                <div className='navigation'>
                    <span>
                        <Link to='/people' className='medium-14 path-children'>
                            {pathItem[1]}
                        </Link>
                        <span className='medium-14 path-children'>/</span>
                        <Link to='/people' className='medium-14 path-children'>
                            {pathItem[2]}
                        </Link>
                        <span className='medium-14 path-children'>/</span>
                        <span className='medium-14 path-children'>{name}</span>
                    </span>
                </div>

                {/* links to a contact info */}
                <div className='person-contact'>
                    <ul>
                        {website && (
                            <li className='item'>
                                <a
                                    href={website}
                                    target='_blank'
                                    className='links'
                                    rel='noreferrer'
                                >
                                    <GlobeLogo className='medium-16 nav-icons' />
                                    <span className='medium-16 links-title'>
                                        personal website
                                    </span>
                                </a>
                            </li>
                        )}
                        {email && (
                            <li className='item'>
                                <a
                                    className='links email'
                                    href={`mailto:${email}`}
                                >
                                    <MailLogo className='medium-16 nav-icons' />
                                    <span className='medium-16 links-title'>
                                        personal Email
                                    </span>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProfileNav;
