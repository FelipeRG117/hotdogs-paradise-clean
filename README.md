This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 🆕 Agregar una Vertical

1. Edita `src/lib/constants/verticals.ts`:
   ```typescript
   export type Vertical =
     | "restaurant"
     | "service"
     | "creative"
     | "tu-nueva-vertical";
   export const VERTICAL_CONFIG = {
     restaurant: { primaryColor: "#E67E22" },
     service: { primaryColor: "#3498DB" },
     creative: { primaryColor: "#9B59B6" },
     "tu-nueva-vertical": { primaryColor: "#FF0000" },
   } as const;
   ```
2. Crea componentes adaptados en `components/business/tu-nueva-vertical/` si es necesario.

---

**Resumen:**

- No hay cambios inesperados ni incompatibilidades.
- Puedes personalizar el README sin problema.
- Todo tu setup es compatible y está listo para seguir creciendo.

¿Quieres que revise algún archivo específico o necesitas ayuda para agregar la sección al README?## 🆕 Agregar una Vertical

1. Edita `src/lib/constants/verticals.ts`:
   ```typescript
   export type Vertical =
     | "restaurant"
     | "service"
     | "creative"
     | "tu-nueva-vertical";
   export const VERTICAL_CONFIG = {
     restaurant: { primaryColor: "#E67E22" },
     service: { primaryColor: "#3498DB" },
     creative: { primaryColor: "#9B59B6" },
     "tu-nueva-vertical": { primaryColor: "#FF0000" },
   } as const;
   ```
2. Crea componentes adaptados en `components/business/tu-nueva-vertical/` si es necesario.

---

**Resumen:**

- No hay cambios inesperados ni incompatibilidades.
- Puedes personalizar el README sin problema.
- Todo tu setup es compatible y está listo para seguir creciendo.

¿Quieres que revise algún archivo específico o necesitas ayuda para agregar

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
