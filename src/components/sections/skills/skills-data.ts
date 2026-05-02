export interface Skill {
  key: string;
  title: string;
  percent: number;
  iconPath: string;
}

export const SKILLS: Skill[] = [
  { key: "react", title: "React", percent: 90, iconPath: "/svg/react.svg" },
  { key: "next", title: "Next.js", percent: 90, iconPath: "/svg/next.svg" },
  { key: "vue", title: "Vue", percent: 85, iconPath: "/svg/vue.svg" },
  { key: "angular", title: "Angular", percent: 80, iconPath: "/svg/angular.svg" },
  { key: "flutter", title: "Flutter", percent: 85, iconPath: "/svg/flutter.svg" },
  { key: "react_native", title: "React Native", percent: 85, iconPath: "/svg/react.svg" },
  { key: "html", title: "HTML", percent: 95, iconPath: "/svg/html.svg" },
  { key: "css", title: "CSS", percent: 95, iconPath: "/svg/css.svg" },
  { key: "javascript", title: "Javascript", percent: 85, iconPath: "/svg/javascript.svg" },
  { key: "typescript", title: "Typescript", percent: 85, iconPath: "/svg/typescript.svg" },
  { key: "node", title: "Node", percent: 80, iconPath: "/svg/node.svg" },
  { key: "figma", title: "Figma", percent: 85, iconPath: "/svg/figma.svg" },
  { key: "adobe", title: "Adobe Suite", percent: 80, iconPath: "/svg/adobe.svg" },
];
