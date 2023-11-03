import { UserEntity } from "../User.entity";

export interface IUserRepository {
    getCurrentuser(): any;
    addSubscriptionToTopic(userId: number, topicId: number): void;
    removeSubscriptionToTopic(topicId: number): void;
    updateProfil(profil: Partial<UserEntity>, userId: number): void;
}