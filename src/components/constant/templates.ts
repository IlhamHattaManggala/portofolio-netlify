import type { TTemplates } from "../types";
import { Anjing, css, html, tailwind, typescript, Unity } from "../../assets";
import { FiFigma } from "react-icons/fi";
const templates: TTemplates[] = [
  {
    id: 1,
    content: `
    <div class="text-center">
        <h2 class="text-xl font-bold">🎨 UI/UX Enthusiast</h2>
        <p class="text-sm mt-2">I design and build seamless user experiences</p>
        <div class="card">
            <img src="https://img.shields.io/badge/Design-Figma-orange?logo=figma&style=flat-square" class="my-4 inline" />
            <img src="https://img.shields.io/badge/%20-Profile-green?logo=github&logoColor=black&label=Github" class="my-4 inline" />
            <img src="https://img.shields.io/badge/%20-Dev-green?logo=flutter&logoColor=%2302569B&label=Flutter&labelColor=%23fff" class="inline" />
            <img src="https://img.shields.io/badge/%20-Dev-green?logo=laravel&logoColor=%23FF2D20&label=Backend" class="inline" />
        </div>
        <div class="grid grid-cols-12 mt-10">
            <div class="card-skill flex flex-row col-span-6 min-w-full">
                <i
                <img src="${FiFigma}" class="object-contain" style="height: 50px; width: 50px"/>
                <img src="${typescript}" class="object-contain" style="height: 50px; width: 50px"/>
                <img src="${html}" class="object-contain" style="height: 50px; width: 50px"/>
                <img src="${css}" class="object-contain" style="height: 50px; width: 50px"/>
                <img src="${Unity}" class="object-contain" style="height: 50px; width: 50px"/>
                <img src="${tailwind}" class="object-contain" style="height: 50px; width: 50px"/>
            </div>
            <div class="card-img col-span-6 flex justify-center">
                <img src="${Anjing}" class="object-contain" style="height: 150px; width: 150px" />
            </div>
        </div>
    </div>
  `,
  },
  {
    id: 2,
    content: `
    <div class="text-center">
        <h2 class="text-xl font-bold">🎨 UI/UX Enthusiast</h2>
        <p class="text-sm mt-2">I design and build seamless user experiences</p>
        <div class="card">
        <img src="https://img.shields.io/badge/Design-Figma-orange?logo=figma&style=flat-square" class="my-4 inline" />
        <img src="https://img.shields.io/badge/Prototype-AdobeXD-purple?logo=adobe-xd&style=flat-square" class="inline" />
        </div>
    </div>
    `,
  },
  {
    id: 3,
    content: `
    <div class="text-center">
        <h2 class="text-xl font-bold">🎨 UI/UX Enthusiast</h2>
        <p class="text-sm mt-2">I design and build seamless user experiences</p>
        <div class="card">
        <img src="https://img.shields.io/badge/Design-Figma-orange?logo=figma&style=flat-square" class="my-4 inline" />
        <img src="https://img.shields.io/badge/Prototype-AdobeXD-purple?logo=adobe-xd&style=flat-square" class="inline" />
        </div>
    </div>
    `,
  },
];

// badgeOptions.ts
const badgeOptions = [
  {
    label: "GitHub Profile",
    img: `https://img.shields.io/badge/%20-Profile-green?logo=github&logoColor=black&label=Github`,
  },
  {
    label: "Facebook Profile",
    img: `https://img.shields.io/badge/%20-Profile-green?logo=facebook&logoColor=%230866FF&label=Facebook&labelColor=%23fff`,
  },
  {
    label: "Instagram Profile",
    img: `https://img.shields.io/badge/%20-Profile-green?logo=instagram&logoColor=%23FF0069&label=Instagram&labelColor=%23fff`,
  },
  {
    label: "Flutter Dev",
    img: `https://img.shields.io/badge/%20-Dev-green?logo=flutter&logoColor=%2302569B&label=Flutter&labelColor=%23fff`,
  },
  {
    label: "Laravel Backend",
    img: `https://img.shields.io/badge/%20-Dev-green?logo=laravel&logoColor=%23FF2D20&label=Backend`,
  },
];

export { templates, badgeOptions };
