  import qz from './qz-tray.js'
  import * as jsrsasign from './jsrsasign.js'

  const crypto = require('crypto');
  qz.api.setSha256Type(function(data) {
     return crypto.createHash('sha256').update(data).digest('hex');
  });
  qz.security.setCertificatePromise(function(resolve, reject) {
          resolve(`-----BEGIN CERTIFICATE-----
  MIIE5DCCAs6gAwIBAgIDMzc0MAsGCSqGSIb3DQEBBTCBmDELMAkGA1UEBhMCVVMx
  CzAJBgNVBAgMAk5ZMRswGQYDVQQKDBJRWiBJbmR1c3RyaWVzLCBMTEMxGzAZBgNV
  BAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcGA1UEAwwQcXppbmR1c3RyaWVzLmNv
  bTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBxemluZHVzdHJpZXMuY29tMB4XDTE1
  MDgxNzIxMDAwMFoXDTE3MDgxODIxMDAwMFowgbAxCzAJBgNVBAYMAlVTMRMwEQYD
  VQQIDApDYWxpZm9ybmlhMRMwEQYDVQQHDApTYW4gQ2FybG9zMRkwFwYDVQQKDBBW
  aWJyYW50IFNjaWVuY2VzMRkwFwYDVQQLDBBWaWJyYW50IFNjaWVuY2VzMRkwFwYD
  VQQDDBBWaWJyYW50IFNjaWVuY2VzMSYwJAYJKoZIhvcNAQkBDBd2aW5vZGhAbS52
  aWJyYW50c2NpLmNvbTCCASAwCwYJKoZIhvcNAQEBA4IBDwAwggEKAoIBAQDFPJSJ
  6ZTKtKwcay5jJKHsd45KULlqdCr8svu/hcihpM+nOfRaN40umrgJeVtn6Mt2G39E
  Xl95py4PYdJqUZC6HGzJAihtQt0vCCHRFB6QBVyfJi3urjDqiDjmdg5ZQN1afCS6
  R6OvcmTDjfUvEBxzuPRcRPob5diiNP/kGkM+lzSeJMup+nd2ZbhzLaMGuOpL15RA
  0glaQ0MAnYbp/G5TB645XTkfNBEocjBqu0euRlawsc3w1puvjDBKPzHk6HrApp3f
  fgF4ab+QXpmYcTv/PSPxk2Azqr716cai4330dHFKUwlElGrnHLfRXRwvtmvOavL7
  BgAQKWfHNaa7y/btAgMBAAGjIzAhMB8GA1UdIwQYMBaAFJCmULeE1LnqX/IFhBN4
  ReipdVRcMAsGCSqGSIb3DQEBBQOCAgEAb+W8hD6qvrMudpj7VZl4oPQTpX86PI4j
  EZ6FmoO8S0FN4oh7WFSGlSWIDtYtTTkM3SASzzr7Wq3W50a5jrt3qLRdcGatduHy
  no6WPTR/ZqCyh7ORIna5ZnZMTw8wxyS2n1qdH2iOSFbeZzc1NS/Mn/tCoy1cSGnV
  Le89QQzK8zbTxUA3U0CDFlwc9cYdGQt8MC/9hrICAM6H3UdfErfNPDp8b2rb5bTZ
  PE2B5Hqjr6KwTCanzmuq0kvnpKsd/rCQu+yF+PCwrAiAWCuXPmjtGC/gTMnNEnHA
  vGCI0sdvHAIiog/zT5b0/TS5fgMUwwMSSIQLBPm8TRZorumKgru7Ip75aZ+Z1+db
  IkUHlbwmHHpvQ1wPQklAp5vhbVnNHk8XE8Wr3ENgJ/fphtCdIJnNsCrkoCPrQk/Y
  9VWOkusIzdFZiQd9S4IAPVrqN18mr9adO+QCasrtkRTCH9zot/5EGJpLZoS+f/5X
  2qnI26w4SMUmzTffXkFP5wdGN/ohpSu6FE2DGdJd9qqjfIE2OAMFyCEsl6sT8skM
  3VJAhudVTFKUzdKk0SyJxvmhRk/GjQy4akbaMCJHd/ed+x9mPc2O62wC+n62zTAw
  822PJrV5Jxmff5Yo6d7OQxn3fEMBFEwoFHiTTQSA2nRKQzpVjKGeC0uj1TW5rM2n
  zgQ28qbcA/8=
  -----END CERTIFICATE-----
  --START INTERMEDIATE CERT--
  -----BEGIN CERTIFICATE-----
  MIIFEjCCA/qgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgawxCzAJBgNVBAYTAlVT
  MQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYDVQQKDBJRWiBJ
  bmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcG
  A1UEAwwQcXppbmR1c3RyaWVzLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBx
  emluZHVzdHJpZXMuY29tMB4XDTE1MDMwMjAwNTAxOFoXDTM1MDMwMjAwNTAxOFow
  gZgxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0
  cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMM
  EHF6aW5kdXN0cmllcy5jb20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1
  c3RyaWVzLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANTDgNLU
  iohl/rQoZ2bTMHVEk1mA020LYhgfWjO0+GsLlbg5SvWVFWkv4ZgffuVRXLHrwz1H
  YpMyo+Zh8ksJF9ssJWCwQGO5ciM6dmoryyB0VZHGY1blewdMuxieXP7Kr6XD3GRM
  GAhEwTxjUzI3ksuRunX4IcnRXKYkg5pjs4nLEhXtIZWDLiXPUsyUAEq1U1qdL1AH
  EtdK/L3zLATnhPB6ZiM+HzNG4aAPynSA38fpeeZ4R0tINMpFThwNgGUsxYKsP9kh
  0gxGl8YHL6ZzC7BC8FXIB/0Wteng0+XLAVto56Pyxt7BdxtNVuVNNXgkCi9tMqVX
  xOk3oIvODDt0UoQUZ/umUuoMuOLekYUpZVk4utCqXXlB4mVfS5/zWB6nVxFX8Io1
  9FOiDLTwZVtBmzmeikzb6o1QLp9F2TAvlf8+DIGDOo0DpPQUtOUyLPCh5hBaDGFE
  ZhE56qPCBiQIc4T2klWX/80C5NZnd/tJNxjyUyk7bjdDzhzT10CGRAsqxAnsjvMD
  2KcMf3oXN4PNgyfpbfq2ipxJ1u777Gpbzyf0xoKwH9FYigmqfRH2N2pEdiYawKrX
  6pyXzGM4cvQ5X1Yxf2x/+xdTLdVaLnZgwrdqwFYmDejGAldXlYDl3jbBHVM1v+uY
  5ItGTjk+3vLrxmvGy5XFVG+8fF/xaVfo5TW5AgMBAAGjUDBOMB0GA1UdDgQWBBSQ
  plC3hNS56l/yBYQTeEXoqXVUXDAfBgNVHSMEGDAWgBQDRcZNwPqOqQvagw9BpW0S
  BkOpXjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAJIO8SiNr9jpLQ
  eUsFUmbueoxyI5L+P5eV92ceVOJ2tAlBA13vzF1NWlpSlrMmQcVUE/K4D01qtr0k
  gDs6LUHvj2XXLpyEogitbBgipkQpwCTJVfC9bWYBwEotC7Y8mVjjEV7uXAT71GKT
  x8XlB9maf+BTZGgyoulA5pTYJ++7s/xX9gzSWCa+eXGcjguBtYYXaAjjAqFGRAvu
  pz1yrDWcA6H94HeErJKUXBakS0Jm/V33JDuVXY+aZ8EQi2kV82aZbNdXll/R6iGw
  2ur4rDErnHsiphBgZB71C5FD4cdfSONTsYxmPmyUb5T+KLUouxZ9B0Wh28ucc1Lp
  rbO7BnjW
  -----END CERTIFICATE-----`);
      });

  var privateKey = `-----BEGIN RSA PRIVATE KEY-----
  MIIEpAIBAAKCAQEAxTyUiemUyrSsHGsuYySh7HeOSlC5anQq/LL7v4XIoaTPpzn0
  WjeNLpq4CXlbZ+jLdht/RF5feacuD2HSalGQuhxsyQIobULdLwgh0RQekAVcnyYt
  7q4w6og45nYOWUDdWnwkukejr3Jkw431LxAcc7j0XET6G+XYojT/5BpDPpc0niTL
  qfp3dmW4cy2jBrjqS9eUQNIJWkNDAJ2G6fxuUweuOV05HzQRKHIwartHrkZWsLHN
  8Nabr4wwSj8x5Oh6wKad334BeGm/kF6ZmHE7/z0j8ZNgM6q+9enGouN99HRxSlMJ
  RJRq5xy30V0cL7Zrzmry+wYAEClnxzWmu8v27QIDAQABAoIBABA5doKNu1adXBcO
  Xgd7yPIZt5O3ZjkyiyK0Wm8bwzBAzXAVHVuafDucMI1e9Tzr8mipxGNMXBA2x1wu
  kM98HCqjEfPLAKZUPLuUsKtxOz5foonY6yhaHd39DKkwhueipVK/KYpFQFq7Tzyi
  3ctcSOrgCQHaDrTiyFo3f+E0o9lvE3ypGKaRuHOx+/nJaBNHXtDfG8XmQ34iFuzs
  87m5sYw7Qk19/YM3ozLEvXGKSepKYQFCm8XvBgltfn/s+WsrAOKs5SXQpmRdXXNS
  acXbb93HKQMqcmUl2hIiKmSj621IFNlVs+7Cdb80CKwTJhvdAnlDxO7+GSXcyf5t
  XvLdQAECgYEA/np+67IXNuBGOmwGl0SlgvME09q8vQfRwgdVVhttiAvhSLX5+99E
  alghul4jDjsIm62a6+JNRnxi/IzPQ1aE2UiUQf/CyBx2QmAwTtGrz6H+1dUrpRiu
  JyMG/FuwHEmtBH2JfHBEwujovKrlroRaDdSHKgLAH0OI/f09BAmu5u0CgYEAxmp4
  XjQVQS8aneb8aNjA0fFaiFEXp2HldpLP1C0JWrfwkaPawz83eqHHyOZhc2dbBAQa
  3s1MsaJ938OKXZKwvxGC3Oie9bCtvXPO4xm4YKweBjNqFB1NQyfsT1g7yI+Xsd+E
  rpIAVGKZm7J3In9h9Fpe9KszZjDfrBHlYrhfUAECgYEAz5R2gaZ0/0N0peVGfw/0
  /ttjXbj46i09sksvFh0rfKVMMHaYoxddhG29nXt6lvoarHqxe6bOqCeAy0fFLcWe
  emuU3D1X0so8wSobXb/0qVsYN686eeKm9K/C3Amin4CNzLLmeoZN4LwCVRwGXRQD
  LXLmiqNRum7piV2P7wJDFIUCgYAD/kqT4sp2uGL5wJdd6NbgotHmonMubDr5CvVh
  2NIyYDdYRwr1GQWd0zm5ImHdt7vONeLwjwM3JAUShtX3Eie6gLi4h3oDid3FTVph
  mbfrQiuMhmZhJ0HR0zDfW/BAFhvAebYq6UdWa3GZ/5qEODoZd+QnWna7XMpzpRyP
  wxQwAQKBgQDtSPIdhORuGGPIz9R0l5gSpn1Ws0Hh11ir1Zp0cVRWSJlh2JKGDTxS
  rHE5Yw7ZE6p4nXrEaFU7zDI8icnSTBJfZTzP1M1KShAGMrnoeHn5VKUBcVJ73dyy
  zTQ8m1Vhh+PamBxZbBZQ4Hm9RQrWbAyNT7VSdy4u6buhT3whMnuLjQ==
  -----END RSA PRIVATE KEY-----`;

  qz.security.setSignaturePromise(function(toSign) {
      return function(resolve, reject) {
          try {
              var pk = new jsrsasign.RSAKey();
              pk.readPrivateKeyFromPEMString(strip(privateKey));
              var hex = pk.signString(toSign, 'sha1');
              resolve(jsrsasign.stob64(jsrsasign.hextorstr(hex)));
          } catch (err) {
              console.error(err);
              reject(err);
          }
      };
  });

  function strip(key) {
      if (key.indexOf('-----') !== -1) {
          return key.split('-----')[2].replace(/\r?\n|\r/g, '');
      }
  }

  var printer = function (label, cb) {
    let printer_name = "ZDesigner GK420d";
    ///////////////////////////////////////////////////////////////

    if (!qz.websocket.isActive()) {
      qz.websocket.connect()
        .then(function() { 
          return qz.printers.find(printer_name);
        })
        .then(function(printer) {
          var config = qz.configs.create(printer);
          return qz.print(config, label);
        })
        .then(function(){
          qz.websocket.disconnect();
          cb();
        })
        .catch(function(e) { console.error(e); qz.websocket.disconnect();});
    } else {
      console.log("inside here, normal mode");
    }
  }

module.exports = {printer};