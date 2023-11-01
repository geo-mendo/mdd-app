import { RoutesEnum } from "../infrastructure/routes/routes";

export interface AppNavLink {
    label: string;
    path: string;
    icon?: string;
}

export const AppNavLinks: AppNavLink[] = [
    {
        label: 'Articles',
        path: RoutesEnum.POSTS_FEED,
    },
    {
        label: 'Thèmes',
        path: RoutesEnum.TOPICS,
    },
];