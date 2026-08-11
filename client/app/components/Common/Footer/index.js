/**
 *
 * Footer
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Newsletter from '../../../containers/Newsletter';

const Footer = () => {
  const infoLinks = [
    { id: 0, name: 'Contact Us', to: '/contact' },
    { id: 1, name: 'Sell With Us', to: '/sell' },
    { id: 2, name: 'Shipping & Delivery', to: '/shipping' }
  ];

  const footerLinks = infoLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <Link to={item.to}>{item.name}</Link>
    </li>
  ));

  return (
    <footer className='footer'>
      <Container>
        <div className='footer-content'>

          {/* Customer Service */}
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Customer Service</h3>
            </div>

            <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div>
          </div>

          {/* My Account */}
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>My Account</h3>
            </div>

            <div className='block-content'>
              <ul className='support-links'>
                <li className='footer-link'>
                  <Link to='/dashboard'>Account Details</Link>
                </li>

                <li className='footer-link'>
                  <Link to='/dashboard/orders'>My Orders</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='text-uppercase'>Stay Updated</h3>
            </div>

            <div className='block-content'>
              <p>Get the latest offers and updates from SmartBuy.</p>
              <Newsletter />
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className='footer-copyright'>
          <span>© {new Date().getFullYear()} SmartBuy. All rights reserved.</span>
        </div>

        {/* Social Media */}
        <ul className='footer-social-item'>
          <li>
            <a href='/#facebook' rel='noreferrer noopener' target='_blank'>
              <span className='facebook-icon' />
            </a>
          </li>

          <li>
            <a href='/#instagram' rel='noreferrer noopener' target='_blank'>
              <span className='instagram-icon' />
            </a>
          </li>

          <li>
            <a href='/#pinterest' rel='noreferrer noopener' target='_blank'>
              <span className='pinterest-icon' />
            </a>
          </li>

          <li>
            <a href='/#twitter' rel='noreferrer noopener' target='_blank'>
              <span className='twitter-icon' />
            </a>
          </li>
        </ul>

      </Container>
    </footer>
  );
};

export default Footer;