# QR Code Generator

A small, free QR code generator that runs fully in the browser. Type a link or any text, pick a size and colours, download the PNG.

**Live demo:** https://motivationp81-star.github.io/qr-code-generator/

## Features

- Works with links, plain text, phone numbers — anything you can type
- Three download sizes: 256, 512 and 1024 px
- Custom code and background colours
- Private by design: your text is never uploaded anywhere; the code is drawn on your own device

## Run it locally

No build step. Open `index.html` in a browser, or:

```bash
npx serve .
```

The QR drawing itself uses the small [qrcodejs](https://github.com/davidshimjs/qrcodejs) library, loaded from a CDN.

## License

MIT
