import { UserEntity } from "../User.entity";

export interface IUserRepository {
    getCurrentuser(): any;
    addSubscriptionToTopic(topicId: number): void;
    removeSubscriptionToTopic(topicId: number): void;
    updateProfil(profil: Partial<UserEntity>): void;
}