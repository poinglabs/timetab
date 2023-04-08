import '../css/DonationBox.css';
import React, { useState, useEffect, useRef } from 'react';
import _ from "lodash";
import { Button } from '@material-ui/core';
import icon_mp from '../img/payment_methods/icon_mercado_pago.png';
import icon_btc from '../img/payment_methods/icon_bitcoin.png';
import icon_usdt from '../img/payment_methods/icon_usdt.png';
import { FileCopy } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { Trans } from 'react-i18next';

function MercadoPagoButton(props) {
  return (
    <React.Fragment>
      <span style={{marginRight: "15px"}}>Mercado Pago:</span><a className="mp-button" href={props.link} target="_blank"><Button style={{ height: "40px", marginRight : "20px" }} variant="contained" color="primary"><Trans i18nKey="settings.donations.mpButton">Donar $200</Trans></Button></a>
    </React.Fragment>
  )
}

function CryptoAddress(props) {

  const [tooltipMessage, setTooltipMessage] = useState('Copy to clipboard');

  const handleCopyClick = () => {
    
    navigator.clipboard.writeText(props.adress)
    setTooltipMessage('Copied!');
    setTimeout(() => {
      setTooltipMessage('Copy to clipboard');
    }, 3000);

  };

  return (
    <React.Fragment>
      <p>{props.text}</p>
      <div className='address_box'>
        <div className='address_box__text'>{props.adress}</div>
        <Tooltip title={tooltipMessage} placement="top" arrow>
          <div className='address_box__copy' onClick={handleCopyClick}><FileCopy style={{ fontSize: 18 }}/></div>
        </Tooltip>
     </div>
    </React.Fragment>
  )
}



function DonationBox(props) {

  const paymentMethods = [
    {
      "name" : "MercadoPago",
      "icon" : icon_mp,
      "details" : <MercadoPagoButton link="https://mpago.la/2RAggZa"/>
    },
    {
      "name" : "Bitcoin",
      "icon" : icon_btc,
      "details" : <CryptoAddress adress="1EzPiqijZYpnzDRDpMbjnaezBcQbH4iEVq" text="Bitcoin Network"/>
    },
    {
      "name" : "Theter",
      "icon" : icon_usdt,
      "details" : <CryptoAddress adress="0xf63b4c6579a7fab95755365f8f9a9b80b6e92f15" text="Tether (USDT). Networks: Polygon (MATIC), BNB Smart Chain (BEP20) or Ethereum (ERC20)"/>
    }
  ]


  const [paymentMethod, setpaymentMethod] = useState("MercadoPago");

  return (
    <div id="donation-box">
      <nav>
        <ul className='payment-methods'>
          {paymentMethods.map((method) => (
              <li key={method.name} onClick={() => setpaymentMethod(method.name)} className={`payment-method ${paymentMethod === method.name ? 'active' : ''}`} >
                <img src={method.icon} />
              </li>
            ))}
        </ul>
      </nav>
      <div className='payment-content'>
        {
          _.filter(paymentMethods, (method) => {
            return method.name === paymentMethod;
          })[0]["details"]
        }
      </div>
      </div>
  );
}

export default DonationBox

