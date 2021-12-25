const icons: Record<string, string> = {
  logo: '<svg version="1.2" baseProfile="tiny-ps" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><title>Logo</title><style>tspan { white-space:pre } .shp0 { fill: #288af2 } .shp1 { fill: #2379d5 } .shp2 { fill: #25aaff } .shp3 { fill: #2a91ff } </style><path id="Shape 18 copy" class="shp0" d="M0.56 4.29L11.26 9.21L23.79 46.99L0.56 35.15L0.56 4.29Z" /><path id="Shape 18" class="shp1" d="M7.54 0L23.78 16.06L23.85 47.54L7.92 34.44L7.54 0Z" /><path id="Shape 18 copy 2" class="shp2" d="M47.21 4.29L36.5 9.21L23.97 46.99L47.21 35.15L47.21 4.29Z" /><path id="Shape 18 copy 3" class="shp3" d="M39.96 0L23.07 16.06L23.14 47.54L39.58 34.44L39.96 0Z" /></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703.822-1.18.822H7.36c-.48 0-1.075-.216-1.178-.798L4.48 7.69 12 3.628l7.522 4.06-1.7 12.015z" ></path> <path d="M8.22 12.184c0 2.084 1.695 3.78 3.78 3.78s3.78-1.696 3.78-3.78-1.695-3.78-3.78-3.78-3.78 1.696-3.78 3.78zm6.06 0c0 1.258-1.022 2.28-2.28 2.28s-2.28-1.022-2.28-2.28 1.022-2.28 2.28-2.28 2.28 1.022 2.28 2.28z" ></path> </g> </svg>',
  notification:
    '<svg viewBox="0 0 24 24" aria-hidden="true" > <g> <path d="M21.697 16.468c-.02-.016-2.14-1.64-2.103-6.03.02-2.532-.812-4.782-2.347-6.335C15.872 2.71 14.01 1.94 12.005 1.93h-.013c-2.004.01-3.866.78-5.242 2.174-1.534 1.553-2.368 3.802-2.346 6.334.037 4.33-2.02 5.967-2.102 6.03-.26.193-.366.53-.265.838.102.308.39.515.712.515h4.92c.102 2.31 1.997 4.16 4.33 4.16s4.226-1.85 4.327-4.16h4.922c.322 0 .61-.206.71-.514.103-.307-.003-.645-.263-.838zM12 20.478c-1.505 0-2.73-1.177-2.828-2.658h5.656c-.1 1.48-1.323 2.66-2.828 2.66zM4.38 16.32c.74-1.132 1.548-3.028 1.524-5.896-.018-2.16.644-3.982 1.913-5.267C8.91 4.05 10.397 3.437 12 3.43c1.603.008 3.087.62 4.18 1.728 1.27 1.285 1.933 3.106 1.915 5.267-.024 2.868.785 4.765 1.525 5.896H4.38z" ></path> </g> </svg>',
  hashtag:
    '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M21 7.337h-3.93l.372-4.272c.036-.412-.27-.775-.682-.812-.417-.03-.776.27-.812.683l-.383 4.4h-6.32l.37-4.27c.037-.413-.27-.776-.68-.813-.42-.03-.777.27-.813.683l-.382 4.4H3.782c-.414 0-.75.337-.75.75s.336.75.75.75H7.61l-.55 6.327H3c-.414 0-.75.336-.75.75s.336.75.75.75h3.93l-.372 4.272c-.036.412.27.775.682.812l.066.003c.385 0 .712-.295.746-.686l.383-4.4h6.32l-.37 4.27c-.036.413.27.776.682.813l.066.003c.385 0 .712-.295.746-.686l.382-4.4h3.957c.413 0 .75-.337.75-.75s-.337-.75-.75-.75H16.39l.55-6.327H21c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-6.115 7.826h-6.32l.55-6.326h6.32l-.55 6.326z" ></path> </g> </svg>',
  messages:
    '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z" ></path> </g> </svg>',
  profile:
    '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z" ></path> </g> </svg>',
  more: '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <circle cx="17" cy="12" r="1.5"></circle> <circle cx="12" cy="12" r="1.5"></circle> <circle cx="7" cy="12" r="1.5"></circle> <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z" ></path> </g> </svg>',
  favorites:
    '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M19.9 23.5c-.157 0-.312-.05-.442-.144L12 17.928l-7.458 5.43c-.228.164-.53.19-.782.06-.25-.127-.41-.385-.41-.667V5.6c0-1.24 1.01-2.25 2.25-2.25h12.798c1.24 0 2.25 1.01 2.25 2.25v17.15c0 .282-.158.54-.41.668-.106.055-.223.082-.34.082zM12 16.25c.155 0 .31.048.44.144l6.71 4.883V5.6c0-.412-.337-.75-.75-.75H5.6c-.413 0-.75.338-.75.75v15.677l6.71-4.883c.13-.096.285-.144.44-.144z" ></path> </g> </svg>',
  notes:
    '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.414 0-.75.337-.75.75v15.5c0 .413.336.75.75.75h15.5c.414 0 .75-.337.75-.75V4.25c0-.413-.336-.75-.75-.75H4.25z" ></path> <path d="M17 8.64H7c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h10c.414 0 .75.335.75.75s-.336.75-.75.75zm0 4.11H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75zm-5 4.11H7c-.414 0-.75-.335-.75-.75s.336-.75.75-.75h5c.414 0 .75.337.75.75s-.336.75-.75.75z" ></path> </g> </svg>',
  'add-tweet':
    '<svg class="d-xl-none" viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z" ></path> </g> </svg>',
  search:
    '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" ></path> </g> </svg>',
  dots: '<svg viewBox="0 0 24 24" aria-hidden="true" > <g> <circle cx="5" cy="12" r="2"></circle> <circle cx="12" cy="12" r="2"></circle> <circle cx="19" cy="12" r="2"></circle> </g> </svg>',
  remove:
    '<svg viewBox="0 0 24 24" aria-hidden="true">  <g> <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z" /></g></svg>',
  messages_empty:
    '<svg id="Capa_1" version="1.1" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background: new 0 0 511.999 511.999" xml:space="preserve"> <g>   <g>     <path       d="M510.156,401.843L480.419,315.3c14.334-29.302,21.909-61.89,21.96-94.679c0.088-57.013-21.97-110.92-62.112-151.79    C400.117,27.953,346.615,4.942,289.615,4.039C230.51,3.105,174.954,25.587,133.187,67.353    c-40.274,40.273-62.612,93.366-63.319,150.102C30.174,247.341,6.745,293.936,6.822,343.705    c0.037,23.29,5.279,46.441,15.212,67.376L1.551,470.689c-3.521,10.247-0.949,21.373,6.713,29.035    c5.392,5.393,12.501,8.264,19.812,8.264c3.076,0,6.188-0.508,9.223-1.551l59.609-20.483c20.935,9.933,44.086,15.175,67.376,15.212    c0.084,0,0.164,0,0.248,0c50.51-0.002,97.46-24.035,127.237-64.702c30.987-0.816,61.646-8.317,89.363-21.876l86.544,29.738    c3.606,1.239,7.304,1.843,10.959,1.843c8.688,0,17.136-3.412,23.545-9.822C511.284,427.242,514.34,414.021,510.156,401.843z     M164.53,470.69c-0.065,0-0.134,0-0.199,0c-20.614-0.031-41.085-5.113-59.196-14.695c-3.724-1.969-8.096-2.31-12.078-0.942    l-61.123,21.003l21.003-61.122c1.368-3.983,1.028-8.355-0.942-12.078c-9.582-18.112-14.664-38.582-14.696-59.197    c-0.051-33.159,12.848-64.588,35.405-88.122c7.368,44.916,28.775,86.306,61.957,118.898    c32.937,32.351,74.339,52.949,119.011,59.683C230.084,457.367,198.288,470.69,164.53,470.69z M480.628,414.797    c-0.867,0.867-1.895,1.103-3.051,0.705l-92.648-31.836c-1.609-0.553-3.283-0.827-4.951-0.827c-2.459,0-4.909,0.595-7.126,1.769    c-26.453,13.994-56.345,21.416-86.447,21.462c-0.099,0-0.189,0-0.288,0c-100.863,0-184.176-81.934-185.774-182.773    c-0.805-50.785,18.513-98.514,54.394-134.395c35.881-35.881,83.618-55.192,134.396-54.392    c100.936,1.601,182.926,85.068,182.77,186.063c-0.047,30.102-7.468,59.995-21.461,86.446c-1.97,3.723-2.31,8.095-0.942,12.078    l31.835,92.648C481.732,412.905,481.494,413.932,480.628,414.797z"     />   </g> </g> <g>   <g>     <path       d="M376.892,139.512h-181.56c-8.416,0-15.238,6.823-15.238,15.238c0,8.416,6.823,15.238,15.238,15.238h181.56    c8.416,0,15.238-6.823,15.238-15.238C392.13,146.335,385.308,139.512,376.892,139.512z"     />   </g> </g> <g>   <g>     <path       d="M376.892,202.183h-181.56c-8.416,0-15.238,6.823-15.238,15.238s6.823,15.238,15.238,15.238h181.56    c8.416,0,15.238-6.823,15.238-15.238S385.308,202.183,376.892,202.183z"     />   </g> </g> <g>   <g>     <path       d="M307.004,264.852H195.331c-8.416,0-15.238,6.823-15.238,15.238c0,8.416,6.823,15.238,15.238,15.238h111.672    c8.416,0,15.238-6.823,15.238-15.238C322.241,271.675,315.42,264.852,307.004,264.852z"     />   </g> </g></svg>',
  message_keys:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>',
  error:
    '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48"><path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"></path></svg>',
  close:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z" /> </g></svg>',
  uploadImage:
    '<svg viewBox="0 0 24 24" aria-hidden="true"> <g> <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z" /> <circle cx="8.868" cy="8.309" r="1.542" /> </g></svg>',
  close_modal:
    '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-times fa-w-10 fa-3x"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg>',
  upload_audio:
    '<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">    <rect y="6" width="2.3" height="6" rx="1.15" fill="#7B7B7B" />   <rect     x="4.30078"     y="3"     width="2.3"     height="12"     rx="1.15"     fill="#7B7B7B"   />   <rect     x="12.9004"     y="5"     width="2.3"     height="8"     rx="1.15"     fill="#7B7B7B"   />   <rect     x="21.5"     y="7"     width="2.3"     height="4"     rx="1.15"     fill="#7B7B7B"   />   <rect     x="8.59961"     width="2.3"     height="18"     rx="1.15"     fill="#7B7B7B"   />   <rect     x="17.1992"     y="3"     width="2.3"     height="12"     rx="1.15"     fill="#7B7B7B"   /> </svg>',
  upload_image:
    '<svg   width="26"   height="26"   viewBox="0 0 26 26"   fill="none"   xmlns="http://www.w3.org/2000/svg" >   <path     d="M20.5827 7.04177H19.196L18.8493 5.95844C18.6246 5.32277 18.2077 4.77273 17.6565 4.38453C17.1052 3.99633 16.4469 3.78917 15.7727 3.79177H10.226C9.54519 3.79305 8.88196 4.0081 8.32993 4.40657C7.7779 4.80504 7.36494 5.36682 7.14935 6.01261L6.80268 7.09594H5.41602C4.55406 7.09594 3.72741 7.43835 3.11792 8.04784C2.50843 8.65733 2.16602 9.48399 2.16602 10.3459V19.0126C2.16602 19.8746 2.50843 20.7012 3.11792 21.3107C3.72741 21.9202 4.55406 22.2626 5.41602 22.2626H20.5827C21.4446 22.2626 22.2713 21.9202 22.8808 21.3107C23.4903 20.7012 23.8327 19.8746 23.8327 19.0126V10.3459C23.8399 9.91461 23.7611 9.48616 23.601 9.08558C23.4409 8.685 23.2027 8.3203 22.9001 8.01275C22.5976 7.70519 22.2369 7.46095 21.839 7.29424C21.4412 7.12754 21.0141 7.04171 20.5827 7.04177ZM21.666 18.9584C21.666 19.2458 21.5519 19.5213 21.3487 19.7245C21.1456 19.9276 20.87 20.0418 20.5827 20.0418H5.41602C5.1287 20.0418 4.85315 19.9276 4.64998 19.7245C4.44682 19.5213 4.33268 19.2458 4.33268 18.9584V10.2918C4.33268 10.0045 4.44682 9.7289 4.64998 9.52574C4.85315 9.32258 5.1287 9.20844 5.41602 9.20844H7.58268C7.81892 9.22077 8.0527 9.15544 8.24832 9.02242C8.44394 8.8894 8.59064 8.696 8.66602 8.47177L9.25102 6.69511C9.32369 6.47993 9.46215 6.29304 9.64683 6.16085C9.83151 6.02866 10.0531 5.95785 10.2802 5.95844H15.8268C16.054 5.95785 16.2755 6.02866 16.4602 6.16085C16.6449 6.29304 16.7833 6.47993 16.856 6.69511L17.441 8.47177C17.5105 8.67841 17.6408 8.85927 17.8147 8.9907C17.9887 9.12213 18.1982 9.19802 18.416 9.20844H20.5827C20.87 9.20844 21.1456 9.32258 21.3487 9.52574C21.5519 9.7289 21.666 10.0045 21.666 10.2918V18.9584ZM12.9993 9.20844C12.1423 9.20844 11.3045 9.46258 10.5919 9.93874C9.87927 10.4149 9.32385 11.0917 8.99587 11.8835C8.66789 12.6753 8.58208 13.5466 8.74928 14.3872C8.91648 15.2277 9.32919 15.9999 9.93522 16.6059C10.5412 17.2119 11.3134 17.6246 12.154 17.7918C12.9945 17.959 13.8658 17.8732 14.6576 17.5452C15.4495 17.2173 16.1262 16.6619 16.6024 15.9492C17.0785 15.2366 17.3327 14.3988 17.3327 13.5418C17.3327 12.3925 16.8761 11.2903 16.0635 10.4776C15.2508 9.66498 14.1486 9.20844 12.9993 9.20844V9.20844ZM12.9993 15.7084C12.5708 15.7084 12.1519 15.5814 11.7956 15.3433C11.4393 15.1052 11.1616 14.7668 10.9976 14.3709C10.8336 13.975 10.7907 13.5394 10.8743 13.1191C10.9579 12.6988 11.1643 12.3127 11.4673 12.0097C11.7703 11.7067 12.1564 11.5003 12.5767 11.4167C12.9969 11.3331 13.4326 11.376 13.8285 11.54C14.2244 11.704 14.5628 11.9817 14.8009 12.338C15.0389 12.6943 15.166 13.1132 15.166 13.5418C15.166 14.1164 14.9377 14.6675 14.5314 15.0738C14.1251 15.4802 13.574 15.7084 12.9993 15.7084Z"     fill="#7B7B7B"   /> </svg>',
  upload_video:
    '<svg   width="26"   height="26"   viewBox="0 0 26 26"   fill="none"   xmlns="http://www.w3.org/2000/svg" >   <path     d="M23.3235 7.74583C23.1588 7.65075 22.972 7.6007 22.7819 7.6007C22.5917 7.6007 22.4049 7.65075 22.2402 7.74583L18.416 9.63083C18.3852 8.7897 18.0292 7.99335 17.423 7.40939C16.8168 6.82544 16.0077 6.49943 15.166 6.5H5.41602C4.55406 6.5 3.72741 6.84241 3.11792 7.4519C2.50843 8.0614 2.16602 8.88805 2.16602 9.75V16.25C2.16602 17.112 2.50843 17.9386 3.11792 18.5481C3.72741 19.1576 4.55406 19.5 5.41602 19.5H15.166C16.0077 19.5006 16.8168 19.1746 17.423 18.5906C18.0292 18.0067 18.3852 17.2103 18.416 16.3692L22.2727 18.2975C22.4203 18.3732 22.5834 18.414 22.7493 18.4167C22.9522 18.4173 23.1511 18.361 23.3235 18.2542C23.4796 18.1566 23.6083 18.0208 23.6974 17.8597C23.7865 17.6986 23.8331 17.5174 23.8327 17.3333V8.66667C23.8331 8.48256 23.7865 8.3014 23.6974 8.14028C23.6083 7.97916 23.4796 7.84341 23.3235 7.74583ZM16.2493 16.25C16.2493 16.5373 16.1352 16.8129 15.932 17.016C15.7289 17.2192 15.4533 17.3333 15.166 17.3333H5.41602C5.1287 17.3333 4.85315 17.2192 4.64998 17.016C4.44682 16.8129 4.33268 16.5373 4.33268 16.25V9.75C4.33268 9.46268 4.44682 9.18713 4.64998 8.98397C4.85315 8.7808 5.1287 8.66667 5.41602 8.66667H15.166C15.4533 8.66667 15.7289 8.7808 15.932 8.98397C16.1352 9.18713 16.2493 9.46268 16.2493 9.75V16.25ZM21.666 15.5783L18.416 13.9533V12.0467L21.666 10.4217V15.5783Z"     fill="#7B7B7B"   /> </svg>',
  attributes:
    '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">   <path d="M23.097 10.3459L21.0495 9.66342L22.0137 7.73508C22.1114 7.53324 22.1441 7.30605 22.1072 7.08484C22.0704 6.86363 21.9657 6.65932 21.8078 6.50008L19.5003 4.19258C19.3403 4.03234 19.134 3.92631 18.9105 3.88939C18.687 3.85247 18.4576 3.88652 18.2545 3.98675L16.3262 4.95092L15.6437 2.90342C15.5716 2.68999 15.4348 2.50435 15.2522 2.37231C15.0697 2.24028 14.8506 2.16842 14.6253 2.16675H11.3753C11.1482 2.16617 10.9267 2.23697 10.742 2.36916C10.5573 2.50136 10.4188 2.68825 10.3462 2.90342L9.66366 4.95092L7.73533 3.98675C7.53349 3.88901 7.30629 3.85632 7.08508 3.89319C6.86387 3.93006 6.65956 4.03467 6.50033 4.19258L4.19283 6.50008C4.03259 6.66016 3.92655 6.86644 3.88963 7.08991C3.85271 7.31338 3.88676 7.5428 3.987 7.74592L4.95116 9.67425L2.90366 10.3568C2.69024 10.4288 2.50459 10.5656 2.37256 10.7482C2.24052 10.9307 2.16867 11.1498 2.167 11.3751V14.6251C2.16641 14.8522 2.23722 15.0738 2.36941 15.2584C2.5016 15.4431 2.68849 15.5816 2.90366 15.6543L4.95116 16.3368L3.987 18.2651C3.88926 18.4669 3.85657 18.6941 3.89343 18.9153C3.9303 19.1365 4.03491 19.3409 4.19283 19.5001L6.50033 21.8076C6.66041 21.9678 6.86669 22.0739 7.09016 22.1108C7.31363 22.1477 7.54305 22.1137 7.74616 22.0134L9.6745 21.0493L10.357 23.0968C10.4297 23.3119 10.5681 23.4988 10.7528 23.631C10.9375 23.7632 11.159 23.834 11.3862 23.8334H14.6362C14.8633 23.834 15.0848 23.7632 15.2695 23.631C15.4542 23.4988 15.5927 23.3119 15.6653 23.0968L16.3478 21.0493L18.2762 22.0134C18.4767 22.1087 18.7017 22.14 18.9206 22.1032C19.1396 22.0664 19.342 21.9632 19.5003 21.8076L21.8078 19.5001C21.9681 19.34 22.0741 19.1337 22.111 18.9103C22.1479 18.6868 22.1139 18.4574 22.0137 18.2542L21.0495 16.3259L23.097 15.6434C23.3104 15.5713 23.4961 15.4345 23.6281 15.252C23.7601 15.0695 23.832 14.8503 23.8337 14.6251V11.3751C23.8342 11.148 23.7634 10.9264 23.6312 10.7417C23.4991 10.5571 23.3122 10.4186 23.097 10.3459ZM21.667 13.8451L20.367 14.2784C20.0681 14.3754 19.7938 14.5362 19.5632 14.7498C19.3327 14.9633 19.1513 15.2245 19.0317 15.5151C18.9122 15.8058 18.8573 16.1189 18.8709 16.4329C18.8844 16.7469 18.9661 17.0542 19.1103 17.3334L19.7278 18.5684L18.5362 19.7601L17.3337 19.1101C17.0558 18.9717 16.7515 18.8946 16.4413 18.884C16.1311 18.8734 15.8223 18.9296 15.5357 19.0488C15.2491 19.1679 14.9914 19.3473 14.7802 19.5747C14.5689 19.802 14.409 20.0722 14.3112 20.3668L13.8778 21.6667H12.1553L11.722 20.3668C11.625 20.0678 11.4642 19.7935 11.2506 19.563C11.0371 19.3324 10.7759 19.1511 10.4853 19.0315C10.1946 18.9119 9.88147 18.857 9.56749 18.8706C9.25351 18.8842 8.94624 18.9659 8.667 19.1101L7.432 19.7276L6.24033 18.5359L6.89033 17.3334C7.03451 17.0542 7.11623 16.7469 7.1298 16.4329C7.14336 16.1189 7.08847 15.8058 6.96891 15.5151C6.84936 15.2245 6.668 14.9633 6.43744 14.7498C6.20687 14.5362 5.9326 14.3754 5.63366 14.2784L4.33366 13.8451V12.1551L5.63366 11.7218C5.9326 11.6248 6.20687 11.4639 6.43744 11.2504C6.668 11.0368 6.84936 10.7757 6.96891 10.485C7.08847 10.1944 7.14336 9.88122 7.1298 9.56724C7.11623 9.25327 7.03451 8.946 6.89033 8.66675L6.27283 7.46425L7.4645 6.27258L8.667 6.89008C8.94624 7.03427 9.25351 7.11598 9.56749 7.12955C9.88147 7.14312 10.1946 7.08822 10.4853 6.96867C10.7759 6.84911 11.0371 6.66776 11.2506 6.43719C11.4642 6.20662 11.625 5.93236 11.722 5.63342L12.1553 4.33342H13.8453L14.2787 5.63342C14.3756 5.93236 14.5365 6.20662 14.75 6.43719C14.9636 6.66776 15.2247 6.84911 15.5154 6.96867C15.806 7.08822 16.1192 7.14312 16.4332 7.12955C16.7471 7.11598 17.0544 7.03427 17.3337 6.89008L18.5687 6.27258L19.7603 7.46425L19.1103 8.66675C18.9719 8.94457 18.8948 9.24888 18.8842 9.55908C18.8737 9.86928 18.9298 10.1781 19.049 10.4647C19.1682 10.7513 19.3475 11.009 19.5749 11.2203C19.8023 11.4315 20.0724 11.5915 20.367 11.6892L21.667 12.1226V13.8451ZM13.0003 8.66675C12.1433 8.66675 11.3055 8.9209 10.5929 9.39705C9.88025 9.8732 9.32483 10.55 8.99685 11.3418C8.66887 12.1336 8.58306 13.0049 8.75026 13.8455C8.91746 14.6861 9.33017 15.4582 9.9362 16.0642C10.5422 16.6702 11.3144 17.083 12.1549 17.2502C12.9955 17.4174 13.8668 17.3315 14.6586 17.0036C15.4504 16.6756 16.1272 16.1202 16.6034 15.4076C17.0795 14.6949 17.3337 13.8571 17.3337 13.0001C17.3337 11.8508 16.8771 10.7486 16.0645 9.93596C15.2518 9.1233 14.1496 8.66675 13.0003 8.66675ZM13.0003 15.1667C12.5718 15.1667 12.1529 15.0397 11.7966 14.8016C11.4403 14.5635 11.1626 14.2251 10.9986 13.8292C10.8346 13.4333 10.7917 12.9977 10.8753 12.5774C10.9589 12.1571 11.1652 11.771 11.4683 11.468C11.7713 11.165 12.1573 10.9587 12.5776 10.875C12.9979 10.7914 13.4336 10.8344 13.8295 10.9983C14.2254 11.1623 14.5638 11.44 14.8018 11.7963C15.0399 12.1527 15.167 12.5716 15.167 13.0001C15.167 13.5747 14.9387 14.1258 14.5324 14.5321C14.1261 14.9385 13.575 15.1667 13.0003 15.1667Z" fill="#7B7B7B"/>   </svg>   '
}

export default icons