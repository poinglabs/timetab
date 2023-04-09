import '../css/ShareBox.css';

import React, { useState } from 'react';

import LinkIcon from '@material-ui/icons/Link';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';

import Tooltip from '@material-ui/core/Tooltip';
import { Trans,useTranslation } from 'react-i18next';


function ShareBox() {

    const { i18n } = useTranslation();
    const [tooltipMessageLink, setTooltipMessageLink] = useState('Copy to clipboard');

    const handleShare = (platform) => {
        const message = i18n.t("settings.shareMessage", "Revamp your new tab page with Timetab. Check out this Chrome extension to stay on top of your life!");
        const url = 'https://timetab.poinglabs.com';

        switch (platform) {
        case 'link':
            navigator.clipboard.writeText("https://timetab.poinglabs.com")
            setTooltipMessageLink('Copied!');
            setTimeout(() => {
            setTooltipMessageLink('Copy to clipboard');
            }, 3000);
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${message}%20${url}`);
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer.php?u=${url}`);
            break;
        default:
            break;
        }
    };

  return (
    <div id="share-box">
      <span><Trans i18nKey="settings.share">Share</Trans>:</span>
        <Tooltip title={tooltipMessageLink} placement="top" arrow><LinkIcon style={{ fontSize: 16 }} className="share-icon" onClick={() => handleShare('link')} /></Tooltip>
        <WhatsAppIcon style={{ fontSize: 16 }} className="share-icon" onClick={() => handleShare('whatsapp')} />
        <FacebookIcon style={{ fontSize: 16 }} className="share-icon" onClick={() => handleShare('facebook')} />
    </div>
  );
}

export default ShareBox