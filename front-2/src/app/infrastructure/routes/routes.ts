export enum PathEnum {
    HOME = '',
    AUTH = 'auth',
    NOT_FOUND = '404',
    SIGNIN = `signin`,
    SIGNUP = `signup`,
    DASHBOARD = 'dashboard',
    POSTS_FEED = `posts-feed`,
    NEW_POST = `new-post`,
    POST_DETAILS = `post-details`,
    TOPICS = `topics`,
    PROFILE = `profil`,
}

export enum RoutesEnum {
    HOME = `${PathEnum.HOME}`,
    AUTH = `${PathEnum.AUTH}`,
    NOT_FOUND = `${PathEnum.NOT_FOUND}`,
    SIGNIN = `${PathEnum.AUTH}/${PathEnum.SIGNIN}`,
    SIGNUP = `${PathEnum.AUTH}/${PathEnum.SIGNUP}`,
    DASHBOARD = `${PathEnum.SIGNIN}`,
    POSTS_FEED = `${PathEnum.DASHBOARD}/${PathEnum.POSTS_FEED}`,
    NEW_POST = `${RoutesEnum.POSTS_FEED}/${PathEnum.NEW_POST}`,
    TOPICS = `${PathEnum.DASHBOARD}/${PathEnum.TOPICS}`,
    PROFILE = `${PathEnum.DASHBOARD}/${PathEnum.PROFILE}`,
}


