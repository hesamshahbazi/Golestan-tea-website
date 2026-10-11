# Golestan Tea website prototype

Next.js 14 / React / TypeScript presentation website with product pages and an
English/German home-page language switcher. Product detail copy is currently English.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Validate with `npm run lint`, `npx tsc --noEmit`,
and `npm run build`; run the production build with `npm start`.
The build downloads Google fonts and therefore needs network access.

## Prototype limitations

The product buttons are visual demos: no shopping cart, payment processing, order
storage, or checkout backend is implemented. Social links are placeholders.
Brand history, testimonials and commercial claims must be verified before publication.
Do not use this prototype to accept orders. No deployment is included in this repository.
