import React from 'react'
import { Input, Typography } from '@mui/material'
import logo from './SyncCircle192.png';

const Footer = () => {
    return (
        <div className='Footer'>
            <div className='Logo'>
                <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, color: '#FFFFFF', fontFamily: 'Poppins', fontWeight: 700 }}>
                    <img src={logo} alt="SyncCircle Logo" style={{ width: '24px', height: '24px', marginRight: '10px', verticalAlign: 'middle' }} />
                    SyncCircle
                </Typography>
                <b6>Copyright © 2024 SyncCircle ltd.</b6>
                <b6>All rights reserved</b6>
                <div className='Icons'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                        <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M0 16.6719C0 7.83532 7.16344 0.671875 16 0.671875C24.8366 0.671875 32 7.83532 32 16.6719C32 25.5084 24.8366 32.6719 16 32.6719C7.16344 32.6719 0 25.5084 0 16.6719Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0008 8.13843C13.6833 8.13843 13.3924 8.14856 12.4822 8.18998C11.5737 8.23158 10.9536 8.37541 10.4111 8.58643C9.84981 8.80439 9.37372 9.09595 8.8994 9.57044C8.42473 10.0448 8.13317 10.5209 7.9145 11.0819C7.70294 11.6247 7.55894 12.245 7.51805 13.1531C7.47734 14.0633 7.46667 14.3543 7.46667 16.6718C7.46667 18.9894 7.47699 19.2793 7.51823 20.1896C7.56001 21.098 7.70383 21.7181 7.91468 22.2607C8.13282 22.822 8.42437 23.2981 8.89887 23.7724C9.37301 24.247 9.8491 24.5393 10.41 24.7573C10.9529 24.9683 11.5732 25.1121 12.4815 25.1537C13.3917 25.1951 13.6824 25.2053 15.9997 25.2053C18.3175 25.2053 18.6074 25.1951 19.5176 25.1537C20.4261 25.1121 21.0469 24.9683 21.5898 24.7573C22.1509 24.5393 22.6263 24.247 23.1004 23.7724C23.5751 23.2981 23.8667 22.822 24.0853 22.2609C24.2951 21.7181 24.4391 21.0979 24.4818 20.1898C24.5227 19.2795 24.5333 18.9894 24.5333 16.6718C24.5333 14.3543 24.5227 14.0635 24.4818 13.1532C24.4391 12.2448 24.2951 11.6247 24.0853 11.0821C23.8667 10.5209 23.5751 10.0448 23.1004 9.57044C22.6258 9.09577 22.1511 8.80421 21.5893 8.58643C21.0453 8.37541 20.4249 8.23158 19.5164 8.18998C18.6062 8.14856 18.3164 8.13843 15.9981 8.13843H16.0008ZM15.2353 9.6762C15.4625 9.67584 15.716 9.6762 16.0008 9.6762C18.2792 9.6762 18.5492 9.68438 19.449 9.72526C20.281 9.76331 20.7326 9.90233 21.0334 10.0191C21.4316 10.1738 21.7155 10.3587 22.014 10.6574C22.3127 10.956 22.4976 11.2405 22.6526 11.6387C22.7694 11.9392 22.9086 12.3907 22.9464 13.2227C22.9873 14.1223 22.9962 14.3925 22.9962 16.6699C22.9962 18.9472 22.9873 19.2175 22.9464 20.117C22.9084 20.949 22.7694 21.4006 22.6526 21.701C22.4979 22.0993 22.3127 22.3828 22.014 22.6813C21.7153 22.98 21.4318 23.1649 21.0334 23.3195C20.7329 23.4369 20.281 23.5755 19.449 23.6136C18.5494 23.6545 18.2792 23.6634 16.0008 23.6634C13.7222 23.6634 13.4521 23.6545 12.5526 23.6136C11.7205 23.5752 11.269 23.4362 10.968 23.3194C10.5698 23.1647 10.2853 22.9798 9.98666 22.6811C9.68799 22.3825 9.5031 22.0987 9.34808 21.7003C9.23128 21.3999 9.09208 20.9483 9.05421 20.1163C9.01332 19.2167 9.00514 18.9465 9.00514 16.6677C9.00514 14.389 9.01332 14.1202 9.05421 13.2206C9.09226 12.3886 9.23128 11.937 9.34808 11.6362C9.50275 11.238 9.68799 10.9535 9.98666 10.6549C10.2853 10.3562 10.5698 10.1713 10.968 10.0163C11.2688 9.89896 11.7205 9.76029 12.5526 9.72206C13.3398 9.68651 13.6448 9.67584 15.2353 9.67406V9.6762ZM20.5558 11.0931C19.9905 11.0931 19.5318 11.5512 19.5318 12.1168C19.5318 12.6821 19.9905 13.1408 20.5558 13.1408C21.1212 13.1408 21.5799 12.6821 21.5799 12.1168C21.5799 11.5514 21.1212 11.0931 20.5558 11.0931ZM16.0008 12.2896C13.5807 12.2896 11.6186 14.2517 11.6186 16.6718C11.6186 19.0919 13.5807 21.0532 16.0008 21.0532C18.4209 21.0532 20.3824 19.0919 20.3824 16.6718C20.3824 14.2517 18.4209 12.2896 16.0008 12.2896ZM16.0008 13.8274C17.5717 13.8274 18.8453 15.1008 18.8453 16.6718C18.8453 18.2427 17.5717 19.5163 16.0008 19.5163C14.4298 19.5163 13.1563 18.2427 13.1563 16.6718C13.1563 15.1008 14.4298 13.8274 16.0008 13.8274Z" fill="white" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                        <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M0 16.6719C0 7.83532 7.16344 0.671875 16 0.671875C24.8366 0.671875 32 7.83532 32 16.6719C32 25.5084 24.8366 32.6719 16 32.6719C7.16344 32.6719 0 25.5084 0 16.6719Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.5333 16.6599C24.5333 17.237 24.4746 17.8133 24.3592 18.3751C24.2467 18.9235 24.08 19.4619 23.8617 19.9766C23.6483 20.4822 23.3837 20.9694 23.0745 21.4237C22.77 21.8752 22.4191 22.2988 22.0337 22.6849C21.6474 23.0693 21.2224 23.4192 20.7711 23.7251C20.3152 24.0322 19.8273 24.2964 19.3215 24.5107C18.806 24.7279 18.2664 24.8943 17.7184 25.0066C17.1559 25.1223 16.5776 25.1814 15.9996 25.1814C15.4213 25.1814 14.8429 25.1223 14.2812 25.0066C13.7324 24.8943 13.1928 24.7279 12.6778 24.5107C12.1719 24.2964 11.6836 24.0322 11.2277 23.7251C10.7764 23.4193 10.3514 23.0693 9.96599 22.6849C9.58015 22.2988 9.22928 21.8752 8.92427 21.4237C8.61675 20.9694 8.35172 20.4821 8.13755 19.9766C7.91918 19.4619 7.75211 18.9234 7.63919 18.3751C7.52503 17.8133 7.46667 17.237 7.46667 16.6599C7.46667 16.0824 7.52499 15.5049 7.63922 14.9444C7.75215 14.396 7.91922 13.8567 8.13759 13.3429C8.35175 12.8369 8.61678 12.3493 8.9243 11.8949C9.22931 11.443 9.58018 11.0203 9.96602 10.6337C10.3515 10.2492 10.7765 9.90015 11.2278 9.59475C11.6836 9.28641 12.172 9.02223 12.6778 8.8075C13.1929 8.58985 13.7324 8.42302 14.2812 8.31153C14.8429 8.19669 15.4213 8.13843 15.9997 8.13843C16.5776 8.13843 17.1559 8.19669 17.7185 8.31153C18.2664 8.42305 18.806 8.58988 19.3215 8.8075C19.8273 9.02219 20.3153 9.28641 20.7711 9.59475C21.2224 9.90015 21.6475 10.2492 22.0337 10.6337C22.4191 11.0203 22.77 11.443 23.0746 11.8949C23.3837 12.3493 23.6483 12.8369 23.8617 13.3429C24.08 13.8567 24.2467 14.396 24.3592 14.9444C24.4746 15.5049 24.5333 16.0824 24.5333 16.6599ZM12.8903 10.0778C10.8581 11.0361 9.34131 12.906 8.86836 15.1595C9.06048 15.1612 12.0973 15.1995 15.5962 14.2711C14.3349 12.0334 12.9874 10.2072 12.8903 10.0778ZM16.2 15.3917C12.4477 16.5134 8.84711 16.4327 8.71795 16.4278C8.71585 16.506 8.71211 16.5817 8.71211 16.6599C8.71211 18.5294 9.41839 20.2337 10.5793 21.5223C10.5768 21.5186 12.5711 17.9856 16.5038 16.7157C16.5988 16.6841 16.6955 16.6558 16.7913 16.6283C16.6084 16.2147 16.4087 15.8003 16.2 15.3917ZM20.8124 11.1983C19.5293 10.0686 17.8447 9.38339 15.9996 9.38339C15.4075 9.38339 14.8329 9.45496 14.2824 9.58727C14.3916 9.73375 15.7604 11.547 17.0067 13.8322C19.7565 12.8028 20.7944 11.225 20.8124 11.1983ZM17.288 17.8341C17.2718 17.8395 17.2556 17.8441 17.2397 17.8499C12.94 19.3467 11.5358 22.3632 11.5206 22.3961C12.7578 23.3568 14.3096 23.9365 15.9996 23.9365C17.0088 23.9365 17.9701 23.7313 18.8448 23.3598C18.7368 22.724 18.3135 20.4954 17.288 17.8341ZM20.0719 22.6949C21.7082 21.5922 22.8703 19.8414 23.1945 17.8133C23.0445 17.765 21.0057 17.1205 18.6535 17.4971C19.6093 20.1201 19.9977 22.2563 20.0719 22.6949ZM17.5676 14.9165C17.7368 15.2635 17.9006 15.6167 18.0518 15.9717C18.1056 16.099 18.1581 16.2239 18.2093 16.3487C20.7128 16.0341 23.1792 16.5634 23.2846 16.585C23.2679 14.8599 22.65 13.2767 21.6275 12.0372C21.6137 12.0567 20.4449 13.7431 17.5676 14.9165Z" fill="white" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                        <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M0 16.6719C0 7.83532 7.16344 0.671875 16 0.671875C24.8366 0.671875 32 7.83532 32 16.6719C32 25.5084 24.8366 32.6719 16 32.6719C7.16344 32.6719 0 25.5084 0 16.6719Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5208 13.677L15.5544 14.2306L14.9948 14.1628C12.9579 13.9029 11.1784 13.0216 9.66756 11.5415L8.92891 10.8071L8.73865 11.3494C8.33575 12.5584 8.59316 13.8352 9.43253 14.6939C9.8802 15.1684 9.77948 15.2362 9.00725 14.9537C8.73865 14.8633 8.50363 14.7955 8.48124 14.8294C8.4029 14.9085 8.6715 15.9367 8.88414 16.3435C9.17513 16.9084 9.76828 17.462 10.4174 17.7897L10.9658 18.0496L10.3167 18.0609C9.68994 18.0609 9.66756 18.0722 9.73471 18.3094C9.95854 19.0439 10.8427 19.8235 11.8276 20.1624L12.5214 20.3997L11.9171 20.7613C11.0218 21.281 9.96973 21.5748 8.91772 21.5974C8.41409 21.6087 8 21.6539 8 21.6877C8 21.8007 9.36538 22.4335 10.16 22.682C12.5438 23.4164 15.3753 23.1001 17.5017 21.8459C19.0126 20.9533 20.5235 19.1794 21.2286 17.462C21.6091 16.5468 21.9896 14.8746 21.9896 14.0724C21.9896 13.5527 22.0232 13.4849 22.6499 12.8635C23.0192 12.5019 23.3662 12.1065 23.4333 11.9935C23.5452 11.7788 23.534 11.7788 22.9633 11.9709C22.012 12.3098 21.8777 12.2646 22.3477 11.7562C22.6947 11.3946 23.1088 10.7393 23.1088 10.5472C23.1088 10.5133 22.9409 10.5698 22.7506 10.6715C22.5492 10.7845 22.1015 10.954 21.7658 11.0557L21.1614 11.2478L20.613 10.8749C20.3108 10.6715 19.8856 10.4455 19.6617 10.3778C19.0909 10.2196 18.218 10.2422 17.7032 10.4229C16.3042 10.9314 15.4201 12.242 15.5208 13.677Z" fill="white" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                        <path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M0 16.6719C0 7.83532 7.16344 0.671875 16 0.671875C24.8366 0.671875 32 7.83532 32 16.6719C32 25.5084 24.8366 32.6719 16 32.6719C7.16344 32.6719 0 25.5084 0 16.6719Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6677 11.1714C23.4021 11.3729 23.9804 11.9667 24.1767 12.7207C24.5333 14.0872 24.5333 16.9385 24.5333 16.9385C24.5333 16.9385 24.5333 19.7897 24.1767 21.1564C23.9804 21.9104 23.4021 22.5041 22.6677 22.7057C21.3369 23.0718 16 23.0718 16 23.0718C16 23.0718 10.6631 23.0718 9.33218 22.7057C8.59783 22.5041 8.0195 21.9104 7.82323 21.1564C7.46667 19.7897 7.46667 16.9385 7.46667 16.9385C7.46667 16.9385 7.46667 14.0872 7.82323 12.7207C8.0195 11.9667 8.59783 11.3729 9.33218 11.1714C10.6631 10.8052 16 10.8052 16 10.8052C16 10.8052 21.3369 10.8052 22.6677 11.1714ZM14.4 14.5385V19.8718L18.6667 17.2052L14.4 14.5385Z" fill="white" />
                    </svg>
                </div>
            </div>
            <div className='Email'>
                <h4>Stay up to date</h4>
                <div className='SendMail'>

                    <input placeholder='Your Email Address'></input>
                    <button onClick={() => console.log('success')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g clip-path="url(#clip0_869_422)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0303 0.969691C17.2341 1.17342 17.3031 1.47584 17.2079 1.74778L11.9579 16.7478C11.8563 17.038 11.5878 17.2369 11.2806 17.2494C10.9733 17.2619 10.6895 17.0856 10.5646 16.8046L7.6818 10.3182L1.1954 7.43538C0.91439 7.31049 0.738092 7.02671 0.750627 6.71945C0.763163 6.41219 0.961991 6.14371 1.25224 6.04213L16.2522 0.792127C16.5242 0.696948 16.8266 0.765962 17.0303 0.969691ZM9.14456 9.91612L11.1671 14.4667L14.7064 4.35429L9.14456 9.91612ZM13.6457 3.29362L3.53331 6.83297L8.0839 8.85546L13.6457 3.29362Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_869_422">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
                <h4>Contact Us: </h4>
                <h6 style={{ marginLeft: '10px' }}> synccircleapp@gmail.com</h6>

            </div>
        </div>
    )
}

export default Footer